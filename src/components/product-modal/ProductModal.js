import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogContent, DialogContentText, DialogTitle, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ProductModal = ({ open, product, handleClose }) => {
  // eslint-disable-next-line no-unused-vars
  const foo = 0;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {product?.name}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {product?.description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
