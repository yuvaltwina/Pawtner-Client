import { useState } from 'react';
import { filterDataInitialObjectType } from '../../../utils/types/type';
import SelectButton from '../selectButton/SelectButton';
import { Autocomplete, TextField } from '@mui/material';
import { cityOptions } from '../../../utils/data/cities';

//להחליף את האני בטייפ הנכון

function SelectButtonList({
  list,
  setPreferencesList,
  preferencesList,
}: {
  list: { category: string; valuesArray: string[] }[];
  setPreferencesList: React.Dispatch<
    React.SetStateAction<filterDataInitialObjectType>
  >;
  preferencesList: filterDataInitialObjectType;
}) {
  const cityOnChange = ({
    target: { value, id },
  }: {
    target: { value: string[]; id: string };
  }) => {
    setPreferencesList((prevState) => ({ ...prevState, [id]: value }));
  };
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
            setPreferencesList={setPreferencesList}
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
          value && cityOnChange({ target: { id: 'city', value } });
        }}
        renderInput={(params) => <TextField {...params} label="CITY" />}
      />
    </div>
  );
}

export default SelectButtonList;
