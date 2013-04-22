// ==UserScript==
// @name GA Analyzer GA.js script v4.4
// @namespace http://roelwillems.com/script/greasemonkey/GA.js-analyzer.user.js
// @description GA Analyzer shows if GA.js is implemented and if there are GA cookies
// @include *
// @exclude *.google.com/*
// @exclude www.google.*/*
// ==/UserScript==
//
// @version 4.4
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
var ga_account_async = "";
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
		if (i.async)
		{
		ga_java = "GA.js_async";
		}
		else {
		ga_java = "GA.js";
		}
    }
  }
  if (i.innerHTML)
  { 
	uacode = /(\s)*\_gaq\.push\(\[\'\_setAccount\'\,.*'(.*)'\]\)\;/gi.exec(i.innerHTML);
			if (uacode) { ga_account_async = uacode[2]; }
	uacode = /(\s)*var .*Tracker(\s)*=(\s)*_gat\._getTracker\("(.*)"\)/gi.exec(i.innerHTML);
		if (uacode) { ga_account = uacode[4]; }
    uacode = /(\s)*_uacct(\s)*=(\s)*\"(.*)\"/gi.exec(i.innerHTML);
		if (uacode) { ga_account = uacode[4]; }
  }
}


// Async GA.js script

if (ga_java == "")
{ msg("<span style='color: #FF0000;'>No</span> Async GA.js script found"); }
else if  (ga_java == "GA.js_async")
{ 
  msg("<strong>ONPAGE:</strong><br>");
  
  msg("Call to Google Analytics Async GA.js script found"); 

  if (ga_account_async == "")
  { msg("No account id found"); }
  else
  { msg("Account: <span style='color: #FFFF00;'>" + ga_account_async + "</span>"); }

// Start push check
// _gaq.push
  calls_on_site1 = 0;
  if(trackercalls1 = document.getElementsByTagName("html")[0].innerHTML.match(/\_gaq\.push/g))
  {
    calls_on_site1 = trackercalls1.length;
  }
  if (calls_on_site1 == 0 ) { msg("</br><span style='color: #FFFF00;'> No _gaq.push found!</span>"); }
  else if (calls_on_site1 == 1 ) { msg("</br><span style='color: #FF0000;'> One _gaq.push found, check source code</span>"); }
  else { msg("</br><span style='color: #FFFFFF;'>" + calls_on_site1 + "</span> _gaq.push calls found");}

// Basic Configuration

// Start Deprecated functions check
// _initData
  calls_on_site2 = 0;
  if(trackercalls2 = document.getElementsByTagName("html")[0].innerHTML.match(/\_initData/g))
  {
    calls_on_site2 = trackercalls2.length;
  }
  if (calls_on_site2 == 0 ) {}
  else { msg("</br><span style='color: #FF0000;'>_intiData found</span> function is deprecated. initData() now executes automatically in the ga.js tracking code.");}


// Start function check
// _setAccount
  calls_on_site3 = 0;
  if(trackercalls3 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setAccount/g))
  {
    calls_on_site3 = trackercalls3.length;
  }
  if (calls_on_site3 == 0 ) { msg("</br><span style='color: #FF0000;  margin-left: 10px;'> No _setAccount found!</span>"); }
  else if (calls_on_site3 == 1 ) { msg("</br><span style='color: #FFFFFF;  margin-left: 10px;'> _setAccount found</span>"); }
  else { msg("</br><span style='color: #FF0000;  margin-left: 10px;'>" + calls_on_site3 + "</span> _setAccount calls found, check source code");}


// Start function check
// _trackPageview
   calls_on_site4 = 0;
   if(trackercalls4 = document.getElementsByTagName("html")[0].innerHTML.match(/\_trackPageview/g))
   {
     calls_on_site4 = trackercalls4.length;
   }

  if (calls_on_site4 == 0 ) { msg("<span style='color: #FFFF00; margin-left: 10px;'>No _trackPageview</span> calls found, one is needed!"); }
  else if (calls_on_site4 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _trackPageview</span>"); }
  else { msg("<span style='color: #FFFF00; margin-left: 10px;'>" + calls_on_site4 + "</span> _trackPageview calls found, check if all are needed");}

// _trackPageLoadTime
  calls_on_site5 = 0;
  if(trackercalls5 = document.getElementsByTagName("html")[0].innerHTML.match(/\_trackPageLoadTime/g))
  {  
    calls_on_site5 = trackercalls5.length;
  }
 if (calls_on_site5 == 0 ) {}
 else if (calls_on_site5 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _trackPageLoadTime</span>"); }
  else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site5 + "</span> _trackPageLoadTime calls found, check source code");} 

// _setCustomVar
  calls_on_site6 = 0;
  if(trackercalls6 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setCustomVar/g))
  {  
    calls_on_site6 = trackercalls6.length;
  }
 if (calls_on_site6 == 0 ) {}
 else if (calls_on_site6 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _setCustomVar</span>"); }
 else { msg("<span style='color: #FFFFFF; margin-left: 10px;'>" + calls_on_site6 + "</span> _setCustomVar calls found");} 

// _deleteCustomVar
  calls_on_site7 = 0;
  if(trackercalls7 = document.getElementsByTagName("html")[0].innerHTML.match(/\_deleteCustomVar/g))
  {  
    calls_on_site7 = trackercalls7.length;
  }
 if (calls_on_site7 == 0 ) {}
 else if (calls_on_site7 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _deleteCustomVar</span>"); }
  else { msg("<span style='color: #FFFFFF; margin-left: 10px;'>" + calls_on_site7 + "</span> _deleteCustomVar calls found");} 

// _getName
  calls_on_site8 = 0;
  if(trackercalls8 = document.getElementsByTagName("html")[0].innerHTML.match(/\_getName/g))
  {  
    calls_on_site8 = trackercalls8.length;
  }
 if (calls_on_site8 == 0 ) {}
 else if (calls_on_site8 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _getName</span>"); }
  else { msg("<span style='color: #FFFF00; margin-left: 10px;'>" + calls_on_site8 + "</span> _getName calls found");} 

// _getAccount
  calls_on_site9 = 0;
  if(trackercalls9 = document.getElementsByTagName("html")[0].innerHTML.match(/\_getAccount/g))
  {  
    calls_on_site9 = trackercalls9.length;
  }
 if (calls_on_site9 == 0 ) {}
 else if (calls_on_site9 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _getAccount</span>"); }
 else { msg("<span style='color: #FFFF00; margin-left: 10px;'>" + calls_on_site9 + "</span> _getAccount calls found");} 

// _getVersion
  calls_on_site10 = 0;
  if(trackercalls10 = document.getElementsByTagName("html")[0].innerHTML.match(/\_getVersion/g))
  {  
    calls_on_site10 = trackercalls10.length;
  }
 if (calls_on_site10 == 0 ) {}
 else if (calls_on_site10 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _getVersion</span>"); }
 else { msg("<span style='color: #FFFF00; margin-left: 10px;'>" + calls_on_site10 + "</span> _getVersion calls found");} 

// _getVisitorCustomVar
  calls_on_site11 = 0;
  if(trackercalls11 = document.getElementsByTagName("html")[0].innerHTML.match(/\_getVisitorCustomVar/g))
  {  
    calls_on_site11 = trackercalls11.length;
  }
 if (calls_on_site11 == 0 ) {}
 else if (calls_on_site11 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _getVisitorCustomVar</span>"); }
 else { msg("<span style='color: #FFFF00; margin-left: 10px;'>" + calls_on_site11 + "</span> _getVisitorCustomVar calls found");} 

// _setCookiePersistence - This method is deprecated. Please use _setVisitorCookieTimeout(cookieTimeoutMillis) instead. 12
  calls_on_site12 = 0;
  if(trackercalls12 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setCookiePersistence/g))
  {  
    calls_on_site12 = trackercalls12.length;
  }
 if (calls_on_site12 == 0 ) {}
 else if (calls_on_site12 == 1 ) { msg("<span style='color: #FFFF00; margin-left: 10px;'> _setCookiePersistence</span> This method is deprecated. Please use _setVisitorCookieTimeout(cookieTimeoutMillis) instead."); }
 else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site12 + "</span> _setCookiePersistence calls found, check source (method deprecated)");}

// _setSampleRate()
 calls_on_site13 = 0;
 if(trackercalls13 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setSampleRate/g))
 {  
   calls_on_site13 = trackercalls13.length;
 }
if (calls_on_site13 == 0 ) {}
else if (calls_on_site13 == 1 ) { msg("<span style='color: #FFFF00; margin-left: 10px;'> _setSampleRate</span>"); }
else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site13 + "</span> _setSampleRate calls found, check source");}

