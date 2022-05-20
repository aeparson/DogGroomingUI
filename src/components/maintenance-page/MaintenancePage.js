import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { toast } from 'react-toastify';
import { faPencil, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import FormItem from '../form/FormItem';
import styles from './MaintenancePage.module.css';
import Constants from '../../utils/constants';
import {
  fetchAllProducts, deleteProductById, updateProductById
} from './MaintenancePageService';
import { fetchUserPurchase } from '../profile-page/ProfilePageService';
import Modal from './MaintenancePageDeleteModal';

/**
 * @description fetches products from API and displays in a table
 * @param {user} user logged in useer passed from the header.
 * @returns a table of all products in the database and all their data.
 */

const MaintenancePage = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [editedRow, setEditedRow] = useState(false);
  const [purchases, setPurchase] = useState([]);

  const updateProductList = () => fetchAllProducts(setProducts, setApiError);

  useEffect(() => {
    updateProductList();
  }, []);

  /**
   * @description this function takes the old product in & updates with the new product data.
   * @param {product} product current product data from the databse
   * @param {product} productRow updated product object.
   */
  const changeProduct = async (product, productRow) => {
    await updateProductById(product, productRow);
    Object.assign(product, productRow);
  };

  useEffect(() => {
    if (user !== null) {
      fetchUserPurchase(setPurchase, setApiError, user);
    }
  }, [user]);

  return (
    <>
      {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div className={styles.maintenanceMenu}>
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
              .map((prod) => (
                <TableData
                  key={prod.id}
                  updateProducts={updateProductList}
                  editedRow={editedRow}
                  setEditedRow={setEditedRow}
                  product={prod}
                  changeProduct={changeProduct}
                  purchases={purchases}
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
 * @description a row of table data for a product
 * @param product will pull all of the products active and inactive
 * @param UpdateProducts will update products based on edits
 * @param purchases needs to look at if a product has purchases associated
 * @param editedRow the row containing all the updated product data
 * @param setEditedRow will set the product to the updated data.
 * @param changeProduct passes down the function of the same name from Maintenance Table function.
* @returns component
 */

const TableData = ({
  product, updateProducts, editedRow, setEditedRow, purchases, changeProduct
}) => {
  const [editProduct, setEditProduct] = useState(false);
  const [productRow, setProductRow] = useState({});

  const onProductChange = (event) => {
    setProductRow({ ...productRow, [event.target.id]: event.target.value });
  };

  /**
   * @description checks for the status of the active checkbox in edit mode and assigns active
   * status according to that.
   */
  const setProductActiveStatus = () => {
    if (document.getElementById('active').checked === true) {
      productRow.active = true;
    } else {
      productRow.active = false;
    }
  };

  const productHasPurchases = () => {
    let hasPurchased = false;
    purchases.forEach((purchase) => purchase.lineItems.forEach((lineItem) => {
      if (lineItem.productId === product.id) { hasPurchased = true; }
    }));
    return hasPurchased;
  };

  const canDelete = () => {
    const noReviews = product.reviewCount === 0;
    const hasPurchases = productHasPurchases();
    if (hasPurchases && !product.active && noReviews && !editProduct) {
      return false;
    }
    if (hasPurchases && product.active && noReviews) {
      return true;
    }

    return noReviews;
  };

  const DeleteButton = () => {
    const [clickable] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const deleteProduct = () => {
      if (clickable) {
        deleteProductById(product.id)
          .then(() => {
            updateProducts();
            toast.success(`${product.name} successfully deleted.`);
          })
          .catch(() => {
            updateProducts(); // Account for errors caused by backend changes since page render
            toast.error('A server error occurred. The product has not been deleted.');
          });
      }
    };

    const onClick = () => {
      if (clickable) {
        if (productHasPurchases()) {
          setOpenModal(true);
        } else {
          deleteProduct();
        }
      }
    };

    return (
      !editedRow ? (
        <>
          <IconButton onClick={onClick} color="inherit" size="small" className={styles.rightButton} data-testid={`delete ${product.id}`}>
            <DeleteIcon />
          </IconButton>
          {openModal && (
          <Modal
            closeModal={setOpenModal}
            product={product}
            confirmFn={deleteProduct}
            open={openModal}
            updateProducts={updateProducts}
          />
          )}
        </>
      ) : <DeleteIcon className={styles.disabledDeleteButton} />
    );
  };

  /**
   * @description displays a pencil icon. When clicked, that row becomes editable in all
   * requested fields. It then disables all other edit and delete buttons and transforms into
   * a green checkmark "Save" button.
   * @returns a pencil icon (either active or inactive depending on state).
   */
  const EditButton = () => {
    const onClick = () => {
      setEditedRow(true);
      setEditProduct(!editProduct);
    };

    return (
      editedRow ? (
        <FontAwesomeIcon
          icon={faPencil}
          size="1x"
          className={styles.disabledEditButton}
        />
      )
        : (
          <FontAwesomeIcon
            onClick={onClick}
            icon={faPencil}
            size="1x"
            className={styles.leftButton}
          />
        )
    );
  };

  /**
   * @description displays a green checkmark button. When clicked, it submits all changes made
   * to the product fields to the database and then reverts the row back to view mode & returns
   * functionality to all edit/delete buttons on page
   * @returns a green checkmark button.
   */
  const SaveButton = () => {
    const [clickable] = useState(true);

    const onClick = () => {
      if (clickable) {
        setProductActiveStatus();
        changeProduct(product, productRow)
          .then(() => {
            toast.success(`${product.name} successfully updated.`);
            setEditProduct(false);
            setEditedRow(false);
          })
          .catch(() => {
            toast.error('A server error occurred. Your updates have not been saved.');
          });
      }
    };
    return (
      <FontAwesomeIcon
        onClick={onClick}
        icon={faCheckCircle}
        color="#7CEA9C"
        size="1x"
        className={styles.leftButton}
      />
    );
  };

  /**
   * @description displays a red x button. When clicked, it cancels changes made to edit fields
   * and then reverts the row back to view mode & returns functionality to all edit/delete buttons
   * on page.
   * @returns a red x button
   */
  const CancelButton = () => {
    const onClick = () => {
      setEditProduct(false);
      setEditedRow(false);
    };
    return (
      <FontAwesomeIcon
        onClick={onClick}
        icon={faTimesCircle}
        color="#FF4000"
        size="1x"
        className={styles.rightButton}
      />
    );
  };

  return (
    <tr>
      <td style={{ padding: 3 }}>
        {!editProduct ? (
          <EditButton />
        ) : (
          <SaveButton
            product={product}
          />
        )}
        {!editProduct ? (
          canDelete() && (
            <DeleteButton
              product={product}
              updateProducts={updateProducts}
              productHasPurchases={productHasPurchases}
            />
          ))
          : (
            <CancelButton
              product={product}
            />
          )}

      </td>
      <td style={{ textAlign: 'center' }}>{product.id}</td>
      <td>
        {(!editProduct && (product.active ? 'Active' : 'Inactive'
        )) || (
          <label htmlFor="activeStatus">
            <input
              type="checkbox"
              id="active"
              name="activeStatus"
              onChange={onProductChange}
              value={productRow.active}
            />
            Active
            {' '}
          </label>
        )}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.name}
          defaultValue={product.name}
          type="text"
          id="name"
          onChange={onProductChange}
          value={productRow.name}
        />
        )) || product.name}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.brand}
          defaultValue={product.brand}
          type="text"
          id="brand"
          onChange={onProductChange}
          value={productRow.brand}
        />
        )) || product.brand}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.description}
          defaultValue={product.description}
          type="text"
          id="description"
          onChange={onProductChange}
          value={productRow.description}
        />
        )) || product.description}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.category}
          defaultValue={product.category}
          type="text"
          id="category"
          onChange={onProductChange}
          value={productRow.category}
        />
        )) || product.category}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.type}
          defaultValue={product.type}
          type="text"
          id="type"
          onChange={onProductChange}
          value={productRow.type}
        />
        )) || product.type}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.demographic}
          defaultValue={product.demographic}
          type="text"
          id="demographic"
          onChange={onProductChange}
          value={productRow.demographic}
        />
        )) || product.demographic}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.globalProductCode}
          defaultValue={product.globalProductCode}
          type="text"
          id="globalProductCode"
          onChange={onProductChange}
          value={productRow.globalProductCode}
        />
        )) || product.globalProductCode}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.sku}
          defaultValue={product.sku}
          type="text"
          id="sku"
          onChange={onProductChange}
          value={productRow.sku}
        />
        )) || product.sku}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.material}
          defaultValue={product.material}
          type="text"
          id="material"
          onChange={onProductChange}
          value={productRow.material}
        />
        )) || product.material}

      </td>
      <td style={{ textAlign: 'center' }}>
        {(editProduct && (
        <FormItem
          placeholder={product.price}
          defaultValue={product.price}
          type="text"
          id="price"
          onChange={onProductChange}
          value={productRow.price}
        />
        )) || Number(product.price).toFixed(2)}

      </td>
      <td style={{ textAlign: 'center' }}>
        {(editProduct && (
        <FormItem
          placeholder={product.quantity}
          defaultValue={product.quantity}
          type="text"
          id="quantity"
          onChange={onProductChange}
          value={productRow.quantity}
        />
        )) || product.quantity}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.primaryColorCode}
          defaultValue={product.primaryColorCode}
          type="text"
          id="primaryColorCode"
          onChange={onProductChange}
          value={productRow.primaryColorCode}
        />
        )) || product.primaryColorCode}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.secondaryColorCode}
          defaultValue={product.secondaryColorCode}
          type="text"
          id="secondaryColorCode"
          onChange={onProductChange}
          value={productRow.secondaryColorCode}
        />
        )) || product.secondaryColorCode}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.styleNumber}
          defaultValue={product.styleNumber}
          type="text"
          id="styleNumber"
          onChange={onProductChange}
          value={productRow.styleNumber}
        />
        )) || product.styleNumber}

      </td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.imageSrc}
          defaultValue={product.imageSrc}
          type="text"
          id="imageSrc"
          onChange={onProductChange}
          value={productRow.imageSrc}
        />
        )) || product.imageSrc}

      </td>
      <td>{formatDate(product.dateCreated)}</td>
      <td>{formatDate(product.dateModified)}</td>
      <td>
        {(editProduct && (
        <FormItem
          placeholder={product.releaseDate}
          defaultValue={product.releaseDate}
          type="date"
          id="releaseDate"
          onChange={onProductChange}
          value={productRow.releaseDate}
        />
        )) || formatDate(product.releaseDate)}

      </td>
    </tr>
  );
};

export default MaintenancePage;
