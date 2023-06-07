import './Primary.css';

import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import {
  SingleDogFullData,
  filterDataInitialObjectType,
} from '../../utils/types/type';
import { dogFavoriteAction, fetchDogsArray } from '../../utils/data/functions';
import { useEffect, useState } from 'react';

import Card from '../../components/card/Card';
import { SELECT_BUTTONS_DATA } from '../../utils/data/data';
import SelectButtonList from '../../components/selectButtons/selectButtonList/SelectButtonList';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useDogBreeds from '../../hooks/useGetBreeds';
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
//לשפר את המהירות של הלחיצה על הברייד האם אפשר לעשות את זה לפני ?
const filterDataInitialObject: filterDataInitialObjectType = {
  breed: [],
  gender: [],
  size: [],
  age: [],
  city: [],
};

export function Primary() {
  const [allDogs, setAllDogs] = useState<SingleDogFullData[]>([]);
  const [filterData, setFilterData] = useState(filterDataInitialObject);
  const [filteredDogs, setFilteredDogs] = useState<SingleDogFullData[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);
  const {
    userDetails: { username },
  } = useGlobalContext();
  //האם צריך כל כף הרבה יוז אפקט
  //להעביר למקום אחר
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
    setFilteredDogs(allDogs);
    const favoriteDogsFiltered = allDogs.filter((dog) =>
      dog.likedBy.includes(username)
    );
    const favoriteDogsIds = favoriteDogsFiltered.map((dog) => dog._id);
    setFavoriteDogs(favoriteDogsIds);
  }, [setFilteredDogs, allDogs]);

  useEffect(() => {
    // האם חייב לעשות את זה ביוז אפקט
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

  const { dogBreedsArray } = useDogBreeds();
  const dogBreedNamesArray = dogBreedsArray.map(
    (dogBreed: any) => dogBreed?.name
  );

  const selectButtonsData = [
    ...SELECT_BUTTONS_DATA,
    {
      category: 'breed',
      valuesArray: dogBreedNamesArray,
    },
  ];

  const favoriteClickHandler = (dogId: string) => {
    if (favoriteDogs.includes(dogId)) {
      dogFavoriteAction(dogId, 'delete');
      const favoriteDogsDelete = favoriteDogs.filter((id) => id !== dogId);
      setFavoriteDogs(favoriteDogsDelete);
      return;
    }
    dogFavoriteAction(dogId, 'add');
    const favoriteDogsAdd = [...favoriteDogs, dogId];
    setFavoriteDogs(favoriteDogsAdd);
  };

  const displayFavoriteIcon = (dogId: string) => {
    let favoriteIcon = <MdOutlineFavoriteBorder />;
    if (favoriteDogs.includes(dogId)) {
      favoriteIcon = <MdFavorite />;
    }
    return (
      <span
        className="card-favorite-icon"
        onClick={() => {
          favoriteClickHandler(dogId);
        }}
      >
        {favoriteIcon}
      </span>
    );
  };

  const displayCards = filteredDogs.map((singleDog) => {
    return (
      <span className="card-and-icon-container" key={singleDog._id}>
        {displayFavoriteIcon(singleDog._id)}
        <Card singleDog={singleDog}></Card>
      </span>
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
            list={selectButtonsData}
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
