import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './EditItems.css';

function UpdateInformation() {
    return (
        <Container>
            <Row>
                <Col md="6">
                    <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
                    ABOUT US
                    </Button>
                </Col>
                <Col md="6">
                    <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
                    GET IN TOUCH
                    </Button>
                </Col>
                <Col md="6">
                    <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
                    EXCHANGE POLICY
                    </Button>
                </Col>
                <Col md="6">
                    <Button href="#" size="lg" variant="outline-dark" className="customButton" block>
                    FAQS
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateInformation;