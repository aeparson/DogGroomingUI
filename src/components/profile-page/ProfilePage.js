/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.css';
import Constants from '../../utils/constants';
import fetchUserPurchase from './ProfilePageService';

/**
 * @name ProfilePage
 * @description fetches user info from API and displays in a form
 * @return component
 */

const ProfilePage = ({ user }) => {
  const [purchases, setPurchase] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    fetchUserPurchase(setPurchase, setApiError);
  }, []);

  return (
    <>
      <div className="container">
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

      </div>

      <div className={styles.tableDiv}>
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
      <td>{`$ ${purchase.purchaseTotal.toFixed(2)}`}</td>
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
