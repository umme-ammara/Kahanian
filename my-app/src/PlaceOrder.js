import React from 'react';
import ReactDOM from 'react-dom';
import Clientfooter from './components/Clientfooter'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/header/Navbar.jsx'
import PlaceOrderInfo from './components/placeOrder/PlaceOrderInfo.jsx'

function PlaceOrder()
{
  //console.log("this is my personal info", localStorage.getItem('personalInfo'))
  return(
    <div>
    <Navigationbar/>
    <PlaceOrderInfo/>
    <Clientfooter/>
    </div>
  )
}
export default PlaceOrder;

// // ReactDOM.render(
//     <div>
//     <Navigationbar/>
//     <PlaceOrderInfo/>
//     <Footer/>
//     </div>,
// //     document.getElementById('root')
// //   );