import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import companyLogo from './health-header-image.png';
/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <nav className={styles.header}>
    <div className={styles.logo}>
      <NavLink to="/">
        <img src={companyLogo} alt="Logo" height="100px" />
      </NavLink>
    </div>
    <div className={styles.reservations}>
      <NavLink to="/reservations">
        Reservations
      </NavLink>
    </div>
    <div className={styles.roomtypes}>
      <NavLink to="/room-types">
        Room Types
      </NavLink>
    </div>

  </nav>

);
export default Header;
