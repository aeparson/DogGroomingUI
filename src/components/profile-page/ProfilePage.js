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
      <div className="container">
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        <div className="profileContainer">
          <h2 className="title">
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
          <h3 style={styles} className="underline">
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
        </div>
      </div>
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
