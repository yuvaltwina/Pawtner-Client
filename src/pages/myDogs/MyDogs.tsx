import { useState, useEffect } from 'react';
import './myDogs.css';
import AddModal from '../../components/modals/addModal/AddModal';
import Card from '../../components/card/Card';
import { SingleDogFullData } from '../../utils/types/type';
import axios from 'axios';
import { fetchDogsArray } from '../../utils/data/functions';
import useGetBreeds from '../../hooks/useGetBreeds';
/// לתקן את זה שהמספר טלפון ניהיה בלי מקפים
function MyDogs() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [myDogs, setMyDogs] = useState<SingleDogFullData[]>([]);
  //לתקן את הרענון ביצירת כלב
  //להעביר מקום
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getDogs = async () => {
      const serverLastRoute = 'getMyDogs';
      const arrayOfDogs = await fetchDogsArray(serverLastRoute, source);
      if (!arrayOfDogs) {
        return;
      }
      setMyDogs(arrayOfDogs);
    };
    getDogs();
    return () => {
      source.cancel();
    };
  }, [setMyDogs]);
  const { dogBreedsArray } = useGetBreeds();
  const dogBreedsNamesArray =
    dogBreedsArray.length === 0
      ? []
      : dogBreedsArray.map((breed: any) => breed?.name);

  const displayCards = myDogs.map((singleDog) => {
    const { _id: id } = singleDog;
    return (
      <span className="card-and-icon-container" key={id}>
        <Card
          singleDog={singleDog}
          needEditAndTrash={true}
          setDogsArray={setMyDogs}
          dogsArray={myDogs}
          dogBreedsNamesArray={dogBreedsNamesArray}
        ></Card>
      </span>
    );
  });

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
            My Dogs (<span className="headlight">{myDogs.length}</span>)
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
            {displayCards}
          </div>
        </section>
      </div>
    </>
  );
}

export default MyDogs;
