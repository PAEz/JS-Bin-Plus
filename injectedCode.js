_PAEz = {
  hijacks: {},
  panels: {
    'html': true,
    'css': true,
    'javascript': true
  },
  defaults: {
    editor: { // Codemirror addons that I add
      autoCloseBrackets: false
    },
    beautify: {
      javascript: {
        indent_size: 4,
        indent_char: ' ',
        preserve_newlines: true,
        max_preserve_newlines: 0,
        jslint_happy: false,
        space_before_conditional: true,
        unescape_strings: false,
        wrap_line_length: 0,
        brace_style: "collapse",
        keep_array_indentation: false,
        break_chained_methods: false,
        space_in_paren: false,
        e4x: false
      },
      html: {
        indent_size: 4,
        indent_char: ' ',
        max_char: 250,
        brace_style: 'collapse',
        indent_scripts: 'normal',
        unformatted: ['a', 'span', 'bdo', 'em', 'strong', 'dfn', 'code', 'samp', 'kbd', 'var', 'cite', 'abbr', 'acronym', 'q', 'sub', 'sup', 'tt', 'i', 'b', 'big', 'small', 'u', 's', 'strike', 'font', 'ins', 'del', 'pre', 'address', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      },
      css: {
        indent_size: 4,
        indent_char: ' '
      }
    }
  },
  _unpackers: {}
}


window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window) return;
  if (event.data.target == "injectedCode") {
    if (_PAEz[event.data.message]) {
      _PAEz[event.data.message](event.data);
    }
  }
}, false);


_PAEz.respond = function(message) {
  message.target = message.source;
  message.source = "injectedCode";
  window.postMessage(message, "*");
}


_PAEz.backgroundExec = function(command, details) {
  var message = {};
  message.target = "background";
  message.source = "injectedCode";
  message.details = details;
  message.message = command;
  window.postMessage(message, "*");
}


_PAEz.updateContextMenu = function(message) {
  message.details = {
    "View^Debug": {
      "checked": jsbin.settings.debug ? true : false
    },
    "View^Line Numbers": {
      "checked": jsbin.panels.panels.javascript.editor.getOption("lineNumbers")
    },
    "View^Line Wrapping": {
      "checked": jsbin.panels.panels.javascript.editor.getOption("lineWrapping")
    }
  };
  _PAEz.respond(message);
}

// Were only hooking the javascript panels editor
_PAEz.codemirrorSetOptionHook = function(panel, option, value) {
  var item;
  var paths = {
    "lineNumbers": "View^Line Numbers",
    "lineWrapping": "View^Line Wrapping"
  }

  // first check to see if its a theme change
  if (option == 'theme') {
    var theme = editors[panel].editor.getOption('theme');
    document.documentElement.classList.remove('cm-s-' + theme);
    document.documentElement.classList.add('cm-s-' + value);
    //editors[panel].editor.setOptionOriginal(option, value);
  }
  // Context Menu Updates
  // Only update the context menu on one panel as all panels have the same value for the things were interested in
  if (panel == "javascript" && paths[option]) {
    //var result = editors[panel].editor.setOptionOriginal(option, value);
    var menu = {};
    menu[paths[option]] = {
      checked: editors[panel].editor.getOption(option) // get the option incase they inputted an incorrect value
    };
    _PAEz.backgroundExec("updateContextMenu", menu);
    
  }
     var result = editors[panel].editor.setOptionOriginal(option, value);
  return result;
}


_PAEz.initContextMenuHooks = function() {
  _PAEz.hijacks.debugView = jsbin.settings.debug ? true : false;
  Object.defineProperties(jsbin.settings, {
    "debug": {
      set: function(x) {
        _PAEz.hijacks.debugView = x;
        _PAEz.backgroundExec("updateContextMenu", {
          "View^Debug": {
            checked: x
          }
        });
      },
      get: function(x) {
        return _PAEz.hijacks.debugView;
      }
    }
  });
  // _PAEz.panels.$forEach(function(key) {
  //   editors[key].editor.setOptionOriginal = editors[key].editor.setOption;
  //   editors[key].editor.setOption = _PAEz.codemirrorSetOptionHook.bind(_PAEz, key);
  // })
  editors['javascript'].editor.setOptionOriginal = editors['javascript'].editor.setOption;
  editors['javascript'].editor.setOption = _PAEz.codemirrorSetOptionHook.bind(_PAEz, 'javascript');
}



