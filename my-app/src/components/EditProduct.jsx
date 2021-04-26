import React , { useEffect, useState, useRef } from "react";
import {Breadcrumb, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Header from "./Header";
import Card from "react-bootstrap/Card";
import empty from "./EMPTY.jpg";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Navigationbar from './header/Navbar.jsx'
import Footer from "./Footer";
import "./UserProfile.css";
import {FaEdit} from 'react-icons/fa'; //EDIT ICON
import {RiDeleteBin6Fill} from 'react-icons/ri'; //DELETE ICON 
import {GrAddCircle} from 'react-icons/gr'; //ADD ICON 

//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

let productID = localStorage.getItem('productID')
let collectionID = localStorage.getItem('collectionID')


function EditProduct() {

    // console.log(productID)
    let DB = app.database();
    const [onLoad, setOnLoad] = useState(true) 
    const [name, setName] = useState("") 
    const [description, setDescription] = useState("") 
    const [price, setPrice] = useState("") 
    const [details, setDetails] = useState("") 
    const [S_stock, setS_stock] = useState() 
    const [M_stock, setM_stock] = useState() 
    const [L_stock, setL_stock] = useState() 

    const nameRef = useRef()
    const descriptionRef = useRef()
    const priceRef = useRef()
    const detailsRef = useRef()
    const S_stockRef = useRef()
    const M_stockRef = useRef()
    const L_stockRef = useRef()

    useEffect(() => {
        if(onLoad===true)
        {
            // we need to extract name, detail, description , stock 
            DB.ref().child("Collection/"+ collectionID+"/Product/"+productID).on("value",snapshot=>{
                let obj= snapshot.val()
                console.log(obj.size[0])
                setName(obj.name)
                setDescription(obj.description)
                setPrice(obj.price)
                setDetails(obj.details)
                setS_stock(obj.size[0])
                setM_stock(obj.size[1])
                setL_stock(obj.size[2]) 

            })
        }
        setOnLoad(false)


    })
    function handleSubmit() {

        DB.ref().child("Collection/"+collectionID+"/Product/"+productID).update({
                name:nameRef.current.value , 
                description: descriptionRef.current.value,
                details: detailsRef.current.value,
                price: priceRef.current.value ,
                size: [S_stockRef.current.value,M_stockRef.current.value,L_stockRef.current.value],
        
        })
    }

  return (
      
    <div>
       <Header/>

       <Breadcrumb class="breadcrumb">
                <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
                <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  href="/managecollections">Manage Collections</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  href="/EditCollection">Edit Collection</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  active>Edit Product</Breadcrumb.Item>
            </Breadcrumb>
       <div  >
      

         
            <Card  className="middle" > 
              <Card.Header>
                <Card.Title as="h4"> Edit Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit = {handleSubmit}> 
                 
                  <Row>
                    <Col className="pr-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Product Name</label>
                        <Form.Control
                          defaultValue={name}
                          ref={nameRef}
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Details</label>
                        <Form.Control
                          defaultValue={details}
                          ref={detailsRef}
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
                          defaultValue={price}
                          ref={priceRef}
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                    <Col className="pl-1" md="6" className="middle">
                      <Form.Group>
                        <label className="right">Description</label>
                        <Form.Control
                          defaultValue={description}
                          ref={descriptionRef}
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
                          defaultValue={S_stock}
                          ref={S_stockRef}
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
                          defaultValue={M_stock}
                          ref={M_stockRef}
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
                          defaultValue={L_stock}
                          ref={L_stockRef}
                          type="number"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                  </Row>
                 
                  
                 
                 <div><small> &nbsp;</small></div>
                  <Button
                    className="btn btn-dark "
                    type="submit"
                    variant="info" >
                    Edit Product
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
         

      </div>
      <Footer/>
    </div>
  );
}

export default EditProduct;

