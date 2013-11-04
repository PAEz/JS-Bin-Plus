// https://github.com/chriszarate/Bookmarkleter

chrome.runtime.onMessage.addListener(function(message) {
	if (message.target == "bookmarklet") {
		$qs('#bookmarklet').href = MakeBM(message.details);

		
	}
});

OptionElementChange = function(evt) {

	var value = evt.target.value;
	$qs('#bookmarklet').innerText = value;
	localStorage['bookmarklet-tile'] = value;
}

onUpdate = function() {
	chrome.bookmarks.update(localStorage['bookmarklet-id'], {
		title: $qs('#title').value,
		url: $qs('#bookmarklet').href
	})
}

onPageLoad = function(e) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {
			message: "getCode",
			details: "javascript",
			target: "injectedCode",
			source: "bookmarklet"
		});
	});
	if (localStorage.getItem('bookmarklet-id')) chrome.bookmarks.get(localStorage['bookmarklet-id'], function(bookmarks) {
			if (bookmarks) {
				$qs('#update').removeAttribute('disabled');
				$qs('#bookmarklet').innerText = bookmarks[0].title;
				$qs('#title').value = bookmarks[0].title;
			} else {
				localStorage.removeItem('bookmarklet-id');
			}

		});
		if (localStorage['bookmarklet-tile']) {
			$qs('#bookmarklet').innerText = localStorage['bookmarklet-tile'];
			$qs('#title').value = localStorage['bookmarklet-tile'];
		}

		$qs('#update').$addEvents({
			click: onUpdate
		})

		$qs('#title').$addEvents({
			input: OptionElementChange,
			change: OptionElementChange
		});
}


window.addEventListener("DOMContentLoaded", onPageLoad, false);

chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
	if (bookmark.title == localStorage['bookmarklet-tile'] && bookmark.url == $qs('#bookmarklet').href) {
		localStorage['bookmarklet-id'] = id;
		$qs('#update').removeAttribute('disabled');
	}
});