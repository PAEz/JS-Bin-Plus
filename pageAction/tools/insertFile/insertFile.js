chrome.runtime.onMessage.addListener(function(message) {
	if (message.target == "insertFile") {
		//
	}
});


onPageLoad = function(e) {
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
}


window.addEventListener("DOMContentLoaded", onPageLoad, false);

// http://www.html5rocks.com/en/tutorials/file/dndfiles/

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

		/*// Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }*/

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.sendMessage(tab.id, {
						message: "insertText",
						details: e.target.result,
						target: "injectedCode",
						source: "bookmarklet"
					});
				});
				setTimeout(function() {
					window.parent.close();
				}, 150);
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}
}