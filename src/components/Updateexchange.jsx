import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import firebaseDb from "./firebase";
import Populateexc from "./test2";
import Header from "./Header";
import Footer from "./Footer";
import './Viewfaqs.css';
import './Bread.css';

//REFERENCE USED: https://www.youtube.com/watch?v=pI4438IHBYY&t=690s

//THIS PAGE ALLOWS THE ADMIN TO UPDATE THE EXCHANGE POLICY
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

function Updateexchange(){
    let firebaseDb = app.database();
    var [exchange, setEObjects] = useState({});
    var [currentId, setCurrentId] = useState(''); 
    
    useEffect(() => {
        firebaseDb.ref().child('Exchange').on('value', snapshot => {
            if (snapshot.val() != null) {
                setEObjects({
                    ...snapshot.val()
                });
            }
        })
    }, []);

    async function addOrEdit(obj){
        if (currentId == '')
            firebaseDb.ref().child('Exchange').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        else {
            firebaseDb.ref().child(`Exchange/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
    };

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            firebaseDb.ref().child(`Exchange/${id}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
    }


    return (
        <Container>
        <Header/>
        <Breadcrumb class="breadcrumb">
            <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
            <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
            <Breadcrumb.Item  href="/UpdateInformation">Update Information</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
            <Breadcrumb.Item  active>Exchange Policy</Breadcrumb.Item>
        </Breadcrumb> 
        <div className = "row">
            <div className = "col-md-5">
                <Populateexc {...({ currentId, exchange, addOrEdit })}> </Populateexc>
            </div>
            <div className = "col-md-7">

            <table align = "center" className = "table table-borderless table-stripped">
                <thead className = "thead-light">
                    <tr>
                        <th>Exchange & Return Policy</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(exchange).map(key => {
                            return <tr key={key}>
                                <td>{exchange[key].policy}</td>
                            
                                <td>
                                    <a className = "btn text-primary" onClick={() => { setCurrentId(key) }}>  
                                        <i className = "fas fa-pencil-alt"></i>
                                    </a>
                                    <a className = "btn text-danger" onClick={() => { onDelete(key) }}>
                                        <i className = "fas fa-trash-alt"></i>
                                    </a>
                                </td>
                                
                            </tr>
                        })
                    }
                </tbody>
            </table>

            </div>
        </div>

            <Footer/>
            </Container>


    ); 
}

export default Updateexchange;
