#!/usr/bin/perl
#
#  AJAX Woot Checker, getwoot.pl v3.1
#  Copyright (c)2007-2013, Isaac Kishk  ikishk@gmail.com
#
#  Run this in your crontab at midnight, or manually.
#
#  Creates non-namespace XML for AJAX, and some other extras
#
#  v1.0 - public release
#  v1.1 - added flock go you dont get multiple instances during a wootoff
#  v1.2 - fixed audio
#  v1.3 - really fixed audio, updated img url
#  v1.4 - added "use bytes" to get rid of the "wide character" error
#  v1.5 - added product log CSV
#  v1.6 - mirrors rss file now, not image.  having too many utf8 probs
#  v1.7 - lowered >20 time to 20 secs from 30
#  v1.8 - added new item logic, added 30s delay to new ite, to avoid duplicates,
#         made sure xml files didnt start with -
#  v1.9 - added ETA in title, added twitter
#  v2.0 - upped the speed as products are cycling faster
#  v2.1 - commented out XML::Simple, added XML::Smart to deal w/ non
#          utf-8 non-sense
#  v2.2 - Added encoding check with decode to remove special chars which
#          expat w/in XML::SMart cant handle
#  v2.3 - Added CGI::escape to just escape everything and =~'s to change
#          only the things I wanted back.
#  v2.4 - Updated RSS URL to http://api.woot.com/
#  v3.0 - Rewrite to unify all woots using unified XML, using XLS::FeedPP now
#  v3.1 - WWW::Mailchimp added for emails
#
#  Hash key legend:
## site = key/0
## wootoff = 1
## soldout = 2
## soldoutpercentage = 3
### saleid = 4
## title = 5
## desc = 6
## pubDate = 7
## condition = 8
## price = 9
## pricerange = 10
## shipping = 11
## subtitle = 12
## teaser = 13
## link = 14
## purl = 15
## burl = 16
## durl = 17
## dimg = 18
## img = 19
## simg = 20
## timg = 21
## surl = 22
## wcast = 23
## lbdate = 24

##  To force an update on a remote browser, set the $version below higher
##  than what is set below.  Then change woot.js wootjsver variable to match
##  what you chose for $version

$version = "3.1";

## To allow active AJAX connection to loop, $active must be set to 1
## To kill off any browsers which are in the loop, set active to 0
##
## This feature was implemented in order to stop traffic if you are
## experiencing load issues, or you just wish to no longer offer your
## page.  Telling the remote to stop is better than having the remote
## poll your server against a 404 error (commonly moved directories to
## avoid future use) as they will poll forever until the browser stops

$active = "1";

## Email/SMS alerts
##
## (to restart the script and not email out the initial product, use -r)

#$rcpt = "wootalert\@googlegroups.com";
#$rcpt = "ikishk\@gmail.com";
#$smtp = "64.22.124.73"; #set to 127.0.0.1 to use local mta, not smtp
##$hostname = `hostname`;
#$hostname = "kishk.org";
#chomp $hostname;

#$from = "woot\@$hostname";
#$smtphost = "127.0.0.1";

# enable twitter
#$twitter = "0";
#require('../twitter.inc');

$hroffset = "3600"; # in seconds

##
## Theres nothing to be configured below unless you wish to hack at the code
##


# load modules

use utf8;
use bytes;
use Time::Local;
use POSIX qw(strftime);
use LWP::UserAgent;
use XML::FeedPP;
use XML::Smart;
use HTML::Encoding 'encoding_from_http_message';
use HTML::Entities;
use MIME::Lite;
use Fcntl ':flock'; # import LOCK_* constants
use Getopt::Std;
use WWW::Mailchimp;
#use Encode;
#use Net::Twitter;
#use Data::Dumper;

$ENV{'TZ'} = "US/Central";

getopts('dr');
print "Modules loaded...\n" if ($opt_d);

$reload = 1 if ($opt_r);
$epoch = time;
my %woots = ();
my $globalpercent = 100;

# setup locks
sub lock {
  if (! -f "logs/woot.lck") {
    open(LOCKFILE,">woot.lck") or die "Can't open lockfile: $!";
    chmod 0660, "woot.lck";
    chown -1, 20002, "log/woot.lck";
  }
  flock(LOCKFILE,LOCK_EX|LOCK_NB) || die "$0 already daemonized for woot off";
}

