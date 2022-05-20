import React, { useState } from 'react';
import styles from './CreateProductPage.module.css';

function Buttons({ onChange }) {
  const [activeStatus, setActiveStatus] = useState('false');

  const handleChange = (event) => {
    setActiveStatus(event.target.value);
  };
  return (
    <span className={styles.radio} onChange={onChange}>
      &nbsp;&nbsp;&nbsp;
      <input
        type="radio"
        id="active"
        name="status"
        value="false"
        checked={activeStatus === 'false'}
        onChange={handleChange}
      />
      active&nbsp;&nbsp;&nbsp;
      <input
        type="radio"
        id="active"
        name="status"
        value="true"
        checked={activeStatus === 'true'}
        onChange={handleChange}
      />
      inactive
    </span>
  );
}

export default Buttons;
