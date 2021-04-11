import React from "react";
//import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import './EditItems.css';

let pictures = [
    "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
    "https://i.ytimg.com/vi/0FiVTpGLtXc/maxresdefault.jpg",
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://static.toiimg.com/photo/msid-76176914/76176914.jpg"    
];

let name = "Shab-e-Taab";
let price = 6500.0;
let discount = 0;
let description ="A beautiful black shirt, featuring intricate gold embellishments, worn with a grip shalwar, whose drape is sure to turn all heads. This outfit is paired with an elegant chiffon dupatta, finished off delicately with gota.";


let sizes = {"Small":12, "Medium":32, "Large":15};
const keys = Object.keys(sizes);

let productDetail ="Stitched 3-piece Suit\nColor: Black\nFabric: Velvet\n\nShalwar:\nColor: Black\nFabric: Grip";


function EditItems() {
    return (
        <Container>
            <Row>
                <Col md="4">
                    <Row>
                        { pictures.map((pic, index) => (
                            <Col><img src={pic} className="images"></img></Col>
                        )) }
                    </Row>
                </Col>
                <Col className="itemValues" md="4">
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Item Name" value={name}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Price" value={price}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Discount</Form.Label>
                            <Form.Control type="text" placeholder="Discount" value={discount}></Form.Control>                            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={8} className="bigText" placeholder="Description" value={description}></Form.Control>   
                        </Form.Group>
                    </Form>
                </Col>
                <Col className="itemValues" md="4">
                    <Form>
                        <Form.Label>Available Sizes</Form.Label>
                        { keys.map((k,i) => (
                            <Form.Group>
                                <Form.Label className="subFormGroup">{k}</Form.Label>
                                <Form.Control type="number">{sizes.k}</Form.Control>
                            </Form.Group>
                        ))}
                        <Form.Group>
                            <Form.Label>Product Details</Form.Label>
                            <Form.Control as="textarea" rows={8} className="bigText" placeholder="Product Details" value={productDetail}></Form.Control>                              
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditItems;




// RUBBISH

{/* <Form.Label>Small</Form.Label>
<Form.Control type="number"></Form.Control> */}




// <form>
// <label for="name">Name</label>
// <input type="text" id="name" value={name}/>
// <label for="price">Price / Rs.</label>
// <input type="text" id="price" value={price}/>
// <label for="discount">Discount on item / %</label>
// <input type="text" id="discount" value={discount}/>
// <label for="description">Description</label>
// <input type="text" id="description" value={description}/>
// </form>



{/* <Row>
<Col>
    <label for="name" className="labels">Name</label><br/>
    <input type="text" id="name" value={name}/>
</Col>
<Col>
    <label for="price" className="labels">Price / Rs.</label><br/>
    <input type="text" id="price" value={price}/>
</Col>
<Col>
    <label for="discount" className="labels">Discount on item / %</label><br/>
    <input type="text" id="discount" value={discount}/>
</Col>
<Col>
    <label for="description" className="labels">Description</label><br/>
    <input type="text" id="description" value={description} className="largeTextBox"/>
</Col>
</Row> */}

{/* <form>
<label for="details">Product Details</label>
<input type="text" id="details" value={productDetail}/>

</form> */}
