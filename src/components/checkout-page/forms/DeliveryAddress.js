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

  return (
    <div className={styles.deliveryAddress}>
      <div className={errors.firstName === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {(errors.firstName !== undefined) && errors.firstName}
        </p>
        <FormItem
          type="text"
          id="firstName"
          label="First Name"
          onChange={onChange}
          value={deliveryData.firstName}
        />
      </div>

      <div className={errors.lastName === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.lastName !== undefined && errors.lastName}
        </p>
        <FormItem
          type="text"
          id="lastName"
          label="Last Name"
          onChange={onChange}
          value={deliveryData.lastName}
        />
      </div>

      <div className={errors.street === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.street !== undefined && errors.street}
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

      <div className={errors.city === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.city !== undefined && errors.city}
        </p>
        <FormItem
          type="text"
          id="city"
          label="City"
          onChange={onChange}
          value={deliveryData.city}
        />
      </div>

      <div className={errors.state === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.state !== undefined && errors.state}
        </p>
        <FormItemDropdown
          id="state"
          label="State"
          onChange={onChange}
          value={deliveryData.state}
          options={usStates}
        />
      </div>

      <div className={errors.zip === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.zip !== undefined && errors.zip}
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
