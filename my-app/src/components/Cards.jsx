import React , { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import denj from "./DENJ.jpg";
import mahtaab from "./MAHTAAB.jpg";
import corsage from "./CORSAGE.jpeg";
import satrangi from "./SATRANGI.jpeg";
import empty from "./EMPTY.jpg";
import {FaEdit} from 'react-icons/fa'; //EDIT ICON
import {RiDeleteBin6Fill} from 'react-icons/ri'; //DELETE ICON 
import {RiInboxArchiveLine} from 'react-icons/ri'; 
import {GrAddCircle} from 'react-icons/gr'; //ADD ICON 
import "./cards.css"; 


//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function Cards () {

    let DB = app.database();
    const [onLoad, setOnLoad] = useState(true) 
    const [object, setObject] = useState({})

    function sendCollectionID(CollectionID)
    {
        //console.log("hello",productID)
        localStorage.setItem('collectionID', CollectionID)
        //console.log(localStorage.getItem('productID'))
    }

    useEffect(() => {
        if(onLoad === true){
            DB.ref().child("Collection").on("value",snapshot => {
                console.log(snapshot.val()) //this is the object
                setObject(snapshot.val())
            })
        }
        setOnLoad(false)
    })
    console.log('HERE')
    console.log(object)
    return (
    <Container>

    <Row  md = {4}>
        
    { Object.keys(object).map((prod) => {
        return (

            <Card style={{ width: '18rem', flex: 1 }}>
                <Card.Img variant="top" src = {process.env.PUBLIC_URL + object[prod].imageSource} alt = {"denjcollection"} className = "imgeffects" />
                <Card.Body>
                <Card.Title> {object[prod].name} </Card.Title>
                <Card.Text>
                {object[prod].description}
                </Card.Text>

                <Button bsPrefix="super-btn w-100" href="./EditCollection"  variant="primary" onClick = {()=>{sendCollectionID(prod)}}>
                EDIT <FaEdit class = "iconstyle"/>
                </Button> 
            
                <Button bsPrefix="super-btn w-100"  variant="primary">
                ARCHIVE <RiInboxArchiveLine class = "iconstyle"/>
                </Button> 
            
                </Card.Body>
        </Card>
           )
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
            <a  class="btn btn-outline-secondary"  variant="primary" href="./addCollection" role="button" >  Add Collection  <GrAddCircle class = "iconstyle"/>&nbsp;&nbsp; </a>&nbsp;&nbsp;
        </Card.Body>
        </Card> 

       
        </Row>
        </Container>
    );

}

export default Cards;