import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction } from '../../redux/slices/users/usersSlice';
import { GraphData } from '../../components/GraphData';
import calcTransaction from '../../utils/accountStatistics';
import UserProfileStats from '../../pages/users/UserProfileStats';
import { useNavigate } from 'react-router-dom';
import dateFormatter from '../../utils/dateFormatter';
import ErrorDisplayMessage from '../../components/ErrorDisplayMessage';
import LoadingComponent from '../../components/Loading';
import manImg from '../../img/man.svg';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, userLoading, userAppErr, userServerErr, isEdit } = useSelector(
    (state) => state?.users,
  );


  //Get income statistics
  const incomeResult = profile?.income && calcTransaction(profile?.income);

  //Get income statistics

  const expenseResult = profile?.expenses && calcTransaction(profile?.expenses);

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  return (
    <>
      {userLoading ? (
        <LoadingComponent />
      ) : userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className='py-5'>
          <div className='container'>
            <div className='position-relative p-8 border rounded-2'>
              <div className='d-flex mb-6 align-items-center p-2'>
                <img
                  className='img-fluid me-4 rounded-2'
                  style={{ height: 150, width: 100 }}
                  src={manImg}
                />
                <div>
                  <h6 className='fw-bold mb-0'>
                    <span>
                      {profile?.firstname} {profile?.lastname}
                    </span>
                    <span className='badge bg-primary-light text-primary'>
                      Количество транзакций: {profile?.expenses?.length + profile?.income?.length}
                    </span>
                  </h6>
                  <p className='mb-0'>{profile?.email}</p>
                  <p className='mb-0'>
                    Дата создания: {profile?.createdAt && dateFormatter(profile?.createdAt)}
                  </p>
                  <button
                    className='btn btn-outline-dark'
                    onClick={() =>
                      navigate('/update-profile', {
                        state: { profile },
                      })
                    }
                  >
                    <span>Редактировать </span>
                    <i class='bi bi-pencil'></i>
                  </button>
                </div>
                {<GraphData income={incomeResult?.sumTotal} expense={expenseResult?.sumTotal} />}
              </div>

              <p className='mb-8'> </p>
              <UserProfileStats
                numOfTransExp={profile?.expenses?.length}
                avgExp={expenseResult?.avg}
                totalExp={expenseResult?.sumTotal}
                minExp={expenseResult?.min}
                maxExp={expenseResult?.max}
                numOfTransInc={profile?.income?.length}
                avgInc={incomeResult?.avg}
                totalInc={incomeResult?.sumTotal}
                minInc={incomeResult?.min}
                maxInc={incomeResult?.max}
              />

              <div className='d-flex align-items-center justify-content-center'>
                <button
                  onClick={() => navigate('/user-expenses')}
                  className='btn me-4 w-100 btn-danger d-flex align-items-center justify-content-center'
                >
                  <span>Показать историю расходов</span>
                </button>
                <button
                  onClick={() => navigate('/user-income')}
                  className='btn w-100 btn-outline-success d-flex align-items-center justify-content-center'
                >
                  <span>Показать историю доходов</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
