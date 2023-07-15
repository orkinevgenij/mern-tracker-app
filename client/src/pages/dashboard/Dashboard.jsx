import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardData from '../../components/Dashboard/DashboardData';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, []);

  return (
    <>
      <DashboardData />
    </>
  );
};

export default Dashboard;
