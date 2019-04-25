var dt = new Date();
var lastSaveId = '-1';

document.getElementById('session-title').value = `Session ${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}, ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;

var saveSession = document.getElementById("save-session");
saveSession.onclick = function () {
    var sesName = document.getElementById('session-title').value;

    if (sesName === "") {
        alert("Session name cannot be empty");
        return;
    }
    // get folders on root
    chrome.bookmarks.getChildren('0', function (children1) {
        for (var i = 0; i < children1.length; i++) {
            var child1 = children1[i];
            if (child1.title == 'Other bookmarks') {
                chrome.bookmarks.getChildren(child1.id, function (children2) {
                    for (var j = 0; j < children2.length; j++) {
                        var child2 = children2[j];
                        if (child2.title == 'pLink bookmarks') {
                            chrome.bookmarks.getChildren(child2.id, function (children3) {
                                for (var k = 0; k < children3.length; k++) {
                                    var child3 = children3[k];
                                    if (child3.title == 'Sessions') {
                                        chrome.bookmarks.create({
                                            'parentId': child3.id,
                                            'title': sesName,
                                        }, function (newFolder) {
                                            lastSaveId = newFolder.id;
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
                                                        // add option to undo the saving of session
                                                        if (saveSession && lastSaveId != "-1") {
                                                            saveSession.innerText = "Saved, Click to Undo";
                                                            saveSession.onclick = function () {
                                                                chrome.bookmarks.removeTree(lastSaveId, function () {
                                                                    saveSession.innerText = "Undo successful";
                                                                    saveSession.onclick = null;
                                                                })
                                                            }
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                        break;
                                    }
                                }
                            });
                            break;
                        }
                    }
                });
                break;
            }
        }
    });
}

document.getElementById("restore-session").onclick = function () {
    // get folders on root
    chrome.bookmarks.getChildren('0', function (children1) {
        for (var i = 0; i < children1.length; i++) {
            var child1 = children1[i];
            if (child1.title == 'Other bookmarks') {
                chrome.bookmarks.getChildren(child1.id, function (children2) {
                    for (var j = 0; j < children2.length; j++) {
                        var child2 = children2[j];
                        if (child2.title == 'pLink bookmarks') {
                            chrome.bookmarks.getChildren(child2.id, function (children3) {
                                for (var k = 0; k < children3.length; k++) {
                                    var child3 = children3[k];
                                    if (child3.title == 'Sessions') {
                                        //get all sessions
                                        chrome.bookmarks.getChildren(child3.id, function (children4) {
                                            // get the last saved session
                                            if (children4.length == 0)
                                                return;
                                            chrome.bookmarks.getChildren(children4[children4.length - 1].id, function (children5) {
                                                children5.forEach(function (child4) {
                                                    chrome.tabs.create(
                                                        {
                                                            url: child4.url
                                                        }
                                                    );
                                                });
                                            });
                                        });
                                        break;
                                    }
                                }
                            });
                            break;
                        }
                    }
                });
                break;
            }
        }
    });
}


document.getElementById("restore-more").onclick = function () {
    // get folders on root
    chrome.bookmarks.getChildren('0', function (children1) {
        for (var i = 0; i < children1.length; i++) {
            var child1 = children1[i];
            if (child1.title == 'Other bookmarks') {
                chrome.bookmarks.getChildren(child1.id, function (children2) {
                    for (var j = 0; j < children2.length; j++) {
                        var child2 = children2[j];
                        if (child2.title == 'pLink bookmarks') {
                            chrome.bookmarks.getChildren(child2.id, function (children3) {
                                for (var k = 0; k < children3.length; k++) {
                                    var child3 = children3[k];
                                    if (child3.title == 'Sessions') {
                                        chrome.tabs.create({
                                            url:'chrome://bookmarks/?id='+child3.id
                                        })
                                    }
                                }
                            });
                            break;
                        }
                    }
                });
                break;
            }
        }
    });
}



