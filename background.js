// background.js

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.type === "main_frame" && details.url.startsWith("http")) {
            if (isPhishingURL(details.url)) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "phishing-detected", url: details.url });
                });
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

function isPhishingURL(url) {
    const phishingPatterns = [
        /(?:[A-Za-z0-9-]+\.)*(?:secure|login|account|update|verify|bank|paypal|amazon)\.(?:com|net|org)\b/,
        // Add more regex patterns for detecting phishing URLs
    ];

    // Check if URL matches any of the phishing patterns
    for (let pattern of phishingPatterns) {
        if (pattern.test(url)) {
            return true;
        }
    }

    return false;
}
