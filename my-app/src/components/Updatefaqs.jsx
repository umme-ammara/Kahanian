import React, {useState, useEffect, useRef} from "react";
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import firebaseDb from "./firebase";
import Populate from "./test";
import Header from "./Header";
import Footer from "./Footer";
import './Viewfaqs.css';
import './Bread.css';



import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

//REFERENCE USED: https://www.youtube.com/watch?v=pI4438IHBYY&t=690s

function Updatefaqs(){
    var [faqs, setFaqObjects] = useState({});
    var [currentId, setCurrentId] = useState(''); 
    let firebaseDb = app.database();
    
    useEffect(() => {
        firebaseDb.ref().child('FAQs').on('value', snapshot => {
            if (snapshot.val() != null) {
                setFaqObjects({
                    ...snapshot.val()
                });
            }
        })
    }, []);

    async function addOrEdit(obj){
        if (currentId == '')
            firebaseDb.ref().child('FAQs').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        else {
            firebaseDb.ref().child(`FAQs/${currentId}`).set(
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
            firebaseDb.ref().child(`FAQs/${id}`).remove(
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
            <Breadcrumb.Item  active>FAQS</Breadcrumb.Item>
        </Breadcrumb> 
        <div className = "row">
            <div className = "col-md-5">
                <Populate {...({ currentId, faqs, addOrEdit })}> </Populate>
            </div>
            <div className = "col-md-7">

            <table align = "center" className = "table table-borderless table-stripped">
                <thead className = "thead-light">
                    <tr>
                        <th>Questions</th>
                        <th>Answers</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(faqs).map(key => {
                            return <tr key={key}>
                                <td>{faqs[key].question}</td>
                                <td>{faqs[key].answer}</td>
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

export default Updatefaqs;