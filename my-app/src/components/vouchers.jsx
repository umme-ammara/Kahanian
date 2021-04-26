import React, {useState, useEffect, useRef} from "react";
import {Container, Breadcrumb} from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import Header from "./Header";
import Footer from "./Footer";
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database'); 

function Voucher() {
    let firebaseDb = app.database(); 
    const codeRef = useRef();
    const limitRef = useRef();
    const dateRef = useRef();
    const disRef = useRef();
    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

    var [codes, setCodeObjects] = useState({}) 
    const cols = ["Voucher Code", "Limit", "Expiry Date", "Discount", "Status"]; 
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight
    };
    const data = []
    useEffect(() => {
        firebaseDb.ref().child("Voucher").on("value", snapshot => {
            if (snapshot.val()!=null)
            setCodeObjects({
                ...snapshot.val()
            })
         })
    }    
    , [])
    //Populate the data array 
    Object.keys(codes).map(id => {
        var get_limit = codes[id].limit
        var get_date = codes[id].date
        var status = ""
        var store_date = new Date(get_date)
        var today = new Date();
        //console.log(store_date, today)
        //console.log(today > store_date)

        if (get_limit === 0 || today > store_date) {
            status = "Expired";
        } else {
            status = "Available";
        }

        data.push([codes[id].code, codes[id].limit, codes[id].date, codes[id].discount, status])
        //console.log(data)
    })


    const handleSubmit = e => {
            e.preventDefault()
            const fields = {
                code: codeRef.current.value,
                limit: limitRef.current.value,
                date: dateRef.current.value,
                discount: disRef.current.value
            };
            console.log(fields); 
            firebaseDb.ref().child('Voucher').push(fields)
        } 

    return (
        <Container>
        <Header/>
        <Breadcrumb class="breadcrumb">
            <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
            <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
            <Breadcrumb.Item  active>Voucher Codes</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className="title-of-page">Enter Voucher Code</h2>
        <form onSubmit = {handleSubmit}>
        <div className="input-group" >
            <input ref = {codeRef} class="form-control" name = "VoucherCode" id = "VoucherCode" placeholder = "Voucher Code" required/> 
            <input ref = {limitRef} class="form-control" name = "limit" id = "limit" type = "number" placeholder = "Limit" required/>  
        </div> 
        <div className="input-group" >
            <input ref = {dateRef} class="form-control" name = "Expirydate" id = "Expirydate" type = "date" placeholder = "Expiry Date" required/> 
            <input ref = {disRef} class="form-control" name = "Discount" id = "Disocunt" type = "number" placeholder = "Discount" required/>  
        </div>
        <br></br>
        <div className="input-group">
            <input className="submitbutton ripplelink center" type="submit" />
        </div>
        </form>
        <br></br>
        {/* <h2 className="title-of-page">Voucher Code History</h2> */}
        <MUIDataTable
        title={"Voucher Code History"}
        data = {data} 
        columns={cols}
        options={options}/> 
        <Footer/>
        </Container>

    );
}

export default Voucher;