sub unlock {
  flock(LOCKFILE,LOCK_UN);
}

print "Init LWP...\n" if ($opt_d);
# init lwp
$ua = LWP::UserAgent->new;
$ua->timeout(30);
$ua->agent('Mozilla/5.0');
use bytes;

print "Run loop...\n" if ($opt_d);
# main loop
LINE: while(1) {
$epoch = time;

# get woot rss
print "Fetching RSS...\n" if ($opt_d);
$source = "http://api.woot.com/1/sales/current.rss?$extra";
$response = $ua->get("$source");
#my $feed = XML::FeedPP::RSS->new( $source );
print "Got response...\n" if ($opt_d);
$encoding = encoding_from_http_message($response);
print "Encoding is $encoding\n" if ($opt_d);

if ($response->is_success) {
  $content = $response->content;
  $content =~ s/ quantity="(.*?)">/>\($1\) /g;
#  my $feed2 =  XML::Smart->new($content, 'XML::Smart') ;
#  $feed2 = $feed2->cut_root;
  my $feed = XML::FeedPP->new( $content, -type => "string");
  if ($content eq "") {
    print "Throttled, Sleeping 15s.\n" if ($opt_d);
    sleep 15;
    $extra = "";
    next LINE;
  } elsif ($content =~ /now hold on just a minute here/) {
    print "Now hold on just a minute here, sleeping 15s\n" if ($opt_d);
    sleep 15;
    $extra = "?cached=$epoch";
    next LINE;
  } else {
    $extra = "";
  }

  my $lbdate = $feed->get( "lastBuildDate" );


# start xml, add global variables
open(FILE,">xml/woot.xml");
print FILE "<KWOOT>\n";
close FILE;

foreach my $item ( $feed->get_item() ) {
  my $title= $item->title();
  my $link = $item->link();
  my @link = $link =~ /(.*?)(\?|%3F|&)utm_source=version1(.*?)/;
  $link = @link[0];
  my @site = $link =~ /http:\/\/(.*?)\.woot\.com(.*?)/;
  my $site = @site[0];
  $site = "woot" if ($site eq "www");
  my $desc = $item->description();
  my $pubDate = $item->pubDate();
  #my $pubDate = $item->get( "pubDate" );
  my $condition = $item->get( "woot:condition" );
  my $price = $item->get( "woot:price" );
  my $pricerange = $item->get( "woot:pricerange" );
  my $shipping = $item->get( "woot:shipping" );
  my $soldout = $item->get( "woot:soldout" );
  my $soldoutpercentage = $item->get( "woot:soldoutpercentage" );
  my $subtitle = $item->get( "woot:subtitle" );
  my $teaser = $item->get( "woot:teaser" );
  $teaser =~ s/<p>//gm;
  $teaser =~ s/<\/p>//gm;
  my $wootoff = $item->get( "woot:wootoff" );
  my $dimg = $item->get( "woot:detailimage" );
  my $img = $item->get( "woot:standardimage" );
  my $simg = $item->get( "woot:substandardimage" );
  my $timg = $item->get( "woot:thumbnailimage" );
  my $wcast = $item->get( "enclosure" );
  my $test =  $item->get( "woot:products/woot:product" );
  if ($test =~ /ARRAY/) {
    $count = @{$item->get( "woot:products/woot:product" )};
    for (0 .. $count-1) {
      $prod = $item->get( "woot:products/woot:product" );
      next if ($prod eq "");
      $prods .= "&lt;li&gt; $prod&lt;br&gt;";
      $i++;
    }
  } else {
    $prod = $item->get( "woot:products/woot:product" );
    $prods = "&lt;li&gt; $prod";
  }
  $prods = encode_entities($prods);

  my $purl = $item->get( "woot:purchaseurl" );
  my @purl = $purl =~ /(.*?)(\?|%3F|&)utm_source=version1(.*?)/;
  $purl = @purl[0];
  my $burl = $item->get( "woot:blogurl" );
  my @burl = $burl =~ /(.*?)(\?|%3F|&)utm_source=version1(.*?)/;
  $burl = @burl[0];
  my $durl = $item->get( "woot:discussionurl" );
  my @durl = $durl =~ /(.*?)(\?|%3F|&)utm_source=version1(.*?)/;
  $durl = @durl[0];
  my @saleid = $durl =~ /(.*?)postid=(.*?)$/;
  my $saleid = @saleid[1];

$linedata = encode_entities("$site:G:$wootoff:G:$soldout:G:$soldoutpercentage:G:$saleid:G:$title:G:$desc:G:$pubDate:G:$condition:G:$price:G:$pricerange:G:$shippin:G:$subtitle:G:$teaser:G:$link:G:$purl:G:$burl:G:$durl:G:$dimg:G:$img:G:$simg:G:$timg:G:$link:G:$wcast:G:$lbdate");
  %woots->{$site} = $linedata;
#  %woots->{$site} = "$site:G:$wootoff:G:$soldout:G:$soldoutpercentage:G:$saleid:G:$title:G:$desc:G:$pubDate:G:$condition:G:$price:G:$pricerange:G:$shippin:G:$subtitle:G:$teaser:G:$link:G:$purl:G:$burl:G:$durl:G:$dimg:G:$img:G:$simg:G:$timg:G:$link:G:$wcast:G:$lbdate";
}
print "Wootoffs:\n" if ($opt_d);
while ( my ($key, $value) = each(%woots) ) {
  (@w) = split(/:G:/,%woots->{"$key"});
  $globalwootoff = 0 if($globalwootoff eq "");
  $globalwootoff++  if (@w[1] eq ("true" || "True"));
  next if (@w[1] eq ("false" || "False"));
  (@w) = split(/:G:/,%woots->{"$key"});
  dowoot(@w);
}
# forcewootoff for debugging
#$globalwootoff = 1;
print "Daily:\n" if ($opt_d);
while ( my ($key, $value) = each(%woots) ) {
  (@w) = split(/:G:/,%woots->{"$key"});
  next if (@w[1] eq ("true" || "True"));
  (@w) = split(/:G:/,%woots->{"$key"});
  dowoot(@w);
}
# non-wootoff summary email
if ($globalwootoff eq "0") {
  &dosummaryemail(%woots);
}

# do sorting p = %, r = remaining, i = itemstart
@psort = sort(@psort);
@rsort = sort(@rsort);
@isort = sort(@isort);


foreach $p (@psort) {
  ($data,$site) = split(/:/,$p);
  $site =~ s/woot/1/g;
  $site =~ s/kids/2/g;
  $site =~ s/sellout/3/g;
  $site =~ s/home/4/g;
  $site =~ s/shirt/5/g;
  $site =~ s/sport/6/g;
  $site =~ s/tech/7/g;
  $site =~ s/tools/8/g;
  $site =~ s/wine/9/g;
  $site =~ s/accessories/10/g;
  $psort = "$psort$site,";
}
chop $psort;
foreach $r (@rsort) {
  ($data,$site) = split(/:/,$r);
  $site =~ s/woot/1/g;
  $site =~ s/kids/2/g;
  $site =~ s/sellout/3/g;
  $site =~ s/home/4/g;
  $site =~ s/shirt/5/g;
  $site =~ s/sport/6/g;
  $site =~ s/tech/7/g;
  $site =~ s/tools/8/g;
  $site =~ s/wine/9/g;
  $site =~ s/accessories/10/g;
  $rsort = "$rsort$site,";
}
chop $rsort;
foreach $i (@isort) {
  ($data,$site) = split(/:/,$i);
  $site =~ s/woot/1/g;
  $site =~ s/kids/2/g;
  $site =~ s/sellout/3/g;
  $site =~ s/home/4/g;
  $site =~ s/shirt/5/g;
  $site =~ s/sport/6/g;
  $site =~ s/tech/7/g;
  $site =~ s/tools/8/g;
  $site =~ s/wine/9/g;
  $site =~ s/accessories/10/g;
  $isort = "$isort$site,";
}
chop $isort;


open(FILE,">>xml/woot.xml");
print FILE "  <globalwootoff val=\"$globalwootoff\" />\n";
print FILE "  <globalpercent val=\"$globalpercent\" />\n";
print FILE "  <gsort>1,2,3,4,5,6,7,8,9</gsort>\n";
print FILE "  <psort>$psort</psort>\n";
print FILE "  <rsort>$rsort</rsort>\n";
print FILE "  <isort>$isort</isort>\n";
print FILE "  <globalversion>$version</globalversion>\n";
print FILE "  <globalactive>$active</globalactive>\n";
print FILE "</KWOOT>\n";
close FILE;

@psort = "";
@rsort = "";
@isort = "";
$psort = "";
$rsort = "";
$isort = "";

  if ($active eq 0) {
    $title = "Sorry, Checker disabled";
    $subtitle = "Try back again later";
  }

  if ($globalwootoff > 0) {
    lock();
  }



$reload = 0;
# Sanity check for the main loop we are in
  if ($globalwootoff eq "0") {
    print "No wootoff, not daemonizing.\n" if ($opt_d);;
    unlock();
    exit;
  } elsif ($globalpercent > 20) {
    print ">20%, Sleeping 15s.\n" if ($opt_d);
    sleep 15;
    next LINE;
  } elsif ($globalpercent > 5) {
    print "19.9-5%, Sleeping 5s.\n" if ($opt_d);
    sleep 5;
    next LINE;
  } elsif ($globalpercent <= 5) {
    print "0.1-4.9%, Sleeping 2s.\n" if ($opt_d);
    sleep 2;
    next LINE;
  } elsif ($soldout eq "1") {
    print "Sold out, Sleeping 2s.\n" if ($opt_d);
    sleep 2;
    next LINE;
  } else {
    print "Unknown error, Sleeping 1800s.\n" if ($opt_d);
    sleep 1800;
    next LINE;
  }
## main if response else
} else {
  $error = $response->status_line;
  print "No response from the server: $error, retrying\n";
  if ($error =~ /404/) {
    $error = "now hold on just a minute here";
    $img = "http://www.woot.com/maintenance.gif";
  } elsif ($error =~ /500/) {
    $error = "woot servers are overloaded at this time";
    $img = "http://woot.kishk.org:8080/error.gif";
    sleep 30;
  } elsif ($error =~ /504/) {
    $error = "woot servers are overloaded at this time";
    $img = "http://woot.kishk.org:8080/error.gif";
    sleep 30;
  } else {
    $img = "http://woot.kishk.org:8080/error.gif";
    sleep 15;
  }

} ## /main if response else
} ## /LINE


