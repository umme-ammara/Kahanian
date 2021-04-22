import { React , useState, forwardRef, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import "./nav-bar.css"
import logo from "./KahanianGold.png"
import { link, useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'
import {VscFeedback} from "react-icons/vsc"
// import { useState } from 'react';



//importing firebase
import {app} from "../../firebase"
var firebase = require('firebase/app');
require('firebase/database');


function Navigationbar()
{
  const [collections, setCollections] = useState([])
  const [error, setError] = useState("")
  const [load, setLoad] = useState(true)
  const { currentUser, logout } = useAuth()
  const history = useHistory();
  let DB = app.database();
    
    const CustomToggle = forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={e => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {/* Render custom icon here */}
             <Nav.Item>
                 <Nav.Link  className = "icons" eventKey="link-1"><i class="fas fa-user-circle fa-2x"></i></Nav.Link>
            </Nav.Item>
          {children}
        </a>
      ));
      

      async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }

      useEffect(() => {
        if(load === true){
          DB.ref("Collection").on("value",snapshot => {
            let obj = snapshot.val()
            // console.log(obj)
            Object.keys(obj).map(id => {
              // console.log(obj[id].name)
              setCollections([...collections,obj[id].name])
              console.log(collections)
              //console.log(collections)
            })
        })
        setLoad(false)
      }
      //console.log(collections)
    });


  try{
    if(currentUser.email){
      return( 
        <div >
            <img className = "logo" src={logo} alt = "logo"/>
    
            {/* this prints out the icon/ current the links lead to nowhere */}
            <Nav className="justify-content-end" activeKey="/home">
                {/* this dropdown is for the dropdown to gibe the user option for login signup */}
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" className = "icons">
                    </Dropdown.Toggle>
    
                    {<Dropdown.Menu>
                        <div>
                          <Dropdown.Item href = "/userprofile">Dashboard</Dropdown.Item>
                          <Dropdown.Item onClick = {handleLogout}>logout</Dropdown.Item>
                        </div>  
                        {/* <div>
                          <Dropdown.Item href = "/login">Login</Dropdown.Item>
                          <Dropdown.Item href = "/signup">Signup</Dropdown.Item>
                        </div> */}
                    </Dropdown.Menu>}
                    
                </Dropdown>
                {/* shopping cart icon */}
                <Nav.Item>
                <Nav.Link  className = "icons" eventKey="link-2"><i class="fas fa-shopping-bag fa-2x"></i></Nav.Link>
                </Nav.Item>
            </Nav>
    
            {/* horizaontal rule */}
    
            <hr className="hr-navBar"/>
    
        {/* this contains the collection names and the dropdown menu, for now i have hard coded these */}
        <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item >
            <Nav.Link  className = "nav-button" href="/denj">DENJ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link  className = "nav-button" eventKey="link-1">MAHTAAB</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link className = "nav-button" eventKey="link-2">CORSAGE</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link className = "nav-button" eventKey="link-2">SATRANGI</Nav.Link>
            </Nav.Item>
    
            <NavDropdown title="OUR COLLECTIONS" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">DENJ</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.2">MAHTAAB</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.3">CORSAGE</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4">SATRANGI</NavDropdown.Item>
          </NavDropdown>  
          </Nav>
        </div>
      );
      }
  }
  catch{
    return( 
      <div >
          <img className = "logo" src={logo} alt = "logo"/>
  
          {/* this prints out the icon/ current the links lead to nowhere */}
          <Nav className="justify-content-end" activeKey="/home">
              {/* this dropdown is for the dropdown to gibe the user option for login signup */}
              <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" className = "icons">
                  </Dropdown.Toggle>
  
                  {<Dropdown.Menu>
                      {/* <div>
                        <Dropdown.Item href = "/dashboard">Dashboard</Dropdown.Item>
                        <Dropdown.Item onClick = {handleLogout}>logout</Dropdown.Item>
                      </div>   */}
                      <div>
                        <Dropdown.Item href = "/login">Login</Dropdown.Item>
                        <Dropdown.Item href = "/signup">Signup</Dropdown.Item>
                      </div>
                  </Dropdown.Menu>}
                  
              </Dropdown>
              {/* shopping cart icon */}
              <Nav.Item>
              <Nav.Link  className = "icons" eventKey="link-2"><i class="fas fa-shopping-bag fa-2x"></i></Nav.Link>
              </Nav.Item>
          </Nav>
  
          {/* horizaontal rule */}
  
          <hr className="hr-navBar"/>
  
      {/* this contains the collection names and the dropdown menu, for now i have hard coded these */}
      <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item >
          <Nav.Link  className = "nav-button" href="/denj">DENJ</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link  className = "nav-button" eventKey="link-1">MAHTAAB</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link className = "nav-button" eventKey="link-2">CORSAGE</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link className = "nav-button" eventKey="link-2">SATRANGI</Nav.Link>
          </Nav.Item>
  
          <NavDropdown title="OUR COLLECTIONS" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">DENJ</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.2">MAHTAAB</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.3">CORSAGE</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">SATRANGI</NavDropdown.Item>
        </NavDropdown>  
            {/*Review Star Icon*/}
            <Nav.Item>
             <Nav.Link  className = "icons" href = "/reviews"><i class="fas fa-star fa-2x"></i></Nav.Link> 
            </Nav.Item>
        </Nav>
      </div>
    );
  }
}



export default Navigationbar;