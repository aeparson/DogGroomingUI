import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewProductForm from './CreateProductForm';
import styles from './CreateProductPage.module.css';
import postNewProduct from './CreateProductPageService';
import validateProductCreation from './CreateProductValidation';

/**
 * @name CreateProductPage
 * @description handles the changes when creating a new product, maps new product data
 *
 */
const CreateProductPage = () => {
  const history = useHistory();

  const [productData, setProductData] = useState({
    active: '',
    name: '',
    brand: '',
    category: '',
    type: '',
    material: '',
    description: '',
    demographic: '',
    price: '',
    quantity: '',
    primaryColorCode: '',
    secondaryColorCode: '',
    styleNumber: '',
    releaseDate: '',
    imageSrc: ''
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  const [fieldErrors, setFieldErrors] = useState({ product: [] });

  const attemptProductCreation = (newProductForm) => {
    // front end validation
    const [invalidFields] = validateProductCreation(newProductForm);
    // if all fields are valid
    if (Object.keys(invalidFields).length === 0) {
      postNewProduct(newProductForm, history).then(() => {
        // history.push('/confirmation');
      }).catch(() => {
        setFieldErrors({ product: invalidFields });
        toast.error('Product not created');
      });
    } else {
      setFieldErrors({ product: invalidFields });
      toast.error('Invalid input. Please check form for errors.');
    }
  };

  const handleCreate = async () => {
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
    attemptProductCreation(newProductForm);
  };

  return (
    <div className={styles.wholePage}>
      <div className={styles.createProductPage}>
        <h1 className={styles.h1}>Create Product</h1>
        <NewProductForm
          onChange={handleChange}
          productData={productData}
          errors={fieldErrors.product}
        />
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
