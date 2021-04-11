import React from "react";
import b1 from "./Black_1.jpg"; 
import "./UserProfile.css";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function User() {
  return (
    <div>
      <Container fluid>
        <Row className="left">
          <Col  md="4" >
          
          <Row>
          <button type="button" class="btn-dark" > > Account Info</button> 
          </Row>
          <Row>
          <button type="button" class="btn btn-outline-dark" disabled > > Dashboard &nbsp;&nbsp; </button>&nbsp;&nbsp;
          </Row>
        
          </Col>


          <Col md="6" >
            <Card > 
              <Card.Header>
                <Card.Title as="h4">Account Information</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                 
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label className="right">First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label className="right">Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label className="right">Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label className="right">Phone number</label>
                        <Form.Control
                          defaultValue="0300 5678232"
                          placeholder="Number"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label className="right">Email</label>
                        <Form.Control
                          defaultValue="mike@gmail.com"
                          placeholder="Email"
                          type="text" readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group controlId="formBasicPassword">
                        <label className="right">Password</label>
                        <Form.Control
                          defaultValue="donaldDuck_123swdefr"
                          placeholder="Country"
                          type="text" readOnly
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                   
                  </Row>
                 <div><small> &nbsp;</small></div>
                  <Button
                    className="btn btn-dark "
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </div>
  );
}

export default User;
