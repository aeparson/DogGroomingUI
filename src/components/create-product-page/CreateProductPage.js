import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NewProductForm from './CreateProductForm';
import styles from './CreateProductPage.module.css';
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
    <div className={styles.wholePage}>
      <div className={styles.createProductPage}>
        <h1 className={styles.h1}>Create Product</h1>
        <NewProductForm onChange={handleChange} productData={productData} />
        <button
          type="submit"
          onClick={handleCreate}
          className={styles.createButton}
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default CreateProductPage;
