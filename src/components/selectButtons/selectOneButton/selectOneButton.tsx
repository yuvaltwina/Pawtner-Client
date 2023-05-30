import * as React from 'react';
// import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DogFormData, EditDogFormData } from '../../../utils/types/type';

export default function BasicSelect({
  category,
  valuesArray,
  setData,
  initialValue = '',
}: {
  category: string;
  valuesArray: string[];
  setData: React.Dispatch<React.SetStateAction<DogFormData | EditDogFormData>>;
  initialValue?: string;
}) {
  const [selected, setSelected] = React.useState(initialValue);

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
    setData((prevState: any) => ({
      ...prevState,
      [category]: event.target.value as string,
    }));
  };
  const displayValues = valuesArray.map((value) => {
    return (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    );
  });
  return (
    <FormControl fullWidth>
      <InputLabel>{category.toUpperCase()}</InputLabel>
      <Select
        value={selected}
        label={category.toUpperCase()}
        onChange={handleChange}
        required
      >
        {displayValues}
      </Select>
    </FormControl>
  );
}
