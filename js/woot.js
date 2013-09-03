/*
  AJAX Woot Checker, woot.js v1.0
  Copyright (c)2007, Isaac Kishk  ikishk@gmail.com

  Must be used in conjunction with getwoot.pl, which generates an
  ajax-friendly woot.xml, read by this file.

*/

// dont change this until you'd read the perl file
var wootjsver = "3.1";

// main AJAX loop
function displayWOOT(URI) {

var xmlhttpw=false;

var psort = "";
var gsort = "";
var rsort = "";
var isort = "";

/*@cc_on @*/
/*@if (@_jscript_version >= 5)
// JScript gives us Conditional compilation, we can cope with old IE versions.
// and security blocked creation of the objects.
 try {
  xmlhttpw = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
  try {
   xmlhttpw = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
   xmlhttpw = false;
  }
 }
@end @*/
  if (!xmlhttpw && typeof XMLHttpRequest!='undefined') {
    xmlhttpw = new XMLHttpRequest();
  }
  xmlhttpw.open("GET", URI ,true);
  xmlhttpw.onreadystatechange=function() {
    if (xmlhttpw.readyState==2) {
    }
    if (xmlhttpw.readyState==4) {
    if (xmlhttpw.status == 200) {
      var xmlDoc = xmlhttpw.responseXML; 
      formatWOOT(xmlDoc);
//


//
    
  }
}
}
xmlhttpw.send(null);
}

function unixTimeToDate (timestamp) {
  return(new Date(timestamp * 1000).toLocaleString());
}

function callPsort() {
  psort = $A(psort);
  psort = psort.reverse();
  Sortable.setSequence('page',psort);
//  if ($('reVerse').checked) {
//  if ($('reVerse').checked == "true")
//    Sortable.setSequence('page',psortr);
//  if ($('reVerse').checked == "false")
//    Sortable.setSequence('page',sorted);
}
function callRsort() {
  rsort = $A(rsort);
  rsort = rsort.reverse();
  Sortable.setSequence('page',rsort);
// if ($('reVerse').checked) {
//  if ($('reVerse').checked == "true")
//    Sortable.setSequence('page',rsortr);
//  if ($('reVerse').checked == "false")
//    Sortable.setSequence('page',rsortn);
//    Sortable.setSequence('page',sorted);
}
function callIsort() {
  isort = $A(isort);
  isort = isort.reverse();
  Sortable.setSequence('page',isort);
//  if ($('reVerse').checked) {
//  if ($('reVerse').checked == "true")
//    Sortable.setSequence('page',isortr);
//  if ($('reVerse').checked == "false")
//    Sortable.setSequence('page',isortn);
}
function callGsort() {
  gsort = $A(gsort);
  gsort = gsort.reverse();
  Sortable.setSequence('page',gsort);
}

//function callResort() {
//  var sinputs = document.getElementsByName("sortie");
//  for (var i = 0; i < sinputs.length; i++) {
//    if (sinputs[i].checked) {
//      resorttmp = sinputs[i].value;
//    }
//  }
//  psorttmp = $A(psort);
//  psortn = psorttmp;
//  psortr = psorttmp.reverse();
//  rsorttmp = $A(rsort);
//  rsortn = rsorttmp;
//  rsortr = rsorttmp.reverse();
//  isorttmp = $A(isort);
//  isortn = isorttmp;
//  isortr = isorttmp.reverse();
//  gsorttmp = $A(gsort);
//  gsortn = gsorttmp;
//  gsortr = gsorttmp.reverse();
//alert(">" + $('reVerse').checked + "\n>" + resorttmp);
//  if ($('reVerse').checked == "false") {
//    if (resorttmp == "gsort") Sortable.setSequence('page',gsortn);
//    if (resorttmp == "psort") callPsort(psortr);
//    if (resorttmp == "rsort") callRsort(rsortr);
//    if (resorttmp == "isort") callIsort(isortr);
//  } else {
//    if (resorttmp == "gsort") Sortable.setSequence('page',gsortr);
//    if (resorttmp == "psort") callPsort(psortn);
//    if (resorttmp == "rsort") callRsort(rsortn);
//    if (resorttmp == "isort") callIsort(isortn);
//  }
//}

