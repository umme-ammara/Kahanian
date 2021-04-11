import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import './summaryCart.css'
function SummaryCart(props)
{
    return (
    <div>
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
                        <Col>Discount</Col>
                        <Col>Rs {props.shipping}</Col>
                    </Row>
                    <Row>
                        <Col>ORDER TOTAL</Col>
                        <Col>Rs {props.price+props.shipping}</Col>
                    </Row>
                    <Button variant="dark" className="checkout-button">CHECKOUT</Button>
            </Card.Text>
        </Card.Body>
    </Card>
    {/* this is the apply coupon button */}
        <InputGroup className="mb-3" style={{ width: '23rem' }} className="coupon-button">
            <FormControl
            placeholder="Enter voucher code"
            />
            <InputGroup.Append>
            <Button variant="dark">APPLY DISCOUNT</Button>
            </InputGroup.Append>
        </InputGroup>
    </div>
    )
}

export default SummaryCart;