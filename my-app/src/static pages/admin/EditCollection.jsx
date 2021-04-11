import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./EditCollection.css";
import { Form } from "react-bootstrap";

let colName = "Corsage"

function EditCollection() {
    return (
        <Container>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Collection Name</Form.Label>
                        <Form.Control type="text" value={colName}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount on Collection / %</Form.Label>
                        <Form.Control type="number" min="0" max="100"></Form.Control>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Col className="itemValues">ITEMS IN COLLECTION</Col>
                <Col>
                {
                // REUSE CARDS.jsx HERE
                }
                </Col>
            </Row>
        </Container>
    )
}

export default EditCollection;