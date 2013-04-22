// ==UserScript==
// @name Statistics Detector
// @namespace http://www.joostdevalk.nl/code/greasemonkey/statistics-detector/
// @description Statistics Package detector, which links to the statistics if openly available
// @include *
// @exclude *.google.com/*
// @exclude www.google.*/*
// ==/UserScript==
//
// Version 1.4
//

function printBox(id, message, url) {
	if (top != window) {
		framesets = top.document.getElementsByTagName("frameset");
		if (!framesets[0]) {
			d = top.document;			
		} else {
			d = document;
		}
	} else {
		framesets = document.getElementsByTagName("frameset");
		if (!framesets[0]) {
			d = document;
		} else {
			frames = document.getElementsByTagName("frame");
			d = frames[0].contentWindow.document;
		}
	}
	div = d.createElement("div");
	div.id = id;
	div.innerHTML = '<div style="position: absolute; right: 0px; top: '+ topdist +'px;' +
	'text-align: center; width: 200px; margin-bottom: 5px; z-index: 1000; background-color: #000; padding: 2px;">' +
	'<p style="margin: 2px 0; background-color: inherit;"> ' +
	'<a target="_blank" class="snap_nopreview" style="border-bottom: 1px solid #000; background-color: inherit; ' +
	'font: bold 10px Verdana; color: #fff; font-weight: bold;" href="'+url+'">'+message+'</a>' +
	'</p></div>';
	
	topdist = topdist + 20;
	d.body.insertBefore( div, d.body.firstChild );
	window.setTimeout(
		function() {
			var div = d.getElementById( id );
			if ( div ) {
				div.parentNode.removeChild( div );
			}
		}
	, 7500 ); 
}

var fullurl = top.location.href;

myRe = /http:\/\/(.*)\//;
matches = myRe.exec(fullurl);
if (matches) {
	var domain = matches[1];
} else {
	myRe = /https:\/\/(.*)\//;
	matches = myRe.exec(fullurl);
	if (matches) {
		var domain = matches[1];
	}
}

var topdist = 0;

var belStat = false;
var webStats4u = false;
var realTracker = false;
var xt = false;
var nedStat = false;
var nedStatPro = false;
var OneStat = false;

// Walk through the anchors
var anchors = document.getElementsByTagName( "a" );
for ( var i = 0; i < anchors.length; ++i ) {
	var anchor = anchors[ i ];
	var ref = anchor.href;
	
	if ( ref != null ) {
		if (!belStat) {
			var belStatUrl = ref.match(/http:\/\/www.belstat.nl\/viewstat.asp\?UserID=.*&lang=nl/);
			belStat = (belStatUrl) ? 1 : 0;
		}

		if (!nedStat) {
			var nedStatUrl = ref.match(/http:\/\/.*\.nedstatbasic\.net\/stats?.*/);
			nedStat = (nedStatUrl) ? 1 : 0;
		}
		
		if ( !xt ) {
			var xtUrl = ref.match(/http:\/\/extremetracking\.com\/open\?login=.*/);
			xt = (xtUrl) ? 1 : 0;
			if ( !xt ) {
				xtUrl = ref.match(/http:\/\/.*\.extreme-dm\.com\/\?login=.*/);
				xt = (xtUrl) ? 1 : 0;			
			}
		}
		if (!realTracker) {
			var realTrackerUrl = ref.match(/http:\/\/www.nethit-free.nl\/netpoll\/stat.asp\?id=.*/);
			realTracker = (realTrackerUrl) ? 1 : 0;
		}
		
		if (!webStats4u) {
			var webStats4uUrl = ref.match(/http:\/\/www.webstats4u.com\/stats\?.*/);
			webStats4u = (webStats4uUrl) ? 1 : 0;
		}
		
		if (!OneStat) {
			var OneStatUrl = ref.match(/http:\/\/www.onestat.com\/asp\/login.asp\?sid=\d+/);
			OneStat = (OneStatUrl) ? 1 : 0;
		}
	}
}

