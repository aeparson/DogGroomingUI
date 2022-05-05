import React from 'react';
import FormItem from '../components/form/FormItem';
import styles from './CreatePromoCodePage.module.css';
import Buttons from './CreatePromoCodeButtons';

/**
 * @name NewPromoCodeForm
 * @description allows entry of promocode
 * @returns component
 */
const NewPromoCodeForm = ({ onChange, promoCodeData, errors }) => (
  <div className={styles.promoCodeFields}>
    <form>
      <div className={styles.column}>
        <div>
          <div className={errors.title === undefined ? undefined : styles.invalid}>
            <FormItem
              type="text"
              id="title"
              label="Title"
              value={promoCodeData.title}
              onChange={onChange}
            />
            <p className={styles.errorMessage}>
              {errors.title !== undefined && errors.title}
            </p>
          </div>
          <br />
          <div className={errors.description === undefined ? undefined : styles.invalid}>
            <FormItem
              type="text"
              id="description"
              label="Description"
              value={promoCodeData.description}
              onChange={onChange}
            />
            <p className={styles.errorMessage}>
              {errors.description !== undefined && errors.description}
            </p>
          </div>
        </div>
        <br />
        <div className={errors.type === undefined ? undefined : styles.invalid}>
          <div>
            <strong>Type</strong>
            <Buttons onChange={onChange} promoCodeData={promoCodeData} />
          </div>
          <p className={styles.errorMessage}>
            {errors.type !== undefined && errors.type}
          </p>
        </div>
        <br />
        <div id="1" className={errors.rate === undefined ? undefined : styles.invalid}>
          <div className={errors.flat === undefined ? undefined : styles.invalid}>
            <div className={errors.percent === undefined ? undefined : styles.invalid}>
              <FormItem
                type="text"
                id="rate"
                label="Rate"
                value={promoCodeData.rate}
                onChange={onChange}
              />
              <p className={styles.errorMessage}>
                {errors.rate !== undefined && errors.rate}
                {errors.percent !== undefined && errors.percent}
                {errors.flat !== undefined && errors.flat}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default NewPromoCodeForm;
