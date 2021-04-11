import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './AdminPage.css';

// LINKS TO BE UPDATED IN THE BUTTONS
// Adjust col widths
// Adjust look of buttons

function AdminPage() {
  return (
    <Container>
      <Row JustifyContentAround AlignItemsCenter className="customRow">
        <Col md="5">
          <Col md="12">
            <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
              MANAGE ORDERS
            </Button>
          </Col>
          <Col md="12">
            <Button href="#" size="lg" variant="outline-dark" className="customButton" block> 
              MANAGE COLLECTIONS
            </Button>
          </Col>
          <Col md="12">
            <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
              UPDATE INFORMATION
            </Button>
          </Col>
        </Col>

        <Col md="5">
          <Col md="12">
            <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
              VOUCHER CODES
            </Button>
          </Col>
          <Col md="12">
            <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
              VIEW QUERIES
            </Button>
          </Col>
          <Col md="12">
            <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
              MANAGE REVIEWS
            </Button>
          </Col>
          <Col md="12">
            <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
              VIEW SUBSCRIBERS
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;