import React from "react";
import './shopBycollection.css'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Image1 from "./images/USM_1953.jpg"
import Image2 from "./images/USM_2479.jpg"
import Image3 from "./images/USM_2875.jpg"
import Image4 from "./images/USM_2937.jpg"

function ShopByCollection()
{
    return(
        <div>

        {/* this just print ---------------Shop by collection ----------------------- */}
        <Container className= "header-shopByCollection">
            <Row className="justify-content-md-center">
                <Col >
                <hr className ="hr-shopByCollection"/>
                </Col>
                <Col className = "middle">Shop by Collection</Col>
                <Col >
                <hr className ="hr-shopByCollection"/>
                </Col>
            </Row>
        </Container>


        {/*this part contains the pictures below the  shop by collection header */}

        <Container className= "header-shopByCollection">
            <Row className="justify-content-md-center">
                <Col >
                <Image src={Image1} fluid />
                <h6 className = "pictures-text">MAHTAAB</h6>
                </Col>
                <Col >
                <Image  src={Image2} fluid />
                <h6 className = "pictures-text">DENJ</h6>
                </Col>
                <Col >
                <Image src={Image3} fluid />
                <h6 className = "pictures-text">SATRANGI</h6>
                </Col>
                <Col >
                <Image src={Image4} fluid />
                <h6 className = "pictures-text">CORSAGE</h6>
                </Col>
            </Row>
        </Container>


        </div>
    )

}
export default ShopByCollection;