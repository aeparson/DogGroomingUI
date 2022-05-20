import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
  Chip,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as Down, faChevronUp as Up } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'mui-image';
import { Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuantityPicker from '../quantity-picker/QuantityPicker';
import { useCart } from '../checkout-page/CartContext';
import AddReview from './AddReview';
import constants from '../../utils/constants';
import { fetchUserPurchase } from '../profile-page/ProfilePageService';
import reviewStyles from './ProductModal.module.css';
import ProductReviewList from '../product-review/ProductReviewList';
import assignImage from '../../utils/AssignImages';
import { addNewWish, deleteWish, fetchUserWishlist } from '../product-card/ProductCardService';
import fetchProductReviews from '../product-review/ProductReviewService';

const useStyles = makeStyles({
  dialogContent: {
    padding: '24px',
    '&:first-child': {
      paddingTop: '24px'
    }
  },
  image: {
    borderRadius: '4px'
  },
  productDetails: {
    overflowX: 'hidden'
  },
  titleRow: {
    marginBottom: '1rem',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    right: -12,
    top: -12
  },
  title: {
    padding: 0,
    flexShrink: 1,
    maxWidth: '43ch'
  },
  titleFont: {
    fontSize: '1.75em'
  },
  productDescription: {
    marginBottom: '2rem',
    '& p': {
      maxWidth: '40ch'
    },
    maxWidth: '90%'
  },
  descriptionFont: {
    fontSize: '1.25em'
  },
  productTags: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  productColors: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  lightText: {
    color: 'white'
  },
  darkText: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  bottom: {
    display: 'flex',
    marginTop: 'auto',
    alignItems: 'flex-start'
  },
  price: {
    fontSize: '2rem',
    alignSelf: 'center',
    marginRight: '1rem'
  },
  reviewActions: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.5em'
  },
  sortOrderIcon: {
    marginLeft: '5px',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  downIcon: {
    transform: 'translateY(-1px)'
  },
  cartIcon: {
    fontSize: 36
  },
  heartIcon: {
    fontSize: 24,
    padding: '0px'
  },
  viewReviewIcon: {
    fontSize: 24
  },
  categoryChip: {
    fontSize: '1.25rem',
    minWidth: 100,
    height: 40
  },
  wishListButton: {
    paddingLeft: '.5rem',
    paddingRight: '0rem',
    paddingTop: '0rem',
    paddingBottom: '0rem'
  },
  viewReviewsButton: {
    paddingLeft: '1rem',
    paddingRight: '0rem',
    paddingTop: '0rem',
    paddingBottom: '0rem'
  },
  wishListButtonContainer: {
    marginTop: '2rem'
  }
});

const getTextColorClass = (backgroundColorCode) => {
  // Thanks to https://stackoverflow.com/a/3943023
  const colorCode = backgroundColorCode.slice(1);
  const [r, g, b] = [
    colorCode.slice(0, 2),
    colorCode.slice(2, 4),
    colorCode.slice(4)]
    .map((hex) => parseInt(hex, 16));
  const sum = [r * 0.299, g * 0.587, b * 0.114].reduce((prev, cur) => prev + cur);
  const threshold = 186; // adjust to taste
  return sum > threshold ? 'darkText' : 'lightText';
};

const ProductModal = ({
  user,
  open,
  product,
  handleClose,
  showReviewsOnOpen,
  wishes,
  setWishes
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(showReviewsOnOpen);
  const [sortOrder, setSortOrder] = useState('descending');
  const [disabled, setDisabled] = useState(false);

  const reviewContainerRef = useRef(null);

  const attemptWishlistAdd = (newFavoriteItem) => {
    if (user !== '') {
      addNewWish(newFavoriteItem, setDisabled).then(() => {
        fetchUserWishlist(setWishes, user);
      }).catch(() => {
        toast.error(`A server error occured. ${newFavoriteItem.productName} could not be added to wishlist.`);
      });
    } else {
      toast.error('Please log in to save items to wishlist.');
    }
  };
  const attemptWishlistDelete = (favoriteItem) => {
    const favoriteItemToDelete = (wishes.find((w) => w.productId === product.id));
    if (user !== '') {
      deleteWish(favoriteItem, favoriteItemToDelete.id).then(() => {
        fetchUserWishlist(setWishes, user);
      }).catch(() => {
        toast.error(`A server error occured. ${favoriteItem.name} could not be removed from wishlist.`);
      });
    } else {
      toast.error('Please log in to remove items from wishlist.');
    }
  };

  const onFavoriteModal = (e) => {
    e.stopPropagation();
    const newFavoriteItem = {
      productName: product.name,
      productId: product.id,
      userId: user.id
    };
    if (wishes.some((w) => w.productId === product.id)) {
      attemptWishlistDelete(product);
    } else {
      attemptWishlistAdd(newFavoriteItem, setDisabled);
    }
  };

  useEffect(() => {
    // opens modal with reviews hidden if product has no reviews
    if (product.reviewCount > 0) { setShowReviews(showReviewsOnOpen); }
  }, [showReviewsOnOpen, product.reviewCount]);

  const [reviews, setReviews] = useState([]);
  const [isReviewed, setIsReviewed] = useState(false);

  const { dispatch } = useCart();

  const [apiError, setApiError] = useState(false);
  const [purchases, setPurchase] = useState([]);

  useEffect(() => {
    if (user !== null) {
      fetchUserPurchase(setPurchase, setApiError, user);
    }
  }, [user]);

  useEffect(() => {
    if (showReviews) {
      reviewContainerRef.current.scrollIntoView();
      fetchProductReviews(product.id, setReviews, setApiError);
    }
  }, [showReviews, product.id]);

  useEffect(() => {
    // Determines if the user has posted a review for the product
    if (reviews.some((review) => review.userId === user.id)) {
      setIsReviewed(true);
    }
  }, [reviews, user.id]);

  const updateReviews = () => fetchProductReviews(product.id, setReviews, setApiError);

  const styles = useStyles();

  const onAdd = () => {
    if (quantity === 0) return;
    dispatch(
      {
        type: 'add',
        product: {
          productId: product.id,
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
  // event listener for the quantity picker
  const handleChange = (event) => {
    updateQuantity(event.target.value);
  };

  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  const addReviewForm = () => {
    setShowAddReviewForm(!showAddReviewForm);
  };

  const loggedIn = (_product) => {
    let hasPurchased = false;
    purchases.forEach((purchase) => purchase.lineItems.forEach((lineItem) => {
      if (lineItem.productId === _product.id) { hasPurchased = true; }
    }));
    if (user === '') {
      return (
        <div>
          <Tooltip title="You must be logged in to write a review.">
            <Button
              type="button"
              className={reviewStyles.addReview}
              variant="outlined"
              size="small"
            >
              <FavoriteIcon />
              Review
              {' '}
            </Button>
          </Tooltip>
        </div>
      );
    }
    if (!hasPurchased) {
      return (
        <div>
          <Tooltip title="You must purchase this product to write a review.">
            <Button
              type="button"
              className={reviewStyles.addReview}
              variant="outlined"
              size="small"
            >
              Review
            </Button>
          </Tooltip>
        </div>
      );
    }
    if (hasPurchased && !isReviewed) {
      return (
        <Button
          type="button"
          className={reviewStyles.addReview}
          variant="outlined"
          size="small"
          onClick={addReviewForm}
        >
          Review
        </Button>
      );
    } return (<span />);
  };

  const toggleSortOrder = () => {
    if (sortOrder === 'descending') {
      setSortOrder('ascending');
    } else {
      setSortOrder('descending');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" scroll="paper">
      <DialogContent className={styles.dialogContent}>
        <Grid container spacing={3} className={styles.containerGrid}>
          <Grid item xs={8} className={styles.imageWrap}>
            <Image
              height="calc(100vh - 64px - 48px)" // hacky
              fit="cover"
              src={assignImage(product)}
              duration={2000}
              className={styles.image}
            />
          </Grid>
          <Grid container direction="column" item xs={4} className={styles.productDetails}>
            <Grid container item direction="row" className={styles.titleRow}>
              <DialogTitle className={styles.title}>
                <Typography classes={{ body1: styles.titleFont }}>
                  {product.name}
                </Typography>
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className={styles.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item className={styles.productDescription}>
              <Typography classes={{ body1: styles.descriptionFont }}>
                {product.description}
              </Typography>
            </Grid>
            <p className={reviewStyles.chipTitle}>Categories:</p>
            <Box className={styles.productTags}>
              <Chip
                className={styles.categoryChip}
                label={product.category}
                variant="outlined"
              />
              <Chip
                className={styles.categoryChip}
                label={product.type}
                variant="outlined"
              />
            </Box>
            <p className={reviewStyles.chipTitle}>Product Colors:</p>
            <Box className={styles.productColors}>
              <Chip
                className={styles[getTextColorClass(product.primaryColorCode)]}
                style={{
                  backgroundColor: product.primaryColorCode,
                  minWidth: 100,
                  height: 40
                }}
                variant="outlined"
              />
              <Chip
                className={styles[getTextColorClass(product.secondaryColorCode)]}
                style={{
                  backgroundColor: product.secondaryColorCode,
                  minWidth: 100,
                  height: 40
                }}
                variant="outlined"
              />
            </Box>
            <Grid>
              <Box className={styles.wishListButtonContainer}>
                <Button
                  variant="outlined"
                  size="medium"
                  className={styles.wishListButton}
                  onClick={onFavoriteModal}
                  style={wishes.some((e) => e.productId === product.id) ? { color: 'red' } : undefined}
                >
                  Add To Wish List
                  <IconButton aria-label="add to favorites" disabled={disabled} onClick={onFavoriteModal}>
                    <FavoriteIcon
                      className={styles.heartIcon}
                      style={wishes.some((e) => e.productId === product.id) ? { color: 'red' } : undefined}
                    />
                  </IconButton>
                </Button>
              </Box>
            </Grid>
            <Grid>
              <Box className={styles.viewReviewsButtonContainer}>
                <Button
                  variant="outlined"
                  size="medium"
                  style={{
                    marginTop: '2rem'
                  }}
                  className={styles.viewReviewsButton}
                  onClick={() => setShowReviews(!showReviews)}
                >
                  {showReviews ? 'Hide Reviews' : 'View Reviews'}
                  <IconButton aria-label="view reviews">
                    <VisibilityIcon
                      className={styles.viewReviewIcon}
                    />
                  </IconButton>
                </Button>
              </Box>
            </Grid>
            <Box className={styles.bottom}>
              <Typography className={styles.price}>
                $
                {product.price.toFixed(2)}
              </Typography>
              <DialogActions>
                <QuantityPicker
                  quantity={quantity}
                  onChange={handleChange}
                  updateQuantity={updateQuantity}
                />
                <IconButton
                  aria-label="add to shopping cart"
                  onClick={onAdd}
                >
                  <AddShoppingCartIcon className={styles.cartIcon} />
                </IconButton>
              </DialogActions>
            </Box>
          </Grid>
          {showReviews && (
            <Grid item xs={8}>
              <div ref={reviewContainerRef}>
                <Box className={styles.reviewActions}>
                  <Button
                    variant="outlined"
                    size="small"
                    className={styles.lowerViewReviewsButton}
                    onClick={() => setShowReviews(!showReviews)}
                  >
                    {showReviews ? 'Hide Reviews' : 'View Reviews'}
                  </Button>
                  {showReviews
                    && (
                      <>
                        <Button
                          size="small"
                          onClick={toggleSortOrder}
                          className={styles.sortOrderButton}
                        >
                          {sortOrder === 'descending' ? 'Newest first' : 'Oldest first'}
                          <FontAwesomeIcon
                            className={sortOrder === 'descending' ? `${styles.sortOrderIcon} ${styles.downIcon}` : styles.sortOrderIcon}
                            icon={sortOrder === 'descending' ? Down : Up}
                            size="1x"
                          />
                        </Button>
                      </>
                    )}
                </Box>
                <Box className={styles.reviewsContainer}>
                  <>
                    {loggedIn(product)}
                    {showAddReviewForm && (
                      <AddReview
                        user={user}
                        product={product}
                        setShowReviews={setShowReviews}
                        setShow={setShowAddReviewForm}
                      />
                    )}
                    {apiError && (
                      <p data-testid="errMsg">
                        {constants.API_ERROR}
                      </p>
                    )}
                  </>
                  <ProductReviewList
                    user={user}
                    sortOrder={sortOrder}
                    reviews={reviews}
                    updateReviews={updateReviews}
                    product={product}
                  />
                </Box>
              </div>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
