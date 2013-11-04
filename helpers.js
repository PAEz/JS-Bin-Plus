/*
	PAEz
	Most of this is mine (I do appologize ;)), with a little bit from...
	shurikenJS - https://github.com/shurikenjs/shurikenjs
	...thanx for showing me how to make something on object.prototype not enumerable ;)
*/

// http://stackoverflow.com/a/1830844

function $isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

$debug = console.debug.bind(console);
$log = console.log.bind(console);


$attachScriptsAsync = function(scripts) {
	var head = document.getElementsByTagName('head')[0];
	for (var i = 0, end = scripts.length; i < end; i++) {
		var script = document.createElement('script');
		script.src = chrome.extension.getURL(scripts[i]);
		head.appendChild(script);
	}
}

// Cant just use the async property of the script by the looks of it
// So this is the simplest thing I could think of to make sure the scripts load in the right order
$attachScripts = function(scripts, callback) {
	var head = document.getElementsByTagName('head')[0];
	if (scripts.length > 0) {
		var script = document.createElement('script');
		script.src = chrome.extension.getURL(scripts[0]);
		script.onload = function(e) {
			$attachScripts(scripts.slice(1), callback);
		}
		script.onerror = function(e) {
			console.debug('Error in $attachScripts, aborting...', e)
		}
		head.appendChild(script);
	} else if (callback) callback();
}


$qs = function(selector, el) {
	if (el) {
		return el.querySelector(selector);
	} else {
		return document.querySelector(selector);
	}
}

$qsAll = function(selector, el) {
	if (el) {
		return el.querySelectorAll(selector);
	} else {
		return document.querySelectorAll(selector);
	}
}

Node.prototype.$qs = function(what) {
	return this.querySelector(what);
}

Node.prototype.$qsAll = function(what) {
	return this.querySelectorAll(what);
}

$qsForEach = function(selector, func, el) {
	if (el) {
		return Array.prototype.slice.call(el.querySelectorAll(selector)).forEach(func);
	} else {
		return Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(func);
	}

}

Node.prototype.$qsForEach = function(selector, func) {
	Array.prototype.slice.call(this.querySelectorAll(selector)).forEach(func);
}

NodeList.prototype.$forEach = function(func) {
	[].forEach.call(this, func);
}

/*$qsArray = function(selector, func, el) {
	if (el) {
		return Array.prototype.slice.call(el.querySelectorAll(selector));
	} else {
		return Array.prototype.slice.call(document.querySelectorAll(selector));
	}

}*/

Node.prototype.$qsArray = function(selector, func) {
	return Array.prototype.slice.call(this.querySelectorAll(selector));
}

/*$qsLookUpFor = function(selector, el) {
	el = el.parentElement;
	while (el.webkitMatchesSelector(selector) != true && el != document.documentElement) {
		el = el.parentElement;
	}
	return el == document.documentElement ? undefined : el;
}*/

// Be aware that this starts checking from the element it was passed
// If you expected it to start from its parent, then just target that as the starting element in your own code
Node.prototype.$lookUpFor = function(selector) {
	if (this.nodeName == 'html') return undefined;
	if (this.webkitMatchesSelector(selector)) return this;
	var el = this.parentElement;
	while (el != null && /* el != document.documentElement && */ el.webkitMatchesSelector(selector) != true) {
		el = el.parentElement;
	}
	return el == document.documentElement ? undefined : el;
}

$createElement = function(type, options) {
	if (options) {
		element = document.createElement(type);
		return element.$set(options);
	} else {
		return document.createElement(type);
	}
}

Node.prototype.$set = function(options) {
	var keys, key, i, z, zLength, zKeys, zKey, length;
	keys = Object.keys(options);
	for (i = 0, length = keys.length; i < length; i++) {
		key = keys[i];
		if (key == 'classs') {
			zKeys = Object.keys(options[key]);
			for (z = 0, zLength = zKeys.length; z < zLength; z++) {
				zKey = zKeys[z];
				if (options[key][zKey] == true) {
					this.classList.add(zKey);
				} else {
					this.classList.remove(zKey);
				}
			}
		} else if (key == 'class') {
			this.className = options[key];
		} else if (key == 'styles') {
			zKeys = Object.keys(options[key]);
			for (z = 0, zLength = zKeys.length; z < zLength; z++) {
				zKey = zKeys[z];
				this.style[zKey] = options[key][zKey];
			}
		} else if (key == 'attributes') {
			zKeys = Object.keys(options[key]);
			for (z = 0, zLength = zKeys.length; z < zLength; z++) {
				zKey = zKeys[z];
				this.setAttribute(zKey, options[key][zKey]);
			}
		} else {
			this[key] = options[key];
		}
	}
	return this;
}

