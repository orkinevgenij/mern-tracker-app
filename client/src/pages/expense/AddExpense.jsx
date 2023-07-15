import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import moneySVG from '../../img/money.svg';
import { createExpAction } from '../../redux/slices/expenses/expensesSlices';
import { useNavigate } from 'react-router-dom';
import DisabledButton from '../../components/buttons/DisabledButton';
import ErrorDisplayMessage from '../../components/ErrorDisplayMessage';
const formSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  amount: Yup.number().required('Amount is required'),
});

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expAppErr, expServerErr, expLoading, expensesList } = useSelector(
    (state) => state.expenses,
  );
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      amount: '',
    },
    onSubmit: (values) => {
      dispatch(createExpAction(values));
      navigate('/expenses');
    },
    validationSchema: formSchema,
  });

  return (
    <>
      <section className='py-5 bg-danger vh-100'>
        <div className='container text-center'>
          <a className='d-inline-block mb-5'>
            <img className='img-fluid' src={moneySVG} alt='SVGeXPENSES' width='200' />
          </a>
          <div className='row mb-4'>
            <div className='col-12 col-md-8 col-lg-5 mx-auto'>
              <div className='p-4 shadow-sm rounded bg-white'>
                <form onSubmit={formik.handleSubmit}>
                  <span className='text-muted'>Расходы</span>
                  <h2 className='mb-4 fw-light'>Добавить трату</h2>
                  {expServerErr || expAppErr ? (
                    <ErrorDisplayMessage>
                      {expServerErr} {expAppErr}
                    </ErrorDisplayMessage>
                  ) : null}
                  <div className='mb-3 input-group'>
                    <input
                      value={formik.values.title}
                      onBlur={formik.handleBlur('title')}
                      onChange={formik.handleChange('title')}
                      className='form-control'
                      type='text'
                      placeholder='Название'
                    />
                  </div>
                  <div className='text-danger mb-2'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className='mb-3 input-group'>
                    <input
                      value={formik.values.description}
                      onBlur={formik.handleBlur('description')}
                      onChange={formik.handleChange('description')}
                      className='form-control'
                      type='text'
                      placeholder='Описание'
                    />
                  </div>
                  <div className='text-danger mb-2'>
                    {formik.touched.description && formik.errors.description}
                  </div>
                  <div className='mb-3 input-group'>
                    <input
                      value={formik.values.amount}
                      onBlur={formik.handleBlur('amount')}
                      onChange={formik.handleChange('amount')}
                      className='form-control'
                      type='number'
                      placeholder='Сумма'
                    />
                  </div>
                  <div className='text-danger mb-2'>
                    {formik.touched.amount && formik.errors.amount}
                  </div>

                  {expLoading ? (
                    <DisabledButton />
                  ) : (
                    <button type='submit' className='btn btn-danger mb-4 w-100'>
                      Добавить
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;
