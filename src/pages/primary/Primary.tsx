import './Primary.css';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import {
  SingleDogFullData,
  filterDataInitialObjectType,
} from '../../utils/types/type';
import { dogFavoriteAction, fetchAllDogs } from '../../utils/data/functions';
import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { SELECT_BUTTONS_DATA } from '../../utils/data/data';
import SelectButtonList from '../../components/selectButtons/selectButtonList/SelectButtonList';
import { useGlobalContext } from '../../hooks/useContext';
import { useQuery } from 'react-query';
import { useGetFetchQuery } from '../../hooks/queryCustomHooks/get/useGetFetchQuery';

const DOG_HEADER_TITLE_TEXT = 'Find your new best friend';
const DOG_HEADER_SUBTITLE_TEXT =
  'browse dogs from our network and find your new buddy';
const DOG_PREFENCES_HEADLINE_TEXT = 'What are you looking for ?';
const DOG_CARDS_HEADLINE_TEXT = 'Dogs Available for ';
const FAILED_TO_FETCH_DOGS = 'Failed to fetch dogs';
const LOADING_DOGS_MESSAGE = 'Loading...';
//להוסיף מינימום גודל מבחינת עיצוב לכלבים למקרה שזה לא מוצא בחחיפוש
//conditional loading , dont load all the dogs at once
// כשמשנים את הרוחב של העמוד זה מתרנדר לאט למה והאם יש איך לשפר
//לשפר את המהירות של הלחיצה על הברייד האם אפשר לעשות את זה לפני ?
//לעשות HIGH OREDER COMPONENT ולהזיז את הלב מהעמוד הראשי לקומפנונט ראשי
const filterDataInitialObject: filterDataInitialObjectType = {
  breed: [],
  gender: [],
  size: [],
  age: [],
  city: [],
};

type keyType = keyof filterDataInitialObjectType;

export function Primary() {
  const [filterData, setFilterData] = useState(filterDataInitialObject);
  const [filteredDogs, setFilteredDogs] = useState<SingleDogFullData[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);

  const {
    userDetails: { username },
  } = useGlobalContext();

  const { data, isError, isLoading } = useQuery(['allDogs'], fetchAllDogs);
  const allDogs: SingleDogFullData[] = data?.data?.data?.dogs;
  //האם חייב יוז אפקט
  useEffect(() => {
    if (!allDogs) {
      return;
    }
    setFilteredDogs(allDogs); //לשנות את זה לקחת את הפייבוריט דוגס מהקוורי
    const favoriteDogsFiltered = allDogs.filter((dog: SingleDogFullData) =>
      dog.likedBy.includes(username)
    );
    const favoriteDogsIds = favoriteDogsFiltered.map(
      (dog: SingleDogFullData) => dog._id
    );
    setFavoriteDogs(favoriteDogsIds);
  }, [setFilteredDogs, allDogs]);

  const filterDogsOnChange = (
    updatedFilterData: filterDataInitialObjectType
  ) => {
    if (!allDogs) {
      return;
    }
    const filteredArr = allDogs.filter((dog) => {
      let isPassing = false;
      for (const key in updatedFilterData) {
        isPassing =
          updatedFilterData[key as keyType].includes(dog[key as keyType]) ||
          updatedFilterData[key as keyType].length === 0;
        if (isPassing === false) {
          return isPassing;
        }
      }
      return isPassing;
    });
    setFilteredDogs(filteredArr);
  };

  const onChange = (value: string[] | string, category: string) => {
    let updatedFilterData: filterDataInitialObjectType = filterData;
    if (Array.isArray(value)) {
      updatedFilterData = { ...filterData, [category]: value };
      setFilterData(updatedFilterData);
    }
    if (typeof value === 'string') {
      updatedFilterData = {
        ...filterData,
        [category]: typeof value === 'string' ? value.split(',') : value,
      };
      setFilterData(updatedFilterData);
    }
    filterDogsOnChange(updatedFilterData);
  };

  const getBreedsQuery = useGetFetchQuery('breeds');
  const dogBreedsArray = getBreedsQuery?.data?.data;
  const dogBreedsNamesArray: string[] = dogBreedsArray
    ? dogBreedsArray.map((breed: any) => breed?.name)
    : [];

  const selectButtonsData = [
    ...SELECT_BUTTONS_DATA,
    {
      category: 'breed',
      valuesArray: dogBreedsNamesArray,
    },
  ];
  //לשנות למיוטיישנס
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

  const displayDogCards = () => {
    if (isLoading) {
      return <h1>{LOADING_DOGS_MESSAGE}</h1>;
    }
    return isError ? (
      <h1>{FAILED_TO_FETCH_DOGS}</h1>
    ) : (
      <div className="dogs-cards-container">{displayCards}</div>
    );
  };
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
            onChange={onChange}
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
        {displayDogCards()}
      </section>
    </div>
  );
}

export default Primary;
