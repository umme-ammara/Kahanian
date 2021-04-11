import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import './placeOrderInfo.css'
import image1 from './IMG_0971.jpg'

function PlaceOrderInfo()
{
    return(
        <Container className="place-order">
            {/* this row contains the entire place order page info */}
            <Row>
                {/* the first column has the oder summary */}
                <Col md={8}>
                    {/* the order summary will have dynamically generated cards to display the products */}
                    <Card border="dark" style={{ width: '90%' }}>
                        <Card.Body>
                        <Card.Title className="order-title">Order Summary</Card.Title>
                        <hr className="line"/>

                        <Row className = "article-row">
                            {/* this column contains information about the article */}
                            <Col xs={9}>
                                <Row>
                                    <Col xs={6}><Image src={image1} fluid /></Col>
                                    <Col className= "article-info">
                                        <Card.Text>
                                            Yellow <br/>
                                            Size: small <br/>
                                            Qty: 1
                                        </Card.Text>   
                                    </Col>
                                </Row>
                            </Col>
                            {/* this contains the price of the article */}
                            <Col className= "article-info">Rs 4550</Col>
                        </Row>



                        <hr className="line"/>
                        <Row className = "article-row">
                            <Col xs={9}>
                               Subtotal <br/>
                               Shipping <br/>
                               Discount <br/>
                               <p className="order-total">ORDER TOTAL</p>
                            </Col>
                            <Col>
                               Rs 11,050 <br/>
                               Rs 150 <br/>
                               Rs 0 <br/>
                               <p className="order-total"> Rs 11,200 </p> 
                            </Col>
                        </Row>

                        </Card.Body>
                    </Card>




                </Col>
                {/* this column contains shipping summary */}
                <Col className="shipping-details">
                    <Card.Title className="order-title">Ship to:</Card.Title>
                    <hr className="line"/>
                    <Card.Text>
                        Mr Ali Ahmed <br/>
                        196-D DHA Phase 3 <br/>
                        Lahore<br/>
                        0300 8067345
                    </Card.Text> 

                    <Card.Title className="shipping-title">Shipping method</Card.Title>
                    <hr className="line"/>
                    <Card.Text>
                       Cash on Delivery
                    </Card.Text> 
                </Col>
            </Row> 

            <Button variant="dark" size="lg" block className = "place-order-button">
                PLACE ORDER
            </Button>   
        </Container>

    )
}

export default PlaceOrderInfo;