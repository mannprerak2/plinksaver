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

function createObj(link, title, desc) {//the key is the timestamp of when object was created
    var obj = {
        link: link,
        title: title,
        desc: desc,
    }
    return obj;
}

document.addEventListener('DOMContentLoaded', function () {
    var titleTxt ="";
    //add link to p 
    chrome.tabs.getSelected(null, function (tab) {
        var link = document.getElementById("link");
        urlLink = tab.url;
        link.appendChild(document.createTextNode(tab.url));

        var title = document.getElementById("title");
        titleTxt = tab.title;
        title.appendChild(document.createTextNode(titleTxt));
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
                saveLink(data.categories[i], createObj(urlLink, titleTxt, desc.value));
            }
            btn.appendChild(document.createTextNode(data.categories[i]));
            group.appendChild(btn);
        }
    });

    var options = document.getElementById('settingsBtn');
    options.onclick = function () {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    }
});

