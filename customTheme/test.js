var colorSelectors = {
	"CodeMirror": "CodeMirror",

	"cm-keyword": "keyword",
	"cm-atom": "atom",
	"cm-number": "number",
	"cm-def": "def",
	"cm-variable": "variable",
	"cm-variable-2": "variable-2",
	"cm-variable-3": "variable-3",
	"cm-property": "property",
	"cm-operator": "operator",
	"cm-comment": "comment",
	"cm-string": "string",
	"cm-string-2": "string-2",
	"cm-meta": "meta",
	"cm-error": "error",
	"cm-qualifier": "qualifier",
	"cm-builtin": "builtin",
	"cm-bracket": "bracket",
	"cm-tag": "tag",
	"cm-attribute": "attribute",
	"cm-header": "header",
	"cm-strong": "strong",
	"cm-quote": "quote",
	"cm-hr": "hr",
	"cm-link": "link",
	"cm-searching": "cm-searching",

	"CodeMirror-matchingbracket": "matching bracket",
	"CodeMirror-nonmatchingbracket": "nonmatching bracket",

	// "CodeMirror-cursor":"cursor",
	// "CodeMirror-secondarycursor":"secondary-cursor",
	// "cm-keymap-fat-cursor": "keymap-fat-cursor",

	// "CodeMirror-activeline-background": "activeline-background",
	// "cm-matchhighlight": "matchhighlight",

	// "cm-negative":"negative",
	// "cm-positive":"positive",

	// "cm-em": "em",
	// "cm-emstrong": "emstrong",
	// "cm-invalidchar": "invalidchar",

	// "cm-special": "special"  // Not in codemirror basic
}
var LESSCodeMirrorMap ={
	".CodeMirror-activeline-background": {
		color: "",
		backgroundcolor: "@active_line-background"
	},
	".CodeMirror-activeline .CodeMirror-linenumber": {
		color: "@active_line-line_numbers",
		backgroundcolor: ""
	},
	".cm-matchhighlight]": {
		"color": "@match-highlighted"
	}
}
var LESSThemeMap = {
	".CodeMirror-activeline-background": {
		color: "",
		backgroundcolor: "@active_line-background"
	},
	".CodeMirror-activeline .CodeMirror-linenumber": {
		color: "@active_line-line_numbers",
		backgroundcolor: ""
	},
	".cm-matchhighlight]": {
		"color": "@match-highlighted"
	},
	".CodeMirror": {
		color: ":@default_text",
		backgroundcolor: "@background"
	},
	".CodeMirror-linenumber": {
		color: "@line_numbers",
		backgroundcolor: "@line_numbers-background"
	},
	".CodeMirror-matchingbracket": {
		color: "@matching_bracket",
		backgroundcolor: ""
	},
	".CodeMirror-nonmatchingbracket": {
		color: "@nonmatching_bracket",
		backgroundcolor: ""
	},
	".CodeMirror-cursor": {
		color: "@cursor",
		backgroundcolor: ""
	},
	".CodeMirror-secondarycursor": {
		color: "",
		backgroundcolor: ""
	},
	".CodeMirror-focused .CodeMirror-selected": {
		color: "",
		backgroundcolor: "@selection-background-focused"
	},
	".CodeMirror-selected": {
		color: "",
		backgroundcolor: "@selection-background-unfocused"
	},
	".CodeMirror-gutters": {
		color: "",
		backgroundcolor: ""
	},
	".cm-matchhighlight": {
		color: "@match-highlighted",
		backgroundcolor: ""
	},
	".cm-atom": {
		color: "@atom"
	},
	".cm-attribute": {
		color: "@attribute"
	},
	".cm-bracket": {
		color: "@bracket"
	},
	".cm-builtin": {
		color: "@builtin"
	},
	".cm-comment": {
		color: "@comment"
	},
	".cm-def": {
		color: "@def"
	},
	".cm-em": {
		color: ""
	},
	".cm-emstrong": {
		color: ""
	},
	".cm-error": {
		color: "@error"
	},
	".cm-header": {
		color: "@header"
	},
	".cm-hr": {
		color: "@hr"
	},
	".cm-invalidchar": {
		color: ""
	},
	".cm-keymap-fat-cursor": {
		color: ""
	},
	".cm-keyword": {
		color: "@keyword"
	},
	".cm-link": {
		color: "@link"
	},
	".cm-matchhighlight": {
		color: ""
	},
	".cm-meta": {
		color: "@meta"
	},
	".cm-negative": {
		color: ""
	},
	".cm-number": {
		color: "@number"
	},
	".cm-operator": {
		color: "@operator"
	},
	".cm-positive": {
		color: ""
	},
	".cm-property": {
		color: "@property"
	},
	".cm-qualifier": {
		color: "@qualifier"
	},
	".cm-quote": {
		color: "@quote"
	},
	".cm-searching": {
		color: ""
	},
	".cm-special": {
		color: ""
	},
	".cm-string": {
		color: "@string"
	},
	".cm-string-2": {
		color: "@string-2"
	},
	".cm-strong": {
		color: ""
	},
	".cm-tab": {
		color: ""
	},
	".cm-tag": {
		color: "@tag"
	},
	".cm-variable": {
		color: "@variable"
	},
	".cm-variable-2": {
		color: "@variable-2"
	},
	".cm-variable-3": {
		color: "@variable-3"
	}
}
var defaults = {
	".CodeMirror-activeline-background": {
		color: "",
		backgroundcolor: "rgb(232, 242, 255)"
	},
	".CodeMirror-activeline .CodeMirror-linenumber": {
		color: "@active_line-line_numbers",
		backgroundcolor: ""
	},
	".cm-matchhighlight]": {
		"color": "@match-highlighted"
	},
	".CodeMirror": {
		color: ":@default_text",
		backgroundcolor: "@background"
	},
	".CodeMirror-linenumber": {
		color: "@line_numbers",
		backgroundcolor: "@line_numbers-background"
	},
	".CodeMirror-matchingbracket": {
		color: "@matching_bracket",
		backgroundcolor: ""
	},
	".CodeMirror-nonmatchingbracket": {
		color: "@nonmatching_bracket",
		backgroundcolor: ""
	},
	".CodeMirror-cursor": {
		color: "@cursor",
		backgroundcolor: ""
	},
	".CodeMirror-secondarycursor": {
		color: "",
		backgroundcolor: ""
	},
	".CodeMirror-focused .CodeMirror-selected": {
		color: "",
		backgroundcolor: "@selection-background-focused"
	},
	".CodeMirror-selected": {
		color: "",
		backgroundcolor: "@selection-background-unfocused"
	},
	".CodeMirror-gutters": {
		color: "",
		backgroundcolor: ""
	},
	".cm-matchhighlight": {
		color: "@match-highlighted",
		backgroundcolor: ""
	},
	".cm-atom": {
		color: "rgb(34, 17, 153)"
	},
	".cm-attribute": {
		color: "rgb(0, 0, 204)"
	},
	".cm-bracket": {
		color: "rgb(153, 153, 119)"
	},
	".cm-builtin": {
		color: "rgb(51, 0, 170)"
	},
	".cm-comment": {
		color: "rgb(170, 85, 0)"
	},
	".cm-def": {
		color: "rgb(0, 0, 255)"
	},
	".cm-em": {
		color: ""
	},
	".cm-emstrong": {
		color: ""
	},
	".cm-error": {
		color: "rgb(255, 0, 0)"
	},
	".cm-header": {
		color: "blue"
	},
	".cm-hr": {
		color: "rgb(153, 153, 153)"
	},
	".cm-invalidchar": {
		color: ""
	},
	".cm-keymap-fat-cursor": {
		color: ""
	},
	".cm-keyword": {
		color: "rgb(119, 0, 136)"
	},
	".cm-link": {
		color: "rgb(0, 0, 204)"
	},
	".cm-matchhighlight": {
		color: ""
	},
	".cm-meta": {
		color: "rgb(85, 85, 85)"
	},
	".cm-negative": {
		color: ""
	},
	".cm-number": {
		color: "rgb(17, 102, 68)"
	},
	".cm-operator": {
		color: "black"
	},
	".cm-positive": {
		color: ""
	},
	".cm-property": {
		color: "black"
	},
	".cm-qualifier": {
		color: "rgb(85, 85, 85)"
	},
	".cm-quote": {
		color: "rgb(0, 153, 0)"
	},
	".cm-searching": {
		color: ""
	},
	".cm-special": {
		color: ""
	},
	".cm-string": {
		color: "rgb(170, 17, 17)"
	},
	".cm-string-2": {
		color: "rgb(255, 85, 0)"
	},
	".cm-strong": {
		color: ""
	},
	".cm-tab": {
		color: ""
	},
	".cm-tag": {
		color: "rgb(17, 119, 0)"
	},
	".cm-variable": {
		color: "black"
	},
	".cm-variable-2": {
		color: "rgb(0, 85, 170)"
	},
	".cm-variable-3": {
		color: "rgb(0, 136, 85)"
	}
}
var themes = {
	CodeMirror: {
		color:#000,
		backgroundColor:#fff
	}
};
var colorClass = {
	".CodeMirror": true,
	".CodeMirror-linenumber": true,
	".CodeMirror-matchingbracket": true,
	".CodeMirror-nonmatchingbracket": true,
	".CodeMirror-cursor": true,
	".CodeMirror-secondarycursor": true,
	".CodeMirror-activeline-background": true,
	".CodeMirror-activeline .CodeMirror-linenumber": true, //<-- New, needs testing
	".CodeMirror-focused .CodeMirror-selected": true,
	".CodeMirror-selected": true,
	".CodeMirror-gutters": true,
	".cm-matchhighlight": true, //<-- Need some code to handle that this isnt just color but the color of an outling...its not getting picked up
	".cm-atom": {
		selector: true,
		selectors: true
	},
	".cm-attribute": true,
	".cm-bracket": true,
	".cm-builtin": true,
	".cm-comment": true,
	".cm-def": true,
	".cm-em": true,
	".cm-emstrong": true,
	".cm-error": true,
	".cm-header": true,
	".cm-hr": true,
	".cm-invalidchar": true,
	".cm-keymap-fat-cursor": true,
	".cm-keyword": true,
	".cm-link": true,
	".cm-matchhighlight": true,
	".cm-meta": true,
	".cm-negative": true,
	".cm-number": true,
	".cm-operator": true,
	".cm-positive": true,
	".cm-property": true,
	".cm-qualifier": true,
	".cm-quote": true,
	".cm-searching": true,
	".cm-special": true,
	".cm-string": true,
	".cm-string-2": true,
	".cm-strong": true,
	".cm-tab": true,
	".cm-tag": true,
	".cm-variable": true,
	".cm-variable-2": true,
	".cm-variable-3": true
}

