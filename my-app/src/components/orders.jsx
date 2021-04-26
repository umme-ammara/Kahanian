import React, {useState, useEffect, useRef} from "react";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {Container, Breadcrumb} from 'react-bootstrap';
import Header from "./Header";
import Footer from "./Footer";
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database'); 

//Reference used for Data Table: https://github.com/gregnb/mui-datatables 

function Orders(){
    let firebaseDb = app.database(); 
    const userRef = useRef(); 
    const proRef = useRef();
    const vouRef = useRef();
    const proqRef = useRef();
    const delRef = useRef();
    const billRef = useRef();
    const cityRef = useRef();
    //For saving orders fetched from the database 
    var [orders, setOrderObjects] = useState({}) 
    //For Filter Table 
    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const columns = ["Timestamp", "User ID", "Voucher Code", "Product ID", "Product Quantity", "Delivery Charges", "Total Bill", "City"];
    //Set Filter Options for the Order Table
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight
    };
    const data = []

    useEffect(() => {
        firebaseDb.ref().child("Orders").on("value", snapshot => {
            if (snapshot.val()!=null)
            setOrderObjects({
                ...snapshot.val()
            })
         })
    }    
    , [])

    //Populate the data array 
    Object.keys(orders).map(id => {
        data.push([orders[id].timestamp,orders[id].userid,orders[id].vouchercode,
            orders[id].productid,orders[id].productquant,
            orders[id].deliverycharges,orders[id].totalbill,orders[id].city])
    })
    
    //Rough Work to enter values in the database manually 
    // const handleSubmit = e => {
    //     e.preventDefault()
    //     //Calculate Timestamp
    //     var today = new Date();
    //     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     var dateTime = date+' '+time;
    //     //Save the written review in this Field object 
    //     console.log(dateTime)
    //     const fields = {
    //         timestamp: dateTime,
    //         userid: userRef.current.value,
    //         vouchercode: vouRef.current.value,
    //         productid: proRef.current.value,
    //         productquant: proqRef.current.value,
    //         deliverycharges: delRef.current.value,
    //         totalbill: billRef.current.value,
    //         city: cityRef.current.value 
    //     };
    //     console.log(fields); 
    //     firebaseDb.ref().child('Orders').push(fields)
    // } 

    return(
        <Container>
        <Header/>
        <Breadcrumb class="breadcrumb">
            <Breadcrumb.Item  href="/">Homepage</Breadcrumb.Item>  {/*Insert Link to Homepage*/}
            <Breadcrumb.Item  href="/adminpage">Adminpage</Breadcrumb.Item> {/*Insert Link to Adminpage*/}
            <Breadcrumb.Item  active>Manage orders</Breadcrumb.Item>
        </Breadcrumb>
        {/* 
        //Rough work to enter values in the database 
        <form onSubmit = {handleSubmit}>
        <div className="input-group" >
            <input ref = {userRef} class="form-control" name = "UserID" id = "UserID" placeholder = "User ID" required/> 
            <input ref = {vouRef} class="form-control" name = "voucherCode" id = "voucherCode" placeholder = "Voucher Code" required/>  
            <input ref = {proRef} class="form-control" name = "productID" id = "productID" placeholder = "product ID" required/>
        </div>
        <br></br>
        <div className="input-group">
            
            <input ref = {proqRef} class="form-control" name = "productQuantity" id = "productQuantity" placeholder = "Product Quantity" required/> 
            <input ref = {delRef} class="form-control" name = "delieveryCharges" id = "delieveryCharges" placeholder = "Delievery Charges" required/>  
        </div>
        <br></br>
        <div className="input-group">
            <input ref = {billRef} class="form-control" name = "totalbill" id = "totalbill" placeholder = "Total Bill" required/> 
            <input ref = {cityRef} class="form-control" name = "city" id = "city" placeholder = "City" required/>  
        </div>
        <br></br>
        <div className="input-group">
            <input className="submitbutton ripplelink center" type="submit" />
        </div>
        </form>
        <br></br> */}

        <FormControl>
        <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={responsive}
          style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
          onChange={(e) => setResponsive(e.target.value)}
        >
          <MenuItem value={"vertical"}>vertical</MenuItem>
          <MenuItem value={"standard"}>standard</MenuItem>
          <MenuItem value={"simple"}>simple</MenuItem>

          <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
          <MenuItem value={"scrollMaxHeight"}>
            scrollMaxHeight (deprecated)
          </MenuItem>
          <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableBodyHeight}
          style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
          onChange={(e) => setTableBodyHeight(e.target.value)}
        >
          <MenuItem value={""}>[blank]</MenuItem>
          <MenuItem value={"400px"}>400px</MenuItem>
          <MenuItem value={"800px"}>800px</MenuItem>
          <MenuItem value={"100%"}>100%</MenuItem>
        </Select>
      </FormControl>
      <MUIDataTable
        title={"Orders"}
        data = {data} 
        columns={columns}
        options={options}
      /> 
        <Footer/>
        </Container>
    )
}
export default Orders;