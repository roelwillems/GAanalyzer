// ==UserScript==
// @name GA Analyzer GA.js script
// @namespace http://roelwillems.com/script/greasemonkey/GA.js-analyzer.user.js
// @description GA Analyzer shows if GA.js is implemented and if there are GA cookies
// @include *
// @exclude *.google.com/*
// @exclude www.google.*/*
// ==/UserScript==
//
// Version 2.0
//

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++)
  {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function box(text)
{
  elm = document.createElement("div");
  elm.id = "box";
  with (elm.style)
  {
    position = "fixed";
    left = "0px";
    top = "0px";
    zIndex = "101";
    backgroundColor = "#404040";
    color = "#FFFFFF";
    padding = "8px";
    fontSize = "11px";
    fontFamily = "verdana";
    border = "2px solid #000000";
    textAlign = "left";
  }
  elm.innerHTML = text;
  document.body.appendChild(elm);
  
  time = window.setTimeout(
    function()
    {
      var div = document.getElementById("box");
      if ( div ) { div.parentNode.removeChild( div ); }
    }
  , 10000 ); 
}

var message = "";
function msg(text)
{
  message += text + "<br />";
}

var ga_on_site = false;
var ga_account = "";
var ga_secure_script = false;

for (x in document.getElementsByTagName("script"))
{
  i = document.getElementsByTagName("script")[x];
  
  if (i.src)
  {
    if (i.src.search(".google-analytics.com/ga.js") != -1)
    {
      ga_on_site = true;
      if (i.src.search("ssl.") != -1) { ga_secure_script = true; }
    }
  }
  if (i.innerHTML)
  { 
    uacode = /(\s)*var pageTracker(\s)*=(\s)*_gat\._getTracker\(\"(.*)\"\)/gi.exec(i.innerHTML);
		if (uacode) { ga_account = uacode[4]; }
  }
}

if (!ga_on_site)
{ msg("<span style='color: #FF0000;'>No</span> Google Analytics found"); }
else
{ 
  msg("<strong>ONPAGE:</strong><br>");

  msg("Call to GA.js found"); 

  if (ga_account == "")
  { msg("No account id found"); }
  else
  { msg("Account: <span style='color: #FFFF00;'>" + ga_account + "</span>"); }

  if ((location.protocol == "http:") && (ga_secure_script)) { msg("<span style='color: #FF0000;'>Secure GA.js on normal page</span>"); }
  if ((location.protocol == "https:") && (!ga_secure_script)) { msg("<span style='color: #FF0000;'>Normal GA.js on secure page</span>"); }
  if ((location.protocol == "https:") && (ga_secure_script)) { msg("Secure GA.js called"); }

  calls_on_site = 0;
  while (trackercalls = /urchinTracker/g.exec(document.getElementsByTagName("html")[0].innerHTML))
  {
    calls_on_site++;
  }
  if (calls_on_site == 0 ) { msg("<span style='color: #FF0000;'>No GA.js Tracker() calls found</span>"); }
  if (calls_on_site == 1 ) { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> GA.js Tracker() call found"); }
  else { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> GA.js Tracker() calls found"); }
}

var source   = "";
var medium   = "";
var term     = "";
var content  = "";
var campaign = "";
var gclid    = "";

if (document.cookie.indexOf("__utmz=") != -1)
{
  msg("<br><strong>COOKIES:</strong><br>");
  
  var c = readCookie("__utmz");
  ca = c.split("|");
  
  for (var i = 0; i < ca.length; i++)
  {
    var caa = ca[i].split("=");
    if (caa[0].indexOf("utmccn")   > -1) { campaign = caa[1]; }
    if (caa[0].indexOf("utmcsr")   > -1) { source = caa[1]; }
    if (caa[0].indexOf("utmctr")   > -1) { term = caa[1]; }
    if (caa[0].indexOf("utmcmd")   > -1) { medium = caa[1]; }
    if (caa[0].indexOf("utmcct")   > -1) { content = caa[1]; }
    if (caa[0].indexOf("utmgclid") > -1) { gclid = caa[1]; }
  }
  
  if (gclid != "")
  { 
    source = 'google'; 
    medium = 'cpc'; 
  } 
  msg("Campaign name: <span style='color: #FFFF00;'>" + campaign + "</span>");
  msg("Campaign source: <span style='color: #FFFF00;'>" + source + "</span>");
  msg("Campaign term: <span style='color: #FFFF00;'>" + term + "</span>");
  msg("Campaign medium: <span style='color: #FFFF00;'>" + medium + "</span>");
  msg("Campaign content: <span style='color: #FFFF00;'>" + content + "</span>");
  msg("Campaign gclid: <span style='color: #FFFF00;'>" + gclid + "</span>");
}

if (window.location == top.location) // Exlude (i)frames
{
  box(message);
}
