import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.css';
import Constants from '../../utils/constants';

import fetchUserData from './ProfilePageService';

/**
 * @name ProfilePage
 * @description fetches user info from API and displays in a form
 * @return component
 */

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchUserData(setUserData, setApiError);
  }, []);

  return (
    <>
      {apiError && (
      <p data-testid="errMsg">
        {Constants.API_ERROR}
      </p>
      )}
      <form className={styles.profileContainer}>
        <h2 className="title"> Your User Profile</h2>
        <div>
          <userData />
        </div>
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
    </>

  );
};
export default ProfilePage;
