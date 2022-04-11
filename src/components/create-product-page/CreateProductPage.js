import React, { useState, history } from 'react';
import { toast } from 'react-toastify';
import FormItem from '../form/FormItem';
import styles from './CreateProductPage.css';
import postNewProduct from './CreateProductPageService';

/**
 * @name CreateProductPage
 * @description handles the changes when creating a new product, maps new product data
 *
 */
const CreateProductPage = () => {
  const [productData, setProductData] = useState('');

  const onChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventdefault();
    postNewProduct(productData).then(() => history.pushState('/maintenance'));
    toast('Product successfully created!');
  };

  return (
    <div className="productFields" style={styles.CreateProductPage}>
      <form onSubmit={handleSubmit} style={styles.CreateProductPage}>
        <div className="column">
          <FormItem
            type="boolean"
            id="active"
            label="Active Status"
            value={productData.active}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="name"
            label="Name"
            value={productData.label}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="brand"
            label="Brand"
            value={productData.brand}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="category"
            label="Category"
            value={productData.category}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="type"
            label="Type"
            value={productData.type}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="material"
            label="Material"
            value={productData.material}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="description"
            label="Description"
            value={productData.description}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="demographic"
            label="Demographic"
            value={productData.demographic}
            onChange={onChange}
          />
        </div>
        <div className="column">
          <FormItem
            type="text"
            id="price"
            label="Price"
            value={productData.price}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="quantity"
            label="Quantity"
            value={productData.quantity}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="primaryColorCode"
            label="Primary Color Code"
            value={productData.primaryColorCode}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="secondaryColorCode"
            label="Secondary Color Code"
            value={productData.secondaryColorCode}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="styleNumber"
            label="Style Number"
            value={productData.styleNumber}
            onChange={onChange}
          />
          <FormItem
            type="date"
            id="releaseDate"
            label="Release Date"
            value={productData.releaseDate}
            onChange={onChange}
          />
          <FormItem
            type="text"
            id="imageSrc"
            label="Image Source"
            value={productData.imageSrc}
            onChange={onChange}
          />
          <button
            type="submit"
            className="createButton"
            onClick={handleSubmit}
            style={styles.CreateProductPage}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