_PAEz.getCode = function(message) {
  var panel = message.details == '' ? window.jsbin.panels.focused.id : message.details;
  if (this.panels[panel]) {

    message.details = jsbin.panels.panels[panel].editor.getCode();
    this.respond(message);
  }
}


_PAEz.sendTo = function(message) {
  var focused = window.jsbin.panels.focused.id;
  if (message.details.selection && this.panels[focused]) {
    var editor = jsbin.panels.panels[focused].editor;
    if (editor.somethingSelected()) {
      message.details.selection = editor.getSelection();
    }
  }
  if (message.details.panels) {
    var panels = message.details.panels;
    var keys = Object.keys(panels);
    for (var i = 0, end = keys.length; i < end; i++) {
      panels[keys[i]] = jsbin.panels.panels[keys[i]].editor.getCode();
    }
  }
  this.respond(message);
}


// This is to make the cursor in codemirror to keep blinking when the page action pops up
// This could be good for when we have some insert tool, so they know for sure where its going to be inserted
_PAEz.blink = function() {
  var focused = window.jsbin.panels.focused.id;
  if (this.panels[focused]) {
    var editor = jsbin.panels.panels[focused].editor;
    window.setTimeout(function() {
      editor.focus();
    }, 150)
  }
}


_PAEz.toggleDebug = function() {
  jsbin.settings.debug ? jsbin.settings.debug = false : jsbin.settings.debug = true;
  jsbin.panels.panels.live.render();
}


_PAEz.toggleEditorsSetting = function(message) {
  var setting = message.details;

  if (jsbin.settings.editor[setting] === undefined) jsbin.settings.editor[setting] = jsbin.panels.panels.css.editor.getOption(setting);

  var value = jsbin.settings.editor[setting] ? false : true;

  for (var panel in this.panels) {
    var editor = jsbin.panels.panels[panel].editor;
    editor.setOption(setting, value);
  }

  jsbin.settings.editor[setting] = value;
}


// _PAEz.updateEditorsSettings = function(message) {
//   var settings = message.details;
//   var panel = window.jsbin.panels.focused.id;
//   for (var key in settings) {
//     for (var panel in this.panels) {
//       var editor = jsbin.panels.panels[panel].editor;
//       editor.setOption(key, settings[key]);
//     }
//     jsbin.settings.editor[key] = settings[key];
//   }
// }


_PAEz.updatePAEzEditorsSettings = function(message) {
  var settings = message.details;
  var panel = window.jsbin.panels.focused.id;
  for (var key in settings) {
    for (var panel in this.panels) {
      var editor = jsbin.panels.panels[panel].editor;
      editor.setOption(key, settings[key]);
    }
    jsbin.settings.PAEz.editor[key] = settings[key];
  }
}


_PAEz.updateSetting = function(message) {
  var value = message.details.value;
  var paths = message.details.path.split('.');
  var key = paths[paths.length - 1];
  if (paths[0] == 'editor' || (paths[0] == 'PAEz' && paths[1] == 'editor')) {
    var settingsGroup = paths[0] == 'editor' ? jsbin.settings.editor : jsbin.settings.PAEz.editor;
    for (var panel in this.panels) {
      //console.debug(panel)
      jsbin.panels.panels[panel].editor.setOption(key, value);
    }
    settingsGroup[key] = value;
  } else if (paths[0] == 'PAEz' && paths[1] == 'beautify') {
    jsbin.settings.PAEz.beautify[paths[2]][key] = value;
  }
  if (message.details.reload) window.location.href = window.location.href;
}

_PAEz.getSettings = function(message) {
  var settings = message.details;
  var editor = jsbin.panels.panels.javascript.editor;

  if (settings.editor) settings.editor.$forEach(function(key) {
      settings.editor[key] = editor.getOption(key);
    });

  if (settings.PAEz) {
    if (settings.PAEz.editor) settings.PAEz.editor.$forEach(function(key) {
        settings.PAEz.editor[key] = editor.getOption(key);
      });
    if (settings.PAEz.beautify) settings.PAEz.beautify = jsbin.settings.PAEz.beautify;
  }

  message.details = settings;

  this.respond(message);
}

