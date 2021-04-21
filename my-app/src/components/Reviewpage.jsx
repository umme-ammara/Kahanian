import React, {useState, useEffect, useRef} from "react";
import Navigationbar from './header/Navbar.jsx'; 
import Clientfooter from "./Clientfooter.jsx";
import {Card, CardGroup, Container, Alert} from 'react-bootstrap';
import './Reviewpage.css';
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database'); 

//Reference used to make the star rating: https://codepen.io/jamesbarnett/pen/vlpkh

function Reviews() {
    let firebaseDb = app.database(); 
    const revRef = useRef(); 
    const rateRef = useRef(); //Have not figured this out yet 
    var [feedback, setReviewObjects] = useState({}) 
    var [errorMsg, setErrorMsg] = React.useState('');

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
        //Calculate Timestamp
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        //Save the written review in this Field object 
        const Field = {
            reviews: revRef.current.value,
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
        
        <form  id = "feedback" className = "align-items-center" onSubmit = {handleSubmit}>
        {/* Star Rating -> Optional (Form will submit even if you don't want to rate) */}
        <div className = "rate">
            <input type="radio" id="star5" name="rate" value="5"/>
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4"/>
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3"/>
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2"/>
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1"/>
            <label for="star1" title="text">1 star</label>
        </div>
        {/* Written Review -> This is required (Not allowed to submit an empty review) */}
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
        </form>
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

