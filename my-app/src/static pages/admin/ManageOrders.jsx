import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import './ManageOrders.css';

let data = [[1,"Black","2-pc","Small","Lahore","03001234567","5460","Packed"],[2,"Blue","1-pc","Small","Peshawar","03011234567","8400","Received"],[3,"Blue","3-pc","Large","Pindi","03311234567","3400","Dispatched"]]




function ManageOrders() {
    return (
        <Container>
        <Row>
        <Col md="3">
            <Row>
                <Col md="12" className="itemValues">
                    <Form>
                        <Form.Label>Apply Filter</Form.Label>
                        <Form.Group>
                            <Form.Label className="subFormGroup">City:</Form.Label>
                            <Form.Control as="select">
                            <option>Lahore</option>
                            <option>Pindi</option>
                            <option>Peshawar</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="subFormGroup">Article:</Form.Label>
                            <Form.Control as="select">
                            <option>Black</option>
                            <option>Blue</option>
                            <option>Green</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md="12">
                    <Button as="input" type="button" variant="outline-dark" value="Export All Orders" className="customButton" block/>
                    <Button as="input" type="button" variant="outline-dark" value="Export Filtered Orders" className="customButton" block/>
                </Col>
            </Row>
        </Col>
        <Col md="9">
            <Table size="sm" bordered hover className="customTable">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Article</th>
                    <th>Pcs</th>
                    <th>Size</th>
                    <th>City</th>
                    <th>Contact No.</th>
                    <th>Bill</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                { data.map((row, i) => (
                    <tr>
                        { row.map((value, j) => (
                            <td>{data[i][j]}</td>
                        ))}
                    </tr>
                ))}                    
                </tbody>
            </Table>
        </Col>
        </Row>
        </Container>
    )
}


export default ManageOrders;