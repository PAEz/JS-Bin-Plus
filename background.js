// Updated to Event Pages.....oh what a pain
// http://developer.chrome.com/extensions/event_pages.html
// Makes a tiny delay on things when the page is inactive somtimes
// But sooooo worth it...cant stand extensions always using memory when their not doing anything
// The delay can be noticed on things like Context Menu / Wrap with.. when the Event Page has become inactive (really is tiny tho)
// This could prolly be avoided if I kept the Event page alive, I think this may be possible by using a setTimeout
// thingy that checks to see if the tab were on is JsBin and if it is keep doing the timeout, if its not then stop
// doing it and hopefully the timeout will keep the Event page alive.....try this out later
// chrome://extensions/ isnt always showing when the extension is inactive, check Chromes Task Manager instead

$getObjValue = function(obj, path, splitter) {
  var paths = splitter === undefined ? path.split('^') : path.split(splitter);
  var length = paths.length - 1;
  var i = 0;
  for (; i < length; i++) {
    if (obj[paths[i]] === undefined) return undefined;
    obj = obj[paths[i]];
  }
  return obj[paths[length]];
}

executeCommand = function(tab, command, details) {
  chrome.tabs.sendMessage(tab, {
    message: command,
    details: details,
    target: "injectedCode",
    source: "background"
  });
}


sendToInject = function(func, selectionText, panelsText) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + func + ')(' + JSON.stringify(selectionText) + ',' + JSON.stringify(panelsText) + ');';
  document.documentElement.appendChild(script); // run the script
  document.documentElement.removeChild(script); // clean up
}


chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.target == "background") {

    if (msg.message == 'JsBinReady') {
      chrome.pageAction.show(sender.tab.id);

    } else if (msg.message == 'sendTo') {
      if (msg.details.type == 'inject') { // right now theres only the inject type, but in the future there might be POST/GET/Whatever
        var send = $getObjValue(window, msg.details.sendToId);
        chrome.tabs.create({
          //url: search.prefix + encodeURIComponent(info.selectionText) + search.suffix,
          url: send.url
        }, function(tab) {
          chrome.tabs.executeScript(tab.id, {
            code: '(' + sendToInject + ')(' + send.func + ',' + JSON.stringify(msg.details.selection) + ', ' + JSON.stringify(msg.details.panels) + ');'
          });
        });
      }

    } else if (msg.message == 'updateContextMenu') {
      // Only update the context menu if its from the currently active tab and window
      if (sender.tab.active) chrome.windows.getLastFocused(null, function(window) {
        if (window.id == sender.tab.windowId) updateContextMenuFromContent(msg.details);
      });
    }
    //sendResponse({});
  }
});


var filters = {
  url: [{
    hostEquals: "jsbin.com"
  }]
};


onNavigate = function(details) {
  //chrome.pageAction.show(details.tabId);
  chrome.tabs.sendMessage(details.tabId, {
    message: "waitForJsBin",
    details: "",
    target: "contentScript",
    source: "background"
  });
  // the below use to be needed when I didnt do it the Event Page way
  // problem might crop up again (hasnt yet), so keeping it around.....

  // // without the setTimeout the page action icon would some times be ghosted and worse, invisible.  The timeout seems to fix that
  // window.setTimeout(function() {
  //   chrome.pageAction.show(tabId);
  // }, 200)

}


//chrome.webNavigation.onDOMContentLoaded.addListener(onNavigate, filters);
chrome.webNavigation.onHistoryStateUpdated.addListener(onNavigate, filters);


// Context Menu stuff
var wrappers = [{
  title: 'Quotes - Single',
  start: "'",
  end: "'"
}, {
  title: 'Quotes - Double',
  start: '"',
  end: '"'
}, {
  title: 'Brackets - Normal',
  start: '(',
  end: ')'
}, {
  title: 'Brackets - Curly',
  start: '{',
  end: '}'
}, {
  title: 'Brackets - Square',
  start: '[',
  end: ']'
}];


