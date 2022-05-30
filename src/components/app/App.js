import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Reservations from '../reservations/reservations';
import EditReservations from '../edit-reservation/editReservation';
import Roomtypes from '../roomtypes/roomtypes';
import Header from '../header/Header';
import Footer from '../footer/footer';

toast.configure();

const App = () => (
  <BrowserRouter>
    <Header />
    <div id="content">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/reservations" element={<Reservations />} />
        <Route exact path="/roomTypes" element={<Roomtypes />} />
        <Route path="/reservations/edit/:id" element={<EditReservations />} />
      </Routes>
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
export default App;
