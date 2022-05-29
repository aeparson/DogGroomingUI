import React from 'react';
import pagePhoto from './homepageImage.jpeg';
import styles from './homepage.module.css';

const Homepage = () => (
  <body className={styles.homepageBody}>
    <div>
      <img src={pagePhoto} alt="luxurious dog hotel" className={styles.homepageImage} />
    </div>
  </body>

);

export default Homepage;
