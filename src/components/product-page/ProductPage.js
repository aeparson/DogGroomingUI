import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import ProductModal from '../product-modal/ProductModal';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const openModal = (product, event) => {
    console.log(product);
    setModalProduct(product);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <ProductModal open={modalIsOpen} product={modalProduct} handleClose={handleModalClose} />
      <div className={styles.app}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onClick={() => openModal(product)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
