// Function to fetch country data from the Rest Countries API
async function fetchCountryData() {
    const apiUrl = 'https://restcountries.com/v3.1/all';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching country data:', error);
        return null;
    }
}

// Function to update the HTML with country data
async function updateCountryInfo() {
    const countryInfoContainer = document.querySelector('.country-info');

    // Disable the "New Quote" button while fetching country data
    countryInfoContainer.innerHTML = '<p>Loading...</p>';

    const countryData = await fetchCountryData();

    if (countryData) {
        // Select a random country from the data
        const randomIndex = Math.floor(Math.random() * countryData.length);
        const randomCountry = countryData[randomIndex];

        // Extract relevant information
        const countryName = randomCountry.name.common;
        const countryCode = randomCountry.cca2;
        const capital = randomCountry.capital[0];
        const population = randomCountry.population;
        const region = randomCountry.region;

        countryInfoContainer.innerHTML = `
            <h2>${countryName}</h2>
            <p>Country Code: ${countryCode}</p>
            <p>Capital: ${capital}</p>
            <p>Population: ${population.toLocaleString()}</p>
            <p>Region: ${region}</p>
        `;
    } else {
        countryInfoContainer.innerHTML = '<p>Failed to fetch country data. Please try again later.</p>';
    }
}

// Call the updateCountryInfo function to display country information
updateCountryInfo();
