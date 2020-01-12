const weatherForm1 = document.querySelector('#form1');
const location1 = document.querySelector('#input1');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const temprature1 = document.querySelector('#temprature1');
const humidity1 = document.querySelector('#humidity1');
const windspeed1 = document.querySelector('#windspeed1');
const icon1 = document.querySelector('#icon1');
const loading1 = document.querySelector('#loading1');
const weatherForm2 = document.querySelector('#form2');
const location2 = document.querySelector('#input2');
const temprature2 = document.querySelector('#temprature2');
const humidity2 = document.querySelector('#humidity2');
const windspeed2 = document.querySelector('#windspeed2');
const icon2 = document.querySelector('#icon2');
const loading2 = document.querySelector('#loading2');

const searchOne = e => {
  e.preventDefault();

  loading1.style.display = 'block';
  temprature1.textContent = '';
  humidity1.textContent = '';
  windspeed1.textContent = '';
  btn1.disabled = true;
  btn2.disabled = true;
  const location = location1.value;

  fetch('/weather?location=' + location).then(response => {
    response.json().then(data => {
      console.log(data.forecast);

      if (data.error) {
      } else {
        loading1.style.display = 'none';

        icon1.src = 'https://darksky.net' + data.forecast.icon;
        temprature1.textContent = data.forecast.temprature;
        humidity1.textContent = data.forecast.humidity + '%';
        windspeed1.textContent = data.forecast.wind + 'm/s';
        btn1.disabled = false;
        btn2.disabled = false;
        setTimeout(() => btn1.click(), 10000);
      }
    });
  });
};

const searchTwo = e => {
  e.preventDefault();

  loading2.style.display = 'block';
  temprature2.textContent = '';
  humidity2.textContent = '';
  windspeed2.textContent = '';
  const location = location2.value;
  btn1.disabled = true;
  btn2.disabled = true;
  fetch('/weather?location=' + location).then(response => {
    response.json().then(data => {
      console.log(data.forecast);

      if (data.error) {
      } else {
        loading2.style.display = 'none';

        icon2.src = 'https://darksky.net' + data.forecast.icon;
        temprature2.textContent = data.forecast.temprature;
        humidity2.textContent = data.forecast.humidity + '%';
        windspeed2.textContent = data.forecast.wind + 'm/s';
        btn1.disabled = false;
        btn2.disabled = false;
        setTimeout(() => btn2.click(), 10000);
      }
    });
  });
};

weatherForm1.addEventListener('submit', searchOne);
weatherForm2.addEventListener('submit', searchTwo);
