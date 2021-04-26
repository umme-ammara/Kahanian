import React , { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Clientfooter from './components/Clientfooter'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/header/Navbar.jsx'
import CheckoutSummary from './components/checkout/Summary.jsx'
import FormCheckout from './components/checkout/CheckoutInput.jsx'
import { useAuth, currentUser } from './contexts/AuthContext'

//importing firebase
import {app} from "./firebase"
var firebase = require('firebase/app');
require('firebase/database');



function Checkout (){
  let DB = app.database();
  const { currentUser } = useAuth();
  const [onLoad, setOnLoad] = React.useState(true);

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // const [finalDiscount, setFinalDiscount] = React.useState(0)
  // const [subtotal,setSubtotal] = React.useState(0)
  // let cart = localStorage.getItem('finalCart')
  // cart = JSON.parse(cart)
  // const discount = localStorage.getItem('discount')
  // console.log("cart",cart)
  // console.log("discount",discount)
  // const itemsPrice = cart.reduce((a,c) => a + c.price * c.sizesBought, 0)
  // setSubtotal(itemsPrice)
  // console.log("this is the total amount",itemsPrice)
  // var finalDis = 0
  // if (discount != null)
  //   {
  //       finalDis = parseInt(discount)
  //   }
  //  setFinalDiscount(finalDis)

  useEffect (() => {
    if(onLoad === true){
      //do work
      try {
        let email = currentUser.email
        setEmail(currentUser.email)
        //user exists so lets get its credentials
        DB.ref().child("User").on("value",snapshot => {
          let obj = snapshot.val()
          Object.keys(obj).map(id => {
            if(email === obj[id].email){
              //get user info from here
              setFirstName(obj[id].firstName)
              setLastName(obj[id].lastName)
              setPhoneNumber(obj[id].phoneNumber)
              setCity(obj[id].city)
              setAddress(obj[id].address)
            }
          })
        })
      }
      catch{
        //no user logged in
        //everything is set to empty anyway
      }
    }
    setOnLoad(false)
  })

  return (
    <div>
    <Navigationbar/>
    <CheckoutSummary
        price = {parseInt(localStorage.getItem('subTotal'))}
        discount = {parseInt(localStorage.getItem('discount'))}
        shipping = {200}
    />
    <FormCheckout/>
    <Clientfooter/>
    </div>
  )
}

export default Checkout;

