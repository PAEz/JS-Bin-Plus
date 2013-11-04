var _scriptsAttached = false;

waitForJsBin = function() {
	if (document.querySelector('body.ready')) {
		chrome.runtime.sendMessage({
			message: "JsBinReady",
			details: "",
			target: "background",
			source: "contentScript"
		});
		if (!_scriptsAttached) {
			$attachScripts([
					'helpers.js',
					'CodeMirrorAddons/closebrackets.js',
				//'CodeMirrorAddons/matchbrackets.js',
				'beautify/beautify.js',
					'beautify/beautify-css.js',
					'beautify/beautify-html.js',
				//
				'libs/spectrum.js',
				//'libs/tinycolor.js', // still use this tinycolor after spectrum even tho spectrum has it.  Reason is I added a couple of small functions that allow me to get rgba not matter what the alpha is
				'injectedCode.js',
					"beautify/unpackers/javascriptobfuscator_unpacker.js",
					"beautify/unpackers/myobfuscate_unpacker.js",
					"beautify/unpackers/p_a_c_k_e_r_unpacker.js",
					'beautify/unpackers/urlencode_unpacker.js',
			]);


			_scriptsAttached = true;
			// Init the context menu
			setTimeout(function() {
				window.postMessage({
					target: "injectedCode",
					source: "background",
					message: "updateContextMenu",
					details: "intialCheck"
				}, "*");
			}, 200)

		}
		//console.debug('JsBin ready')
	} else {
		//console.debug('not ready')
		setTimeout(arguments.callee, 200);
	}
}

//waitForJsBin();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.target == 'contentScript') {
		if (request.message == 'waitForJsBin') waitForJsBin();
	} else if (request.target == "injectedCode") window.postMessage(request, "*");
	//sendResponse({});
});

// Send any messages from the injected script out into the extension
window.addEventListener("message", function(event) {
	if (event.source != window) return;
	if (event.data.source == "injectedCode") {
		chrome.runtime.sendMessage(event.data);
	}
}, false);