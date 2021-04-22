import React, {useState, useEffect, useRef} from "react";
import {Container, Breadcrumb, Alert} from 'react-bootstrap'
import Header from "./Header";
import Footer from "./Footer";
import './Viewfaqs.css';
import './Bread.css';
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

function Blockreview() {
    let firebaseDb = app.database(); 
    var [feedback, setReviewObjects] = useState({}) 
    var [currentId, setCurrentId] = useState(''); 
    var [errorMsg, setErrorMsg] = React.useState('');

    //Get Reviews from the Database
    useEffect(() => {
        firebaseDb.ref().child("Review").on("value", snapshot => {
            if (snapshot.val()!=null)
            setReviewObjects({
                ...snapshot.val()
            })
         })
    }, [])
    //Delete reviews 
    const onDelete = id => {
        //if (window.confirm('Are you sure to delete this record?')) {
            firebaseDb.ref().child(`Review/${id}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
            setErrorMsg(`This review has been deleted!`)
        //}
    }
    return (
        <Container>
        <Header/>
        <Breadcrumb class="breadcrumb">
            <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
            <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
            <Breadcrumb.Item  active>Manage reviews</Breadcrumb.Item>
        </Breadcrumb> 

        {/* Display Alert showing that the Review has been submitted*/}
        <div>
            {errorMsg && <Alert variant = "success">{errorMsg}</Alert>}
        </div>
      
            <table align = "center" className = "table table-borderless table-stripped">
                <thead className = "thead-light">
                    <tr>
                        <th>Timestamp</th>   
                        <th>Customer Reviews</th>
                        <th>Delete Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(feedback).map(key => {
                            return <tr key={key}>
                                <td>{feedback[key].timestamp}</td>
                                <td>{feedback[key].reviews}</td>
                                <td>
                                    <a className = "btn text-danger" onClick={() => { onDelete(key) }}>
                                        <i className = "fas fa-trash-alt"></i>
                                    </a>
                                </td>
                                
                            </tr>
                        })
                    }
                </tbody>
            </table>

          
            <Footer/>
            </Container>


    );
}

export default Blockreview;