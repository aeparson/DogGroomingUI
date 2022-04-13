import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import Header from '../header/Header';
import Footer from '../footer/footer';
import ProfilePage from '../profile-page/ProfilePage';

toast.configure();

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header />
<<<<<<< HEAD
    <div id="content">
      <Switch>
        <Route exact path="/" render={() => <ProductPage />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/maintenance" render={() => <MaintenancePage />} />
        <Route exact path="/profilepage" render={() => <ProfilePage />} />
      </Switch>
    </div>
    <Footer />
=======
    <Switch>
      <Route exact path="/" render={() => <ProductPage />} />
      <Route exact path="/checkout" render={() => <CheckoutPage />} />
      <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
      <Route exact path="/maintenance" render={() => <MaintenancePage />} />
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
>>>>>>> 7ab5064e62d17cc6a934702c1a0717f768c372d1
  </BrowserRouter>
);

export default App;
