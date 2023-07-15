import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { checkAuth } from '../../redux/slices/users/usersSlice';

export const ProtectedRouter = () => {
  const userAuth = useSelector(checkAuth);
  if (!userAuth) return <Navigate to={'/login'} />;
  return <Outlet />;
};
