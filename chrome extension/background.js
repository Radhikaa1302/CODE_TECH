let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    trackTime(tab.url);
  });
});

function trackTime(url) {
  const now = new Date().getTime();

  if (activeTab && startTime) {
    const duration = now - startTime;
    saveTime(activeTab, duration);
  }

  activeTab = extractDomain(url);
  startTime = now;
}

function saveTime(site, duration) {
  chrome.storage.local.get([site], result => {
    const total = result[site] || 0;
    chrome.storage.local.set({ [site]: total + duration });
  });
}

function extractDomain(url) {
  const link = document.createElement("a");
  link.href = url;
  return link.hostname;
}
