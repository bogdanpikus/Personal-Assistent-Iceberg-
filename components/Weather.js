const lat = 48.45;
const long = 34.9833;
const apiKey = '25de84a881d9a19a308d080d5ef5ccfb';

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let Towm = data.name;
        let tempCelsius = (data.main.temp - 273.15).toFixed(1);
        let description = data.weather[0].description;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;

        let weatherBlock = document.getElementById("weather_block_div");
        weatherBlock.innerHTML = `
        <p>${Towm}</p>
        <h2> Temperature: ${tempCelsius}</h2>
        <h2>Weather: ${description}</h2>
        <h2>Humidity: ${humidity}</h2>
        <h2>Wind: ${windSpeed}</h2>
    `;

        console.log(Towm);
        console.log(tempCelsius);
    });