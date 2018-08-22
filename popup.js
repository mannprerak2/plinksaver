var urlLink;

function saveLink(folder, valueObj) {
    var timestamp = new Date().getTime();
    chrome.storage.local.get(folder, function (data) {
        var folderObj = data[folder];

        folderObj[timestamp] = valueObj;

        chrome.storage.local.set({
            [folder]: folderObj
        }, function () {
            window.close();
        })
    });

}

function createObj(link, desc) {
    var obj = {
        link: link,
        desc: desc
    }
    return obj;
}

document.addEventListener('DOMContentLoaded', function () {

    //add link to p 
    chrome.tabs.getSelected(null, function (tab) {
        var link = document.getElementById("link");
        urlLink = tab.url;
        link.appendChild(document.createTextNode(tab.url));
    });

    //add categories to group
    chrome.storage.local.get('categories', function (data) {
        var group = document.getElementById("group");
        for (let i = 0; i < data.categories.length; i++) {
            var btn = document.createElement("button");
            btn.setAttribute('id', data.categories[i]);
            btn.setAttribute('class', "folders")
            btn.onclick = function () {
                var desc = document.getElementById("description");
                saveLink(data.categories[i], createObj(urlLink, desc.value));
            }
            btn.appendChild(document.createTextNode(data.categories[i]));
            group.appendChild(btn);
        }
    });

    var options = document.getElementById('settingsBtn');
    options.onclick = function () {
        chrome.tabs.create({ url: "options.html" });
    }
});

