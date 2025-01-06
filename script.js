
const updateWeatherData = (data) => {
    if (!data) return;
    (async () => {
        const address = 'Kolkata'; // Replace with your desired city
        const coordinates = await getCoordinates(address);
    
        if (coordinates) {
            console.log(`Coordinates of ${address}:`, coordinates);
        }
    })();
    // Select DOM elements
    const cloudPct = document.querySelector('.card-body .li:nth-child(1)');
    const feelsLike = document.querySelector('.card-body .li:nth-child(2)');
    const humidity = document.querySelector('.card-body .li:nth-child(3)');
    const maxTemp = document.querySelector('.card-body .li:nth-child(4)');
    const minTemp = document.querySelector('.card-body .li:nth-child(5)');
    const sunrise = document.querySelector('.card-body .li:nth-child(6)');
    const temp = document.querySelector('.card-body .li:nth-child(7)');
    const windDegrees = document.querySelector('.card-body .li:nth-child(8)');
    const windSpeed = document.querySelector('.card-body .li:nth-child(9)');

    // Update their text content
    cloudPct.textContent = `Cloud Percentage: ${data.cloud_pct}%`;
    feelsLike.textContent = `Feels Like: ${data.feels_like}°C`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    maxTemp.textContent = `Max Temperature: ${data.max_temp}°C`;
    minTemp.textContent = `Min Temperature: ${data.min_temp}°C`;
    sunrise.textContent = `Sunrise: ${new Date(data.sunrise * 1000).toLocaleTimeString()}`;
    temp.textContent = `Temperature: ${data.temp}°C`;
    windDegrees.textContent = `Wind Direction: ${data.wind_degrees}°`;
    windSpeed.textContent = `Wind Speed: ${data.wind_speed} m/s`;
};

function capitalizeFirstLetter(str) {
    if (!str) return ''; // Handle empty or undefined strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

const getWeather = async (lat, lon) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2df167f344mshd8f3aa0993f9933p193bd7jsne36091bdc86d',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${lat}&lon=${lon}`, options);
        const data = await response.json();
        updateWeatherData(data);
        // return data;
        console.log(data);

        // return data; // Return the data if you want to use it outside the function
    } catch (err) {
        console.error(err);
    }
};

const getCoordinates = async (address) => {
    const apiKey = 'AIzaSyCOXRl57l8E01pvzhE_V9j-7trcnaB0xAw'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
            return location; // Return the latitude and longitude
        } else {
            console.error(`Error: ${data.status} - ${data.error_message}`);
        }
    } catch (err) {
        console.error('Error fetching geocoding data:', err);
    }
};

// Example usage
(async () => {
    const address = 'Kolkata'; // Replace with your desired city
    const coordinates = await getCoordinates(address);

    if (coordinates) {
        console.log(`Coordinates of ${address}:`, coordinates);
    }
})();


// Example usage

let form = document.querySelector('form');
let header = document.querySelector('.header');



form.addEventListener('submit', async function main (e) {
    e.preventDefault();
  
    // Get the input value
    let address = document.querySelector('input').value;
    if (address == ""){
        address = "Kolkata";
    }
  
    // Your Google Maps Geocoding API Key
    let apiKeyForGoogleMaps = 'AIzaSyCOXRl57l8E01pvzhE_V9j-7trcnaB0xAw';
  
    // Function to fetch coordinates
    const getCoordinates = async (address) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKeyForGoogleMaps}`
      );
      return await response.json(); // Parse the JSON response
    };
  
    // Fetch coordinates for the given address
    const coordinatesResponse = await getCoordinates(address);
  
    if (coordinatesResponse.status !== "OK") {
      console.error("Failed to fetch coordinates:", coordinatesResponse.status);
      return;
    }
  
    // Extract latitude and longitude
    let lat = coordinatesResponse.results[0].geometry.location.lat;
    let lng = coordinatesResponse.results[0].geometry.location.lng;
    console.log(coordinatesResponse.results[0].address_components[0].long_name);
    let shortName = coordinatesResponse.results[0].address_components[0].long_name;
    // Extract formatted address
    let formattedAddress = coordinatesResponse.results[0].formatted_address;
    

    console.log("Formatted Address:", formattedAddress);
    DateAndTime = await getTimeByLatLon(lat,lng);
    console.log(DateAndTime.time);
    
    // Display address in header
    header.innerText = `Weather of ${shortName}`;
    let maharashtraElement = document.querySelector('.card-header');
    maharashtraElement.textContent = `${formattedAddress} @ ${DateAndTime.time.slice(0,16)}`;
    let cardBody = document.querySelector('.card-body');
    
  
  
  
    // Assuming getWeather is a function to fetch weather data
    let ans = await getWeather(lat, lng);
    console.log("Weather Data:", ans);
    
  });
  



  // Change the text content
//   maharashtraElement.textContent = `${formattedAddress}`;


const getTimeByLatLon = async (lat, lon) => {
    const url = `https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?lat=${lat}&lon=${lon}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2df167f344mshd8f3aa0993f9933p193bd7jsne36091bdc86d',  // Replace with your actual API key
            'x-rapidapi-host': 'world-time-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        // Fetch the time from the API using lat and lon
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the JSON response

        // Return date and time from the result
        return {
            time: result.datetime, // The current time from the API response
            date: result.date       // The current date from the API response
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

// console.log(getTimeByLatLon(22.5743545, 88.3628734));