sub dowoot(@w) {
  # convert pubDate to timestamp form
#  @build = split(/T/,$w[7]);
#  #2013-04-03T00:00:01-05:00
#  @bdate = split(/-/,$build[0]);
#  @btime = split(/-/,$build[1]);
#  @btime = split(/:/,$btime[0]);
@build = split(/\s+/,$w[24]);
@btime = split(/:/,$build[4]);
  %months = (
    'Jan' => "0",
    'Feb' => "1",
    'Mar' => "2",
    'Apr' => "3",
    'May' => "4",
    'Jun' => "5",
    'Jul' => "6",
    'Aug' => "7",
    'Sep' => "8",
    'Oct' => "9",
    'Nov' => "10",
    'Dec' => "11"
  );
  $month = $build[2];
#  $time = timelocal($btime[2],$btime[1],$btime[0],$bdate[1],$months{$month},$bdate[0]);
# Wed, 03 Apr 2013 20:45:35 -0500
#     0  1    2     3     4    5     6     7     8
# ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst
$time = timelocal($btime[2],$btime[1],$btime[0],$build[1],$months{$month},$build[3]);

  my $percent = sprintf("%.1f",(100-($w[3]*100)));
  $globalpercent = $percent if ($percent < $globalpercent);


  # touch sale files
  $xmlfile = "xml/" . $w[0] . "-" . $w[4]. ".xml";
  if (! -f $xmlfile) {
    open(XML,"> $xmlfile") or die "Can't create $xmlfile: $!";
    close(XML);
  }
  $itemstart = (stat($xmlfile))[10];
  $elapsed = $epoch - $itemstart;
  $remaining = sprintf("%.0f",(($elapsed*100)/(100.001-$percent))-($elapsed));


  print "$w[0]:$w[1]:$w[2]:$percent:$globalpercent:100-$w[3]...\n" if ($opt_d);

  if ($w[1] eq "") {
    print "Empty wootoff variable, retrying in 5s...";
    sleep 5;
    next LINE;
  }

  if ($w[5] eq "Dear Jerkface") {
    print "Throttled, Sleeping 15s.\n" if ($opt_d);
    sleep 15;
    next LINE;
  }

  # override is wootoff isnt active.  allows for daily static pages
  if ($w[1] eq ("false" || "False")) {
    $percent = 100.0;
    $remaining = 0;
    $elapsed = 0;
  }

#$title = uc($w[0]) . ": " . $w[5];
$title = $w[5];
$subtitle = $w[12];
$teaser = $w[13];
if ($active eq 0) {
  $title = "Sorry, Checker disabled";
  $subtitle = "Try back again later";
}
#if($w[1] eq "false") {
  # $desc = encode_entities($w[6]);
#  $desc = $w[6];
#} else {
  $desc = "[disabled during wootoff periods]";
#}

#@sortarray = "$wootoff,$soldout,$percent,$itemstart,$itemremaining";
push (@psort, "$percent:$w[0]");
push (@rsort, "$remaining:$w[0]");
push (@isort, "$itemstart:$w[0]");

# spit out non-namespace xml for AJAX
open(FILE,">>xml/woot.xml");
$blah = $w[0];
$blah = "w" if ($w[0] eq "woot");
print FILE "   <" . $blah . "title>$title </" . $blah . "title>\n";
$blah = "" if ($w[0] eq "woot");
print FILE "   <" . $blah . "subtitle>$subtitle </" . $blah . "subtitle>\n";
print FILE "   <" . $blah . "teaser>$teaser</" . $blah . "teaser>\n";
print FILE "   <" . $blah . "condition val=\"$w[8]\" />\n";
print FILE "   <" . $blah . "price val=\"$w[9]\" />\n";
print FILE "   <" . $blah . "desc>$desc</" . $blah . "desc>\n";
print FILE "   <" . $blah . "prods>$prods </" . $blah . "prods>\n";
print FILE "   <" . $blah . "stdimg val=\"$w[20]\" />\n";
print FILE "   <" . $blah . "detailimg val=\"$w[18]\" />\n";
print FILE "   <" . $blah . "thumbnailimg val=\"$w[21]\" />\n";
print FILE "   <" . $blah . "saleurl val=\"$w[22]\" />\n";
print FILE "   <" . $blah . "forumurl val=\"$w[17]\" />\n";
print FILE "   <" . $blah . "blogurl val=\"$w[16]\" />\n";
print FILE "   <" . $blah . "purchaseurl val=\"$w[15]\" />\n";
print FILE "   <" . $blah . "wootcast val=\"$w[23]\" />\n";
print FILE "   <" . $blah . "percent val=\"$percent\" />\n";
print FILE "   <" . $blah . "wootoff val=\"$w[1]\" />\n";
print FILE "   <" . $blah . "soldout val=\"$w[2]\" />\n";
print FILE "   <" . $blah . "lastBuildDate val=\"$w[24]\" />\n";
print FILE "   <" . $blah . "itemstart val=\"$itemstart\" />\n";
print FILE "   <" . $blah . "itemelapsed val=\"$elapsed\" />\n";
print FILE "   <" . $blah . "itemremaining val=\"$remaining\" />\n";
print FILE "   <" . $blah . "woottime val=\"$time\" />\n";
print FILE "   <" . $blah . "scripttime val=\"$epoch\" />\n";
print FILE "   <" . $blah . "version val=\"$version\" />\n";
print FILE "   <" . $blah . "active val=\"$active\" />\n";

close FILE;


# archive
$twootsaleid = $w[4] if($w[0] eq "woot");
$tkidssaleid = $w[4] if($w[0] eq "kids");
$tselloutsaleid = $w[4] if($w[0] eq "sellout");
$thomesaleid = $w[4] if($w[0] eq "home");
$tshirtsaleid = $w[4] if($w[0] eq "shirt");
$tsportsaleid = $w[4] if($w[0] eq "sport");
$ttechsaleid = $w[4] if($w[0] eq "tech");
$ttoolssaleid = $w[4] if($w[0] eq "tools");
$twinesaleid = $w[4] if($w[0] eq "wine");
$taccessoriessaleid = $w[4] if($w[0] eq "accessories");
if ($oldtwootsaleid ne $twootsaleid && $reload ne "1") {
  &dolog(@w);
  $oldtwootsaleid = $twootsaleid;
}
if ($oldtkidssaleid ne $tkidssaleid && $reload ne "1") {
  &dolog(@w);
  $oldtkidssaleid = $tkidssaleid;
}
if ($oldtselloutsaleid ne $tselloutsaleid && $reload ne "1") {
  &dolog(@w);
  $oldtselloutsaleid = $tselloutsaleid;
}
if ($oldthomesaleid ne $thomesaleid && $reload ne "1") {
  &dolog(@w);
  $oldthomesaleid = $thomesaleid;
}
if ($oldtshirtsaleid ne $tshirtsaleid && $reload ne "1") {
  &dolog(@w);
  $oldtshirtsaleid = $tshirtsaleid;
}
if ($oldtsportsaleid ne $tsportsaleid && $reload ne "1") {
  &dolog(@w);
  $oldtsportsaleid = $tsportsaleid;
}
if ($oldttechsaleid ne $ttechsaleid && $reload ne "1") {
  &dolog(@w);
  $oldttechsaleid = $ttechsaleid;
}
if ($oldttoolssaleid ne $ttoolssaleid && $reload ne "1") {
  &dolog(@w);
  $oldttoolssaleid = $ttoolssaleid;
}
if ($oldtwinesaleid ne $twinesaleid && $reload ne "1") {
  &dolog(@w);
  $oldtwinesaleid = $twinesaleid;
}
if ($oldtaccessoriessaleid ne $taccessoriessaleid && $reload ne "1") {
  &dolog(@w);
  $oldtaccessoriessaleid = $taccessoriessaleid;
}

}

