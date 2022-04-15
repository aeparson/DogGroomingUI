import React, { useState } from 'react';
// import { Icon } from 'semantic-ui-react';
import './Pagination.css';

const Pagination = ({
  setPage, pageLimit
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [pages] = useState(Math.round(products.length / dataLimit));

  // increment the current page
  function goToNextPage() {
    setCurrentPage(currentPage + 1);
    setPage(currentPage);
  }

  // decrement the current page
  function goToPreviousPage() {
    setCurrentPage(currentPage - 1);
    setPage(currentPage);
  }
  // change current page to clicked page number
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    setPage(currentPage);
  }
  // make a group of pages
  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      {/* show the pagination
          it consists of next and previous buttons
          along with page numbers, in our case, 8 page
          numbers at a time
      */}
      <div className="pagination">
        {/* previous button */}
        <button
          type="button"
          onClick={goToPreviousPage}
          icon="left arrow"
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          ←
        </button>
        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          type="button"
          onClick={goToNextPage}
          icon="right arrow"
          className={`next ${currentPage === 27 ? 'disabled' : ''}`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
