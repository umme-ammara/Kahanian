import { React , useState, forwardRef, useEffect } from "react";import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import "./header.css";
import logo from "./KahanianGold.png";
import { link, useHistory } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

function Header() 
{   const [error, setError] = useState("")
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

      async function handleLogout() {
        setError("")
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
        <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" className = "icons">
                    </Dropdown.Toggle>
    
                    {<Dropdown.Menu>
                        <div>
                          
                          <Dropdown.Item onClick = {handleLogout}>logout</Dropdown.Item>
                        </div>  
                        {/* <div>
                          <Dropdown.Item href = "/login">Login</Dropdown.Item>
                          <Dropdown.Item href = "/signup">Signup</Dropdown.Item>
                        </div> */}
                    </Dropdown.Menu>}
                    
                </Dropdown>
            {/* <Nav.Item>
                <Nav.Link  className = "icons" eventKey="link-1"><i class="fas fa-user-circle fa-2x"></i></Nav.Link>
            </Nav.Item> */}
            
        </Nav>

        {/* horizaontal rule */}
        <hr className="hr-navBar"/>

      

    </div>
)
}
export default Header;