import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import swal from 'sweetalert';
import './placeOrderInfo.css'
import image1 from './IMG_0971.jpg'

import {app} from "../../firebase"
var firebase = require('firebase/app');
require('firebase/database');
function PlaceOrderInfo()
{
    let DB = app.database();
    const [dis,setDis] = React.useState(false)
    let data    = localStorage.getItem('finalCart')
    data        = JSON.parse(data)
    let address = localStorage.getItem('personalInfo')
    address     = JSON.parse(address)
    let cart = localStorage.getItem('finalCart')
    cart = JSON.parse(cart)
    console.log("this is my cart",cart)
    function placeOrderOnClick()
    {
        // iterating over the products in the cart
        var productId = []
        var quantityArray = []
        cart.map((item)=>{
            // first lets update the products and add into order table and voucher
            var index = 0
            let prodDetail = ""
            let sizeArray = []
            DB.ref().child("Collection/"+ item.colId).on("value",snapshot=>{
                prodDetail += snapshot.val().name + "-"
            })
            DB.ref().child("Collection/" + item.colId + "/Product/" + item.prodId).on("value",snapshot=>{
                sizeArray = snapshot.val().size
            })
            console.log("sizeArrayuper",sizeArray)
            
            prodDetail += item.name + "-"
            if (item.sizeItem == "S")
            {
                index = 0
                prodDetail += "s"
            }
            else if (item.sizeItem == "M")
            {
                index = 1
                prodDetail += "m"
            }
            else
            {
                index = 2
                prodDetail += "l"
            }
            //I HAVE ADDED THIS IF CONDITION
            if (item.sizeStock !== 0)
            {

                sizeArray[index] = (item.sizeStock - item.sizesBought)
                quantityArray.push(item.sizesBought)
                productId.push(prodDetail)
                console.log("sizeArray",sizeArray)

                // updating product
                DB.ref().child("Collection/" + item.colId + "/Product/" + item.prodId + "/size").update(sizeArray)

            }

        })
        console.log("productId",productId)
        console.log("quantityArray",quantityArray)
        
        //var date = new Date(timestamp * 1000).format('yyyy-MM-dd hh:mm:ss')
        var vouch = ""
        var limit = 0
        console.log("this is voucher", localStorage.getItem('voucherCode'))
        if (localStorage.getItem('voucherCode') !== null)
        {
            DB.ref().child("Voucher/"+ localStorage.getItem('voucherCode')).on("value",snapshot=>{
                console.log("snapshot", snapshot.val().limit)
                limit = snapshot.val().limit
                vouch = snapshot.val().code
            //     var newLimit = parseInt(limit) - 1
            //     console.log("hi there",newLimit)
            // DB.ref().child("Voucher/"+ localStorage.getItem('voucherCode')).update({limit:newLimit})
            })

        }
        var orderField = {
            city            : address.place,
            deliverycharges : 200,
            productid       : productId,
            productquant    : quantityArray,
            totalbill       : parseInt(localStorage.getItem('subTotal')) -parseInt(localStorage.getItem('discount')) + 200,
            userid          : address.fName + " " + address.lName,
            vouchercode     : vouch,
            timestamp       : "",
            address         : address.add
        }
        DB.ref().child("Orders").set(orderField)
        // localStorage.setItem('shoppingCart',[])
        // localStorage.setItem('finalCart',[])
        // localStorage.setItem('subTotal',0)
        // localStorage.setItem('discount',0)
        // localStorage.setItem('voucherCode',"")
        localStorage.setItem('cartEmpty',"T")
        setDis(true)
        swal("Added!", "Your order has been placed with us, the Kahanian team will shortly contact you", "success", {
            buttons: {
              catch: {
                text: "Go to Homepage",
                value: "catch",
              },
              //Continue: true,
            },
          })
          .then((value) => {
            switch (value) {
           
              case "defeat":
                break;
           
              case "catch":
                window.location.href = `/`
                break;
              default:
            }
        });


    }

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
                        
                        {data.map(item=>{
                            if (item.sizesBought !== 0)
                            {
                                return(
                                <Row className = "article-row">
                                    {/* this column contains information about the article */}
                                    <Col xs={9}>
                                        <Row>
                                            <Col xs={6}><Image src={item.image} fluid /></Col>
                                            <Col className= "article-info">
                                                <Card.Text>
                                                    {item.name} <br/>
                                                    Size: {item.sizeItem} <br/>
                                                    Qty: {item.sizesBought}
                                                </Card.Text>   
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* this contains the price of the article */}
                                    <Col className= "article-info">Rs 4550</Col>
                                </Row>

                            )

                            }
                        })}

                        <hr className="line"/>
                        <Row className = "article-row">
                            <Col xs={9}>
                               Subtotal <br/>
                               Shipping <br/>
                               Discount <br/>
                               <p className="order-total">ORDER TOTAL</p>
                            </Col>
                            <Col>
                               Rs {parseInt(localStorage.getItem('subTotal'))} <br/>
                               Rs 200 <br/>
                               Rs {parseInt(localStorage.getItem('discount'))} <br/>
                               <p className="order-total">{-parseInt(localStorage.getItem('discount'))+parseInt(localStorage.getItem('subTotal'))}</p> 
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
                        {address.fName + " " + address.lName} <br/>
                        {address.add} <br/>
                        {address.place}<br/>
                        {address.phone}
                    </Card.Text> 

                    <Card.Title className="shipping-title">Shipping method</Card.Title>
                    <hr className="line"/>
                    <Card.Text>
                       Cash on Delivery
                    </Card.Text> 
                </Col>
            </Row> 

            <Button onClick={()=>{placeOrderOnClick()}} disabled={dis} variant="dark" size="lg" block className = "place-order-button">
                PLACE ORDER
            </Button>   
        </Container>

        //{dis === true && <Row>Order has been placed</Row>}

    )
}

export default PlaceOrderInfo;