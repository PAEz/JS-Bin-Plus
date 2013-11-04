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
/*





@match-highlighted : #666;

@cursor : #000;
@cursor : #000;*/


/*
  Appology ;P
  This was all done before I had any idea how to do it
  In the end this works, but could seriously do with reducing now I know how it works ;)
  Ill get to that later...
*/

// Putting all CodeMirror stuff in the theme now, so theres no real need for this now
var LESSCodeMirrorMap = {
	".CodeMirror-linenumber": {
		color: "@line_numbers",
		backgroundcolor: "@line_numbers-background"
	},
	".CodeMirror-activeline-background": {
		color: "",
		backgroundcolor: "@active_line-background"
	},
	".CodeMirror-activeline .CodeMirror-linenumber": {
		color: "@active_line-line_numbers",
		backgroundcolor: "@active_line-line_numbers-background"
	},
	".cm-matchhighlight": {
		"color": "@match-highlighted",
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
	backgroundcolor: '@background',
	color: "@default_text"
}

var LESSVariables = {
	"@keyword": {
		path: ".cm-keyword^color",
		default: "rgb(119, 0, 136)"
	},
	"@atom": {
		path: ".cm-atom^color",
		default: "rgb(34, 17, 153)"
	},
	"@number": {
		path: ".cm-number^color",
		default: "rgb(17, 102, 68)"
	},
	"@def": {
		path: ".cm-def^color",
		default: "rgb(0, 0, 255)"
	},
	"@variable": {
		path: ".cm-variable^color",
		default: "#000"
	},
	"@variable-2": {
		path: ".cm-variable-2^color",
		default: "rgb(0, 85, 170)"
	},
	"@variable-3": {
		path: ".cm-variable-3^color",
		default: "rgb(0, 136, 85)"
	},
	"@property": {
		path: ".cm-property^color",
		default: "#000"
	},
	"@operator": {
		path: ".cm-operator^color",
		default: "#000"
	},
	"@comment": {
		path: ".cm-comment^color",
		default: "rgb(170, 85, 0)"
	},
	"@string": {
		path: ".cm-string^color",
		default: "rgb(170, 17, 17)"
	},
	"@string-2": {
		path: ".cm-string-2^color",
		default: "rgb(255, 85, 0)"
	},
	"@meta": {
		path: ".cm-meta^color",
		default: "rgb(85, 85, 85)"
	},
	"@error": {
		path: ".cm-error^color",
		default: "rgb(255, 0, 0)"
	},
	"@qualifier": {
		path: ".cm-qualifier^color",
		default: "rgb(85, 85, 85)"
	},
	"@builtin": {
		path: ".cm-builtin^color",
		default: "rgb(51, 0, 170)"
	},
	"@bracket": {
		path: ".cm-bracket^color",
		default: "rgb(153, 153, 119)"
	},
	"@tag": {
		path: ".cm-tag^color",
		default: "rgb(17, 119, 0)"
	},
	"@attribute": {
		path: ".cm-attribute^color",
		default: "rgb(0, 0, 204)"
	},
	"@header": {
		path: ".cm-header^color",
		default: "blue"
	},
	"@quote": {
		path: ".cm-quote^color",
		default: "rgb(0, 153, 0)"
	},
	"@hr": {
		path: ".cm-hr^color",
		default: "rgb(153, 153, 153)"
	},
	"@link": {
		path: ".cm-link^color",
		default: "rgb(0, 0, 204)"
	},
	// This one isnt standard but works great for an object where the property and value are both strings
	"@string-property": {
		path: ".cm-string.cm-property^color",
		default: "#9f469c"
	},

	// Code Mirror Colours
	"@background": {
		path: ".CodeMirror^backgroundcolor",
		default: "#fff"
	},
	"@default_text": {
		path: ".CodeMirror^color",
		default: "#000"
	},

	"@line_numbers": {
		path: ".CodeMirror-linenumber^color",
		default: "rgb(153, 153, 153)"
	},
	"@line_numbers-background": {
		path: ".CodeMirror-linenumber^backgroundcolor",
		default: "rgb(232, 242, 255)"
	},

	"@active_line-line_numbers": {
		path: ".CodeMirror-activeline .CodeMirror-linenumber^color",
		default: "rgb(153, 153, 153)"
	},
	"@active_line-line_numbers-background^backgroundcolor": {
		path: ".CodeMirror-activeline .CodeMirror-linenumber",
		default: "rgb(232, 242, 255)"
	},

	"@active_line-background": {
		path: ".CodeMirror-activeline-background^backgroundcolor",
		default: "rgb(232, 242, 255)"
	},

	"@selection-background-unfocused": {
		path: ".CodeMirror-selected^backgroundcolor",
		default: "rgb(215, 212, 240)"
	},
	"@selection-background-focused": {
		path: ".CodeMirror-focused .CodeMirror-selected^backgroundcolor",
		default: "rgb(215, 212, 240)"
	},

	"@matching_bracket": {
		path: ".CodeMirror-matchingbracket^color",
		default: "rgb(126, 252, 126)"
	},
	"@nonmatching_bracket": {
		path: ".CodeMirror-nonmatchingbracket^color",
		default: "rgb(255, 34, 34)"
	},

	"@match-highlighted": {
		path: ".cm-matchhighlight^color",
		default: "rgb(102, 102, 102)"
	},

	"@cursor": {
		path: ".CodeMirror-cursor^color",
		default: "#000"
	}
}
var LESSThemeMap = {
	".CodeMirror-activeline-background": {
		color: "",
		backgroundcolor: "@active_line-background"
	},
	".CodeMirror-activeline .CodeMirror-linenumber": {
		color: "@active_line-line_numbers",
		backgroundcolor: "@active_line-line_numbers-background"
	},
	".cm-matchhighlight": {
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

// Do this auto later
var defaults = {
	".CodeMirror-activeline-background": {
		color: "",
		backgroundcolor: "rgb(232, 242, 255)"
	},
	".CodeMirror-activeline .CodeMirror-linenumber": {
		backgroundcolor: "rgb(232, 242, 255)",
		color: "rgb(153, 153, 153)"
	},
	".cm-matchhighlight": {
		"color": "rgb(102, 102, 102)"
	},
	".CodeMirror": {
		color: "#000",
		backgroundcolor: "#fff"
	},
	".CodeMirror-linenumber": {
		color: "rgb(153, 153, 153)",
		backgroundcolor: "rgb(232, 242, 255)"
	},
	".CodeMirror-matchingbracket": {
		color: "rgb(126, 252, 126)",
		backgroundcolor: ""
	},
	".CodeMirror-nonmatchingbracket": {
		color: "rgb(255, 34, 34)",
		backgroundcolor: ""
	},
	".CodeMirror-cursor": {
		color: "black",
		backgroundcolor: ""
	},
	".CodeMirror-secondarycursor": {
		color: "",
		backgroundcolor: ""
	},
	".CodeMirror-focused .CodeMirror-selected": {
		color: "",
		backgroundcolor: "rgb(215, 212, 240)"
	},
	".CodeMirror-selected": {
		color: "",
		backgroundcolor: "rgb(215, 212, 240)"
	},
	".CodeMirror-gutters": {
		color: "rgb(247, 247, 247)",
		backgroundcolor: ""
	},
	".cm-matchhighlight": {
		color: "rgb(102, 102, 102)",
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
	},
	".cm-string.cm-property":{
		color:"#9f469c"
	}
}
var themes = {
	CodeMirror: {
		color: "#000",
		backgroundColor: "#fff"
	}
};
// Colors that may be defined outside of a theme, but they are also checked for in themes
var codeMirrorColorClass = {
	".CodeMirror-linenumber": true,
	".CodeMirror-activeline-background": true,
	".CodeMirror-activeline .CodeMirror-linenumber": true,
	".cm-matchhighlight": true,
	".CodeMirror-focused .CodeMirror-selected": true,
	".CodeMirror-selected": true,
	".CodeMirror-matchingbracket": true,
	".CodeMirror-nonmatchingbracket": true,
	".CodeMirror-cursor": true,
	".CodeMirror-secondarycursor": true,
	".CodeMirror-gutters": true,
	".cm-matchhighlight": true
}
// Colors used in themes
var colorClass = {
	".CodeMirror": true,
	// ".CodeMirror-linenumber": true,
	// ".CodeMirror-matchingbracket": true,
	// ".CodeMirror-nonmatchingbracket": true,
	// ".CodeMirror-cursor": true,
	// ".CodeMirror-secondarycursor": true,
	// ".CodeMirror-activeline-background": true,
	// ".CodeMirror-activeline .CodeMirror-linenumber": true, //<-- New, needs testing
	// ".CodeMirror-focused .CodeMirror-selected": true,
	// ".CodeMirror-selected": true,
	// ".CodeMirror-gutters": true,
	// ".cm-matchhighlight": true, //<-- Need some code to handle that this isnt just color but the color of an outling...its not getting picked up
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
	".cm-variable-3": true,
	'.cm-string.cm-property':true
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
/* The following command is just there to stop the style sheet being used on the page.
   Setting dissabled made the style sheet not show up with document.styleSheets so this fixs that */
styleNode.media = 'resolution:0dpi';


function addColor(rule, item, themeClass) {
	if (themeClass) {
		if (themes[themeClass].colors[item] === undefined) themes[themeClass].colors[item] = {
			color: '',
			backgroundcolor: ''
		};
		if (rule.style.backgroundColor != 'initial' && rule.style.backgroundColor != '') themes[themeClass].colors[item].backgroundcolor = rule.style.backgroundColor;
		if (rule.style.color != 'initial' && rule.style.color != '') themes[themeClass].colors[item].color = rule.style.color;
	} else {
		if (themes.CodeMirror[item] === undefined) themes.CodeMirror[item] = {
			color: '',
			backgroundColor: ''
		};
		if (rule.style.color != 'initial' && rule.style.color != '') themes.CodeMirror[item].color = rule.style.color;
		if (rule.style.backgroundColor != 'initial' && rule.style.backgroundColor != '') themes.CodeMirror[item].backgroundcolor = rule.style.backgroundColor;
	}
}
// oh what whicked webs we weave...
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
				})) { // If any of the class's had a theme name then do this....
					var matchPath = '';
					var ignoring = false;
					matches.splice(0, 1);
					var matchPaths = {};
					for (var i = 0, end = matches.length; i < end; i++) {
						for (var z = i; z <= end; z++) {
							if (z - i > 1) matchPaths[matches.slice(i, z).join(' ')] = true;
						}
					}
					//console.debug(matchPaths,matches)
					matches.forEach(function(item) {
						if (!ignoring) ignoring = ignoreClass[item] !== undefined;
						if (ignoring) return;
						matchPath += (matchPath.length !== 0 ? ' ' : '') + item;
						//console.debug(matchPath);
						if (colorClass[item] || codeMirrorColorClass[item] /*&& !colorClass[matchPath]*/ ) {
							if (item == '.cm-matchhighlight') {
								themes[themeClass].colors[".cm-matchhighlight"] = {
									color: rule.style.outlineColor
								};
							} else if (item == '.CodeMirror-secondarycursor' || item == '.CodeMirror-cursor') {
								if (rule.style.borderLeftColor !== '' && rule.style.borderLeftColor !== 'initial') themes[themeClass].colors[item] = {
									color: rule.style.borderLeftColor
								};
							} else if (item == '.CodeMirror-linenumber') {
								if (matches.indexOf(".CodeMirror-activeline") !== -1) themes[themeClass].colors[".CodeMirror-activeline .CodeMirror-linenumber"] = {
									color: rule.style.color,
									backgroundcolor: rule.style.backgroundColor
								};
								else {
									themes[themeClass].colors['.CodeMirror-linenumber'] = {
										color: rule.style.color,
										backgroundcolor: rule.style.backgroundColor
									}
								}
							} else
							if (item == '.CodeMirror') {
								if (rule.cssText.indexOf(themeClass + '.CodeMirror') != -1 || rule.cssText.indexOf('.CodeMirror' + themeClass) != -1) {
									//console.debug('cm',r)
									//themes[themeClass].colors[item] = selector + rule.cssText.substring(rule.cssText.indexOf('{') - 1, rule.cssText.lastIndexOf('}') + 1);
									addColor(rule, item, themeClass);
								}
							} else {
								addColor(rule, item, themeClass);
								// if (colorClass[item].selector) themes[themeClass].colors[item].selector = selector;
								// if (colorClass[item].selectors) themes[themeClass].colors[item].selectors = selectorsText;
							}
						}
					});
					var key, keys = Object.keys(matchPaths);
					if (!ignoring)
						for (var i = 0, end = keys.length; i < end; i++) {
							key = keys[i];
							if (colorClass[key] || codeMirrorColorClass[key]) {
								//console.debug('yeah', matchPath)
								item = key;
								addColor(rule, item, themeClass);


								/*if (typeof colorClass[item] == 'object') {
									var matchesObj = matches.$toHash();
								}
								if (colorClass[item].selector) themes[themeClass].colors[item].selector = selector;
								if (colorClass[item].selectors) themes[themeClass].colors[item].selectors = selectorsText;*/
							}
						}
						// console.debug('path ', matchPath)
						// console.debug('rule ', selector, '\n')
						// console.debug('  \n')
				} else matches.forEach(function(item) { // If none of the class's had a theme name then check for CodeMirror stuff
					if ((item == '.CodeMirror-secondarycursor' || item == '.CodeMirror-cursor')) {
						//console.debug('1', rule.style.cssText, matches)
						if (rule.style.borderLeftColor !== '' && rule.style.borderLeftColor !== 'initial') themes.CodeMirror[item] = {
							color: rule.style.borderLeftColor
						};
					} else if (item == '.cm-matchhighlight') {
						themes.CodeMirror[".cm-matchhighlight"] = {
							color: rule.style.outlineColor
						};
					} else if (item == '.CodeMirror-linenumber') {
						// && matches.indexOf('.CodeMirror-linenumber') != -1
						if (matches.indexOf(".CodeMirror-activeline") !== -1) themes.CodeMirror[".CodeMirror-activeline .CodeMirror-linenumber"] = {
							color: rule.style.color,
							backgroundcolor: rule.style.backgroundColor
						};
						else {
							themes.CodeMirror['.CodeMirror-linenumber'] = {
								color: rule.style.color,
								backgroundcolor: rule.style.backgroundColor
							}
						}
					} else if (codeMirrorColorClass[item]) {
						addColor(rule, item);
						//if(rule.style.color!='initial'&&rule.style.backgroundColor!='initial'&&rule.style.color!=''&&rule.style.backgroundColor!='')themes.CodeMirror[item].selector = selectorsText;
					}

				});
				var matchPaths = {};
				for (var i = 0, end = matches.length; i < end; i++) {
					for (var z = i; z <= end; z++) {
						if (z - i > 1) matchPaths[matches.slice(i, z).join(' ')] = true;
					}
				}
				// Check for CodeMirror more than one paths....
				var key, keys = Object.keys(matchPaths);

				for (var i = 0, end = keys.length; i < end; i++) {
					key = keys[i];
					if (codeMirrorColorClass[key]) {
						//console.debug('yeah', matchPath)
						item = key;
						if (!themes.CodeMirror[item]) addColor(rule, item);
					}
				}

			}
		});
	}
	if (themes.CodeMirror[".CodeMirror-activeline .CodeMirror-linenumber"].color == '') themes.CodeMirror[".CodeMirror-activeline .CodeMirror-linenumber"].color = themes.CodeMirror[".CodeMirror-linenumber"].color;
}


document.head.appendChild(styleNode);
// var keys = Object.keys(themes);
// var LESSVars={};
// for (var i=0,end=keys.length;i<end;i++){
// 	var theme =keys[i];
// 	if (theme!='CodeMirror'){
// 		var colors=themes[theme].colors;
// 		var zkeys=Object.keys(colors);
// 		for (var z=0,zend=zkeys.length;z<zend;z++){
// 			color=zkeys[z];
// 			if (LESSThemeMap[color]){
// 				if (LESSThemeMap[color].color!='')if(colors[color].color)LESSVars[LESSThemeMap[color].color]=colors[color].color; else LESSVars[LESSThemeMap[color].color]=defaults[color].color;

// 			}
// 		}
// 	}
// }