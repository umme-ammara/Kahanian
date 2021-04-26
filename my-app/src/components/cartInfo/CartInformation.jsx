import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import './cartInformation.css'

function CartInfo(props)
{
    return(
        // returns a container that contains dynamically generated rows and each row has five columns
        // width of header is 90% of the screen
        <Card border="dark" style={{ width: '80%' }} className="shopping-cart">
        {/* i added columns to the header to display each of the titles for decription price, etc */}
        {/* added classes to make the header black and the text white */}
        <Card.Header className="header-colour"><Row> <Col xs={5} className = "header-text-item">Item</Col>      <Col  className="header-text">Price</Col>    <Col  className="header-text">Quantity</Col>     <Col  className="header-text">Subtotal</Col>  </Row></Card.Header>
            {/* dynamically generating rows in and columns in the card body, make sure that the items are passed as an array of objects */}
                {props.array.map((item,index) =>

                    <Card.Body>

                        <Row className="row-cart">
                        {/* first column contains item picture and description */}
                        <Col xs={5}>
                            <Row>
                            <Col><Image  src={item.image} fluid /></Col>
                            <Col className="col">
                                <h4 className="article-name">{item.name}</h4>
                                <p className="article-size">Size: {item.sizeItem}</p>
                            </Col>
                            </Row>
                        </Col>
                        {/* second column contains price */}
                        <Col className="col">
                            <h4 className="col-description">Rs. {item.price}</h4>
                        </Col>
                        {/* third col maintain count of items */}
                        {item.outofStock === true ? <Col>Item is out of stock</Col> :
                        <Col className="col">
                            <Row>
                                <Button onClick={()=>props.onRemove(item)} variant="outline-dark" size="sm">-</Button>
                                <h4 className="counter" >  {item.sizesBought} </h4>
                                <Button onClick={()=>props.onAdd(item)} variant="outline-dark" size="sm">+</Button>
                            </Row>
                            {item.hasMoreProducts === true && <Row>This item is running low</Row>}
                            </Col>}
                        {/* fourth column contains price of all items */}
                        <Col className="col"><h4 className="col-description">Rs. {item.price*item.sizesBought}</h4></Col>
                </Row>
                
            
                </Card.Body>
                )}
            
        </Card>

    )
}
export default CartInfo;