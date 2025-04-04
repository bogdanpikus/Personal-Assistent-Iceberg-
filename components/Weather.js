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
        let fells_like = (data.main.feels_like - 273.15).toFixed(1);
        let mainWeather = data.weather[0].main;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;
        const weathericonCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${weathericonCode}@2x.png`;

        let weatherBlock = document.getElementById("weather_block_div");
        weatherBlock.innerHTML = `
        <button class="button_ChangeWeatherTown"><span class="span_WeatherTownChange">...</span></button>
        <p>${Towm}</p>
        <h1>${tempCelsius} <h2>${fells_like}<h2/></h1>
        <img src="${iconURL}"; />
        <h2>Weather: ${mainWeather}</h2>
        <h2>Humidity: ${humidity}</h2>
        <h2>Wind: ${windSpeed}</h2>
    `;

        console.log(Towm);
        console.log(tempCelsius);
        console.log(weathericonCode);
        console.log(iconURL);
        console.log(mainWeather);
    });