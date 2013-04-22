// Traditional GA.js script


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



// Start function check
// _getTracker
  calls_on_site1 = 0;
  if(trackercalls1 = document.getElementsByTagName("html")[0].innerHTML.match(/\_getTracker/g))
  {
    calls_on_site1 = trackercalls1.length;
  }
  if (calls_on_site1 == 0 ) { msg(""); }
	else if (calls_on_site1 == 1 ) { msg("</br><span style='color: #FFFF00;'>_getTracker found</span> function is deprecated. Please use _createTracker() instead."); }
	else if (calls_on_site1 == 2 ) { msg("</br><span style='color: #FFFF00;'>Two _getTracker functions found</span> check implementation. Function is deprecated. Please use _createTracker() instead."); }
  	else { msg("</br><span style='color: #FFFF00;'>found multiple _getTracker instances</span> function is deprecated. Please use _createTracker() instead and check source code."); }

// _createTracker
  calls_on_site2 = 0;
  if(trackercalls2 = document.getElementsByTagName("html")[0].innerHTML.match(/\_createTracker/g))
  {
    calls_on_site2 = trackercalls2.length;
  }
    if (calls_on_site2 == 0 ) { msg("</br><span style='color: #FF0000;'> No _createTracker found!</span>"); }
  else if (calls_on_site2 == 1 ) { msg("</br><span style='color: #FFFF00;'> _createTracker found</span>"); }
  else { msg("</br><span style='color: #FF0000;'>no _createTracker found</span>, check source code."); }

// Start Deprecated functions check
// _initData
  calls_on_site3 = 0;
  if(trackercalls3 = document.getElementsByTagName("html")[0].innerHTML.match(/\_initData/g))
  {
    calls_on_site1 = trackercalls3.length;
  }
  if (calls_on_site3 == 0 ) { msg(""); }
  else { msg("</br><span style='color: #FF0000;'>_intiData found</span> function is deprecated. initData() now executes automatically in the ga.js tracking code.");}


// Start function check
// _trackPageview
   calls_on_site4 = 0;
   if(trackercalls4 = document.getElementsByTagName("html")[0].innerHTML.match(/\_trackPageview/g))
   {
     calls_on_site4 = trackercalls4.length;
   }

  if (calls_on_site4 == 0 ) { msg(""); }
  else if (calls_on_site4 == 1 ) { msg("<span style='color: #FFFFFF; margin-left: 10px;'> _trackPageview</span>"); }
  else { msg("<span style='color: #FFFF00; margin-left: 10px;'>" + calls_on_site4 + "</span> _trackPageview calls found, check if all are needed");}



// Closing bracket
}

if (ga_java == "")
{ msg("<span style='color: #FF0000;'>No</span> urchin.js script found"); }
else if  (ga_java == "urchin.js")
{ 
  // msg("<strong>ONPAGE:</strong><br>");
  // 
  // msg("Call to Google Analytics urchin.js script found"); 
  // 
  // if (ga_account_urch == "")
  // { msg("No account id found"); }
  // else
  // { msg("Account: <span style='color: #FFFF00;'>" + ga_account_urch + "</span>"); }
  // 
  // if ((location.protocol == "http:") && (ga_secure_script)) { msg("<span style='color: #FF0000;'>Secure urchin.js on normal page</span>"); }
  // if ((location.protocol == "https:") && (!ga_secure_script)) { msg("<span style='color: #FF0000;'>Normal urchin.js on secure page</span>"); }
  // if ((location.protocol == "https:") && (ga_secure_script)) { msg("Secure urchin.js called"); }
  // 
  // calls_on_site = 0;
  // while (trackercalls = /urchinTracker/g.exec(document.getElementsByTagName("html")[0].innerHTML));
  // {
  //   calls_on_site++;
  // }
  // if (calls_on_site == 0 ) { msg("<span style='color: #FF0000;'>No urchinTracker() calls found</span>"); }
  // if (calls_on_site == 1 ) { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> urchinTracker() call found"); }
  // else { msg("<span style='color: #FFFF00;'>" + calls_on_site + "</span> urchinTracker() calls found"); }
}
