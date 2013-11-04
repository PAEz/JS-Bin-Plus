JS Bin +
-------


----------


This is an extension I made for myself and hope that others find benefit in aswell.  
Originally all I wanted was JS Beautify, something to help with making bookmarklets and some context menu stuff as Im more of a clicker than a tapper some times.  Over time I ended up adding more things that I thought might be useful.

Im sick of it just sitting on my drive (where it'll just get lost over time) so Im sticking it up here.  
No one else seems to give a dam about it, so I lost interest and haven't touched it in ages (I use it daily, but haven't touched the code in yonks).  

**Setting CodeMirror/Beautify Options**

    Due to the way JS Bin saves settings youll need to open the browser with one JS Bin tab/session open.
    Then set the settings to how you want them.
    Then close that tab/session and then you can open the ones want to edit.
    The reason is that JS Bin saves the settings to local storage when you close the tab/window its in.
    So if you have multiple sessions open and then close the browser you cant predict which one will close last and its that one which settings will get saved.


**Features**

**Color Picker**  

    You can activate the color picker by either putting the cursor at the start of or in a color and pressing 'Alt-C' or by middle clicking on the color.

**Keyboard Shortcuts**  

    -'Ctrl-Alt-Space'
    	Apply the beutifier to current selection or code.
    
    -'Shift-Enter'
    	Add a semicolon to the end of the line (if there isn't one) and press Enter (with cursor at end of the line).
    
    -'Ctrl-;'
    	Add a semicolon at the end of the line (if there isn't one) and place the cursor before it.
    
    -'Ctrl-Up' or 'Ctrl-Down'
    	In addition to emmets ability to increase a number up or down, it will now work different on css
    	hex values.  Pressing Ctrl-Up/Down on a css hex value will make the color component the cursor is
    	on go up or down and clamp at 0-ff/f.  If the cursor is on the # then all components will go Up/Down	by one (quick way to lighten/darken a color).

**Page Action**  

    -Options
    	-CodeMirror
    		Edit settings associated with CodeMirror.
    
    	-Beautifier
    		Edit settings associated with JS Beautify.
    		Be aware that when it comes to beautifying css and js in html the Brace Style, Indent Type and 
    		Indent Size are taking from the html settings all other settings for js and css come from their
    		settings.
    
    -Tools
    	-BookMarklet Creator
    		Converts the js into a bookmarklet.
    		You can then give it a Title that will make the link for the bookmarklet appear.
    		You can then drag that link to your bookmarks bar.
    		Then you can change the code or title and click on the Update button to have the bookmark update.
    		Feel free to edit or move the bookmarklet to another location in your bookmarks, the extension will still find it.
    
    	-Insert Data URL
    		Inserts a selected file as a dataURL.  Inserts at cursor or replaces selection.
    
    	-Dec/Hex/Bin Converter
    		Converts between number types.  Whole numbers only.
    
    	-Key Codes
    		Shows key codes when you press a key.
    
    -About
    	Lists and links to some things used to make this extension.

**Context Menu**  

    < When nothing Selected >
    	-Undo
    	-Redo
    	-View
    		-Debug / Preview
    			Switch between Debug and Preview
    
    		-Line Numbers
    			Toggle Line Numbers on and off
    
    		-Line Wrapping
    			Toggle Line Wrapping on and off
    
    	-Beautify < works on selection or all code for selected panel >
    		Beautify selection or whole document.
    
    	-Unpackers < works on selection or all javascript code >
    		Some unpackers for certain minifiers.
    		Code comes from JsBeautifier.  Added a little bit to the URL UnEncode to remove javascript: and an anonymous function wrap if there is one (for importing and working with bookmarklets).
    		https://github.com/einars/js-beautify/tree/master/js/lib/unpackers
    
    	-Comment / Uncomment
    		Same as pressing Ctrl-/
    
    < When something Selected >
    	-Lines
    		-Remove Line Numbers
    			Sometimes when you copy code you get the line numbers that where displayed (Im looking at you Chrome View Source!), this will remove them.
    			It will remove a number as long as its at the very beginning of the line.
    			
    		-Toggle \ At End Of Line
    			Toggles whether there is a \ at the end of selected lines.
    
    		-Convert Array Elements To Lines
    			Select some array elements and it will place each array element on a new line and remove the '"",' .
    			Don't select the [].
    			Use's JSON so doesnt handle functions and all elements must be JSONable.
    
    		-Convert Lines To Array Elements
    			Wraps selected lines in '"",' except for the last line that only gets wrapped in '""'. 
    
    		-Merge Lines
    			Merges the selected lines into the first selected line.
    			Doesn't remove leading/trailing spaces.
    
    		-Sort Lines
    			Sorts the lines.
    
    	-Wrap With...
    		Various things (quotes and brackets) to wrap the selection with.
    
    	-Search Online...
    		Various sites to search for the selected text in.
    
    	-Send Selection To...
    		Sends the currently selected text to some online service.
    		If you have an online service youd like this to work with, just tell me and Ill see
    		what I can do.
    		
    		-JSON Editor Online
    			Sends the selection to JSON Online Editor.  You still need to press the right arrow.
    
    	-Convert CSS Color
    		Converts from one css color type to another, for instance hex to rgb or hsl.
    		Select the color to convert and choose type.

