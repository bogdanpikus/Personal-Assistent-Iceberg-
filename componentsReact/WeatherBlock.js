import { useRef, useState, useEffect } from "react";
import { fetchWeather, cities } from "../lib/weather";
import Image from "next/image";

export default function WeatherBlock() {
  const [weather, setWeather] = useState(null);
  const [showCityList, setShowCityList] = useState(false); //начальное состояние false, для отображения городов
  const [showCountryList, setCountryList] = useState(false); //начальное состояние false, для отображния станы на выбор
  const [showCountryItems, setShowCountryItems] = useState(false); // для выпадающего списка
  const weatherBlockRef = useRef(null);
  const cityChangeBlockRef = useRef(null);
  const countyChangeBlockRef = useRef(null);

  useEffect(() => {
    fetchWeather(cities[0].lat, cities[0].long).then(setWeather);
  }, []);

  const toggleWeatherBlock = () => {
    if (weatherBlockRef.current) {
      const currentDisplay = weatherBlockRef.current.style.display;
      weatherBlockRef.current.style.display =
        currentDisplay === "none" || currentDisplay === ""
          ? "inline-block"
          : "none";
    }
  };

  const changeCity = async (city) => {
    const data = await fetchWeather(city.lat, city.long);
    setWeather(data);
    setShowCityList(false);
    if (cityChangeBlockRef.current) {
      cityChangeBlockRef.current.style.display = "none";
    }
    if (countyChangeBlockRef.current) {
      countyChangeBlockRef.current.style.display = "none";
    }
  };

  const openCountryList = () => {
    setCountryList(true);
    if (countyChangeBlockRef.current) {
      countyChangeBlockRef.current.style.display = "flex";
    }
  };

  const openCityList = () => {
    setShowCityList(true); // Показываем блок с городами
    setCountryList(false); // Прячем страну, если нужно
  };

  return (
    <>
      <article className="weather_block" id="weather_block">
        <div className="weather_button_div">
          <button
            className="weather_button"
            id="weather_id_button"
            onClick={toggleWeatherBlock}
          >
            <span>Weather</span>
          </button>
        </div>

        <div
          className="weather_block_div"
          id="weather_block_div"
          ref={weatherBlockRef}
        >
          {weather ? (
            <>
              <button
                onClick={openCountryList}
                className="button_ChangeWeatherTown"
              >
                <span className="span_WeatherTownChange">...</span>
              </button>
              <p>{weather.city}</p>
              <h1>
                {weather.temp}°C{" "}
                <small>Feels like: {weather.feelsLike}°C</small>
              </h1>
              <img src={weather.iconUrl} alt="weather icon" />
              <h2>Weather: {weather.weatherMain}</h2>
              <h2>Humidity: {weather.humidity}%</h2>
              <h2>Wind: {weather.windSpeed} m/s</h2>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </article>

      <div id="cityChangeBlock" ref={countyChangeBlockRef}>
        {showCountryList && (
          <div className="choseContry" id="choseContry">
            <ul
              className="choseContry_ul"
              id="choseContry_ul"
              onClick={() => setShowCountryItems((current) => !current)}
            >
              <span>Chose your contry...</span>
              {showCountryItems && (
                <li
                  className="choseContry_li"
                  id="choseContry_li"
                  onClick={openCityList}
                >
                  Ukraine
                  <Image
                    className="image_UKRAINE"
                    src="https://flagcdn.com/w320/ua.png"
                    alt=""
                    width={30}
                    height={30}
                  />
                </li>
              )}
            </ul>
          </div>
        )}
        {showCityList && (
          <div className="cityList_div">
            <ul className="cityList" id="cityListId">
              {cities.map((city) => (
                <li key={city.name} className="cityList_li">
                  <button onClick={() => changeCity(city)}>
                    <h3>{city.name}</h3>
                    <span></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
