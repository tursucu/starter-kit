import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../queries';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER);

  return (
    <AuthContext.Provider
      value={{
        data,
        loading,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
