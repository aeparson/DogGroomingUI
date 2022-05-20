import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/// summary- creates a HTTP helper function to post the new product to the API and also
/// disables onClick functionality of heart until a success or error is returned
/// (which prevents duplicate PUT requests from successfully persisting)

async function addNewWish(newFavoriteItem, setDisabled) {
  setDisabled(true);
  await HttpHelper(constants.WISHLIST_ENDPOINT, 'POST', newFavoriteItem)
    .then((response) => {
      if (response.ok) {
        toast.success(`${newFavoriteItem.productName} has successfully been added to wishlist.`);
        setDisabled(false);
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      toast.error(`A server error occured. ${newFavoriteItem.productName} could not be added to wishlist.`);
      setDisabled(false);
    });
}

/// summary - creates a HTTP helper function to retrieve a user's wishlist from the API
/// and set the state of the product card hearts
async function fetchUserWishlist(setWishes, user) {
  await HttpHelper(`${constants.WISHLIST_ENDPOINT}/${user.id}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setWishes);
}

/// summary - creates a HTTP helper function to delete a wishlist item from the database
/// based on the ID of the wish, and sets the state of the associated product card heart.

async function deleteWish(favoriteItem, favoriteItemToDelete) {
  await HttpHelper(`${constants.WISHLIST_ENDPOINT}/${favoriteItemToDelete}`, 'DELETE')
    .then((response) => {
      if (response.ok) {
        toast.success(`${favoriteItem.name} has successfully been removed from wishlist.`);
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      ('Item unable to be added to wishlist.');
    });
}
export { fetchUserWishlist, addNewWish, deleteWish };
