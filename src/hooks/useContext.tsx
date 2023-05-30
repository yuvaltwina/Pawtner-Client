import axios from 'axios';
import Cookies from 'js-cookie';
import React, {
  useEffect,
  useCallback,
  useContext,
  ReactNode,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import { SERVER_URL } from '../utils/data/data';
import { SingleDogFullData } from '../utils/types/type';
import { fetchDogsArray } from '../utils/data/functions';
interface IAppContext {
  userDetails: {
    username: string;
    email: string;
    phoneNumber: string;
    isLoggedIn: boolean;
  };
  setUserDetails: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      phoneNumber: string;
      isLoggedIn: boolean;
    }>
  >;
  allDogsArray: SingleDogFullData[];
  setAllDogsArray: React.Dispatch<React.SetStateAction<SingleDogFullData[]>>;
}
const AppContext = React.createContext<IAppContext>({
  userDetails: {
    username: '',
    email: '',
    phoneNumber: '',
    isLoggedIn: false,
  },
  setUserDetails: () => {},
  allDogsArray: [],
  setAllDogsArray: () => {},
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    isLoggedIn: false,
  });
  const [allDogsArray, setAllDogsArray] = useState<SingleDogFullData[]>([]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getDogs = async () => {
      console.log('fetch all dogs array from context');
      const serverLastRoute = 'getAllDogs';
      const arrayOfDogs = await fetchDogsArray(serverLastRoute, source);
      if (!arrayOfDogs) {
        toast.error('Something went wrong');
        return;
      }
      setAllDogsArray(arrayOfDogs);
    };
    getDogs();
    return () => {
      source.cancel();
    };
  }, [setAllDogsArray]);

  useEffect(() => {
    const verifiedCookie = Cookies.get('verified');
    if (verifiedCookie) {
      if (verifiedCookie === 'Successfully verified') {
        toast.success(verifiedCookie);
      } else {
        verifiedCookie && toast.error(verifiedCookie);
      }
      Cookies.remove('verified');
    }
    let source = axios.CancelToken.source();
    const checkLoginCookie = async () => {
      const loginToken = Cookies.get('login');
      if (loginToken) {
        try {
          const loginResponse = await axios.get(
            SERVER_URL + '/user/loginCookie',
            {
              cancelToken: source.token,
              withCredentials: true,
            }
          );
          const resMessage = loginResponse.data?.message;
          if (resMessage === 'User exist') {
            const { phoneNumber, username, email } = loginResponse.data?.data;
            setUserDetails({
              username,
              email,
              phoneNumber,
              isLoggedIn: true,
            });
          }
        } catch (err) {} //should i handle the error diffrently?
      }
    };
    checkLoginCookie();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
        allDogsArray,
        setAllDogsArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
