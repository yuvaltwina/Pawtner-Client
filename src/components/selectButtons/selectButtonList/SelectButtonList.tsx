import { useState } from 'react';
import { filterDataInitialObjectType } from '../../../utils/types/type';
import SelectButton from '../selectButton/SelectButton';
import { Autocomplete, TextField } from '@mui/material';
import { cityOptions } from '../../../utils/data/cities';

//להחליף את האני בטייפ הנכון

function SelectButtonList({
  list,
  onChange,
  preferencesList,
}: {
  list: { category: string; valuesArray: string[] }[];
  onChange: (value: string[] | string, category: string) => void;
  preferencesList: filterDataInitialObjectType;
}) {
  const displaySelectButtons = list.map(
    (selectbutton: { category: string; valuesArray: string[] }) => {
      const {
        category,
        valuesArray,
      }: { category: string; valuesArray: string[] } = selectbutton;
      return (
        <span className={'primary-preferences-button'} key={category}>
          <SelectButton
            allProps={{}}
            preferencesList={preferencesList}
            onChange={onChange}
            category={category}
            valuesArray={valuesArray}
          />
        </span>
      );
    }
  );
  return (
    <div className={'primary-preferences-buttons-container'}>
      {displaySelectButtons}
      <Autocomplete
        multiple
        limitTags={1}
        disablePortal
        options={cityOptions}
        value={preferencesList.city || null}
        className={'primary-preferences-button'}
        onChange={(event, value) => {
          value && onChange(value, 'city');
        }}
        renderInput={(params) => <TextField {...params} label="CITY" />}
      />
    </div>
  );
}

export default SelectButtonList;
