import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';

/**
 * @name DeliveryAddress
 * @description Allows entry of delivery address
 * @return component
 */
const DeliveryAddress = ({ onChange, deliveryData, errors }) => {
  const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  let firstNameError;
  let lastNameError;
  let streetError;
  let cityError;
  let stateError;
  let zipError;
  if (errors !== undefined) {
    firstNameError = errors.find((error) => error.field === 'firstName');
    lastNameError = errors.find((error) => error.field === 'lastName');
    streetError = errors.find((error) => error.field === 'street');
    cityError = errors.find((error) => error.field === 'city');
    stateError = errors.find((error) => error.field === 'state');
    zipError = errors.find((error) => error.field === 'zip');
  }

  return (

    <div className={styles.deliveryAddress}>
      <div className={firstNameError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {(firstNameError !== undefined) && firstNameError.message}
        </p>
        <FormItem
          type="text"
          id="firstName"
          label="First Name"
          onChange={onChange}
          value={deliveryData.firstName}
        />
      </div>

      <div className={lastNameError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {lastNameError !== undefined && lastNameError.message}
        </p>
        <FormItem
          type="text"
          id="lastName"
          label="Last Name"
          onChange={onChange}
          value={deliveryData.lastName}
        />
      </div>

      <div className={streetError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {streetError !== undefined && streetError.message}
        </p>
        <FormItem
          placeholder="e.g. 123 Sesame Street"
          type="text"
          id="street"
          label="Street"
          onChange={onChange}
          value={deliveryData.street}
        />
      </div>

      <FormItem
        placeholder="e.g. Unit #1"
        type="text"
        id="street2"
        label="Street 2 (Optional)"
        onChange={onChange}
        value={deliveryData.street2}
      />

      <div className={cityError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {cityError !== undefined && cityError.message}
        </p>
        <FormItem
          type="text"
          id="city"
          label="City"
          onChange={onChange}
          value={deliveryData.city}
        />
      </div>

      <div className={stateError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {stateError !== undefined && stateError.message}
        </p>
        <FormItemDropdown
          id="state"
          label="State"
          onChange={onChange}
          value={deliveryData.state}
          options={usStates}
        />
      </div>

      <div className={zipError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {zipError !== undefined && zipError.message}
        </p>
        <FormItem
          placeholder="e.g. 12345"
          type="text"
          id="zip"
          label="Zip"
          onChange={onChange}
          value={deliveryData.zip}
        />
      </div>
    </div>

  );
};

export default DeliveryAddress;