_PAEz.undo = function() {
  var panel = window.jsbin.panels.focused.id;

  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    editor.undo();
  }
}


_PAEz.redo = function() {

  var panel = window.jsbin.panels.focused.id;

  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    editor.redo();
  }
}


_PAEz.wrapWith = function(message) {
  var details = message.details;
  var start = details.start;
  var end = details.end;
  var panel = window.jsbin.panels.focused.id;

  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    if (editor.somethingSelected()) {
      var selection = editor.getSelection();
      editor.replaceSelection(start + selection + end);
    } else {
      return CodeMirror.Pass // assume its from a key map and let CodeMirror process it...pretty safe assumption considering its normaly called from the context menu which is only visible when somethings selected
    }
  }
}


_PAEz.insertText = function(message) {
  var text = message.details;
  var panel = window.jsbin.panels.focused.id;

  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    if (editor.somethingSelected()) {
      editor.replaceSelection(text);
    } else {
      editor.replaceRange(text, editor.getCursor());
    }
  }
}


_PAEz.removeLineNumbers = function(message) {
  var panel = window.jsbin.panels.focused.id;
  var editor = jsbin.panels.panels[panel].editor;
  editor.operation(function() {
    if (_PAEz.panels[panel] && editor.somethingSelected()) {
      var start = editor.getCursor('start').line;
      var end = editor.getCursor('end').line + 1;
      var text = '';
      for (var i = start; i < end; i++) {
        text = editor.getLine(i);
        text = text.replace(/^[0-9]*/,'');
        editor.setLine(i,text);
      }
    }
  });
}


_PAEz.endLinesSlash = function(message) {
  var details = message.details;
  var panel = window.jsbin.panels.focused.id;

  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    editor.operation(function() {
      var start = editor.getCursor('start').line;
      var end = editor.getCursor('end').line + 1;
      for (var i = start; i < end; i++) {

        var text = editor.getLine(i);
        if (text[text.length - 1] == '\\') {
          text = text.substring(0, text.length - 1);
          editor.setLine(i, text);
        } else {
          editor.setLine(i, text + '\\');
        }
      }
    });
  }
}


_PAEz.linesToArray = function(message) {
  var quote = message.details;
  var panel = window.jsbin.panels.focused.id;

  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    editor.operation(function() {
      var start = editor.getCursor('start').line;
      var end = editor.getCursor('end').line + 1;
      for (var i = start; i < end - 1; i++) {
        var text = editor.getLine(i);
        editor.setLine(i, quote + text + quote + ',');
      }
      text = editor.getLine(i);
      editor.setLine(i, quote + text + quote);
    });
  }
}


_PAEz.arrayToLines = function(message) {
  var panel = window.jsbin.panels.focused.id;
  var editor = jsbin.panels.panels[panel].editor;
  if (this.panels[panel] && editor.somethingSelected()) {

    editor.operation(function() {
      try {
        var array = JSON.parse('[' + editor.getSelection() + ']');
      } catch (e) {
        console.debug('Not an array or not JSONable')
        return;
      }
      if (Array.isArray(array)) {
        var result = '\n';
        for (var i = 0, end = array.length; i < end; i++) {
          result += JSON.stringify(array[i]) + '\n';
        }
        editor.replaceSelection(result);
      }
    });
  }
}


_PAEz.collapseLines = function(message) {
  var panel = window.jsbin.panels.focused.id;
  var editor = jsbin.panels.panels[panel].editor;
  editor.operation(function() {
    if (_PAEz.panels[panel] && editor.somethingSelected()) {
      var start = editor.getCursor('start').line;
      var end = editor.getCursor('end').line + 1;
      var text = '';
      for (var i = start; i < end; i++) {
        text += editor.getLine(i);
      }
      editor.replaceSelection('');
      // for (var i = start+1; i < end+1; i++) {
      //   editor.removeLine(i);
      // }
      editor.setLine(start, text);
    }
  });
}


