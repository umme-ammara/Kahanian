import React from "react";
import Nav from 'react-bootstrap/Nav';
import "./header.css";
import logo from "./KahanianGold.png";
function Header() 
{
return(
    <div >
        <img className = "logo" src={logo} alt = "logo"/>

        {/* this prints out the icon/ current the links lead to nowhere */}
        <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
                <Nav.Link  className = "icons" eventKey="link-1"><i class="fas fa-user-circle fa-2x"></i></Nav.Link>
            </Nav.Item>
        </Nav>

        {/* horizaontal rule */}

        <hr className="hr-navBar"/>

    </div>
)
}
export default Header;