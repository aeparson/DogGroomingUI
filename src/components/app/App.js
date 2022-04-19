import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import CreateProductPage from '../create-product-page/CreateProductPage';
import Header from '../header/Header';
import Footer from '../footer/footer';
import ProfilePage from '../profile-page/ProfilePage';

toast.configure();

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
          <Route exact path="/" render={() => <ProductPage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
          <Route exact path="/maintenance" render={() => <MaintenancePage />} />
          <Route exact path="/createProductPage" render={() => <CreateProductPage />} />
          <Route exact path="/profile" render={() => <ProfilePage user={user} />} />
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
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
