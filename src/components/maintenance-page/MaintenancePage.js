import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { toast } from 'react-toastify';
import styles from './MaintenancePage.module.css';
import Constants from '../../utils/constants';
import { fetchAllProducts, deleteProductById } from './MaintenancePageService';
/**
 * @description fetches products from API and displays in a table
 * @returns component
 */

const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  const updateProductList = () => fetchAllProducts(setProducts, setApiError);

  useEffect(() => {
    updateProductList();
  }, []);

  return (
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
        <NavLink to="/createPromoCodePage">
          <button className={styles.button} type="button">Create Promo</button>
        </NavLink>
      </div>
      <div className={styles.maintenanceTable}>
        <table>
          <thead>
            <TableHeadings />
          </thead>
          <tbody>
            {products.sort((productA, productB) => productA.id - productB.id)
              .map((product) => (
                <TableData
                  key={product.id}
                  updateProducts={updateProductList}
                  product={product}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/**
 * @description a row of column title headers
 * @returns component
 */
const TableHeadings = () => (
  <tr>
    <th />
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
 * A clickable trash can icon for deleting products
 * @prop {{id: number, name: string, ...}} product product object
 * @prop {function} updateProducts function to refetch all products
 * @returns Delete button component
 */
const DeleteButton = (props) => {
  const {
    product, updateProducts
  } = props;
  const [clickable, setClickable] = useState(true);

  const onClick = () => {
    if (clickable) {
      setClickable(false); // Prevent double clicks
      deleteProductById(product.id)
        .then(() => {
          updateProducts();
          toast.success(`${product.name} successfully deleted.`);
        })
        .catch(() => {
          updateProducts(); // Account for errors caused by backend changes since page render
          toast.error('Server Error. Product not deleted. Please try again.');
          setClickable(true);
        });
    }
  };

  return (
    <IconButton onClick={onClick} color="inherit" size="small" className="actionButton" data-testid={`delete ${product.id}`}>
      <DeleteIcon />
    </IconButton>
  );
};

/**
 * @description a row of table data for a product
 * @param {Object} props Contains a product object
 * @returns component
 */
const TableData = (props) => {
  const {
    product, updateProducts
  } = props;
  return (
    <tr>
      <td style={{ padding: 0 }}>
        {product.reviewCount === 0 && (
          <DeleteButton
            product={product}
            updateProducts={updateProducts}
          />
        )}
      </td>
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
