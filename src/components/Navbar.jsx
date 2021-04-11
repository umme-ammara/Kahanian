import React from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import "./nav-bar.css"
import logo from "./KahanianGold.png"
function Navigationbar()
{
return(
    <div >
        <img className = "logo" src={logo} alt = "logo"/>

        {/* this prints out the icon/ current the links lead to nowhere */}
        {/* <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
            <Nav.Link  className = "icons" eventKey="link-1"><i class="fas fa-user-circle fa-2x"></i></Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link  className = "icons" eventKey="link-2"><i class="fas fa-shopping-bag fa-2x"></i></Nav.Link>
            </Nav.Item>
        </Nav> */}

        {/* horizaontal rule */}
        
        <hr className="hr-navBar"/>

    {/* this contains the collection names and the dropdown menu, for now i have hard coded these */}
    <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item >
        <Nav.Link  className = "nav-button" href="/home">DENJ</Nav.Link>
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