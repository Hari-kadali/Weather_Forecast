async function getWeather() {
    const city = document.getElementById('city-input').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;
  
    // OpenWeatherMap API key
    const apiKey = '4fd65e9ec30b1434edb214be8cfe3363';

    // OpenWeatherMap API URL for 5-day forecast
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
  
    try {
        const response = await fetch(apiUrl);
        // Check if the response status is not OK (e.g., 404 Not Found)
        if (!response.ok) {
        throw new Error('City not found. Please enter a valid city name.');
     }

        const data = await response.json();
    
        // Assuming the structure of OpenWeatherMap response
        const forecastList = data.list;
    
        // Clear previous forecast data
        const forecastContainer = document.getElementById('forecast-list');
        forecastContainer.innerHTML = '';
    
        // Iterate over the 5-day forecast data
        for (let i = 0; i < forecastList.length; i += 8) {
          const forecast = forecastList[i];
          const date = new Date(forecast.dt * 1000);
          const temperature = forecast.main.temp;
          const description = forecast.weather[0].description;
          const iconCode = forecast.weather[0].icon;
    
          // Construct the icon URL using OpenWeatherMap's icon set
          const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    
          // Create elements to display forecast data with styles and icon
          const forecastItem = document.createElement('div');
          forecastItem.style.backgroundColor = 'rgb(0 165 255)';  // Background color
          forecastItem.style.padding = 'auto';  // Padding
          forecastItem.style.marginBottom = 'auto';  // Margin bottom

          forecastItem.innerHTML = `
            <p style="color: #433;">Date: ${date.toDateString()}</p>
            <p style="color: #ffffff;">Temperature: ${temperature}</p>
            <p style="color: #ffffff;">Description: ${description}</p>
            <img src="${iconUrl}" alt="${description}" style="width: 50px; height: 50px;">
          `;
    
          // Append forecast item to the container
          forecastContainer.appendChild(forecastItem);
        }
    
    }
    catch (error) {
        console.error('Error fetching data:', error);

     // Display the error message
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error.message;
    }
}  