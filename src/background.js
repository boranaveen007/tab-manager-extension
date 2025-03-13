chrome.runtime.onInstalled.addListener(() => {
    console.log("Tab Manager Extension Installed.");
    chrome.storage.local.set({ tabGroups: [] });
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ savedSession: [] });
});