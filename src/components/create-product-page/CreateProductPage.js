import React, { useState, useEffect } from 'react';
import postNewProduct from './CreateProductPageService';

const CreateProduct = () => {
//   const [products, setProduct] = useState([]);
//   const [apiError, setApiError] = useState(false);

  useEffect(() => {
    postNewProduct(setProduct, setApiError);
  }, []);

  return (
    <div className="createProductForm">Create New Product</div>
  );
};

export default CreateProduct;
