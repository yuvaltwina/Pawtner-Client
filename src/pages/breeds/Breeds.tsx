import React, { useState } from 'react';
import './breeds.css';
import { allBreedsArray } from '../../utils/data/dogBreeds';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

export function Breeds() {
  const [breed, setBreed] = useState('');
  const handleBreedChange = (e: SelectChangeEvent<string>) => {
    setBreed(e.target.value);
  };
  const displayValues = allBreedsArray.map((value) => {
    return (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    );
  });
  return (
    <div className="breeds">
      <section className="breeds-header">
        <div className="breeds-header-box">
          <h1>Find your favorite dog breed</h1>
          <FormControl className="breeds-select-button">
            <InputLabel>{'Breed'}</InputLabel>
            <Select
              value={breed}
              label={'Breed'}
              onChange={handleBreedChange}
              required
            >
              {displayValues}
            </Select>
          </FormControl>
        </div>
      </section>
      {/* <paralax></paralax> */}
      <section className="breeds-info"></section>
    </div>
  );
}

export default Breeds;
