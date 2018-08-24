function activateTab(id) {
    //remove active from all
    var tabs = document.getElementById("tabArea").children;

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    var activate = document.getElementById(id);
    activate.classList.add("active");

    renderList(id);

}

function deleteLink(key, folder) {

    chrome.storage.local.get(folder, function (data) {
        delete data[folder][key];
        chrome.storage.local.set({
            [folder]: data[folder]
        })
    });

}

function createLinkCard(key, linkObj, folder) {
    var card = document.createElement("div");
    var link = document.createElement("a");
    var desc = document.createElement("p");
    var del = document.createElement("p");

    link.appendChild(document.createTextNode(linkObj.link));
    link.setAttribute("href", linkObj.link);
    link.setAttribute("target", "_blank")

    desc.appendChild(document.createTextNode(linkObj.desc));

    del.appendChild(document.createTextNode("Delete"));
    del.setAttribute('class', "delete")
    del.onclick = function () {
        deleteLink(key, folder);
        document.getElementById(key).remove();
    }

    card.setAttribute('class', "card");
    card.setAttribute('id', key);
    card.appendChild(link);
    card.appendChild(desc);
    card.appendChild(del);



    return card;
}

function clearList() {
    var content = document.getElementById("content");
    content.innerHTML = "";
}

function renderList(activeTabId) {
    clearList();
    if (activeTabId == "all") {
        chrome.storage.local.get("categories", function (data) {
            for (let i = 0; i < data.categories.length; i++) {
                renderList(data.categories[i]);
            }
        });
    }
    else {
        chrome.storage.local.get(activeTabId, function (data) {
            //activeTabId is folder name
            var ids = data[activeTabId];
            var content = document.getElementById("content");
            for (var key in ids) {
                content.appendChild(createLinkCard(key, ids[key], activeTabId));
            }
        });
    }
}

function renderSearchList(activeTabId, searchtxt) {
    chrome.storage.local.get(activeTabId, function (data) {
        //activeTabId is folder name
        var ids = data[activeTabId];
        var content = document.getElementById("content");
        for (var key in ids) {
            if (ids[key].desc.includes(searchtxt)) {
                content.appendChild(createLinkCard(key, ids[key], activeTabId));
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    //load tabs
    chrome.storage.local.get('categories', function (data) {
        var tabArea = document.getElementById("tabArea");
        var allbtn = document.createElement("button");
        allbtn.setAttribute('id', "all");
        allbtn.setAttribute('class', "tabLinks, active");
        allbtn.onclick = function () {
            activateTab("all"); //activates the "all" tab
        }
        allbtn.appendChild(document.createTextNode("All"));
        tabArea.appendChild(allbtn);

        for (let i = 0; i < data.categories.length; i++) {
            var btn = document.createElement("button");
            btn.setAttribute('id', data.categories[i]);
            btn.setAttribute('class', "tabLinks");
            btn.onclick = function () {
                activateTab(data.categories[i]);
            }
            btn.appendChild(document.createTextNode(data.categories[i]));
            tabArea.appendChild(btn);
        }

        //for adding a category
        var plus = document.getElementById("plusBtn");
        plus.onclick = function () {
            var person = prompt("Enter Category Name", "Untitled");

            if (person != null && person != "") {
                //check if category doesnt already exists
                if (data.categories.indexOf(person) < 0 || person == "All" || person == "all") {
                    data.categories.push(person);
                    data[person] = {};
                    chrome.storage.local.set(data, function () {
                        //refresh page after this operation
                        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                        });
                    });//update categories
                }
                else {
                    alert("Category Already exists, try a new name...");
                }
            }
        }

        renderList("all");//for initialising
    });


});

var searchBtn = document.getElementById("searchBtn");
searchBtn.onclick = function () {
    var searchInput = document.getElementById("searchInput");
    var activeTabId = document.getElementsByClassName("active")[0];

    clearList();

    if (activeTabId == "all") {
        chrome.storage.local.get('categories', function (data) {
            for (let i = 0; i < data.categories.length; i++) {
                renderSearchList(data.categories[i], searchInput.value);
            }
        })
    }
    else {
        renderSearchList(activeTabId, searchInput.value);
    }
}