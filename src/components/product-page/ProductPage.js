import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ProductCard from '../product-card/ProductCard';
import thing from './ProductPage.module.css';
import Constants from '../../utils/constants';
import FilterMenu from '../filter-menu/FilterMenu';
import fetchDemographicProducts from '../filter-menu/FilterMenuService';
import fetchProducts from './ProductPageService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [webRoute, setWebRoute] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filterByDemographic = () => {
    fetchDemographicProducts(setProducts, setApiError, webRoute);
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      <Box>
        <FilterMenu
          setWebRoute={setWebRoute}
          onFilter={filterByDemographic}
          pushover={setSidebarOpen}
        />
        {apiError && <p className={thing.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
        <div className={sidebarOpen ? thing.pushed : thing.app}>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default ProductPage;
