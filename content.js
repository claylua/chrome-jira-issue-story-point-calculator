chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.action === 'calculateStoryPoints') {
		// Ensure jQuery is available
		if (typeof $ !== 'undefined') {
		// Find the th element containing a div with the exact text "QA Story Point Estimate"

		let totalPoints = 0;

		// Find the index of the th element containing the div with exact text "QA Story Point Estimate"
		var matchedThIndex = $('th').filter(function(index) {
				return $(this).find('div span').text().trim() === 'QA Story Point Estimate';
				}).index();

		console.log('matched TH Index', matchedThIndex);
		// Check if matchedThIndex is found
		if (matchedThIndex !== -1) {
		// Find all tr elements and filter those where the td at matchedThIndex contains a non-empty div
		$('tr').each(function() {
				var td = $(this).find('td').eq(matchedThIndex);
				var divs = td.find('div');

divs.each(function() {
var div = $(this);
				if (div.length > 0 && div.text().trim() !== '') {
				console.log(div);  // Logs the entire tr element
				const points = parseFloat(div.text().trim());
				if (!isNaN(points)) {
				totalPoints += points;
				}
				}
})
				});
		} else {
			console.log('No matching th element found.');
		}


		sendResponse({ totalPoints });
		} else {
			console.error('jQuery is not loaded.');
			sendResponse({ totalPoints: 'Error: jQuery not loaded' });
		}
		}
});
