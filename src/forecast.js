var request = require('request');
var cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

const forecast = (address, callback) => {
  console.log('forecast.js');
  nightmare
    .goto('https://darksky.net/forecast/32.0809,34.7806/si12/en')
    // Clear the search form
    .evaluate(
      () =>
        (document.querySelector('#searchForm > input[type=text]').value = '')
    )
    // Insert desirble location to the search form
    .insert('#searchForm > input[type=text]', address)
    // Clich the search button
    .click('#searchForm > a.searchButton')
    .wait(3000)
    .url()
    .then(url => {
      console.log('url: ', url);

      request(url, (error, response, html) => {
        if (error || response.statusCode !== 200) {
          callback('Unable to connect to weather services ', undefined);
          console.log('error', error);
          console.log('response.statusCode', response.statusCode);
        } else {
          const $ = cheerio.load(html);
          //#title > span.currently > span.desc.swap > span.summary.swap
          const temprature = $(
            'span.currently > span.desc.swap > span.summary.swap'
          ).text();

          //#title > span.currently > span.partly-cloudy-day-icon-currently.currently-icon.swip > img
          const icon = $('span.currently')
            .find('img')
            .attr('src');
          //#currentDetails > div.wind > span.val.swap > span.num.swip.wind__speed__value
          const wind = $(
            'div.wind >span.val.swap > span.num.swip.wind__speed__value'
          ).text();

          //#currentDetails > div.humidity > span.val.swap > span.num.swip.humidity__value
          const humidity = $(
            'div.humidity > span.val.swap > span.num.swip.humidity__value'
          ).text();

          const cityName = $('searchForm > input[type=text]').val();
          // console.log(cityName + ' is the cityName');

          const result = {
            temprature: temprature,
            icon: icon,
            wind: wind,
            humidity: humidity
          };

          callback(undefined, result);

          console.log(' ---- FOR DEBUG ----');
          console.log('temprature:', temprature);
          console.log('icon:', icon);
          console.log('wind:', wind);
          console.log('humidity:', humidity);
          console.log('--------------------');
        }
      });
    });
  // .end();
};

module.exports = forecast;
