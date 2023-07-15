import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllExpAction } from '../../redux/slices/expenses/expensesSlices';
import ContentDetails from '../../components/ContentDetails';
import AppPagination from '../../components/AppPagination';
import LoadingComponent from '../../components/Loading';
import ErrorDisplayMessage from '../../components/ErrorDisplayMessage';
const ExpensesList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { expAppErr, expServerErr, expLoading, expensesList } = useSelector(
    (state) => state.expenses,
  );

  useEffect(() => {
    dispatch(fetchAllExpAction(+page));
  }, [dispatch, page, setPage]);


  return (
    <>
      {expLoading ? (
        <LoadingComponent />
      ) : expServerErr || expServerErr ? (
        <ErrorDisplayMessage>
          {expServerErr} {expAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className='py-6'>
          <div className='container-fluid'>
            <div className='position-relative border rounded-2'>
              <a className='position-absolute top-0 end-0 mt-4 me-4' href='#'></a>
              <div className='pt-8 px-8 mb-8'>
                <h6 className='mb-0 fs-3'>Недавние транзакции</h6>
                <p className='mb-0'>Ниже представлена история о ваших транзакциях</p>
                <Link to='/add-expense' className='btn  btn-outline-danger me-2 m-2'>
                  Добавить расходы
                </Link>
              </div>
              <table className='table'>
                <thead>
                  <tr className='table-active'>
                    <th scope='col'>
                      <button className='btn d-flex align-items-centerr text-uppercase'>
                        <small>Пользователь</small>
                      </button>
                    </th>
                    <th scope='col'>
                      <button className='btn d-flex align-items-centerr text-uppercase'>
                        <small>Название</small>
                      </button>
                    </th>
                    <th scope='col'>
                      <button className='btn d-flex align-items-centerr text-uppercase'>
                        <small>Описание</small>
                      </button>
                    </th>
                    <th scope='col'>
                      <button className='btn d-flex align-items-centerr text-uppercase'>
                        <small>Сумма</small>
                      </button>
                    </th>
                    <th scope='col'>
                      <button className='btn d-flex align-items-centerr text-uppercase'>
                        <small>Дата</small>
                      </button>
                    </th>
                    <th scope='col'>
                      <button className='btn d-flex align-items-centerr text-uppercase'>
                        <small>Изменить</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expLoading ? (
                    <h1>Загрузка...</h1>
                  ) : expAppErr || expServerErr ? (
                    <div>Ошибка</div>
                  ) : expensesList?.docs?.length <= 0 ? (
                    <h1>Расходы отсутствуют</h1>
                  ) : (
                    expensesList?.docs?.map((exp) => <ContentDetails item={exp} key={exp._id} />)
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <AppPagination setPage={setPage} pageNumber={expensesList?.totalPages} />
          </div>
        </section>
      )}
    </>
  );
};

export default ExpensesList;
