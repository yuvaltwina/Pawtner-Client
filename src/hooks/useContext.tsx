import Cookies from 'js-cookie';
import React, { useContext, ReactNode, useState } from 'react';
import { userTokenData } from '../utils/types/type';
import { decodeToken } from 'react-jwt';
import { phoneNumberFormating } from '../utils/data/functions';

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
        phoneNumber: phoneNumberFormating(userTokenData.phoneNumber),
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

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState(getUserDetailsInitial());
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
