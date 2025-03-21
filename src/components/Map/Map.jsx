import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';

const DEFAULT_COORDINATES = { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi, India

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

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
          // Default coordinates remain unchanged if permission is denied
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, [setCoordinates]);

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
          // Prevent the page from scrolling down
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
    </div>
  );
};

export default Map;
