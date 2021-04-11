import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './header/Navbar.jsx'
import CarouselDisplay from './carousel/CarouselDisplay.jsx'
import ShopByCollection from './shopByCollection/ShopByCollection.jsx'
import Collage from './collage/Collage.jsx'
// import Footer from './Footer'
import Clientfooter from './Clientfooter'

function Homepage () {
  return (
    <div>
      <Navigationbar/>
      <CarouselDisplay/>
      <ShopByCollection/>
      <Collage/>
      <Clientfooter/>
   </div>
  )
};

export default Homepage;

