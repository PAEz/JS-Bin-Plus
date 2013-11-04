executeCommand = function(command, details) {
	//console.debug(details)
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tab) {
		chrome.tabs.sendMessage(tab[0].id, {
			message: command,
			details: details,
			source: "codemirrorOptions",
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
	if (msg.target == "codemirrorOptions") {
		// Listen for the details of the jsbin session
		if (msg.message == "getSettings") {
			setOptionElements(msg.details);
			setupOptionElementsEvents();
		}
	}
});

onPageLoad = function(e) {
	var settings = {};
	$qsForEach('[data-options_path]', function(element) {
		$setObjValue(settings, element.getAttribute('data-options_path'), true);
	});

	executeCommand("getSettings", settings);
}

window.addEventListener("DOMContentLoaded", onPageLoad, false);