sub dolog(@w) {
  $logfile = "logs/" . $w[0] . "log.csv";
  open(CSV,">>$logfile");
  $title2  = $title;
  $title2 =~ s/,/;/g;
  $thumbnailimg2 = $w[21];
  $thumbnailimg2 =~ s/,/;/g;
  print CSV "$w[16],$w[5],$title2,$w[8],$w[9],$thumbnailimg2,$itemstart\n";
  close CSV;
  &emailmsg if ($globalwootoff > 1);
## &twitter if ($twitter eq "1");;
}

sub emailmsg(@w) {
  return if ($opt_r);
  if ($w[1] eq "true") { $expl_str2 = "(wootoff)"; }
$site = $w[0];
$pre = "$site";
$site = "www" if ($w[0] eq "woot");
$title = decode_entities($w[5]);

$expl_str_html_top = "<html xmlns=\"http://www.w3.org/1999/xhtml\">
<head>
<META http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">
</head>
<body>
<br>
";

$expl_str_html = "
$w[5]<br>
$w[12]<br>
$w[9] ($w[8])<br>
<a href=$w[15]>Buy</a> &nbsp; <a href=$w[17]>Forum</a> &nbsp; <a href=http://$site.woot.com>$site.woot</a><br>
<a href=$w[20]>
<img border=\"0\" width=\"125\" height=\"95\" src=\"$w[21]\"></a><br>
<ul>
$prods
</ul>
<a href=http://woot.kishk.org:8080/>Before buying something at
woot or amazon, please head over to http://woot.kishk.org/
and use one of the referral links on the right.  Thanks!</a>
";
$expl_str_html_bottom = "
</body>
</html>
";

$expl_str_text = "
$w[5]
$w[12]
$w[9] ($w[8])
";

#
# \N{U+2794}
# \N{U+2192}

$subject = "$pre -> $title $expl_str2";
$teaser = "<i>$w[13]</i>";
$list_id = "49f4bee107";
&mailchimp();

#$msg = MIME::Lite->new (
#   From => $from,
#   To => $rcpt,
#   Subject => "$pre -> $title $expl_str2",
#   #Type => 'text/html',
#   #Data => "$expl_str_html\n"
#   Type => 'multipart/alternative'
#);

#$msg->attach(
#   Type =>'text/plain',
#   Data =>"$expl_str_text\n"
#);

#$msg->attach(
#   Type =>'text/html',
#   Data =>"$expl_str_html_top $expl_str_html $expl_str_html_bottom\n"
#);


#if ($smtphost ne "127.0.0.1") {
#  MIME::Lite->send('smtp', "$smtphost", Timeout=>60);
#}
# $msg->send;
print "Emailed...$pre\N{U+2794}$title $expl_str2\n" if ($opt_d);
}

