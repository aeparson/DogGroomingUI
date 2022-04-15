import React, { useState } from 'react';
import styles from './ProfilePage.css';
import Constants from '../../utils/constants';
// import loginUser from '../header/HeaderService';

import './ProfilePageService';

/**
 * @name ProfilePage
 * @description fetches user info from API and displays in a form
 * @param {user} props Contains a user object
 * @return component
 */

const ProfilePage = ({ user }) => {
  // const [userData, setUserData] = useState([]);
  const [apiError] = useState(false);

  // useEffect(() => {
  // fetchUserData(setUserData, setApiError);
  // }, []);

  return (
    <>
      <body className="container">
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        <form className="profileContainer">
          <h2 className="title">
            {user.firstName}
            {"'s "}
            User Profile
            <hr />
          </h2>
          {/* {userData.map((user) => <TableData key={user.email} googleUser={user} />)} */}
          <h3 style={styles} className="underline">
            Name
          </h3>
          <h4>
            First Name:
            {' '}
            {user.firstName}
          </h4>
          <h4>
            Last Name:
            {' '}
            {user.lastName}
          </h4>
          <h3 style={styles} className="underline">
            Address
          </h3>
          <h4>
            Street:
            {' '}
            {user.street}
          </h4>
          <h4>
            City:
            {' '}
            {user.city}
          </h4>
          <h4>
            State:
            {' '}
            {user.state}
          </h4>
          <h4>
            Zip:
            {' '}
            {user.zip}
          </h4>
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
