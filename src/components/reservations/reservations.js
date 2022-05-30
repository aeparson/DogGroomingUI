import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './reservations.module.css';

const Reservations = () => (
  <div className={styles.create}>
    <NavLink to="/reservations/create">
      <button className={styles.button} type="button">Create</button>
    </NavLink>
  </div>

);

export default Reservations;
