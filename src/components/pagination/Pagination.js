import React, { useState } from 'react';

function Pagination({
  data, RenderComponent, title, pageLimit, dataLimit
}) {
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  // might not need this because data is already paginated
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  // shows the group of page numbers in pagination
  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <h1>{title}</h1>

      {/* show the products, 20 products at a time */}
      <div className="dataContainer">
        {getPaginatedData().map((d, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <RenderComponent key={idx} data={d} />
        ))}
      </div>

      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 8 page
          numbers at a time
      */}
      <div className="pagination">
        {/* previous button */}
        <button
          type="button"
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
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
          // className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