var onlineSearch = [{
  title: "Google",
  prefix: "https://www.google.com/search?q=",
  suffix: ""
}, {
  title: "MDN",
  prefix: "https://developer.mozilla.org/en-US/search?q=",
  suffix: ""
}, {
  title: "StackOverflow",
  prefix: "http://stackoverflow.com/search?q=",
  suffix: ""
}, {
  title: "StackOverflow : Javascript",
  prefix: "http://stackoverflow.com/search?q=%5Bjavascript%5D",
  suffix: ""
}, {
  title: "StackOverflow : Jquery",
  prefix: "http://stackoverflow.com/search?q=%5Bjquery%5D",
  suffix: ""
}, {
  title: "StackOverflow : HTML",
  prefix: "http://stackoverflow.com/search?q=%5Bhtml%5D",
  suffix: ""
}, {
  title: "StackOverflow : CSS",
  prefix: "http://stackoverflow.com/search?q=%5Bcss%5D",
  suffix: ""
}, {
  title: "QuirksMode",
  prefix: "https://www.google.com/search?q=site%3Awww.quirksmode.org+",
  suffix: ""
}, {
  title: "Can I Use...",
  prefix: "http://caniuse.com/#search=",
  suffix: ""
}, {
  title: "Big JS-Compatibility-Table",
  prefix: "http://compatibility.shwups-cms.ch/en/home/?search=",
  suffix: ""
}];

var sendSelectionTo = [{
  title: "JSON Editor Online",
  url: "http://jsoneditoronline.org/",
  selection: true,
  type: 'inject',
  //panels:{javascript:'',html:'',css:''},  // Not used here, but the sendTo command can get the code from any panel aswell
  func: function(selectionsCode, panelsCode) {
    if (window.codeEditor) {
      codeEditor.setText(selectionsCode);
    } else {
      setTimeout(arguments.callee.bind(this, selectionsCode, panelsCode), 200);
    }
  }

}];

var cssColorConverter = [{
  title: "HEX",
  func: 'toHexString'
}, {
  title: "RGB",
  func: 'toRgbString'
}, {
  title: "RGB Percentage",
  func: 'toPercentageRgbString'
}, {
  title: "RGBA",
  func: 'toRgbaString'
}, {
  title: "RGBA Percentage",
  func: 'toPercentageRgbaString'
}, {
  title: "HSL",
  func: 'toHslString'
}, {
  title: "HSLA",
  func: 'toHslaString'
}]

