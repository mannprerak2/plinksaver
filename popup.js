
document.getElementById("save-session").onclick = function () {
    var title = document.getElementById('session-title');

    // get folders on root
    chrome.bookmarks.getChildren('0', function (children1) {
        children1.forEach(function (child1) {
            if (child1.title == 'Other bookmarks') {
                chrome.bookmarks.getChildren(child1.id, function (children2) {
                    children2.forEach(function (child2) {
                        if (child2.title == 'pLink bookmarks') {
                            chrome.bookmarks.getChildren(child2.id, function (children3) {
                                children3.forEach(function (child3) {
                                    if (child3.title == 'Sessions') {
                                        chrome.bookmarks.create({
                                            'parentId': child3.id,
                                            'title': 'new session',
                                        }, function (newFolder) {
                                            //query all tabs
                                            chrome.tabs.query({
                                                currentWindow: true
                                            }, function (tabs) {
                                                tabs.forEach(function (tab) {
                                                    chrome.bookmarks.create({
                                                        'parentId': newFolder.id,
                                                        'title': tab.title,
                                                        'url': tab.url
                                                    }, function (link) {
                                                        console.log("added " + link.title + " " + link.url);
                                                    });
                                                });
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    });
}

document.getElementById("restore-session").onclick = function () {
    console.log("click restore-session");
}

