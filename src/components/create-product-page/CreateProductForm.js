import React from 'react';
import FormItem from '../form/FormItem';
import styles from './CreateProductPage.module.css';
import Buttons from './CreateProductPageButtons';

/// summary - Builds the create product page form
const NewProductForm = ({ onChange, productData, errors }) => (

  <div className={styles.productFields}>
    <form>
      <div className={styles.column}>
        <div className={errors.active === undefined ? undefined : styles.invalid}>
          <div>
            <strong>Active Status</strong>
            <Buttons onChange={onChange} productData={productData} />
          </div>
        </div>
        {/* <br /> */}
        <div className={errors.name === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="name"
            label="Name"
            value={productData.label}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.name !== undefined && errors.name}
          </p>
        </div>
        <br />
        <div className={errors.brand === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="brand"
            label="Brand"
            value={productData.brand}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.brand !== undefined && errors.brand}
          </p>
        </div>
        <br />
        <div className={errors.category === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="category"
            label="Category"
            value={productData.category}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.category !== undefined && errors.category}
          </p>
        </div>
        <br />
        <div className={errors.type === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="type"
            label="Type"
            value={productData.type}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.type !== undefined && errors.type}
          </p>
        </div>
        <br />
        <div className={errors.material === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="material"
            label="Material"
            value={productData.material}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.material !== undefined && errors.material}
          </p>
        </div>
        <br />
        <div className={errors.description === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="description"
            label="Description"
            value={productData.description}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.description !== undefined && errors.description}
          </p>
        </div>
        <br />
        <div className={errors.demographic === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="demographic"
            label="Demographic"
            value={productData.demographic}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.demographic !== undefined && errors.demographic}
          </p>
        </div>
      </div>
      <div className={styles.column}>
        <div className={errors.price === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="price"
            label="Price"
            value={productData.price}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.price !== undefined && errors.price}
          </p>
        </div>
        <br />
        <div className={errors.quantity === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="quantity"
            label="Quantity"
            value={productData.quantity}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.quantity !== undefined && errors.quantity}
          </p>
        </div>
        <br />
        <div className={errors.primaryColorCode === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="primaryColorCode"
            label="Primary Color Code"
            value={productData.primaryColorCode}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.primaryColorCode !== undefined && errors.primaryColorCode}
          </p>
        </div>
        <br />
        <div className={errors.secondaryColorCode === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="secondaryColorCode"
            label="Secondary Color Code"
            value={productData.secondaryColorCode}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.secondaryColorCode !== undefined && errors.secondaryColorCode}
          </p>
        </div>
        <br />
        <div className={errors.styleNumber === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="styleNumber"
            label="Style Number"
            value={productData.styleNumber}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.styleNumber !== undefined && errors.styleNumber}
          </p>
        </div>
        <br />
        <div className={errors.releaseDate === undefined ? undefined : styles.invalid}>
          <FormItem
            type="date"
            id="releaseDate"
            label="Release Date"
            value={productData.releaseDate}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.releaseDate !== undefined && errors.releaseDate}
          </p>
        </div>
        <br />
        <div className={errors.imageSrc === undefined ? undefined : styles.invalid}>
          <FormItem
            type="text"
            id="imageSrc"
            label="Image Source"
            value={productData.imageSrc}
            onChange={onChange}
          />
          <p className={styles.errorMessage}>
            {errors.imageSrc !== undefined && errors.imageSrc}
          </p>
        </div>
      </div>
    </form>
  </div>
);

export default NewProductForm;
