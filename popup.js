var urlLink;
document.addEventListener('DOMContentLoaded', function () {

    //add link to p 
    chrome.tabs.getSelected(null, function (tab) {
        var link = document.getElementById("link");
        urlLink = tab.url;
        link.appendChild(document.createTextNode(tab.url));
    });

    //add categories to group
    chrome.storage.sync.get('categories', function (data) {
        var group = document.getElementById("group");
        for (let i = 0; i < data.categories.length; i++) {
            var btn = document.createElement("button");
            btn.setAttribute('id', data.categories[i]);
            btn.setAttribute('class', "folders")
            btn.onclick = function () {
                var desc = document.getElementById("description");
                alert(desc.value);
            }
            btn.appendChild(document.createTextNode(data.categories[i]));
            group.appendChild(btn);
        }


    });
});

