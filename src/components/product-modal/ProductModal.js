import React from 'react';
import Dialog from '@material-ui/core/Dialog';

const ProductModal = ({ open, product, handleClose }) => {
  // eslint-disable-next-line no-unused-vars
  const foo = 0;
  return (
    <Dialog open={open} onClose={handleClose}>
      <h1>{product?.name}</h1>
      <p>
        {product?.description}
      </p>
    </Dialog>
  );
};

export default ProductModal;
