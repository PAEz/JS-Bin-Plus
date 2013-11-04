executeCommand = function(command, details) {
	//console.debug(details)
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tab) {
		chrome.tabs.sendMessage(tab[0].id, {
			message: command,
			details: details,
			source: "beautifyOptions",
			target: "injectedCode"
		});
	});
	if (details && details.reload) {
		setTimeout(function() {
			window.parent.close();
		}, 150);
	}
}

chrome.runtime.onMessage.addListener(function(msg) {
	if (msg.target == "beautifyOptions") {
		// Listen for the details of the jsbin session
		if (msg.message == "getSettings") {
			setOptionElements(msg.details);
			setupOptionElementsEvents();
		}
	}
});

onPageLoad = function(e) {
	executeCommand("getSettings", {
		PAEz: {
			beautify: true
		}
	});

	$qsForEach('[data-toggle="tab"]', function(el) {
		el.addEventListener('click', function(evt) {
			localStorage['options_beautifier_tab'] = evt.srcElement.getAttribute('href');
		})
	})
	var tab = localStorage['options_beautifier_tab'] || $qs('ul#beautifierTabs > li:first-child > a').getAttribute('href');
	if (tab) {
		$qs(tab + '.tab-pane').$set({
			classs: {
				active: true,
				"in": true
			}
		})
		$qs('ul#beautifierTabs a[href="' + tab + '"]').parentElement.$set({
			classs: {
				active: true
			}
		})
		// I couildnt get the below to work without first showing the first tab, thus the above....cant be bothered figuring it out, the above works ;)
		//$('#beautifierTabs a[href="'+localStorage['options_beautifier_tab']+'"]').tab('show');
	}
}

window.addEventListener("DOMContentLoaded", onPageLoad, false);