// Bail on a rule if these class's come up
var ignoreClass = {
	'.cm-s-light': true,
	'.cm-s-dark': true
}

var styleNode = document.createElement('link');
styleNode.type = 'text/css';
styleNode.rel = 'stylesheet';
styleNode.id = 'customTheme';
styleNode.href = 'style.css';
//styleNode.href = 'http://www.mocky.io/v2/51de919ba9708fc100762c1a';
/* The following command is just there to stop the style sheet being used on the page.
   Setting dissabled made the style sheet not show up with document.styleSheets so this fixs that */
styleNode.media = 'resolution:0dpi';

styleNode.onload = function(e) {
	sheet = e.srcElement.sheet;
	var cssRules = sheet.cssRules;
	results = {};
	var regexClass = /\.[\w-_]*/gi;
	var regexThemeClass = RegExp("^\.cm-s-");
	for (var i = 0, end = cssRules.length; i < end; i++) {
		var rule = cssRules.item(i);
		var selectorsText = rule.selectorText;
		if (selectorsText) var selectors = selectorsText.split(',');
		selectors.forEach(function(selector) {
			var matches = selector.match(regexClass);
			var themeClass = '';
			if (matches) {
				//console.debug(matches.$toHash())
				if (matches.some(function(item) {
					if (regexThemeClass.test(item)) {
						themeClass = item;
						if (!themes[themeClass]) {
							themes[themeClass] = {
								colors: {},
								css: ''
							};
						}

						var escapedThemeClass = themeClass.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // http://stackoverflow.com/a/6969486/189093
						var regexSearch = RegExp(escapedThemeClass + "(?=[\\W_]|$)", "g");
						themes[themeClass].css = themes[themeClass].css + rule.cssText.replace(regexSearch, 'cm-s-Custom') + ' ';
						return true;
					}
				})) {
					var matchPath = '';
					var ignoring = false;
					matches.splice(0, 1);
					matches.forEach(function(item) {
						if (!ignoring) ignoring = ignoreClass[item] !== undefined;
						if (ignoring) return;
						matchPath += (matchPath.length !== 0 ? ' ' : '') + item;
						//console.debug(matchPath);
						if (colorClass[item] && !colorClass[matchPath]) {
							if (item == '.cm-matchhighlight') {
								themes[themeClass].colors[".cm-matchhighlight]"] = {
									colors: {
										color: rule.style.outlineColor
									}
								};
							} else
							if (item == '.CodeMirror-linenumber') {
								// && matches.indexOf('.CodeMirror-linenumber') != -1
								if (matches.indexOf(".CodeMirror-activeline")!==-1) themes[themeClass].colors[".CodeMirror-activeline "] = {
									colors: {
										color: rule.style.color
									}
								}else if (matches.indexOf(".CodeMirror-activeline")!==-1) themes[themeClass].colors[".CodeMirror-activeline "] = {
									colors: {
										color: rule.style.color
									}
								}

							} else
							if (item == '.CodeMirror-activeline-background') {
								themes[themeClass].colors['.CodeMirror-activeline-background'] = {
									colors: {}
								};
								if (rule.style.color !== '') themes.CodeMirror['.CodeMirror-activeline-background'].colors.color = rule.style.color;
								if (rule.style.backgroundColor !== '') themes.CodeMirror['.CodeMirror-activeline-background'].colors.backgroundColor = rule.style.backgroundColor;
								themes.CodeMirror['.CodeMirror-activeline-background'].selector = selectorsText;
							} else
							if (item == '.CodeMirror') {
								if (rule.cssText.indexOf(themeClass + '.CodeMirror') != -1 || rule.cssText.indexOf('.CodeMirror' + themeClass) != -1) {
									//themes[themeClass].colors[item] = selector + rule.cssText.substring(rule.cssText.indexOf('{') - 1, rule.cssText.lastIndexOf('}') + 1);
									if (themes[themeClass].colors[item] === undefined && (rule.style.color !== '' || rule.style.backgroundColor !== '')) themes[themeClass].colors[item] = {};
									if (rule.style.backgroundColor !== '') themes[themeClass].colors[item].backgroundColor = rule.style.backgroundColor;
									if (rule.style.color !== '') themes[themeClass].colors[item].color = rule.style.color;;
								}
							} else {


								if (themes[themeClass].colors[item] === undefined && (rule.style.color !== '' || rule.style.backgroundColor !== '')) themes[themeClass].colors[item] = {};
								if (rule.style.color !== '') themes[themeClass].colors[item].color = rule.style.color;
								if (rule.style.backgroundColor !== '') themes[themeClass].colors[item].backgroundColor = rule.style.backgroundColor;
								if (typeof colorClass[item] == 'object') {
									var matchesObj = matches.$toHash();
								}
								if (colorClass[item].selector) themes[themeClass].colors[item].selector = selector;
								if (colorClass[item].selectors) themes[themeClass].colors[item].selectors = selectorsText;
							}
						} else if (colorClass[matchPath]) {
							//console.debug('yeah',matchPath)
							item = matchPath;
							if (themes[themeClass].colors[item] === undefined && (rule.style.color !== '' || rule.style.backgroundColor !== '')) themes[themeClass].colors[item] = {};
							if (rule.style.color !== '') themes[themeClass].colors[item].color = rule.style.color;
							if (rule.style.backgroundColor !== '') themes[themeClass].colors[item].backgroundColor = rule.style.backgroundColor;
							if (typeof colorClass[item] == 'object') {
								var matchesObj = matches.$toHash();
							}
							if (colorClass[item].selector) themes[themeClass].colors[item].selector = selector;
							if (colorClass[item].selectors) themes[themeClass].colors[item].selectors = selectorsText;
						}
					});
					// console.debug('path ', matchPath)
					// console.debug('rule ', selector, '\n')
					// console.debug('  \n')
				} else matches.forEach(function(item) {
					if (item == '.cm-matchhighlight') {
						themes.CodeMirror[".cm-matchhighlight]"] = {
							colors: {
								color: rule.style.outlineColor
							}
						};
					} else
					if (item == '.CodeMirror-activeline') {
						// && matches.indexOf('.CodeMirror-linenumber') != -1
						themes.CodeMirror[".CodeMirror-activeline .CodeMirror-linenumber"] = {
							colors: {
								color: rule.style.color
							}
						};

					} else
					if (item == '.CodeMirror-activeline-background') {
						themes.CodeMirror['.CodeMirror-activeline-background'] = {
							colors: {}
						};
						if (rule.style.color !== '') themes.CodeMirror['.CodeMirror-activeline-background'].colors.color = rule.style.color;
						if (rule.style.backgroundColor !== '') themes.CodeMirror['.CodeMirror-activeline-background'].colors.backgroundColor = rule.style.backgroundColor;
						themes.CodeMirror['.CodeMirror-activeline-background'].selector = selectorsText;
					}
				});
			}
		});
	}
}
if (themes.CodeMirror[".CodeMirror-activeline .CodeMirror-linenumber"].colors.color=='') themes.CodeMirror[".CodeMirror-activeline .CodeMirror-linenumber"].colors.color=themes.CodeMirror[".CodeMirror-activeline .CodeMirror-linenumber"].colors.color;
							}
						};
