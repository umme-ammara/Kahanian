import React, { useEffect, useState } from "react"


//import components
import Navigationbar from './header/Navbar.jsx'
import Clientfooter from './Clientfooter'
import CollectionInfo from './CollectionInfo.jsx'
import Articles from'./Articles.jsx'




import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
// importing the footer at top because it affects the styling of rest of the components
// import Footer from './Footer.jsx'



// importing collection images for some reason we will have to import images here or it wont work
import imageBlue from './images/USM_2787.jpg';
import imageGreen from './images/USM_2875.jpg';
import imageYellow from './images/IMG_0971.jpg';
import imageSkin from './images/USM_2926.jpg';
import infoImage from './images/USM_2799.jpg'

//importing the css file, this file contains flexes to make sure that the cards generated dynamically are aligned in a row and are responsive
import './articles.css'
//import DashBoard from "./Dashboard"
//article card contains, the articles image, name, two piece or three piece, price, and a link to go to that articles page 
// this contains all the aricles that need to be shown on a page
//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

const articleInfo = [
{
  image: imageBlue,
  name:'BLUE',
  piece:'2 piece',
  price: 'Rs. 4550',
  url: ''
},
{
  image: imageGreen,
  name:'GREEN',
  piece:'2 piece',
  price: 'Rs. 4550',
  url: ''
},
{
  image: imageYellow,
  name:'YELLOW',
  piece:'3 piece',
  price: 'Rs. 4950',
  url: ''
},
{
  image: imageSkin,
  name:'SKIN',
  piece:'3 piece',
  price: 'Rs. 4250',
  url: ''
}
]


// collection info front page image, name of collection, info text
// const collectionInfo = {
//     image:infoImage,
//     title:'DENJ',
//     text:'Featuring a regal color palette and sophisticated embroidery on Khadar fabric to keep you warm and ensure that you keep turning heades wherever you go. Explore Denj and shop your favorite picks from our hand curated ensambles'
//   }



function Denj () {
  const [onLoad, setOnLoad] = useState(true)
  const [products,setProducts] = useState([])
  const [collectionInfo, setCollectionInfo] = useState({})
  const [ifCollection,setIfCollection] = useState(true)
  let DB = app.database();

  useEffect(() => {
    //need to fetch the entire products table
    if(onLoad === true){
      let collectionID = localStorage.getItem('collectionID')
        DB.ref('Collection/' + collectionID).on("value", snapshot => {
          let obj = snapshot.val()
          // console.log(obj)
          const tempObject = {
            image:infoImage,
            nameCollection : obj.name,
            descCollection : obj.description
          }
          setCollectionInfo (tempObject)
        })
          DB.ref('Collection/' + collectionID + "/Product").on("value", snapshot => {
            let obj = snapshot.val()
            if (obj != null)
            {
              const tempArray = []
              Object.keys(obj).map(id => {
                // console.log("id", id)
                const tempObject = {
                  identification : id,
                  image : obj[id].imageSource[0],
                  name : obj[id].name,
                  price : obj[id].price,
                  description : obj[id].description
                }
                tempArray.push(tempObject)
                console.log(obj[id])
              })
              setProducts(tempArray)
              console.log("this is my array", tempArray)
            }
            else
            {
              setIfCollection(false)
            }
            //lets just print the entire objects now
          })
    }
    setOnLoad(false)
    
  });
 
  return (
    <div>
    <Navigationbar/>
    {ifCollection === false && <h2 className = "no-collection-text">Collection Currently not available</h2>}
    {ifCollection === true &&
    <div>
    <CollectionInfo
      image = {collectionInfo.image}
      title = {collectionInfo.nameCollection}
      text = {collectionInfo.descCollection}
    />
    {/* make sure the cards are within a div for proper rendering! */}
    <div className="container-cards">
    {products.map((product,index) =>{
      return(
      <Articles
        productid = {product.identification}
        image     = {product.image}
        title     = {product.name}
        piece     = {product.description}
        price     = {product.price}
      />)
    })}
    </div>
    </div>
    }
    <Clientfooter/>
    </div>
  )
}

export default Denj;

// ReactDOM.render(
//     <div>
//     <Navigationbar/>
//     <CollectionInfo
//       image = {collectionInfo.image}
//       title = {collectionInfo.title}
//       text = {collectionInfo.text}
//     />
//     {/* make sure the cards are within a div for proper rendering! */}
//     <div className="container-cards">
//     {articleInfo.map((article) =>{
//       return(
//       <Articles
//         image = {article.image}
//         title = {article.name}
//         piece = {article.piece}
//         price = {article.price}
//         url = {article.url}
//       />)
//     })}
//     </div>
//     <Footer/>
//     </div>,
//     document.getElementById('root')
//   );