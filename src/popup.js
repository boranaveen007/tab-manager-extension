document.addEventListener("DOMContentLoaded", function () {
    // grouping tabs
    const groupTabsBtn = document.getElementById("group-tabs");
    // closing tabs
    const closeTabsBtn = document.getElementById("close-tabs");
    // dark mode toggle
    const darkModeToggle = document.getElementById("toggle-dark-mode");
    // save session
    const saveSessionBtn = document.getElementById("save-session");
    // restore session
    const restoreSessionBtn = document.getElementById("restore-session");
    // close duplicate tabs
    const closeDuplicateTabsBtn = document.getElementById("close-duplicate-tabs");
    // toggle pin tabs
    const togglePinTabsBtn = document.getElementById("toggle-pin-tabs");
    // mute all tabs
    const muteButton = document.getElementById("toggle-mute");
    // search tabs
    const searchInput = document.getElementById("tab-search");
    const searchResults = document.getElementById("search-results");
    // const clearButton = document.getElementById("clear-search");
    // suspend tabs
    const suspendTabsBtn = document.getElementById("suspend-tabs");


    const body = document.body;

    // Ensure buttons exist before adding event listeners
    if (!groupTabsBtn || !closeTabsBtn || !darkModeToggle) {
        console.error("One or more elements not found in popup.html");
        return;
    }

    // Function to apply dark mode
    function applyDarkMode(isDark) {
        if (isDark) {
            body.classList.add("dark");
            chrome.storage.local.set({ darkMode: true });
        } else {
            body.classList.remove("dark");
            chrome.storage.local.set({ darkMode: false });
        }
    }

    // Load the saved theme from Chrome storage
    chrome.storage.local.get("darkMode", function (result) {
        const isDarkMode = result.darkMode || false;
        applyDarkMode(isDarkMode);
    });


     // Toggle dark mode when button is clicked
     darkModeToggle.addEventListener("click", function () {
        chrome.storage.local.get("darkMode", function (result) {
            const isDark = !result.darkMode; // Toggle state
            applyDarkMode(isDark);
        });
    });

    // Function to group tabs by domain
    groupTabsBtn.addEventListener("click", function () {
        chrome.tabs.query({}, function (tabs) {
            let domainGroups = {};

            tabs.forEach(tab => {
                try {
                    let url = new URL(tab.url);
                    let domain = url.hostname.replace("www.", ""); // Extract domain

                    if (!domainGroups[domain]) {
                        domainGroups[domain] = [];
                    }
                    domainGroups[domain].push(tab.id);
                } catch (error) {
                    console.warn("Skipping invalid tab URL:", tab.url);
                }
            });

            // Create new windows for each domain group
            Object.keys(domainGroups).forEach(domain => {
                if (domainGroups[domain].length > 1) { // Group only if more than one tab
                    chrome.windows.create({ tabId: domainGroups[domain][0] }, function (newWindow) {
                        chrome.tabs.move(domainGroups[domain].slice(1), { windowId: newWindow.id, index: -1 });
                    });
                }
            });

            console.log("Tabs grouped by domain:", domainGroups);
        });
    });

    // Function to close all tabs except active
    closeTabsBtn.addEventListener("click", function () {
        chrome.tabs.query({ active: false }, function (tabs) {
            let tabIds = tabs.map(tab => tab.id);
            if (tabIds.length > 0) {
                chrome.tabs.remove(tabIds);
            }
        });
    });

    // Save current session
    saveSessionBtn.addEventListener("click", function () {
        chrome.tabs.query({}, function (tabs) {
            const sessionData = tabs.map(tab => ({ url: tab.url, pinned: tab.pinned }));
            chrome.storage.local.set({ savedSession: sessionData }, function () {
                alert("Session saved successfully!");
            });
        });
    });

    // Restore session
    restoreSessionBtn.addEventListener("click", function () {
        chrome.storage.local.get(["savedSession"], function (result) {
            const session = result.savedSession || [];
            if (session.length === 0) {
                alert("No saved session found!");
                return;
            }

            // Open all saved tabs
            session.forEach(tab => {
                chrome.tabs.create({ url: tab.url, pinned: tab.pinned });
            });

            alert("Session restored!");
        });
    });
    // search tabs
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        if (searchInput.value.trim().length > 0) {
            searchResults.classList.remove("hidden");
            // clearButton.classList.remove("hidden");
        } else {
            searchResults.classList.add("hidden");
            // clearButton.classList.add("hidden");
        }
        chrome.tabs.query({}, function (tabs) {
            searchResults.innerHTML = ""; // Clear previous results
            const filteredTabs = tabs.filter(tab => tab.title.toLowerCase().includes(query));

            filteredTabs.forEach(tab => {
                const li = document.createElement("li");
                li.textContent = tab.title;
                li.className = "p-2 cursor-pointer hover:bg-gray-400";
                li.addEventListener("click", function () {
                    chrome.tabs.update(tab.id, { active: true });
                });
                searchResults.appendChild(li);
            });

            if (filteredTabs.length === 0) {
                searchResults.innerHTML = "<li class='p-2 text-gray-500'>No tabs found</li>";
            }
        });
    });
    // Close duplicate tabs
    closeDuplicateTabsBtn.addEventListener("click", function () {
        chrome.tabs.query({}, function (tabs) {
            const urlMap = new Map();
            const duplicateTabIds = [];

            tabs.forEach(tab => {
                if (urlMap.has(tab.url)) {
                    duplicateTabIds.push(tab.id);
                } else {
                    urlMap.set(tab.url, tab.id);
                }
            });

            if (duplicateTabIds.length > 0) {
                chrome.tabs.remove(duplicateTabIds, () => {
                    console.log("Closed duplicate tabs:", duplicateTabIds);
                });
            } else {
                alert("No duplicate tabs found!");
            }
        });
    });
    // Toggle pin tabs
    togglePinTabsBtn.addEventListener("click", function () {
        chrome.tabs.query({}, function (tabs) {
            let hasPinnedTabs = tabs.some(tab => tab.pinned);

            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, { pinned: !hasPinnedTabs });
            });

            console.log(hasPinnedTabs ? "Unpinned all tabs" : "Pinned all tabs");
        });
    }); 
    // Suspend inactive tabs
    suspendTabsBtn.addEventListener("click", function () {
        chrome.tabs.query({ active: false, discarded: false }, function (tabs) {
            tabs.forEach(tab => {
                chrome.tabs.discard(tab.id);
            });
            console.log("Suspended inactive tabs.");
        });
    });
    // Mute all tabs
    muteButton.addEventListener("click", function () {
        chrome.tabs.query({}, function (tabs) {
            let allMuted = tabs.every(tab => tab.mutedInfo && tab.mutedInfo.muted);

            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, { muted: !allMuted });
            });

            // Update button text based on state
            muteButton.textContent = allMuted ? "Mute All Tabs" : "Unmute All Tabs";
        });
    });
});