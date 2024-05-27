import { useEffect, useState } from "react";
import "./App.css";

// images
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import clearIconn from "./assets/clearn.png";
import cloudyhIcon from "./assets/cloudy.png";
import cloudyhIconn from "./assets/cloudyn.png";
import drizzleIcon from "./assets/drizzle.png";
import drizzleIconn from "./assets/drizzlen.png";
import humidityIcon from "./assets/humidity.png";
import snowIcon from "./assets/snow.png";
import windyIcon from "./assets/wind.png";
import rainIcon from "./assets/rain.png";
import notfound from "./assets/notfound.png";
import scatteredIcon from "./assets/scattered.png";
import stormIcon from "./assets/storm.png";
import mistIcon from "./assets/fog.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  wind,
  humidity,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windyIcon} alt="humidity" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  let apikey = "12a2701f0bdb3a67da509a9216247eca";
  const [text, setText] = useState("Madurai");
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumi] = useState(0);
  const [cityNotFound, setCityNotFount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIconn,
    "02d": cloudyhIcon,
    "02n": cloudyhIconn,
    "03d": scatteredIcon,
    "03n": cloudyhIconn,
    "04d": drizzleIcon,
    "04n": drizzleIconn,
    "09d": rainIcon,
    "09n": drizzleIconn,
    "10d": rainIcon,
    "10n": drizzleIconn,
    "11d": stormIcon,
    "11n": stormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=970da10a6271abceba5c532186a70a9d&units=Metrics`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFount(true);
        setLoading(false);
        return;
      }
      const kelvin = data.main.temp;
      const celsius = kelvin - 273.15;
      setHumi(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.round(celsius));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherCode] || clearIcon);
      setCityNotFount(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  function handleCity(e) {
    setText(e.target.value);
  }

  const handlekeyDown = (e) => {
    if (e.key == "Enter") {
      search();
    }
  };

  useEffect(function () {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="input-city"
            placeholder="Search city"
            onChange={handleCity}
            value={text}
            onKeyDown={handlekeyDown}
          />
          <div className="search-icon">
            <img src={searchIcon} alt="Search" onClick={search} />
          </div>
        </div>
        {!cityNotFound && !loading && <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          wind={wind}
          humidity={humidity}
        />}
        {loading&&<div className="loading">Loading..</div>}
        {error&&<div className="error-message">{error}</div>}
        {cityNotFound&&<div className="city-not-found">
          <img src={notfound} alt="Not found"/>
          <h3>City not found!!</h3>
          </div>}
      </div>

      <footer className="copyright">
        <p>
          Designed by{" "}
          <span>
            <a href="https://github.com/veeramanijothimurugan">Veeramani</a>
          </span>
        </p>
      </footer>
    </>
  );
}

export default App;
