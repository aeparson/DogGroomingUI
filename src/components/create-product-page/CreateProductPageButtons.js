import React from 'react';
import styles from './CreateProductPage.module.css';

function Buttons({ onChange, productData }) {
  return (
    <div className={styles.radio} onChange={onChange}>
      <input
        type="radio"
        id="active"
        name="status"
        value="true"
        defaultChecked={productData.active === 'true'}
      />
      active&nbsp;&nbsp;&nbsp;
      <input
        type="radio"
        id="active"
        name="status"
        value="false"
        defaultChecked={productData.active === 'false'}
      />
      inactive
    </div>
  );
}

export default Buttons;
