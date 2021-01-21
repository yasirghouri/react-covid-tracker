import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import Infobox from "./Infobox/Infobox";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country, idx) => {
              return (
                <MenuItem key={idx} value={country.value}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <Infobox title="Coronavirus Cases" cases={123} total={32131} />
        <Infobox title="Recovered" cases={321} total={12331} />
        <Infobox title="Deaths" cases={412} total={44122} />
      </div>
    </div>
  );
}

export default App;