_PAEz.sortLines = function(message) {
  var panel = window.jsbin.panels.focused.id;
  var editor = jsbin.panels.panels[panel].editor;
  var start = editor.getCursor('start').line;
  var end = editor.getCursor('end').line + 1;
  editor.operation(function() {
    if (_PAEz.panels[panel] && editor.somethingSelected()) {

      var lines = [];
      var text = '';
      for (var i = start; i < end; i++) {
        lines.push(editor.getLine(i));
      }
      lines.$naturalSort();
      for (var i = start, z = 0; i < end; i++) {
        editor.setLine(i, lines[z++]);
      }
      editor.setSelection({
        line: start,
        ch: 0
      }, {
        line: end,
        ch: editor.getLine(end - 1).length
      })
    }
  });
}


_PAEz.beautify = function() {
  var tabs = {
    'html': html_beautify,
    'css': css_beautify,
    'javascript': js_beautify
  };

  var panel = window.jsbin.panels.focused.id;

  var options = {};
 
  if (tabs[panel]) {
     if (panel == 'html') options.$merge(jsbin.settings.PAEz.beautify['javascript']).$merge(jsbin.settings.PAEz.beautify['css']).$merge(jsbin.settings.PAEz.beautify[panel]);
  else options.$merge(jsbin.settings.PAEz.beautify[panel]);

    var beautifier = tabs[panel];
    var editor = jsbin.panels.panels[panel].editor;
    if (editor.somethingSelected()) {
      var newCode = panel == 'html' ? beautifier(editor.getSelection(), options, tabs['javascript'], tabs['css']) : beautifier(editor.getSelection(), options);
      var pos = editor.getCursor();
      editor.replaceSelection(newCode);
      editor.setCursor(pos);
    } else {
      var newCode = panel == 'html' ? beautifier(editor.getValue(), options, tabs['javascript'], tabs['css']) : beautifier(editor.getValue(), options);
      var pos = editor.getCursor();
      editor.setValue(newCode);
      editor.setCursor(pos);
    }
  }
}


_PAEz.unpackers = function(message) {
  var unpacker = this._unpackers[message.details];
  var editor = window.jsbin.panels.panels.javascript.editor;

  if (editor.somethingSelected()) {
    var selection = editor.getSelection();
    editor.replaceSelection(unpacker.unpack(selection));
  } else {
    editor.setValue(unpacker.unpack(editor.getValue()));
  }
}


_PAEz.comment = function() {
  var panel = window.jsbin.panels.focused.id;
  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    editor.triggerOnKeyDown({
      type: "keydown",
      keyCode: 191,
      ctrlKey: true,
      preventDefault: function() {},
      stopPropagation: function() {}
    });
  }
}


_PAEz.semicolonEnter = function(message) {
  var panel = window.jsbin.panels.focused.id;
  if (_PAEz.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    var pos = editor.getCursor('end');
    editor.setSelection(pos);
    var line = editor.getLine(pos.line);
    var length = line.length;
    if (line[length - 1] != ';') {
      editor.setLine(pos.line, line + ';');
      length += 1;
    }
    pos.ch = length;
    editor.setCursor(pos);
    editor.triggerOnKeyDown({
      type: "keydown",
      keyCode: 13,
      preventDefault: function() {},
      stopPropagation: function() {}
    });
  }
}


_PAEz.addSemicolon = function(message) {
  var panel = window.jsbin.panels.focused.id;
  if (_PAEz.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    var pos = editor.getCursor('end');
    var line = editor.getLine(pos.line);
    var length = line.length;
    if (line[length - 1] != ';') {
      editor.setLine(pos.line, line + ';');
      pos.ch = length;
    } else pos.ch = length - 1;
    editor.setCursor(pos);
  }
}


