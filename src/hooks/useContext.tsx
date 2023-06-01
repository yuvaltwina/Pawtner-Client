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
import { SingleDogFullData, userTokenData } from '../utils/types/type';
import { fetchDogsArray } from '../utils/data/functions';
import { decodeToken, useJwt } from 'react-jwt';

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
}
const getUserDetailsInitial = () => {
  const loginToken = Cookies.get('login');
  let UserDetailsInitialValue = {
    username: '',
    email: '',
    phoneNumber: '',
    isLoggedIn: false,
  };
  if (loginToken) {
    const userTokenData: userTokenData | null = decodeToken(loginToken);
    if (
      userTokenData?.username &&
      userTokenData?.email &&
      userTokenData?.phoneNumber
    ) {
      UserDetailsInitialValue = {
        username: userTokenData.username,
        email: userTokenData.email,
        phoneNumber: userTokenData.phoneNumber,
        isLoggedIn: false,
      };
    }
  }
  return UserDetailsInitialValue;
};
const AppContext = React.createContext<IAppContext>({
  userDetails: getUserDetailsInitial(),
  setUserDetails: () => {},
});
//לתקן את זה שיש פה 2 יוז אפקט
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState(getUserDetailsInitial());
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
  }, [Cookies]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const loginToken = Cookies.get('login');
    if (loginToken) {
      const checkUser = async () => {
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
            setUserDetails((prev) => {
              return {
                ...prev,
                isLoggedIn: true,
              };
            });
          }
        } catch (err) {}
      };
      checkUser();
      return () => {
        source.cancel();
      };
    }
  }, [setUserDetails, Cookies]);

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
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

// }
