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
      <NavLink to="/">
        <img src={companyLogo} alt="Logo" height="100px" />
      </NavLink>
    </div>
    <div className={styles.reservations}>
      <NavLink to="/Reservations">
        Reservations
      </NavLink>
    </div>
    <div className={styles.roomtypes}>
      <NavLink to="/RoomTypes">
        Room Types
      </NavLink>
    </div>

  </section>

);
export default Header;
