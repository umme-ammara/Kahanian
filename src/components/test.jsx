import React, {useState, useEffect, useRef} from "react";
import {Form,Row,Col,Alert} from "react-bootstrap";
// import firebaseDb from "./firebase";

const Populate = (props) => {

    const initialFieldValues = {
        question: '',
        answer: '',
    }

    var [values, setValues] = useState(initialFieldValues) 
    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.faqs[props.currentId]
            })
    }, [props.currentId, props.faqs])

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
            <div className="form-group input-group">
                <div className="input-group-prepend"></div>
                <input className="form-control" name="question" placeholder="Question" 
                    required 
                    value={values.question}
                    onChange={handleInputChange}
                />
            </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend"></div>
                    <input className="form-control" name="answer" placeholder="Answer"
                        required 
                        value={values.answer}
                        onChange={handleInputChange}
                    />
                
                
            </div>
            <div className="form-group">
            <input name="uri" type="hidden" value="arabiantheme"/>
            <input name="loc" type="hidden" value="en_US"/>
            <input class="submitbutton ripplelink" type="submit" value={props.currentId == "" ? "Submit" : "Update"} />
    
            </div>
        </form>


);
}

export default Populate;