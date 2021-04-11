import React from "react"; 
import {Breadcrumb, Container} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Cards from "./Cards"; 
import "./Bread.css"

//This is the manage collections page through which the admin can edit/delete/add collection 
function Managecollection(){
    return (
        <Container>
            <Header/>
            <Breadcrumb class="breadcrumb">
                <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
                <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
                <Breadcrumb.Item  active>Manage Collections</Breadcrumb.Item>
            </Breadcrumb>
            <Cards/>
            <Footer/>
        </Container>
    ); 
}
export default Managecollection;