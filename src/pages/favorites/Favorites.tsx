import { useState, useEffect } from 'react';
import './favorites.css';
import Card from '../../components/card/Card';
import { dogFavoriteAction } from '../../utils/data/functions';
import { SingleDogFullData } from '../../utils/types/type';
import { MdFavorite } from 'react-icons/md';
import axios from 'axios';
import { SERVER_URL } from '../../utils/data/data';
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
        if (err.message !== 'canceled') {
          toast.error('Something went wrong please try again later');
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
