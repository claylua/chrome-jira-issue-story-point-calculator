chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'calculateStoryPoints') {
    // Ensure the DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      let totalPoints = 0;

      // Find the index of the th element containing the div with exact text "QA Story Point Estimate"
      const thElements = document.querySelectorAll('th');
      let matchedThIndex = -1;

      thElements.forEach((th, index) => {
        const span = th.querySelector('div span');
        if (span && span.textContent.trim() === 'QA Story Point Estimate') {
          matchedThIndex = index;
        }
      });

      console.log('matched TH Index', matchedThIndex);

      // Check if matchedThIndex is found
      if (matchedThIndex !== -1) {
        // Find all tr elements and filter those where the td at matchedThIndex contains a non-empty div
        const trElements = document.querySelectorAll('tr');
        trElements.forEach(tr => {
          const td = tr.querySelectorAll('td')[matchedThIndex];
          if (td) {
            const divs = td.querySelectorAll('div');
            divs.forEach(div => {
              const text = div.textContent.trim();
              if (text !== '') {
                console.log(div);  // Logs the entire div element
                const points = parseFloat(text);
                if (!isNaN(points)) {
                  totalPoints += points;
                }
              }
            });
          }
        });
      } else {
        console.log('No matching th element found.');
      }

      sendResponse({ totalPoints });
    });
  }
});

