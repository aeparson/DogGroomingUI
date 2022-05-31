import React from 'react';
import { NavLink } from 'react-router-dom';
import oops from './oops.png';
import styles from './PageNotFound.module.css';

const PageNotFound = () => (
  <div>
    <NavLink to="/">
      <img src={oops} alt="ReturnHome" className={styles.oops} />
    </NavLink>
  </div>
);

export default PageNotFound;
