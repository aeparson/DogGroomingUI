/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
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
        <div className="profileContainer">
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

      <div>
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
          <summary>click to show products</summary>
          <p>{`${purchase.lineItems[0].quantity}  ${purchase.lineItems[0].productName}`}</p>
          <p>{`${purchase.lineItems[1].quantity}  ${purchase.lineItems[1].productName}`}</p>
          <p>{`${purchase.lineItems[2].quantity}  ${purchase.lineItems[2].productName}`}</p>
        </details>
      </td>

    </tr>
  );
};
export default ProfilePage;
