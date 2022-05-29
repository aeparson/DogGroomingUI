import React from 'react';
import NavLink from 'react-router-dom';
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
      <NavLink to="/home">
        <img src={companyLogo} alt="Logo" height="45px" />
      </NavLink>
    </div>
  </section>

);
export default Header;
