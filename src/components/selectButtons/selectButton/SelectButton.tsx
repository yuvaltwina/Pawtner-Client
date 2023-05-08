import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./SelectButton.css";
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
  const { preferencesList, setPreferencesList, category, valuesArray } =
    allProps;

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPreferencesList((prev: any) => ({
      ...prev,
      [category]: typeof value === "string" ? value.split(",") : value,
    }));
    // On autofill we get a stringified value.
  };

  return (
    <div>
      <FormControl className="select-button-container">
        <InputLabel id="demo-multiple-checkbox-label">{category}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={preferencesList[category]}
          onChange={handleChange}
          input={<OutlinedInput label={category} />}
          renderValue={(selected) => selected.join(", ")}
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
