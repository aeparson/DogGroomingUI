import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import './Header.css';
import companyLogo from './arrayOfSunshine.png';
import ShoppingCartIcon from './shopping-trolley.png';
import ProfileIcon from './profileicon.png';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);

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
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError('There was a problem logging out with Google. Please wait and try again later.');
  };

  return (
    <section className="header">
      <div className="logo">
        <NavLink to="/home">
          <img src={companyLogo} alt="Logo" height="45px" />
        </NavLink>
      </div>
      <div className="profileIcon">
        <NavLink to="/profile">
          <img src={ProfileIcon} alt="profile" width="35px" />
        </NavLink>
      </div>
      <div className="loginLogout">
        {user && <span>{user.firstName}</span>}
        {user && <span>{user.lastName}</span>}
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
      <div className="checkoutItem">
        <NavLink to="/checkout">
          <img src={ShoppingCartIcon} alt="cart" width="35px" />
        </NavLink>
      </div>
    </section>
  );
};

export default Header;
