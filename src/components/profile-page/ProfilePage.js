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
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // months are zero-indexed
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ProfilePage = ({ user }) => {
  const [purchases, setPurchase] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchUserPurchase(setPurchase, setApiError, user);
  }, [user]);

  const PurchaseTableData = (props) => {
    const { purchase } = props;

    return (
      <tr>
        <td>{formatDate(purchase.orderDate)}</td>
        <td>{`$${purchase.purchaseTotal.toFixed(2)}`}</td>
        <td>
          <details>
            <summary>click to show products</summary>
            <div className={styles.purchaseDetails}>
              {purchase.lineItems.map((lineItem) => (
                <div key={lineItem.productId}>
                  <p>
                    {' '}
                    {lineItem.quantity}
                    {' '}
                    {lineItem.productName}
                  </p>
                </div>
              ))}
            </div>
          </details>
        </td>

      </tr>
    );
  };

  return (
    <>
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

      <div className={styles.purchaseHistoryTable}>
        <details>
          <summary><h3 className={styles.viewPurchaseHistory}>View Purchase History</h3></summary>
          <table>
            <thead>
              <TableHeadings />
            </thead>
            <tbody>
              {purchases.sort((purchaseA, purchaseB) => purchaseA.OrderDate - purchaseB.OrderDate)
                .map((purchase) => <PurchaseTableData key={purchase.OrderDate} purchase={purchase} />)}
            </tbody>
          </table>
        </details>
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

/**
 * @description a row of table data for purchase history
 * @param {Object} purchase Contains a purchase object
 * @returns component
 */
// const PurchaseTableData = (props) => {
//   const { purchase } = props;

//   return (
//     <tr>
//       <td>{formatDate(purchase.orderDate)}</td>
//       <td>{`$ ${purchase.purchaseTotal.toFixed(2)}`}</td>
//       <td>
//         <details>
//           <summary>click to show products</summary>
//           <p>{`${purchases.map(purchase.lineItems.quantity)}  ${purchase.map(purchase.lineItems.productName)}`}</p>
//           {/* <p>{`${purchase.lineItems[1].quantity}  ${purchase.lineItems[1].productName}`}</p> */}
//         </details>
//       </td>

//     </tr>
//   );
// };
export default ProfilePage;
