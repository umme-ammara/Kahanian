import React, { useEffect, useState } from "react";
import Navigationbar from './header/Navbar.jsx'
import swal from 'sweetalert';
// import Footer from './Footer'
import Clientfooter from './Clientfooter'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import ToggleButton from 'react-bootstrap/ToggleButton'
import product from "./Product.css"
import Articles from "./Articles.jsx"
import ProductCarousel from "./ProductCarousel.jsx"
//import Carousel from "./carousel/CarouselDisplay.jsx" 
//importing firebase
import {app} from "../firebase"
var firebase = require('firebase/app');
require('firebase/database');

function Product(){


    let DB = app.database();
    const [onLoad, setOnLoad] = useState(true)
    const productId = localStorage.getItem('productID')
    const collectionID = localStorage.getItem('collectionID')
    const [productInfo, setProductInfo] = useState({})
    const [products,setProducts] = useState([])
    const [count,setCount] = React.useState(1)
    const [size,setSize] = useState("")
    const [sizePieces,setSizePieces] = useState(1)
    function addToCart(sizeType)
    {
        if (sizeType === "S")
        {
            setSize("S")
        }
        else if (sizeType === "M" )
        {
            setSize("M")
        }
        else if (sizeType === "L" )
        {
            setSize("L")
        }
    }

    function decrementCount()
    {
        if (count != 1)
        {
            setCount(count-1);    
        }
    }
    function incrementCount(small,medium,large)
    {
        var stock = 0
        if (size==="S")
        {
            stock = small
            console.log("this is stock1", stock)
        }
        else if (size==="M")
        {
            stock = medium
            console.log("this is stock2", stock)
        }
        else if (size==="L")
        {
            stock = large
            console.log("this is stock3", stock)
        }
        if (count < stock)
        {
            setCount(count+1);    
        }
    }
    function sendToCartHelper()
    {
        //localStorage.removeItem('shoppingCart')
        const cart= localStorage.getItem('shoppingCart')

        if (cart == null)
        {
            console.log("nothing in the cart")
            var tempcart = {
                collection    : collectionID,
                product       : productId,
                numberOfItems : count,
                sizeItem      : size
            }
            localStorage.setItem('shoppingCart',JSON.stringify([tempcart]))
        }
        else{
            let data = localStorage.getItem('shoppingCart')
            data = JSON.parse(data)
            const exist = data.find(x=>  x.product === productId);
            if (exist)
            {
                var len = data.length
                var newItem = true
                //console.log("this item exists",exist)
                for (var i = 0; i < len; i++)
                {
                    console.log("whi is it coming========",i, data[i], data.length,size,productId)

                    if (productId === data[i].product && size === data[i].sizeItem)
                    {
                        console.log("whi is it coming", data[i], exist)
                        data[i].numberOfItems = exist.numberOfItems+1
                        newItem = false
                        break
                    }
                    
                }
                if (newItem = true)
                {

                        console.log("this is that data", data)
                        var tempcart = {
                            collection    : collectionID,
                            product       : productId,
                            numberOfItems : count,
                            sizeItem      : size
                        
                        }
                        data.push(tempcart)
                    localStorage.setItem('shoppingCart',JSON.stringify(data))
                }
                console.log("this item exists",data)
            }
            else
            {

                //console.log("this is that data", data)
                var tempcart = {
                    collection    : collectionID,
                    product       : productId,
                    numberOfItems : count,
                    sizeItem      : size
                }
                data.push(tempcart)

            }
            localStorage.setItem('shoppingCart',JSON.stringify(data))
        }
    }
    function sendToCart()
    {
        if (size === "S" || size === "M" || size === "L")
        {
            sendToCartHelper()
            swal("Added!", "The item has been added to your shopping cart!", "success", {
                buttons: {
                  catch: {
                    text: "Go to cart",
                    value: "catch",
                  },
                  Continue: true,
                },
              })
              .then((value) => {
                switch (value) {
               
                  case "defeat":
                    break;
               
                  case "catch":
                    window.location.href = `/cart`
                    break;
                  default:
                }
              });
              setSize("")
        }
        else
        {
            swal("You have not added any items to your cart");
        }
        
    }

    useEffect(() => {
        if(onLoad === true){
            // 
            DB.ref('Collection/' + collectionID + "/Product").on("value", snapshot => {
                let obj = snapshot.val()
                const tempArray = []
                Object.keys(obj).map(id => {
                  // console.log("id", id)
                  if (productId != id)
                  {
                    const tempObject = {
                        identification : id,
                        image : obj[id].imageSource,
                        name : obj[id].name,
                        price : obj[id].price,
                        description : obj[id].description
                      }
                      tempArray.push(tempObject)
                  }
 
                })
                setProducts(tempArray)
              })
            // reading the specific collection
            DB.ref("Collection/" + collectionID + "/Product/" + productId).on("value", snapshot => {
                console.log(snapshot.val())
                let obj = snapshot.val()
                var totalStock = 0
                for (var i = 0; i < obj.size.length; i++)
                {
                    totalStock = totalStock + obj.size[i]
                }
                const tempobj = {
                    name       : obj.name,
                    details    : obj.details,
                    price      : obj.price,
                    sizeSmall  : obj.size[0],
                    sizeMedium : obj.size[1],
                    sizeLarge  : obj.size[2],
                    image      : obj.imageSource,
                    pieces     : obj.description,
                    stock      : totalStock
                }
                console.log("tempobj", tempobj)
                setProductInfo(tempobj)
            })
        }
        setOnLoad(false)
    })

    return (
<div>

<Navigationbar/>
<body>
<div class="container">
	<div class="col main-section">
		<div class="row hedding m-0 pl-3 pt-0 ">
			
		</div>
		<div class="row m-0">
			<div class="col-lg-5  ">
            {/* ======================================================== */}
            {productInfo.image != null && <ProductCarousel
                array = {productInfo.image}
            />}

             {/* ======================================================== */}
			</div>
			<div class="col-lg-7">
				<div class="right-side-pro-detail  m-0">
					<div class="row">
						<div class="col">
							<p>{productInfo.name}</p>
						</div>
						<div class="col-lg-12">
							<p class="m-0 p-0 price-pro"> Rs {productInfo.price}</p>
                            {/* conditional rendering */}
                            {productInfo.stock === 0 ? <p class="m-0 p-0 price-pro"> Availability: Out of stock</p> : <p class="m-0 p-0 price-pro"> Availability: In Stock</p>}
                            <small> Size: Choose an option </small>
                            
                            <div> <small>&nbsp;</small></div>
                            {/* will have to conditional render whether the button should be disabled or enabled based on availability */}
                            <div class="col">
                            {productInfo.sizeSmall  === 0 ? <button type="button" class="btn btn-outline-dark" style={{margin : "0 2%"}} disabled>S</button> : <button type="button" class="btn btn-outline-dark" style={{margin : "0 2%"}} onClick={()=>{addToCart("S")}}>S</button>}
                            {productInfo.sizeMedium === 0 ? <button type="button" class="btn btn-outline-dark" style={{margin : "0 2%"}} disabled>M</button> : <button type="button" class="btn btn-outline-dark" style={{margin : "0 2%"}} onClick={()=>{addToCart("M")}}>M</button>}
                            {productInfo.sizeLarge  === 0 ? <button type="button" class="btn btn-outline-dark" style={{margin : "0 2%"}} disabled>L</button> : <button type="button" class="btn btn-outline-dark" style={{margin : "0 2%"}} onClick={()=>{addToCart("L")}}>L</button>}
                            </div>
                            <div> <small>&nbsp;</small></div>
                            <small> You have chosen size: {size} </small>
                            <div> <small>&nbsp;</small></div>                   
                            <Row className = "count-row">
                                <Button onClick={()=>decrementCount()} variant="outline-dark" size="sm">-</Button>
                                <h4 style={{margin : "0 5%"}} >  {count} </h4>
                                <Button onClick={()=>incrementCount(productInfo.sizeSmall,productInfo.sizeMedium,productInfo.sizeLarge)} variant="outline-dark" size="sm">+</Button>
                            </Row>

						<div class="col-lg-12 mt-3">
							<div class="row">
								<div class="col-lg-6 pb-2" style={{paddingLeft : "34%"}} className="add-to-cart-button">
                                <button type="button" onClick={()=>{sendToCart()}}class="btn btn-dark">Add To Cart</button>
								</div>
								
							</div>
						</div>

							<hr class="m-0 pt-2 mt-2"/>
						</div>
						<div class="col-lg-12 pt-2">
							
							<span>{productInfo.details}</span><hr class="m-0 pt-2 mt-2" />
						</div>
						
						<div class="col-lg-12">
                        <h5>Product Details</h5>
                        <ul >
                        <li> Stitched {productInfo.pieces} Suit</li>
                        </ul>
						</div>
						
					</div>
				</div>
			</div>
		</div>
        {/* For space and all  */}

        
        <div> <h6>&nbsp;</h6></div>

		<div class="row">
            <div class="col-lg-4 text-center pt-3">
            <hr className="black-line"/>
			</div>
			<div class="col-lg-4 text-center pt-3">
				<h4>You may also like </h4>
			</div>
            <div class="col-lg-4 text-center pt-3">
            <hr className="black-line"/>
			</div>
		</div>
		
         {/* YAhan pe i'll be adding dynamic cards abbi ke liye yunhee bass  */}

         <div className="container-cards">
         {products.map((product,index) =>{

                return(
                <Articles
                    productid = {product.identification}
                    image     = {product.image[0]}
                    title     = {product.name}
                    piece     = {product.description}
                    price     = {product.price}
                />)

        })}

            
         </div>
	</div>
</div>
</body>
<Clientfooter/>
</div>

    )
}


export default Product;