sub dosummaryemail(%woots) {
  return if ($opt_r);
$date = strftime "%a %b %e", localtime;
$expl_str_html_top = "<html xmlns=\"http://www.w3.org/1999/xhtml\">
<head>
<META http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">
</head>
<body>
<br>
";

$expl_str_html = "
<table>
";
  while ( my ($key, $value) = each(%woots) ) {
    (@w) = split(/:G:/,%woots->{"$key"});
$site = $w[0];
$site = "www" if ($w[0] eq "woot");
$teaser = "<i>$w[13]</i>" if ($w[0] eq "woot");
$expl_str_html .= "
<tr><td><a href=$w[20]>
<img border=\"0\" width=\"125\" height=\"95\" src=\"$w[21]\"></a></td>
<td><b>$w[5]</b><br>
$w[12]</td>
<td>$w[9]<br>
$w[8]</td>
<td><a href=$w[15]>Buy</a><br>
<a href=$w[17]>Forum</a><br>
<a href=http://$site.woot.com>$site.woot</a></td>
</tr>
";

$expl_str_text .= sprintf("%-8s: %-8s: %-12s: %-50s: %-40s\n", $w[0], $w[9],$w[8], decode_entities($w[5]), decode_entities($w[12]));

  }

$expl_str_html .= "</table>
<a href=http://woot.kishk.org:8080/>Before buying something at 
woot or amazon, please head over to http://woot.kishk.org/
and use one of the referral links on the right.  Thanks!</a>
";

$expl_str_html_bottom = "
</body>
</html>
";

$subject = "woot summary for $date";
$list_id = "6a8a637a5e";
&mailchimp();

#$msg = MIME::Lite->new (
#   From => $from,
#   To => $rcpt,
#   Subject => "woot summary for $date",
#   #Type => 'text/html',
#   #Data => "$expl_str_html\n"
#   Type => 'multipart/alternative'
#);


#$msg->attach(
#   Type =>'text/plain',
#   Data =>"$expl_str_text\n"
#);

#$msg->attach(
#   Type =>'text/html',
#   Data =>"$expl_str_html_top $expl_str_html $expl_str_html_bottom\n"
#);

#if ($smtphost ne "127.0.0.1") {
#  MIME::Lite->send('smtp', "$smtphost", Timeout=>60);
#}
# $msg->send;
print "Emailed Summary.\n" if ($opt_d);
}

