// ==UserScript==
// @name GA Analyzer GA.js script v2.4
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
    right = "0px";
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
  , 100000 ); 
}

var message = "";
function msg(text)
{
  message += text + "<br />";
}

var ga_on_site = false;
var ga_java = "";
var ga_account = "";
var ga_account_urc = "";
var ga_secure_script = false;

for (x in document.getElementsByTagName("script"))
{
  i = document.getElementsByTagName("script")[x];
  
   if (i.src)
  {
    if (i.src.search(".google-analytics.com/urchin.js") != -1)
    {
      ga_on_site = true;
      ga_java = "urchin.js";
      if (i.src.search("ssl.") != -1) { ga_secure_script = true; }
    }
    if (i.src.search(".google-analytics.com/ga.js") != -1)
    {
      ga_on_site = true;
		ga_java = "GA.js";
    }
  }
  if (i.innerHTML)
  { 
    uacode = /(\s)*var pageTracker(\s)*=(\s)*_gat\._getTracker\(\"(.*)\"\)/gi.exec(i.innerHTML);
		if (uacode) { ga_account = uacode[4]; }
    uacode = /(\s)*_uacct(\s)*=(\s)*\"(.*)\"/gi.exec(i.innerHTML);
		if (uacode) { ga_account_urch = uacode[4]; }
  }
}

if (ga_java == "")
{ msg("<span style='color: #FF0000;'>No</span> GA.js script found"); }
else if  (ga_java == "GA.js")
{ 
  msg("<strong>ONPAGE:</strong><br>");
  
  msg("Call to Google Analytics GA.js script found"); 

  if (ga_account == "")
  { msg("No account id found"); }
  else
  { msg("Account: <span style='color: #FFFF00;'>" + ga_account + "</span>"); }


  calls_on_site = 0;
  while (trackercalls = /pageTracker/g.exec(document.getElementsByTagName("html")[0].innerHTML))
  {
    calls_on_site++;
  }
  if (calls_on_site == 0 ) { msg("<span style='color: #FF0000;'>No pageTracker calls found</span>"); }
  if (calls_on_site == 1 ) { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> pageTracker call found, need minimal 3 pageTracker calls"); }
  if (calls_on_site == 2 ) { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> pageTracker call found, need minimal 3 pageTracker calls"); }
  else { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> pageTracker calls found"); }
}

if (ga_java == "")
{ msg("<span style='color: #FF0000;'>No</span> urchin.js script found"); }
else if  (ga_java == "urchin.js")
{ 
  msg("<strong>ONPAGE:</strong><br>");
  
  msg("Call to Google Analytics urchin.js script found"); 

  if (ga_account_urch == "")
  { msg("No account id found"); }
  else
  { msg("Account: <span style='color: #FFFF00;'>" + ga_account_urch + "</span>"); }

  if ((location.protocol == "http:") && (ga_secure_script)) { msg("<span style='color: #FF0000;'>Secure urchin.js on normal page</span>"); }
  if ((location.protocol == "https:") && (!ga_secure_script)) { msg("<span style='color: #FF0000;'>Normal urchin.js on secure page</span>"); }
  if ((location.protocol == "https:") && (ga_secure_script)) { msg("Secure urchin.js called"); }

  calls_on_site = 0;
  while (trackercalls = /urchinTracker/g.exec(document.getElementsByTagName("html")[0].innerHTML))
  {
    calls_on_site++;
  }
  if (calls_on_site == 0 ) { msg("<span style='color: #FF0000;'>No urchinTracker() calls found</span>"); }
  if (calls_on_site == 1 ) { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> urchinTracker() call found"); }
  else { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> urchinTracker() calls found"); }
}

var source   = "";
var medium   = "";
var term     = "";
var content  = "";
var campaign = "";
var gclid    = "";
var clid    = "";
var setvar   = "";

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
    if (caa[0].indexOf("utmclid") > -1)  { clid = caa[1]; }
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
  msg("Campaign clid: <span style='color: #FFFF00;'>" + clid + "</span>");
  msg("Campaign gclid: <span style='color: #FFFF00;'>" + gclid + "</span>");
}

  if (document.cookie.indexOf("__utmv=") != -1)
  {
  msg("<br>setVar cookie is aangeroepen");
  
   setvar = readCookie("__utmv");
  
  msg("setVar content: <span style='color: #FFFF00;'>" + setvar + "</span>");
  }
  
  if (document.cookie.indexOf("__utmv=") < 1)
  {
  msg("<br>setVar cookie is NIET aangeroepen<br>");
  }

if (window.location == top.location) // Exlude (i)frames
{
  box(message);
}