import React, { useState } from 'react';
import styles from './ProfilePage.module.css';
import Constants from '../../utils/constants';

/**
 * @name ProfilePage
 * @description displays in a form of logged in user data
 * @param {user} props contains a user object
 * @return component
 */

const ProfilePage = ({ user }) => {
  const [apiError] = useState(false);

  return (
    <>
      <body>
        <div className={styles.container}>
          {apiError && (
          <p data-testid="errMsg">
            {Constants.API_ERROR}
          </p>
          )}
          <div className={styles.profileContainer}>
            <p data-testid="createProfilePage">
              <h2 className={styles.title}>
                User Profile
                <hr />
              </h2>
              <h3 className={styles.category}>
                Name
              </h3>
              <h4>
                First Name:
                {' '}
                <span className={styles.input}>
                  {user.firstName}
                </span>
              </h4>
              <h4>
                Last Name:
                {' '}
                <span className={styles.input}>
                  {user.lastName}
                </span>
                <hr />
              </h4>
              <h3 className={styles.category}>
                Address
              </h3>
              <h4>
                Street:
                {' '}
                <span className={styles.input}>
                  {user.street}
                </span>
              </h4>
              <h4>
                City:
                {' '}
                <span className={styles.input}>
                  {user.city}
                </span>
              </h4>
              <h4>
                State:
                {' '}
                <span className={styles.input}>
                  {user.state}
                </span>
              </h4>
              <h4>
                Zip:
                {' '}
                <span className={styles.input}>
                  {user.zip}
                </span>
              </h4>
            </p>
          </div>
        </div>
      </body>
    </>
  );
};

export default ProfilePage;
