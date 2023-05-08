import axios from "axios";
import Cookies from "js-cookie";
import React, {
  useEffect,
  useCallback,
  useContext,
  ReactNode,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../utils/data/data";
interface IAppContext {
  userDetails: {
    username: string;
    email: string;
    isLoggedIn: boolean;
  };
  setUserDetails: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      isLoggedIn: boolean;
    }>
  >;
}
const AppContext = React.createContext<IAppContext>({
  userDetails: {
    username: "",
    email: "",
    isLoggedIn: false,
  },
  setUserDetails: () => {},
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    isLoggedIn: false,
  });
  useEffect(() => {
    const verifiedCookie = Cookies.get("verified");
    if (verifiedCookie) {
      if (verifiedCookie === "Successfully verified") {
        toast.success(verifiedCookie);
      } else {
        verifiedCookie && toast.error(verifiedCookie);
      }
      Cookies.remove("verified");
    }
    let source = axios.CancelToken.source();
    const checkLoginCookie = async () => {
      const loginToken = Cookies.get("login");
      if (loginToken) {
        try {
          const loginResponse = await axios.get(
            SERVER_URL + "/user/loginCookie",
            {
              cancelToken: source.token,
              withCredentials: true,
            }
          );
          const resMessage = loginResponse.data?.message;
          if (resMessage === "User exist") {
            const { username, email } = loginResponse.data?.data;
            setUserDetails({ username, email, isLoggedIn: true });
          }
        } catch (err) {
          console.log(err); //need to do something with the err?
        }
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