// _setSessionTimeout - This method is deprecated. Please use _setVisitorCookieTimeout(cookieTimeoutMillis) instead. 12
  calls_on_site14 = 0;
  if(trackercalls14 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setSessionTimeout/g))
  {  
    calls_on_site14 = trackercalls14.length;
  }
 if (calls_on_site14 == 0 ) {}
 else if (calls_on_site14 == 1 ) { msg("<span style='color: #FFFF00; margin-left: 10px;'> _setSessionTimeout</span> This method is deprecated. Please use _setVisitorCookieTimeout(cookieTimeoutMillis) instead."); }
 else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site14 + "</span> _setSessionTimeout calls found, check source (method deprecated)");}

// _setSessionCookieTimeout
 calls_on_site15 = 0;
 if(trackercalls15 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setSessionCookieTimeout/g))
 {  
   calls_on_site15 = trackercalls15.length;
 }
if (calls_on_site15 == 0 ) {}
else if (calls_on_site15 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _setSessionCookieTimeout</span>"); }
else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site15 + "</span> _setSessionCookieTimeout calls found, check source ");}

// _setVisitorCookieTimeout
 calls_on_site16 = 0;
 if(trackercalls16 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setVisitorCookieTimeout/g))
 {  
   calls_on_site16 = trackercalls16.length;
 }
