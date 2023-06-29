import './Primary.css';
import {
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdReportGmailerrorred,
} from 'react-icons/md';
import {
  SingleDogFullData,
  filterDataInitialObjectType,
} from '../../utils/types/type';
import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { SELECT_BUTTONS_DATA } from '../../utils/data/data';
import SelectButtonList from '../../components/selectButtons/selectButtonList/SelectButtonList';
import { useGlobalContext } from '../../hooks/useContext';
import { useQueryClient } from 'react-query';
import useGetBreeds from '../../hooks/queryCustomHooks/get/useGetBreeds';
import LoginModal from '../../components/modals/authModal/AuthModal';
import useGetAllDogs from '../../hooks/queryCustomHooks/get/useGetAllDogs';
import useGetFavoriteDogs from '../../hooks/queryCustomHooks/get/useGetFavoriteDogs';
import { toast } from 'react-hot-toast';
import useDeleteMutation from '../../hooks/queryCustomHooks/delete/useDeleteMutation';
import usePostMutation from '../../hooks/queryCustomHooks/post/usePostMutation';
import ReportModal from '../../components/modals/reportModal/ReportModal';
const DOG_HEADER_TITLE_TEXT = 'Find your new best friend';
const DOG_HEADER_SUBTITLE_TEXT =
  'browse dogs from our network and find your new buddy';
const DOG_PREFENCES_HEADLINE_TEXT = 'What are you looking for ?';
const DOG_CARDS_HEADLINE_TEXT = 'Dogs Available for ';
const FAILED_TO_FETCH_DOGS = 'Failed to fetch dogs';
const LOADING_DOGS_MESSAGE = 'Loading...';
//להוסיף מינימום גודל מבחינת עיצוב לכלבים למקרה שזה לא מוצא בחחיפוש
//conditional loading , dont load all the dogs at once
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
  const [favoriteDogsIds, setFavoriteDogsIds] = useState<string[]>([]);
  const [isFavoriteDogsLoaded, setIsFavoriteDogsLoaded] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isReportModal, setIsReportModal] = useState(false);
  const {
    userDetails: { username },
  } = useGlobalContext();

  const isLoggedIn = !!username;
  const { data, isError, isLoading } = useGetAllDogs();
  const allDogs: SingleDogFullData[] = data?.data?.data?.dogs;
  const queryClient = useQueryClient();
  const getFavoriteDogsQuery = useGetFavoriteDogs();
  const favoriteDogs: SingleDogFullData[] =
    getFavoriteDogsQuery.data?.data?.data;
  //לשפר את היוז אפקט ואם אפשר להוריד
  useEffect(() => {
    if (favoriteDogs && !isFavoriteDogsLoaded) {
      const favoriteDogsidsArray = favoriteDogs
        ? favoriteDogs.map((singleDog) => singleDog._id)
        : [];
      setFavoriteDogsIds(favoriteDogsidsArray);
      setIsFavoriteDogsLoaded(true);
    }
    if (!username) {
      setFavoriteDogsIds([]);
    }
  }, [favoriteDogs, setFavoriteDogsIds, username]);

  useEffect(() => {
    if (allDogs) {
      setFilteredDogs(allDogs);
    }
  }, [setFilteredDogs, allDogs]);

  const openReportModalIfAuth = () => {
    if (!isLoggedIn) {
      setIsLoginModal(true);
      return;
    }
    setIsReportModal(true);
  };
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

  const onSucssesFavoriteDogAction = () => {
    queryClient.invalidateQueries(['favoriteDogs'], { exact: true });
  };
  const onErrorFavoriteDogAction = () => {
    toast.error('Something went wrong');
  };
  const { deleteFavoriteMutation } = useDeleteMutation(
    onSucssesFavoriteDogAction,
    onErrorFavoriteDogAction
  );
  const { addFavoriteMutation } = usePostMutation(
    onSucssesFavoriteDogAction,
    onErrorFavoriteDogAction
  );

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

  const getBreedsQuery = useGetBreeds();
  const dogBreedsArray = getBreedsQuery?.data?.data;
  const dogBreedsNamesArray: string[] = dogBreedsArray
    ? dogBreedsArray.map((breed: any) => breed?.name)
    : ["Couldn't fetch breeds"]; // לבדוק שזה לא עושה באג

  const selectButtonsData = [
    ...SELECT_BUTTONS_DATA,
    {
      category: 'breed',
      valuesArray: dogBreedsNamesArray,
    },
  ];

  const favoriteClickHandler = (dogId: string) => {
    if (!isLoggedIn) {
      setIsLoginModal(true);
      return;
    }
    if (favoriteDogsIds.includes(dogId)) {
      const filteredFavoriteDogs = favoriteDogsIds.filter((id) => id !== dogId);
      setFavoriteDogsIds(filteredFavoriteDogs);
      deleteFavoriteMutation.mutate(dogId);
      return;
    }
    favoriteDogsIds.push(dogId);
    setFavoriteDogsIds(favoriteDogsIds);
    addFavoriteMutation.mutate(dogId);
  };

  const displayFavoriteIcon = (dogId: string) => {
    let favoriteIcon = <MdOutlineFavoriteBorder />;
    if (favoriteDogsIds.includes(dogId)) {
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
        <MdReportGmailerrorred
          onClick={openReportModalIfAuth}
          className="primary-report-icon"
        />
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
      <h1 className="primary-failed-fetch-dogs">{FAILED_TO_FETCH_DOGS}</h1>
    ) : (
      <div className="dogs-cards-container">{displayCards}</div>
    );
  };

  return (
    <>
      <ReportModal
        isReportModal={isReportModal}
        setIsReportModal={setIsReportModal}
      />
      <LoginModal
        isLoginModal={isLoginModal}
        setIsLoginModal={setIsLoginModal}
      />
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
            src="./4253264.png"
            alt="Dog"
          />
        </section>
        <section className="primary-adoption">
          <h1 className="primary-adoption-headline">
            {DOG_CARDS_HEADLINE_TEXT}
            <span className="primary-adoption-headline-headlight">
              Adoption
            </span>
          </h1>
          {displayDogCards()}
        </section>
      </div>
    </>
  );
}

export default Primary;
