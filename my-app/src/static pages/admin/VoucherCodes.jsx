import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import Dropdown from "react-bootstrap/Dropdown"
import "./VoucherCodes.css"

let data = [
    ["NEW10", "NA", "31/12/2021", "Available"],
    ["akn12m", "1", "04/06/2021", "Expired"],
    ["WER12", "10", "30/06/2021", "Available"],
    ["DIS10", "NA", "01/09/2021", "Used"]
]


function VoucherCodes() {
    return (
        <Container>
        <Row>
        <Col md="3">
            <Row>
                <Col md="12" className="itemValues">
                <Form>
                    <Form.Label className="itemValues">Randomly Generate Codes</Form.Label>
                    <Form.Group>
                        <Form.Label className="itemValues subFormGroup">No. of codes</Form.Label>
                        <Form.Control type="number"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="itemValues subFormGroup">Limit on users</Form.Label>
                        <Form.Control type="number"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="itemValues subFormGroup">Expiry Date</Form.Label>
                        <Form.Control type="date"></Form.Control>
                    </Form.Group>
                </Form>
                <Button as="input" type="button" variant="outline-dark" value="Generate Codes" className="customButton" block></Button>
                </Col>

                <Col md="12">
                <Form className="padder">
                    <Form.Group>
                        <Form.Label className="itemValues">Filter Codes</Form.Label>
                        <Dropdown>
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" block>
                            Status
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Available</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Used</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Expired</Dropdown.Item>
                        </Dropdown.Menu>                            
                        </Dropdown>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
        </Col>
        <Col md="9">
            <Table size="sm" bordered hover className="customTable">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Voucher Code</th>
                    <th>Limit</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                { data.map((row, i) => (
                    <tr>
                        <td>{i+1}</td>
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



function redundant() {
    return (
        <Container>
            <Row>
            <Col md="3">
                <Row>
                <Col md="12">
                    <Form>
                    <Form.Label></Form.Label>
                    <Form.Group>
                        <Form.Label>No. of codes</Form.Label>
                        <Form.Control type="number"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Limit on users</Form.Label>
                        <Form.Control type="number"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="date"></Form.Control>
                    </Form.Group>
                    </Form>
                </Col>
                <Col md="12">
                </Col>
                </Row>
            </Col>
            </Row>
            <Row>
            <Col md="9">
                <Table size="sm" bordered hover className="customTable">   
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Voucher Code</th>
                        <th>Limit</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    { data.map((row, i) => (
                        <tr>
                            <td>{i+1}</td>
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


export default VoucherCodes;