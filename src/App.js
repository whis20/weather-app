import React, { useState } from 'react';
import styled from 'styled-components';
import Clock from 'react-live-clock';
import { Switch } from 'antd';
import moment from 'moment';
import 'moment-timezone';
var ReactFitText = require('react-fittext');

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  margin-left:20px;
  padding: 20px 0;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 500;
  color:white;
  transition: 0.3s 1.4s;
  opacity: 0.8;
`;

const api = {
  key: "39e981204a973302ee09996a6c666301",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)  ////inits=matric for Celsius.
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    console.log(typeof weather.weather[0].icon.charAt(2));
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div >
      <div className={
        (typeof weather.main != "undefined") ?
          (
            (weather.main.temp >= 18 && weather.weather[0].icon.charAt(2)==='n')?
            'app warm n':
            (weather.main.temp >= 18 && weather.weather[0].icon.charAt(2)==='d')?
            'app warm d':
            (weather.main.temp < 18 && weather.weather[0].icon.charAt(2)==='n')?
            'app cold n':'app cold d'
          )
          : 'appd'}
      >
        <AppTitle >Weather app</AppTitle>
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
            <div id="clock">
              <ReactFitText compressor={2.5}>
                <h4>
                  <Clock format="h:mm:ss a" interval={1000} ticking={true} />
                </h4>
              </ReactFitText>
            </div>
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <br /><br /><br /><br /><br />
              <div className="weather-box">
                <div id="block_container">

                  <div id="icon">
                    <img
                    alt="icon"
                      src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"}
                    >
                    </img>
                    <br />
                    {weather.weather[0].description}
                  </div>
                  <div className="temp" id="temp">

                    {Math.round(weather.main.temp)}℃
                  <div id="feels">
                      <div className="feel_like">RealFeel {Math.round(weather.main.feels_like)}℃</div>
                      <div className="weather">{weather.weather[0].main}</div>
                    </div>
                  </div>
                </div>
                <br /><br /><br /><br /><br />

              </div>
            </div>
          ) : ('')}
          <div id="footer">
            <div className="feel_like">Made by </div>
            <div className="weather">Anurag Sharma</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
