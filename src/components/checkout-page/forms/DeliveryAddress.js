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
      <div className={errors.deliveryFirstName === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {(errors.deliveryFirstName !== undefined) && errors.deliveryFirstName}
        </p>
        <FormItem
          type="text"
          id="deliveryFirstName"
          label="First Name"
          onChange={onChange}
          value={deliveryData.deliveryFirstName}
        />
      </div>

      <div className={errors.deliveryLastName === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.deliveryLastName !== undefined && errors.deliveryLastName}
        </p>
        <FormItem
          type="text"
          id="deliveryLastName"
          label="Last Name"
          onChange={onChange}
          value={deliveryData.deliveryLastName}
        />
      </div>

      <div className={errors.deliveryStreet === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.deliveryStreet !== undefined && errors.deliveryStreet}
        </p>
        <FormItem
          placeholder="e.g. 123 Sesame Street"
          type="text"
          id="deliveryStreet"
          label="Street"
          onChange={onChange}
          value={deliveryData.deliveryStreet}
        />
      </div>

      <div className={errors.deliveryStreet2 === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.deliveryStreet2 !== undefined && errors.deliveryStreet2}
        </p>
        <FormItem
          placeholder="e.g. Unit #1"
          type="text"
          id="deliveryStreet2"
          label="Street 2 (Optional)"
          onChange={onChange}
          value={deliveryData.deliveryStreet2}
        />
      </div>

      <div className={errors.deliveryCity === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.deliveryCity !== undefined && errors.deliveryCity}
        </p>
        <FormItem
          type="text"
          id="deliveryCity"
          label="City"
          onChange={onChange}
          value={deliveryData.deliveryCity}
        />
      </div>

      <div className={errors.deliveryState === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.deliveryState !== undefined && errors.deliveryState}
        </p>
        <FormItemDropdown
          id="deliveryState"
          label="State"
          onChange={onChange}
          value={deliveryData.deliveryState}
          options={usStates}
        />
      </div>

      <div className={errors.deliveryZip === undefined ? undefined : styles.invalid}>
        <p className={styles.errorMessage}>
          {errors.deliveryZip !== undefined && errors.deliveryZip}
        </p>
        <FormItem
          placeholder="e.g. 12345"
          type="text"
          id="deliveryZip"
          label="Zip"
          onChange={onChange}
          value={deliveryData.deliveryZip}
        />
      </div>
    </div>

  );
};

export default DeliveryAddress;
