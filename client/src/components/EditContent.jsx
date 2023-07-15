import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moneySVG from '../img/money.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import DisabledButton from './buttons/DisabledButton';
import { updateExpAction } from '../redux/slices/expenses/expensesSlices';
import { updateIncomeAction } from '../redux/slices/income/incomeSlices';


const formSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  amount: Yup.number().required('Amount is required'),
});
const EditContent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: state?.item?.title,
      description: state?.item?.description,
      amount: state?.item?.amount,
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        id: state?.item._id,
      };
      if (state.item?.type === 'income') {
        dispatch(updateIncomeAction(data));
        navigate(-1);
      } else {
        dispatch(updateExpAction(data));
        navigate(-1);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <section className='py-5 bg-secondary vh-100'>
      <div className='container text-center'>
        <a className='d-inline-block mb-5'>
          <img className='img-fluid' src={moneySVG} alt='SVGitemS' width='200' />
        </a>
        <div className='row mb-4'>
          <div className='col-12 col-md-8 col-lg-5 mx-auto'>
            <div className='p-4 shadow-sm rounded bg-white'>
              <form onSubmit={formik.handleSubmit}>
                <span className='text-muted'></span>
                {state?.item?.type === 'income' ? <h2>Update Income</h2> : <h2>Update Expense</h2>}
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
                {false ? (
                  <DisabledButton />
                ) : (
                  <button type='submit' className='btn btn-primary mb-4 w-100'>
                    Сохранить
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;
