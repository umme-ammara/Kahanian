import React, { useRef, useState }  from 'react';
import Navigationbar from './header/Navbar.jsx'
import Clientfooter from './Clientfooter'
import { Row, Col, Form, Button, Alert} from 'react-bootstrap'
import './LoginForm.css'
import { useAuth, currentUser } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function Login() {
    const [validated, setValidated] = React.useState(false);
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    let DB = app.database()

    async function handleSubmit (event) { // function to handle submission 
      event.preventDefault()
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        //check if admin or customer.
        //if admin then push to the admin homepage
        // other wise push to / 
        let isAdmin = false
        DB.ref("User").on("value" , snapshot =>{
            snapshot.forEach(snap =>{
                // console.log(snap.val())
                // console.log(snap.val().email)
                try{
                    if(snap.val().email === emailRef.current.value){
                        // console.log(snap.val().isAdmin)
                        if(snap.val().isAdmin === true){
                            isAdmin = true
                            console.log(`hello`)
                        }
                    }
                }
                catch{
                    isAdmin = false
                }
                
            })
            if(isAdmin == true){
                history.push("/adminpage")
            }
            else{
                history.push("/")
            }
        })
        
        
      } catch {
        setError("Failed to log in")
      }
  
        setLoading(false)
    };

    function signUpClick () {
        history.push("/signup")
    }


    return (
    <div>
    <Navigationbar/>
    <Row>
    <Col md={7}>
        <Form noValidate validated={validated}  onSubmit={handleSubmit} className="entire-form" >
      {/* heading */}
        <div>
            {error && <Alert variant = "danger">{error}</Alert>}
        </div>
      <div className="login-heading">
      <h4 className="heading-login">Login</h4>
      <hr className="gold-line"/>
      <p >If you have an account, sign in with <br />your email address</p>

      </div>
        
      {/* first row that contains email id and cell number, i have not added any authentication for cellphone */}
        <Form.Row>
          <Form.Group className= "cols" as={Col} md="7" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="email"
              ref = {emailRef}
              placeholder="Enter email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Col xs={6}></Col>
        </Form.Row>

        {/* second row consisting of first name and last anem */}
        <Form.Row>
          <Form.Group className= "cols" as={Col} md="7" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control className = "input-boxes"
              required
              type="password"
              ref = {passwordRef}
              placeholder="password"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Col xs={6}></Col>
          
        </Form.Row>
        
        <Button disabled = {loading} variant="dark" className="next-button-styling" type="submit">SIGN IN</Button>
        
        </Form>
    </Col>
    {/* this is the second column that contains the sign up button, add the link */}
    <Col className = "signup-option">
      <h4>Don't have an account?</h4>
      <hr className="gold-line"/>
      <p className="signup-text">Creating an account has many benefits: check out faster
      keep your address safe with us, track orders and more.</p>
      {/* <Link to = "/signup"> */}
        <Button  variant="dark" className="next-button-styling" type="submit" onClick = {signUpClick}>CREATE AN ACCOUNT</Button>
      {/* </Link> */}
      
    </Col>

    </Row>
    <Clientfooter/>
    </div>

    );
}

export default Login;