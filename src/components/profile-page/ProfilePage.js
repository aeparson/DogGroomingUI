import React, { useEffect } from 'react';
import styles from './ProfilePage.css';

/**
 * @name ProfileInfo
 * @description fetches user info from API and displays in a form
 * @return component
 */
const ProfileInfo = () => (

  <form className={styles.profileContainer}>
    <h2 className="title"> Your User Profile</h2>
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
);

const PurchaseHistory = () => {
  const [purchase, setPurchase] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchUserPurchases(setPurchase, setApiError);
  }),

    <div style={styles} className="scrollable">
      <table>
        <thead>
          <TableHeadings />
        </thead>
        <tbody>
          {purchase.sort((productA, productB) => productA.purchaseDate - productB.purchaseDate)
            .map((product) => <TableData key={product.purchaseDate} product={product} />)}
        </tbody>
      </table>
    </div>;
};

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
const TableData = (purch) => {
  const { purchase } = purch;
  return (
    <tr>
      <td style={{ textAlign: 'right' }}>{purchase.price.toFixed(2)}</td>
      <td style={{ textAlign: 'right' }}>{purchase.quantity}</td>
      <td>{formatDate(purchase.purchaseDate)}</td>
    </tr>
  );
};

export default { ProfileInfo, PurchaseHistory };
