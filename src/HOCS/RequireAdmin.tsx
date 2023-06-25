import React from 'react';
import { useGlobalContext } from '../hooks/useContext';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Navigate } from 'react-router-dom';
function RequireAdmin({ children }: { children: ReactJSXElement }) {
  const {
    userDetails: { username },
  } = useGlobalContext();
  const isAdmin = username === 'Admin';
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default RequireAdmin;
