const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
// This should obviously be hidden in a real project
const appId = process.env.APPID || '50b56dbdeeb900d43f4ba09cf7646056';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

//Fetches data with given latitude and longitude
const fetchForecast = async (lat, lon) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&appid=${appId}&`;
  const response = await fetch(endpoint);
  
  return response ? response.json() : {};
};

//Returns extensive forecast data
router.get('/api/forecast', async (ctx) => {
  const lat = ctx.query.lat
  const lon = ctx.query.lon
  const forecastData = await fetchForecast(lat, lon);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData.list ? forecastData.list[2] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
