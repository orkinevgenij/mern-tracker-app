import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { checkAuth } from '../../redux/slices/users/usersSlice';

export const AdminRoute = () => {
  const userAuth = useSelector(checkAuth);
  console.log(userAuth?.isAdmin);
  if (!userAuth?.isAdmin) return <Navigate to={'/not-found'} />;

  return <Outlet />;
};