sub mailchimp() {
  $apikey = 'mailchimpapikey';
  %tracking = ('opens' => true, 'html_clicks' => true, 'text_clicks' => false);
  $track_ref = \%tracking;
  %analytics = ('google' => 'UA-xxxxxx-2');
  $analytics_ref = \%analytics; 
  %options = (
  	'list_id' => "$list_id",
  	'subject' => "$subject",
    'title' => "$subject",
  	'from_email' => 'woot@kishk.org',
  	'from_name' => 'wootalert',
    'tracking' => $track_ref,
    'authenticate' => true,
    'analytics' => $analytics_ref,
    'auto_fb_post' => ('fbpageid'),
    'template_id' => '23425'
  );
  %content = (
  	'html_main' => "$expl_str_html",
    'html_std_preheader_content' => "$teaser",
  	'text' => "$expl_str_text"
  );
  @type = ('type' =>'regular');
  $opt_ref = \%options;
  $cont_ref = \%content;

  $chimp = WWW::Mailchimp->new(apikey => $apikey);
  $newCampaignId = $chimp->campaignCreate(type => 'regular', options => $opt_ref, content => $cont_ref);
  $return = $chimp->campaignSendNow(apikey => $apikey,cid => $newCampaignId);
}

if ($globalwootoff > 0) {
  unlock();
}
