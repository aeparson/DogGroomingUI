import React from 'react';
import styles from './ProfilePage.css';

/**
 * @name ProfilePage
 * @description fetches user info from API and displays in a form
 * @return component
 */
const ProfilePage = () => (

  <form className={styles.profileContainer}>
    <h2 className="title"> Your User Profile</h2>
    <div className={`${styles.step} ${styles.order}`}>
      <h3 className={styles.category}>First Name</h3>
    </div>
    <div className={`${styles.step} ${styles.delivery}`}>
      <h3 className={styles.category}>Last Name</h3>

    </div>
    <div className={`${styles.step} ${styles.payment}`}>
      <h3 className={styles.category}>Shipping Address</h3>
      <h3>Street</h3>
      <h3>City</h3>
      <h3>State</h3>
      <h3>Zip</h3>
    </div>
  </form>
);
export default ProfilePage;