// This works on the hope that they will stay in the order their supplied
// It is not standard for object items to always be in the order they where supplied according to JS specs I think (definately true for JSON, not so sure on Object.keys)
// But in Chrome they have been everytime so far, if that fails go to the object array way like the manifest in Slick Settings
var contextMenu = {
  "Undo": {
    Menu: {
      enabled: true,
      contexts: ['selection', 'editable'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      onclick: function(info, tab) {
        executeCommand(tab.id, "undo");
      }
    }
  },
  "Redo": {
    Menu: {
      enabled: true,
      contexts: ['selection', 'editable'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      onclick: function(info, tab) {
        executeCommand(tab.id, "redo");
      }
    }
  },
  "-": {
    Menu: {
      type: "separator",
      documentUrlPatterns: ["http://jsbin.com/*"],
      contexts: ['selection', 'editable']
    }
  },
  "View": {
    Menu: {
      documentUrlPatterns: ["http://jsbin.com/*"],
      contexts: ['selection', 'editable'],
    },
    "Debug": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        type: "checkbox",
        checked: true,
        onclick: function(info, tab) {
          executeCommand(tab.id, "toggleDebug");
        }
      }
    },
    "Line Numbers": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        type: "checkbox",
        checked: true,
        onclick: function(info, tab) {
          executeCommand(tab.id, "toggleEditorsSetting", "lineNumbers");
          // testy, testy...
          // contextMenu.View['Line Numbers'].Menu.title = "Line Numbers - Title Changed";
          // contextMenu.View['Line Numbers'].Menu.update();
          // ...or...
          // this.title = "Line Numbers - Title Changed";
          // this.update();
        }
      }
    },
    "Line Wrapping": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        type: "checkbox",
        checked: true,
        onclick: function(info, tab) {
          executeCommand(tab.id, "toggleEditorsSetting", "lineWrapping");
        }
      }
    }
  },
  "--": {
    Menu: {
      type: "separator",
      documentUrlPatterns: ["http://jsbin.com/*"],
      contexts: ['selection', 'editable']
    }
  },
  "Beautify": {
    Menu: {
      contexts: ['selection', 'editable'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      onclick: function(info, tab) {
        executeCommand(tab.id, "beautify", "");
      }
    }
  },
  "JS Unpackers": {
    Menu: {
      documentUrlPatterns: ["http://jsbin.com/*"],
      contexts: ['selection', 'editable'],
    },
    "URL Encoded (Bookmarklet)": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "unpackers", "Urlencoded");
        }
      }
    },
    "JavascriptObfuscator": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "unpackers", "JavascriptObfuscator");
        }
      }
    },
    "p.a.c.k.e.r": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "unpackers", "P_A_C_K_E_R");
        }
      }
    },
    "MyObfuscate": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "unpackers", "MyObfuscate");
        }
      }
    },
  },
  "Comment / Uncomment": {
    Menu: {
      contexts: ['selection', 'editable'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      onclick: function(info, tab) {
        executeCommand(tab.id, "comment", "");
      }
    }
  },
  "Lines": {
    Menu: {
      documentUrlPatterns: ["http://jsbin.com/*"],
      contexts: ['selection'],
    },
    "Remove Line Numbers": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "removeLineNumbers", "");
        }
      }
    },
    "Toggle \\ At End Of Line": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "endLinesSlash", "");
        }
      }
    },
    "Convert Array Elements To Lines": {
      Menu: {
        contexts: ['selection'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "arrayToLines", "");
        }
      }
    },
    "Convert Lines To Array Elements": {
      Menu: {
        contexts: ['selection', 'editable'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "linesToArray", "\"");
        }
      }
    },
    "Merge Lines": {
      Menu: {
        contexts: ['selection'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "collapseLines", "");
        }
      }
    },
    "Sort Lines": {
      Menu: {
        contexts: ['selection'],
        documentUrlPatterns: ["http://jsbin.com/*"],
        onclick: function(info, tab) {
          executeCommand(tab.id, "sortLines", "");
        }
      }
    }
  },
  "Wrap with...": {
    Menu: {
      contexts: ['selection'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      callback: function(parentId) {
        for (var i in wrappers) {
          var id = chrome.contextMenus.create({
            title: wrappers[i].title,
            parentId: parentId,
            id: 'wrappers^' + i,
            contexts: ['selection'],
            "documentUrlPatterns": ["http://jsbin.com/*"]
          });
        }
      }
    }
  },
  "Search Online...": {
    Menu: {
      contexts: ['selection'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      callback: function(parentId) {
        for (var i in onlineSearch) {
          var id = chrome.contextMenus.create({
            title: onlineSearch[i].title,
            parentId: parentId,
            id: 'onlineSearch^' + i,
            contexts: ['selection'],
            "documentUrlPatterns": ["http://jsbin.com/*"]
          });
        }
      }
    }
  },
  "Send Selection To...": {
    Menu: {
      contexts: ['selection'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      callback: function(parentId) {
        for (var i in sendSelectionTo) {
          var id = chrome.contextMenus.create({
            title: sendSelectionTo[i].title,
            parentId: parentId,
            id: 'sendSelectionTo^' + i,
            contexts: ['selection'],
            "documentUrlPatterns": ["http://jsbin.com/*"]
          });
        }
      }
    }
  },
  "Convert CSS Color": {
    Menu: {
      contexts: ['selection', 'editable'],
      documentUrlPatterns: ["http://jsbin.com/*"],
      callback: function(parentId) {
        for (var i in cssColorConverter) {
          var id = chrome.contextMenus.create({
            title: cssColorConverter[i].title,
            parentId: parentId,
            id: 'cssColorConverter^' + i,
            contexts: ['selection', 'editable'],
            "documentUrlPatterns": ["http://jsbin.com/*"]
          });
        }
      }
    }
  }
}


cloneOptions = function(obj, to, filter) {
  var clone = to || {};
  var keys = Object.keys(obj);
  var key;
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    if (!filter || (filter && filter[key]))
      if (Array.isArray(obj[key])) {
        clone[key] = obj[key].slice();
      } else {
        clone[key] = obj[key];
      }
  }
  return clone;
}


createContextMenu = function(menu, parentId, prefix) {
  var allowedProperties = {
    type: true,
    id: true,
    title: true,
    checked: true,
    contexts: true,
    //    onclick:true,  // Not for Event Pages
    parentId: true,
    documentUrlPatterns: true,
    targetUrlPatterns: true,
    enabled: true
  }
  var keys = Object.keys(menu),
    key;
  var options = {};
  for (var i = 0, end = keys.length; i < end; i++) {
    key = keys[i];
    if (menu[key] instanceof Object && menu[key].Menu !== undefined) {
      if (parentId !== '' && parentId !== undefined) {
        menu[key].Menu.parentId = parentId;
        menu[key].Menu.id = parentId + '^' + key;
      } else {
        menu[key].Menu.id = prefix ? prefix + '^' + key : key;
      }

      menu[key].Menu.title = key;
      menu[key].Menu.update = updateContextMenu;

      options = cloneOptions(menu[key].Menu, {}, allowedProperties);
      chrome.contextMenus.create(options);
      if (menu[key].Menu.callback !== undefined) {
        menu[key].Menu.callback(menu[key].Menu.id);
      }
      createContextMenu(menu[key], menu[key].Menu.id /*+ key*/ );
    }
  }
}


updateContextMenu = function(move) {
  var allowedProperties = {
    type: true,
    //id: true,  // Not for update
    title: true,
    checked: true,
    contexts: true,
    //    onclick:true,  // Not for Event Pages
    parentId: move ? true : false, // Sending this in an update will cause the old item to be removed and readded to its parent which will cause the item to appear at the bottom of its parents items
    documentUrlPatterns: true,
    targetUrlPatterns: true,
    enabled: true
  }
  var options = cloneOptions($getObjValue(window, this.id + '^Menu'), {}, allowedProperties);
  chrome.contextMenus.update(this.id, options);
}

updateContextMenuFromContent = function(details) {
  var menus = Object.keys(details);
  for (var i = 0, end = menus.length; i < end; i++) {
    var menuItem = $getObjValue(contextMenu, menus[i] + '^Menu');
    var keys = Object.keys(details[menus[i]]);
    for (var k = 0, kend = keys.length; k < kend; k++) {
      menuItem[keys[k]] = details[menus[i]][keys[k]];
    }
    menuItem.update();
  }
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var root = info.menuItemId.split('^')[0];

  if (root == 'contextMenu') {
    $getObjValue(window, info.menuItemId).Menu.onclick(info, tab);

  } else if (root == 'wrappers') {
    var value = $getObjValue(window, info.menuItemId);
    executeCommand(tab.id, "wrapWith", value);

  } else if (root == 'onlineSearch') {
    var search = $getObjValue(window, info.menuItemId);
    chrome.tabs.create({
      url: search.prefix + encodeURIComponent(info.selectionText) + search.suffix,
      openerTabId: tab.id
    });

  } else if (root == 'sendSelectionTo') {
    var send = $getObjValue(window, info.menuItemId);
    executeCommand(tab.id, 'sendTo', {
      panels: send.panels,
      selection: send.selection,
      type: send.type,
      sendToId: info.menuItemId
    });

  } else if (root == 'cssColorConverter') {
    var value = $getObjValue(window, info.menuItemId);
    executeCommand(tab.id, "cssColorConverter", value);
  }
});


