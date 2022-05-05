import React from 'react';
import styles from './CreatePromoCodePage.module.css';

function Buttons({ onChange, promoCodeData }) {
  return (
    <div className={styles.radio} onChange={onChange}>
      <input type="radio" id="type" value="flat" checked={promoCodeData.type === 'flat'} />
      Flat
      <input type="radio" id="type" value="percent" checked={promoCodeData.type === 'percent'} />
      Percent
    </div>
  );
}

export default Buttons;
