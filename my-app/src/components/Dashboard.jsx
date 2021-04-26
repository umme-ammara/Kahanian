import React, { useEffect, useState } from "react";
import Clientfooter from './Clientfooter'
import Navigationbar from './header/Navbar.jsx'
import { useAuth, currentUser } from '../contexts/AuthContext'
import "./UserProfile.css";
// import "./UserProfile.css";
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
  
//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function DashBoard()
{
    const { currentUser } = useAuth(); //for current user
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [onLoad, onLoadSet] = useState(true)
    let DB = app.database();

    useEffect(() => {
        //here we will read the name of the user
        if(onLoad === true){
            DB.ref("User").on('value', snapshot => {
                let obj = snapshot.val()
                Object.keys(obj).map(id => {
                    if(obj[id].email == currentUser.email){
                        //then we store its first name and last name
                        setFirstName(obj[id].firstName)
                        setLastName(obj[id].lastName)
                    }
                })
            });
        }
        onLoadSet(false)
    });

    return ( 

        <div>
        
        <Navigationbar/>
        <div className = "apni">
            <Row className="left">

            <Col  md="4" >
             <Row>
             <a  href = "/dashboard">
             <button type="button" class="btn-dark" > Dashboard </button> 
             </a>
            </Row>
            <Row>
            <a href  = "/userprofile">
            <button type="button" class="btn btn-outline-dark"  href  = "/userprofile"> Account Info &nbsp;&nbsp; </button>&nbsp;&nbsp;
            </a>
            </Row>
            </Col>

            <Col md="6">

            <h2> Hello {firstName} {lastName}!</h2>
            <h5> &nbsp;  </h5>
            <h5> Name: {firstName} {lastName}</h5>
            <small> &nbsp;</small>
            <h5> Email: {currentUser.email}</h5>
            


            </Col>



            </Row>

            
            </div>
        <Clientfooter/>
        </div>

    )
}
export default DashBoard;



// idar jo ~ cat id_rsa.pub hai it didnt work for me so 
// just do this: clip  pbcopy < ~/.ssh/id_rsa.pub