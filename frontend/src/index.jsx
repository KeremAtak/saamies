import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

// Fetches approximately 6-hour forecast from api by using coordinates
const getForecastFromApi = async (lat, lon) => {
  try {
    const response = await fetch(`${baseURL}/forecast?lat=${lat}&lon=${lon}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
    };
  }

  async componentWillMount() {
    this.getPosition();
    // Must be called on some coordinates at first due to async nature
    this.changeIcon(0, 0);
  }

  // Fetches the coordinates from the browser once given permissions
  async getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.changeIcon(lat, lon);
    }, (error) => {
      console.log(error);
    });
  }

  // Fetches appropriate data to have the image changed
  async changeIcon(lat, lon) {
    const forecastData = await getForecastFromApi(lat, lon);
    const weather = forecastData.weather;
    this.setState({ icon: weather[0].icon.slice(0, -1) });
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        {icon && <img src={`/img/${icon}.svg`} alt="weather" />}
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
