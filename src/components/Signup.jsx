import React, { useRef, useState } from 'react';
import Clientfooter from './Clientfooter'
import { Row, Col, Form, Button, Alert} from 'react-bootstrap'
import './Signup.css'
import Navigationbar from './header/Navbar.jsx'


import { link, useHistory } from "react-router-dom"
import { useAuth, currentUser } from '../contexts/AuthContext'

import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');




function Signup () {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const [validated, setValidated] = React.useState(false);
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    let DB = app.database();


    async function handleSubmit(e){
        //handlesubmit, submit comes here
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true)
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            //after this promise we also push into our database
            //two objects
            // one is the user table
            // other is the blabla
            // console.log(currentUser)
            var userField = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                phoneNumber: ``,
                address: ``,
                city: ``,
                isGuest: false,
                isCustomer: true,
                isAdmin: false
            }
            try {
                DB.ref().child("User").push(userField)
            } catch {
                console.log(`cant push`)
            }
            
            
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }
        
        setLoading(false)
    }

  
    return (
        <div>
        <Navigationbar/>
      <Form className="entire-form" noValidate validated={validated} onSubmit={handleSubmit}>
        <div>
            {error && <Alert variant = "danger">{error}</Alert>}
        </div>
      {/* heading */}
        <div className = "row justify-content-center">
            <div className = "col-4">
                <h4 ClassName = "heading">Create New Customer Account</h4>
            </div>
        </div>
        <div class="row justify-content-around">
            <div class="col-5">
                <h4 className="heading">Personal Information</h4> 
            </div>
            <div class="col-5">
                <h4 className = "heading">Account Information</h4>
            </div>
        </div>
      
      {/* first row that contains email id and cell number, i have not added any authentication for cellphone */}
      <Form.Row>
          <Form.Group className= "cols" as={Col} md="4" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="text"
              ref = {firstNameRef}
              placeholder="First Name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className= "cols" as={Col} md="4" controlId = "email">
            <Form.Label>Email</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="Email"
              ref = {emailRef}
              placeholder="Enter Email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        {/* second row consisting of first name and last anem */}
        <Form.Row>
          <Form.Group className= "cols" as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Last name</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="text"
              ref = {lastNameRef}
              placeholder="Last Name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

          </Form.Group>
          <Form.Group  className= "cols" as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="password"
              ref = {passwordRef}
              placeholder="Password"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        
        <Form.Row>
                <Col xs={7}></Col>
                <Form.Group ClassName = "Col-Right" as = {Col} md = "4" controlID = "validationCustom02">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control className = "input-boxes"
                    required
                    type = "password"
                    ref = {passwordConfirmRef}
                    placeholder = "Confirm Password"
                    />
                </Form.Group>
        </Form.Row> 
        <div >
            <Button variant="dark" disabled = {loading} className="next-button-styling" type="submit">CREATE AN ACCOUNT</Button>
        </div>
      </Form>
      <Clientfooter/>
      </div>
    )
};

export default Signup;