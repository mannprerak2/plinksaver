chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.get('categories', function (data) {
        if (!data.categories) {
            chrome.storage.sync.set({
                categories: [
                    "Read Later",
                    "Important",
                    "Good Read"
                ]
            }, function () {
                console.log("Created categories, first install")
            });
        }
    });
});