import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, logout } from '../../redux/slices/users/usersSlice';

const NavBar = () => {
  const isAuth = useSelector(checkAuth);
  const dispatch = useDispatch();
  return (
    <>
      {' '}
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            <i class='bi bi-currency-dollar fs-1 text-warning'></i>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            {isAuth && (
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link to='/' className='nav-link active'>
                    Главная
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/expenses' className='nav-link active'>
                    Список расходов
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to='/incomes' className='nav-link active'>
                    Список доходов
                  </Link>
                </li>

                <li className='nav-item mb-2'>
                  <Link to='/dashboard' className='btn  btn-outline-warning me-2'>
                    Управление
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/profile' className='btn  btn-outline-primary me-2'>
                    Профиль
                  </Link>
                </li>
              </ul>
            )}
            <div className='d-flex mx-auto'>
              {isAuth && (
                <>
                  <Link to='/add-expense' className='btn btn-danger me-2'>
                    Расходы
                  </Link>
                  <Link to='/add-income' className='btn btn-success me-2'>
                    Доходы
                  </Link>
                </>
              )}
              {isAuth ? (
                <button onClick={() => dispatch(logout())} className='btn btn-warning me-2'>
                  Выйти
                </button>
              ) : (
                <>
                  <Link to='/login' className='btn btn-primary me-2'>
                    Логин
                  </Link>
                  <Link to='/register' className='btn btn-primary'>
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