_PAEz.cssHexChanger = function(modifier, a) {
  // http://jsbin.com/isirep/16/edit
  var cursor = a.getCursor();
  var str = a.getLine(cursor.line);
  var pos = cursor.ch;
  var strReplaceAt = function(str, index, replacement) {
    //if (index > str.length - 1) return str;
    return str.substr(0, index) + replacement + str.substr(replacement.length + index);
  }
  var allowed = {
    "#": true,
    "a": true,
    "b": true,
    "c": true,
    "d": true,
    "e": true,
    "f": true,
    "A": true,
    "B": true,
    "C": true,
    "D": true,
    "E": true,
    "F": true,
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true,
    "8": true,
    "9": true
  };

  if (allowed[str[pos]] || allowed[str[pos - 1]]) {
    var currentPos = allowed[str[pos - 1]] ? pos - 1 : pos;
    var stop = currentPos - 8;
    while (allowed[str[currentPos]] && currentPos != stop) {
      if (str[currentPos] == '#') {
        allowed['#'] = false;
        var start = currentPos;
        break;
      }
      currentPos--;
    }

    currentPos = start == pos ? pos + 1 : pos;
    stop = currentPos + 8;
    while (allowed[str[currentPos]] && currentPos != stop) {
      if (str[currentPos] == '#') {
        allowed['#'] = false;
        var start = currentPos;
      }
      currentPos++;
    }
    //var end = currentPos;
    if (start != undefined) {

      var numLength = currentPos - start;

      if (numLength == 4 || numLength == 7) {
        if (pos == currentPos) pos = pos - 1;
        var diff = pos - start;
        if (numLength == 7 && diff != 0 && diff % 2 == 0) diff--;
        //var componentStart = start + diff;
        //var numbersString = str.substring(start, currentPos);
        numLength = numLength == 4 ? 1 : 2;
        var clamp = numLength == 1 ? 15 : 255;
        if (start == pos) {
          pos = start + diff + 1;
          var result = '';
          for (var i = 0; i < 3; i++) {
            var color = parseInt(str.substr(pos, numLength), 16);
            color = color + modifier;
            if (color > clamp) color = clamp;
            else if (color < 0) color = 0;
            color = color.toString(16);
            if (numLength != color.length) color = '0' + color;
            result += color;
            pos += numLength;
          }
          a.setLine(cursor.line, strReplaceAt(str, start + 1, result));
          a.setCursor(cursor);
          return
        } else {
          var color = parseInt(str.substr(start + diff, numLength), 16);
          color = color + modifier;
          if (color > clamp) color = clamp;
          else if (color < 0) color = 0;
          color = color.toString(16);
          if (numLength != color.length) color = '0' + color;
          a.setLine(cursor.line, strReplaceAt(str, start + diff, color));
          a.setCursor(cursor);
          return
        }
      }
    }
    return modifier == 1 ? _PAEz.hijacks['Ctrl-Up'](a) : _PAEz.hijacks['Ctrl-Down'](a);
  }
}


_PAEz.initCssHexChanger = function() {
  var up = CodeMirror.keyMap['default']['Ctrl-Up'];
  var down = CodeMirror.keyMap['default']['Ctrl-Down'];
  _PAEz.hijacks['Ctrl-Up'] = CodeMirror.commands[up];
  _PAEz.hijacks['Ctrl-Down'] = CodeMirror.commands[down];
  CodeMirror.commands[up] = _PAEz.cssHexChanger.bind(_PAEz, 1);
  CodeMirror.commands[down] = _PAEz.cssHexChanger.bind(_PAEz, -1);
}

_PAEz.getCssColorAt = function(str, pos) {
  var findColors = /#(?:[0-9a-f]{3,8})|(?:rgb|rgba|hsl|hsla)[(][^)]*[)]/gi;
  var execution, start = 0,
    str2;
  if (str.length > 101) {
    var end = pos + 50;
    if (pos > 50) start = pos - 50;
    str2 = str.substring(start, end);
    //console.log('"'+str2+'"',str2.length,start,end)
  } else str2 = str;
  while (execution = findColors.exec(str2)) {
    var index = execution.index + start;
    if (index > pos) return null;
    var length = execution[0].length;
    if (pos >= index && pos < index + length) {
      if (str[index] == '#' && length != 4 && length != 7) return null;
      return {
        index: index,
        length: length,
        str: str.substr(index, length)
      };
    }
  }
  return null;
};

_PAEz.cssColorConverter = function(message) { //#(?:[0-9a-fA-F]{3}){1,2}|(?:rgb[(]|rgba[(]|hsl[(]|hsla[(])[^)]*[)]
  var strReplaceOver = function(str, replacement, index, length) {
    //if (index > str.length - 1) return str;
    return length > 0 ? str.substr(0, index) + replacement + str.substr(length + index) : str.substr(0, index) + replacement + str.substr(replacement.length + index);
  }

  var details = message.details;
  var start = details.start;
  var end = details.end;
  var panel = window.jsbin.panels.focused.id;

  if (this.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    if (editor.somethingSelected()) {
      var selection = editor.getSelection();
      var c = tinycolor(selection);
      if (c.ok) editor.replaceSelection(c[message.details.func]());
    } else {
      var cursor = editor.getCursor();
      var str = editor.getLine(cursor.line);
      var pos = _PAEz.getCssColorAt(str, cursor.ch);
      if (pos) {
        var c = tinycolor(str.substr(pos.index, pos.length));
        if (c.ok) {
          editor.setLine(cursor.line, strReplaceOver(str, c[message.details.func](), pos.index, pos.length));
          editor.setCursor(cursor);
        }
      } else return
    }
  }
}


