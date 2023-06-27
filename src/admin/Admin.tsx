import React, { useState, useEffect } from 'react';
import './admin.css';
import TextField from '@mui/material/TextField';
import useGetAllDogs from '../hooks/queryCustomHooks/get/useGetAllDogs';
import { SingleDogFullData } from '../utils/types/type';
import Card from '../components/card/Card';
import { LOADING_MESSAGE } from '../utils/data/data';
import { HiTrash } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import useDeleteMutation from '../hooks/queryCustomHooks/delete/useDeleteMutation';
import { capitalizeOnlyFirstChars } from '../utils/data/functions';

interface onChangePropsType {
  target: { value: string; id: string };
}
function Admin() {
  const [searchData, setSearchData] = useState({
    usernameFilter: '',
    dogIdFilter: '',
  });
  const [filteredDogs, setFilterdDogs] = useState<SingleDogFullData[]>([]);
  const { usernameFilter, dogIdFilter } = searchData;

  const { data, isError, isLoading } = useGetAllDogs();
  const allDogs: SingleDogFullData[] = data?.data?.data?.dogs;

  useEffect(() => {
    setFilterdDogs(allDogs);
  }, [allDogs, setFilterdDogs]);
  useEffect(() => {
    filtering();
  }, [usernameFilter, dogIdFilter, allDogs, setFilterdDogs]);

  const queryClient = useQueryClient();
  const filtering = () => {
    if (allDogs) {
      const filteredArray = allDogs.filter(({ username, _id: dogId }) => {
        return isPassFilters(username, dogId);
      });
      setFilterdDogs(filteredArray);
    }
  };
  const isPassFilters = (username: string, dogId: string) => {
    if (!usernameFilter && !dogIdFilter) {
      return true;
    }
    if (username === usernameFilter && dogId === dogIdFilter) {
      return true;
    }
    if (username === usernameFilter && !dogIdFilter) {
      return true;
    }
    if (!usernameFilter && dogId === dogIdFilter) {
      return true;
    }
    return false;
  };

  const onErrorDeleteDog = (error: any, loadingDogToast: string) => {
    const serverErrorResponse = error?.response?.data?.message;
    if (serverErrorResponse === 'unauthorized') {
      toast.error('Unauthorized', { id: loadingDogToast });
    } else {
      toast.error('Something went wrong', { id: loadingDogToast });
    }
  };

  const onSuccsessDeleteDog = (loadingDogToast: string) => {
    toast.success(`Dog post deleted successfully!`, { id: loadingDogToast });
    queryClient.invalidateQueries(['myDogs'], { exact: true });
    queryClient.invalidateQueries(['allDogs'], { exact: true });

    // closeModal();
  };
  const { adminDeleteDogMutation } = useDeleteMutation(
    onSuccsessDeleteDog,
    onErrorDeleteDog
  );

  const onChange = ({ target: { value, id } }: onChangePropsType) => {
    setSearchData((prev) => {
      let formatedValue;
      if (id === 'usernameFilter') {
        formatedValue = capitalizeOnlyFirstChars(value);
      }
      return { ...prev, [id]: formatedValue ? formatedValue : value };
    });
  };
  const displayDogCards = () => {
    if (isLoading) {
      return <h1>{LOADING_MESSAGE}</h1>;
    }
    if (isError) {
      return <h1>Coudlnt fetch dogs</h1>;
    }
    if (!filteredDogs) {
      return;
    }
    return filteredDogs.map((singleDog: SingleDogFullData) => {
      const { _id: dogId, username } = singleDog;
      return (
        <span className="card-and-icon-container" key={dogId}>
          <HiTrash
            className="admin-trash"
            onClick={() => {
              adminDeleteDogMutation.mutate({ dogId, username });
            }}
          />
          <Card singleDog={singleDog}></Card>
        </span>
      );
    });
  };
  return (
    <div className="admin">
      <h1 className="admin-headline">Admin</h1>
      <section className="admin-search-box">
        <h1 className="admin-search-headline">Search dog posts</h1>
        <form className="admin-search-bar-container">
          <TextField
            id="usernameFilter"
            label="Username"
            variant="outlined"
            autoComplete="true"
            value={usernameFilter}
            onChange={onChange}
          />
          <TextField
            id="dogIdFilter"
            label="Dog Id"
            variant="outlined"
            autoComplete="true"
            value={dogIdFilter}
            onChange={onChange}
          />
        </form>
      </section>
      <section className="admin-dogs">
        <h1 className="admin-dogs-headline">Dog posts</h1>
        <div className="admin-cards-container">{displayDogCards()}</div>
      </section>
    </div>
  );
}

export default Admin;
