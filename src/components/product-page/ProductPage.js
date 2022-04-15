import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
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
    fetchProducts(setProducts, setApiError);
  }, []);
  useEffect(() => {
    fetchActiveProducts(setProducts, page, setApiError);
  }, [page]);

  return (
    <div>
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
            <Pagination
              setPage={setPage}
              products={products}
              updateProducts={setProducts}
              pageLimit={9}
              dataLimit={20}
            />
          ) : (
            <h1>No products to display</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
