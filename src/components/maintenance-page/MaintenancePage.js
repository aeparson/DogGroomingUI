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

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
    // const sampleItem = {
    //   active: true, brand: 'BRAND', category: 'Sport', dateCreated: '2022-03-28T16:11:08.849769',
    // dateModified: '2022-03-28T16:11:08.849769', demographic: 'Human',
    // description: 'This is a test product.', globalProductCode: 'po-LETTERS',
    // id: 0, imageSrc: 'www.example.com/example.jpg', material: 'Cloth', name: 'PRODUCT',
    // price: 19.99, primaryColorCode: '#ffffff', quantity: 99,
    // releaseDate: '2022-03-28T16:11:08.849769', secondaryColorCode: '#000000', sku: 'LET-TER-SS',
    // styleNumber: 'scWORDS', type: 'Clothes'
    // };
    // setProducts([sampleItem]);
    // setApiError(false);
  }, []);
  return (
    <>
      {apiError && (
      <p>
        {Constants.API_ERROR}
      </p>
      )}
      <div className="box">
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
            <th>Price</th>
            <th>Quantity</th>
            <th>Primary Color Code</th>
            <th>Secondary Color Code</th>
            <th>Style Number</th>
            <th>Image Source</th>
            <th>Date Created</th>
            <th>Date Modified</th>
            <th>Release Date</th>
          </tr>
          {products.sort((productA, productB) => productA.id - productB.id)
            .map((product) => (
              <tr>
                {console.log(product)}
                <td>{product.id}</td>
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
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.primaryColorCode}</td>
                <td>{product.secondaryColorCode}</td>
                <td>{product.styleNumber}</td>
                <td>{product.imageSrc}</td>
                <td>{product.dateCreated}</td>
                <td>{product.dateModified}</td>
                <td>{product.releaseDate}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};
export default MaintenancePage;
