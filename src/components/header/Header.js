import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import companyLogo from './hotel-header-image.png';
/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <section className={styles.header}>
    <div className={styles.logo}>
      <NavLink to="/HomePage">
        <img src={companyLogo} alt="Logo" height="100px" />
      </NavLink>
    </div>
    <div className={styles.reservations}>
      <NavLink to="/Reservations">
        <p>Reservations</p>
      </NavLink>

    </div>

  </section>

);
export default Header;
