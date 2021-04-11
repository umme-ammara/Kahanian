import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container'
import firebaseDb from "./firebase";
import './Viewsubs.css'


function Subs() {
    var [subscribers, setSubObjects] = useState({})

    useEffect(() => {
        firebaseDb.child("Subscribers").on("value", snapshot => {
            if (snapshot.val()!=null)
            setSubObjects({
                ...snapshot.val()
            })
         })
    }, [])

    return ( 
            <Container>
            <table align = "center" className = "table table-borderless table-stripped">
                <thead className = "thead-light">
                    <tr>
                        <th>List of Subscribers</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(subscribers).map(id => {
                            return <tr>
                                <td>{subscribers[id].email}</td>
                            
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </Container>



    )

}

export default Subs;