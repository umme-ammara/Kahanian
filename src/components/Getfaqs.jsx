import React, {useState, useEffect} from "react";
import Navigationbar from './header/Navbar.jsx'
import Clientfooter from './Clientfooter'
import Container from 'react-bootstrap/Container'
// import firebaseDb from "./firebase";
import './Viewfaqs.css'
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

function Getfaqs(){
    var [faqs, setFaqObjects] = useState({})
    let firebaseDb = app.database();
    

    useEffect(() => {
        firebaseDb.ref().child("FAQs").on("value", snapshot => {
            if (snapshot.val()!=null)
            setFaqObjects({
                ...snapshot.val()
            })
         })
    }, [])

    return (
        <Container>
            <Navigationbar/>
            <h2 className="title-of-page">Frequently asked questions</h2>
            <table align = "center" className = "table table-borderless table-stripped">
                <thead className="Heading-QandA">
                    <tr >
                        <th>Questions</th>
                        <th>Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(faqs).map(id => {
                            return <tr>
                                <td className = "questions">{faqs[id].question}</td>
                                <td>{faqs[id].answer}</td>
                                <hr/>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <Clientfooter/>
            </Container>


    ); 
}

export default Getfaqs;