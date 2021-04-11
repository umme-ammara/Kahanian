import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Breadcrumb, Container, Row, Col,Button} from "react-bootstrap";


import {Link, useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // IMPORTING THIS TO SOLVE THE ISSUE WITH BUTTONS 
import './adminpage.css';
import "./Bread.css";

//THIS IS THE MAIN ADMIN PAGE -> AFTER LOGIN, THIS IS THE PAGE WHICH THE ADMIN WILL SEE 
function Adminpage() {
  return (
    <Container>
       <Header/>
       <Breadcrumb class="breadcrumb">
          <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
          <Breadcrumb.Item  active>Adminpage</Breadcrumb.Item>
      </Breadcrumb>
      <br></br>
      <Container>
      <Row JustifyContentAround AlignItemsCenter className="customRow">
        <Col md="6">
          <Col md="12">
            <Button href="/manageorders" size="lg" variant="outline-dark" className="customButton" block>
              MANAGE ORDERS
            </Button>
          </Col>
          <Col md="12">
            <Button href="/managecollections" size="lg" variant="outline-dark" className="customButton" block> 
              MANAGE COLLECTIONS
            </Button>
          </Col>
          <Col md="12">
            <Button href="/updateinformation" size="lg" variant="outline-dark" className="customButton" block>
              UPDATE INFORMATION
            </Button>
          </Col>
        </Col>

        <Col md="6">
          <Col md="12">
            <Button href="/vouchercodes" size="lg" variant="outline-dark" className="customButton" block>
              VOUCHER CODES
            </Button>
          </Col>
          <Col md="12">
            <Button href="/viewqueries" size="lg" variant="outline-dark" className="customButton" block>
              VIEW QUERIES
            </Button>
          </Col>
          <Col md="12">
            <Button href="/managereviews" size="lg" variant="outline-dark" className="customButton" block>
              MANAGE REVIEWS
            </Button>
          </Col>
          
        </Col>
        <Col md="12">
            <Button href="/viewsubs" size="lg" variant="outline-dark" className="customButton" block>
              VIEW SUBSCRIBERS
            </Button>
          </Col>
      </Row>
      
    </Container>

        <Footer/>
    </Container>
    
  );
}
export default Adminpage;