import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';
import { getWeatherData } from '../../api/getWeatherData'; // Import weather API function

const DEFAULT_COORDINATES = { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi, India

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Set default location first
    setCoordinates(DEFAULT_COORDINATES);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude });
        },
        () => {
          console.warn('Location permission denied. Using default location.');
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, [setCoordinates]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (coordinates.lat && coordinates.lng) {
        const data = await getWeatherData(coordinates.lat, coordinates.lng);
        setWeather(data);
      }
    };
    fetchWeather();
  }, [coordinates]);

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          window.scrollTo(0, 0);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({
            ne: { lat: e.marginBounds.ne.lat, lng: e.marginBounds.ne.lng },
            sw: { lat: e.marginBounds.sw.lat, lng: e.marginBounds.sw.lng },
          });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.Rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>

      {/* Weather Widget */}
      {weather && (
        <div className={classes.weatherWidget}>
          <Typography variant="h6">🌤️ Weather Info</Typography>
          <Typography variant="body2">Temp: {weather.data.values.temperature}°C</Typography>
          <Typography variant="body2">Wind: {weather.data.values.windSpeed} m/s</Typography>
          <Typography variant="body2">Condition: {weather.data.values.weatherCode}</Typography>
        </div>
      )}
    </div>
  );
};

export default Map;
