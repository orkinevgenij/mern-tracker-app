import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { registerUserAction } from '../../redux/slices/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import DisabledButton from '../../components/buttons/DisabledButton';

const formSchema = Yup.object({
  email: Yup.string().required('Введите ваш E-mail'),
  password: Yup.string().required('Введите ваш пароль'),
  firstname: Yup.string().required('Введите ваше Имя'),
  lastname: Yup.string().required('Введите вашу Фамилию'),
});

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userLoading, userAuth } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth) {
      navigate('/profile');
    }
  }, [navigate, userAuth]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });
  return (
    <section className='position-relative py-5 overflow-hidden vh-100'>
      <div className='d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100'></div>
      <div className='d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100'></div>
      <div className='container position-relative mx-auto'>
        <div className='row align-items-center'>
          <div className='col-12 col-lg-5 mb-5'>
            <div>
              <h2 className='display-5 fw-bold mb-4 text-white'>
                Следите за вашими доходам и расходами
              </h2>
            </div>
          </div>
          <div className='col-12 col-lg-5 ms-auto'>
            <div className='p-5 bg-light rounded text-center'>
              <form onSubmit={formik.handleSubmit}>
                <span className='text-muted'>Новый пользователь</span>
                <h3 className='fw-bold mb-5'>Регистрация</h3>
                {userAppErr || userServerErr ? (
                  <div className='alert alert-danger' role='alert'>
                    {userServerErr} {userAppErr}
                  </div>
                ) : null}
                <input
                  className='form-control mb-2'
                  type='text'
                  placeholder='Имя'
                  value={formik.values.firstname}
                  onChange={formik.handleChange('firstname')}
                  onBlur={formik.handleBlur('firstname')}
                />
                <div className='text-danger mb-2'>
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <input
                  className='form-control mb-2'
                  type='TEXT'
                  placeholder='Фамилия'
                  value={formik.values.lastname}
                  onChange={formik.handleChange('lastname')}
                  onBlur={formik.handleBlur('lastname')}
                />
                <div className='text-danger mb-2'>
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <input
                  className='form-control mb-2'
                  type='email'
                  placeholder='E-mail'
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                <div className='text-danger mb-2'>
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  className='form-control mb-2'
                  type='password'
                  placeholder='Пароль'
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                />
                <div className='text-danger mb-2'>
                  {formik.touched.password && formik.errors.password}
                </div>

                <div>
                  {userLoading ? (
                    <DisabledButton />
                  ) : (
                    <button type='submit' className='btn btn-primary py-2 w-100 mb-4'>
                      Регистрация
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
