import React from 'react';
import ProductCard from '../product-card/ProductCard';

import styles from './ProductCardGrid.module.css';

function getClassName(sidebarOpen) {
  return sidebarOpen ? `${styles.outerContainer} ${styles.pushed}` : styles.outerContainer;
}

/**
 * @name ProductCardGrid
 * @description A presentational component that contains
 *  a collection of product cards arranged in a grid.
 * @param {array} products An array of products to display cards for.
 * @param {object} user The logged in user, if any.
 * @param {boolean} sidebarOpen A flag indicating whether the sidebar is open.
 * @returns component
 */
const ProductCardGrid = ({ products, user, sidebarOpen }) => (
  <div className={getClassName(sidebarOpen)}>
    <div className={styles.innerContainer}>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} user={user} />
        </div>
      ))}
    </div>
  </div>
);

export default ProductCardGrid;
