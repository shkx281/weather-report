'use strict';

const state = {
  temp: 50,
  sky: '',
};
const resetCity = () => {
  document.getElementById('city').value = '';
  document.getElementById('inputCity').textContent = 'Seattle';
  document.getElementById('tempContainer').textContent = '°F';
};
///////Temperature Buttons////////////
const addTemp = (event) => {
  // Temp Behavior
  state.temp += 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = `${state.temp}`;
  changeTempColor(state.temp);
  changeLandscape(state.temp);
};
const subtractTemp = (event) => {
  // Temp Behavior
  state.temp -= 1;
  const tempContainer = document.querySelector('#temp');
  tempContainer.textContent = `${state.temp}`;
  changeTempColor(state.temp);
  changeLandscape(state.temp);
};
/////Temp color changes////////
const changeTempColor = (temp) => {
  const tempColor = document.querySelector('#temp');
  if (temp >= 80) {
    document.getElementById('temp').style.color = '#cc3c18';
  } else if (temp >= 70 && temp <= 79) {
    document.getElementById('temp').style.color = '#db7c00';
  } else if (temp >= 60 && temp <= 69) {
    document.getElementById('temp').style.color = '#609c00';
  } else if (temp >= 50 && temp <= 59) {
    document.getElementById('temp').style.color = '##227846';
  } else if (temp >= 40 && temp <= 49) {
    document.getElementById('temp').style.color = '#1552b3';
  } else {
    document.getElementById('temp').style.color = '#4a3678';
  }
};

const changeSky = () => {
  const skyContainer = document.getElementById('skyContainer');
  state.sky = document.getElementById('skySelect').value;
  if (state.sky == 'Sunny') {
    skyContainer.textContent = '☀️🌅☀️🌅☀️🌅☀️🌅☀️🌅☀️🌅☀️🌅☀️🌅☀️';
  } else if (state.sky == 'Partly Cloudy') {
    skyContainer.textContent = '🌤 ☁️🌤 ☁️🌤 ☁️🌤 ☁️🌤 ☁️🌤 ☁️';
  } else if (state.sky == 'Rainy') {
    skyContainer.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦💧⛈🌧🌦';
  } else {
    skyContainer.textContent = '❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨❄️🌨';
  }
};

const changeLandscape = (temp) => {
  const landscapeContainer = document.getElementById('landscapeContainer');
  landscapeContainer.textContent = state.landscape;
  if (temp >= 80) {
    landscapeContainer.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70 && temp <= 79) {
    landscapeContainer.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60 && temp <= 69) {
    landscapeContainer.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else {
    landscapeContainer.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeCity = (event) => {
  const inputCity = document.getElementById('inputCity');
  inputCity.textContent = document.getElementById('city').value;
  let cityLat;
  let cityLon;
  let cityTemp;

  axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: inputCity.textContent,
      },
    })
    .then((response) => {
      const searchResult = response.data[0];
      console.log(response);
      cityLat = searchResult.lat;
      cityLon = searchResult.lon;

      axios
        .get('http://127.0.0.1:5000/weather', {
          params: {
            lat: cityLat,
            lon: cityLon,
          },
        })
        .then((response) => {
          const searchResult2 = response.data;
          cityTemp = searchResult2.current.temp;
          const tempContainer = document.getElementById('tempContainer');
          tempContainer.textContent = `${cityTemp} °F`;
        })
        .catch((error) => {
          console.log('error!', error.response.status);
        });
    })
    .catch((error) => {
      console.log('error!', error.response.status);
    });
};

const registerEventHandlers = (event) => {
  const upButton = document.querySelector('#upButton');
  upButton.addEventListener('click', addTemp);
  const downButton = document.querySelector('#downButton');
  downButton.addEventListener('click', subtractTemp);
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', changeCity);
  const skySelect = document.getElementById('skySelect');
  skySelect.addEventListener('change', changeSky);
  const resetButton = document.querySelector('#resetButton');
  resetButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
