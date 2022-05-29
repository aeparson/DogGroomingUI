import React from 'react';
// import { NavLink } from 'react-router-dom';
// import constants from '../../utils/constants';
import styles from './footer.module.css';

const Footer = () => (
  <section className={styles.footer}>
    <div className={styles.footerText}>&copy; Hotel Bookings</div>
  </section>
);

export default Footer;