init = function(details) {
  if (!details || details.reason == 'install' || details.reason == 'update') createContextMenu(contextMenu, undefined, 'contextMenu');
}
chrome.runtime.onStartup.addListener(init);
chrome.runtime.onInstalled.addListener(init);


// checkContextMenu = function(tabId) {
//   var jsbinurl = new RegExp("^http://jsbin.com/");
//   chrome.tabs.get(tabId, function(tab) {
//     if (tab.active && jsbinurl.test(tab.url)) {
//       console.debug('update', tab);
//       chrome.windows.getLastFocused({
//         populate: true
//       }, function(window) {
//         console.debug(window, tab);
//       })
//     }
//   });
// }

// // Do this check in the content script...can be a little faster than waiting for status=complete then
// chrome.tabs.onUpdated.addListener(function(tabId, info) {
//   if (info.status == 'complete') chrome.tabs.get(tabId, function(tab) {
//       if (tab.active && tab.status == 'complete') {
//         console.debug('update', tab);
//       }
//     });
// });

chrome.tabs.onActivated.addListener(function(info) {
  chrome.tabs.get(info.tabId, function(tab) {
    var jsbinurl = new RegExp("^http://jsbin.com/");
    if (tab.status == 'complete' && jsbinurl.test(tab.url)) {
      chrome.windows.getLastFocused(null, function(window) {
        if (window.id == tab.windowId) executeCommand(tab.id, "updateContextMenu");
      });
    }
  });
});