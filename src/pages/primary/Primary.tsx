import { useState, useEffect } from 'react';
import './Primary.css';
import Card from '../../components/card/Card';
import SelectButtonList from '../../components/selectButtons/selectButtonList/SelectButtonList';
import { SELECT_BUTTONS_DATA } from '../../utils/data/data';
import axios, { CancelToken, CancelTokenSource } from 'axios';
import { fetchDogsArray } from '../../utils/data/functions';
import {
  SingleDogFullData,
  filterDataInitialObjectType,
} from '../../utils/types/type';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from '../../hooks/useContext';
const DOG_HEADER_TITLE_TEXT = 'Find your new best friend';
const DOG_HEADER_SUBTITLE_TEXT =
  '   browse dogs from our network and find your new buddy';
const DOG_PREFENCES_HEADLINE_TEXT = 'What are you looking for ?';
const DOG_CARDS_HEADLINE_TEXT = 'Dogs Available for ';
//להוסיף מינימום גודל מבחינת עיצוב לכלבים למקרה שזה לא מוצא בחחיפוש
//conditional loading , dont load all the dogs at once
//לפתור את הבעיה עם הטייפ  סקרפיט
// כשמשנים את הרוחב של העמוד זה מתרנדר לאט למה והאם יש איך לשפר
const filterDataInitialObject: filterDataInitialObjectType = {
  breed: [],
  gender: [],
  size: [],
  age: [],
  city: [],
};

export function Primary() {
  const [filterData, setFilterData] = useState(filterDataInitialObject);
  const [allDogs, setAllDogs] = useState<SingleDogFullData[]>([]);
  const [filteredDogs, setFilteredDogs] = useState<SingleDogFullData[]>([]);
  //להעביר להוק נפרד
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getDogs = async () => {
      const serverLastRoute = 'getAllDogs';
      const arrayOfDogs = await fetchDogsArray(serverLastRoute, source);
      if (!arrayOfDogs) {
        toast.error('Something went wrong');
        return;
      }
      setAllDogs(arrayOfDogs);
      setFilteredDogs(arrayOfDogs);
    };
    getDogs();
    return () => {
      source.cancel();
    };
  }, [setAllDogs, setFilteredDogs]);

  useEffect(() => {
    const filteredArr = allDogs.filter((dog) => {
      let isPassing = false;
      for (const key in filterData) {
        type keyType = keyof filterDataInitialObjectType; // יש דרך יותר טובה לעשות את זה?
        isPassing =
          filterData[key as keyType].includes(dog[key as keyType]) ||
          filterData[key as keyType].length === 0;
        if (isPassing === false) {
          return isPassing;
        }
      }
      return isPassing;
    });
    setFilteredDogs(filteredArr);
  }, [filterData, setFilteredDogs]);

  const displayCards = filteredDogs.map((singleDog) => {
    return (
      <Card
        key={singleDog._id}
        singleDog={singleDog}
        needFavorite={true}
      ></Card>
    );
  });
  const displayHeader = (
    <div className="primary-header">
      <h1 className="primary-header-headline">{DOG_HEADER_TITLE_TEXT}</h1>
      <p className="primary-header-pargraph">{DOG_HEADER_SUBTITLE_TEXT} </p>
    </div>
  );
  return (
    <div className="primary">
      {displayHeader}
      <section className="primary-preferences">
        <h3 className="primary-preferences-headline">
          {DOG_PREFENCES_HEADLINE_TEXT}
        </h3>
        <div className="primary-form">
          <SelectButtonList
            list={SELECT_BUTTONS_DATA}
            setPreferencesList={setFilterData}
            preferencesList={filterData}
          />
        </div>
        <img
          className="primary-preferences-img"
          src="src\utils\images\4253264.png"
        />
      </section>
      <section className="primary-adoption">
        <h1 className="primary-adoption-headline">
          {DOG_CARDS_HEADLINE_TEXT}
          <span className="primary-adoption-headline-headlight">Adoption</span>
        </h1>
        <div className="dogs-cards-container">{displayCards}</div>
      </section>
    </div>
  );
}

export default Primary;

{
  /* <section className="window">
  <img className="window-image" src="src\utils\images\window.avif"></img>
  <div className="window content">hey</div>
</section> */
}
