import React from "react";
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './collage.css'
import image1 from "./images/USM_1953.jpg"
import image2 from "./images/USM_2479.jpg"
import image3 from "./images/USM_2785.jpg"
import image4 from "./images/USM_2794.jpg"
import image5 from "./images/USM_2875.jpg"
import image6 from "./images/USM_2937.jpg"
import kahanianLogo from './kahanian-logo.PNG'


function Collage()
{
    return(
        <div>
        <Container className = "collage-container">
        <Row>
            {/* first column contains logo and some description */}
            <Col xs={12} md={6} className = "kahanian-text">
                <Image className="logo-kahanian" src={kahanianLogo} fluid />
                <p className="kahanian-desc">Weaving pure threads into contemporary silhoutes to narrate the identity of free spirited, modern woman</p>
            </Col>
            
            {/* second column contains the collage of photos */}
            <Col xs={12} md={6}>
                <Row>
                    <Col><Image src={image1} fluid /></Col>
                    <Col><Image src={image2} fluid /></Col>
                    <Col><Image src={image3} fluid /></Col>
                </Row>
                <Row className = "second-row-pictures">
                    <Col><Image src={image4} fluid /></Col>
                    <Col><Image src={image5} fluid /></Col>
                    <Col><Image src={image6} fluid /></Col>
                </Row>    
            </Col>
        </Row>
        </Container>

        </div>
    )
}

export default Collage;