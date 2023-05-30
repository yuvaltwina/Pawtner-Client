import { useState, useEffect, useContext } from 'react';
import './favorites.css';
import axios from 'axios';
import Card from '../../components/card/Card';
import { fetchDogsArray } from '../../utils/data/functions';
import { toast } from 'react-hot-toast';
import { SingleDogFullData } from '../../utils/types/type';
import { SERVER_URL } from '../../utils/data/data';
import { useGlobalContext } from '../../hooks/useContext';

//add a window in this page
export function Favorites() {
  const [favoriteDogs, setFavoriteDogs] = useState<SingleDogFullData[]>([]);
  // להעביר להוק נפרד
  //לתקן הבקשה השניה נשלחת ולא מתבטלת בזמן
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
  console.log(favoriteDogs);
  const displayCards = favoriteDogs.map((singleDog) => {
    const { _id: id } = singleDog;
    console.log(id);
    // return (
    //   <Card
    //     key={id}
    //     singleDog={singleDog}
    //     needFavorite={true}
    //     dogsArray={favoriteDogs}
    //     setDogsArray={setFavoriteDogs}
    //   ></Card>
    // );
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
          My Favorites (<span className="headlight">0</span>)
        </h1>
        <div className="mydogs-cards-container"> </div>
      </section>
    </div>
  );
}

export default Favorites;
