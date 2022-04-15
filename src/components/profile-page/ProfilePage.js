/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.css';
import Constants from '../../utils/constants';

import { fetchUserData, fetchUserPurchase } from './ProfilePageService';

/**
 * @name ProfilePage
 * @description fetches user info from API and displays in a form
 * @return component
 */

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [purchases, setPurchase] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchUserData(setUserData, setApiError);
  }, []);

  useEffect(() => {
    fetchUserPurchase(setPurchase, setApiError);
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

      <div style={styles} className="scrollable">
        <table>
          <thead>
            <TableHeadings />
          </thead>
          <tbody>
            {purchases.sort((purchaseA, purchaseB) => purchaseA.OrderDate - purchaseB.OrderDate)
              .map((purchase) => <PurchaseTableData key={purchase.OrderDate} purchase={purchase} />)}
          </tbody>
        </table>
      </div>
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

/**
 * @desctiption a row of table data that holds the table headings.
 */
const TableHeadings = () => (
  <tr>
    <th>Purchase Date</th>
    <th>Total Purchase</th>
    <th>Purchase Details</th>
  </tr>
);

/**
 *
 * @param {string} dateString UTC Datestring from API (YYYY-MM-DDTHH:MM:SS.SSSSSS)
 * @returns {string} Formatted date (YYYY-MM-DD)
*/
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // months are zero-indexed
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * @description a row of table data for purchase history
 * @param {Object} purchase Contains a purchase object
 * @returns component
 */
const PurchaseTableData = (props) => {
  const { purchase } = props;
  return (
    <tr>
      <td>{formatDate(purchase.orderDate)}</td>
      <td>{purchase.purchaseTotal}</td>
      <td>
        <details>
          <summary>View Purchase Details</summary>
          <p>{`${purchase.lineItems[0].quantity}  ${purchase.lineItems[0].productName}`}</p>
        </details>
      </td>

    </tr>
  );
};

export default ProfilePage;
