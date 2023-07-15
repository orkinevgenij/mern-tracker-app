import React from 'react';

const AppPagination = ({ pageNumber, setPage }) => {
  const arr = Array.from(Array(pageNumber).keys());
  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {arr?.map((p) => (
          <li className='page-item' key={p}>
            <button onClick={(e) => setPage(e.target.textContent)} className='page-link'>
              {++p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AppPagination;
