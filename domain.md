// check DomainName (_SetDomainName)
domainname = 0;
if (i.innerHTML)
{ 
	domainname = /(\s)*\_gaq\.push\(\[\'\_setDomainName\'\,.*'(.*)'\]\)\;/gi.exec(i.innerHTML);
		if (domainname) { cookie_domain = _setDomainName[2]; }
}


if (cookie_domain == "")
 { msg("No domain set"); }
 else
 { msg("Domain: <span style='color: #FFFF00;'>" + cookie_domain + "</span>"); }
