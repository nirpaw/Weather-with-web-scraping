const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('./forecast');
console.log(__dirname);

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');
const viewsPath = path.join(__dirname, '../templates');

// Set up handlesbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index');
});

app.get('/weather', (req, res) => {
  location = 'sss';
  forecast(location, (error, forecastData) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      forecast: forecastData,
      location: location
    });
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
