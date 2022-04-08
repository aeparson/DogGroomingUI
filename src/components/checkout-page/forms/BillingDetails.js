import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';

/**
 * @name BillingDetails
 * @description Allows entry of Billing Details
 * @return component
 */
const BillingDetails = ({
  onChange, billingData, useShippingForBilling, errors
}) => {
  const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  let streetError;
  let cityError;
  let stateError;
  let zipError;
  let emailError;
  let phoneError;
  let cardNumberError;
  let cvvError;
  let expirationError;
  let cardHolderError;
  if (errors !== undefined) {
    streetError = errors.find((error) => error.field === 'street');
    cityError = errors.find((error) => error.field === 'city');
    stateError = errors.find((error) => error.field === 'state');
    zipError = errors.find((error) => error.field === 'zip');
    emailError = errors.find((error) => error.field === 'email');
    phoneError = errors.find((error) => error.field === 'phone');
    cardNumberError = errors.find((error) => error.field === 'cardNumber');
    cvvError = errors.find((error) => error.field === 'cvv');
    expirationError = errors.find((error) => error.field === 'expiration');
    cardHolderError = errors.find((error) => error.field === 'cardholder');
  }
  return (

    <div className={styles.deliveryAddress}>
      {!useShippingForBilling && (
        <>
          <div className={streetError === undefined ? '' : styles.invalid}>
            <p className={styles.errorMessage}>
              {streetError === undefined ? '' : streetError.message}
            </p>
            <FormItem
              placeholder="e.g. 123 Sesame Street"
              type="text"
              id="billingStreet"
              label="Street"
              onChange={onChange}
              value={billingData.billingStreet}
            />
          </div>

          <FormItem
            placeholder="e.g. Unit #1"
            type="text"
            id="billingStreet2"
            label="Street 2 (Optional)"
            onChange={onChange}
            value={billingData.billingStreet2}
          />

          <div className={cityError === undefined ? '' : styles.invalid}>
            <p className={styles.errorMessage}>
              {cityError === undefined ? '' : cityError.message}
            </p>
            <FormItem
              type="text"
              id="billingCity"
              label="City"
              onChange={onChange}
              value={billingData.billingCity}
            />
          </div>

          <div className={stateError === undefined ? '' : styles.invalid}>
            <p className={styles.errorMessage}>
              {stateError === undefined ? '' : stateError.message}
            </p>
            <FormItemDropdown
              id="billingState"
              label="State"
              onChange={onChange}
              value={billingData.billingState}
              options={usStates}
            />
          </div>

          <div className={zipError === undefined ? '' : styles.invalid}>
            <p className={styles.errorMessage}>
              {zipError === undefined ? '' : zipError.message}
            </p>
            <FormItem
              placeholder="e.g. 12345"
              type="text"
              id="billingZip"
              label="Zip"
              onChange={onChange}
              value={billingData.billingZip}
            />
          </div>
        </>
      )}
      <div className={emailError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {emailError === undefined ? '' : emailError.message}
        </p>
        <FormItem
          placeholder="e.g. example@catalyte.io"
          type="email"
          id="email"
          label="Email"
          onChange={onChange}
          value={billingData.email}
        />
      </div>

      <div className={phoneError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {phoneError === undefined ? '' : phoneError.message}
        </p>
        <FormItem
          placeholder="e.g. 555-555-5555"
          type="text"
          id="phone"
          label="Phone"
          onChange={onChange}
          value={billingData.phone}
        />
      </div>

      <div className={cardNumberError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {cardNumberError === undefined ? '' : cardNumberError.message}
        </p>
        <FormItem
          placeholder="e.g. 1234567812345678"
          type="text"
          id="creditCard"
          label="Credit Card"
          onChange={onChange}
          value={billingData.creditCard}
        />
      </div>

      <div className={cvvError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {cvvError === undefined ? '' : cvvError.message}
        </p>
        <FormItem
          placeholder="e.g. 555"
          type="text"
          id="cvv"
          label="CVV"
          onChange={onChange}
          value={billingData.cvv}
        />
      </div>

      <div className={expirationError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {expirationError === undefined ? '' : expirationError.message}
        </p>
        <FormItem
          placeholder="e.g. 05/21"
          type="text"
          id="expiration"
          label="Expiration"
          onChange={onChange}
          value={billingData.expiration}
        />
      </div>

      <div className={cardHolderError === undefined ? '' : styles.invalid}>
        <p className={styles.errorMessage}>
          {cardHolderError === undefined ? '' : cardHolderError.message}
        </p>
        <FormItem
          type="text"
          id="cardholder"
          label="Cardholder Name"
          onChange={onChange}
          value={billingData.cardholder}
        />
      </div>
    </div>

  );
};

export default BillingDetails;
