/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Box } from '@mui/system';
import ProductCard from '../product-card/ProductCard';
import thing from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProductsCount, { fetchFirstPageOfProducts } from '../pagination/PaginationService';
import FilterMenu from '../filter-menu/FilterMenu';
import fetchProducts from '../filter-menu/FilterMenuService';

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
      <Box>
        <FilterMenu
          setWebRoute={setWebRoute}
          onFilter={filterByQuery}
          pushover={setSidebarOpen}
        />
        {apiError && <p className={thing.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
        <div className={sidebarOpen ? thing.pushed : thing.app}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} user={user} />
            </div>
          ))}
        </div>
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
