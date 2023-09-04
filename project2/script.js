// Function to fetch a random quote from the Quotes Free API
async function fetchRandomQuote() {
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        return randomQuote;
    } catch (error) {
        console.error('Error fetching a random quote:', error);
        return null;
    }
}

// Function to update the HTML with a random quote
async function updateRandomQuote() {
    const quoteContainer = document.querySelector('.quote');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    // Disable the "New Quote" button while fetching a new quote
    newQuoteBtn.disabled = true;
    quoteContainer.innerHTML = '<p>Loading...</p>';

    const randomQuote = await fetchRandomQuote();

    if (randomQuote) {
        const quoteText = randomQuote.text;
        const quoteAuthor = randomQuote.author || 'Unknown';

        quoteContainer.innerHTML = `
            <p>${quoteText}</p>
            <p class="author">- ${quoteAuthor}</p>
        `;
    } else {
        quoteContainer.innerHTML = '<p>Failed to fetch a random quote. Please try again later.</p>';
    }

    // Enable the "New Quote" button after fetching a new quote
    newQuoteBtn.disabled = false;
}

// Event listener for the "New Quote" button
const newQuoteBtn = document.getElementById('new-quote-btn');
newQuoteBtn.addEventListener('click', updateRandomQuote);

// Call the updateRandomQuote function to display an initial quote
updateRandomQuote();
