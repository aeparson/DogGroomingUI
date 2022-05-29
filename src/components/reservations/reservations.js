import React from 'react';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';
import styles from './reservations.module.css';

const Reservations = () => (
  <div>
    <p>Reservations</p>
    <img src={PLACEHOLDER_IMAGE} alt="luxurious dog hotel" className={styles.homepageImage} />
  </div>

);

export default Reservations;
