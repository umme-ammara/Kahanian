import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import Footer from "./Footer";
import "./adminpage.css";
//import './Updateinformation.css';

function Updateinfo() {
    return (
    <Container>
    <Header/>
    <Breadcrumb class="breadcrumb">
        <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
         <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
        <Breadcrumb.Item  active>Update Information</Breadcrumb.Item>
    </Breadcrumb>
        <Container fluid>
        <Row>

                <Col md="6">
                    <Button href="/updateabout" size="lg" variant="outline-dark" className="customButton" block>
                    ABOUT US
                    </Button>
                </Col>
                {/* <Col md="6"> --> NOT DOING CONTACT US -> REPLACED WITH ABOUT US 
                    <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
                    GET IN TOUCH
                    </Button>
                </Col> */}
                <Col md="6">
                    <Button href="/updateexchange" size="lg" variant="outline-dark" className="customButton" block>
                    EXCHANGE POLICY
                    </Button>
                </Col>
                <Col md>
                    <Button href="/updatefaqs" size="lg" variant="outline-dark" className="customButton" block>
                    FAQS
                    </Button>
                </Col>
                </Row>
            
        </Container>
        <Footer/>
        </Container> 
    );
}

export default Updateinfo;