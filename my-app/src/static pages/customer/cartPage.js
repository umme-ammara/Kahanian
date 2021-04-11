import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/header/Navbar.jsx'
import CartInfo from './components/cartInfo/CartInformation.jsx'
import SummaryCart from './components/cartInfo/SummaryCart.jsx'

import image1 from './images/USM_2787.jpg'
import image2 from './images/USM_2875.jpg'
const arr= [
  {
    image: image1,
    articleName: "Blue",
    articleSize: "Medium",
    articlePrice: 4550,
    articlePiece: 1,
  },
  {
    image: image2,
    articleName: "Shah-e-Taab",
    articleSize: "Small",
    articlePrice: 6500,
    articlePiece: 1,
  }
]

ReactDOM.render(
  <div>
  <Navigationbar/>
  <CartInfo
    array = {arr}
  />
  <SummaryCart
    price = {10000}
    shipping = {150}
  />
  <Footer/>
  </div>,
  document.getElementById('root')
  );