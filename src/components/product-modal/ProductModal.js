/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
  Chip
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Image from 'mui-image';
import QuantityPicker from '../quantity-picker/QuantityPicker';
import { useCart } from '../checkout-page/CartContext';

const useStyles = makeStyles({
  root: {
    padding: '24px',
    '&:first-child': {
      paddingTop: '24px'
    }
    // overflow: 'hidden'
  },
  containerGrid: {
    // maxHeight: '100%'
  },
  titleRow: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    padding: 0
  },
  imageWrap: {
    height: '100%'
  },
  image: {
    // maxHeight: '100%'
  },
  productDetails: {
    flexGrow: 1
  },
  details: {
    display: 'flex',
    gap: '1rem'
  },
  colors: {
    display: 'flex',
    gap: '1rem'
  },
  bottom: {
    display: 'flex'
  }
});

const ProductModal = ({ open, product, handleClose }) => {
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useCart();

  const classes = useStyles();

  const onAdd = () => {
    if (quantity === 0) return;
    dispatch(
      {
        type: 'add',
        product: {
          id: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          quantity
        }
      }
    );
  };

  const updateQuantity = (newQuantity) => {
    setQuantity(Number(newQuantity));
  };

  const handleChange = (event) => {
    updateQuantity(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">

      <DialogContent className={classes.root}>
        <Grid container spacing={3} className={classes.containerGrid}>
          <Grid item xs={6} className={classes.imageWrap}>
            <Image
              height="calc(100vh - 64px - 48px)" // hacky
              fit="cover"
              src={product.imageSrc}
              duration={2000}
              className={classes.image}
            />
          </Grid>
          <Grid container direction="column" item xs={6} className={classes.productDetails}>
            <Grid container item direction="row" className={classes.titleRow}>
              <DialogTitle className={classes.title}>
                {product.name}
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <DialogContentText>
              <Typography>{product.description}</Typography>
            </DialogContentText>
            <Box className={classes.details}>
              <Chip label={product.category} variant="outlined" />
              <Chip label={product.type} variant="outlined" />
            </Box>
            <Box className={classes.colors}>
              <Chip
                label={product.primaryColorCode.toUpperCase()}
                style={{ backgroundColor: product.primaryColorCode }}
              />
              <Chip
                label={product.secondaryColorCode.toUpperCase()}
                style={{ backgroundColor: product.secondaryColorCode }}
              />
            </Box>
            <Box className={classes.bottom}>
              <Typography>
                $
                {product.price}
              </Typography>
              <DialogActions>
                <QuantityPicker
                  quantity={quantity}
                  onChange={handleChange}
                  updateQuantity={updateQuantity}
                />
                <IconButton aria-label="add to shopping cart" onClick={onAdd}>
                  <AddShoppingCartIcon />
                </IconButton>
              </DialogActions>
            </Box>

          </Grid>
        </Grid>
      </DialogContent>

    </Dialog>
  );
};

export default ProductModal;
