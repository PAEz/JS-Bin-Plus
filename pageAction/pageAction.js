onLinkClick = function(evt) {
	if (evt.target.href != '' && currentUrl != evt.target.href && evt.target.target == '') {
		tabShow(evt.target.href);
	}
	if (evt.target.href != '') {
		menuClose(evt.target);
	}
	if (evt.target.target == '') {
		evt.preventDefault();
	}
	return false;
}


tabShow = function(href) {
	if (href.substr(0, 10) == 'element://') {
		var newTab = href.substr(10);
	} else {
		var tab = $qs('div.tab-frame > iframe[src="' + href + '"]');
		if (tab) {
			var newTab = '#' + tab.id;
		} else {
			var newTab = (currentTab == '#tab1') ? '#tab2' : '#tab1';
			$qs(newTab).src = href;
		}
	}

	var menu = $qs('.menu a[href="' + href + '"]');
	if (menu) menuHighlight(menu);

	localStorage['pageAction_currentUrl'] = href;

	if (newTab != currentTab) {
		$qs(currentTab).$set({
			classs: {
				fadeIn: false,
				fadeOut: true
			}
		})

		$qs(newTab).$set({
			classs: {
				fadeIn: true,
				fadeOut: false
			}
		})
		currentTab = newTab;
	}

	currentUrl = href;
}


onMenuOver = function(evt) {
	var menu = evt.target.$lookUpFor('.submenu');
	if (menu) {
		menu.$qs('ul').classList.add('hover');
	}
}


onMenuOut = function(evt) {
	menuClose(evt.target);
}


menuClose = function(el) {
	var menu = el.$lookUpFor('.submenu');
	if (menu) {
		menu.$qs('ul').classList.remove('hover');
	}
}

menuHighlight = function(el) {
	var menu;
	if (menu = $qs('.menu .menu-selected')) menu.classList.remove('menu-selected');
	if (menu = el.$lookUpFor('.submenu'))menu.classList.add('menu-selected');
	else if (menu = el.$lookUpFor('li')) menu.classList.add('menu-selected');
}

onPageLoad = function(evt) {
	currentTab = '#tab1';
	currentUrl = localStorage['pageAction_currentUrl'] === undefined ? chrome.extension.getURL("pageAction/about/about.html") : localStorage['pageAction_currentUrl'];



	$qsForEach('.submenu', function(el) {
		el.$addEvents({
			mouseover: onMenuOver,
			mouseout: onMenuOut
		})
	})

	$qsForEach('a', function(el) {
		/* 
			The following line is just to make all the hrefs have
			fully resolved paths.  We need this because if you do
			element.href you get the fully resolved path, but if
			you querySelect then it goes by the original unresolved
			href path.
		*/
		if (el.href != '') el.href = el.href;
		el.$addEvents({
			click: onLinkClick
		})
	});
	
	tabShow(currentUrl);

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tab) {
		chrome.tabs.sendMessage(tab[0].id, {
			message: "blink",
			details: null,
			source: "pageAction",
			target: "injectedCode"
		});
	});
}


window.addEventListener("DOMContentLoaded", onPageLoad, false);


// var style ='22.03asf 19.0';
// //var style ='asfj';
// var match = /[\d|\.|\d*]+$/i.exec( style );
// //var match = /^[\d|\.|\d*]+/i.exec( style );
// lineheighttest = match && match[0];
// console.log(lineheighttest);