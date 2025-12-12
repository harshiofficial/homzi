import React, { createContext, useContext, useState, useCallback } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
          setUserLocation({ latitude: 28.6139, longitude: 77.2090 });
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      setUserLocation({ latitude: 28.6139, longitude: 77.2090 });
    }
  }, []);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const getNearbyServiceCenters = useCallback((serviceCenters, maxDistance = 10) => {
    if (!userLocation) return serviceCenters;

    const centersWithDistance = serviceCenters.map(center => ({
      ...center,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        center.latitude,
        center.longitude
      )
    }));

    return centersWithDistance
      .filter(center => center.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation, calculateDistance]);

  const value = {
    userLocation,
    selectedArea,
    loading,
    error,
    getUserLocation,
    setSelectedArea,
    calculateDistance,
    getNearbyServiceCenters
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};