_PAEz.colorPicker = {};

_PAEz.colorPicker.reposition = function() {
  var container = _PAEz.colorPicker.container;
  var panel = jsbin.panels.panels[_PAEz.colorPicker.colorStr.panel];
  //var editor = panel.editor;
  var pos = panel.editor.cursorCoords({
    line: _PAEz.colorPicker.colorStr.line,
    ch: _PAEz.colorPicker.colorStr.index
  });
  //var container = $(_PAEz.colorPicker.element).spectrum('container')[0];
  container.querySelector('button').focus(); // This is just here to make the editor not be in focus, how else can I do it?
  container.$set({
    styles: {
      left: Math.ceil(pos.left) + 'px',
      top: Math.ceil(panel.$panel[0].offsetHeight - pos.top >= pos.top ? pos.bottom : pos.top - 1 - container.offsetHeight) + 'px',
    }
  });
}


_PAEz.colorPicker.init = function() {
  var cp = _PAEz.colorPicker.element = $createElement('div', {
    id: 'colorpicker'
  });
  document.documentElement.$append(cp);
  var spectrum = $(cp).spectrum({
    showAlpha: true,
    clickoutFiresChange: true,
    showInitial: true,
    reflow: function(container) {
      container = container[0];
      if (!container.classList.contains('sp-hidden')) {
        _PAEz.colorPicker.reposition();
      }
    },
    show: function(tinycolor) {
      _PAEz.colorPicker.showing = true;
      _PAEz.colorPicker.reposition();
    },
    hide: function(color, type) {
      _PAEz.colorPicker.showing = false;
      if (type == 'cancel' || type == 'choose') _PAEz.blink();
      if (type == 'choose' || type == 'clickout') _PAEz.colorPicker.set(color);
      else if (type == 'cancel') _PAEz.colorPicker.restore();
    },
    move: _PAEz.colorPicker.change
  });

  _PAEz.colorPicker.container = $(spectrum).spectrum('container')[0];

  document.addEventListener('mouseup', function(e) {
    if (e && e.type == "mouseup" && e.which == 2) {
      _PAEz.showColorPicker(e);
    }
  });
  // I would have liked to just have blocked the right mouse button
  // but fucked if I know how
  document.addEventListener('mousedown', function(e) {
    if (e && e.type == "mousedown" && e.which == 3 && _PAEz.colorPicker.showing == true) {
      $(_PAEz.colorPicker.element).spectrum('hide');
    }
  });
}


_PAEz.colorPicker.getColor = function(color) {
  return color.toString((color.alpha !== 1 && _PAEz.colorPicker.colorStr.format == 'hex') ?
    'rgb' :
    _PAEz.colorPicker.colorStr.format)
}


_PAEz.colorPicker.change = function(color) {
  var editor = jsbin.panels.panels[_PAEz.colorPicker.colorStr.panel].editor;
  var str = _PAEz.colorPicker.colorStr;
  editor.setLine(str.line, str.prefix + _PAEz.colorPicker.getColor(color) + str.suffix);
}


_PAEz.colorPicker.set = function(color) {
  var editor = jsbin.panels.panels[_PAEz.colorPicker.colorStr.panel].editor;
  var str = _PAEz.colorPicker.colorStr;
  editor.operation(function() {
    editor.setLine(str.line, str.prefix + str.color + str.suffix);
    editor.setHistory(_PAEz.colorPicker.history);
    editor.setLine(str.line, str.prefix + _PAEz.colorPicker.getColor(color) + str.suffix);
    editor.setCursor({
      line: str.line,
      ch: str.index
    });
  });
}


