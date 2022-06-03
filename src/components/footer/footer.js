import React from 'react';
import styles from './footer.module.css';

/**
 * creates a site footer that displays the company name.
 * @returns site footer
 */
const Footer = () => (
  <section className={styles.footer}>
    <div className={styles.footerText}>&copy; Hotel Bookings</div>
  </section>
);

export default Footer;
