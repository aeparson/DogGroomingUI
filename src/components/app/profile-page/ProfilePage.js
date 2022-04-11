import React from 'react';
import styles from './ProfilePage.css';

/**
 * @name ProfilePage
 * @description A page that display user profile
 * @return component
 */
const ProfilePage = () => (
  <div className={styles.profileContainer}>
    <div className={`${styles.step} ${styles.order}`}>
      <h3 className={styles.title}>1. First Name</h3>
    </div>
    <div className={`${styles.step} ${styles.delivery}`}>
      <h3 className={styles.title}>2. Last Name</h3>

    </div>
    <div className={`${styles.step} ${styles.payment}`}>
      <h3 className={styles.title}>3. Shipping Address</h3>
    </div>

  </div>
);
export default ProfilePage;
