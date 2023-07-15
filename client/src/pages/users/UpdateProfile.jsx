import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import ErrorDisplayMessage from '../../components/ErrorDisplayMessage';
import { updateProfileAction } from '../../redux/slices/users/usersSlice';
import DisabledButton from '../../components/buttons/DisabledButton';
const formSchema = Yup.object({
  firstname: Yup.string().required('firstname is required'),
  lastname: Yup.string().required('lastname is required'),
  email: Yup.string().required('email is required'),
});

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const dispatch = useDispatch();

  const { userLoading, userAppErr, userServerErr, isEdit } = useSelector((state) => state?.users);

  const formik = useFormik({
    initialValues: {
      firstname: state?.profile?.firstname,
      lastname: state?.profile?.lastname,
      email: state?.profile?.email,
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
      navigate(-1);
    },
    validationSchema: formSchema,
  });
  return (
    <>
      {userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userServerErr}
        </ErrorDisplayMessage>
      ) : (
        <section className='py-5 bg-success vh-100'>
          <div className='container text-center'>
            <div className='row mb-4'>
              <div className='col-12 col-md-8 col-lg-5 mx-auto'>
                <div className='p-4 shadow-sm rounded bg-white'>
                  <form onSubmit={formik.handleSubmit}>
                    <span className='text-muted'>Update Profile</span>
                    <h4 className='mb-4 fw-light'>Hi, Do you want to update your profile</h4>

                    {userAppErr || userServerErr ? (
                      <ErrorDisplayMessage
                        error={{
                          userAppErr,
                          userServerErr,
                        }}
                      />
                    ) : null}
                    <div className='mb-3 input-group'>
                      <input
                        value={formik.values.firstname}
                        onBlur={formik.handleBlur('firstname')}
                        onChange={formik.handleChange('firstname')}
                        className='form-control'
                        type='text'
                        placeholder='Enter firstname'
                      />
                    </div>
                    <div className='text-danger mb-2'>
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <div className='mb-3 input-group'>
                      <input
                        value={formik.values.lastname}
                        onBlur={formik.handleBlur('lastname')}
                        onChange={formik.handleChange('lastname')}
                        className='form-control'
                        type='text'
                        placeholder='Enter lastname'
                      />
                    </div>
                    <div className='text-danger mb-2'>
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                    <div className='mb-3 input-group'>
                      <input
                        value={formik.values.email}
                        onBlur={formik.handleBlur('email')}
                        onChange={formik.handleChange('email')}
                        className='form-control'
                        type='email'
                        placeholder='Enter email'
                      />
                    </div>
                    <div className='text-danger mb-2'>
                      {formik.touched.email && formik.errors.email}
                    </div>

                    <div className='btn-group' role='group' aria-label='Basic mixed styles example'>
                      {userLoading ? (
                        <DisabledButton />
                      ) : (
                        <button type='submit' className='btn btn-warning'>
                          Сохранить
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateProfile;