if (calls_on_site16 == 0 ) {}
else if (calls_on_site16 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _setVisitorCookieTimeout</span>"); }
else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site16 + "</span> _setVisitorCookieTimeout calls found, check source ");}

// _setVar- This method is deprecated. Please use _setCustomVar() instead.
 calls_on_site17 = 0;
 if(trackercalls17 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setVar/g))
 {  
   calls_on_site17 = trackercalls16.length;
 }
if (calls_on_site17 == 0 ) {}
else if (calls_on_site17 == 1 ) { msg("<span style='color: #FFFF00; margin-left: 10px;'> _setVar, This method is deprecated. Please use _setCustomVar() instead.</span>"); }
else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site17 + "</span> _setVar calls found, check source (Method depracated)");}


// Domains & Directories

// _setDomainName
 calls_on_site19 = 0;
 if(trackercalls19 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setDomainName/g))
 {
   calls_on_site19 = trackercalls19.length;
 }

if (calls_on_site19 == 0 ) { msg(""); }
else if (calls_on_site19 == 1 ) { msg("<span style='color: #FFFF00; margin-left: 10px;'> _setDomainName</span>");}
else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site19 + "</span> _setDomainName calls found, check source");}

// _setAllowHash
 calls_on_site20 = 0;
 if(trackercalls20 = document.getElementsByTagName("html")[0].innerHTML.match(/\_setAllowHash/g))
 {
   calls_on_site20 = trackercalls20.length;
 }

if (calls_on_site20 == 0 ) { msg(""); }
else if (calls_on_site20 == 1 ) { msg("<span style='color: #FF0000; margin-left: 10px;'> _setAllowHash</span></br><span style='margin-left: 20px;'>this method is deprecated and no longer required for cross-domain tracking.</span>");}
else { msg("<span style='color: #FF0000; margin-left: 10px;'>" + calls_on_site20 + " _setAllowHash calls found</span>, check source (method deprecated)");}

 msg("</br></br><strong>ADVICE:</strong><br>");
if (calls_on_site5 == 0 ) { msg("<span style='color: #FFFF00; margin-left: 10px;'>> No _trackPageLoadTime found,</span></br><span style=' margin-left: 20px;'>consider adding it to measure site loadtime performance</span>"); }

// Closing bracket
}




var source   = "";
var medium   = "";
var term     = "";
var cont  = "";
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
    if (caa[0].indexOf("utmcct")   > -1) { cont = caa[1]; }
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
  msg("Campaign content: <span style='color: #FFFF00;'>" + cont + "</span>");
  msg("Campaign clid: <span style='color: #FFFF00;'>" + clid + "</span>");
  msg("Campaign gclid: <span style='color: #FFFF00;'>" + gclid + "</span>");
}

  if (document.cookie.indexOf("__utmv=") != -1)
  {
  msg("<br>Bezoekers variabele geplaatst");
  
   varContent = readCookie("__utmv");
  
  msg("Var: <span style='color: #FFFF00;'>" + varContent + "</span>");
  }
  
  if (document.cookie.indexOf("__utmv=") < 1)
  {}

if (window.location == top.location) // Exlude (i)frames
{
  box(message);
}