_PAEz.colorPicker.restore = function() {
  var editor = jsbin.panels.panels[_PAEz.colorPicker.colorStr.panel].editor;
  var str = _PAEz.colorPicker.colorStr;
  editor.operation(function() {
    editor.setLine(str.line, str.prefix + str.color + str.suffix);
    editor.setHistory(_PAEz.colorPicker.history);
    editor.setCursor({
      line: str.line,
      ch: str.index
    });
  });
}


_PAEz.colorPicker.show = function(e) {
  var panel = window.jsbin.panels.focused.id;
  if (_PAEz.panels[panel]) {
    var editor = jsbin.panels.panels[panel].editor;
    if (e && e.type == 'mouseup') {
      var cursor = editor.coordsChar({
        top: e.clientY,
        left: e.clientX
      });
      editor.setCursor(cursor);
    } else {
      var cursor = editor.getCursor();
    }
    //$debug(cursor,editor.getLine(cursor.line)[cursor.ch],e)
    var str = editor.getLine(cursor.line);
    var pos = _PAEz.getCssColorAt(str, cursor.ch);
    if (pos) {
      //var strColor = str.substr(pos.index, pos.length);
      var c = tinycolor(str.substr(pos.index, pos.length));
      if (c.ok) {
        _PAEz.colorPicker.colorStr = {
          format: c.format,
          panel: panel,
          line: cursor.line,
          index: pos.index,
          length: pos.length,
          prefix: str.substring(0, pos.index),
          color: str.substring(pos.index, pos.index + pos.length),
          suffix: str.substring(pos.index + pos.length)
        }
        //$debug(_PAEz.colorPicker.colorStr)
        _PAEz.colorPicker.history = editor.getHistory();
        $(_PAEz.colorPicker.element).spectrum('set', c);
        $(_PAEz.colorPicker.element).spectrum('show');
      }
    }
  }
}

_PAEz.showColorPicker = _PAEz.colorPicker.show;


/*_PAEz.mousewhell = {};
_PAEz.mousewhell.handler = function(e) {
  //http://www.sitepoint.com/html5-javascript-mouse-wheel/
  var e = window.event || e; // old IE support
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  _PAEz.mousewhell.scrolling = true;
  if (_PAEz.mousewhell.mousedown) {
    console.debug(_PAEz.mousewhell.cursor)
    _PAEz.blink();
    _PAEz.mousewhell.editor.triggerOnKeyDown({
      type: "keydown",
      keyCode: delta == 1 ? 38 : 40,
      ctrlKey: true,
      preventDefault: function() {},
      stopPropagation: function() {}
    });
    console.debug(e, delta);
    e.stopPropagation();
    e.preventDefault();
    //return false;
  }
}
_PAEz.mousewhell.init = function() {
  //http://www.sitepoint.com/html5-javascript-mouse-wheel/
  if (document.addEventListener) {
    // IE9, Chrome, Safari, Opera
    document.addEventListener("mousewheel", _PAEz.mousewhell.handler, false);
    // Firefox
    document.addEventListener("DOMMouseScroll", _PAEz.mousewhell.handler, false);
  }
  // IE 6/7/8
  else document.attachEvent("onmousewheel", _PAEz.mousewhell.handler);
  document.addEventListener('mousedown', function(e) {
    if (e && e.button == 2 && e.type == "mousedown") {
      console.log('mu', e)
      var panel = window.jsbin.panels.focused.id;
      if (_PAEz.panels[panel]) {
        var editor = _PAEz.mousewhell.editor = jsbin.panels.panels[panel].editor;
        //var cursor =_PAEz.mousewhell.cursor= editor.getCursor();
        var cursor = _PAEz.mousewhell.cursor = editor.coordsChar({
          top: e.clientY,
          left: e.clientX
        });
        editor.setCursor(cursor);
        editor.focus();
        _PAEz.blink();
      }
      _PAEz.mousewhell.mousedown = true;
    }
  });
  $(document).bind("contextmenu", function(e) { // grrrrrr, how do I do this (cancel the context menu) without jquery?....look at its code later
    //if (e && e.button == 2 && e.type == "mouseup") { //&& _PAEz.mousewhell.scrolling
    if (_PAEz.mousewhell.scrolling) {
      //console.log('aaaaaaaaaa', e)
      _PAEz.mousewhell.scrolling = false;
      _PAEz.mousewhell.mousedown = false;
      _PAEz.mousewhell.editor.focus();
      _PAEz.mousewhell.editor.setCursor(_PAEz.mousewhell.cursor);

      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  });
  // document.addEventListener('mouseup', function(e) {
  //   if (e && e.button == 2 && e.type == "mouseup" && _PAEz.mousewhell.scrolling) {
  //     console.log('mu', e)
  //     //_PAEz.mousewhell.scrolling = false;
  //     //_PAEz.mousewhell.mousedown = false;
  //     _PAEz.mousewhell.editor.focus();
  //     _PAEz.mousewhell.editor.setCursor(_PAEz.mousewhell.cursor);
  //     e.stopPropagation();
  //     e.preventDefault();
  //     return false;
  //   }
  // });

}*/
// Add some keyMaps
_PAEz._keyMaps = { //  Shift-, Cmd-, Ctrl-, Alt-
  global: {
    "Ctrl-Alt-Space": _PAEz.beautify.bind(_PAEz, null),
    "Cmd-Alt-Space": _PAEz.beautify.bind(_PAEz, null),
    "Shift-Enter": _PAEz.semicolonEnter,
    "Ctrl-;": _PAEz.addSemicolon,
    "Cmd-;": _PAEz.addSemicolon,
    "Alt-C": _PAEz.colorPicker.show
    /*,
    "'": _PAEz.wrapWith.bind(_PAEz, {
      start: "'",
      end: "'"
    }),
    "Shift-'": _PAEz.wrapWith.bind(_PAEz, {
      start: '"',
      end: '"'
    }),
    "[": _PAEz.wrapWith.bind(_PAEz, {
      start: '[',
      end: ']'
    }),
    "Shift-[": _PAEz.wrapWith.bind(_PAEz, {
      start: '{',
      end: '}'
    }),
    "Shift-9": _PAEz.wrapWith.bind(_PAEz, {
      start: '(',
      end: ')'
    })*/
  }
}


