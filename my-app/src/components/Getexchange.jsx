import React, {useState, useEffect} from "react";
import Navigationbar from './header/Navbar.jsx'
import Clientfooter from './Clientfooter'
import Container from 'react-bootstrap/Container'
import './Viewfaqs.css'
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function Getexchange(){
    var [exchange, setExObjects] = useState({})
    let firebaseDb = app.database();

    useEffect(() => {
        firebaseDb.ref().child("Exchange").on("value", snapshot => {
            if (snapshot.val()!=null){
                setExObjects({
                    ...snapshot.val()
                })
            }
           
         })
    }, [])

    return (
        <Container>
            <Navigationbar/>
             <div>
                {/* title of about us page */}
                    <h2 className="title-of-page">Exchange and Return Policy</h2>


                </div>
       
            <table align = "center" className = "table table-borderless table-stripped">

                <tbody>
                    {
                        Object.keys(exchange).map(id => {
                            return <tr >
                                <p className="text-of-exchange">{exchange[id].policy}</p>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <Clientfooter/>
            </Container>


    ); 
}

export default Getexchange;