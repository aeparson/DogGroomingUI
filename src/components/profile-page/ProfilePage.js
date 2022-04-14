import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.css';
import Constants from '../../utils/constants';
// import loginUser from '../header/HeaderService';

import './ProfilePageService';

/**
 * @name ProfilePage
 * @description fetches user info from API and displays in a form
 * @return component
 */

const ProfilePage = ({ user }) => {
  // const [userData, setUserData] = useState([]);
  const [apiError] = useState(false);

  useEffect(() => {
    // fetchUserData(setUserData, setApiError);
  }, []);

  return (
    <>
      <body className="container">
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        <form className={styles.profileContainer}>
          <h2 className="title"> Your User Profile</h2>
          {/* {userData.map((user) => <TableData key={user.email} googleUser={user} />)} */}
          <h3>
            First Name:
            {user.firstName}
          </h3>
          <h3>
            Last Name:
            {user.lastName}
          </h3>
          <h3>
            Street:
            {user.Street}
          </h3>
          <h3>
            City:
            {user.email}
          </h3>
          <h3>
            State:
            {user.state}
          </h3>
          <h3>
            Zip:
            {user.zip}
          </h3>
        </form>
      </body>
    </>
  );
};

/**
 * @description a row of table data for user data
 * @param {Object} props Contains a user object
 * @returns component
 */
// const TableData = (props) => {
// const { user } = props;
// return (
//     <tr>
//       <td style={{ textAlign: 'right' }}>{user.email}</td>
//       <td>{user.FirstName}</td>
//       <td>{user.LastName}</td>
//       <td>{user.Street}</td>
//     </tr>
//   );
// };
export default ProfilePage;
