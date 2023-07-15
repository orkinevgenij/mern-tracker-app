import React from 'react';
import notAdmin from '../img/notadmin.svg';
const NotAdmin = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '20px',
      }}
    >
      <h1 className='text-danger'>Вы не являетесь админом. У вас нет доступа.</h1>
      <img alt='NotAdmin' className=' img-fluid m-3' src={notAdmin} />
    </div>
  );
};

export default NotAdmin;
