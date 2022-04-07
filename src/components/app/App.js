import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import Header from '../header/Header';
import FilterMenu from '../filter-menu/FilterMenu';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <FilterMenu />
    <Switch>
      <Route exact path="/" render={() => <ProductPage />} />
      <Route exact path="/checkout" render={() => <CheckoutPage />} />
      <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
      <Route exact path="/maintenance" render={() => <MaintenancePage />} />
    </Switch>
  </BrowserRouter>
);

export default App;
