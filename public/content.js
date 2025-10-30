// Always respond to REQUEST_TAB_INFO and send title/url to background
function sendTabInfo() {
  chrome.runtime.sendMessage({ type: 'TAB_INFO', title: document.title, url: window.location.href });
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) sendTabInfo();
});

window.addEventListener('DOMContentLoaded', sendTabInfo);
window.addEventListener('focus', sendTabInfo);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'REQUEST_TAB_INFO') {
    sendTabInfo();
    sendResponse({ url: window.location.href, title: document.title });
  }
});
