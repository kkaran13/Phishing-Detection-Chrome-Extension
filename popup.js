// // popup.js

// document.getElementById('checkButton').addEventListener('click', function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         let url = tabs[0].url;
//         chrome.runtime.sendMessage({ action: "check-url", url: url }, function (response) {
//             if (response && response.result) {
//                 document.getElementById('result').textContent = "Phishing URL detected!";
//             } else {
//                 document.getElementById('result').textContent = "URL is safe.";
//             }
//         });
//     });
// });

// // Listen for messages from background.js
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.action === "phishing-detected") {
//         const phishingUrl = message.url;
//         document.getElementById('result').textContent = `Phishing URL detected: ${phishingUrl}`;
//         // Optionally, take further actions like showing a warning or blocking access
//     }
// });


// popup.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "phishing-detected") {
        const phishingUrl = message.url;
        document.getElementById('result').textContent = `Phishing URL detected: ${phishingUrl}`;
        // Optionally, take further actions like showing a warning or blocking access
    }
});

document.getElementById('checkButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;
        if (isPhishingURL(url)) {
            document.getElementById('result').textContent = "Phishing URL detected!";
        } else {
            document.getElementById('result').textContent = "URL is safe.";
        }
    });
});

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
