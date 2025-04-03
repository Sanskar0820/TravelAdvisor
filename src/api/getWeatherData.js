import axios from 'axios';

export const getWeatherData = async (lat, lon) => {
  try {
    const API_KEY = process.env.REACT_APP_TOMORROW_API_KEY;

    const { data } = await axios.get(`https://api.tomorrow.io/v4/weather/realtime`, {
      params: {
        location: `${lat},${lon}`,
        apikey: API_KEY,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
