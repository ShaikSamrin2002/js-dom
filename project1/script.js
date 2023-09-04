// TODO: Write JavaScript code here to fetch weather data from the API and update the HTML accordingly
// API Link: You can use the OpenWeatherMap API (https://openweathermap.org/api) to get the weather data.
// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeatherData() {
    const apiKey = '8affa44e8eeadbf75be05b3b2ebb03c6'; // Replace with your OpenWeatherMap API key
    const city = 'kurnool'; // Replace with the desired city
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}



// Function to update the HTML with weather data

async function updateWeatherData() {
    const weatherData = await fetchWeatherData();
    const weatherContainer = document.querySelector('.weather-data');

    if (weatherData) {
        const cityName = weatherData.name;
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        // Debugging: Log variable values to the console
        console.log('cityName:', cityName);
        console.log('temperature:', temperature);
        console.log('description:', description);

        // Update the HTML with weather data
        weatherContainer.innerHTML = `
            <h2>${cityName} Weather</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;
    } else {
        weatherContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}

// Call the updateWeatherData function to start the application
updateWeatherData();







  

  
