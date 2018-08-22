chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get('categories', function (data) {
        if (!data.categories) {
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