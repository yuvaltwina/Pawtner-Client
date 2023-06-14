import { useState } from 'react';
import './myDogs.css';
import AddModal from '../../components/modals/addModal/AddModal';
import Card from '../../components/card/Card';
import { SingleDogFullData } from '../../utils/types/type';
import { fetchMyDogs } from '../../utils/data/functions';
import { useQuery } from 'react-query';
import { useGetFetchQuery } from '../../hooks/queryCustomHooks/get/useGetFetchQuery';

const FETCH_MY_DOGS_ERROR_MESSEAGE =
  "Couldn't fetch dogs please try again later";
const FETCH_MY_DOGS_LOADING_MESSEAGE = 'Loading...';
//לעשות high order component  ברגע שלוחצים על משהו ללא גישה זה מעביר חזרה ללוגין
function MyDogs() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data, isError, isLoading, error } = useQuery(['myDogs'], fetchMyDogs);
  const myDogs: SingleDogFullData[] = data?.data?.data?.dogs;

  const getBreedsQuery = useGetFetchQuery('breeds');
  const dogBreedsArray = getBreedsQuery?.data?.data;
  const dogBreedsNamesArray: string[] = dogBreedsArray
    ? dogBreedsArray.map((breed: any) => breed?.name)
    : [];

  const displayCards = () => {
    if (isError) {
      return (
        <h1 className="mydogs-fetch-error">{FETCH_MY_DOGS_ERROR_MESSEAGE}</h1>
      );
    }
    if (isLoading) {
      return (
        <h1 className="mydogs-fetch-loading">
          {FETCH_MY_DOGS_LOADING_MESSEAGE}
        </h1>
      );
    }

    return myDogs.map((singleDog) => {
      const { _id: id } = singleDog;
      return (
        <span className="card-and-icon-container" key={id}>
          <Card
            singleDog={singleDog}
            needEditAndTrash={true}
            dogsArray={myDogs}
            dogBreedsNamesArray={dogBreedsNamesArray}
          ></Card>
        </span>
      );
    });
  };

  return (
    <>
      {openAddModal && (
        <AddModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          dogBreedsNamesArray={dogBreedsNamesArray}
        />
      )}
      <div className="mydogs">
        <section className="mydogs-header">
          <h1 className="mydogs-header-headline">Share your amazing dogs!</h1>
          <p className="mydogs-header-subtitle">
            so other people will be able to adopt them
          </p>
        </section>
        <section className="mydogs-dogs">
          <h1 className="mydogs-dogs-headline">
            My Dogs (
            <span className="headlight">{myDogs ? myDogs.length : '0'}</span>)
          </h1>
          <div className="mydogs-cards-container">
            <button
              className="mydogs-add"
              onClick={() => {
                setOpenAddModal(true);
              }}
            >
              <span className="mydogs-add-plus">+</span>
            </button>
            {displayCards()}
          </div>
        </section>
      </div>
    </>
  );
}

export default MyDogs;
