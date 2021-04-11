import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './articles.css'

function Articles(props)
{
    return(
        <Card className="entire-card" style={{ width: '15rem' }} >
            <Card.Img variant="top" src={props.image} />
            <Card.Body class="card-body">
                {/* add name of the product */}
                <Card.Title>{props.title}</Card.Title>
                {/* add whether the product is two peice or three piece */}
                <Card.Text>{props.piece}</Card.Text>
                {/* add price of the product */}
                <Card.Text>{props.price}</Card.Text>
                {/* Butoon takes the customer to the product page  */}
                <Button variant="outline-dark" href="/product">View Product</Button>
            </Card.Body>
        </Card>
    )
}
export default Articles;