import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import validatePurchase from './CheckoutValidation';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const history = useHistory();

  const {
    state: { products }
  } = useCart();

  const [billingData, setBillingData] = React.useState({});

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const [deliveryData, setDeliveryData] = React.useState({});

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const [fieldErrors, setFieldErrors] = React.useState({ delivery: [], billing: [] });
  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };

  const handlePay = () => {
    const productData = products.map(({ id, quantity }) => ({ id, quantity }));
    const deliveryAddress = {
      deliveryFirstName: deliveryData.deliveryFirstName,
      deliveryLastName: deliveryData.deliveryLastName,
      deliveryStreet: deliveryData.deliveryStreet,
      deliveryStreet2: deliveryData.deliveryStreet2,
      deliveryCity: deliveryData.deliveryCity,
      deliveryState: deliveryData.deliveryState,
      deliveryZip: deliveryData.deliveryZip
    };
    const billingAddress = {};
    if (checked) {
      billingAddress.billingStreet = deliveryAddress.deliveryStreet;
      billingAddress.billingStreet2 = deliveryAddress.deliveryStreet2;
      billingAddress.billingCity = deliveryAddress.deliveryCity;
      billingAddress.billingState = deliveryAddress.deliveryState;
      billingAddress.billingZip = deliveryAddress.deliveryZip;
    } else {
      billingAddress.billingStreet = billingData.billingStreet;
      billingAddress.billingStreet2 = billingData.billingStreet2;
      billingAddress.billingCity = billingData.billingCity;
      billingAddress.billingState = billingData.billingState;
      billingAddress.billingZip = billingData.billingZip;
    }
    billingAddress.email = billingData.email;
    billingAddress.phone = billingData.phone;

    const creditCard = {
      cardNumber: billingData.creditCard,
      cvv: billingData.cvv,
      expiration: billingData.expiration,
      cardholder: billingData.cardholder
    };
    const [
      invalidDelivery,
      invalidBilling
    ] = validatePurchase(deliveryAddress, billingAddress, creditCard);
    if (Object.keys(invalidDelivery).length === 0 && Object.keys(invalidBilling).length === 0) {
      makePurchase(productData, deliveryAddress, billingAddress, creditCard).then(() => history.push('/confirmation'));
    } else {
      setFieldErrors({ delivery: invalidDelivery, billing: invalidBilling });
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={`${styles.step} ${styles.order}`}>
        <h3 className={styles.title}>1. Review Order</h3>
        <ReviewOrderWidget />
      </div>
      <div className={`${styles.step} ${styles.delivery}`}>
        <h3 className={styles.title}>2. Delivery Address</h3>
        <DeliveryAddress
          onChange={onDeliveryChange}
          deliveryData={deliveryData}
          errors={fieldErrors.delivery}
        />
        <label htmlFor="useSame" className={styles.sameAddressText}>
          <div className={styles.useSameAddress}>
            <input
              id="useSame"
              onChange={handleCheck}
              type="checkbox"
              value={checked}
            />
          </div>
          Same Billing Address
        </label>
      </div>
      <div className={`${styles.step} ${styles.payment}`}>
        <h3 className={styles.title}>3. Billing Details</h3>
        <BillingDetails
          onChange={onBillingChange}
          billingData={billingData}
          useShippingForBilling={checked}
          errors={fieldErrors.billing}
        />
      </div>
      <div className={styles.payNow}>
        <button onClick={handlePay} type="button" className={styles.payButton}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
