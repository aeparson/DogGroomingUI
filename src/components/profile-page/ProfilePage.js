import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import styles from './ProfilePage.module.css';
import Constants from '../../utils/constants';
import fetchUserPurchase from './ProfilePageService';

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
 * @name ProfilePage
 * @description fetches user & purchase info from API and displays in two blocks when logged in.
 * @return component
 */
const ProfilePage = ({ user }) => {
  const [purchases, setPurchase] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [value, setValue] = React.useState(2);
  const reversedPurchases = [...purchases].reverse();

  useEffect(() => {
    fetchUserPurchase(setPurchase, setApiError, user);
  }, [user]);

  const PurchaseTableData = (props) => {
    const { purchase } = props;

    return (
      <>
        <tr>
          <td className={styles.lineItems}>{formatDate(purchase.orderDate)}</td>
          <td className={styles.lineItems}>{`$${purchase.purchaseTotal.toFixed(2)}`}</td>
          <td>
            <details className={styles.purchaseDetails}>
              <summary className={styles.lineItems}>click to show products</summary>
              <div>
                {purchase.lineItems.map((lineItem) => (
                  <div key={lineItem.productId}>
                    <p>
                      {' '}
                      {lineItem.quantity}
                      {' of '}
                      {lineItem.productName}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <>
        <Paper square>
          <Tabs
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <Tab label="Profile Information" />
            {user !== '' ? (
              <Tab label="Purchase History" />
            ) : null}
          </Tabs>
        </Paper>
      </>
      <div className={styles.container}>
        {apiError && (
        <p data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        {value === 0 && (
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
        )}
        { value === 1 && (
        <>
          {user !== '' ? (
            <div className={styles.purchaseHistoryTable}>
              <h3 className={styles.viewPurchaseHistory}>Purchase History</h3>
              <hr />
              <table>
                {purchases.length !== 0 ? (
                  <>
                    <TableHeadings />
                    {reversedPurchases
                      .map((purchase) => (
                        <PurchaseTableData
                          key={purchase.OrderDate}
                          purchase={purchase}
                        />
                      ))}

                  </>
                )
                  : (
                    <h2>You have no past purchases.</h2>
                  )}
              </table>
            </div>
          ) : (<p />)}
        </>
        )}
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

export default ProfilePage;
