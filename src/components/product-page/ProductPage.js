import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import Pagination from '../pagination/Pagination';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchActiveProducts from '../pagination/PaginationService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchActiveProducts(setProducts, page, setApiError);
  }, [page]);

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
              pageLimit={9}
              dataLimit={20}
            />
          </>
        ) : (
          <h1>No Posts to display</h1>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
