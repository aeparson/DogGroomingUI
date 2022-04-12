import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import NewProductForm from './CreateProductForm';
import styles from './CreateProductPage.css';
import postNewProduct from './CreateProductPageService';

/**
 * @name CreateProductPage
 * @description handles the changes when creating a new product, maps new product data
 *
 */
const CreateProductPage = () => {
  const notify = (text) => toast.success(text);

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
    postNewProduct(newProductForm).then(() => notify('Product created successfully.'));
    history.push('./maintenance');
  };

  return (
    <div className={styles.CreateProductPage}>
      <h3 className={styles.CreateProductPage}>Create Product</h3>
      <NewProductForm onChange={handleChange} productData={productData} />
      <button
        type="submit"
        className="createButton"
        onClick={handleCreate}
        style={styles.CreateProductPage}
      >
        Create
      </button>
    </div>
  );
};

export default CreateProductPage;
