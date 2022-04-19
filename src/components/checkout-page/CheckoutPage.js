import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import validatePurchase from './CheckoutValidation';
import regionToCode from './RegionToCode';
import { getSubtotal } from './ReviewOrderWidgetService';

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

  const [billingData, setBillingData] = useState({
    billingStreet: '',
    billingStreet2: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    email: '',
    phone: '',
    creditCard: '',
    cardholder: '',
    cvv: '',
    expiration: ''
  });

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const [deliveryData, setDeliveryData] = useState({
    deliveryFirstName: '', deliveryLastName: '', deliveryStreet: '', deliveryStreet2: '', deliveryCity: '', deliveryState: '', deliveryZip: ''
  });

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const [fieldErrors, setFieldErrors] = useState({ delivery: [], billing: [] });

  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };

  const attemptPurchase = (deliveryAddress, billingAddress, creditCard, productData, subtotal) => {
    // Front end validation
    const [
      invalidDelivery,
      invalidBilling
    ] = validatePurchase(deliveryAddress, billingAddress, creditCard);
    // If all fields are valid
    if (productData.length === 0) {
      toast.error('No products in cart');
    } else if (Object.keys(invalidDelivery).length === 0
     && Object.keys(invalidBilling).length === 0) {
      makePurchase(productData, deliveryAddress,
        billingAddress, creditCard, subtotal).then(() => {
        history.push('/confirmation');
      }).catch(() => {
        setFieldErrors({ delivery: invalidDelivery, billing: invalidBilling });
        toast.error('Transaction could not be processed');
      });
    } else {
      setFieldErrors({ delivery: invalidDelivery, billing: invalidBilling });
      toast.error('Please correct errors and try again');
    }
  };
  const handlePay = async () => {
    const productData = products.map(({ productId, quantity, title }) => (
      { productId, quantity, productName: title }));
    const deliveryAddress = {
      deliveryFirstName: deliveryData.deliveryFirstName,
      deliveryLastName: deliveryData.deliveryLastName,
      deliveryStreet: deliveryData.deliveryStreet,
      deliveryStreet2: deliveryData.deliveryStreet2,
      deliveryCity: deliveryData.deliveryCity,
      // Convert to state code for API compatibility
      deliveryState: regionToCode(deliveryData.deliveryState),
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
      // Convert to state code for API compatibility
      billingAddress.billingState = regionToCode(billingData.billingState);
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
    attemptPurchase(
      deliveryAddress, billingAddress, creditCard, productData, getSubtotal(products)
    );
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
