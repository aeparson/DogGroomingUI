/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import styles from './ProfilePage.module.css';
import Constants from '../../utils/constants';
import { fetchUserPurchase, updateUserInfo } from './ProfilePageService';
import validateProfile from './ProfileValidation';

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
const ProfilePage = ({ user, setUser }) => {
  const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  const [purchases, setPurchase] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [value, setValue] = React.useState(2);
  const [editText, setEditText] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    firstName: '', lastName: '', street: '', city: '', state: user.state, zip: '', email: user.email
  });
  const [fieldErrors, setFieldErrors] = useState([]);

  /**
   * @description Changes state of edit text, which then changes profile information
   * to form input boxes and changes buttons to save and cancel.
   */
  const changeText = () => {
    setEditText(!editText);
  };
  /**
   * @description Allows form input boxes to be typed into
   */
  const onProfileChange = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.id]: e.target.value });
  };

  /**
   * @description Packet of information being sent to database for put request.
   * If information has been entered into a form box, it will be read and added
   * to the packet, otherwise what is sent is the user's existing information.
   */

  const profilePacket = {
    firstName: (profileInfo.firstName === '' ? user.firstName : profileInfo.firstName),
    lastName: (profileInfo.lastName === '' ? user.lastName : profileInfo.lastName),
    street: (profileInfo.street === '' ? user.street : profileInfo.street),
    city: (profileInfo.city === '' ? user.city : profileInfo.city),
    state: (profileInfo.state === user.state ? user.state : profileInfo.state),
    zip: (profileInfo.zip === '' ? user.zip : profileInfo.zip),
    email: user.email
  };

  /**
   * @description Event handler for cancel button -- when clicked, profile information
   * reverts to an empty string and errors are reset. changeText function is called to
   * change input boxes back to lines of uneditable information.
   */

  const cancelChanges = () => {
    changeText();
    profileInfo.firstName = '';
    profileInfo.lastName = '';
    profileInfo.street = '';
    profileInfo.city = '';
    profileInfo.state = user.state;
    profileInfo.zip = '';
    setFieldErrors([]);
  };

  /**
   * @description Event handler that sends PUT request to database on clicking Save. Validation is
   * initially checked, and either field errors are set where necessary, or information packet is
   * sent to database and changes are persisted.
   */

  const attemptProfileChange = () => {
    const invalidInfo = validateProfile(profilePacket);
    if (Object.keys(invalidInfo).length === 0) {
      updateUserInfo(profilePacket, user, setApiError);
      cancelChanges();
      setFieldErrors([]);
      Object.assign(user, profilePacket);
      setUser(profilePacket);
    } else {
      setFieldErrors(invalidInfo);
    }
  };

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
          <div className={styles.profileInfoContainer}>
            <div className={styles.profileContainer}>
              <p data-testid="createProfilePage">
                <h3 className={styles.title}>
                  User Profile
                  <hr />
                </h3>
                <h4 className={styles.category}>
                  Name
                </h4>
                <h4>
                  First Name:
                  {' '}
                  <div className={styles.inputContainer}>
                    <div className={fieldErrors.firstName === undefined ? undefined
                      : styles.invalid}
                    >
                      <span className={styles.input}>
                        {editText ? (
                          <FormItem
                            placeholder={user.firstName}
                            defaultValue={user.firstName}
                            type="text"
                            id="firstName"
                            onChange={onProfileChange}
                            value={profileInfo.firstName}
                          />
                        ) : user.firstName}
                      </span>
                    </div>
                    <p className={styles.errorMessage}>
                      {fieldErrors.firstName !== undefined && fieldErrors.firstName}
                    </p>
                  </div>
                </h4>
                <h4>
                  Last Name:
                  {' '}
                  <div className={styles.inputContainer}>
                    <div className={fieldErrors.lastName === undefined ? undefined
                      : styles.invalid}
                    >
                      <span className={styles.input}>
                        {editText ? (
                          <FormItem
                            placeholder={user.lastName}
                            defaultValue={user.lastName}
                            type="text"
                            id="lastName"
                            onChange={onProfileChange}
                            value={profileInfo.lastName}
                          />
                        ) : user.lastName}
                      </span>
                    </div>
                    <p className={styles.errorMessage}>
                      {fieldErrors.lastName !== undefined && fieldErrors.lastName}
                    </p>
                  </div>
                </h4>
                <h4 className={styles.category}>
                  Address
                </h4>
                <h4>
                  Street:
                  {' '}
                  <div className={styles.inputContainer}>
                    <div className={fieldErrors.street === undefined ? undefined : styles.invalid}>
                      <span className={styles.input}>
                        {editText ? (
                          <FormItem
                            placeholder={user.street}
                            defaultValue={user.street}
                            type="text"
                            id="street"
                            onChange={onProfileChange}
                            value={profileInfo.street}
                          />
                        ) : user.street}
                      </span>
                    </div>
                    <p className={styles.errorMessage}>
                      {fieldErrors.street !== undefined && fieldErrors.street}
                    </p>
                  </div>
                </h4>
                <h4>
                  City:
                  {' '}
                  <div className={styles.inputContainer}>
                    <div className={fieldErrors.city === undefined ? undefined : styles.invalid}>
                      <span className={styles.input}>
                        {editText ? (
                          <FormItem
                            placeholder={user.city}
                            defaultValue={user.city}
                            type="text"
                            id="city"
                            onChange={onProfileChange}
                            value={profileInfo.city}
                          />
                        ) : user.city}
                      </span>
                    </div>
                    <p className={styles.errorMessage}>
                      {fieldErrors.city !== undefined && fieldErrors.city}
                    </p>
                  </div>
                </h4>
                <h4>
                  State:
                  {' '}
                  <div className={styles.inputContainer}>
                    <span className={styles.input}>
                      {editText ? (
                        <FormItemDropdown
                          id="state"
                          onChange={onProfileChange}
                          value={profileInfo.state}
                          options={usStates}
                          defaultValue={user.state}
                        />
                      ) : user.state}
                    </span>
                  </div>
                </h4>
                <h4>
                  Zip:
                  {' '}
                  <div className={styles.inputContainer}>
                    <div className={fieldErrors.zip === undefined ? undefined : styles.invalid}>
                      <span className={styles.input}>
                        {editText ? (
                          <FormItem
                            placeholder={user.zip}
                            defaultValue={user.zip}
                            type="text"
                            id="zip"
                            onChange={onProfileChange}
                            value={profileInfo.zip}
                          />
                        ) : user.zip}
                      </span>
                    </div>
                    <p className={styles.errorMessage}>
                      {fieldErrors.zip !== undefined && fieldErrors.zip}
                    </p>
                  </div>
                </h4>
              </p>
              <Box className={editText ? styles.buttonContainerEdit : styles.buttonContainer}>
                {editText ? (
                  <Button
                    onClick={editText ? cancelChanges : changeText}
                    variant="contained"
                    disableElevation
                    size="small"
                  >
                    CANCEL
                  </Button>
                ) : null }
                <Button
                  onClick={editText ? attemptProfileChange : changeText}
                  variant="contained"
                  disableElevation
                  size="small"
                  data-testid="edit-spot"
                >
                  {editText ? 'SAVE' : 'EDIT'}
                </Button>
              </Box>
            </div>
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
                    {[...purchases].reverse()
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
