import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Constants from '../../utils/constants';
import styles from './MaintenancePage.module.css';
import fetchAllProducts from './MaintenancePageService';

/**
 * @description fetches products from API and displays in a table
 * @returns component
 */

const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchAllProducts(setProducts, setApiError);
  }, []);

  return (
    <>
      <>
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        <div className="MaintenanceMenu">
          <NavLink to="/createProductPage">
            <button className={styles.button} type="button">Create Product</button>
          </NavLink>
        </div>
        <div className={styles.maintenanceTable}>
          <table>
            <thead>
              <TableHeadings />
            </thead>
            <tbody>
              {products.sort((productA, productB) => productA.id - productB.id)
                .map((product) => <TableData key={product.id} product={product} />)}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};

/**
 * @description a row of column title headers
 * @returns component
 */
const TableHeadings = () => (
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
);

/**
 *
 * @param {string} dateString UTC Datestring from API (YYYY-MM-DDTHH:MM:SS.SSSSSS)
 * @returns {string} Formatted date (YYYY-MM-DD)
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // months are zero-indexed
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * @description a row of table data for a product
 * @param {Object} props Contains a product object
 * @returns component
 */
const TableData = (props) => {
  const { product } = props;
  return (
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
  );
};
export default MaintenancePage;