// parse the data from the xml file
function formatWOOT(xmlDoc) {

  // version check to make sure we dont have to reload page for a fresh woot.js
  var xmlversion = xmlDoc.getElementsByTagName('globalversion')[0].getAttribute('val');
  if (xmlversion > wootjsver) {
    window.location.reload(false);
  }
  $('wootpagedversion').innerHTML = xmlversion + " > " + wootjsver;
  $('wootactive').innerHTML = xmlDoc.getElementsByTagName('globalactive')[0].getAttribute('val');


//Sortable.setSequence('page',['6','1','2','3','4','5','7','8','9']);
gsort = xmlDoc.getElementsByTagName('gsort')[0].firstChild.nodeValue;
psort = xmlDoc.getElementsByTagName('psort')[0].firstChild.nodeValue;
rsort = xmlDoc.getElementsByTagName('rsort')[0].firstChild.nodeValue;
isort = xmlDoc.getElementsByTagName('isort')[0].firstChild.nodeValue;
//Sortable.setSequence('page',psort);
  $('globalwootoff').innerHTML = xmlDoc.getElementsByTagName('globalwootoff')[0].getAttribute('val');
  $('globalpercent').innerHTML = xmlDoc.getElementsByTagName('globalpercent')[0].getAttribute('val');

  $('woottitle').innerHTML = xmlDoc.getElementsByTagName('wtitle')[0].firstChild.nodeValue
  $('wootsubtitle').innerHTML = xmlDoc.getElementsByTagName('subtitle')[0].firstChild.nodeValue
  $('wootcondition').innerHTML = xmlDoc.getElementsByTagName('condition')[0].getAttribute('val');
  $('wootprice').innerHTML = xmlDoc.getElementsByTagName('price')[0].getAttribute('val');
  $('wootprice2').innerHTML = xmlDoc.getElementsByTagName('price')[0].getAttribute('val');
  $('wootdesc').innerHTML = xmlDoc.getElementsByTagName('desc')[0].firstChild.nodeValue
//  $('wootprods').innerHTML = xmlDoc.getElementsByTagName('prods')[0].firstChild.nodeValue
  $('wootstdimg').src = xmlDoc.getElementsByTagName('stdimg')[0].getAttribute('val');
  $('wootdetailimg').href = xmlDoc.getElementsByTagName('detailimg')[0].getAttribute('val');
//  $('wootsaleurl').href = xmlDoc.getElementsByTagName('saleurl')[0].getAttribute('val');
  $('wootforumurl').href = xmlDoc.getElementsByTagName('forumurl')[0].getAttribute('val');
  $('wootblogurl').href = xmlDoc.getElementsByTagName('blogurl')[0].getAttribute('val');
  $('wootpurchaseurl').href = xmlDoc.getElementsByTagName('purchaseurl')[0].getAttribute('val');
  //$('wootwootcast').href = xmlDoc.getElementsByTagName('wootcast')[0].getAttribute('val');
  var wootpercent = xmlDoc.getElementsByTagName('percent')[0].getAttribute('val');
  $('wootpercent2').innerHTML = xmlDoc.getElementsByTagName('percent')[0].getAttribute('val');
  $('wootwootoff').innerHTML = xmlDoc.getElementsByTagName('wootoff')[0].getAttribute('val');
  $('wootsoldout').innerHTML = xmlDoc.getElementsByTagName('soldout')[0].getAttribute('val');
  $('wootlastBuildDate').innerHTML = xmlDoc.getElementsByTagName('lastBuildDate')[0].getAttribute('val');
  var wootitemstart = xmlDoc.getElementsByTagName('itemstart')[0].getAttribute('val');
  var wootitemelapsed = xmlDoc.getElementsByTagName('itemelapsed')[0].getAttribute('val');
  var wootitemremaining = xmlDoc.getElementsByTagName('itemremaining')[0].getAttribute('val');
  var wootwoottime = xmlDoc.getElementsByTagName('woottime')[0].getAttribute('val');
  var wootscripttime = xmlDoc.getElementsByTagName('scripttime')[0].getAttribute('val');
  var d = new Date();
  var wootcachetime = Math.round(d.getTime()/1000) - wootscripttime;
  var wootage = wootscripttime - wootwoottime;
  var wootprogressMeterBar = document.getElementById('wootprogressMeterBarDone');


  // itemstart
  $('wootitemstart').innerHTML = unixTimeToDate(wootitemstart);

  // cachetime
  $('wootcachetime').innerHTML = "";
  var wootTotalDays = Math.floor(wootcachetime/86400);
  var wootTotalDaysMod = (wootcachetime%86400);
  var wootTotalHours = Math.floor(wootTotalDaysMod/3600);
  var wootTotalHoursMod = (wootTotalDaysMod%3600);
  var wootTotalMin = Math.floor(wootTotalHoursMod/60);
  var wootTotalMinMod = (wootTotalHoursMod%60);
  var wootTotalSec = Math.floor(wootTotalMinMod);

  if (wootTotalDays > 0) $('wootcachetime').innerHTML += wootTotalDays + "d ";
  if (wootTotalHours > 0) $('wootcachetime').innerHTML += wootTotalHours + "h ";
  if (wootTotalMin > 0) $('wootcachetime').innerHTML += wootTotalMin + "m ";
  $('wootcachetime').innerHTML += wootTotalSec + "s";

  // itemelapsed
  $('wootitemelapsed').innerHTML = "";
  var wootTotalDays = Math.floor(wootitemelapsed/86400);
  var wootTotalDaysMod = (wootitemelapsed%86400);
  var wootTotalHours = Math.floor(wootTotalDaysMod/3600);
  var wootTotalHoursMod = (wootTotalDaysMod%3600);
  var wootTotalMin = Math.floor(wootTotalHoursMod/60);
  var wootTotalMinMod = (wootTotalHoursMod%60);
  var wootTotalSec = Math.floor(wootTotalMinMod);

  if (wootTotalDays > 0) $('wootitemelapsed').innerHTML += wootTotalDays + "d ";
  if (wootTotalHours > 0) $('wootitemelapsed').innerHTML += wootTotalHours + "h ";
  if (wootTotalMin > 0) $('wootitemelapsed').innerHTML += wootTotalMin + "m ";
  $('wootitemelapsed').innerHTML += wootTotalSec + "s";

  // itemremaining
  $('wootitemremaining').innerHTML = "";
  var wootTotalDays = Math.floor(wootitemremaining/86400);
  var wootTotalDaysMod = (wootitemremaining%86400);
  var wootTotalHours = Math.floor(wootTotalDaysMod/3600);
  var wootTotalHoursMod = (wootTotalDaysMod%3600);
  var wootTotalMin = Math.floor(wootTotalHoursMod/60);
  var wootTotalMinMod = (wootTotalHoursMod%60);
  var wootTotalSec = Math.floor(wootTotalMinMod);

  if (wootTotalDays > 0) $('wootitemremaining').innerHTML += wootTotalDays + "d ";
  if (wootTotalHours > 0) $('wootitemremaining').innerHTML += wootTotalHours + "h ";
  if (wootTotalMin > 0) $('wootitemremaining').innerHTML += wootTotalMin + "m ";
  $('wootitemremaining').innerHTML += wootTotalSec + "s";
  var woottitemremaining = $('wootitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('wootage').innerHTML = "";
  var wootTotalDays = Math.floor(wootage/86400);
  var wootTotalDaysMod = (wootage%86400);
  var wootTotalHours = Math.floor(wootTotalDaysMod/3600);
  var wootTotalHoursMod = (wootTotalDaysMod%3600);
  var wootTotalMin = Math.floor(wootTotalHoursMod/60);
  var wootTotalMinMod = (wootTotalHoursMod%60);
  var wootTotalSec = Math.floor(wootTotalMinMod);

  if (wootTotalDays > 0) $('wootage').innerHTML += wootTotalDays + "d ";
  if (wootTotalHours > 0) $('wootage').innerHTML += wootTotalHours + "h ";
  if (wootTotalMin > 0) $('wootage').innerHTML += wootTotalMin + "m ";
  $('wootage').innerHTML += wootTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('wootwootoff').innerHTML == "false") {
    var wootprogressbar = document.getElementById('wootprogressbar');
    wootprogressbar.style.height = 0;
    wootprogressMeterBar.style.width = "100%";
    wootprogressMeterBar.style.height = 1;
    wootprogressMeterBar.style.background = "black";
    $('wootpercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.title = "No Woot Off - Woot Off AJAX Client";
    $('wootwootoffimg').src = 'http://woot.kishk.org:8080/pixel.png';
  } else if (wootpercent == "0.0") {
    document.title = "SOLD OUT - Woot Off AJAX Client";
    $('wootpercent').innerHTML = "SOLD OUT";
    $('wootwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
    $('wootpercent').innerHTML = wootpercent + "%";
  } else {
    $('wootpercent').innerHTML = wootpercent + "%";
    document.title = wootpercent + "% ~" + woottitemremaining + "- Woot Off AJAX Client";
    wootprogressMeterBar.style.width = wootpercent + "%";
    wootprogressMeterBar.style.background = "#f29f01";
    $('wootwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('wootsoldout').innerHTML == "true") {
    $('wootsoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png'; 
    $('wootsprice2').innerHTML = "";
  } else  $('wootsoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";

  // bar color change based on percent
  if (wootpercent >= 80)
    wootprogressMeterBar.style.background = "#4A6751";
  if (wootpercent <= 10)
    wootprogressMeterBar.style.background = "#FFFF99";
  if (wootpercent <= 5)
    wootprogressMeterBar.style.background = "#FF9999";
  if (wootpercent < 0.1) 
    wootprogressMeterBar.style.background = "#FFFFFF";
    
//kids

  $('kidstitle').innerHTML = xmlDoc.getElementsByTagName('kidstitle')[0].firstChild.nodeValue
  $('kidssubtitle').innerHTML = xmlDoc.getElementsByTagName('kidssubtitle')[0].firstChild.nodeValue
  $('kidscondition').innerHTML = xmlDoc.getElementsByTagName('kidscondition')[0].getAttribute('val');
  $('kidsprice').innerHTML = xmlDoc.getElementsByTagName('kidsprice')[0].getAttribute('val');
  $('kidsprice2').innerHTML = xmlDoc.getElementsByTagName('kidsprice')[0].getAttribute('val');
  $('kidsdesc').innerHTML = xmlDoc.getElementsByTagName('kidsdesc')[0].firstChild.nodeValue;
//  $('kidsprods').innerHTML = xmlDoc.getElementsByTagName('kidsprods')[0].firstChild.nodeValue;
  $('kidsstdimg').src = xmlDoc.getElementsByTagName('kidsstdimg')[0].getAttribute('val');
  $('kidsdetailimg').href = xmlDoc.getElementsByTagName('kidsdetailimg')[0].getAttribute('val');
//  $('kidssaleurl').href = xmlDoc.getElementsByTagName('kidssaleurl')[0].getAttribute('val');
  $('kidsforumurl').href = xmlDoc.getElementsByTagName('kidsforumurl')[0].getAttribute('val');
  $('kidsblogurl').href = xmlDoc.getElementsByTagName('kidsblogurl')[0].getAttribute('val');
  $('kidspurchaseurl').href = xmlDoc.getElementsByTagName('kidspurchaseurl')[0].getAttribute('val');
  //$('kidswootcast').href = xmlDoc.getElementsByTagName('kidswootcast')[0].getAttribute('val');
  var kidspercent = xmlDoc.getElementsByTagName('kidspercent')[0].getAttribute('val');
  $('kidspercent2').innerHTML = xmlDoc.getElementsByTagName('kidspercent')[0].getAttribute('val');
  $('kidswootoff').innerHTML = xmlDoc.getElementsByTagName('kidswootoff')[0].getAttribute('val');
  $('kidssoldout').innerHTML = xmlDoc.getElementsByTagName('kidssoldout')[0].getAttribute('val');
  $('kidslastBuildDate').innerHTML = xmlDoc.getElementsByTagName('kidslastBuildDate')[0].getAttribute('val');
  var kidsitemstart = xmlDoc.getElementsByTagName('kidsitemstart')[0].getAttribute('val');
  var kidsitemelapsed = xmlDoc.getElementsByTagName('kidsitemelapsed')[0].getAttribute('val');
  var kidsitemremaining = xmlDoc.getElementsByTagName('kidsitemremaining')[0].getAttribute('val');
  var kidswoottime = xmlDoc.getElementsByTagName('kidswoottime')[0].getAttribute('val');
  var kidsscripttime = xmlDoc.getElementsByTagName('kidsscripttime')[0].getAttribute('val');
  var kidsd = new Date();
  var kidscachetime = Math.round(kidsd.getTime()/1000) - kidsscripttime;
  var kidsage = kidsscripttime - kidswoottime;
  var kidsprogressMeterBar = document.getElementById('kidsprogressMeterBarDone');


  // itemstart
  $('kidsitemstart').innerHTML = unixTimeToDate(kidsitemstart);

  // cachetime
  $('kidscachetime').innerHTML = "";
  var kidsTotalDays = Math.floor(kidscachetime/86400);
  var kidsTotalDaysMod = (kidscachetime%86400);
  var kidsTotalHours = Math.floor(kidsTotalDaysMod/3600);
  var kidsTotalHoursMod = (kidsTotalDaysMod%3600);
  var kidsTotalMin = Math.floor(kidsTotalHoursMod/60);
  var kidsTotalMinMod = (kidsTotalHoursMod%60);
  var kidsTotalSec = Math.floor(kidsTotalMinMod);

  if (kidsTotalDays > 0) $('kidscachetime').innerHTML += kidsTotalDays + "d ";
  if (kidsTotalHours > 0) $('kidscachetime').innerHTML += kidsTotalHours + "h ";
  if (kidsTotalMin > 0) $('kidscachetime').innerHTML += kidsTotalMin + "m ";
  $('kidscachetime').innerHTML += kidsTotalSec + "s";

  // itemelapsed
  $('kidsitemelapsed').innerHTML = "";
  var kidsTotalDays = Math.floor(kidsitemelapsed/86400);
  var kidsTotalDaysMod = (kidsitemelapsed%86400);
  var kidsTotalHours = Math.floor(kidsTotalDaysMod/3600);
  var kidsTotalHoursMod = (kidsTotalDaysMod%3600);
  var kidsTotalMin = Math.floor(kidsTotalHoursMod/60);
  var kidsTotalMinMod = (kidsTotalHoursMod%60);
  var kidsTotalSec = Math.floor(kidsTotalMinMod);

  if (kidsTotalDays > 0) $('kidsitemelapsed').innerHTML += kidsTotalDays + "d ";
  if (kidsTotalHours > 0) $('kidsitemelapsed').innerHTML += kidsTotalHours + "h ";
  if (kidsTotalMin > 0) $('kidsitemelapsed').innerHTML += kidsTotalMin + "m ";
  $('kidsitemelapsed').innerHTML += kidsTotalSec + "s";

  // itemremaining
  $('kidsitemremaining').innerHTML = "";
  var kidsTotalDays = Math.floor(kidsitemremaining/86400);
  var kidsTotalDaysMod = (kidsitemremaining%86400);
  var kidsTotalHours = Math.floor(kidsTotalDaysMod/3600);
  var kidsTotalHoursMod = (kidsTotalDaysMod%3600);
  var kidsTotalMin = Math.floor(kidsTotalHoursMod/60);
  var kidsTotalMinMod = (kidsTotalHoursMod%60);
  var kidsTotalSec = Math.floor(kidsTotalMinMod);

  if (kidsTotalDays > 0) $('kidsitemremaining').innerHTML += kidsTotalDays + "d ";
  if (kidsTotalHours > 0) $('kidsitemremaining').innerHTML += kidsTotalHours + "h ";
  if (kidsTotalMin > 0) $('kidsitemremaining').innerHTML += kidsTotalMin + "m ";
  $('kidsitemremaining').innerHTML += kidsTotalSec + "s";
  var kidstitemremaining = $('kidsitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('kidsage').innerHTML = "";
  var kidsTotalDays = Math.floor(kidsage/86400);
  var kidsTotalDaysMod = (kidsage%86400);
  var kidsTotalHours = Math.floor(kidsTotalDaysMod/3600);
  var kidsTotalHoursMod = (kidsTotalDaysMod%3600);
  var kidsTotalMin = Math.floor(kidsTotalHoursMod/60);
  var kidsTotalMinMod = (kidsTotalHoursMod%60);
  var kidsTotalSec = Math.floor(kidsTotalMinMod);

  if (kidsTotalDays > 0) $('kidsage').innerHTML += kidsTotalDays + "d ";
  if (kidsTotalHours > 0) $('kidsage').innerHTML += kidsTotalHours + "h ";
  if (kidsTotalMin > 0) $('kidsage').innerHTML += kidsTotalMin + "m ";
  $('kidsage').innerHTML += kidsTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('kidswootoff').innerHTML == "false") {
    var kidsprogressbar = document.getElementById('kidsprogressbar');
    kidsprogressbar.style.height = 0;
    kidsprogressMeterBar.style.width = "100%";
    kidsprogressMeterBar.style.height = 1;
    kidsprogressMeterBar.style.background = "black";
    $('kidspercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.kidstitle = "No Woot Off - Woot Off AJAX Client";
  } else if (kidspercent == "0.0") {
    document.kidstitle = "SOLD OUT - Woot Off AJAX Client";
    $('kidspercent').innerHTML = "SOLD OUT";
    $('kidswootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('kidspercent').innerHTML = kidspercent + "%";
    document.kidstitle = kidspercent + "% ~" + kidstitemremaining + "- Woot Off AJAX Client";
    kidsprogressMeterBar.style.width = kidspercent + "%";
    kidsprogressMeterBar.style.background = "#f29f01";
    $('kidswootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('kidssoldout').innerHTML == "true") {
    $('kidssoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('kidsprice2').innerHTML = "";
  } else  $('kidssoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (kidspercent >= 80)
    kidsprogressMeterBar.style.background = "#4A6751";
  if (kidspercent <= 10)
    kidsprogressMeterBar.style.background = "#FFFF99";
  if (kidspercent <= 5)
    kidsprogressMeterBar.style.background = "#FF9999";
  if (kidspercent < 0.1) 
    kidsprogressMeterBar.style.background = "#FFFFFF";
// end kids

//sellout

  $('sellouttitle').innerHTML = xmlDoc.getElementsByTagName('sellouttitle')[0].firstChild.nodeValue
  $('selloutsubtitle').innerHTML = xmlDoc.getElementsByTagName('selloutsubtitle')[0].firstChild.nodeValue
  $('selloutcondition').innerHTML = xmlDoc.getElementsByTagName('selloutcondition')[0].getAttribute('val');
  $('selloutprice').innerHTML = xmlDoc.getElementsByTagName('selloutprice')[0].getAttribute('val');
  $('selloutprice2').innerHTML = xmlDoc.getElementsByTagName('selloutprice')[0].getAttribute('val');
  $('selloutdesc').innerHTML = xmlDoc.getElementsByTagName('selloutdesc')[0].firstChild.nodeValue
//  $('selloutprods').innerHTML = xmlDoc.getElementsByTagName('selloutprods')[0].firstChild.nodeValue
  $('selloutstdimg').src = xmlDoc.getElementsByTagName('selloutstdimg')[0].getAttribute('val');
  $('selloutdetailimg').href = xmlDoc.getElementsByTagName('selloutdetailimg')[0].getAttribute('val');
//  $('selloutsaleurl').href = xmlDoc.getElementsByTagName('selloutsaleurl')[0].getAttribute('val');
  $('selloutforumurl').href = xmlDoc.getElementsByTagName('selloutforumurl')[0].getAttribute('val');
  $('selloutblogurl').href = xmlDoc.getElementsByTagName('selloutblogurl')[0].getAttribute('val');
  $('selloutpurchaseurl').href = xmlDoc.getElementsByTagName('selloutpurchaseurl')[0].getAttribute('val');
  //$('selloutwootcast').href = xmlDoc.getElementsByTagName('selloutwootcast')[0].getAttribute('val');
  var selloutpercent = xmlDoc.getElementsByTagName('selloutpercent')[0].getAttribute('val');
  $('selloutpercent2').innerHTML = xmlDoc.getElementsByTagName('selloutpercent')[0].getAttribute('val');
  $('selloutwootoff').innerHTML = xmlDoc.getElementsByTagName('selloutwootoff')[0].getAttribute('val');
  $('selloutsoldout').innerHTML = xmlDoc.getElementsByTagName('selloutsoldout')[0].getAttribute('val');
  $('selloutlastBuildDate').innerHTML = xmlDoc.getElementsByTagName('selloutlastBuildDate')[0].getAttribute('val');
  var selloutitemstart = xmlDoc.getElementsByTagName('selloutitemstart')[0].getAttribute('val');
  var selloutitemelapsed = xmlDoc.getElementsByTagName('selloutitemelapsed')[0].getAttribute('val');
  var selloutitemremaining = xmlDoc.getElementsByTagName('selloutitemremaining')[0].getAttribute('val');
  var selloutwoottime = xmlDoc.getElementsByTagName('selloutwoottime')[0].getAttribute('val');
  var selloutscripttime = xmlDoc.getElementsByTagName('selloutscripttime')[0].getAttribute('val');
  var selloutd = new Date();
  var selloutcachetime = Math.round(selloutd.getTime()/1000) - selloutscripttime;
  var selloutage = selloutscripttime - selloutwoottime;
  var selloutprogressMeterBar = document.getElementById('selloutprogressMeterBarDone');


  // itemstart
  $('selloutitemstart').innerHTML = unixTimeToDate(selloutitemstart);

  // cachetime
  $('selloutcachetime').innerHTML = "";
  var selloutTotalDays = Math.floor(selloutcachetime/86400);
  var selloutTotalDaysMod = (selloutcachetime%86400);
  var selloutTotalHours = Math.floor(selloutTotalDaysMod/3600);
  var selloutTotalHoursMod = (selloutTotalDaysMod%3600);
  var selloutTotalMin = Math.floor(selloutTotalHoursMod/60);
  var selloutTotalMinMod = (selloutTotalHoursMod%60);
  var selloutTotalSec = Math.floor(selloutTotalMinMod);

  if (selloutTotalDays > 0) $('selloutcachetime').innerHTML += selloutTotalDays + "d ";
  if (selloutTotalHours > 0) $('selloutcachetime').innerHTML += selloutTotalHours + "h ";
  if (selloutTotalMin > 0) $('selloutcachetime').innerHTML += selloutTotalMin + "m ";
  $('selloutcachetime').innerHTML += selloutTotalSec + "s";

  // itemelapsed
  $('selloutitemelapsed').innerHTML = "";
  var selloutTotalDays = Math.floor(selloutitemelapsed/86400);
  var selloutTotalDaysMod = (selloutitemelapsed%86400);
  var selloutTotalHours = Math.floor(selloutTotalDaysMod/3600);
  var selloutTotalHoursMod = (selloutTotalDaysMod%3600);
  var selloutTotalMin = Math.floor(selloutTotalHoursMod/60);
  var selloutTotalMinMod = (selloutTotalHoursMod%60);
  var selloutTotalSec = Math.floor(selloutTotalMinMod);

  if (selloutTotalDays > 0) $('selloutitemelapsed').innerHTML += selloutTotalDays + "d ";
  if (selloutTotalHours > 0) $('selloutitemelapsed').innerHTML += selloutTotalHours + "h ";
  if (selloutTotalMin > 0) $('selloutitemelapsed').innerHTML += selloutTotalMin + "m ";
  $('selloutitemelapsed').innerHTML += selloutTotalSec + "s";

  // itemremaining
  $('selloutitemremaining').innerHTML = "";
  var selloutTotalDays = Math.floor(selloutitemremaining/86400);
  var selloutTotalDaysMod = (selloutitemremaining%86400);
  var selloutTotalHours = Math.floor(selloutTotalDaysMod/3600);
  var selloutTotalHoursMod = (selloutTotalDaysMod%3600);
  var selloutTotalMin = Math.floor(selloutTotalHoursMod/60);
  var selloutTotalMinMod = (selloutTotalHoursMod%60);
  var selloutTotalSec = Math.floor(selloutTotalMinMod);

  if (selloutTotalDays > 0) $('selloutitemremaining').innerHTML += selloutTotalDays + "d ";
  if (selloutTotalHours > 0) $('selloutitemremaining').innerHTML += selloutTotalHours + "h ";
  if (selloutTotalMin > 0) $('selloutitemremaining').innerHTML += selloutTotalMin + "m ";
  $('selloutitemremaining').innerHTML += selloutTotalSec + "s";
  var sellouttitemremaining = $('selloutitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('selloutage').innerHTML = "";
  var selloutTotalDays = Math.floor(selloutage/86400);
  var selloutTotalDaysMod = (selloutage%86400);
  var selloutTotalHours = Math.floor(selloutTotalDaysMod/3600);
  var selloutTotalHoursMod = (selloutTotalDaysMod%3600);
  var selloutTotalMin = Math.floor(selloutTotalHoursMod/60);
  var selloutTotalMinMod = (selloutTotalHoursMod%60);
  var selloutTotalSec = Math.floor(selloutTotalMinMod);

  if (selloutTotalDays > 0) $('selloutage').innerHTML += selloutTotalDays + "d ";
  if (selloutTotalHours > 0) $('selloutage').innerHTML += selloutTotalHours + "h ";
  if (selloutTotalMin > 0) $('selloutage').innerHTML += selloutTotalMin + "m ";
  $('selloutage').innerHTML += selloutTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('selloutwootoff').innerHTML == "false") {
    var selloutprogressbar = document.getElementById('selloutprogressbar');
    selloutprogressbar.style.height = 0;
    selloutprogressMeterBar.style.width = "100%";
    selloutprogressMeterBar.style.height = 1;
    selloutprogressMeterBar.style.background = "black";
    $('selloutpercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.sellouttitle = "No Woot Off - Woot Off AJAX Client";
  } else if (selloutpercent == "0.0") {
    document.sellouttitle = "SOLD OUT - Woot Off AJAX Client";
    $('selloutpercent').innerHTML = "SOLD OUT";
    $('selloutwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('selloutpercent').innerHTML = selloutpercent + "%";
    document.sellouttitle = selloutpercent + "% ~" + sellouttitemremaining + "- Woot Off AJAX Client";
    selloutprogressMeterBar.style.width = selloutpercent + "%";
    selloutprogressMeterBar.style.background = "#f29f01";
    $('selloutwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('selloutsoldout').innerHTML == "true") {
    $('selloutsoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('selloutprice2').innerHTML = "";
  } else  $('selloutsoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (selloutpercent >= 80)
    selloutprogressMeterBar.style.background = "#4A6751";
  if (selloutpercent <= 10)
    selloutprogressMeterBar.style.background = "#FFFF99";
  if (selloutpercent <= 5)
    selloutprogressMeterBar.style.background = "#FF9999";
  if (selloutpercent < 0.1) 
    selloutprogressMeterBar.style.background = "#FFFFFF";
// end sellout

// home

  $('hometitle').innerHTML = xmlDoc.getElementsByTagName('hometitle')[0].firstChild.nodeValue
  $('homesubtitle').innerHTML = xmlDoc.getElementsByTagName('homesubtitle')[0].firstChild.nodeValue
  $('homecondition').innerHTML = xmlDoc.getElementsByTagName('homecondition')[0].getAttribute('val');
  $('homeprice').innerHTML = xmlDoc.getElementsByTagName('homeprice')[0].getAttribute('val');
  $('homeprice2').innerHTML = xmlDoc.getElementsByTagName('homeprice')[0].getAttribute('val');
  $('homedesc').innerHTML = xmlDoc.getElementsByTagName('homedesc')[0].firstChild.nodeValue
//  $('homeprods').innerHTML = xmlDoc.getElementsByTagName('homeprods')[0].firstChild.nodeValue
  $('homestdimg').src = xmlDoc.getElementsByTagName('homestdimg')[0].getAttribute('val');
  $('homedetailimg').href = xmlDoc.getElementsByTagName('homedetailimg')[0].getAttribute('val');
//  $('homesaleurl').href = xmlDoc.getElementsByTagName('homesaleurl')[0].getAttribute('val');
  $('homeforumurl').href = xmlDoc.getElementsByTagName('homeforumurl')[0].getAttribute('val');
  $('homeblogurl').href = xmlDoc.getElementsByTagName('homeblogurl')[0].getAttribute('val');
  $('homepurchaseurl').href = xmlDoc.getElementsByTagName('homepurchaseurl')[0].getAttribute('val');
  //$('homewootcast').href = xmlDoc.getElementsByTagName('homewootcast')[0].getAttribute('val');
  var homepercent = xmlDoc.getElementsByTagName('homepercent')[0].getAttribute('val');
  $('homepercent2').innerHTML = xmlDoc.getElementsByTagName('homepercent')[0].getAttribute('val');
  $('homewootoff').innerHTML = xmlDoc.getElementsByTagName('homewootoff')[0].getAttribute('val');
  $('homesoldout').innerHTML = xmlDoc.getElementsByTagName('homesoldout')[0].getAttribute('val');
  $('homelastBuildDate').innerHTML = xmlDoc.getElementsByTagName('homelastBuildDate')[0].getAttribute('val');
  var homeitemstart = xmlDoc.getElementsByTagName('homeitemstart')[0].getAttribute('val');
  var homeitemelapsed = xmlDoc.getElementsByTagName('homeitemelapsed')[0].getAttribute('val');
  var homeitemremaining = xmlDoc.getElementsByTagName('homeitemremaining')[0].getAttribute('val');
  var homewoottime = xmlDoc.getElementsByTagName('homewoottime')[0].getAttribute('val');
  var homescripttime = xmlDoc.getElementsByTagName('homescripttime')[0].getAttribute('val');
  var homed = new Date();
  var homecachetime = Math.round(homed.getTime()/1000) - homescripttime;
  var homeage = homescripttime - homewoottime;
  var homeprogressMeterBar = document.getElementById('homeprogressMeterBarDone');


  // itemstart
  $('homeitemstart').innerHTML = unixTimeToDate(homeitemstart);

  // cachetime
  $('homecachetime').innerHTML = "";
  var homeTotalDays = Math.floor(homecachetime/86400);
  var homeTotalDaysMod = (homecachetime%86400);
  var homeTotalHours = Math.floor(homeTotalDaysMod/3600);
  var homeTotalHoursMod = (homeTotalDaysMod%3600);
  var homeTotalMin = Math.floor(homeTotalHoursMod/60);
  var homeTotalMinMod = (homeTotalHoursMod%60);
  var homeTotalSec = Math.floor(homeTotalMinMod);

  if (homeTotalDays > 0) $('homecachetime').innerHTML += homeTotalDays + "d ";
  if (homeTotalHours > 0) $('homecachetime').innerHTML += homeTotalHours + "h ";
  if (homeTotalMin > 0) $('homecachetime').innerHTML += homeTotalMin + "m ";
  $('homecachetime').innerHTML += homeTotalSec + "s";

  // itemelapsed
  $('homeitemelapsed').innerHTML = "";
  var homeTotalDays = Math.floor(homeitemelapsed/86400);
  var homeTotalDaysMod = (homeitemelapsed%86400);
  var homeTotalHours = Math.floor(homeTotalDaysMod/3600);
  var homeTotalHoursMod = (homeTotalDaysMod%3600);
  var homeTotalMin = Math.floor(homeTotalHoursMod/60);
  var homeTotalMinMod = (homeTotalHoursMod%60);
  var homeTotalSec = Math.floor(homeTotalMinMod);

  if (homeTotalDays > 0) $('homeitemelapsed').innerHTML += homeTotalDays + "d ";
  if (homeTotalHours > 0) $('homeitemelapsed').innerHTML += homeTotalHours + "h ";
  if (homeTotalMin > 0) $('homeitemelapsed').innerHTML += homeTotalMin + "m ";
  $('homeitemelapsed').innerHTML += homeTotalSec + "s";

  // itemremaining
  $('homeitemremaining').innerHTML = "";
  var homeTotalDays = Math.floor(homeitemremaining/86400);
  var homeTotalDaysMod = (homeitemremaining%86400);
  var homeTotalHours = Math.floor(homeTotalDaysMod/3600);
  var homeTotalHoursMod = (homeTotalDaysMod%3600);
  var homeTotalMin = Math.floor(homeTotalHoursMod/60);
  var homeTotalMinMod = (homeTotalHoursMod%60);
  var homeTotalSec = Math.floor(homeTotalMinMod);

  if (homeTotalDays > 0) $('homeitemremaining').innerHTML += homeTotalDays + "d ";
  if (homeTotalHours > 0) $('homeitemremaining').innerHTML += homeTotalHours + "h ";
  if (homeTotalMin > 0) $('homeitemremaining').innerHTML += homeTotalMin + "m ";
  $('homeitemremaining').innerHTML += homeTotalSec + "s";
  var hometitemremaining = $('homeitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('homeage').innerHTML = "";
  var homeTotalDays = Math.floor(homeage/86400);
  var homeTotalDaysMod = (homeage%86400);
  var homeTotalHours = Math.floor(homeTotalDaysMod/3600);
  var homeTotalHoursMod = (homeTotalDaysMod%3600);
  var homeTotalMin = Math.floor(homeTotalHoursMod/60);
  var homeTotalMinMod = (homeTotalHoursMod%60);
  var homeTotalSec = Math.floor(homeTotalMinMod);

  if (homeTotalDays > 0) $('homeage').innerHTML += homeTotalDays + "d ";
  if (homeTotalHours > 0) $('homeage').innerHTML += homeTotalHours + "h ";
  if (homeTotalMin > 0) $('homeage').innerHTML += homeTotalMin + "m ";
  $('homeage').innerHTML += homeTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('homewootoff').innerHTML == "false") {
    var homeprogressbar = document.getElementById('homeprogressbar');
    homeprogressbar.style.height = 0;
    homeprogressMeterBar.style.width = "100%";
    homeprogressMeterBar.style.height = 1;
    homeprogressMeterBar.style.background = "black";
    $('homepercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.hometitle = "No Woot Off - Woot Off AJAX Client";
  } else if (homepercent == "0.0") {
    document.hometitle = "SOLD OUT - Woot Off AJAX Client";
    $('homepercent').innerHTML = "SOLD OUT";
    $('homewootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('homepercent').innerHTML = homepercent + "%";
    document.hometitle = homepercent + "% ~" + hometitemremaining + "- Woot Off AJAX Client";
    homeprogressMeterBar.style.width = homepercent + "%";
    homeprogressMeterBar.style.background = "#f29f01";
    $('homewootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('homesoldout').innerHTML == "true") {
    $('homesoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('homeprice2').innerHTML = "";
  } else  $('homesoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (homepercent >= 80)
    homeprogressMeterBar.style.background = "#4A6751";
  if (homepercent <= 10)
    homeprogressMeterBar.style.background = "#FFFF99";
  if (homepercent <= 5)
    homeprogressMeterBar.style.background = "#FF9999";
  if (homepercent < 0.1) 
    homeprogressMeterBar.style.background = "#FFFFFF";
// end home

// shirt

  $('shirttitle').innerHTML = xmlDoc.getElementsByTagName('shirttitle')[0].firstChild.nodeValue
  $('shirtsubtitle').innerHTML = xmlDoc.getElementsByTagName('shirtsubtitle')[0].firstChild.nodeValue
  $('shirtcondition').innerHTML = xmlDoc.getElementsByTagName('shirtcondition')[0].getAttribute('val');
  $('shirtprice').innerHTML = xmlDoc.getElementsByTagName('shirtprice')[0].getAttribute('val');
  $('shirtprice2').innerHTML = xmlDoc.getElementsByTagName('shirtprice')[0].getAttribute('val');
  $('shirtdesc').innerHTML = xmlDoc.getElementsByTagName('shirtdesc')[0].firstChild.nodeValue
//  $('shirtprods').innerHTML = xmlDoc.getElementsByTagName('shirtprods')[0].firstChild.nodeValue
  $('shirtstdimg').src = xmlDoc.getElementsByTagName('shirtstdimg')[0].getAttribute('val');
  $('shirtdetailimg').href = xmlDoc.getElementsByTagName('shirtdetailimg')[0].getAttribute('val');
//  $('shirtsaleurl').href = xmlDoc.getElementsByTagName('shirtsaleurl')[0].getAttribute('val');
  $('shirtforumurl').href = xmlDoc.getElementsByTagName('shirtforumurl')[0].getAttribute('val');
  $('shirtblogurl').href = xmlDoc.getElementsByTagName('shirtblogurl')[0].getAttribute('val');
  $('shirtpurchaseurl').href = xmlDoc.getElementsByTagName('shirtpurchaseurl')[0].getAttribute('val');
  //$('shirtwootcast').href = xmlDoc.getElementsByTagName('shirtwootcast')[0].getAttribute('val');
  var shirtpercent = xmlDoc.getElementsByTagName('shirtpercent')[0].getAttribute('val');
  $('shirtpercent2').innerHTML = xmlDoc.getElementsByTagName('shirtpercent')[0].getAttribute('val');
  $('shirtwootoff').innerHTML = xmlDoc.getElementsByTagName('shirtwootoff')[0].getAttribute('val');
  $('shirtsoldout').innerHTML = xmlDoc.getElementsByTagName('shirtsoldout')[0].getAttribute('val');
  $('shirtlastBuildDate').innerHTML = xmlDoc.getElementsByTagName('shirtlastBuildDate')[0].getAttribute('val');
  var shirtitemstart = xmlDoc.getElementsByTagName('shirtitemstart')[0].getAttribute('val');
  var shirtitemelapsed = xmlDoc.getElementsByTagName('shirtitemelapsed')[0].getAttribute('val');
  var shirtitemremaining = xmlDoc.getElementsByTagName('shirtitemremaining')[0].getAttribute('val');
  var shirtwoottime = xmlDoc.getElementsByTagName('shirtwoottime')[0].getAttribute('val');
  var shirtscripttime = xmlDoc.getElementsByTagName('shirtscripttime')[0].getAttribute('val');
  var shirtd = new Date();
  var shirtcachetime = Math.round(shirtd.getTime()/1000) - shirtscripttime;
  var shirtage = shirtscripttime - shirtwoottime;
  var shirtprogressMeterBar = document.getElementById('shirtprogressMeterBarDone');


  // itemstart
  $('shirtitemstart').innerHTML = unixTimeToDate(shirtitemstart);

  // cachetime
  $('shirtcachetime').innerHTML = "";
  var shirtTotalDays = Math.floor(shirtcachetime/86400);
  var shirtTotalDaysMod = (shirtcachetime%86400);
  var shirtTotalHours = Math.floor(shirtTotalDaysMod/3600);
  var shirtTotalHoursMod = (shirtTotalDaysMod%3600);
  var shirtTotalMin = Math.floor(shirtTotalHoursMod/60);
  var shirtTotalMinMod = (shirtTotalHoursMod%60);
  var shirtTotalSec = Math.floor(shirtTotalMinMod);

  if (shirtTotalDays > 0) $('shirtcachetime').innerHTML += shirtTotalDays + "d ";
  if (shirtTotalHours > 0) $('shirtcachetime').innerHTML += shirtTotalHours + "h ";
  if (shirtTotalMin > 0) $('shirtcachetime').innerHTML += shirtTotalMin + "m ";
  $('shirtcachetime').innerHTML += shirtTotalSec + "s";

  // itemelapsed
  $('shirtitemelapsed').innerHTML = "";
  var shirtTotalDays = Math.floor(shirtitemelapsed/86400);
  var shirtTotalDaysMod = (shirtitemelapsed%86400);
  var shirtTotalHours = Math.floor(shirtTotalDaysMod/3600);
  var shirtTotalHoursMod = (shirtTotalDaysMod%3600);
  var shirtTotalMin = Math.floor(shirtTotalHoursMod/60);
  var shirtTotalMinMod = (shirtTotalHoursMod%60);
  var shirtTotalSec = Math.floor(shirtTotalMinMod);

  if (shirtTotalDays > 0) $('shirtitemelapsed').innerHTML += shirtTotalDays + "d ";
  if (shirtTotalHours > 0) $('shirtitemelapsed').innerHTML += shirtTotalHours + "h ";
  if (shirtTotalMin > 0) $('shirtitemelapsed').innerHTML += shirtTotalMin + "m ";
  $('shirtitemelapsed').innerHTML += shirtTotalSec + "s";

  // itemremaining
  $('shirtitemremaining').innerHTML = "";
  var shirtTotalDays = Math.floor(shirtitemremaining/86400);
  var shirtTotalDaysMod = (shirtitemremaining%86400);
  var shirtTotalHours = Math.floor(shirtTotalDaysMod/3600);
  var shirtTotalHoursMod = (shirtTotalDaysMod%3600);
  var shirtTotalMin = Math.floor(shirtTotalHoursMod/60);
  var shirtTotalMinMod = (shirtTotalHoursMod%60);
  var shirtTotalSec = Math.floor(shirtTotalMinMod);

  if (shirtTotalDays > 0) $('shirtitemremaining').innerHTML += shirtTotalDays + "d ";
  if (shirtTotalHours > 0) $('shirtitemremaining').innerHTML += shirtTotalHours + "h ";
  if (shirtTotalMin > 0) $('shirtitemremaining').innerHTML += shirtTotalMin + "m ";
  $('shirtitemremaining').innerHTML += shirtTotalSec + "s";
  var shirttitemremaining = $('shirtitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('shirtage').innerHTML = "";
  var shirtTotalDays = Math.floor(shirtage/86400);
  var shirtTotalDaysMod = (shirtage%86400);
  var shirtTotalHours = Math.floor(shirtTotalDaysMod/3600);
  var shirtTotalHoursMod = (shirtTotalDaysMod%3600);
  var shirtTotalMin = Math.floor(shirtTotalHoursMod/60);
  var shirtTotalMinMod = (shirtTotalHoursMod%60);
  var shirtTotalSec = Math.floor(shirtTotalMinMod);

  if (shirtTotalDays > 0) $('shirtage').innerHTML += shirtTotalDays + "d ";
  if (shirtTotalHours > 0) $('shirtage').innerHTML += shirtTotalHours + "h ";
  if (shirtTotalMin > 0) $('shirtage').innerHTML += shirtTotalMin + "m ";
  $('shirtage').innerHTML += shirtTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('shirtwootoff').innerHTML == "false") {
    var shirtprogressbar = document.getElementById('shirtprogressbar');
    shirtprogressbar.style.height = 0;
    shirtprogressMeterBar.style.width = "100%";
    shirtprogressMeterBar.style.height = 1;
    shirtprogressMeterBar.style.background = "black";
    $('shirtpercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.shirttitle = "No Woot Off - Woot Off AJAX Client";
  } else if (shirtpercent == "0.0") {
    document.shirttitle = "SOLD OUT - Woot Off AJAX Client";
    $('shirtpercent').innerHTML = "SOLD OUT";
    $('shirtwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('shirtpercent').innerHTML = shirtpercent + "%";
    document.shirttitle = shirtpercent + "% ~" + shirttitemremaining + "- Woot Off AJAX Client";
    shirtprogressMeterBar.style.width = shirtpercent + "%";
    shirtprogressMeterBar.style.background = "#f29f01";
    $('shirtwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('shirtsoldout').innerHTML == "true") {
    $('shirtsoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('shirtprice2').innerHTML = "";
  } else  $('shirtsoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (shirtpercent >= 80)
    shirtprogressMeterBar.style.background = "#4A6751";
  if (shirtpercent <= 10)
    shirtprogressMeterBar.style.background = "#FFFF99";
  if (shirtpercent <= 5)
    shirtprogressMeterBar.style.background = "#FF9999";
  if (shirtpercent < 0.1) 
    shirtprogressMeterBar.style.background = "#FFFFFF";
// end shirt


  $('sporttitle').innerHTML = xmlDoc.getElementsByTagName('sporttitle')[0].firstChild.nodeValue
  $('sportsubtitle').innerHTML = xmlDoc.getElementsByTagName('sportsubtitle')[0].firstChild.nodeValue
  $('sportcondition').innerHTML = xmlDoc.getElementsByTagName('sportcondition')[0].getAttribute('val');
  $('sportprice').innerHTML = xmlDoc.getElementsByTagName('sportprice')[0].getAttribute('val');
  $('sportprice2').innerHTML = xmlDoc.getElementsByTagName('sportprice')[0].getAttribute('val');
  $('sportdesc').innerHTML = xmlDoc.getElementsByTagName('sportdesc')[0].firstChild.nodeValue
//  $('sportprods').innerHTML = xmlDoc.getElementsByTagName('sportprods')[0].firstChild.nodeValue
  $('sportstdimg').src = xmlDoc.getElementsByTagName('sportstdimg')[0].getAttribute('val');
  $('sportdetailimg').href = xmlDoc.getElementsByTagName('sportdetailimg')[0].getAttribute('val');
//  $('sportsaleurl').href = xmlDoc.getElementsByTagName('sportsaleurl')[0].getAttribute('val');
  $('sportforumurl').href = xmlDoc.getElementsByTagName('sportforumurl')[0].getAttribute('val');
  $('sportblogurl').href = xmlDoc.getElementsByTagName('sportblogurl')[0].getAttribute('val');
  $('sportpurchaseurl').href = xmlDoc.getElementsByTagName('sportpurchaseurl')[0].getAttribute('val');
  //$('sportwootcast').href = xmlDoc.getElementsByTagName('sportwootcast')[0].getAttribute('val');
  var sportpercent = xmlDoc.getElementsByTagName('sportpercent')[0].getAttribute('val');
  $('sportpercent2').innerHTML = xmlDoc.getElementsByTagName('sportpercent')[0].getAttribute('val');
  $('sportwootoff').innerHTML = xmlDoc.getElementsByTagName('sportwootoff')[0].getAttribute('val');
  $('sportsoldout').innerHTML = xmlDoc.getElementsByTagName('sportsoldout')[0].getAttribute('val');
  $('sportlastBuildDate').innerHTML = xmlDoc.getElementsByTagName('sportlastBuildDate')[0].getAttribute('val');
  var sportitemstart = xmlDoc.getElementsByTagName('sportitemstart')[0].getAttribute('val');
  var sportitemelapsed = xmlDoc.getElementsByTagName('sportitemelapsed')[0].getAttribute('val');
  var sportitemremaining = xmlDoc.getElementsByTagName('sportitemremaining')[0].getAttribute('val');
  var sportwoottime = xmlDoc.getElementsByTagName('sportwoottime')[0].getAttribute('val');
  var sportscripttime = xmlDoc.getElementsByTagName('sportscripttime')[0].getAttribute('val');
  var sportd = new Date();
  var sportcachetime = Math.round(sportd.getTime()/1000) - sportscripttime;
  var sportage = sportscripttime - sportwoottime;
  var sportprogressMeterBar = document.getElementById('sportprogressMeterBarDone');


  // itemstart
  $('sportitemstart').innerHTML = unixTimeToDate(sportitemstart);

  // cachetime
  $('sportcachetime').innerHTML = "";
  var sportTotalDays = Math.floor(sportcachetime/86400);
  var sportTotalDaysMod = (sportcachetime%86400);
  var sportTotalHours = Math.floor(sportTotalDaysMod/3600);
  var sportTotalHoursMod = (sportTotalDaysMod%3600);
  var sportTotalMin = Math.floor(sportTotalHoursMod/60);
  var sportTotalMinMod = (sportTotalHoursMod%60);
  var sportTotalSec = Math.floor(sportTotalMinMod);

  if (sportTotalDays > 0) $('sportcachetime').innerHTML += sportTotalDays + "d ";
  if (sportTotalHours > 0) $('sportcachetime').innerHTML += sportTotalHours + "h ";
  if (sportTotalMin > 0) $('sportcachetime').innerHTML += sportTotalMin + "m ";
  $('sportcachetime').innerHTML += sportTotalSec + "s";

  // itemelapsed
  $('sportitemelapsed').innerHTML = "";
  var sportTotalDays = Math.floor(sportitemelapsed/86400);
  var sportTotalDaysMod = (sportitemelapsed%86400);
  var sportTotalHours = Math.floor(sportTotalDaysMod/3600);
  var sportTotalHoursMod = (sportTotalDaysMod%3600);
  var sportTotalMin = Math.floor(sportTotalHoursMod/60);
  var sportTotalMinMod = (sportTotalHoursMod%60);
  var sportTotalSec = Math.floor(sportTotalMinMod);

  if (sportTotalDays > 0) $('sportitemelapsed').innerHTML += sportTotalDays + "d ";
  if (sportTotalHours > 0) $('sportitemelapsed').innerHTML += sportTotalHours + "h ";
  if (sportTotalMin > 0) $('sportitemelapsed').innerHTML += sportTotalMin + "m ";
  $('sportitemelapsed').innerHTML += sportTotalSec + "s";

  // itemremaining
  $('sportitemremaining').innerHTML = "";
  var sportTotalDays = Math.floor(sportitemremaining/86400);
  var sportTotalDaysMod = (sportitemremaining%86400);
  var sportTotalHours = Math.floor(sportTotalDaysMod/3600);
  var sportTotalHoursMod = (sportTotalDaysMod%3600);
  var sportTotalMin = Math.floor(sportTotalHoursMod/60);
  var sportTotalMinMod = (sportTotalHoursMod%60);
  var sportTotalSec = Math.floor(sportTotalMinMod);

  if (sportTotalDays > 0) $('sportitemremaining').innerHTML += sportTotalDays + "d ";
  if (sportTotalHours > 0) $('sportitemremaining').innerHTML += sportTotalHours + "h ";
  if (sportTotalMin > 0) $('sportitemremaining').innerHTML += sportTotalMin + "m ";
  $('sportitemremaining').innerHTML += sportTotalSec + "s";
  var sporttitemremaining = $('sportitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('sportage').innerHTML = "";
  var sportTotalDays = Math.floor(sportage/86400);
  var sportTotalDaysMod = (sportage%86400);
  var sportTotalHours = Math.floor(sportTotalDaysMod/3600);
  var sportTotalHoursMod = (sportTotalDaysMod%3600);
  var sportTotalMin = Math.floor(sportTotalHoursMod/60);
  var sportTotalMinMod = (sportTotalHoursMod%60);
  var sportTotalSec = Math.floor(sportTotalMinMod);

  if (sportTotalDays > 0) $('sportage').innerHTML += sportTotalDays + "d ";
  if (sportTotalHours > 0) $('sportage').innerHTML += sportTotalHours + "h ";
  if (sportTotalMin > 0) $('sportage').innerHTML += sportTotalMin + "m ";
  $('sportage').innerHTML += sportTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('sportwootoff').innerHTML == "false") {
    var sportprogressbar = document.getElementById('sportprogressbar');
    sportprogressbar.style.height = 0;
    sportprogressMeterBar.style.width = "100%";
    sportprogressMeterBar.style.height = 1;
    sportprogressMeterBar.style.background = "black";
    $('sportpercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.sporttitle = "No Woot Off - Woot Off AJAX Client";
  } else if (sportpercent == "0.0") {
    document.sporttitle = "SOLD OUT - Woot Off AJAX Client";
    $('sportpercent').innerHTML = "SOLD OUT";
    $('sportwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('sportpercent').innerHTML = sportpercent + "%";
    document.sporttitle = sportpercent + "% ~" + sporttitemremaining + "- Woot Off AJAX Client";
    sportprogressMeterBar.style.width = sportpercent + "%";
    sportprogressMeterBar.style.background = "#f29f01";
    $('sportwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('sportsoldout').innerHTML == "true") {
    $('sportsoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('sportprice2').innerHTML = "";
  } else  $('sportsoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (sportpercent >= 80)
    sportprogressMeterBar.style.background = "#4A6751";
  if (sportpercent <= 10)
    sportprogressMeterBar.style.background = "#FFFF99";
  if (sportpercent <= 5)
    sportprogressMeterBar.style.background = "#FF9999";
  if (sportpercent < 0.1) 
    sportprogressMeterBar.style.background = "#FFFFFF";


  $('techtitle').innerHTML = xmlDoc.getElementsByTagName('techtitle')[0].firstChild.nodeValue
  $('techsubtitle').innerHTML = xmlDoc.getElementsByTagName('techsubtitle')[0].firstChild.nodeValue
  $('techcondition').innerHTML = xmlDoc.getElementsByTagName('techcondition')[0].getAttribute('val');
  $('techprice').innerHTML = xmlDoc.getElementsByTagName('techprice')[0].getAttribute('val');
  $('techprice2').innerHTML = xmlDoc.getElementsByTagName('techprice')[0].getAttribute('val');
  $('techdesc').innerHTML = xmlDoc.getElementsByTagName('techdesc')[0].firstChild.nodeValue
//  $('techprods').innerHTML = xmlDoc.getElementsByTagName('techprods')[0].firstChild.nodeValue
  $('techstdimg').src = xmlDoc.getElementsByTagName('techstdimg')[0].getAttribute('val');
  $('techdetailimg').href = xmlDoc.getElementsByTagName('techdetailimg')[0].getAttribute('val');
//  $('techsaleurl').href = xmlDoc.getElementsByTagName('techsaleurl')[0].getAttribute('val');
  $('techforumurl').href = xmlDoc.getElementsByTagName('techforumurl')[0].getAttribute('val');
  $('techblogurl').href = xmlDoc.getElementsByTagName('techblogurl')[0].getAttribute('val');
  $('techpurchaseurl').href = xmlDoc.getElementsByTagName('techpurchaseurl')[0].getAttribute('val');
  //$('techwootcast').href = xmlDoc.getElementsByTagName('techwootcast')[0].getAttribute('val');
  var techpercent = xmlDoc.getElementsByTagName('techpercent')[0].getAttribute('val');
  $('techpercent2').innerHTML = xmlDoc.getElementsByTagName('techpercent')[0].getAttribute('val');
  $('techwootoff').innerHTML = xmlDoc.getElementsByTagName('techwootoff')[0].getAttribute('val');
  $('techsoldout').innerHTML = xmlDoc.getElementsByTagName('techsoldout')[0].getAttribute('val');
  $('techlastBuildDate').innerHTML = xmlDoc.getElementsByTagName('techlastBuildDate')[0].getAttribute('val');
  var techitemstart = xmlDoc.getElementsByTagName('techitemstart')[0].getAttribute('val');
  var techitemelapsed = xmlDoc.getElementsByTagName('techitemelapsed')[0].getAttribute('val');
  var techitemremaining = xmlDoc.getElementsByTagName('techitemremaining')[0].getAttribute('val');
  var techwoottime = xmlDoc.getElementsByTagName('techwoottime')[0].getAttribute('val');
  var techscripttime = xmlDoc.getElementsByTagName('techscripttime')[0].getAttribute('val');
  var techd = new Date();
  var techcachetime = Math.round(techd.getTime()/1000) - techscripttime;
  var techage = techscripttime - techwoottime;
  var techprogressMeterBar = document.getElementById('techprogressMeterBarDone');


  // itemstart
  $('techitemstart').innerHTML = unixTimeToDate(techitemstart);

  // cachetime
  $('techcachetime').innerHTML = "";
  var techTotalDays = Math.floor(techcachetime/86400);
  var techTotalDaysMod = (techcachetime%86400);
  var techTotalHours = Math.floor(techTotalDaysMod/3600);
  var techTotalHoursMod = (techTotalDaysMod%3600);
  var techTotalMin = Math.floor(techTotalHoursMod/60);
  var techTotalMinMod = (techTotalHoursMod%60);
  var techTotalSec = Math.floor(techTotalMinMod);

  if (techTotalDays > 0) $('techcachetime').innerHTML += techTotalDays + "d ";
  if (techTotalHours > 0) $('techcachetime').innerHTML += techTotalHours + "h ";
  if (techTotalMin > 0) $('techcachetime').innerHTML += techTotalMin + "m ";
  $('techcachetime').innerHTML += techTotalSec + "s";

  // itemelapsed
  $('techitemelapsed').innerHTML = "";
  var techTotalDays = Math.floor(techitemelapsed/86400);
  var techTotalDaysMod = (techitemelapsed%86400);
  var techTotalHours = Math.floor(techTotalDaysMod/3600);
  var techTotalHoursMod = (techTotalDaysMod%3600);
  var techTotalMin = Math.floor(techTotalHoursMod/60);
  var techTotalMinMod = (techTotalHoursMod%60);
  var techTotalSec = Math.floor(techTotalMinMod);

  if (techTotalDays > 0) $('techitemelapsed').innerHTML += techTotalDays + "d ";
  if (techTotalHours > 0) $('techitemelapsed').innerHTML += techTotalHours + "h ";
  if (techTotalMin > 0) $('techitemelapsed').innerHTML += techTotalMin + "m ";
  $('techitemelapsed').innerHTML += techTotalSec + "s";

  // itemremaining
  $('techitemremaining').innerHTML = "";
  var techTotalDays = Math.floor(techitemremaining/86400);
  var techTotalDaysMod = (techitemremaining%86400);
  var techTotalHours = Math.floor(techTotalDaysMod/3600);
  var techTotalHoursMod = (techTotalDaysMod%3600);
  var techTotalMin = Math.floor(techTotalHoursMod/60);
  var techTotalMinMod = (techTotalHoursMod%60);
  var techTotalSec = Math.floor(techTotalMinMod);

  if (techTotalDays > 0) $('techitemremaining').innerHTML += techTotalDays + "d ";
  if (techTotalHours > 0) $('techitemremaining').innerHTML += techTotalHours + "h ";
  if (techTotalMin > 0) $('techitemremaining').innerHTML += techTotalMin + "m ";
  $('techitemremaining').innerHTML += techTotalSec + "s";
  var techtitemremaining = $('techitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('techage').innerHTML = "";
  var techTotalDays = Math.floor(techage/86400);
  var techTotalDaysMod = (techage%86400);
  var techTotalHours = Math.floor(techTotalDaysMod/3600);
  var techTotalHoursMod = (techTotalDaysMod%3600);
  var techTotalMin = Math.floor(techTotalHoursMod/60);
  var techTotalMinMod = (techTotalHoursMod%60);
  var techTotalSec = Math.floor(techTotalMinMod);

  if (techTotalDays > 0) $('techage').innerHTML += techTotalDays + "d ";
  if (techTotalHours > 0) $('techage').innerHTML += techTotalHours + "h ";
  if (techTotalMin > 0) $('techage').innerHTML += techTotalMin + "m ";
  $('techage').innerHTML += techTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('techwootoff').innerHTML == "false") {
    var techprogressbar = document.getElementById('techprogressbar');
    techprogressbar.style.height = 0;
    techprogressMeterBar.style.width = "100%";
    techprogressMeterBar.style.height = 1;
    techprogressMeterBar.style.background = "black";
    $('techpercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.techtitle = "No Woot Off - Woot Off AJAX Client";
  } else if (techpercent == "0.0") {
    document.techtitle = "SOLD OUT - Woot Off AJAX Client";
    $('techpercent').innerHTML = "SOLD OUT";
    $('techwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('techpercent').innerHTML = techpercent + "%";
    document.techtitle = techpercent + "% ~" + techtitemremaining + "- Woot Off AJAX Client";
    techprogressMeterBar.style.width = techpercent + "%";
    techprogressMeterBar.style.background = "#f29f01";
    $('techwootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('techsoldout').innerHTML == "true") {
    $('techsoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('techprice2').innerHTML = "";
  } else  $('techsoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (techpercent >= 80)
    techprogressMeterBar.style.background = "#4A6751";
  if (techpercent <= 10)
    techprogressMeterBar.style.background = "#FFFF99";
  if (techpercent <= 5)
    techprogressMeterBar.style.background = "#FF9999";
  if (techpercent < 0.1) 
    techprogressMeterBar.style.background = "#FFFFFF";


  $('toolstitle').innerHTML = xmlDoc.getElementsByTagName('toolstitle')[0].firstChild.nodeValue
  $('toolssubtitle').innerHTML = xmlDoc.getElementsByTagName('toolssubtitle')[0].firstChild.nodeValue
  $('toolscondition').innerHTML = xmlDoc.getElementsByTagName('toolscondition')[0].getAttribute('val');
  $('toolsprice').innerHTML = xmlDoc.getElementsByTagName('toolsprice')[0].getAttribute('val');
  $('toolsprice2').innerHTML = xmlDoc.getElementsByTagName('toolsprice')[0].getAttribute('val');
  $('toolsdesc').innerHTML = xmlDoc.getElementsByTagName('toolsdesc')[0].firstChild.nodeValue
//  $('toolsprods').innerHTML = xmlDoc.getElementsByTagName('toolsprods')[0].firstChild.nodeValue
  $('toolsstdimg').src = xmlDoc.getElementsByTagName('toolsstdimg')[0].getAttribute('val');
  $('toolsdetailimg').href = xmlDoc.getElementsByTagName('toolsdetailimg')[0].getAttribute('val');
//  $('toolssaleurl').href = xmlDoc.getElementsByTagName('toolssaleurl')[0].getAttribute('val');
  $('toolsforumurl').href = xmlDoc.getElementsByTagName('toolsforumurl')[0].getAttribute('val');
  $('toolsblogurl').href = xmlDoc.getElementsByTagName('toolsblogurl')[0].getAttribute('val');
  $('toolspurchaseurl').href = xmlDoc.getElementsByTagName('toolspurchaseurl')[0].getAttribute('val');
  //$('toolswootcast').href = xmlDoc.getElementsByTagName('toolswootcast')[0].getAttribute('val');
  var toolspercent = xmlDoc.getElementsByTagName('toolspercent')[0].getAttribute('val');
  $('toolspercent2').innerHTML = xmlDoc.getElementsByTagName('toolspercent')[0].getAttribute('val');
  $('toolswootoff').innerHTML = xmlDoc.getElementsByTagName('toolswootoff')[0].getAttribute('val');
  $('toolssoldout').innerHTML = xmlDoc.getElementsByTagName('toolssoldout')[0].getAttribute('val');
  $('toolslastBuildDate').innerHTML = xmlDoc.getElementsByTagName('toolslastBuildDate')[0].getAttribute('val');
  var toolsitemstart = xmlDoc.getElementsByTagName('toolsitemstart')[0].getAttribute('val');
  var toolsitemelapsed = xmlDoc.getElementsByTagName('toolsitemelapsed')[0].getAttribute('val');
  var toolsitemremaining = xmlDoc.getElementsByTagName('toolsitemremaining')[0].getAttribute('val');
  var toolswoottime = xmlDoc.getElementsByTagName('toolswoottime')[0].getAttribute('val');
  var toolsscripttime = xmlDoc.getElementsByTagName('toolsscripttime')[0].getAttribute('val');
  var toolsd = new Date();
  var toolscachetime = Math.round(toolsd.getTime()/1000) - toolsscripttime;
  var toolsage = toolsscripttime - toolswoottime;
  var toolsprogressMeterBar = document.getElementById('toolsprogressMeterBarDone');


  // itemstart
  $('toolsitemstart').innerHTML = unixTimeToDate(toolsitemstart);

  // cachetime
  $('toolscachetime').innerHTML = "";
  var toolsTotalDays = Math.floor(toolscachetime/86400);
  var toolsTotalDaysMod = (toolscachetime%86400);
  var toolsTotalHours = Math.floor(toolsTotalDaysMod/3600);
  var toolsTotalHoursMod = (toolsTotalDaysMod%3600);
  var toolsTotalMin = Math.floor(toolsTotalHoursMod/60);
  var toolsTotalMinMod = (toolsTotalHoursMod%60);
  var toolsTotalSec = Math.floor(toolsTotalMinMod);

  if (toolsTotalDays > 0) $('toolscachetime').innerHTML += toolsTotalDays + "d ";
  if (toolsTotalHours > 0) $('toolscachetime').innerHTML += toolsTotalHours + "h ";
  if (toolsTotalMin > 0) $('toolscachetime').innerHTML += toolsTotalMin + "m ";
  $('toolscachetime').innerHTML += toolsTotalSec + "s";

  // itemelapsed
  $('toolsitemelapsed').innerHTML = "";
  var toolsTotalDays = Math.floor(toolsitemelapsed/86400);
  var toolsTotalDaysMod = (toolsitemelapsed%86400);
  var toolsTotalHours = Math.floor(toolsTotalDaysMod/3600);
  var toolsTotalHoursMod = (toolsTotalDaysMod%3600);
  var toolsTotalMin = Math.floor(toolsTotalHoursMod/60);
  var toolsTotalMinMod = (toolsTotalHoursMod%60);
  var toolsTotalSec = Math.floor(toolsTotalMinMod);

  if (toolsTotalDays > 0) $('toolsitemelapsed').innerHTML += toolsTotalDays + "d ";
  if (toolsTotalHours > 0) $('toolsitemelapsed').innerHTML += toolsTotalHours + "h ";
  if (toolsTotalMin > 0) $('toolsitemelapsed').innerHTML += toolsTotalMin + "m ";
  $('toolsitemelapsed').innerHTML += toolsTotalSec + "s";

  // itemremaining
  $('toolsitemremaining').innerHTML = "";
  var toolsTotalDays = Math.floor(toolsitemremaining/86400);
  var toolsTotalDaysMod = (toolsitemremaining%86400);
  var toolsTotalHours = Math.floor(toolsTotalDaysMod/3600);
  var toolsTotalHoursMod = (toolsTotalDaysMod%3600);
  var toolsTotalMin = Math.floor(toolsTotalHoursMod/60);
  var toolsTotalMinMod = (toolsTotalHoursMod%60);
  var toolsTotalSec = Math.floor(toolsTotalMinMod);

  if (toolsTotalDays > 0) $('toolsitemremaining').innerHTML += toolsTotalDays + "d ";
  if (toolsTotalHours > 0) $('toolsitemremaining').innerHTML += toolsTotalHours + "h ";
  if (toolsTotalMin > 0) $('toolsitemremaining').innerHTML += toolsTotalMin + "m ";
  $('toolsitemremaining').innerHTML += toolsTotalSec + "s";
  var toolstitemremaining = $('toolsitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('toolsage').innerHTML = "";
  var toolsTotalDays = Math.floor(toolsage/86400);
  var toolsTotalDaysMod = (toolsage%86400);
  var toolsTotalHours = Math.floor(toolsTotalDaysMod/3600);
  var toolsTotalHoursMod = (toolsTotalDaysMod%3600);
  var toolsTotalMin = Math.floor(toolsTotalHoursMod/60);
  var toolsTotalMinMod = (toolsTotalHoursMod%60);
  var toolsTotalSec = Math.floor(toolsTotalMinMod);

  if (toolsTotalDays > 0) $('toolsage').innerHTML += toolsTotalDays + "d ";
  if (toolsTotalHours > 0) $('toolsage').innerHTML += toolsTotalHours + "h ";
  if (toolsTotalMin > 0) $('toolsage').innerHTML += toolsTotalMin + "m ";
  $('toolsage').innerHTML += toolsTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('toolswootoff').innerHTML == "false") {
    var toolsprogressbar = document.getElementById('toolsprogressbar');
    toolsprogressbar.style.height = 0;
    toolsprogressMeterBar.style.width = "100%";
    toolsprogressMeterBar.style.height = 1;
    toolsprogressMeterBar.style.background = "black";
    $('toolspercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.toolstitle = "No Woot Off - Woot Off AJAX Client";
  } else if (toolspercent == "0.0") {
    document.toolstitle = "SOLD OUT - Woot Off AJAX Client";
    $('toolspercent').innerHTML = "SOLD OUT";
    $('toolswootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('toolspercent').innerHTML = toolspercent + "%";
    document.toolstitle = toolspercent + "% ~" + toolstitemremaining + "- Woot Off AJAX Client";
    toolsprogressMeterBar.style.width = toolspercent + "%";
    toolsprogressMeterBar.style.background = "#f29f01";
    $('toolswootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('toolssoldout').innerHTML == "true") {
    $('toolssoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('toolsprice2').innerHTML = "";
  } else  $('toolssoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (toolspercent >= 80)
    toolsprogressMeterBar.style.background = "#4A6751";
  if (toolspercent <= 10)
    toolsprogressMeterBar.style.background = "#FFFF99";
  if (toolspercent <= 5)
    toolsprogressMeterBar.style.background = "#FF9999";
  if (toolspercent < 0.1) 
    toolsprogressMeterBar.style.background = "#FFFFFF";


  $('winetitle').innerHTML = xmlDoc.getElementsByTagName('winetitle')[0].firstChild.nodeValue
  $('winesubtitle').innerHTML = xmlDoc.getElementsByTagName('winesubtitle')[0].firstChild.nodeValue
  $('winecondition').innerHTML = xmlDoc.getElementsByTagName('winecondition')[0].getAttribute('val');
  $('wineprice').innerHTML = xmlDoc.getElementsByTagName('wineprice')[0].getAttribute('val');
  $('wineprice2').innerHTML = xmlDoc.getElementsByTagName('wineprice')[0].getAttribute('val');
  $('winedesc').innerHTML = xmlDoc.getElementsByTagName('winedesc')[0].firstChild.nodeValue
//  $('wineprods').innerHTML = xmlDoc.getElementsByTagName('wineprods')[0].firstChild.nodeValue
  $('winestdimg').src = xmlDoc.getElementsByTagName('winestdimg')[0].getAttribute('val');
  $('winedetailimg').href = xmlDoc.getElementsByTagName('winedetailimg')[0].getAttribute('val');
//  $('winesaleurl').href = xmlDoc.getElementsByTagName('winesaleurl')[0].getAttribute('val');
  $('wineforumurl').href = xmlDoc.getElementsByTagName('wineforumurl')[0].getAttribute('val');
  $('wineblogurl').href = xmlDoc.getElementsByTagName('wineblogurl')[0].getAttribute('val');
  $('winepurchaseurl').href = xmlDoc.getElementsByTagName('winepurchaseurl')[0].getAttribute('val');
  //$('winewootcast').href = xmlDoc.getElementsByTagName('winewootcast')[0].getAttribute('val');
  var winepercent = xmlDoc.getElementsByTagName('winepercent')[0].getAttribute('val');
  $('winepercent2').innerHTML = xmlDoc.getElementsByTagName('winepercent')[0].getAttribute('val');
  $('winewootoff').innerHTML = xmlDoc.getElementsByTagName('winewootoff')[0].getAttribute('val');
  $('winesoldout').innerHTML = xmlDoc.getElementsByTagName('winesoldout')[0].getAttribute('val');
  $('winelastBuildDate').innerHTML = xmlDoc.getElementsByTagName('winelastBuildDate')[0].getAttribute('val');
  var wineitemstart = xmlDoc.getElementsByTagName('wineitemstart')[0].getAttribute('val');
  var wineitemelapsed = xmlDoc.getElementsByTagName('wineitemelapsed')[0].getAttribute('val');
  var wineitemremaining = xmlDoc.getElementsByTagName('wineitemremaining')[0].getAttribute('val');
  var winewoottime = xmlDoc.getElementsByTagName('winewoottime')[0].getAttribute('val');
  var winescripttime = xmlDoc.getElementsByTagName('winescripttime')[0].getAttribute('val');
  var wined = new Date();
  var winecachetime = Math.round(wined.getTime()/1000) - winescripttime;
  var wineage = winescripttime - winewoottime;
  var wineprogressMeterBar = document.getElementById('wineprogressMeterBarDone');


  // itemstart
  $('wineitemstart').innerHTML = unixTimeToDate(wineitemstart);

  // cachetime
  $('winecachetime').innerHTML = "";
  var wineTotalDays = Math.floor(winecachetime/86400);
  var wineTotalDaysMod = (winecachetime%86400);
  var wineTotalHours = Math.floor(wineTotalDaysMod/3600);
  var wineTotalHoursMod = (wineTotalDaysMod%3600);
  var wineTotalMin = Math.floor(wineTotalHoursMod/60);
  var wineTotalMinMod = (wineTotalHoursMod%60);
  var wineTotalSec = Math.floor(wineTotalMinMod);

  if (wineTotalDays > 0) $('winecachetime').innerHTML += wineTotalDays + "d ";
  if (wineTotalHours > 0) $('winecachetime').innerHTML += wineTotalHours + "h ";
  if (wineTotalMin > 0) $('winecachetime').innerHTML += wineTotalMin + "m ";
  $('winecachetime').innerHTML += wineTotalSec + "s";

  // itemelapsed
  $('wineitemelapsed').innerHTML = "";
  var wineTotalDays = Math.floor(wineitemelapsed/86400);
  var wineTotalDaysMod = (wineitemelapsed%86400);
  var wineTotalHours = Math.floor(wineTotalDaysMod/3600);
  var wineTotalHoursMod = (wineTotalDaysMod%3600);
  var wineTotalMin = Math.floor(wineTotalHoursMod/60);
  var wineTotalMinMod = (wineTotalHoursMod%60);
  var wineTotalSec = Math.floor(wineTotalMinMod);

  if (wineTotalDays > 0) $('wineitemelapsed').innerHTML += wineTotalDays + "d ";
  if (wineTotalHours > 0) $('wineitemelapsed').innerHTML += wineTotalHours + "h ";
  if (wineTotalMin > 0) $('wineitemelapsed').innerHTML += wineTotalMin + "m ";
  $('wineitemelapsed').innerHTML += wineTotalSec + "s";

  // itemremaining
  $('wineitemremaining').innerHTML = "";
  var wineTotalDays = Math.floor(wineitemremaining/86400);
  var wineTotalDaysMod = (wineitemremaining%86400);
  var wineTotalHours = Math.floor(wineTotalDaysMod/3600);
  var wineTotalHoursMod = (wineTotalDaysMod%3600);
  var wineTotalMin = Math.floor(wineTotalHoursMod/60);
  var wineTotalMinMod = (wineTotalHoursMod%60);
  var wineTotalSec = Math.floor(wineTotalMinMod);

  if (wineTotalDays > 0) $('wineitemremaining').innerHTML += wineTotalDays + "d ";
  if (wineTotalHours > 0) $('wineitemremaining').innerHTML += wineTotalHours + "h ";
  if (wineTotalMin > 0) $('wineitemremaining').innerHTML += wineTotalMin + "m ";
  $('wineitemremaining').innerHTML += wineTotalSec + "s";
  var winetitemremaining = $('wineitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('wineage').innerHTML = "";
  var wineTotalDays = Math.floor(wineage/86400);
  var wineTotalDaysMod = (wineage%86400);
  var wineTotalHours = Math.floor(wineTotalDaysMod/3600);
  var wineTotalHoursMod = (wineTotalDaysMod%3600);
  var wineTotalMin = Math.floor(wineTotalHoursMod/60);
  var wineTotalMinMod = (wineTotalHoursMod%60);
  var wineTotalSec = Math.floor(wineTotalMinMod);

  if (wineTotalDays > 0) $('wineage').innerHTML += wineTotalDays + "d ";
  if (wineTotalHours > 0) $('wineage').innerHTML += wineTotalHours + "h ";
  if (wineTotalMin > 0) $('wineage').innerHTML += wineTotalMin + "m ";
  $('wineage').innerHTML += wineTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('winewootoff').innerHTML == "false") {
    var wineprogressbar = document.getElementById('wineprogressbar');
    wineprogressbar.style.height = 0;
    wineprogressMeterBar.style.width = "100%";
    wineprogressMeterBar.style.height = 1;
    wineprogressMeterBar.style.background = "black";
    $('winepercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.winetitle = "No Woot Off - Woot Off AJAX Client";
  } else if (winepercent == "0.0") {
    document.winetitle = "SOLD OUT - Woot Off AJAX Client";
    $('winepercent').innerHTML = "SOLD OUT";
    $('winewootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('winepercent').innerHTML = winepercent + "%";
    document.winetitle = winepercent + "% ~" + winetitemremaining + "- Woot Off AJAX Client";
    wineprogressMeterBar.style.width = winepercent + "%";
    wineprogressMeterBar.style.background = "#f29f01";
    $('winewootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('winesoldout').innerHTML == "true") {
    $('winesoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('wineprice2').innerHTML = "";
  } else  $('winesoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (winepercent >= 80)
    wineprogressMeterBar.style.background = "#4A6751";
  if (winepercent <= 10)
    wineprogressMeterBar.style.background = "#FFFF99";
  if (winepercent <= 5)
    wineprogressMeterBar.style.background = "#FF9999";
  if (winepercent < 0.1) 
    wineprogressMeterBar.style.background = "#FFFFFF";

  $('accessoriestitle').innerHTML = xmlDoc.getElementsByTagName('accessoriestitle')[0].firstChild.nodeValue
  $('accessoriessubtitle').innerHTML = xmlDoc.getElementsByTagName('accessoriessubtitle')[0].firstChild.nodeValue
  $('accessoriescondition').innerHTML = xmlDoc.getElementsByTagName('accessoriescondition')[0].getAttribute('val');
  $('accessoriesprice').innerHTML = xmlDoc.getElementsByTagName('accessoriesprice')[0].getAttribute('val');
  $('accessoriesprice2').innerHTML = xmlDoc.getElementsByTagName('accessoriesprice')[0].getAttribute('val');
  $('accessoriesdesc').innerHTML = xmlDoc.getElementsByTagName('accessoriesdesc')[0].firstChild.nodeValue
//  $('accessoriesprods').innerHTML = xmlDoc.getElementsByTagName('accessoriesprods')[0].firstChild.nodeValue
  $('accessoriesstdimg').src = xmlDoc.getElementsByTagName('accessoriesstdimg')[0].getAttribute('val');
  $('accessoriesdetailimg').href = xmlDoc.getElementsByTagName('accessoriesdetailimg')[0].getAttribute('val');
//  $('accessoriessaleurl').href = xmlDoc.getElementsByTagName('accessoriessaleurl')[0].getAttribute('val');
  $('accessoriesforumurl').href = xmlDoc.getElementsByTagName('accessoriesforumurl')[0].getAttribute('val');
  $('accessoriesblogurl').href = xmlDoc.getElementsByTagName('accessoriesblogurl')[0].getAttribute('val');
  $('accessoriespurchaseurl').href = xmlDoc.getElementsByTagName('accessoriespurchaseurl')[0].getAttribute('val');
  //$('accessorieswootcast').href = xmlDoc.getElementsByTagName('accessorieswootcast')[0].getAttribute('val');
  var accessoriespercent = xmlDoc.getElementsByTagName('accessoriespercent')[0].getAttribute('val');
  $('accessoriespercent2').innerHTML = xmlDoc.getElementsByTagName('accessoriespercent')[0].getAttribute('val');
  $('accessorieswootoff').innerHTML = xmlDoc.getElementsByTagName('accessorieswootoff')[0].getAttribute('val');
  $('accessoriessoldout').innerHTML = xmlDoc.getElementsByTagName('accessoriessoldout')[0].getAttribute('val');
  $('accessorieslastBuildDate').innerHTML = xmlDoc.getElementsByTagName('accessorieslastBuildDate')[0].getAttribute('val');
  var accessoriesitemstart = xmlDoc.getElementsByTagName('accessoriesitemstart')[0].getAttribute('val');
  var accessoriesitemelapsed = xmlDoc.getElementsByTagName('accessoriesitemelapsed')[0].getAttribute('val');
  var accessoriesitemremaining = xmlDoc.getElementsByTagName('accessoriesitemremaining')[0].getAttribute('val');
  var accessorieswoottime = xmlDoc.getElementsByTagName('accessorieswoottime')[0].getAttribute('val');
  var accessoriesscripttime = xmlDoc.getElementsByTagName('accessoriesscripttime')[0].getAttribute('val');
  var accessoriesd = new Date();
  var accessoriescachetime = Math.round(accessoriesd.getTime()/1000) - accessoriesscripttime;
  var accessoriesage = accessoriesscripttime - accessorieswoottime;
  var accessoriesprogressMeterBar = document.getElementById('accessoriesprogressMeterBarDone');


  // itemstart
  $('accessoriesitemstart').innerHTML = unixTimeToDate(accessoriesitemstart);

  // cachetime
  $('accessoriescachetime').innerHTML = "";
  var accessoriesTotalDays = Math.floor(accessoriescachetime/86400);
  var accessoriesTotalDaysMod = (accessoriescachetime%86400);
  var accessoriesTotalHours = Math.floor(accessoriesTotalDaysMod/3600);
  var accessoriesTotalHoursMod = (accessoriesTotalDaysMod%3600);
  var accessoriesTotalMin = Math.floor(accessoriesTotalHoursMod/60);
  var accessoriesTotalMinMod = (accessoriesTotalHoursMod%60);
  var accessoriesTotalSec = Math.floor(accessoriesTotalMinMod);

  if (accessoriesTotalDays > 0) $('accessoriescachetime').innerHTML += accessoriesTotalDays + "d ";
  if (accessoriesTotalHours > 0) $('accessoriescachetime').innerHTML += accessoriesTotalHours + "h ";
  if (accessoriesTotalMin > 0) $('accessoriescachetime').innerHTML += accessoriesTotalMin + "m ";
  $('accessoriescachetime').innerHTML += accessoriesTotalSec + "s";

  // itemelapsed
  $('accessoriesitemelapsed').innerHTML = "";
  var accessoriesTotalDays = Math.floor(accessoriesitemelapsed/86400);
  var accessoriesTotalDaysMod = (accessoriesitemelapsed%86400);
  var accessoriesTotalHours = Math.floor(accessoriesTotalDaysMod/3600);
  var accessoriesTotalHoursMod = (accessoriesTotalDaysMod%3600);
  var accessoriesTotalMin = Math.floor(accessoriesTotalHoursMod/60);
  var accessoriesTotalMinMod = (accessoriesTotalHoursMod%60);
  var accessoriesTotalSec = Math.floor(accessoriesTotalMinMod);

  if (accessoriesTotalDays > 0) $('accessoriesitemelapsed').innerHTML += accessoriesTotalDays + "d ";
  if (accessoriesTotalHours > 0) $('accessoriesitemelapsed').innerHTML += accessoriesTotalHours + "h ";
  if (accessoriesTotalMin > 0) $('accessoriesitemelapsed').innerHTML += accessoriesTotalMin + "m ";
  $('accessoriesitemelapsed').innerHTML += accessoriesTotalSec + "s";

  // itemremaining
  $('accessoriesitemremaining').innerHTML = "";
  var accessoriesTotalDays = Math.floor(accessoriesitemremaining/86400);
  var accessoriesTotalDaysMod = (accessoriesitemremaining%86400);
  var accessoriesTotalHours = Math.floor(accessoriesTotalDaysMod/3600);
  var accessoriesTotalHoursMod = (accessoriesTotalDaysMod%3600);
  var accessoriesTotalMin = Math.floor(accessoriesTotalHoursMod/60);
  var accessoriesTotalMinMod = (accessoriesTotalHoursMod%60);
  var accessoriesTotalSec = Math.floor(accessoriesTotalMinMod);

  if (accessoriesTotalDays > 0) $('accessoriesitemremaining').innerHTML += accessoriesTotalDays + "d ";
  if (accessoriesTotalHours > 0) $('accessoriesitemremaining').innerHTML += accessoriesTotalHours + "h ";
  if (accessoriesTotalMin > 0) $('accessoriesitemremaining').innerHTML += accessoriesTotalMin + "m ";
  $('accessoriesitemremaining').innerHTML += accessoriesTotalSec + "s";
  var accessoriestitemremaining = $('accessoriesitemremaining').innerHTML.replace(/\s/gi,"");

  // age
  $('accessoriesage').innerHTML = "";
  var accessoriesTotalDays = Math.floor(accessoriesage/86400);
  var accessoriesTotalDaysMod = (accessoriesage%86400);
  var accessoriesTotalHours = Math.floor(accessoriesTotalDaysMod/3600);
  var accessoriesTotalHoursMod = (accessoriesTotalDaysMod%3600);
  var accessoriesTotalMin = Math.floor(accessoriesTotalHoursMod/60);
  var accessoriesTotalMinMod = (accessoriesTotalHoursMod%60);
  var accessoriesTotalSec = Math.floor(accessoriesTotalMinMod);

  if (accessoriesTotalDays > 0) $('accessoriesage').innerHTML += accessoriesTotalDays + "d ";
  if (accessoriesTotalHours > 0) $('accessoriesage').innerHTML += accessoriesTotalHours + "h ";
  if (accessoriesTotalMin > 0) $('accessoriesage').innerHTML += accessoriesTotalMin + "m ";
  $('accessoriesage').innerHTML += accessoriesTotalSec + "s";

  // bar, browser title, percent based on wootoff/percent
  if ($('accessorieswootoff').innerHTML == "false") {
    var accessoriesprogressbar = document.getElementById('accessoriesprogressbar');
    accessoriesprogressbar.style.height = 0;
    accessoriesprogressMeterBar.style.width = "100%";
    accessoriesprogressMeterBar.style.height = 1;
    accessoriesprogressMeterBar.style.background = "black";
    $('accessoriespercent').innerHTML = "<small>One Day,<br> One Deal&trade;</small>";
    document.accessoriestitle = "No Woot Off - Woot Off AJAX Client";
  } else if (accessoriespercent == "0.0") {
    document.accessoriestitle = "SOLD OUT - Woot Off AJAX Client";
    $('accessoriespercent').innerHTML = "SOLD OUT";
    $('accessorieswootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  } else {
    $('accessoriespercent').innerHTML = accessoriespercent + "%";
    document.accessoriestitle = accessoriespercent + "% ~" + accessoriestitemremaining + "- Woot Off AJAX Client";
    accessoriesprogressMeterBar.style.width = accessoriespercent + "%";
    accessoriesprogressMeterBar.style.background = "#f29f01";
    $('accessorieswootoffimg').src = 'http://woot.kishk.org:8080/wootlight.gif';
  }
  if ($('accessoriessoldout').innerHTML == "true") {
    $('accessoriessoldoutimg').src = 'http://woot.kishk.org:8080/wootsoldout.png';
    $('accessoriesprice2').innerHTML = "";
  } else  $('accessoriessoldoutimg').src = "http://woot.kishk.org:8080/pixel.png";


  // bar color change based on percent
  if (accessoriespercent >= 80)
    accessoriesprogressMeterBar.style.background = "#4A6751";
  if (accessoriespercent <= 10)
    accessoriesprogressMeterBar.style.background = "#FFFF99";
  if (accessoriespercent <= 5)
    accessoriesprogressMeterBar.style.background = "#FF9999";
  if (accessoriespercent < 0.1) 
    accessoriesprogressMeterBar.style.background = "#FFFFFF";

// teaser
  $('wootteaser').innerHTML = xmlDoc.getElementsByTagName('teaser')[0].firstChild.nodeValue
  $('kidsteaser').innerHTML = xmlDoc.getElementsByTagName('kidsteaser')[0].firstChild.nodeValue
  $('selloutteaser').innerHTML = xmlDoc.getElementsByTagName('selloutteaser')[0].firstChild.nodeValue
  $('hometeaser').innerHTML = xmlDoc.getElementsByTagName('hometeaser')[0].firstChild.nodeValue
  $('shirtteaser').innerHTML = xmlDoc.getElementsByTagName('shirtteaser')[0].firstChild.nodeValue
  $('sportteaser').innerHTML = xmlDoc.getElementsByTagName('sportteaser')[0].firstChild.nodeValue
  $('techteaser').innerHTML = xmlDoc.getElementsByTagName('techteaser')[0].firstChild.nodeValue
  $('toolsteaser').innerHTML = xmlDoc.getElementsByTagName('toolsteaser')[0].firstChild.nodeValue
  $('wineteaser').innerHTML = xmlDoc.getElementsByTagName('wineteaser')[0].firstChild.nodeValue
  $('accessoriesteaser').innerHTML = xmlDoc.getElementsByTagName('accessoriesteaser')[0].firstChild.nodeValue


  // audio loop
  processAudioCues($('wootpurchaseurl').href, wootpercent);

}


// set new audio schemes here
// [0] name, [1] 20%, [2] 10%, [3] 5%, [4] new, [5] soldout
var SoundSchemes = new Array(
  new Array("subtle birds", "SubtleBirdCall4", "SubtleBirdCall3", "SubtleBirdCall1", "SubtleBirdCall2", "SubtleBirdCall2"),
  new Array("loud sounds", "AnnoyingCar", "AnnoyingNoise", "LoudBells1", "AnnoyingBells","AnnoyingBells"),
  new Array("spoken", "Spoken20percent", "Spoken10percent", "Spoken5percent", "SpokenWootAlarm","SpokenWootAlarm"),
  new Array("glass", "LoudGlass3", "LoudGlass3", "LoudGlass1", "LoudGlass2", "LoudGlass2"),
  new Array("bells", "SubtleBells3", "SubtleBells2", "LoudBells2", "LoudBells4", "LoudBells4")
);


function processAudioCues (url, percent) {
  // Get all of the controlling check boxes on the page
  var enableAudioCues      = document.getElementById("enableAudioCues");
  var CueAt20PercentPlayed = document.getElementById("CueAt20PercentPlayed");
  var CueAt20Percent       = document.getElementById("CueAt20Percent");
  var CueAt10PercentPlayed = document.getElementById("CueAt10PercentPlayed");
  var CueAt10Percent       = document.getElementById("CueAt10Percent");
  var CueAt5PercentPlayed  = document.getElementById("CueAt5PercentPlayed");
  var CueAt5Percent        = document.getElementById("CueAt5Percent");
  var CueAtSOPercentPlayed  = document.getElementById("CueAtSOPercentPlayed");
  var CueAtSOPercent        = document.getElementById("CueAtSOPercent");
  var CueAtNewWoot         = document.getElementById("CueAtNewWoot");
  var CueAtNewPlayed         = document.getElementById("CueAtNewPlayed");
  var audioSchemeList      = document.getElementById("AudioScheme");

  var scheme = audioSchemeList.selectedIndex;
  if (lasturl != null && url != lasturl) {
    // If CueAtNewWootPlayed is blank then
    if (CueAtNewPlayed.value.length == 0) {
      // Mark New checkboxes complete,
      CueAtNewPlayed.value = "1";
      // Is enableAudioCues checked?
      if (enableAudioCues.checked && CueAtNewWoot.checked) {
        // play new sound
        soundManager.play(SoundSchemes[scheme][4])
      }
    }
    // Enable playing of all timed sounds
    CueAtSOPercentPlayed.value = "";
    CueAt20PercentPlayed.value = "";
    CueAt10PercentPlayed.value = "";
    CueAt5PercentPlayed.value = "";
    var lasturl = url;
    return;
  }
  if (percent == "5.0001") {
    return;
  } else if (percent == "0.0") {
    // If CueAtSOPercentPlayed is blank then
    if (CueAtSOPercentPlayed.value.length == 0) {
      // Mark all sounds as played
      CueAtSOPercentPlayed.value = "1";
      CueAt20PercentPlayed.value = "1";
      CueAt10PercentPlayed.value = "1";
      CueAt5PercentPlayed.value = "1";
      // Is enableAudioCues checked?
      if (enableAudioCues.checked && CueAtSOPercent.checked) {
        // play SO sound
        soundManager.play(SoundSchemes[scheme][5])
      }
    }
  } else if (percent < 5.1) {
    // If CueAt5PercentPlayed is blank then
    if (CueAt5PercentPlayed.value.length == 0) {
      // Mark all sounds as played
      CueAt20PercentPlayed.value = "1";
      CueAt10PercentPlayed.value = "1";
      CueAt5PercentPlayed.value = "1";
      // Is enableAudioCues checked?
      if (enableAudioCues.checked && CueAt5Percent.checked) {
        // play 5 percent sound
        soundManager.play(SoundSchemes[scheme][3])
      }
    }
  } else if (percent < 10.1) {
    // If CueAt10PercentPlayed is blank then
    if (CueAt10PercentPlayed.value.length == 0) {
      // Mark 20 and 10 checkboxes complete,
      CueAt20PercentPlayed.value = "1";
      CueAt10PercentPlayed.value = "1";
      // Is enableAudioCues checked?
      if (enableAudioCues.checked && CueAt10Percent.checked) {
        // play 10 percent sound
        soundManager.play(SoundSchemes[scheme][2])
      }
    }
  } else if (percent < 20.1) {
    // If CueAt20PercentPlayed is blank then
    if (CueAt20PercentPlayed.value.length == 0) {
      // Mark 20 checkboxes complete,
      CueAt20PercentPlayed.value = "1";
      // Is enableAudioCues checked?
      if (enableAudioCues.checked && CueAt20Percent.checked) {
        // play 20 percent sound
        soundManager.play(SoundSchemes[scheme][1])
      }
    }
//  } else if (percent > 99.9) {
//    if(CueAtNewPlayed.value.length == 0) {
      // Mark New checkboxes complete,
//      CueAtNewPlayed.value = "1";
      // Is enableAudioCues checked?
//      if (enableAudioCues.checked && CueAtNewWoot.checked) {
        // play new sound
//        soundManager.play(SoundSchemes[scheme][4])
//      }
//    }
//    CueAtSOPercentPlayed.value = "";
//    CueAt20PercentPlayed.value = "";
//    CueAt10PercentPlayed.value = "";
//    CueAt5PercentPlayed.value = "";
//    var lasturl = url;
  } else {
      // Enable playing of all timed sounds
      CueAtSOPercentPlayed.value = "";
      CueAt20PercentPlayed.value = "";
      CueAt10PercentPlayed.value = "";
      CueAt5PercentPlayed.value = "";
      var lasturl = url;
      return;
  }
}

function initializeAudioScheme () {
  var audioSchemeList = document.getElementById("AudioScheme");

  for (i = 0; i < SoundSchemes.length; i++) {
    audioSchemeList.options[i] = new Option(SoundSchemes[i][0], i);
  }

  var enableAudioCues      = document.getElementById("enableAudioCues");

  if (enableAudioCues.checked)
    audioCuesEnabled()
}

function audioCuesEnabled () {
  soundManager.play('CuesEnabled');
}

function testSound (index) {
  var audioSchemeList      = document.getElementById("AudioScheme");
  var scheme = audioSchemeList.selectedIndex;
  soundManager.play(SoundSchemes[scheme][index]);
}

// this is what starts it all off with the onLoad/onError
function getWOOT() {
  // variable added to xml fetch to ensure its not cached in your browser
  var moo = Math.round((new Date()).getTime());
  displayWOOT("xml/woot.xml?moo=" + moo);  

  // kill AJAX loops if $active set to 0
//  if ($('wootactive').innerHTML == "0") 
//    return;
//  else if ($('wootwootoff').innerHTML == "false")
//    setTimeout('getWOOT();', 21600000); //6 hrs
//  else if ($('wootsoldout').innerHTML == "true")
//    setTimeout('getWOOT();', 2500); // 2.5 secs
//  else if ($('wootpercent2').innerHTML > 20)
//    setTimeout('getWOOT();', 10000);  // 10 secs
//  else if ($('wootpercent2').innerHTML > 5)
//    setTimeout('getWOOT();', 5000);  // 5 secs
//  else if ($('wootpercent2').innerHTML <= 5)
//    setTimeout('getWOOT();', 3000);  //  3 secs
//  else
//    setTimeout('getWOOT(); initializeAudioScheme();', 2000);

  if ($('wootactive').innerHTML == "0")
    return;
  else if ($('globalwootoff').innerHTML == "0")
    setTimeout('getWOOT();', 21600000); //6 hrs
  else if ($('globalpercent').innerHTML > 20)
    setTimeout('getWOOT();', 10000);  // 10 secs
  else if ($('globalpercent').innerHTML > 5)
    setTimeout('getWOOT();', 5000);  // 5 secs
  else if ($('globalpercent').innerHTML <= 5)
    setTimeout('getWOOT();', 3000);  //  3 secs
  else
    setTimeout('getWOOT(); initializeAudioScheme();', 2000);


}

//setTimeout('getWOOT(); initializeAudioScheme();', 100);
