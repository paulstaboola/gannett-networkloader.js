/***** START - Propensity Test Phase II *****/
try {
    var gciUserMeta = window.gciAnalytics && window.gciAnalytics.user && window.gciAnalytics.user.meta,
    	gciUserObject = window.gciAnalytics && window.gciAnalytics.user && window.gciAnalytics.user.response;
    var isJson = function(str) {
	try {
	    JSON.parse(str);
	} catch (e) {
	    return false;
	}
	return true;
    };

    var isPropensityP2Placement = TRC &&
	TRC._propensityP2Placements &&
	TRC._propensityP2Placements.indexOf(req.uip) > -1;
    /*article plus addition*/
    var isArticlePlus = TRC &&
	TRC._articlePlus &&
	TRC._articlePlus.indexOf(req.uip) > -1;



    /*article plus addition*/
    if (isArticlePlus) {
	TRC._shouldArticlePlus = true;
    }

    if (isPropensityP2Placement && gciUserMeta && gciUserObject) {
	TRC._shouldRenderSubTags = true;
	TRC._userType = gciUserMeta.market_relationship && gciUserObject.meta.market_relationship.toLowerCase();



	var pSub = 'null';

	if (gciUserObject.insights) {
		if (req.uip && req.uip.indexOf('Mobile') > -1) {
		    pSub = gciUserObject.insights.pSubMW;
		} else if (pSubJson) {
		    pSub = gciUserObject.insights.pSubD;
		}		
	}



	var isSubscriber = TRC._userType === 'subscriber';



	if (isSubscriber) {
	    TRC.cseg = 'subscriber';
	}

    }
} catch (e) {
    __trcError('Error in normalize-request-param propensity test phase II: ', e.message);
}

/***** END -  Propensity Test Phase II  *****/

if (typeof mode == 'string' && mode == 'grid-sports') {
    req.acnt = 'sports';
    req.uip = 'grid-sports-3x3'
}
if (typeof mode == 'string' && mode == 'grid-2x4') {
    req.uip = 'grid-3x3'
}
if (typeof mode == 'string' && mode == 'verticalx8') {
    req.uip = 'short-article-2x5'
}
if (typeof mode == 'string' && mode == 'thumbnails-inject-sports' || mode == 'thumbnails-m') {
    req.ac = 'sports';
}

/***** Start -  Adding Read More Mode *****/
try {

    if (TRC.publisherId !== 'gannettdigital-usatodaysportsplus' && gciUserMeta.isAnonymous) {
		if (req && req.uim && req.uip && req.uip === 'Mobile Below Article Feed - Feed Redesign') {
		    req.uim = req.uim.replace('thumbs-feed-mobile-e', 'thumbs-feed-mobile-rm');
		}
    }

} catch (e) {
    __trcError('Error in Adding Read More Mode : ', e.message);
}

/***** END -  Adding Read More Mode *****/