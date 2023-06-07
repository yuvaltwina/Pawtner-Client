import React, { useState } from 'react';
import './breeds.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import useDogBreeds from '../../hooks/useGetBreeds';
//לשים מאקס וייד בכל האתר
export function Breeds() {
  const [breed, setBreed] = useState('');

  const handleBreedChange = (e: SelectChangeEvent<string>) => {
    setBreed(e.target.value);
  };
  const { dogBreedsArray } = useDogBreeds(); //לעשות את זה ביוז ממו או לשים את זה כסטייט?
  const displayValues = dogBreedsArray.map((value: any) => {
    //לעשות את זה ביוז ממו או לשים את זה כסטייט?
    if (dogBreedsArray.length === 0) {
      return;
    }
    return (
      <MenuItem key={value?.name} value={value?.name}>
        {value?.name}
      </MenuItem>
    );
  });

  const displayHighlightInfo = (category: string, info: string) => {
    return (
      <span>
        {category} : <span className="breeds-info-hightlight">{info}</span>
      </span>
    );
  };

  const displayBreedsInfo = () => {
    if (!breed) {
      return (
        <section className="breeds-info-container">
          <h1 className="breeds-info-title-when-empty">
            Choose your desired breed
          </h1>
        </section>
      );
    }
    const breedInfo = dogBreedsArray.filter(
      (oneBreed: any) => oneBreed?.name === breed
    )[0];
    if (!breedInfo) {
      return <section className="breeds-info-container"></section>;
    }
    console.log(breedInfo);
    return (
      <section className="breeds-info-container">
        <h1 className="breeds-info-title">{breedInfo.name}</h1>
        <div className="breeds-info-data-and-img">
          <div className="breeds-info-data">
            {displayHighlightInfo('Life span', breedInfo.life_span)}
            {displayHighlightInfo('Weight', breedInfo.weight.metric + ' kg')}
            {displayHighlightInfo('Height', breedInfo.height.metric + ' cm')}
            {displayHighlightInfo('Temperament', breedInfo.temperament)}
          </div>
          <span className="breed-info-img-container">
            <img src={breedInfo.image.url} className="breed-info-img" />
          </span>
        </div>
      </section>
    );
  };

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
      {displayBreedsInfo()}
    </div>
  );
}

export default Breeds;
