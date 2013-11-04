onLinkClick = function(evt) {
	evt.target.target="_blank";  // slack as way to open new tab ;)
}

onPageLoad = function(e) {
	$qsForEach('a', function(el) {
		el.$addEvents({
			click: onLinkClick
		})
	});
}


window.addEventListener("DOMContentLoaded", onPageLoad, false);