const cities = [
  { name: "Dnipro", lat: 48.45, long: 34.9833 },
  { name: "Kyiv", lat: 50.4333, long: 30.5167 },
  { name: "Kharkiv", lat: 50, long: 36.25 },
  { name: "Nikopol", lat: 47.5712, long: 34.3964 },
  { name: "Odessa", lat: 46.4775, long: 30.7326 },
  { name: "Poltava", lat: 49.5937, long: 34.5407 },
  { name: "Kaniv", lat: 49.7518, long: 31.46 },
];

export async function fetchWeather(lat, long) {
  const apiKey = "25de84a881d9a19a308d080d5ef5ccfb";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`,
  );
  if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);
  const data = await response.json();

  return {
    city: data.name,
    temp: (data.main.temp - 273.15).toFixed(1),
    feelsLike: (data.main.feels_like - 273.15).toFixed(1),
    weatherMain: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
}

export { cities };
