import React, {useState, useEffect} from "react";
import {Container,Breadcrumb} from 'react-bootstrap';
// import firebaseDb from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import './Viewsubs.css'; 
import './Bread.css';


import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function Subs() {
    var [subscribers, setSubObjects] = useState({})
    let firebaseDb = app.database()

    useEffect(() => {
        firebaseDb.ref().child("Subscribers").on("value", snapshot => {
            if (snapshot.val()!=null)
            setSubObjects({
                ...snapshot.val()
            })
         })
    }, [])

    return ( 
            <Container>
             <Header/>
                <Breadcrumb class="breadcrumb">
                    <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
                    <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                    <Breadcrumb.Item  active>View Subscribers</Breadcrumb.Item>
                </Breadcrumb>
            <table align = "center" className = "table table-borderless table-stripped">
                <thead className = "thead-light">
                    <tr>
                        <th>List of Subscribers</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(subscribers).map(id => {
                            return <tr>
                                <td>{subscribers[id].email}</td>
                            
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <Footer/>
            </Container>

    )

}

export default Subs;