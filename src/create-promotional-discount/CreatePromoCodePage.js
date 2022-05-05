import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import NewPromoCodeForm from './CreatePromoCodeForm';
import styles from './CreatePromoCodePage.module.css';
import postNewPromoCode from './CreatePromoCodeService';
import validatePromoCode from './CreatePromoCodeValidation';
/**
 * @name CreatePromoCodePage
 * @description handles the changes when creating a new promo code,
 * @returns component
 */
const CreatePromoCodePage = () => {
  const history = useHistory();

  const [promoCodeData, setPromoCodeData] = useState({
    title: '',
    description: '',
    type: '',
    rate: ''
  });

  const handleChange = (e) => {
    setPromoCodeData({ ...promoCodeData, [e.target.id]: e.target.value });
  };

  const [fieldErrors, setFieldErrors] = useState({ promoCode: {} });

  const postPromoCodeAttempt = (newPromoCodeForm) => {
    const [invalidFields] = validatePromoCode(newPromoCodeForm);
    if (Object.keys(invalidFields).length === 0) {
      postNewPromoCode(newPromoCodeForm, history).then(() => {
        toast.success(`The Promo Code with the name ${promoCodeData.title} was saved successfully`);
      });
    } else {
      setFieldErrors({ promoCode: invalidFields });
      toast.error('Invalid entry. Please check form for details.');
    }
  };

  const handleCreate = async () => {
    const newPromoCodeForm = {
      title: promoCodeData.title,
      description: promoCodeData.description,
      type: promoCodeData.type,
      rate: promoCodeData.rate,
      percent: promoCodeData.percent,
      flat: promoCodeData.flat
    };
    postPromoCodeAttempt(newPromoCodeForm);
  };

  return (
    <div className={styles.wholePage}>
      <div className={styles.createPromoCodePage}>
        <h1 className={styles.h1}>Create Promo Code</h1>
        <NewPromoCodeForm
          onChange={handleChange}
          promoCodeData={promoCodeData}
          errors={fieldErrors.promoCode}
        />
        <button
          type="submit"
          onClick={handleCreate}
          className={styles.createButton}
        >
          Create Promo Code
        </button>
      </div>
    </div>
  );
};

export default CreatePromoCodePage;
