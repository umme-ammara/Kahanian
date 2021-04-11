import React, {useState, useEffect, useRef} from "react";
// import firebaseDb from "./firebase";
import "./clientFooter.css";
import {OverlayTrigger,Button,Popover,Form,Row,Col,Alert} from "react-bootstrap";
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

function Clientfooter() {

    //INITALIZE EMAIL FOR SUBSCRIBE PART
    const initialFieldValues = {
        email: ''
    };
    let firebaseDb = app.database();

    const emailRef = useRef();
    const nameRef = useRef();
    const msgRef = useRef();
    
    //SET THE EMAIL ADDRESS TO THE ONE INPUTTED BY THE USER
    var [values, setValues] = useState(initialFieldValues);
    var [validated, setValidated] = React.useState(false);
    var [error, setError] = React.useState('')
    var [errorMsg, setErrorMsg] = React.useState('');
    const [showAlert, setShowAlert] = useState(false);
     const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name] : value
        })
    };

    const handleFormSubmit = e => {
         //e.preventDefault();
         //STORE THE SUBSCRIBING E-MAILS IN THE FIREBASE DATABASE
         const form = e.currentTarget;
            if (form.checkValidity() === false) {
                //setValidated(false);
                e.preventDefault();
                e.stopPropagation();
            }
            else {
                setValidated(true);
                // if (values.email === "") {
                //     setShowAlert(true);
                // } else {
                firebaseDb.ref().child("Subscribers").push(
                    values,
                    err => {
                        console.log("Error")
                    }
                )
                setError('Subscribed!'); //}
                //setError('')
            }
        
            

         //TO DO: INSERT CONDITION THAT IF RECORD ALREADY EXISTS IN THE DATABASE THEN DON'T INSERT IT AGAIN
        //  
        //  else{
         
         //console.log(values.email)
         //setShowAlert(true);
         //alert("Thank you for subscribing!")
         //}
     };

    async function handleSubmit (e) {
        //e.preventDefault();
        const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            } else {
        //e.preventDefault();
       //STORE THE SUBSCRIBING E-MAILS IN THE FIREBASE DATABASE
      // setValidated(true);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

       var fields = {
           name: nameRef.current.value,
           email: emailRef.current.value,
           message: msgRef.current.value,
           timestamp: dateTime
       }
       console.log(fields)
       firebaseDb.ref().child('Query').push(fields)
       setErrorMsg(`Hey ${nameRef.current.value}! Your message has been sent to the Kahanian team!`)
    }
       
    //}

       //alert(`Hey ${nameRef.current.value}! Your message has been sent to the Kahanian team!`)
   };

    return (


        <footer id="footer" class="footer-1">
         {/* help footer  */}
        <div class="footer-help">
        <div class="container">
        <div class="row">
            <div class="col" align="center">

            <div ><a href="/AboutUs"> <i class="za fa-user"> </i> </a><h5> About Us</h5> </div>

            </div>

            <div class="col" align="center">


            <div ><a href="/FAQ"> <i class="za fa-question-circle "  > </i> </a><h5> FAQ's</h5> </div>
            </div>

            <div class="col" align="center">
            {/* Send message wali cheez */}
                        <OverlayTrigger
                        trigger="click"
                        key="top"
                        placement="top"
                        overlay={
                        <Popover id={`popover-positioned-top`}>
                         <Popover.Title as="h3">{`Kahanian Support `}</Popover.Title>
                        <Popover.Content>
                        <Form /*noValidate validated={validated}*/ onSubmit = {handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" required 
                                 ref = {nameRef}
                                //values_ = {values_.name_}
                                //onChange = {handleHelp}
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required 
                                ref = {emailRef}
                                //values_ = {values_.mail}
                                //onChange = {handleHelp}
                                />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Type your message " required 
                                ref = {msgRef}
                                // = {values_.msg}
                                //onChange = {handleHelp}
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                        <input name="uri" type="hidden" value="arabiantheme"/>
                        <input name="loc" type="hidden" value="en_US"/>
                        <input class="submitbutton ripplelink" type="submit" value="Submit"/>
                        <div>
                        {errorMsg && <Alert variant = "success">{errorMsg}</Alert>}
                        </div>
                        
                            
                        

                        </Form>

                        </Popover.Content>
                        </Popover>
                        }
                        >
                        {/* <Button variant="secondary" >Popover on top</Button> */}
                        <div ><a > <i class="za fa-comments"> </i> </a><h5> Need Help?</h5> </div>


                         </OverlayTrigger>


            {/* <div ><a href="#"> <i class="za fa-comments"> </i> </a><h5> Need Help?</h5> </div> */}

             </div>
        </div>
        </div>
        </div>
                {/* main footer  */}
        <div class="main-footer widgets-dark typo-light">
        <div class="container">
            <div class="row">

            <div class="col" align="center">
                <div class="widget no-box">
                    <h5 className="widget-title">Get in touch <span></span></h5>
                    <ul class="thumbnail-widget">
                        <li>
                        <div ><a href="mailto:kahanian9@gmail.com"> <i class="fa fa-envelope" target="_blank"></i> </a><small> &nbsp; &nbsp; kahanian9@gmail.com</small> </div>
                        </li>
                        <li>
                        <div ><a href="https://www.facebook.com/kahanian.pk/" target="_blank"> <i class="fa fa-facebook"> </i> </a><small> &nbsp; &nbsp; &nbsp; kahanian.pk</small></div>
                        </li>
                        <li>
                        <div ><a href="https://www.instagram.com/kahanian.pk/" target="_blank"> <i class="fa fa-instagram" target="_blank"> </i> </a><small> &nbsp; &nbsp; kahanian.pk</small></div>
                        </li>

                    </ul>

                </div>
            </div>


                <div class="col" align="center">
                <div class="widget no-box">
                    <h5 class="widget-title">Customer Care<span></span></h5>
                    <ul class="thumbnail-widget">
                        <li>
                        <div ><a href="/ExchangePolicy">Exchange Policy</a></div>
                        </li>
                        <li>
                        <div ><a href="/FAQ">FAQ's</a></div>
                        </li>
                        <li>
                        <div ><a href="/AboutUs">About Us</a></div>
                        </li>

                    </ul>
                </div>
                </div>

<br></br>
            <div class="col" align="center">
            <div class="widget no-box">
                <h5 class="widget-title">Newsletter Signup<span></span></h5>
                <p>Subscribe to our Newsletter for Exclusive Updates.</p>

                <div class="emailfield">
                  <form autoComplete = "off"  noValidate validated={validated} onSubmit = {handleFormSubmit}>

                    <input type="text" id="email" placeholder = "Email"  required name="email" 
                        value={values.email}
                        onChange = {handleInputChange}
                    />
                
                     <input name="uri" type="hidden" value="arabiantheme"/>
                      <input name="loc" type="hidden" value="en_US"/>
                     <input class="submitbutton ripplelink" type="submit" value="Subscribe"/>
        
                    
                    <div>
                        {error && <Alert variant = "success">{error}</Alert>}
                    </div> 
                    
                    
                    
                   </form>
                </div>

            </div>

            </div>
                </div>
            </div>
            </div>

        <div class="footer-copyright">
        <div class="container">
            <div class="row">
            <div class="col-md-12 text-center">
                    <p>Copyrights © {new Date().getFullYear()} Kahanian. All rights reserved.</p>
             </div>
            </div>
        </div>
        </div>

        


        </footer>
        



    )
}

export default Clientfooter;

