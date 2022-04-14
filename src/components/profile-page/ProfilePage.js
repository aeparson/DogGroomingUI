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
      <div style={styles} className="scrollable">
        <table>
          <thead>
            <TableHeadings />
          </thead>
          <tbody>
            {purchases.sort((purchaseA, purchaseB) => purchaseA.OrderDate - purchaseB.OrderDate)
              .map((purchase) => <TableData key={purchase.OrderDate} purchase={purchase} />)}
          </tbody>
        </table>
      </div>
    </>

  );
};

/**
 * @desctiption a row of table data that holds the table headings.
 */
const TableHeadings = () => (
  <tr>
    <th>Purchase Date</th>
    <th>Total Price</th>
    <th>Products Purchased</th>
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
 * @param {Object} purch Contains a purchase object
 * @returns component
 */
const TableData = (props) => {
  const { purchase } = props;
  return (
    <tr>
      <td>{formatDate(purchase.OrderDate)}</td>
      {/* <td style={{ textAlign: 'right' }}>{purchase.lineItem.purchaseTotal.toFixed(2)}</td> */}
      {/* <td style={{ textAlign: 'right' }}>{purchase.lineItem.Quantity}</td> */}
    </tr>
  );
};

export default ProfilePage;
