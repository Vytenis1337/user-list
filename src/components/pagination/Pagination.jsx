import './Pagination.css';

import { useUsers } from '../../context/UsersProvider';

export const Pagination = () => {
  const { setCurrentPage, currentPage, users, currentUsers } = useUsers();

  const totalPosts = users.length;
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / 6); i++) {
    pages.push(i);
  }

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className='pagination'>
      <button
        className='pagination-arrow'
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? 'pagination-button-active'
                : 'pagination-button'
            }
          >
            {page}
          </button>
        );
      })}

      <button
        className='pagination-arrow'
        onClick={nextPage}
        disabled={!currentUsers.length}
      >
        Next
      </button>
    </div>
  );
};
