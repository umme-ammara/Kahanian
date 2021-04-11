import React from "react";
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
import {GrAddCircle} from 'react-icons/gr'; //ADD ICON 
import "./cards.css"; 

function Cards () {
    return (
    <Container>

    <Row  md = {4}>
  
        <Card style={{ width: '18rem', flex: 1 }}>
        <Card.Img variant="top" src = {denj} alt = {"denjcollection"} className = "imgeffects" />
        <Card.Body>
            <Card.Title> DENJ </Card.Title>
            <Card.Text>
                 Winter Collection
            </Card.Text>

            <Button bsPrefix="super-btn w-100"   variant="primary">
               EDIT <FaEdit class = "iconstyle"/>
            </Button> 
            
            <Button bsPrefix="super-btn w-100"  variant="primary">
                DELETE <RiDeleteBin6Fill class = "iconstyle"/>
            </Button> 
            
        </Card.Body>
        </Card>
        
        <Card style={{ width: '18rem', flex: 1 }}>
        <Card.Img variant="top" src = {mahtaab} alt = {"mahtaabcollection"} className = "imgeffects" />
        <Card.Body>
            <Card.Title> MAHTAAB </Card.Title>
            <Card.Text>
                 Festive Collection
            </Card.Text>

            <Button bsPrefix="super-btn w-100"   variant="primary">
               EDIT <FaEdit class = "iconstyle"/>
            </Button> 
            <Button bsPrefix="super-btn w-100"  variant="primary">
                DELETE <RiDeleteBin6Fill className = "iconstyle"/>
            </Button> 
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem', flex: 1 }}>
        <Card.Img variant="top" src = {corsage} alt = {"corsagecollection"} className = "imgeffects" />
        <Card.Body>
            <Card.Title> CORSAGE </Card.Title>
            <Card.Text>
                Spring Collection
            </Card.Text>
            <Button bsPrefix="super-btn w-100"   variant="primary">
               EDIT <FaEdit class = "iconstyle"/>
            </Button> 
            <Button bsPrefix="super-btn w-100"  variant="primary">
                DELETE <RiDeleteBin6Fill className = "iconstyle"/>
            </Button> 
        </Card.Body>
        </Card>
        
        <Card style={{ width: '18rem', flex: 1 }}>
        <Card.Img variant="top" src = {satrangi} alt = {"satrangicollection"} className = "imgeffects" />
        <Card.Body>
            <Card.Title> SATRANGI </Card.Title>
            <Card.Text>
                Summer Collection
            </Card.Text>
            <Button bsPrefix="super-btn w-100"   variant="primary">
               EDIT <FaEdit class = "iconstyle"/>
            </Button> 
            <Button bsPrefix="super-btn w-100"  variant="primary">
                DELETE <RiDeleteBin6Fill className = "iconstyle"/>
            </Button> 
        </Card.Body>
        </Card>
        </Row>
        <br></br>
        <Row md = {4}>
        <Card style={{ width: '18rem', flex: 1 }}>
        <Card.Img variant="top" src = {empty} alt = {"emptycollection"} className = "imgeffects" />
        <Card.Body>
            <Card.Title>  </Card.Title>
            <Card.Text>
                
            </Card.Text>
            <Button bsPrefix="super-btn w-100"   variant="primary">
               ADD COLLECTION <GrAddCircle class = "iconstyle"/>
            </Button> 
        </Card.Body>
        </Card>
        </Row>
        </Container>
    );

}

export default Cards;