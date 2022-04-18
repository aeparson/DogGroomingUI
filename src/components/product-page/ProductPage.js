import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCard from '../product-card/ProductCard';
import Pagination from '../pagination/Pagination';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchActiveProducts, { fetchProductsCount } from '../pagination/PaginationService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchActiveProducts(setProducts, page, setApiError);
  }, [page]);
  useEffect(() => {
    fetchProductsCount(setCount, setApiError);
  }, []);

  const totalNumberOfPages = () => {
    const dataLimit = 20;
    const totalPages = Math.ceil(count / dataLimit);
    return totalPages;
  };

  function handlePageClick({ selected: selectedPage }) {
    setPage(selectedPage);
  }

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <div className={styles.app}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div>
        {products.length > 0 ? (
          <>
            <Pagination
              setPage={setPage}
              products={products}
              updateProducts={setProducts}
              dataLimit={20}
              pageLimit={9}
            />
          </>
        ) : (
          <h1>No Posts to display</h1>
        )}
      </div>
      <div>
        <ReactPaginate
          previousLabel="←"
          nextLabel="→"
          breakLabel=""
          pageCount={totalNumberOfPages()}
          marginPagesDisplayed={0}
          pageRangeDisplayed={9}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-item"
          activeClassName="active"
          diabledClassName="disabled"
        />
      </div>
    </div>
  );
};

export default ProductPage;
