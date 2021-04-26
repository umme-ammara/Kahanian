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
  const [collectionsID, setCollectionsID] = useState([])
  const [error, setError] = useState("")
  const [load, setLoad] = useState(true)
  const { currentUser, logout } = useAuth()
  const history = useHistory();
  let DB = app.database();

    // if (localStorage.getItem('cartEmpty') === "T")
    // {
    //     localStorage.removeItem('shoppingCart')
    //     localStorage.removeItem('finalCart')
    //     localStorage.removeItem('subTotal')
    //     localStorage.setItem('discount',0)
    //     localStorage.removeItem('voucherCode')
    //     localStorage.removeItem('cartEmpty')
    // }
    function sendIdentification(index)
    {
        localStorage.setItem('collectionID', collectionsID[index].toString())
    }
    // this is to just print out the collection names in the navbar, since the collection name remains the same in try and catch, it just made
    // sense to make another func
    function printCollectionName()
    {
      return(
      <Nav className="justify-content-center" activeKey="/home">
        {/* this map is only printing out the latest four collections */}
          {
            collections.map((collectionName,index) => {
              if(index < 4)
              {
                  return(
                  <Nav.Item>
                  <Nav.Link onClick = {()=>{sendIdentification(index)}} className = "nav-button" href="/denj" >{collectionName}</Nav.Link>
                  </Nav.Item>
                )
              }
            })
          }
    
            <NavDropdown title="OUR COLLECTIONS" id="nav-dropdown">
            {
              collections.map((collectionName,index) => {
                return(
                  <div>
                  <NavDropdown.Item onClick = {()=>{sendIdentification(index)}} href="/denj">{collectionName}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  </div>
                )
              })
            }
          </NavDropdown>  
      </Nav>
      )

    }
    
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
            const tempArray = []
            const tempIDArray = []
            // console.log(obj)
            Object.keys(obj).map(id => {
              tempArray.push(obj[id].name)
              tempIDArray.push(id)
              // console.log(obj[id].name)
              // setCollections([...collections,obj[id].name])
              // console.log(collections)
              //console.log(collections)
            })
            setCollections(tempArray.reverse())
            setCollectionsID(tempIDArray.reverse())
        })
        setLoad(false)
      }
      //console.log(collections)
    });


  try{
    if(currentUser.email){
      return( 
        <div >
            <a href = "/">
            <img className = "logo" src={logo} alt = "logo"/>
            </a>
    
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
                <Nav.Link  className = "icons" href="/cart"><i class="fas fa-shopping-bag fa-2x"></i></Nav.Link>
                </Nav.Item>
                  {/*Review Star Icon*/}
                <Nav.Item>
                <Nav.Link  className = "icons" href = "/reviews"><i class="fas fa-star fa-2x"></i></Nav.Link> 
                </Nav.Item>
            </Nav>
    
            {/* horizaontal rule */}
    
            <hr className="hr-navBar"/>
    
        {/* this functions prints out the collection names in the navbar*/}
        {printCollectionName()}
        </div>
      );
      }
  }
  catch{
    return( 
      <div >
          <a href = "/">
          <img className = "logo" src={logo} alt = "logo"/>
          </a>
  
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
              <Nav.Link  className = "icons" href="/cart"><i class="fas fa-shopping-bag fa-2x"></i></Nav.Link>
              </Nav.Item>
               {/*Review Star Icon*/}
            <Nav.Item>
             <Nav.Link  className = "icons" href = "/reviews"><i class="fas fa-star fa-2x"></i></Nav.Link> 
            </Nav.Item>
          </Nav>
  
          {/* horizaontal rule */}
  
          <hr className="hr-navBar"/>
  
      {/* this functions prints out the collection names in the navbar*/}
      {printCollectionName()}
      </div>
    );
  }
}



export default Navigationbar;
