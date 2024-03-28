//your JS code here. If required.
// Function to generate a random delay between min and max seconds
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000; // Convert to milliseconds
}

// Function to create a promise with a random delay
function createPromise(number) {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1, 3);
        setTimeout(() => {
            resolve({
                promise: `Promise ${number}`,
                timeTaken: (delay / 1000).toFixed(3) // Convert back to seconds with 3 decimal places
            });
        }, delay);
    });
}

// Array to hold all promises
let promises = [];

// Create 3 promises
for (let i = 1; i <= 3; i++) {
    promises.push(createPromise(i));
}

// Placeholder text for the loading rows
const loadingText = 'Loading...';

// Add loading rows to the table
for (let i = 0; i < 3; i++) {
    let tbody = document.querySelector('#output');
    let row = tbody.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.textContent = loadingText;
    cell2.textContent = loadingText;
}

// Use Promise.all() to wait for all promises to resolve
Promise.all(promises).then(results => {
    // Remove loading text
    let loadingRows = document.querySelectorAll('#output tr');
    loadingRows.forEach(row => {
        row.remove();
    });

    // Populate the table with the resolved values
    let tbody = document.querySelector('#output');
    let totalSeconds = 0;
    results.forEach((result, index) => {
        let row = tbody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.textContent = result.promise;
        cell2.textContent = result.timeTaken;

        // Calculate total time taken
        totalSeconds += parseFloat(result.timeTaken);
    });

    // Add the total row
    let totalRow = tbody.insertRow();
    let cell1 = totalRow.insertCell(0);
    let cell2 = totalRow.insertCell(1);
    cell1.textContent = 'Total';
    cell2.textContent = totalSeconds.toFixed(3);
}).catch(error => {
    console.error('Error:', error);
});
