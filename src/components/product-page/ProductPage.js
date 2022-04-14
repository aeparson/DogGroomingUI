import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

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
              data={products}
              title="Products"
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