document.head.appendChild(styleNode);
var keys = Object.keys(themes);
var LESSVars={};
for (var i=0,end=keys.length;i<end;i++){
	var theme =keys[i];
	if (theme!='CodeMirror'){
		var colors=themes[theme].colors;
		var zkeys=Object.keys(colors);
		for (var z=0,zend=zkeys.length;z<zend;z++){
			color=zkeys[z];
			if (LESSThemeMap[color]){
				if (LESSThemeMap[color].color!='')if(colors[color].color)LESSVars[LESSThemeMap[color].color]=colors[color].color; else LESSVars[LESSThemeMap[color].color]=defaults[color].color;
				
			}
		}
	}
}







addColor = function(targetClass, colors, rule) {
	if (colors[targetClass] === undefined && (rule.style.color !== '' || rule.style.backgroundColor !== '')) colors[targetClass] = {};
	if (rule.style.color !== '') colors[targetClass].color = rule.style.color;
	if (rule.style.backgroundColor !== '') colors[targetClass].backgroundColor = rule.style.backgroundColor;
	if (colorClass[targetClass].selector) colors[targetClass].selector = selector;
	if (colorClass[targetClass].selectors) colors[targetClass].selectors = selectorsText;
}


styleNode.onload = function(e) {
	sheet = e.srcElement.sheet;
	var cssRules = sheet.cssRules;
	results = {};
	for (var i = 0, end = cssRules.length; i < end; i++) {
		var rule = cssRules.item(i);
		var selectorsText = rule.selectorText;
		if (selectorsText) var selectors = selectorsText.split(',');
		var regexClass = /\.[\w-]*/gi;
		var regexThemeClass = RegExp("^\.cm-s-");
		for (var si = 0, send = selectors.length; si < send; si++) {
			var selector = selectors[si];
			if (regexClass.test(selector)) {
				var matches = selector.match(regexClass);
				var themeClas = '';
				for (var match in matches) {
					//console.debug(matches)
					if (regexThemeClass.test(matches[match])) {
						if (!themes[matches[match]]) {
							themes[matches[match]] = [];
							themesColors[matches[match]] = {};
						}

						for (var i2 = 0, end2 = matches.length; i2 < end2; i2++) {
							if (colorClass[matches[i2]]) {
								if (matches[i2] == '.CodeMirror') {
									if (rule.cssText.indexOf(matches[match] + '.CodeMirror') != -1 || rule.cssText.indexOf('.CodeMirror' + matches[match]) != -1)
										themesColors[matches[match]][matches[i2]] = selector + rule.cssText.substring(rule.cssText.indexOf('{') - 1, rule.cssText.lastIndexOf('}') + 1);
								} else themesColors[matches[match]][matches[i2]] = selector + rule.cssText.substring(rule.cssText.indexOf('{') - 1, rule.cssText.lastIndexOf('}') + 1);
							}
						}
						//themes[matches[match]].push(rule.cssText);
						themes[matches[match]] = themes[matches[match]] + rule.cssText;
						//console.debug(themes)
						break;
					} else {
						if (matches[match] == '.CodeMirror-activeline-background') themesColors.CodeMirror['.CodeMirror-activeline-background'] = rule.cssText;
					}
				}
			}
		}
	}
}
document.head.appendChild(styleNode);



