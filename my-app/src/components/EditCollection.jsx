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
import "./cards.css"; 
import {FaEdit} from 'react-icons/fa'; //EDIT ICON
import {RiDeleteBin6Fill} from 'react-icons/ri'; //DELETE ICON 
import {GrAddCircle} from 'react-icons/gr'; //ADD ICON 
import {RiInboxArchiveLine} from 'react-icons/ri'; //Archive icon 


//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


let collectionID = localStorage.getItem('collectionID')
let colName = collectionID;

function EditCollection() {
    
    let DB = app.database();
    const [object,setObject]=useState({})
    const [onLoad, setOnLoad] = useState(true) 
    const [product,setProduct]=useState([])
    const [pID,setPID]=useState(0)

    const collectionName = useRef()
    const collectionDescription = useRef()
    const salePercentage = useRef()
   
    //function for updating discount 
    //salePrice is basically discount percentage 
    // by using update

    function sendProductID(productID)
    {
        //console.log("hello",productID)
        localStorage.setItem('productID', productID)
        //console.log(localStorage.getItem('productID'))
    }

    useEffect(() => {
        if(onLoad === true){
            DB.ref().child("Collection/"+ collectionID).on("value",snapshot => {
                // console.log(snapshot.val()) //this is the object
                setObject(snapshot.val())
                setPID(snapshot.val().salePercentage)
                

            }) 
            DB.ref().child("Collection/"+ collectionID+"/Product").on("value",snapshot =>{
                let obj = snapshot.val()
                // console.log(obj)
                // setProduct(obj)
                // Object.keys(obj).map(id => {
                //     setPID(obj[id].salePrice)
                // })

                const tempArray = []
                try{
                    Object.keys(obj).map(id => {
                    // console.log("id", id)
                    
                        const tempObject = {
                            identification : id,
                            image : obj[id].imageSource,
                            name : obj[id].name,
                            price : obj[id].price,
                            description : obj[id].description
                        }
                        tempArray.push(tempObject)
                        //   setPID(obj[id].salePrice)
                    
    
                    })
                    setProduct(tempArray)
                }
                catch{
                    setProduct([])
                }
                
            })
        }
        setOnLoad(false)

    })
    console.log(product)

    function setDiscountZero()
    {
        //console.log("hello",productID)
        // localStorage.setItem('productID', productID)
        //console.log(localStorage.getItem('productID'))
        setPID(0)
        //HERE SET the discount to zero in DB
        DB.ref().child("Collection/" + collectionID).update({
            salePercentage: 0
        }) ;
        //UPDATED

        // Sending an alert 
        // <div class="alert alert-secondary" role="alert"> Discount has been removed!</div>
    }

    function handleSubmit() {

        //check for empty submissions
        setPID(parseInt(salePercentage.current.value))
        console.log(pID)
        DB.ref().child("Collection/"+collectionID).update({
            salePercentage: salePercentage.current.value,
            description: collectionDescription.current.value,
            name: collectionName.current.value
        })
    }
    
    return (
        <div>

        <Header/>
        <Breadcrumb class="breadcrumb">
                <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
                <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  href="/managecollections">Manage Collections</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  active>Edit Collection</Breadcrumb.Item>
            </Breadcrumb>
        <div >
       
        <Container className="middle">
            <Row >
                <Form className="top-middle" onSubmit = {handleSubmit} >
                    <Form.Group  >
                        <Form.Label  >Collection Name</Form.Label>
                        {/* <Form.Control type="text" value={object.name}></Form.Control> */}
                        <Form.Control 
                          defaultValue= {object.name}
                          placeholder="Collection Name"
                          as="textarea" rows={1}
                          class="form-control" 
                          id="validationDefault01"
                          ref = {collectionName}
                          required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group  >
                        <Form.Label  >Collection Description</Form.Label>
                        {/* <Form.Control type="text" value={object.name}></Form.Control> */}
                        <Form.Control 
                          defaultValue= {object.description}
                          placeholder="Description"
                          as="textarea" rows={3}
                          class="form-control" 
                          id="validationDefault01"
                          ref = {collectionDescription}
                          required
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Discount on Collection / %</Form.Label>
                        {/* <Form.Control type="number" value={pID} min="0" max="100"></Form.Control> */}
                        <Form.Control
                          defaultValue= {object.salePercentage}
                          placeholder="Percentage"
                          type="number"
                          min="0" max="100"
                          class="form-control" 
                          id="validationDefault01"
                          ref = {salePercentage}
                          required
                        ></Form.Control>
                        
                        <Button
                        className="btn btn-dark "
                        type="submit"
                        onClick = {()=>{setDiscountZero()}}>
                        Remove Discount
                        </Button>
                    </Form.Group>
                   


                  <Button
                    className="btn btn-dark "
                    type="submit"
                    variant="info"
                  >
                    Update Collection
                  </Button>
                </Form>
            </Row>
            <Row className="middle"> 
                <Col className="itemValues"> <h4>ITEMS IN COLLECTION</h4></Col>
                <Col>
                {
                // REUSE CARDS.jsx HERE
                }
                </Col>
            </Row>
        </Container>
        
        </div>
        <Container>
        <Row  md = {4}>
        { product.map((prod) => {
            return (

            <Card style={{ width: '18rem', flex: 1 }}>
                <Card.Img variant="top" src = {process.env.PUBLIC_URL + prod.image} alt = {"denjcollection"} className = "imgeffects" />
                <Card.Body>
                <Card.Title> {prod.name} </Card.Title>
                <Card.Text>
                <p>{prod.description}</p>
                {prod.price}
                </Card.Text>

                <Button bsPrefix="super-btn w-100" href="./EditProduct"  variant="primary" onClick = {()=>{sendProductID(prod.identification)}} >
                EDIT <FaEdit class = "iconstyle" />

                </Button> 

            
                <Button bsPrefix="super-btn w-100"  variant="primary">
                ARCHIVE <RiInboxArchiveLine class = "iconstyle"/>
                </Button> 
                {console.log(prod)}
            
                </Card.Body>
        </Card> )
          
       } )
       }
       </Row>
       <br></br>
        <Row md = {4}>
        <Card style={{ width: '18rem', flex: 1 }}>
        <Card.Img variant="top" src = {empty} alt = {"emptycollection"} className = "imgeffects" />
        <Card.Body>
            <Card.Title>  </Card.Title>
            <Card.Text>
                
            </Card.Text>
            {/* <Button bsPrefix="super-btn w-100"   variant="primary">
               ADD COLLECTION <GrAddCircle class = "iconstyle"/>
            </Button>  */}
            <a  class="btn btn-outline-secondary"  variant="primary" href="./addProduct" role="button" >  Add Product  <GrAddCircle class = "iconstyle"/>&nbsp;&nbsp; </a>&nbsp;&nbsp;
        </Card.Body>
        </Card> 

       
        </Row>
        </Container>

        <Footer/>

        </div>

    )

}

export default EditCollection;