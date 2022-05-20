import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import assignImage from '../../utils/AssignImages';
import { useCart } from '../checkout-page/CartContext';
import ProductModal from '../product-modal/ProductModal';
import StarRating from '../star-rating/StarRating';
import { addNewWish, deleteWish, fetchUserWishlist } from './ProductCardService';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: 'var(--card-width)'
  },
  cardContent: {
    paddingBottom: 0
  },
  price: {
    marginBottom: '0.5rem'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // percentage of *width* of containing block
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showReviewsOnOpen, setShowReviewsOnOpen] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user !== '') {
      fetchUserWishlist(setWishes, user);
    }
  }, [user]);

  const classes = useStyles();

  const { dispatch } = useCart();

  const handleRatingClick = (event) => {
    event.stopPropagation();
    setShowReviewsOnOpen(true);
    setModalIsOpen(true);
  };

  const attemptWishlistAdd = (newFavoriteItem) => {
    if (user !== '') {
      addNewWish(newFavoriteItem, setDisabled).then(() => {
        fetchUserWishlist(setWishes, user);
      }).catch(() => {
        toast.error(`A server error occured. ${newFavoriteItem.productName} could not be added to wishlist.`);
      });
      fetchUserWishlist(setWishes, user);
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
      fetchUserWishlist(setWishes, user);
    } else {
      toast.error('Please log in to remove items from wishlist.');
    }
  };

  const handleWish = (e) => {
    fetchUserWishlist(setWishes, user);
    e.stopPropagation();
    const newFavoriteItem = {
      productName: product.name,
      productId: product.id,
      userId: user.id
    };
    if (wishes.some((w) => w.productId === product.id)) {
      attemptWishlistDelete(product);
    } else {
      attemptWishlistAdd(newFavoriteItem);
    }
  };

  const onShare = (event) => {
    event.stopPropagation();
    // this exists to intercept the click event
    // so that the modal doesn't open
    // add your code for Share functionality here
  };

  const onAdd = (event) => {
    toast.success(`1 ${product.name} successfully added to cart.`);
    event.stopPropagation();
    dispatch(
      {
        type: 'add',
        product: {
          id: product.id,
          dateCreated: Date.now,
          dateModified: Date.now,
          productId: product.id,
          title: product.name,
          price: product.price,
          description: product.description,
          quantity: 1
        }
      }
    );
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    if (user !== '') {
      fetchUserWishlist(setWishes, user);
    }
  };

  return (
    <>
      <ProductModal
        open={modalIsOpen}
        product={product}
        handleClose={handleModalClose}
        user={user}
        showReviewsOnOpen={showReviewsOnOpen}
        wishes={wishes}
        setWishes={setWishes}
      />
      <Card className={classes.root} onClick={openModal}>
        <CardHeader
          avatar={(
            <Avatar aria-label="demographics" className={classes.avatar}>
              {product.demographic.charAt(0)}
            </Avatar>
          )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
          title={product.name}
          subheader={`${product.demographic} ${product.category} ${product.type}`}
        />
        <CardMedia
          className={classes.media}
          image={assignImage(product)}
          title="product image"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <br />
          <Typography className={classes.price} variant="body2" color="textSecondary" component="p">
            Price: $
            {product.price.toFixed(2)}
          </Typography>
          <StarRating
            onClick={handleRatingClick}
            rating={product.averageRating}
          />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleWish} disabled={disabled}>
            <FavoriteIcon style={wishes.some((e) => e.productId === product.id) ? { color: 'red' } : undefined} />
          </IconButton>
          <IconButton aria-label="share" onClick={onShare}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="add to shopping cart" onClick={onAdd}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
