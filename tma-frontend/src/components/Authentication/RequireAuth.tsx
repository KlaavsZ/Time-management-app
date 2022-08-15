import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { USER_ID } from '../../misc/constants';


export const RequireAuth = () => {
  const location = useLocation();
  const currentUserId = Number(localStorage.getItem(USER_ID));
  console.log("user id", currentUserId);

  return currentUserId === 0 ? <Navigate to="/login"/> : <Outlet /> ;
}