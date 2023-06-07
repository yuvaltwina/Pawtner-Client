import './favorites.css';

import { useEffect, useState } from 'react';

import Card from '../../components/card/Card';
import { MdFavorite } from 'react-icons/md';
import { SERVER_URL } from '../../utils/data/data';
import { SingleDogFullData } from '../../utils/types/type';
import axios from 'axios';
import { dogFavoriteAction } from '../../utils/data/functions';
import { toast } from 'react-hot-toast';

//add a window in this page
export function Favorites() {
  const [favoriteDogs, setFavoriteDogs] = useState<SingleDogFullData[]>([]);
  //להעביר מקום
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getDogs = async () => {
      try {
        const serverResponse = await axios.get(
          SERVER_URL + `/dog/getFavoriteDogs`,
          {
            withCredentials: true,
            cancelToken: source.token,
          }
        );
        const resMessage = serverResponse.data?.message;
        if (resMessage === 'favorite dogs sent successfully') {
          const favoriteDogsArray = serverResponse?.data?.data;
          setFavoriteDogs(favoriteDogsArray);
        }
      } catch (err: any) {
        if (err?.response?.data?.message === 'unauthorized') {
          toast.error('Unauthorized');
          return;
        }
        if (err.message !== 'canceled') {
          console.log(err);
          toast.error('Something went wrong please try again later');
          return;
        }
      }
    };
    getDogs();
    return () => {
      source.cancel();
    };
  }, [setFavoriteDogs]);

  const favoriteClickHandler = (favoriteDogId: string) => {
    const afterRemoveFavorite = favoriteDogs.filter(
      (dog) => dog._id !== favoriteDogId
    );
    setFavoriteDogs(afterRemoveFavorite);
    dogFavoriteAction(favoriteDogId, 'delete');
  };

  const displayCards = favoriteDogs.map((favoriteDog) => {
    if (!favoriteDog._id) {
      return;
    }
    return (
      <span className="card-and-icon-container" key={favoriteDog._id}>
        <span
          className="card-favorite-icon"
          onClick={() => {
            favoriteClickHandler(favoriteDog._id);
          }}
        >
          <MdFavorite />
        </span>
        <Card singleDog={favoriteDog}></Card>
      </span>
    );
  });

  return (
    <div className="favorites">
      <section className="favorites-header">
        <h1 className="favorites-header-headline">
          Meet Your Furry Favorites!
        </h1>
        <p className="favorites-header-subtitle">
          Explore the Dogs You've Saved as Favorites
        </p>
      </section>
      <section className="mydogs-dogs">
        <h1 className="mydogs-dogs-headline">
          My Favorites (<span className="headlight">{favoriteDogs.length}</span>
          )
        </h1>
        <div className="mydogs-cards-container"> {displayCards}</div>
      </section>
    </div>
  );
}

export default Favorites;
