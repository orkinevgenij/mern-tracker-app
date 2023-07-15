import { configureStore } from '@reduxjs/toolkit';

import usersSlice from '../slices/users/usersSlice';
import expensesSlices from '../slices/expenses/expensesSlices';
import incomeSlices from '../slices/income/incomeSlices';
import accountStatsSlices from '../slices/accountsStats/accountStatsSlices';
const store = configureStore({
  reducer: {
    users: usersSlice,
    expenses: expensesSlices,
    income: incomeSlices,
    account: accountStatsSlices,
  },
});
export default store;
