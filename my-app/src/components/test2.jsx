import React, {useState, useEffect, useRef} from "react";
import {Form,Row,Col,Alert} from "react-bootstrap";
// import firebaseDb from "./firebase";

const Populateexc = (props) => {

    const initialFieldValues = {
        policy: '',
    }

    var [values, setValues] = useState(initialFieldValues) 
    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.exchange[props.currentId]
            })
    }, [props.currentId, props.exchange])

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
                <input className="form-control" value={values.policy} name="policy" placeholder="Policy" 
                    //required 
                    //value = ''
                    value={values.policy}
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

export default Populateexc;