document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['content.js']
    }, () => {
      // Add a slight delay to ensure content script is fully loaded
      setTimeout(() => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "calculateStoryPoints"}, function(response) {
          console.log('response', response);
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          if (response && response.totalPoints !== undefined) {
            document.getElementById('total-points').textContent = response.totalPoints;
          } else {
            console.error('Invalid response:', response);
          }
        });
      }, 500); // 500ms delay
    });
  });
});
