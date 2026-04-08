// src/App.js - XStates with Crio.do APIs
import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'https://location-selector.labs.crio.do';


function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch countries on initial render
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/countries`);
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async (countryName) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/country=${encodeURIComponent(countryName)}/states`);
      const data = await res.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/country=${encodeURIComponent(countryName)}/state=${encodeURIComponent(stateName)}/cities`);
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle country change
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);
    if (country) {
      fetchStates(country);
    }
  };

  // Handle state change
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    if (state && selectedCountry) {
      fetchCities(selectedCountry, state);
    }
  };

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getDisplayText = () => {
    if (selectedCity && selectedState && selectedCountry) {
      return `You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`;
    }
    return '';
  };

  return (
    <div className="App">
      <h1>XStates: Location Selector</h1>
      <div className="dropdown-container">
        <div className="dropdown-group">
          <label htmlFor="country-select">Select Country:</label>
          <select 
            id="country-select" 
            value={selectedCountry} 
            onChange={handleCountryChange}
            disabled={loading}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option 
                key={country} 
                value={country}
              >
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label htmlFor="state-select">Select State:</label>
          <select 
            id="state-select" 
            value={selectedState} 
            onChange={handleStateChange}
            disabled={!selectedCountry || loading}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option 
                key={state} 
                value={state}
              >
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label htmlFor="city-select">Select City:</label>
          <select 
            id="city-select" 
            value={selectedCity} 
            onChange={handleCityChange}
            disabled={!selectedState || loading}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option 
                key={city} 
                value={city}
              >
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {getDisplayText() && (
        <div className="selection-display">
          <h2>Selected Location:</h2>
          <p>{getDisplayText()}</p>
        </div>
      )}

      {loading && <p className="loading">Loading...</p>}
    </div>
  );
}

export default App;