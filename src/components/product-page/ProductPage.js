/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Box } from '@mui/system';
import paginationStyles from './Pagination.module.css';
import pageStyles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProductsCount, { fetchFirstPageOfProducts } from '../pagination/PaginationService';
import FilterMenu from '../filter-menu/FilterMenu';
import fetchProducts from '../filter-menu/FilterMenuService';
import ProductCardGrid from '../product-card-grid/ProductCardGrid';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */

const ProductPage = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [webRoute, setWebRoute] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filterByQuery = (pageToFetch) => {
    setPage(pageToFetch);
    fetchProducts(setProducts, setApiError, pageToFetch, webRoute);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [page]);
  useEffect(() => {
    fetchFirstPageOfProducts(setProducts, setApiError);
  }, []);
  useEffect(() => {
    fetchProductsCount(setCount, setApiError, webRoute);
  }, [webRoute]);

  /**
 * @name totalNumberOfPages
 * @description Takes total count of products and divides it by datalimit to attain number of pages
 * @returns totalPages
 */
  const totalNumberOfPages = () => {
    const dataLimit = 20;
    const totalPages = Math.ceil(count / dataLimit);
    return totalPages;
  };

  /**
   *@name handlePageClick
   *@description sets the page clicked to the selected page
   */
  function handlePageClick({ selected: selectedPage }) {
    setPage(selectedPage);
    filterByQuery(selectedPage);
  }

  return (
    <div>
      <Box className={pageStyles.productPageLayoutContainer}>
        <FilterMenu
          setWebRoute={setWebRoute}
          onFilter={filterByQuery}
          pushover={setSidebarOpen}
        />
        {apiError && <p className={pageStyles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
        <ProductCardGrid products={products} user={user} sidebarOpen={sidebarOpen} />
      </Box>
      <div>
        <ReactPaginate
          previousLabel="←"
          nextLabel="→"
          breakLabel=""
          pageCount={totalNumberOfPages()}
          marginPagesDisplayed={0}
          pageRangeDisplayed={9}
          onPageChange={handlePageClick}
          containerClassName={paginationStyles.pagination}
          pageClassName={paginationStyles.pagination}
          activeClassName={paginationStyles.active}
        />
      </div>
    </div>
  );
};

export default ProductPage;
