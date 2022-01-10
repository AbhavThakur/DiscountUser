import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signOut: async () => {
          try {
            firestore()
              .collection('Discountusers')
              .doc(auth().currentUser.uid)
              .delete()
              .then(() => {
                auth().currentUser.delete();
              });

            auth().signOut();
            setUser(false);
          } catch (error) {
            console.error(error);
          }
        },
        logout: async () => {
          try {
            auth().signOut();
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
