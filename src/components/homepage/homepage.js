import React from 'react';
import pagePhoto from './homepageImage.jpeg';
import styles from './homepage.module.css';

/**
 * Creates an attractive landing page for new visitors.
 * @returns home page with large image.
 */
const Homepage = () => (
  <div>
    <img src={pagePhoto} alt="luxurious dog hotel" className={styles.homepageImage} />
  </div>
);

export default Homepage;
