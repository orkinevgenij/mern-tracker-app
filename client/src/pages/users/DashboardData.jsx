import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../components/Loading';
import ErrorDisplayMessage from '../../components/ErrorDisplayMessage';
import { fetchAccountStatsAction } from '../../redux/slices/accountsStats/accountStatsSlices';
import { GraphData } from '../../components/GraphData';
import currencyFormatter from '../../utils/currencyFormatter';
ErrorDisplayMessage;
const DashboardData = ({}) => {
  const dispatch = useDispatch();
  const { loading, accountDetails, appErr, serverErr } = useSelector((state) => state.account);
  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section className='py-6'>
          <div className='container'>
            {/* Grpah */}
            <h1
              style={{
                textAlign: 'center',
              }}
            >
              Транзакции
            </h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <GraphData
                expense={accountDetails?.expenseStats[0]?.totalExp}
                income={accountDetails?.incomeStats[0]?.totalInc}
              />
            </div>
            <div style={{ textAlign: 'center', margin: '20px' }}></div>
            <div className='row'>
              <div className='col-12 col-md-6 mb-6'>
                <div className='p-8 border rounded-2'>
                  <div className='d-flex mb-6 align-items-start justify-content-between'>
                    <span
                      className='d-inline-flex align-items-center justify-content-center bg-light-light rounded-2'
                      style={{ width: '40px', height: '40px' }}
                    ></span>
                    <span className='badge fs-2 text-danger'>Общие расходы</span>
                  </div>
                  <h1 className='mb-4'>
                    {currencyFormatter('UAH', accountDetails?.expenseStats[0]?.totalExp)}
                  </h1>
                  <p className='mb-0 px-1'>
                    <span>Количество транзакций</span>
                    <span className='text-danger ms-1'>
                      <span>{accountDetails?.expenseStats[0]?.totalRecordsExp}</span>
                    </span>
                  </p>
                  <p className='mb-0 px-1'>
                    <span>Минимальная транзакция</span>
                    <span className='text-danger ms-1'>
                      <span>
                        {currencyFormatter('UAH', accountDetails?.expenseStats[0]?.minExp)}
                      </span>
                    </span>
                  </p>

                  <p className='mb-0 px-1'>
                    <span>Максимальная транзакция</span>
                    <span className='text-danger ms-1'>
                      <span>
                        {currencyFormatter('UAH', accountDetails?.expenseStats[0]?.maxExp)}
                      </span>
                    </span>
                  </p>

                  <p className='mb-0 px-1'>
                    <span>Средняя сумма транзакций</span>
                    <span className='text-danger ms-1'>
                      <span>
                        {currencyFormatter('UAH', accountDetails?.expenseStats[0]?.averageExp)}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div className='col-12 col-md-6 mb-6'>
                <div className='p-8 border rounded-2'>
                  <div className='d-flex mb-6 align-items-start justify-content-between'>
                    <span
                      className='d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2'
                      style={{ width: '40px', height: '40px' }}
                    ></span>

                    <span className='badge fs-2 bg-primary-light text-primary'>Общие доходы</span>
                  </div>
                  <h1 className='mb-4'>
                    {' '}
                    {currencyFormatter('UAH', accountDetails?.incomeStats[0]?.totalInc)}
                  </h1>

                  <p className='mb-0 px-1'>
                    <span>Количество транзакций</span>
                    <span className='text-primary ms-1'>
                      <span>{accountDetails?.incomeStats[0]?.totalRecordsInc}</span>
                    </span>
                  </p>

                  <p className='mb-0 px-1'>
                    <span>Минимальная транзакция</span>
                    <span className='text-primary ms-1'>
                      <span>
                        {currencyFormatter('UAH', accountDetails?.incomeStats[0]?.minInc)}
                      </span>
                    </span>
                  </p>

                  <p className='mb-0 px-1'>
                    <span>Максимальная транзакция</span>
                    <span className='text-primary ms-1'>
                      <span>
                        {currencyFormatter('UAH', accountDetails?.incomeStats[0]?.maxInc)}
                      </span>
                    </span>
                  </p>

                  <p className='mb-0 px-1'>
                    <span>Средняя сумма транзакций</span>
                    <span className='text-primary ms-1'>
                      <span>
                        {currencyFormatter('UAH', accountDetails?.incomeStats[0]?.averageIncome)}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DashboardData;
