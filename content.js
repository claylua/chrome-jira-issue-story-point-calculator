chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'calculateStoryPoints') {
        let totalPoints = 0;

        // Find the index of the th element containing the div with exact text "QA Story Point Estimate"
        const headers = document.querySelectorAll('th');
        const matchedThIndex = Array.from(headers).findIndex(th => 
            th.querySelector('div div div')?.textContent.trim() === 'QA Story Point Estimate'
        );

        console.log('matched TH Index', matchedThIndex);

        // Check if matchedThIndex is found
        if (matchedThIndex !== -1) {
            // Find all tr elements and filter those where the td at matchedThIndex contains a non-empty div
            const rows = document.querySelectorAll('tr');
            rows.forEach(row => {
                const td = row.querySelectorAll('td')[matchedThIndex];
                if (td) {
                    const divs = td.querySelectorAll('div');
                    divs.forEach(div => {
                        if (div.textContent.trim() !== '') {
                            const points = parseFloat(div.textContent.trim());
                            if (!isNaN(points)) {
                                totalPoints += points;
                            }
                        }
                        console.log('total points', totalPoints);
                    });
                }
            });
        } else {
            console.log('No matching th element found.');
        }

        console.log('sending points', totalPoints);
        sendResponse({ totalPoints: totalPoints });
return true;
    }
});
