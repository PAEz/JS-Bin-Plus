onKey = function(evt) {
	var specialKeys = {
		altKey: 'Alt',
		ctrlKey: 'Ctrl',
		metaKey: 'Meta',
		shiftKey: 'Shift'

	};
	var specialCodes = {
		16: true,// Shift
		17: true,// Ctrl
		18: true,// Alt
		91: true,// Left Command  -
		93: true // Right Command - Im Counting these two as Meta

	}
	var specialOrder = ["altKey", "ctrlKey", "metaKey", "shiftKey"];

	var charStr = String.fromCharCode(evt.keyCode);
	var specialStr = '';
	specialOrder.forEach(function(value) {
		if (evt[value]) {
			specialStr += specialKeys[value] + '-';
			$qs('#' + value).classList.add('active');
		} else {
			$qs('#' + value).classList.remove('active');
		}
	});
	specialCodes[evt.keyCode] ? specialStr = specialStr.substr(0, specialStr.length - 1) : specialStr += evt.keyCode;
	//console.debug(specialStr);
	$qs('#char').value = charStr;
	$qs('#keycode').value = evt.keyCode;
	$qs('#full').value = specialStr;
	evt.preventDefault();
	evt.stopPropagation();
	return false;
}

onPageLoad = function(e) {
	window.addEventListener('keydown', onKey)
}


window.addEventListener("DOMContentLoaded", onPageLoad, false);