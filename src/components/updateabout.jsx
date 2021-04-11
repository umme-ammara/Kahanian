import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import firebaseDb from "./firebase";
import Populateabout from "./test3";
import Header from "./Header";
import Footer from "./Footer";
import './Viewfaqs.css';
import './Bread.css';



import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

//REFERENCE USED: https://www.youtube.com/watch?v=pI4438IHBYY&t=690s

function Updateabout(){
    let firebaseDb = app.database();
    var [aboutt, setAObjects] = useState({});
    var [currentId, setCurrentId] = useState(''); 
    
    useEffect(() => {
        firebaseDb.ref().child("About").on('value', snapshot => {
            if (snapshot.val() != null) {
                setAObjects({
                    ...snapshot.val()
                });
            }
        })
    }, []);

    async function addOrEdit(obj){
        if (currentId == ''){
            firebaseDb.ref().child("About").push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
        else {
            firebaseDb.ref().child(`About/${currentId}`).set(
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
            firebaseDb.ref().child(`About/${id}`).remove(
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
            <Breadcrumb.Item  href="/updateinformation">Update Information</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
            <Breadcrumb.Item  active>About Us</Breadcrumb.Item>
        </Breadcrumb> 
        <div className = "row">
            <div className = "col-md-5">
                <Populateabout {...({ currentId, aboutt, addOrEdit })}> </Populateabout>
            </div>
            <div className = "col-md-7">

            <table align = "center" className = "table table-borderless table-stripped">
                <thead className = "thead-light">
                    <tr>
                        <th>About Us</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(aboutt).map(key => {
                            return <tr key={key}>
                                <td>{aboutt[key].description}</td>
                            
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

export default Updateabout;