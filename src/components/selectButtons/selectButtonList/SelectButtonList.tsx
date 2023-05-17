import { useState } from "react";
import { Category, PrefrencesButtonValuesObj } from "../../../utils/types/type";
import SelectButton from "../selectButton/SelectButton";

//להחליף את האני בטייפ הנכון
const preferencesListInitialObj = (
  list: [
    {
      category: string;
      valuesArray: string[];
    }
  ]
) => {
  const preferencesListInitial = list.reduce(
    (
      preferencesListInitial: PrefrencesButtonValuesObj,
      { category }: Category
    ) => {
      preferencesListInitial[category] = [];
      return preferencesListInitial;
    },
    {}
  );
  return preferencesListInitial;
};

function SelectButtonList({
  divClass,
  spanClass,
  list,
}: {
  divClass: string;
  spanClass: string;
  list: any;
}) {
  const [preferencesList, setPreferencesList] = useState<{}>(
    preferencesListInitialObj(list)
  );

  const displaySelectButtons = list.map(
    (selectbutton: { category: string; valuesArray: string[] }) => {
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
    }
  );
  return <div className={divClass}>{displaySelectButtons}</div>;
}

export default SelectButtonList;
