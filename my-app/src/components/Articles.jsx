import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './articles.css'

function Articles(props)
{
    function sendProductID(productID)
    {
        //console.log("hello",productID)
        localStorage.setItem('productID', productID)
        //console.log(localStorage.getItem('productID'))
    }
    return(
        <Card className="entire-card" style={{ width: '15rem' }} >
            <Card.Img variant="top" src={process.env.PUBLIC_URL + props.image} />
            <Card.Body class="card-body">
                {/* add name of the product */}
                <Card.Title>{props.title}</Card.Title>
                {/* add whether the product is two peice or three piece */}
                <Card.Text>{props.piece}</Card.Text>
                {/* add price of the product */}
                <Card.Text>Price: Rs {props.price}</Card.Text>
                {/* Butoon takes the customer to the product page  */}
                <Button variant="outline-dark" href="/product" onClick = {()=>{sendProductID(props.productid)}}>View Product</Button>
            </Card.Body>
        </Card>
    )
}
export default Articles;