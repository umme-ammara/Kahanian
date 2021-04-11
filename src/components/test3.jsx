import React, {useState, useEffect} from "react";
import {Form,Row,Col,Alert} from "react-bootstrap";
// import firebaseDb from "./firebase";

import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

const Populateabout = (props) => {
    const initialFieldValues = {
        description: '', 
    }
    let firebaseDb = app.database();
    var [values, setValues] = useState(initialFieldValues); 

    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.aboutt[props.currentId]
            })
    }, [props.currentId, props.aboutt])

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values);
    }

return (
    <form autoComplete="off" onSubmit={handleSubmit}>
            
                <div className="input-group-prepend"></div>
                <input className="form-control" value={values.description} name="description" placeholder="Description" 
                    //required 
                    onChange={handleInputChange} 
                />
            
            <div className="form-group"> 
            <input name="uri" type="hidden" value="arabiantheme"/>
            <input name="loc" type="hidden" value="en_US"/>
            <input class="submitbutton ripplelink" type="submit" value={props.currentId == "" ? "Submit" : "Update"} />
    
            </div>
        </form>


);
}

export default Populateabout;