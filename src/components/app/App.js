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
<<<<<<< HEAD
<<<<<<< HEAD
const App = () => (
  <BrowserRouter>
    <Header />
    <div id="content">
      <Switch>
        <Route exact path="/" render={() => <ProductPage />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/maintenance" render={() => <MaintenancePage />} />
        <Route exact path="/createProductPage" render={() => <CreateProductPage />} />
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
        limit={1}
      />
    </div>
    <Footer />
  </BrowserRouter>
);
=======
=======
>>>>>>> bb8a26f4213ea5c5ad5434e0746503d72624d65a
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
          <Route exact path="/profile" render={() => <ProfilePage user={user} />} />
<<<<<<< HEAD
=======
          <Route exact path="/createProductPage" render={() => <CreateProductPage />} />
>>>>>>> bb8a26f4213ea5c5ad5434e0746503d72624d65a
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
<<<<<<< HEAD
          limit={1}
=======
>>>>>>> bb8a26f4213ea5c5ad5434e0746503d72624d65a
        />
      </div>
      <Footer />
    </BrowserRouter>
  );
};
<<<<<<< HEAD
>>>>>>> a49bf11c27ba6463a9c8f0b22cb540e3b1c19922
=======
>>>>>>> bb8a26f4213ea5c5ad5434e0746503d72624d65a

export default App;
