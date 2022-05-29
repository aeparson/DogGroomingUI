import React from 'react';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';
import styles from './roomtypes.module.css';

const Roomtypes = () => (
  <div>
    <p>Room Types</p>
    <img src={PLACEHOLDER_IMAGE} alt="luxurious dog hotel" className={styles.homepageImage} />
  </div>

);

export default Roomtypes;
