import { useState } from "react";
import { SELECT_BUTTONS_DATA } from "../../../utils/data/data";
import { Category, PrefrencesButtonValuesObj } from "../../../utils/types/type";
import SelectButton from "../selectButton/SelectButton";

const preferencesListInitialObj = SELECT_BUTTONS_DATA.reduce(
  (
    preferencesListInitial: PrefrencesButtonValuesObj,
    { category }: Category
  ) => {
    preferencesListInitial[category] = [];
    return preferencesListInitial;
  },
  {}
);

function SelectButtonList({
  divClass,
  spanClass,
}: {
  divClass: string;
  spanClass: string;
}) {
  const [preferencesList, setPreferencesList] = useState<{}>(
    preferencesListInitialObj
  );
  const displaySelectButtons = SELECT_BUTTONS_DATA.map((selectbutton) => {
    const {
      category,
      valuesArray,
    }: { category: string; valuesArray: string[] } = selectbutton;
    return (
      <span className={spanClass} key={category}>
        <SelectButton
          allProps={{}}
          preferencesList={preferencesList}
          setPreferencesList={setPreferencesList}
          category={category}
          valuesArray={valuesArray}
        />
      </span>
    );
  });
  return <div className={divClass}>{displaySelectButtons}</div>;
}

export default SelectButtonList;
