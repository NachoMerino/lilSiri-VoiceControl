import speech from './voiceSynthesizer.js';

let API = '3577128d3a684df83b143feb00e5c7e3';
let fetchWeather = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5//weather?q=${city}&APPID=${API}`)
    .then(res => res.json())
    .then(data => {
      let temperature = Math.floor(data.main.temp - 273.15);
      speech(`The Weather in ${city} is ${temperature} degrees`);
    })
}

export default fetchWeather;
