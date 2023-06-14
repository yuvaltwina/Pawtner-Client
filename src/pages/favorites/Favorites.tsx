import './favorites.css';
import Card from '../../components/card/Card';
import { MdFavorite } from 'react-icons/md';
import { SingleDogFullData } from '../../utils/types/type';
import { LOADING_MESSAGE } from '../../utils/data/data';
import { useGetFetchQuery } from '../../hooks/queryCustomHooks/get/useGetFetchQuery';
import { toast } from 'react-hot-toast';
import useDeleteMutation from '../../hooks/queryCustomHooks/delete/useDeleteMutation';
import { useEffect, useState } from 'react';
const FETCH_FAVORITES_ERROR_MESSEAGE =
  "Couldn't fetch favorite dogs please try again later";

//האם עדיף עם היוז אפקט ולא לבטל את הבקשה כדי לא ליצור מלא רינדורים
export function Favorites() {
  const [favoriteDogs, setFavoriteDogs] = useState<SingleDogFullData[]>([]);

  const { data, isError, isLoading } = useGetFetchQuery('favoriteDogs');
  const favoriteDogsfetchedArray: SingleDogFullData[] = data?.data?.data;
  useEffect(() => {
    setFavoriteDogs(favoriteDogsfetchedArray || []);
  }, [favoriteDogsfetchedArray, setFavoriteDogs]);

  const onSuccsessRemoveFavoriteDog = () => {
    // queryClient.invalidateQueries(['favoriteDogs'], { exact: true });
  };

  const onErrorRemoveFavoriteDog = (error: any) => {
    const serverErrorResponse = error?.response?.data?.message;
    if (serverErrorResponse === 'unauthorized') {
      toast.error('Unauthorized');
    } else {
      toast.error('Something went wrong');
    }
  };
  const deleteFavoriteMutation = useDeleteMutation(
    'deleteFavoriteMutation',
    onSuccsessRemoveFavoriteDog,
    onErrorRemoveFavoriteDog
  );

  const favoriteClickHandler = (favoriteDogId: string) => {
    const afterRemoveFavorite = favoriteDogs.filter(
      (dog) => dog._id !== favoriteDogId
    );
    setFavoriteDogs(afterRemoveFavorite);
    // dogFavoriteAction(favoriteDogId, 'delete');
    deleteFavoriteMutation.mutate(favoriteDogId);
  };

  const displayCards = () => {
    if (isError) {
      return (
        <h1 className="favorite-fetch-error">
          {FETCH_FAVORITES_ERROR_MESSEAGE}
        </h1>
      );
    }
    if (isLoading) {
      return <h1 className="favorite-fetch-loading">{LOADING_MESSAGE}</h1>;
    }
    return favoriteDogs.map((favoriteDog) => {
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
  };

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
          My Favorites (
          <span className="headlight">
            {favoriteDogs ? favoriteDogs.length : '0'}
          </span>
          )
        </h1>
        <div className="mydogs-cards-container"> {displayCards()}</div>
      </section>
    </div>
  );
}

export default Favorites;
