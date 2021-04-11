import React, {useState, useEffect} from "react";
import Navigationbar from './header/Navbar.jsx'
import Clientfooter from './Clientfooter'
import Container from 'react-bootstrap/Container'
// import firebaseDb from "./firebase";
import './Viewfaqs.css'
import logoImage from './kahanian-logo.PNG'
import Image from 'react-bootstrap/Image'

import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function Getabout(){
    var [about, setAboutObjects] = useState({})
    let firebaseDb = app.database();

    

    useEffect(() => {
        firebaseDb.ref().child("About").on("value", snapshot => {
            if (snapshot.val()!=null)
            setAboutObjects({
                ...snapshot.val()
            })
         })
    }, [])

    return (
             <div>
                 <Navigationbar/>
            {/* title of about us page */}
                <h2 className="title-of-page">About Us</h2>
            {/* the black and white image I am just importing the image here because i doubt image is something that will be changed by the client*/}
                <Image className = "logo-image" src={logoImage} fluid />
            {/* about us text */}
                    {
                        Object.keys(about).map(id => {
                            return <p className="text-of-page">{about[id].description}</p>

                        })
                    }
            <Clientfooter/>
            </div>
       
    ); 
}

export default Getabout;