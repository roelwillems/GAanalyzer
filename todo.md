Async:

>_gat
√ _getTracker - This method is deprecated. Please use _gat._createTracker(opt_account, opt_name) instead.
√ _createTracker()
_getTrackerByName()





> Campaign Tracking
_setAllowAnchor()
_setCampContentKey()
_setCampMediumKey()
_setCampNameKey()
_setCampNOKey()
_setCampSourceKey()
_setCampTermKey()
_setCampaignTrack()
_setCampaignCookieTimeout()
_setCookieTimeout() - This method is deprecated. Please use _setCampaignCookieTimeout(cookieTimeoutMillis) instead.
_setReferrerOverride()





> Domains & Directories

√ _setDomainName()
opnemen:

Tracking Across Lower-level Sub-domains
_gaq.push(['_setDomainName', '.example.com']); 

Isolating Top-Level Domains
_gaq.push(['_setDomainName', 'none']); 



> Ecommerce (helemaal meten)
_addItem
_addTrans
_trackTrans()

> Event tracking (helemaal meten)
_trackEvent 

> Social Interactions
_trackSocial (network, socialAction, opt_target, opt_pagePath)

> Search Engines and Referrers
_addIgnoredOrganic() (helemaal meten)
_addIgnoredRef() (helemaal meten)
_addOrganic()
_clearIgnoredOrganic()
_clearIgnoredRef()
_clearOrganic()

> Web Client
_anonymizeIp() -  Tells Google Analytics to anonymize the information sent by the tracker objects by removing the last octet of the IP address prior to its storage. Note that this will slightly reduce the accuracy of geographic reporting.

_getClientInfo()
_setClientInfo - browser data will not be tracked and cannot be recovered at a later date, so use this feature carefully.

_getDetectFlash()
_setDetectFlash() - Flash player data will not be tracked and cannot be recovered at a later date, so use this feature carefully.

_getDetectTitle()
_setDetectTitle() - Sets the title detection flag. By default, page title detection for your visitors is on. This information appears in the Contents section under "Content by Title." If you desire, you can turn this tracking off by setting the parameter to false. You could do this if your website has no defined page titles and the Content by Title report has all content grouped into the "(not set)" list. You could also turn this off if all your pages have particularly long titles. If you do this, any page titles that are defined in your website will not be displayed in the "Content by Title" reports. This information cannot be recovered at a later date once it is disabled.