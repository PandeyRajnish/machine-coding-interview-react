import React from 'react';

const Pagination = ({
  goToNextPage,
  goToPrevPage,
  handlePageChange,
  numberOfPages,
  currentPage,
}) => {
  return (
    <div className="pagination-conatainer">
      <button
        disabled={currentPage === 0}
        className="page-number"
        onClick={() => goToPrevPage()}
      >
        ◀
      </button>
      {[...Array(numberOfPages).keys()].map((n) => (
        <button
          className={`page-number ${n === currentPage ? 'active' : ''}`}
          key={n}
          onClick={() => handlePageChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        disabled={currentPage === numberOfPages - 1}
        className="page-number"
        onClick={() => goToNextPage()}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
