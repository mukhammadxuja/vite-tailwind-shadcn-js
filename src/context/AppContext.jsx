import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserUid(auth.currentUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async () => {
    if (user) {
      setUserLoading(true);
      try {
        const snapshot = await getDoc(doc(db, 'users', userUid));
        setUserData(snapshot.data());
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setUserLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [user]);

  const contextValue = {
    user,
    userData,
    setUserData,
    loading,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
