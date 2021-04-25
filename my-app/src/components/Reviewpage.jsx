import React, {useState, useEffect, useRef} from "react";
import Navigationbar from './header/Navbar.jsx'; 
import Clientfooter from "./Clientfooter.jsx";
import {Card, Form, Container, Alert} from 'react-bootstrap';
import './Reviewpage.css';
import {app} from "../firebase"; 
import Rating from 'material-ui-rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

var firebase = require('firebase/app');
require('firebase/database'); 

//Reference used to make the star rating: https://material-ui.com/components/rating/ 

function Reviews() {
    let firebaseDb = app.database(); 
    const revRef = useRef(); 
    //const rateRef = useRef(); //Have not figured this out yet 
    var [feedback, setReviewObjects] = useState({}) 
    var [errorMsg, setErrorMsg] = React.useState('');
    const [values, setValues] = React.useState(2);

    //Get Reviews from the Database
    useEffect(() => {
        firebaseDb.ref().child("Review").on("value", snapshot => {
            if (snapshot.val()!=null)
            setReviewObjects({
                ...snapshot.val()
            })
         })
    }, [])

   

    //On Submit Handler 
    const handleSubmit = e => {
        e.preventDefault()
        //console.log(values);
        //Calculate Timestamp
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        //Save the written review in this Field object 
        const Field = {
            reviews: revRef.current.value,
            rating: values,
            timestamp: dateTime
        };
        console.log(Field); 
        //Save the review in the Database 
        firebaseDb.ref().child('Review').push(Field)
        //Give feedback to the user -> Alert will be set 
        setErrorMsg(`Thank you for your feedback!`) 
        //Reload the page after the some seconds -> User can see the feedback and the feedback variable acn be reset
        //setTimeout(function() { window.location=window.location;},750);
    } 

   
    return (
        
    <Container>
        <Navigationbar/> 
        
        <Form  id = "feedback" className = "align-items-center" onSubmit = {handleSubmit}>
        <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating
          name="simple-controlled"
          value={values}
          onChange={(newValue) => {
            console.log(newValue);
            setValues(newValue);
          }}
        />
      </Box>
      </div>
        
        
                    
        {/* Written Review ->*/}
        <div className="input-group">
            <input ref = {revRef} class="form-control" name = "reviews" id = "reviews" placeholder = "Review" required/> 
        </div>
        <br></br>
        <br></br>
        {/*Submit Button*/}
        <div className="input-group">
            <input className="submitbutton ripplelink center" type="submit" />
        </div>
        {/* Display Alert showing that the Review has been submitted*/}
        <div>
            {errorMsg && <Alert variant = "success">{errorMsg}</Alert>}
        </div>
        </Form>
        {/* Display Reviews -> Fetched from DB and dispalyed in cards*/}
        <br></br>
        {/* <div class="col-md-12">
            <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel"></div>
        <div/>  */}

        <h2 className="title-of-page">Customer Reviews</h2>

        <br></br>

        <div className = "row justify-content-md-center">
        {
            Object.keys(feedback).map(id => {
            return (
            <Card style={{ width: '18rem' }}>
            <Card.Header as="h5">{feedback[id].timestamp}</Card.Header>
            <Card.Body>
                <Card.Text>

                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend"></Typography>
                    <Rating name="read-only" value={feedback[id].rating} readOnly />
                 </Box>
                {feedback[id].reviews} 
                </Card.Text>
            </Card.Body>
            </Card>
            )
            })
        }
        {/*Look into Load More Feature at the End -> 
        Right now, all reviews are displayed in a single page so have to scroll down*/}
        </div>
        <br></br>
       <Clientfooter/>
    </Container>    
    );
}



export default Reviews;

