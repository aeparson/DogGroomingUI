import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NewProductForm from './CreateProductForm';
import styles from './CreateProductPage.css';
import postNewProduct from './CreateProductPageService';

/**
 * @name CreateProductPage
 * @description handles the changes when creating a new product, maps new product data
 *
 */
const CreateProductPage = () => {
  const history = useHistory();

  const [productData, setProductData] = useState({});

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  const handleCreate = () => {
    const newProductForm = {
      active: productData.active === 'true',
      name: productData.name,
      brand: productData.brand,
      category: productData.category,
      type: productData.type,
      material: productData.material,
      description: productData.description,
      demographic: productData.demographic,
      price: productData.price,
      quantity: productData.quantity,
      primaryColorCode: productData.primaryColorCode,
      secondaryColorCode: productData.secondaryColorCode,
      styleNumber: productData.styleNumber,
      releaseDate: productData.releaseDate,
      imageSrc: productData.imageSrc
    };
    postNewProduct(newProductForm, history);
  };

  return (
    <div className="wholePage">
      <div style={{ backgroundColor: '#1db9bf' }} className={CreateProductPage}>
        <h1 className={styles.CreateProductPage}>Create Product</h1>
        <NewProductForm onChange={handleChange} productData={productData} />
        <button
          type="submit"
          className="createButton"
          onClick={handleCreate}
          style={styles.CreateProductPage}
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default CreateProductPage;
