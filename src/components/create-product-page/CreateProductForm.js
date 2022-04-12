import React from 'react';
import FormItem from '../form/FormItem';

const NewProductForm = ({ onChange, productData }) => (
  <div className="productFields">
    <form>
      <div className="column">
        <FormItem
          type="text"
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
      </div>
    </form>
  </div>
);

export default NewProductForm;
