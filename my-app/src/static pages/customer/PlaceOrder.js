import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/header/Navbar.jsx'
import PlaceOrderInfo from './components/placeOrder/PlaceOrderInfo.jsx'


ReactDOM.render(
    <div>
    <Navigationbar/>
    <PlaceOrderInfo/>
    <Footer/>
    </div>,
    document.getElementById('root')
  );