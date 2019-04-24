
// run on extension install
chrome.runtime.onInstalled.addListener(function () {
    // get folders on root
    chrome.bookmarks.getChildren('0', function (children) {
        children.forEach(function (bookmark) {
            if (bookmark.title == 'Other bookmarks') {
                chrome.bookmarks.getChildren(bookmark.id, function (children) {
                    var create = true;
                    children.forEach(function (bookmark) {
                        // don't create new folder if already exists
                        if (bookmark.title == 'pLink bookmarks') {
                            create = false;
                            console.log("already found: pLink bookmarks");
                        }
                    });
                    // creating only if it doesn't exist
                    if (create) {
                        chrome.bookmarks.create({
                            'parentId': bookmark.id,
                            'title': 'pLink bookmarks',
                            'index': 0
                        }, function (newFolder) {
                            console.log("created folder: pLink bookmarks");
                            chrome.bookmarks.create({
                                'parentId': newFolder.id,
                                'title': 'Sessions',
                                'index': 0
                            }, function (newFolder) {
                                console.log("created folder: pLink bookmarks / Sessions");
                            });
                        });
                    }
                });
            }
        });
    });
});
