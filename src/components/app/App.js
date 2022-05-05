import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import CreateProductPage from '../create-product-page/CreateProductPage';
import CreatePromoCodePage from '../../create-promotional-discount/CreatePromoCodePage';
import Header from '../header/Header';
import Footer from '../footer/footer';
import ProfilePage from '../profile-page/ProfilePage';

toast.configure();

/**
 * @name PrivateRoute
 * @description Sets Profile Page as a private route and redirects
 * website user to the home page if they are not logged in.
 */

const PrivateRoute = ({ user, setUser }) => (
  <Route
    render={() => (user ? <ProfilePage user={user} setUser={setUser} /> : <Redirect to="/home" />)}
  />
);
/**
 * @name App
 * @returns component
 */

const App = () => {
  const [user, setUser] = useState('');
  return (
    <BrowserRouter>
      <Header setUser={setUser} user={user} />
      <div id="content">
        <Switch>
          <Route exact path="/" render={() => <ProductPage user={user} />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
          <Route exact path="/maintenance" render={() => <MaintenancePage />} />
          <PrivateRoute path="/profile" user={user} setUser={setUser} />
          <Route exact path="/createProductPage" render={() => <CreateProductPage />} />
          <Route exact path="/createPromoCodePage" render={() => <CreatePromoCodePage />} />
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