$set = function(what, options) {
	$qs(what).$set(options);
}

Node.prototype.$get = function(options) {
	var keys, key, i, z, zLength, zKeys, zKey, length;
	keys = Object.keys(options);
	for (i = 0, length = keys.length; i < length; i++) {
		key = keys[i];
		if (key == 'classs') {
			zKeys = Object.keys(options[key]);
			for (z = 0, zLength = zKeys.length; z < zLength; z++) {
				zKey = zKeys[z];
				options[key][zKey] = this.classList.contains(zKey);
			}
		} else if (key == 'styles') {
			zKeys = Object.keys(options[key]);
			for (z = 0, zLength = zKeys.length; z < zLength; z++) {
				zKey = zKeys[z];
				options[key][zKey] = this.style[zKey];
			}
		} else if (key == 'attributes') {
			zKeys = Object.keys(options[key]);
			for (z = 0, zLength = zKeys.length; z < zLength; z++) {
				zKey = zKeys[z];
				options[key][zKey] = this.getAttribute(zKey);
			}
		} else {
			options[key] = this[key];
		}
	}
	return options;
}

Node.prototype.$append = function(what, options) {
	var i, length;
	if (Array.isArray(what)) {
		for (i = 0, length = what.length; i < length; i++) {
			this.appendChild(what[i]);
		}
	} else if (typeof what == 'string') {
		var element = $createElement(what, options);
		this.appendChild(element);
	} else {
		this.appendChild(what);
	}
	return this;
}

Node.prototype.$addEvents = function(events) {
	var keys = Object.keys(events),
		length = keys.length,
		i = 0,
		key, event;
	for (; i < length; i++) {
		key = keys[i];
		this.addEventListener(key, events[key]);
	}
	return this;
}

$getObjValue = function(obj, path, initial, splitter) {
	var paths = splitter === undefined ? path.split('.') : path.split(splitter);
	var length = paths.length - 1;
	var i = 0;
	for (; i < length; i++) {
		if (obj[paths[i]] === undefined) if (initial !== undefined) obj[paths[i]] = {};
			else return undefined;
		obj = obj[paths[i]];
	}
	if (obj[paths[length]] === undefined && initial !== undefined) obj[paths[length]] = initial;
	return obj[paths[length]];
}

$setObjValue = function(obj, path, value, splitter) {
	var paths = splitter === undefined ? path.split('.') : path.split(splitter);
	var length = paths.length - 1;
	var i = 0;
	for (; i < length; i++) {
		if (obj[paths[i]] === undefined) obj[paths[i]] = {};
		obj = obj[paths[i]];
	}
	obj[paths[length]] = value;
}

Object.defineProperty(Object.prototype, '$get', {
	writable: true,
	enumerable: false,
	value: function(path, initial, splitter) {
		return $getObjValue(this, path, initial, splitter);
	}
});
Object.defineProperty(Object.prototype, '$set', {
	writable: true,
	enumerable: false,
	value: function(path, value, splitter) {
		$setObjValue(this, path, value, splitter);
	}
});

$objectForEach = function(obj, func) {
	var keys = Object.keys(obj),
		length = keys.length,
		i = 0;
	for (; i < length; i++) {
		func(keys[i], obj[keys[i]]);
	}
}
Object.defineProperty(Object.prototype, '$forEach', {
	writable: true,
	enumerable: false,
	value: function(func) {
		$objectForEach(this, func);
	}
});
$mergeObj = function(source, destination) {
	var i = 0,
		key, value;
	// console.debug(source)
	var keys = Object.keys(source);
	var length = keys.length;
	for (; i < length; i++) {
		key = keys[i];
		value = source[key];
		if (Array.isArray(value)) {
			if (!Array.isArray(destination[key])) destination[key] = [];
			$mergeArray(value, destination[key]);
		} else if (value !== null && typeof value == 'object') {
			//	console.debug('obj',value)
			if (Array.isArray(destination[key]) || typeof destination[key] != 'object') destination[key] = {};
			$mergeObj(value, destination[key]);
		} else {
			destination[key] = value;
		}
	}
	return destination;
};
Object.defineProperty(Object.prototype, '$merge', {
	writable: true,
	enumerable: false,
	value: function(source) {
		$mergeObj(source, this);
		return this;
	}
});
$mergeArray = function(source, destination) {
	var key = 0,
		length = source.length,
		value;
	for (; key < length; key++) {
		value = source[key];
		if (Array.isArray(value)) {
			// if(destination[key] === undefined || !Array.isArray(destination[key])) destination[key] = [];
			if (!Array.isArray(destination[key])) destination[key] = [];
			$mergeArray(value, destination[key]);
		} else if (value !== null && typeof value == 'object') {
			if (Array.isArray(destination[key]) || typeof destination[key] != 'object') destination[key] = {};
			$mergeObj(value, destination[key]);
		} else {
			destination[key] = value;
		}
	}
	return destination;
}

