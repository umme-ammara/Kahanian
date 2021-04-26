import React , { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Clientfooter from './components/Clientfooter'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './components/header/Navbar.jsx'
import CartInfo from './components/cartInfo/CartInformation.jsx'
import SummaryCart from './components/cartInfo/SummaryCart.jsx'
import './cart-page.css'

//importing firebase
import {app} from "./firebase"
var firebase = require('firebase/app');
require('firebase/database');

function Cart()
{
  let DB = app.database();
  const [onLoad, setOnLoad] = useState(true)
  const [productInfo, setProductInfo] = useState([])
  const [countItems,setCountItems] = useState([])
  let cartProducts = localStorage.getItem('shoppingCart')
  cartProducts = JSON.parse(cartProducts)

  function alterCart()
  {
    const tempArray = []
    productInfo.map(prod=>
      {
        //console.log("am i coming here")
        if (prod.outofStock === false)
        {

          //console.log("this=====",prod)
            var tempcart = {
              collection    : prod.colId,
              product       : prod.prodId,
              numberOfItems : prod.sizesBought,
              sizeItem      : prod.sizeItem
            }
            tempArray.push(tempcart)

        }

      })
    //console.log("this is my temparray",tempArray)
    localStorage.removeItem('shoppingCart')
    localStorage.setItem('shoppingCart',JSON.stringify(tempArray))
    //localStorage.setItem('finalCart',JSON.stringify(tempArray))
  }


  const onAdd = (product) => {
    const exist = productInfo.find(x=> x.id === product.id);

    if (exist)
    {
      if (exist.sizesBought >= product.sizeStock)
      {
        return
      }
      else
      {
        setProductInfo(
          productInfo.map((x)=> x.id === product.id ? {...exist, sizesBought :  exist.sizesBought + 1} : x) 
          )

      }
    }
  }

  const onRemove = (product) => {
    const exist = productInfo.find((x) => x.id === product.id);
    if (exist.sizesBought === 1)
    {
      setProductInfo(productInfo.filter((x) => x.id !== product.id))
    }
    else{
      setProductInfo(
        productInfo.map((x)=> x.id === product.id ? {...exist, sizesBought : exist.sizesBought - 1} : x) 
        )
    }
  }


  const getProductInfo = (prod) => 
    new Promise((resolve, reject) => {
      DB.ref("Collection/" + prod.collection + "/Product/" + prod.product)
        .on("value", snapshot => {
          resolve(snapshot.val())
        })
  });

  useEffect(() => {
    if(onLoad === true){
      try{
        const productId = []
        const CollId = []
        const arrFinal = cartProducts.map(async prod => {
          productId.push(prod.product)
          CollId.push(prod.collection)
          return await getProductInfo(prod)
        })
        Promise.all(arrFinal).then((values) => {
          //console.log("this is value",values,arrFinal)
          const tempArr = []
          const tempCount = []
          // all the checks are happening in the map function
          values.map((val,index)=>{   
            // these checks are to find how much stock is available for the product
            var stockOfSize = 0
            if (cartProducts[index].sizeItem === "S")
            {
                stockOfSize = val.size[0]
                //console.log("hi")
            }
            else if (cartProducts[index].sizeItem === "M")
            {
              stockOfSize = val.size[1]
            }
            else{
              stockOfSize = val.size[2]
            }

            // to check if stocks are empty
            var isEmpty = false
            var priceofItem = val.price
            if (stockOfSize === 0)
            {
              isEmpty = true
              priceofItem = 0
            } 

            // if the product is in stock but the customer has more than what is available in the stock
            var moreProducts = false
            var totalIndividualProduct = cartProducts[index].numberOfItems
            if (stockOfSize < cartProducts[index].numberOfItems)
            {
                moreProducts = true
                totalIndividualProduct = stockOfSize
            }

            const tempobj = {
              colId           : CollId[index],
              prodId          : productId[index],
              id              : index,
              name            : val.name,
              price           : priceofItem,
              sizeStock       : stockOfSize,
              image           : val.imageSource[0],
              sizesBought     : totalIndividualProduct,
              sizeItem        : cartProducts[index].sizeItem,
              outofStock      : isEmpty,
              hasMoreProducts : moreProducts
            }
            tempCount.push(totalIndividualProduct)
            tempArr.push(tempobj)

          })
          setCountItems(...countItems,tempCount)
          setProductInfo(...productInfo,tempArr)
        });
    }
    catch{
      console.log("throwing error")
    }
    }

    setOnLoad(false)
})
  return (
    <div>
  <Navigationbar/>
  {console.log("this is product info",productInfo)}
  {productInfo.length !== 0 &&
  <CartInfo
    array = {productInfo}
    onAdd = {onAdd}
    onRemove = {onRemove}
  />}
  {alterCart()}
  {localStorage.setItem('finalCart',JSON.stringify(productInfo))}
  {/* <CartInfo
    array = {productInfo}
    countArray = {countItems}
  /> */}
  {JSON.parse(localStorage.getItem('shoppingCart')).length !== 0 &&
  <SummaryCart
    array = {productInfo}
    shipping = {150}
  />}
  {productInfo.length === 0 && <h2 className = "display-empty-cart">The cart is currently empty</h2>}
  <Clientfooter/>
  </div>
  );
}


export default Cart; 
// ReactDOM.render(
//   <div>
//   <Navigationbar/>
//   <CartInfo
//     array = {arr}
//   />
//   <SummaryCart
//     price = {10000}
//     shipping = {150}
//   />
//   <Footer/>
//   </div>,
//   document.getElementById('root')
//   );
