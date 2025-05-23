const cities = [
    {name: "Dnipro", lat: 48.45, long: 34.9833}, 
    { name: 'Kyiv', lat: 50.4333, long: 30.5167 },
    { name: 'Kharkiv', lat: 50, long: 36.25 },
    { name: 'Nikopol', lat: 47.5712, long: 34.3964 },
    { name: 'Odessa', lat: 46.4775, long: 30.7326 },
    { name: 'Poltava', lat: 49.5937, long: 34.5407 },
    { name: 'Kaniv', lat: 49.7518, long: 31.46 }];

//const lat = 48.45;
//const long = 34.9833;
const apiKey = '25de84a881d9a19a308d080d5ef5ccfb';

function feachWeather(lat, long) {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`) //`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let Towm = data.name;
        let tempCelsius = (data.main.temp - 273.15).toFixed(1);
        let fells_like = (data.main.feels_like - 273.15).toFixed(1);
        let mainWeather = data.weather[0].main;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;
        const weathericonCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${weathericonCode}@2x.png`;

        let weatherBlock = document.getElementById("weather_block_div");
        weatherBlock.innerHTML = `
        <button class="button_ChangeWeatherTown" id='button_ChangeWeatherTown'><span class="span_WeatherTownChange">...</span></button>
        <p>${Towm}</p>
        <h1>${tempCelsius} <h2>${fells_like}<h2/></h1>
        <img src="${iconURL}"; />
        <h2>Weather: ${mainWeather}</h2>
        <h2>Humidity: ${humidity}</h2>
        <h2>Wind: ${windSpeed}</h2>
    `;

        const changeWeatherButton = document.getElementById('button_ChangeWeatherTown');
        const cityChangeBlock = document.getElementById('cityChangeBlock');
        changeWeatherButton.addEventListener('click', () => {
            document.querySelectorAll('.cityList').forEach(div => {
                div.style.display = 'none';
            });
            let existul = document.getElementById('cityListId');
            if (existul) {
                existul.style.display = 'flex';
                cityChangeBlock.style.display = 'flex';
            } else {
                const ul = document.createElement('ul');
                ul.className = 'cityList'; // для стилей и проверки
                ul.id = 'cityListId';

                cities.forEach(city => {
                    const li = document.createElement('li');
                    const cityBtn = document.createElement('button');
                    cityBtn.textContent = city.name;
                    cityBtn.addEventListener('click', () => {
                        feachWeather(city.lat, city.long);
                        ul.style.display = 'none';
                        cityChangeBlock.style.display = 'none';
                    });
                    li.appendChild(cityBtn);
                    ul.appendChild(li);
                });

                cityChangeBlock.appendChild(ul);
                ul.style.display = 'flex';
                cityChangeBlock.style.display = 'flex';
            }
        });
    });

}

feachWeather(cities[0].lat, cities[0].long);