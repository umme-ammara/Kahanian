import React , { useEffect, useState, useRef } from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './checkoutInput.css'
import { useAuth, currentUser } from '../../contexts/AuthContext'

import {app} from "../../firebase"
var firebase = require('firebase/app');
require('firebase/database');

function FormCheckout() {
    const [validated, setValidated] = React.useState(false);
    let DB = app.database();
    const { currentUser } = useAuth();
    const [onLoad, setOnLoad] = React.useState(true);
  
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [userExists, setUserExists] = useState(false)

    const emailRef     = useRef()
    const phoneRef     = useRef()
    const firstNameRef = useRef()
    const lastNameRef  = useRef()
    const cityRef      = useRef()
    const addressRef   = useRef()

  
    const formSubmit = () => {
      // const form = event.currentTarget;
      // if (form.checkValidity() === false) {
      //   event.preventDefault();
      //   event.stopPropagation();
      // }
  
      // setValidated(true);
      if (userExists !== true)
      {
        var tempObj = {
          fName : firstNameRef.current.value,
          lName : lastNameRef.current.value,
          add   : addressRef.current.value,
          place : cityRef.current.value,
          phone : phoneRef.current.value
        }
        console.log("this is my obj",tempObj)
        localStorage.setItem('personalInfo', JSON.stringify(tempObj))
      }
      else
      {
        var tempObj = {
          fName : firstName,
          lName : lastName,
          add   : address,
          place : city,
          phone : phoneNumber
        }
        console.log("this is my obj",tempObj)
        localStorage.setItem('personalInfo', JSON.stringify(tempObj))
      }
    };


  useEffect (() => {
    if(onLoad === true){
      //do work
      try {
        setUserExists(true)
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
        setUserExists(false)
        //no user logged in
        //everything is set to empty anyway
        
      }
    }
    setOnLoad(false)
  })

  
    return (
      <Form className="entire-form" noValidate validated={validated}>
      {/* heading */}
      <h4 className="heading">Details</h4>
      <hr className="gold-line"/>
      {/* first row that contains email id and cell number, i have not added any authentication for cellphone */}
        <Form.Row>
          <Form.Group className= "cols" as={Col} md="4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="email"
              placeholder="Enter email"
              defaultValue = {email}
              ref = {emailRef}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

          </Form.Group>
          <Form.Group className= "cols" as={Col} md="4">
            <Form.Label>Telephone Number</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="text"
              placeholder="Enter 11 digit number"
              defaultValue = {phoneNumber}
              ref = {phoneRef}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        {/* second row consisting of first name and last anem */}
        <Form.Row>
          <Form.Group className= "cols" as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="text"
              placeholder="First name"
              defaultValue = {firstName}
              ref = {firstNameRef}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

          </Form.Group>
          <Form.Group  className= "cols" as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="text"
              placeholder="Last name"
              defaultValue = {lastName}
              ref = {lastNameRef}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        {/* third row contains the address and a dropdown of list of cities of Pakistan */}
      {/* headings */}
        <h4 className="heading">Shipping Details</h4>
        <hr className="gold-line"/>
        <Form.Row>

        <Form.Group className= "cols" as={Col} md="4" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control 
            className = "input-boxes" 
            placeholder="Enter address" 
            defaultValue = {address}
            ref = {addressRef}
            />
        </Form.Group>

        <Form.Group className= "cols" as={Col} md="4" controlId="exampleForm.ControlSelect1">
            <Form.Label>City</Form.Label>
            <Form.Control className = "input-boxes" 
            placeholder="Enter city" 
            defaultValue = {city}
            ref = {cityRef}
            />
            
        </Form.Group>
        </Form.Row>
        <h4 className="heading">Payment Method</h4>
        <hr className="gold-line"/>
        <p className="sub-heading">Cash on Delivery</p>
        {/* <Button variant="dark" href="/placeOrder" className="next-button-styling" type="submit">NEXT</Button> */}
        {/* {setPersonalInfo(email,firstName,lastName,address,phoneNumber,city)} */}
        <a href = "/placeOrder">
            <Button onClick={()=>{formSubmit()}} variant="dark" className="next-button-styling">NEXT</Button>
        </a>
      </Form>
    );
  }
  
 export default FormCheckout;