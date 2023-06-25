import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useContext';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
function RequireAuth({ children }: { children: ReactJSXElement }) {
  const {
    userDetails: { username },
  } = useGlobalContext();
  const isLoggedIn = !!username;
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default RequireAuth;
