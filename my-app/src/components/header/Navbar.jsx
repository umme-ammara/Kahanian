import { React , useState, forwardRef } from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import "./nav-bar.css"
import logo from "./KahanianGold.png"
import { link, useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'
// import { useState } from 'react';

function Navigationbar()
{
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory();
    
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
      
      const loggedIn = () => {
        try{
          if(currentUser.email){
            console.log(currentUser.email)
            console.log("yes user exists")
            return true
          }
          else{
            console.log("no user")
            return false
          }
          console.log("try")
        }
        catch{
          console.log("catch")
          return false;
        }
          
      }

      async function handleLogout() {
        setError("")
        console.log("helo")
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }

return(

    
    <div >
        <img className = "logo" src={logo} alt = "logo"/>

        {/* this prints out the icon/ current the links lead to nowhere */}
        <Nav className="justify-content-end" activeKey="/home">
            {/* this dropdown is for the dropdown to gibe the user option for login signup */}
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" className = "icons">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {loggedIn ? 
                <div>
                <Dropdown.Item href = "/login">Login</Dropdown.Item>
                <Dropdown.Item href = "/signup">Signup</Dropdown.Item>
                {/* <Dropdown.Item onClick = {loggedIn}>Dashboard</Dropdown.Item>
                <Dropdown.Item onClick = {handleLogout}>logout</Dropdown.Item> */}
                </div>
                : 
                <div>
                <Dropdown.Item href = "/login">Login</Dropdown.Item>
                <Dropdown.Item href = "/signup">Signup</Dropdown.Item>
                </div>

                }

                </Dropdown.Menu>
                
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
)
}
export default Navigationbar;