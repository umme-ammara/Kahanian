import React , { useEffect, useState, useRef } from "react";
import "./UserProfile.css";
import Navigationbar from './header/Navbar.jsx'
import Footer from "./Footer";
import {Breadcrumb, Container} from "react-bootstrap";
import Header from "./Header";
import axios from 'axios'
import { render } from "react-dom";
import { storage } from "../firebase"; 
import { link, useHistory } from "react-router-dom"


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Row,
  Alert,
  Col,
} from "react-bootstrap";

//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function AddCollection() {
  let DB = app.database();
  const [image1,setImage1]=useState(null) ;
  const [url, setUrl1] = useState("");
  const [progress, setProgress] = useState(0);
  const collectionName=useRef()
  const description=useRef()
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


    function fileSelectedHandler1(event)
        { 
            // console.log("hello")
            // console.log(event.target.files[0])
            setImage1(event.target.files[0])
            // console.log(image)
            

         }

    function uploadHandler (event)
         { 

           if (image1!=null)
           { setLoading(true)
            setMessage("Loading...")
             console.log(image1)
            const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
            
            uploadTask.on(
            "state_changed",
            snapshot => {
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
            },
            error => {
            console.log(error);
            },
            () => {
            storage
            .ref("images")
            .child(image1.name)
            .getDownloadURL()
            .then(url1 => {
            setUrl1(url1);
            var collectionField={
              name:collectionName.current.value , 
              description: description.current.value,
              salePercentage: 0 ,
              flag: true,
              imageSource:url1
            }
            DB.ref().child("Collection").push(collectionField)
            setLoading(false)
            setMessage("")
            history.push("/managecollections")
            
          });
            }
            ); 
          }

            // var collectionField={
            //   name:collectionName.current.value , 
            //   description: description.current.value,
            //   salePercentage: 0 ,
            //   flag: true,
            //   imageSource:url
            // }
            // DB.ref().child("Collection").push(collectionField)
            // history.push("/managecollections")
        }



  return (
    <div>
       <Header/>
       <Breadcrumb class="breadcrumb">
                <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
                <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  href="/managecollections">Manage Collections</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  active>Add Collection</Breadcrumb.Item>
            </Breadcrumb>
       <div  >
      

         
            <Card  className="middle" > 
              <Card.Header>
                <Card.Title as="h4"> Add Collection</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                 
                  <Row>
                    <Col className="pr-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Collection Name</label>
                        <Form.Control
                        //   defaultValue="Mike"
                          placeholder="Name"
                          ref={collectionName}
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Description</label>
                        <Form.Control
                        //   defaultValue="Andrew"
                          placeholder="Description"
                          ref={description}
                          type="text" 
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col md="6" className="middle">
                    <Form.Group >
                     
                    <input type="file"  accept="image/*"  onChange={fileSelectedHandler1} name="image1" id="file1" />
                    <label class="custom-file-label" for="file1">Product  Image 1</label>
                        
                
                        
                        
                      </Form.Group>
                    </Col>
                    
                  </Row>
                 
                 <div><small> &nbsp;</small></div>
                  <Button
                    className="btn btn-dark "
                    variant="info" onClick={uploadHandler} >
                    Add 
                    
                  </Button>

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
              <div> {loading && <Alert variant = "dark">{message}</Alert>}</div>
            </Card>
         

      </div>
      <Footer/>
    </div>
  );
}

export default AddCollection;
