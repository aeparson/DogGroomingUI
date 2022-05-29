import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import styles from './Header.module.css';
import companyLogo from './hotel-header-image.png';
import ShoppingCartIcon from './shopping-trolley.png';
import { useCart } from '../checkout-page/CartContext';
import ProfileIcon from './profileicon.png';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = ({ setUser, user }) => {
  const history = useHistory();
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);
  const {
    state: { products }
  } = useCart();

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginFailure
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError('There was a problem logging in with Google. Please wait and try again later.');
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
    window.location.reload();
    localStorage.removeItem('user');
    history.push('/');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError('There was a problem logging out with Google. Please wait and try again later.');
  };

  return (
    <section className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/home">
          <img src={companyLogo} alt="Logo" height="45px" />
        </NavLink>
      </div>
      <div className={styles.profileIcon}>
        {user !== '' && user !== null ? (
          <NavLink to="/profile">
            <img src={ProfileIcon} alt="profile" width="35px" />
          </NavLink>
        ) : null}
      </div>
      <div className={styles.loginLogout}>
        {user && <span>{user.firstName}</span>}
        {' '}
        {user && (
        <span>
          {user.lastName}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        )}
        {googleError && <span>{googleError}</span>}
        {apiError && <span>Api Error</span>}
        {!user ? (
          <GoogleLogin
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy="single_host_origin"
          />
        ) : (
          <GoogleLogout
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleGoogleLogoutSuccess}
            onFailure={handleGoogleLogoutFailure}
          />
        )}
      </div>
      <div className={styles.checkoutItem}>
        <NavLink to="/checkout">

          <img src={ShoppingCartIcon} alt="cart" width="35px" />
          <div className={styles.checkoutBadge}>{(products.length < 100) ? products.length : '99+'}</div>

        </NavLink>
      </div>
    </section>
  );
};

export default Header;