// Walk through the script
var bees = false;
var AWStats = false;
var Bobum = false;
var CheckItSearchEngineTracking = false;
var ClickDensity = false;
var ClickTale = false;
var ClickTracks = false;
var Clicky = false;
var CrazyEgg = false;
var Enquisite = false;
var eFocus = false;
var GoogleAnalytics = false;
var GoogleAnalyticsNew = false;
var GoogleAdwordsConversion = false;
var HitTail = false;
var HeadLight = false;
var IndexTools = false;
var iStats = false;
var MoniForce = false;
var Mint = false;
var myStats = false;
var msAnalytics = false;
var Omniture = false;
var Performancing = false;
var phpMyVisits = false;
var Prophet = false;
var QuantCast = false;
var SiteStat = false;
var StatCounter = false;
var StatLynx = false;
var StatLynxConversion = false;
var StatLynxFinalConversion = false;
var Stats4u = false;
var WebSideStory = false;
var WebTrends = false;

var scripts = document.getElementsByTagName("script");

for ( var i = 0; i < scripts.length; ++i ) {
	var script = scripts[ i ];
	var src = script.src;
	var inner = script.innerHTML;
	
	if ( inner != null ) {
		if ( !Bobum ) {
			myRe = /bobumId=\"(.*)\";/;
			matches = myRe.exec(inner);
			if (matches) {
				var BobumUrl = "http://www.bobum.nl/page.php?p=stats&view=site&id="+matches[1];
			}
			Bobum = (BobumUrl) ? 1 : 0;	
		}
		if ( !Bobum ) {
			myRe = /http:\/\/www\.bobum\.nl\/bobum\.php\?id=(.*)\&ref=/;
			matches = myRe.exec(inner);
			if (matches) {
				var BobumUrl = "http://www.bobum.nl/page.php?p=stats&view=site&id="+matches[1];
			}
			Bobum = (BobumUrl) ? 1 : 0;	
		}
		if ( !eFocus ) {
			eFocus = ( inner.search( "http://www.clickin.nl/" ) != -1 );
		}
		if ( !StatLynx ) {
			StatLynx = ( inner.search( "stl.p.a1.traceworks.com" ) != -1 );
			// if the above returns true, do an extra check
			if ( StatLynx ) {
				StatLynx = ( inner.search( "var stl_strprotocol" ) != -1 );
			}
		}

		if ( !GoogleAnalytics ) {
			GoogleAnalytics = ( inner.search( "urchinTracker" ) != -1 );
		}

		if ( !GoogleAnalyticsNew ) {
			GoogleAnalyticsNew = ( inner.search( "google-analytics.com/ga.js" ) != -1 );
		}

		if ( !myStats ) {
			myRe = /mystats\(\d,(\d+),.*,.*\)/;
			matches = myRe.exec(inner);
			if (matches) {
				var myStatsUrl = "http://mystats.nl/stats/"+matches[1]+".html";
			}
			myStats = (myStatsUrl) ? 1 : 0;	
		}
		
		if ( !HeadLight ) {
			HeadLight = ( inner.search( "var _hlaccount =" ) != -1 );
		}
		if ( !SiteStat ) {
			SiteStat = ( inner.search( "sitestat" ) != -1 );
		}
		if ( !Omniture ) {
			Omniture = ( inner.search( "var s_code" ) != -1 );
		}
		if ( !OneStat ) {
			OneStat = ( inner.search( "OneStat_Pageview" ) != -1 );
		}
		if ( !msAnalytics ) {
			msAnalytics = ( inner.search("msAnalytics.ProfileId") != -1 );
		}
		if ( !WebSideStory ) {
			WebSideStory = ( inner.search( "var hbx" ) != -1 );
		}
		if ( !ClickTracks ) {
			ClickTracks = ( inner.search( "ctasp-server.cgi" ) != -1);
		}
		if ( !QuantCast ) {
			QuantCast = ( inner.search( "quantserve" ) != -1);
			var QuantCastUrl = "http://www.quantcast.com/"+domain;
		}
		if ( !WebTrends ) {
			WebTrends = ( inner.search( "gDomain" ) != -1);
		}
		if (!realTracker) {
			realTracker = (inner.search( "http://www.netpoll.nl/netpoll/" ) != -1);
		}
		if ( !nedStatPro ) {
			nedStatPro = ( inner.search( "nedstatpro.net/nl/nedstatpro.gif" ) != -1 );
		}
	}
	
	if ( src != null ) {
		if ( !ClickTale ) {
			ClickTale = ( src.search( "clicktale.net" ) != -1 );
		}
		if ( !Clicky ) {
			Clicky = ( src.search( "http://static.getclicky.com/" ) != -1 );
		}
		if ( !GoogleAnalytics ) {
			GoogleAnalytics = ( src.search( "https://ssl.google-analytics.com/urchin.js" ) != -1 );
		}
		if ( !GoogleAdwordsConversion ) {
			GoogleAdwordsConversion = ( src.search ( "www.googleadservices.com/pagead/conversion.js" ) != -1 );
		}
		if ( !StatCounter ) {
			StatCounter = ( src.search( "http://www.statcounter.com/counter/counter.js" ) != -1 );
		}
		if ( !StatLynxConversion ) {
			StatLynxConversion = ( src.search( "http://stl.p.a1.traceworks.com/prod_active/creg_chain.asp" ) != -1 );
		}
		if ( !StatLynxFinalConversion ) {
			StatLynxFinalConversion = ( src.search( "http://stl.p.a1.traceworks.com/prod/conv_scripts/" ) != -1 );
		}
		if ( !Mint ) {
			myRe = /(.*)\?js$/;
			matches = myRe.exec(src);
			if (matches) {
				mintUrl = matches[1];
				Mint = (mintUrl) ? 1 : 0;
			}
		}
		if ( !phpMyVisits ) {
			myRe = /(.*)phpmyvisites\.js/;
			matches = myRe.exec(src);
			if (matches) {
				phpMyVisitsUrl = matches[1];
				phpMyVisits = (phpMyVisitsUrl) ? 1 : 0;
			}
		}
		if ( !Prophet ) {
			Prophet = (src.search("ProphetInsert.js") != -1 );
		}
		if ( !MoniForce ) {
			MoniForce = (src.match(/http:\/\/tag.moniforce.com\/moni\//)) ? 1 : 0;
		}
		if ( !HitTail ) {
			HitTail = ( src.search( ".hittail.com/mlt.js" ) != -1 );
		}
		if ( !Stats4u ) {
			Stats4u = ( src.search( "stats4u.js" ) != -1 );
		}
		if ( !Stats4u ) {
			Stats4u = ( src.search( "t4umeetscript.js" ) != -1 );	
		}
		if ( !AWStats ) {
			AWStats = ( src.search( "awstats_misc_tracker.js" ) != -1 );	
		}
		if ( !ClickDensity ) {
			ClickDensity = ( src.search( "http://j.clickdensity.com/cr.js" ) != -1 );	
		}
		if ( !CheckItSearchEngineTracking ) {
			CheckItSearchEngineTracking = ( src.search( "searchenginetracking.js" ) != -1 );	
		}
		if ( !Performancing ) {
			Performancing = ( src.search ( "metrics.performancing.com" ) != -1 );
			var PerformancingUrl = "http://performancing.com/metrics/"+domain;
		}
		if ( !IndexTools ) {
			IndexTools = ( src.search("indextools") != -1 );
		}
		if ( !Enquisite ) {
			Enquisite = ( src.search("log.enquisite.com/log.js") != -1 );
		}
		if ( !bees ) {
			bees = ( src.search("http://103bees.com/bees/") != -1 );
		}
		if ( !CrazyEgg ) {
			CrazyEgg = ( src.search("crazyegg.com/pages/scripts/") != -1 );
		}
		if ( !iStats ) {
			myRe = /http:\/\/www\.istats\.nl\/count\.php\?cid=(.*)$/;
			matches = myRe.exec(src);
			if (matches) {
				var iStatsUrl = "http://www.istats.nl/t/?cid="+matches[1];
				iStats = (iStatsUrl) ? 1 : 0;
			}
		}
	}
}

var onloadvalue = document.body.getAttribute("onload");
if ( !OneStat && onloadvalue ) {
	OneStat = ( onloadvalue.search( "OneStat_Pageview" ) != -1 );
}

// Walk throught the results and print boxes for each found Open Statistics program
if ( nedStat ) {
	printBox("nedstat","Nedstat Basic enabled",nedStatUrl);
}

if ( nedStatPro ) {
	printBox("nedstatpro","Nedstat Pro enabled","http://www.nedstat.com");
}

if ( belStat ) {
	printBox("belstat","Belstat enabled",belStatUrl);
}

if ( xt ) {
	printBox("xtstat","Extreme Tracking enabled",xtUrl);
}

if ( myStats ) {
	printBox("mystats","MyStats enabled",myStatsUrl);
}

if ( realTracker ) {
	printBox("realtracker","Real Tracker enabled",realTrackerUrl);
}

if ( webStats4u ) {
	printBox("webstats4u","WebStats4U enabled",webStats4uUrl);
}

if ( Mint ) {
	printBox("mint","Mint enabled",mintUrl);
}

if ( phpMyVisits ) {
	printBox("mint","phpMyVisits enabled",phpMyVisitsUrl);
}

if ( Prophet ) {
	printBox("prophet","Prophet enabled","http://www.speed-trap.com");
}

if ( iStats ) {
	printBox("istats","istats enabled",iStatsUrl);
}
// Walk throught the results and print boxes for each found Statistics program
if ( GoogleAdwordsConversion ) {
	printBox("googleadwordsconversion","Google AdWords Conversion found","http://adwords.google.com/");
}

if ( StatLynx ) {
	printBox("statlynx","Stat Lynx enabled","http://www.traceworks.com");
}

if ( StatLynxConversion ) {
	printBox("statlynx","Stat Lynx conversion step found","http://www.traceworks.com");
}

if ( StatLynxFinalConversion ) {
	printBox("statlynx","Stat Lynx final conversion step found","http://www.traceworks.com");
}

if ( HeadLight ) {
	printBox("headlight","HeadLight enabled","http://www.traceworks.com");
}

if ( MoniForce ) {
	printBox("moniforce","MoniForce enabled","http://www.moniforce.com");
}

if ( Omniture ) {
	printBox("omniture","Omniture SiteCatalyst enabled","http://www.omniture.com");
}

if ( OneStat ) {
	if ( OneStatUrl ) {
		printBox("sitestat","OneStat enabled",OneStatUrl);
	} else {
		printBox("sitestat","OneStat enabled","http://www.onestat.nl");
	}
}

if ( SiteStat ) {
	printBox("sitestat","SiteStat enabled","http://www.sitestat.nl");
}

if ( HitTail ) {
	printBox("hittail","HitTail enabled","http://www.hittail.com");
}

if ( Stats4u ) {
	printBox("stats4u","Stats4u enabled","http://www.traffic4u.nl");
}

if ( AWStats ) {
	printBox("awstats","AWStats enabled","http://www.awstats.org");
}

if ( CheckItSearchEngineTracking ) {
	printBox("checkit","Checkit SE tracking enabled","http://www.checkit.nl");
}

if ( WebSideStory ) {
	printBox("websidestory","WebSideStory enabled","http://www.websidestory.com/");
}

if ( ClickTracks ) {
	printBox("clicktracks","ClickTracks enabled","http://www.clicktracks.com/");
}

if ( Clicky ) {
	printBox("clicky","Clicky enabled","http://getclicky.com/6593");
}

if ( QuantCast ) {
	printBox("quantcast","QuantCast enabled",QuantCastUrl);
}

if ( Performancing ) {
	printBox("performancing","Performancing enabled",PerformancingUrl);
}

if ( WebTrends ) {
	printBox("webtrends","WebTrends enabled","http://www.webtrends.com");
}

if ( IndexTools ) {
	printBox("indextools","IndexTools enabled","http://www.indextools.com");
}

if ( Enquisite ) {
	printBox("enquisite","Enquisite enabled","http://www.enquisite.com");
}

if ( bees ) {
	printBox("bees","103bees enabled","http://www.103bees.com");
}

if ( CrazyEgg ) {
	printBox("crazyegg","CrazyEgg enabled","http://www.crazyegg.com");
}

if ( ClickDensity ) {
	printBox("clickdensity","ClickDensity enabled","http://www.clickdensity.com");
}

if ( Bobum ) {
	printBox("bobum","Bobum enabled",BobumUrl);
}

if ( eFocus ) {
	printBox("efocus","eFocus tracking enabled","http://www.clickin.nl/");
}

if ( StatCounter ) {
	printBox("statcounter","StatCounter enabled","http://www.statcounter.com");
}

if ( ClickTale ) {
	printBox("clicktale","ClickTale enabled","http://www.clicktale.net");
}

if ( GoogleAnalytics ) {
	printBox("googleanalytics","Google Analytics Old enabled","http://www.google.com/analytics");
}

if ( GoogleAnalyticsNew ) {
	printBox("googleanalyticsnew","Google Analytics New enabled","http://www.google.com/analytics");
}

if ( msAnalytics ) {
	printBox("msanalytics","MS Gatineau enabled","http://www.microsoft.com/");
}