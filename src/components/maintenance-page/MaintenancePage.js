import React, { useEffect, useState } from 'react';
import Constants from '../../utils/constants';
import styles from './MaintenancePage.css';

import fetchProducts from '../product-page/ProductPageService';

/**
 * @name MaintenancePage
 * @description fetches products from API and displays in a table
 * @return component
 */

const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  // Converts date string from YYYY-MM-DDTHH:MM:SS.SSSSSS to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    // months are zero-indexed
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
  return (
    <>
      {apiError && (
      <p>
        {Constants.API_ERROR}
      </p>
      )}
      <div className="scrollable">
        <table style={styles}>
          <tr>
            <th>ID</th>
            <th>Active</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Demographic</th>
            <th>Global Product Code</th>
            <th>SKU</th>
            <th>Material</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Primary Color</th>
            <th>Secondary Color</th>
            <th>Style</th>
            <th>Image Source</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Released</th>
          </tr>
          {products.sort((productA, productB) => productA.id - productB.id)
            .map((product) => (
              <tr>
                <td style={{ textAlign: 'right' }}>{product.id}</td>
                <td>{product.active ? 'Active' : 'Inactive'}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.type}</td>
                <td>{product.demographic}</td>
                <td>{product.globalProductCode}</td>
                <td>{product.sku}</td>
                <td>{product.material}</td>
                <td style={{ textAlign: 'right' }}>{product.price.toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>{product.quantity}</td>
                <td>{product.primaryColorCode}</td>
                <td>{product.secondaryColorCode}</td>
                <td>{product.styleNumber}</td>
                <td>{product.imageSrc}</td>
                <td>{formatDate(product.dateCreated)}</td>
                <td>{formatDate(product.dateModified)}</td>
                <td>{formatDate(product.releaseDate)}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};

export default MaintenancePage;
