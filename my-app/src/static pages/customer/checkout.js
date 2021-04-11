import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/header/Navbar.jsx'
import CheckoutSummary from './components/checkout/Summary.jsx'
import FormCheckout from './components/checkout/CheckoutInput.jsx'
ReactDOM.render(
  <div>
  <Navigationbar/>
  <CheckoutSummary
      price = {10000}
      shipping = {150}
  />
  <FormCheckout/>
  <Footer/>
  </div>,
  document.getElementById('root')
);
