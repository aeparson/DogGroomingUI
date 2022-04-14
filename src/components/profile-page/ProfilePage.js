import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.css';
import Constants from '../../utils/constants';
// import loginUser from '../header/HeaderService';

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
        {userData.map((user) => <TableData key={user.email} googleUser={user} />)}
      </form>
    </>
  );
};

/**
 * @description a row of table data for user data
 * @param {Object} props Contains a user object
 * @returns component
 */
const TableData = (props) => {
  const { user } = props;
  return (
    <tr>
      <td style={{ textAlign: 'right' }}>{user.email}</td>
      <td>{user.FirstName}</td>
      <td>{user.LastName}</td>
      <td>{user.Street}</td>
    </tr>
  );
};
export default ProfilePage;
