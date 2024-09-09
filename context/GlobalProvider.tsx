import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

// Define the type of the context object
interface GlobalContextType {
  isLoggedIn: boolean;
  setIsloggedIn: (isLoggedIn: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsloggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(true);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsloggedIn: setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