$merge = function(source, destination) {
	if (Array.isArray(source) && Array.isArray(destination)) {
		$debug('z')
		return $mergeArray(source, destination);
	} else if (typeof source == 'object' && !Array.isArray(source) && typeof destination == 'object' && !Array.isArray(destination)) {
		$debug('a')
		return $mergeObj(source, destination);
	} else return 'false';
}

// http://stackoverflow.com/questions/2802341/natural-sort-of-text-and-numbers-javascript
Object.defineProperty(Array.prototype, '$naturalSort', {
	writable: true,
	enumerable: false,
	value: function(index) {
		var T = this,
			L = T.length,
			i, who, next,
			isi = typeof index == 'number',
			rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;

		function nSort(aa, bb) {
			var a = aa[0],
				b = bb[0],
				a1, b1, i = 0,
				n, L = a.length;
			while (i < L) {
				if (!b[i]) return 1;
				a1 = a[i];
				b1 = b[i++];
				if (a1 !== b1) {
					n = a1 - b1;
					if (!isNaN(n)) return n;
					return a1 > b1 ? 1 : -1;
				}
			}
			return b[i] ? -1 : 0;
		}
		for (i = 0; i < L; i++) {
			who = T[i];
			next = isi ? T[i][index] || '' : who;
			T[i] = [String(next).toLowerCase().match(rx), who];
		}
		T.sort(nSort);
		for (i = 0; i < L; i++) {
			T[i] = T[i][1];
		}
		return this;
	}
});

Object.defineProperty(Array.prototype, '$toHash', {
	writable: true,
	enumerable: false,
	value: function(path) {
		var result = {};
		for (var i = 0, end = this.length; i < end; i++) {
			var value = path === undefined ? this[i] : $getObjValue(this, path);
			if (typeof value == 'string' || typeof value == 'number') {
				if (result[value] === undefined) result[value] = [];
				result[value].push(i);
			}
		}
		return result;
	}
});

Object.defineProperty(Array.prototype, '$find', {
	writable: true,
	enumerable: false,
	value: function(what) {
		for (var i = 0, end = this.length; i < end; i++) {
			if (this[i]===what) return i;
		}
		return -1;
	}
});

Object.defineProperty(Array.prototype, '$has', {
	writable: true,
	enumerable: false,
	value: function(what) {
		for (var i = 0, end = this.length; i < end; i++) {
			if (this[i]===what) return true;
		}
		return false;
	}
});

// CSSOM stuff

// Searchs the selector text of all rules in a sheet looking for the word what and returns their index
// returns index's and not rules as the rules dont have a value indicating their index in the sheet and I may need that
// the 'what' is really meant to be an id '#what' or class '.what' , the regex is made for that in mind
// I suck at regex so lets hope I got the getting word stuff right....looks like it ;)
// it skips any rule that isnt a CSSStyleRule, like a media sheet or whatever
Object.defineProperty(CSSRuleList.prototype, '$find', {
	writable: true,
	enumerable: false,
	value: function(what, caseInSensitive, startIndex) {
		what = what.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // http://stackoverflow.com/a/6969486/189093
		regexSearch = RegExp(what + "(?=[\\W_]|$)", "g" + (caseInSensitive === true ? 'i' : ''));
		for (var i = startIndex !== undefined ? startIndex : 0, end = this.length; i < end; i++) {
			if (!(this.item(i) instanceof CSSStyleRule)) continue;
			var selector = this.item(i).selectorText;
			if (regexSearch.test(selector)) return i;
		}
		return -1;
	}
});

Object.defineProperty(CSSRuleList.prototype, '$findAll', {
	writable: true,
	enumerable: false,
	value: function(what, caseInSensitive, startIndex) {
		what = what.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // http://stackoverflow.com/a/6969486/189093
		var regexSearch = RegExp(what + "(?=[\\W_]|$)", "g" + (caseInSensitive === true ? 'i' : ''));
		var results = [];
		for (var i = startIndex !== undefined ? startIndex : 0, end = this.length; i < end; i++) {
			if (!(this.item(i) instanceof CSSStyleRule)) continue;
			var selector = this.item(i).selectorText;
			if (regexSearch.test(selector)) results.push(i);
		}
		return results.length > 0 ? results : null;
	}
});