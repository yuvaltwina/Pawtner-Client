import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './SelectButton.css';
import { capitalizeOnlyFirstChars } from '../../../utils/data/functions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks(allProps: any) {
  const { preferencesList, onChange, category, valuesArray } = allProps;
  return (
    <div>
      <FormControl className="select-button-container">
        <InputLabel>{capitalizeOnlyFirstChars(category)}</InputLabel>
        <Select
          multiple
          value={preferencesList[category]}
          onChange={(event) => onChange(event.target.value, category)}
          input={<OutlinedInput label={category} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {valuesArray.map((value: string) => (
            <MenuItem key={value} value={value}>
              <Checkbox
                checked={preferencesList[category].indexOf(value) > -1}
              />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
