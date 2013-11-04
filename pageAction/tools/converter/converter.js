// wow...keyboard handling sux!
// might have to look around for something to handle this crap
onKey = function(evt) {
//console.debug(evt.keyCode)
	var cleanRegEx = {
		hex: /[A-Fa-f0-9]/,
		decimal: /[0-9]/,
		binary: /[0-1]/
	}
	var allowedKeys = {
		37: true, // Left arrow 
		'Shift-37': true,
		39: true, // Right arrow
		'Shift-39': true,
		38: true, // Up arrow
		40: true, // Down arrow
		46: true, // Delete
		8: true, // Back space
		9: true, // Tab
		'Ctrl-9': true,
		'Alt-9': true,
		45: true, // Insert
		36: true, // Home
		35: true, // End
		33: true, // Page Up
		34: true, // Page Down

		// Numeric key pad keys 0-9
		96: true,
		97: true,
		98: true,
		99: true,
		100: true,
		101: true,
		102: true,
		103: true,
		104: true,
		105: true,

		13: true, // Key pad Enter

		// Function keys F1-F12
		112: true,
		113: true,
		114: true,
		115: true,
		116: true,
		117: true,
		118: true,
		119: true,
		120: true,
		121: true,
		122: true,
		123: true,

		'Ctrl-86': true, // Ctrl-V / Cut
		'Ctrl-67': true, // Ctrl-C / Copy
		'Ctrl-88': true, // Ctrl-X / Paste
		'Meta-86': true, // Command-V / Cut /* Is this right for Macs?...Ive got no idea ;) */
		'Meta-67': true, // Command-C / Copy
		'Meta-88': true // Command-X / Paste
	}
	var specialKeys = {
		altKey: 'Alt',
		ctrlKey: 'Ctrl',
		metaKey: 'Meta',
		shiftKey: 'Shift'

	};
	var specialOrder = ["altKey", "ctrlKey", "metaKey", "shiftKey"];

	var target = evt.target;
	var charStr = String.fromCharCode(evt.keyCode);
	var specialStr = '';
	specialOrder.forEach(function(value) {
		if (evt[value]) specialStr += specialKeys[value] + '-';
	});
	specialStr += evt.keyCode;
	//console.debug(specialStr);
	if (!charStr.match(cleanRegEx[target.id]) && !allowedKeys[specialStr]) {
		evt.preventDefault();
		return false;
	}

}

onUpdate = function(evt) {
	var type = {
		hex: 16,
		decimal: 10,
		binary: 2
	}
	var id = evt.target.id;
	var value = parseInt(evt.target.value, type[id]);
	updateValues(value);
}

updateValues = function(value) {
	value = parseInt(value);
	if ($isNumber(value)) {
		var values = {
			"#decimal": value.toString(10),
			"#hex": value.toString(16),
			"#binary": value.toString(2)
		}
		values.$forEach(function(key, value) {
			$qs(key).value = value;
		})
		localStorage.setItem('converter-value', value);
	}
}

onPageLoad = function(e) {
	$qsForEach('#decimal, #hex, #binary', function(el) {
		el.$addEvents({
			keydown: onKey,
			input: onUpdate,
			change: onUpdate
		})
	});
	if (localStorage.getItem('converter-value')) updateValues(localStorage.getItem('converter-value'));
	var el = $qs('#decimal');
	el.focus();
	el.select();
}


window.addEventListener("DOMContentLoaded", onPageLoad, false);