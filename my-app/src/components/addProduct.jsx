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
  Col,
  Alert,
} from "react-bootstrap";

//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

let collectionID = localStorage.getItem('collectionID')


function AddProduct() {
    let DB = app.database();
    const [image1,setImage1]=useState(null) ;
    const [image2,setImage2]=useState(null) ;
    const [image3,setImage3]=useState(null) ;
    const [image4,setImage4]=useState(null) ;
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [url4, setUrl4] = useState("");
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const name=useRef()
    const description=useRef()
    const details=useRef()
    const price=useRef()
    const S_stock=useRef()
    const M_stock=useRef()
    const L_stock=useRef()
    const history = useHistory()


    // function loadFile (event) {
    //     let image = document.getElementById('output');
    //     alert("The value has changed " );
    //     image.src = process.env.PUBLIC_URL.createObjectURL(event.target.files[0]);
    //     }
    function sendProductID(CollectionID)
    {
        //console.log("hello",productID)
        localStorage.setItem('collectionID', CollectionID)
        //console.log(localStorage.getItem('productID'))
    }
    
    function fileSelectedHandler1 (event)
        { 
            // console.log("hello")
            // console.log(event.target.files[0])
            setImage1(event.target.files[0])
            // console.log(image)
            

         }
         function fileSelectedHandler2 (event)
        { 
            // console.log("hello")
            // console.log(event.target.files[0])
            setImage2(event.target.files[0])
            // console.log(image)
            

         }
         function fileSelectedHandler3 (event)
        { 
            // console.log("hello")
            // console.log(event.target.files[0])
            setImage3(event.target.files[0])
            // console.log(image)
            

         }
         function fileSelectedHandler4 (event)
        { 
            // console.log("hello")
            // console.log(event.target.files[0])
            setImage4(event.target.files[0])
            // console.log(image)
            

         }
    function uploadHandler (event)
         { 
           setLoading(true)
           setMessage("Loading...")
            console.log(image1)
            console.log(image2)
            console.log(image3)
            console.log(image4)
            // for image 1 
            if (image1!= null)
            {
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
            if (image2!= null)
            {
            const uploadTask = storage.ref(`images/${image2.name}`).put(image2);
            
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
            .child(image2.name)
            .getDownloadURL()
            .then(url2 => {
            setUrl2(url2);

            if (image3!= null)
            {
            const uploadTask = storage.ref(`images/${image3.name}`).put(image3);
            
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
            .child(image3.name)
            .getDownloadURL()
            .then(url3 => {
            setUrl3(url3);
            if (image4!= null)
            {
            const uploadTask = storage.ref(`images/${image4.name}`).put(image4);
            
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
            .child(image4.name)
            .getDownloadURL()
            .then(url4 => {
            setUrl4(url4);

            var ProductField={
                name:name.current.value , 
                description: description.current.value,
                details: details.current.value,
                price: price.current.value ,
                size: [S_stock.current.value,M_stock.current.value,L_stock.current.value],
                imageSource:[url1,url2,url3,url4]
              }
            //   console.log(ProductField)
            //   console.log(collectionID)
              DB.ref().child("Collection/"+collectionID+"/Product").push(ProductField).then(()=>{
                setMessage("")
                setLoading(false)
                history.push("/EditCollection")
              })
             
    
          });
            }
            );
        }
          });
            }
            );
        }


          });
            }
            );
        }
        

          });
            }
            );
        }
       
        
        // for image 3
        
        // for image 4
       

        

        };
          


  return (
      
    <div>
       <Header/>
       <Breadcrumb class="breadcrumb">
                <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
                <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  href="/managecollections">Manage Collections</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  href="/EditCollection">Edit Collection </Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  active>Add Product</Breadcrumb.Item>
            </Breadcrumb>
       <div  >
      

         
            <Card  className="middle" > 
              <Card.Header>
                <Card.Title as="h4"> Add Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                 
                  <Row>
                    <Col className="pr-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Product Name</label>
                        <Form.Control
                          ref={name}
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Details</label>
                        <Form.Control
                          ref={details}
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Price</label>
                        <Form.Control
                          ref={price}
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Description</label>
                        <Form.Control
                          ref={description}
                          type="text" 
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                   
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right"> &nbsp;</label>
                        <Form.Control
                        defaultValue="SIZE SMALL "
                        disabled
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Stock of Small size</label>
                        <Form.Control
                          ref={S_stock}
                          type="number"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right"> &nbsp;</label>
                        <Form.Control
                        defaultValue="SIZE MEDIUM "
                        disabled
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Stock of Medium size</label>
                        <Form.Control
                          ref={M_stock}
                          type="number"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right"> &nbsp;</label>
                        <Form.Control
                        defaultValue="SIZE LARGE "
                        disabled
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Stock of Large size</label>
                        <Form.Control
                          ref={L_stock}
                          type="number"
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
                  <Row>
                    <Col md="6" className="middle">
                    <Form.Group >


                    <input type="file"  accept="image/*"  onChange={fileSelectedHandler2} name="image2" id="file2" />
                        <label class="custom-file-label" for="file2">Product  Image 2</label>
                        
                            
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col md="6" className="middle">
                    <Form.Group >


                    <input type="file"  accept="image/*"  onChange={fileSelectedHandler3} name="image3" id="file3" />
                        <label class="custom-file-label" for="file3">Product  Image 3</label>
                     
                            
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col md="6" className="middle">
                    <Form.Group >


                    <input type="file"  accept="image/*"  onChange={fileSelectedHandler4} name="image4" id="file4" />
                        <label class="custom-file-label" for="file4">Product  Image 4</label>
                     
                            
                      </Form.Group>
                    </Col>
                    
                  </Row>
                 
                 
                 <div><small> &nbsp;</small></div>
                  <Button
                    className="btn btn-dark "
                    variant="info" onClick={uploadHandler}>
                    Add Product 
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

export default AddProduct;

