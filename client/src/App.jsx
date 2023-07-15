import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardData from './pages/users/DashboardData';
import EditContent from './components/EditContent';
import { AdminRoute } from './components/Navigation/AdminRoute';
import NavBar from './components/Navigation/NavBar';
import { ProtectedRouter } from './components/Navigation/ProtectedRoutes';
import NotAdmin from './components/NotAdmin';
import Home from './pages/Home';
import AddExpense from './pages/expense/AddExpense';
import ExpensesList from './pages/expense/ExpensesList';
import AddIncome from './pages/income/AddIncome';
import IncomeList from './pages/income/IncomeList';
import Login from './pages/users/Login';
import Profile from './pages/users/Profile';
import Register from './pages/users/Register';
import UserProfileExpList from './pages/users/UserProfileExpList';
import UserProfileIncList from './pages/users/UserProfileIncList';
import UpdateProfile from './pages/users/UpdateProfile';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index path='/' element={<Home />} />

        <Route path='/not-found' element={<NotAdmin />} />
        <Route element={<ProtectedRouter />}>
          <Route element={<AdminRoute />}>
            <Route path='/dashboard' element={<DashboardData />} />
          </Route>

          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/add-expense' element={<AddExpense />} />
          <Route path='/add-income' element={<AddIncome />} />
          <Route path='/expenses' element={<ExpensesList />} />
          <Route path='/incomes' element={<IncomeList />} />
          <Route path='/edit' element={<EditContent />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user-expenses' element={<UserProfileExpList />} />
          <Route path='/user-income' element={<UserProfileIncList />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
