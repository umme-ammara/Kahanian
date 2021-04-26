import React , { useRef, useState }from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import './summaryCart.css'
import { DropdownButton } from 'react-bootstrap';

import {app} from "../../firebase"
var firebase = require('firebase/app');
require('firebase/database');
function SummaryCart(props)
{
    const voucherRef = useRef()
    let DB = app.database();
    const [discount, setDiscount] = useState(0)
    const [loading, setLoading] = useState(false)
    function onClickVoucher()
    {
        setLoading(true)
        try{
            //console.log(voucherRef.current.value)
            DB.ref().child("Voucher").on("value", snapshot=>{
                let obj = snapshot.val()
                Object.keys(obj).map(id=>{
                    if (voucherRef.current.value === obj[id].code)
                    { 
                        let expired = false
                        let date = obj[id].date
                        // expiry date
                        date = date.split('-')
                        //console.log("date", date)
                        let currDate = new Date()
                        //console.log(currDate)
                        //current
                        let datecurr = currDate.getDate()
                        let month = currDate.getMonth() + 1
                        let year = currDate.getFullYear()
                        // console.log("current date",datecurr)
                        // console.log("current month",month)
                        // console.log("current year",year)

                        if (year < parseInt(date[0]))
                        {
                            expired = true
                        }
                        else if (year === parseInt(date[0]))
                        {
                            if (month < parseInt(date[1]))
                            {
                                expired = true
                            }
                            else if (month === parseInt(date[1]))
                            {
                                if (datecurr <= parseInt(date[2]))
                                {
                                    expired = true
                                }
                            }
                        }

                        if (parseInt(obj[id].limit) > 0 && expired)
                        {
                            //WE NEED TO UPDATE THE LIMIT
                            let newlimit = parseInt (obj[id].limit) - 1
                            //console.log("new limit", newlimit)
                            setDiscount(obj[id].discount)
                            localStorage.setItem('voucherCode',id)
                            localStorage.setItem('discount', obj[id].discount)
                            console.log("this is voucher code",localStorage.getItem('voucherCode'))
                            console.log("this is discoount code",localStorage.getItem('discount'))
                            setLoading(false)
                        }

                    }
                })

            })
        }
        catch
        {
            console.log("hi there")
        }
    }
    const itemsPrice = props.array.reduce((a,c) => a + c.price * c.sizesBought, 0)
    localStorage.setItem('subTotal',itemsPrice.toString())
    //localStorage.setItem('discount', 0)
    //localStorage.removeItem('voucherCode')
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
                        <Col>Rs {itemsPrice}</Col>
                    </Row>
                    <Row>
                        <Col>Discount</Col>
                        <Col>Rs {discount}</Col>
                    </Row>
                    <Row>
                        <Col>Order Total</Col>
                        <Col>Rs {itemsPrice-discount}</Col>
                    </Row>
                    <a href = "/checkout">
                    <Button  variant="dark" className="checkout-button">CHECKOUT</Button>
                    </a>
            </Card.Text>
        </Card.Body>
    </Card>
    {/* this is the apply coupon button */}
        {discount !== 0 && <p className = "discount">Discount Applied</p>}
        <InputGroup className="mb-3" style={{ width: '23rem' }} className="coupon-button">
            <FormControl
            placeholder="Enter voucher code"
            ref = {voucherRef}
            />
            <InputGroup.Append>
            <Button variant="dark" disabled={loading}  onClick={()=>{onClickVoucher()}}>APPLY DISCOUNT</Button>
            </InputGroup.Append>
        </InputGroup>
    </div>
    )
}

export default SummaryCart;