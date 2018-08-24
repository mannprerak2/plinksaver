//creating 3 basic categories on first install only.
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get('categories', function (data) {
        if (!data.categories) {//only false for first install or if extension was removed and added again
            chrome.storage.local.set({
                categories: [
                    "Read Later",
                    "Important",
                    "Good Read"
                ],
                "Read Later":{
                },
                "Important":{
                },
                "Good Read":{
                },
                
            }, function () {
                console.log("Created categories, first install")
            });
        }
    });
});