_PAEz.addKeys = function(keyMaps) {
  var panels = Object.keys(keyMaps);
  for (var z = 0, zEnd = panels.length; z < zEnd; z++) {
    var panel = panels[z];
    if (panel = "global") {
      var keys = Object.keys(keyMaps.global);
      for (var i = 0, end = keys.length; i < end; i++) {
        var key = keys[i];
        CodeMirror.keyMap.basic[key] = keyMaps.global[key];
      }
    }
  }
}


_PAEz._init = function() {
  if (jsbin && editors && jsbin.panels && jsbin.panels.focused) {
    _PAEz.initCssHexChanger();
    _PAEz.colorPicker.init();
    //_PAEz.mousewhell.init();  // Didnt work out unfortunately


    //$debug('jsbin ready');
    _PAEz.addKeys(_PAEz._keyMaps);

    // Set up the settings
    if (jsbin.settings.PAEz === undefined) jsbin.settings.PAEz = _PAEz.defaults;

    _PAEz.defaults.editor.$forEach(function(key, value) {
      if (jsbin.settings.PAEz.editor[key] === undefined) jsbin.settings.PAEz.editor[key] = value;
    });

    _PAEz.defaults.beautify.$forEach(function(k, v) {
      _PAEz.defaults.beautify[k].$forEach(function(key, value) {
        if (jsbin.settings.PAEz.beautify[k][key] === undefined) jsbin.settings.PAEz.beautify[k][key] = value;
      });
    });

    // Apply _PAEz.editor settings
    _PAEz.updatePAEzEditorsSettings({
      details: jsbin.settings.PAEz.editor
    });

    // Temporary fix for matchBrackets while we wait for it to be fixed - https://github.com/remy/jsbin/issues/548
    // When JsBin loads it seems to render the panels twice, first time matchBrackets is true and then its false...no idea why (Ive really got to look at the source for JsBin one day)
    /*    _PAEz.updateEditorsSettings({
      details: {
        matchBrackets: jsbin.settings.editor.matchBrackets
      }
    });*/
    //Looks like the bracket matching has been fixed

    //Update the context menu with intial values
    _PAEz.updateContextMenu({
      target: "injectedCode",
      source: "background",
      message: "updateContextMenu",
      details: "intialCheck"
    });

    _PAEz.initContextMenuHooks();
  } else {
    //$debug("jsbin waiting");
    setTimeout(arguments.callee, 200);
  }
}

_PAEz._init();