/***** START - Propensity Test Phase II will remove commented out code by 6/1/22 *****/
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


    /*	if (location.href.indexOf('propTestData={') > -1) {
		var propTestData = location.href.split('propTestData=')[1];
		propTestData = propTestData.split('{')[1].split('}')[0].split(',');
		var testVals = {};
		propTestData.forEach(function(param){
			testVals[param.split(':')[0]] = param.split(':')[1];
		});
		if(testVals.testCell && testVals.userType && testVals.pSubD && testVals.pSubMW) {
			gciData = [{}];
			gciData[0]['page-ab-slot'] = testVals.testCell;
			gciData[0]['user-type'] = testVals.userType;
			gciData[0]['user-insights'] = '{\"pSubD\":\"' + testVals.pSubD +'\",\"pSubMW\":\"' + testVals.pSubMW + '\",\"gsp\":\"85\"}';
		} else {
			console.log('Adjust formatting of &propTextData. For example &propTestData={testCell:20,userType:subscriber,pSubD:1,pSubMW:null}');
		}
	}*/
    /*article plus addition*/
    if (isArticlePlus) {
	TRC._shouldArticlePlus = true;
    }

    if (isPropensityP2Placement && gciUserMeta && gciUserObject) {
	TRC._shouldRenderSubTags = true;
	TRC._userType = gciUserMeta.market_relationship && gciUserObject.meta.market_relationship.toLowerCase();

	/*	var testCell = gciData[0]["page-ab-slot"];
		var isControlTestCell = ['17','18'].indexOf(testCell) > -1;
		var isPropensityTestCell = ['19','20'].indexOf(testCell) > -1;*/

	var pSub = 'null';

	if (gciUserObject.insights) {
		if (req.uip && req.uip.indexOf('Mobile') > -1) {
		    pSub = gciUserObject.insights.pSubMW;
		} else if (pSubJson) {
		    pSub = gciUserObject.insights.pSubD;
		}		
	}

	/*var isLowPsub = ['1','2','3'].indexOf(pSub) > -1;
	var isMediumPsub = ['4','5','6','7','8','null'].indexOf(pSub) > -1 || pSub == null;
	var isHighPsub = ['9','10'].indexOf(pSub) > -1;*/
	var isSubscriber = TRC._userType === 'subscriber';


	/*if (isControlTestCell) {					
				req.uip = req.uip + ' - Control';
		}	*/

	if (isSubscriber) {
	    TRC.cseg = 'subscriber';
	}
	/*	if (isPropensityTestCell) {					
				if (isSubscriber) {
					TRC.cseg = 'subscriber'
					req.uip = req.uip + ' - Subscriber';
				} else if (isHighPsub) {
					req.uip = req.uip + ' - High';
				} else if (isMediumPsub) {
					req.uip = req.uip + ' - Medium';
				} else if (isLowPsub) {
					TRC.cseg = 'low propensity'
					req.uip = req.uip + ' - Low';
				}  
			*/
    }
} catch (e) {
    __trcError('Error in normalize-request-param propensity test phase II: ', e.message);
}

/***** END -  Propensity Test Phase II will remove commented out code by 6/1/22 *****/

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