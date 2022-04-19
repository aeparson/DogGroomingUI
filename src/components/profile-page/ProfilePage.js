import React, { useState } from 'react';
<<<<<<< HEAD
import styles from './ProfilePage.css';
=======
import styles from './ProfilePage.module.css';
>>>>>>> bb8a26f4213ea5c5ad5434e0746503d72624d65a
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
<<<<<<< HEAD
      <div className="container">
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        <div className="profileContainer">
          <p data-testid="createProfilePage">
            <h2 className="title">
              User Profile
              <hr />
            </h2>
            <h3 style={styles} className="underline">
              Name
            </h3>
            <h4>
              First Name:
              {' '}
              <span className="input">
                {user.firstName}
              </span>
            </h4>
            <h4>
              Last Name:
              {' '}
              <span className="input">
                {user.lastName}
              </span>
              <hr />
            </h4>
            <h3 style={styles} className="category">
              Address
            </h3>
            <h4>
              Street:
              {' '}
              <span className="input">
                {user.street}
              </span>
            </h4>
            <h4>
              City:
              {' '}
              <span className="input">
                {user.city}
              </span>
            </h4>
            <h4>
              State:
              {' '}
              <span className="input">
                {user.state}
              </span>
            </h4>
            <h4>
              Zip:
              {' '}
              <span className="input">
                {user.zip}
              </span>
            </h4>
          </p>
        </div>
      </div>
=======
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
>>>>>>> bb8a26f4213ea5c5ad5434e0746503d72624d65a
    </>
  );
};

export default ProfilePage;