styleNode.onload = function(e) {
	sheet = e.srcElement.sheet;
	var cssRules = sheet.cssRules;
	results = {};
	for (var i = 0, end = cssRules.length; i < end; i++) {
		var rule = cssRules.item(i);
		var selectorsText = rule.selectorText;
		if (selectorsText) var selectors = selectorsText.split(',');
		var regexClass = /\.[\w-]*/gi;
		var regexThemeClass = RegExp("^\.cm-s-");
		for (var si = 0, send = selectors.length; si < send; si++) {
			var selector = selectors[si];
			if (regexClass.test(selector)) {
				var matches = selector.match(regexClass);
				var themeClas = '';
				for (var match in matches) {
					//console.debug(matches)
					if (regexThemeClass.test(matches[match])) {
						if (!themes[matches[match]]) {
							themes[matches[match]] = [];
							themesColors[matches[match]] = {};
						}

						for (var i2 = 0, end2 = matches.length; i2 < end2; i2++) {
							if (colorClass[matches[i2]]) {
								if (matches[i2] == '.CodeMirror') {
									if (rule.cssText.indexOf(matches[match] + '.CodeMirror') != -1 || rule.cssText.indexOf('.CodeMirror' + matches[match]) != -1)
										themesColors[matches[match]][matches[i2]] = rule.cssText;
								} else themesColors[matches[match]][matches[i2]] = rule.cssText;
							}
						}
						themes[matches[match]].push(rule.cssText);
						//break;
					} else {
						if (matches[match] == '.CodeMirror-activeline-background') themesColors.CodeMirror['.CodeMirror-activeline-background'] = rule.cssText;
					}
				}
			}
		}
	}
}
document.head.appendChild(styleNode);



styleNode.onload = function(e) {
	sheet = e.srcElement.sheet;
	var cssRules = sheet.cssRules;
	results = {};
	for (var i = 0, end = cssRules.length; i < end; i++) {
		var rule = cssRules.item(i);
		var selector = rule.selectorText;
		var regexClass = /\.[\w-]*/gi;
		var regexThemeClass = RegExp("^.cm-s-");
		if (regexClass.test(selector)) {
			var matches = selector.match(regexClass);
			console.debug(matches)
			for (var match in matches) {
				if (!results[matches[match]]) {
					results[matches[match]] = true;
				}
				//results.push(matches[match]);
			}
		}
	}

}