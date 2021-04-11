import React, {useState, useEffect} from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
// import firebaseDb from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import './Viewsubs.css';
import './Bread.css';

import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');



function Queries() {
    let firebaseDb = app.database()
    var [queries, setQueryObjects] = useState({})
    useEffect(() => {
        firebaseDb.ref().child("Query").on("value", snapshot => {
            if (snapshot.val()!=null)
            setQueryObjects({
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
            <Breadcrumb.Item  active>View Queries</Breadcrumb.Item>
        </Breadcrumb>
        
            <table align = "center" className = "table table-borderless table-stripped">
                <thead className = "thead-light">
                    <tr>
                        <th>Timestamp</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(queries).map(id => {
                            return <tr>
                                <td>{queries[id].timestamp} </td>
                                <td>{queries[id].name}</td>
                                <td>{queries[id].email}</td>
                                <td>{queries[id].message}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <Footer/>

            </Container>


    );
}

export default Queries; 