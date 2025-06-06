const cities = [
    {name: "Dnipro", lat: 48.45, long: 34.9833}, 
    { name: 'Kyiv', lat: 50.4333, long: 30.5167 },
    { name: 'Kharkiv', lat: 50, long: 36.25 },
    { name: 'Nikopol', lat: 47.5712, long: 34.3964 },
    { name: 'Odessa', lat: 46.4775, long: 30.7326 },
    { name: 'Poltava', lat: 49.5937, long: 34.5407 },
    { name: 'Kaniv', lat: 49.7518, long: 31.46 }];

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
            cityChangeBlock.style.display = 'flex';
            const Contry = document.getElementById('choseContry');
            if (Contry) {
                Contry.remove();
            }
            const choseContry = document.createElement('div');
            choseContry.classList.add('choseContry');
            choseContry.id = 'choseContry';
            const ul = document.createElement('ul');
            ul.classList.add('choseContry_ul');
            ul.id = 'choseContry_ul';
            ul.innerText = 'Chose your contry...';
            const li = document.createElement('li');
            li.innerText = 'Ukraine';
            li.classList.add('choseContry_li');
            li.id = 'choseContry_li';
            const img = document.createElement('img');
            img.src = 'https://flagcdn.com/w320/ua.png';
            img.style.height = '30px';
            img.style.width = '30px';
            img.style.float = 'right';
            img.style.margin = '2%';
            cityChangeBlock.appendChild(choseContry);
            choseContry.appendChild(ul);
            choseContry.appendChild(li);
            li.appendChild(img);
            li.addEventListener('click', () => {
                choseContry.remove();
                document.querySelectorAll('.cityList').forEach(div => {
                    div.style.display = 'none';
                });
                let existul = document.getElementById('cityListId');
                if (existul) {
                    existul.style.display = 'flex';
                    cityChangeBlock.style.display = 'flex';
                } else {
                    const ul = document.createElement('ul');
                    ul.className = 'cityList';
                    ul.id = 'cityListId';
                    const div = document.createElement('div');
                    div.classList.add('cityList_div');

                    cities.forEach(city => {
                        const li = document.createElement('li');
                        li.classList.add('cityList_li');
                        const cityBtn = document.createElement('button');
                        const h = document.createElement('h3');
                        h.textContent = city.name;
                        const span = document.createElement('span');
                        cityBtn.addEventListener('click', () => {
                            feachWeather(city.lat, city.long);
                            ul.style.display = 'none';
                            cityChangeBlock.style.display = 'none';
                            div.remove();
                        });
                        ul.appendChild(li);
                        li.appendChild(cityBtn);
                        cityBtn.appendChild(h);
                        cityBtn.appendChild(span);
                    });
                    cityChangeBlock.appendChild(div);
                    div.appendChild(ul);
                    ul.style.display = 'flex';
                    cityChangeBlock.style.display = 'flex';
                }
            });
        });
    });

}
$(document).on("click", "#choseContry_ul", function () {
    $("#choseContry_li").slideToggle("fast");
});
feachWeather(cities[0].lat, cities[0].long);