// Note about textarea as array...
// Couldnt be bothered using some list thingy so just using textareas
// the array items can only contain whole single words (nothing seperated by whitespace)

setupOptionElementsEvents = function() {
	var elements = $qsAll('[data-options_path]');
	elements.$forEach(function(element) {
		element.$addEvents(element.hasAttribute('data-options_throttle') ? {
			input: Cowboy.throttle(element.getAttribute('data-options_throttle'), false, OptionElementChange),
			change: Cowboy.throttle(element.getAttribute('data-options_throttle'), false, OptionElementChange)
		} : {
			input: OptionElementChange,
			change: OptionElementChange
		})
	});
}

setOptionElements = function(obj) {
	var elements = $qsAll('[data-options_path]');
	//var result = {};
	var radioGroups = {}; // List of radio groups allready done
	elements.$forEach(function(element) {
		var path = element.getAttribute('data-options_path');
		//result.$set(path, obj.$get(path));
		if (element.tagName == 'INPUT' && element.type == 'radio') {
			if (radioGroups[element.name] === undefined) {
				radioGroups[element.name] = true;
				setOptionElement(element, obj.$get(path));
			}
		} else {
			setOptionElement(element, obj.$get(path));
		}
	})
	//return result
}

setOptionElement = function(el, value) {
	var options = {};
	if (el.tagName == 'SELECT') {
		el.$qsForEach('option', function(element) {
			if (element.value === value) el.value = value;
		})
	} else if (el.tagName == 'INPUT' && el.type === 'checkbox') {
		if (value === true) {
			el.checked = true;
		} else {
			el.checked = false;
		}
	} else if (el.tagName == 'INPUT' && el.type === 'radio') {
		var radios = $qsAll('input[type="radio"][name="' + el.name + '"]');
		radios.$forEach(function(radio) {
			if (radio.value === value) {
				radio.checked = true;
			} else {
				radio.checked = false;
			}
		})
	} else if (el.tagName == 'TEXTAREA' && el.dataset['options_type'] == 'array') {
		el.value = value.sort().join('\n');
		el.orginalValue = el.value;
	} else {
		el.value = value;
	}
}

OptionElementChange = function(evt) {
	//$debug('event', evt)
	var path = evt.target.getAttribute('data-options_path');
	var reload = evt.target.hasAttribute('data-options_reload');
	try {
		var value = OptionElementValue(evt.target);
	} catch (e) {
		evt.target.classList.add('options-error');
		return
	}
	evt.target.classList.remove('options-error');
	executeCommand('updateSetting', {
		path: path,
		value: value,
		reload: reload
	});
	if (reload) window.setTimeout(function() {
		window.close();
	}, 2)
}

OptionElementValue = function(el) {
	if (el.tagName == 'INPUT' && el.type === 'checkbox') {
		return el.checked;
	} else if (el.tagName == 'INPUT' && el.type === 'number') {
		if (!$isNumber(el.value)) {
			throw new TypeError("Expected a number");
		} else {
			return Number(el.value);
		}
	} else if (el.tagName == 'TEXTAREA' && el.dataset['options_type'] == 'array') {
		return el.value.replace(/\s+/g, ' ').split(' ');
	} else {
		return el.value;
	}
}

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
;(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this)