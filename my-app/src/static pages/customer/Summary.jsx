import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import './summary.css'
function CheckoutSummary(props)
{
    return (
    <Card className="entire-card" border="dark" style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title className="title-description">Order Summary</Card.Title>
            <Card.Text>
                {/* the rows and columns are to make sure the prices and the description align properly. first column is description */}
                {/* second column is price */}
                    <Row>
                        <Col>Subtotal</Col>
                        <Col>Rs {props.price}</Col>
                    </Row>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>Rs {props.shipping}</Col>
                    </Row>
                    <Row>
                        <Col>ORDER TOTAL</Col>
                        <Col>Rs {props.price+props.shipping}</Col>
                    </Row>
            </Card.Text>
        </Card.Body>
    </Card>

    )
}

export default CheckoutSummary;