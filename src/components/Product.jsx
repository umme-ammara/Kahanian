import React from "react";
import Navigationbar from './header/Navbar.jsx'
// import Footer from './Footer'
import Clientfooter from './Clientfooter'
import product from "./Product.css"
import Articles from "./Articles.jsx"
import b1 from "./Black_1.jpg"
import b2 from "./Black_2.jpg"
import b3 from "./Black_3.jpg"
import b4 from "./Black_4.jpg"
import blue from "./blue_1.jpg"
import maroon from "./maroon_1.jpg"
import red from "./red_1.jpg"
import Carousel from "./carousel/CarouselDisplay.jsx" 


function Product(){
    return (
<div>

<Navigationbar/>
<body>
<div class="container">
	<div class="col main-section">
		<div class="row hedding m-0 pl-3 pt-0 ">
			
		</div>
		<div class="row m-0">
			<div class="col-lg-5 left-side-product-box ">
            {/* <img src={b4} />  */}
				{/* <img src={b4} /> */}
				{/* <img src={b2} />
				<img src={b3}  />
				<img src={b4} /> */}
                <Carousel/>
				
			</div>
			<div class="col-lg-6">
				<div class="right-side-pro-detail  m-0">
					<div class="row">
						<div class="col">
							<p> Shab-e-Taab</p>
						</div>
						<div class="col-lg-12">
							<p class="m-0 p-0 price-pro"> Rs 6500.00</p>
                            <p class="m-0 p-0 price-pro"> Availability: In Stock</p>
                            <small> Size: Choose an option </small>
                            
                            <div> <small>&nbsp;</small></div>
                        
                            <div class="col">
                            <button type="button" class="btn btn-outline-dark" >S</button> &nbsp;&nbsp;
                            <button type="button" class="btn btn-outline-dark" disabled>M</button>&nbsp;&nbsp;
                            <button type="button" class="btn btn-outline-dark">L</button>
                            </div>
                            <div> <small>&nbsp;</small></div>

                            <div class="col-lg-3">
							{/* <h6>Quantity </h6> */}
							<input type="number" class="form-control text-center w-30" value="1"/>
                           
						</div>
						<div class="col-lg-12 mt-3">
							<div class="row">
								<div class="col-lg-6 pb-2">
									<a href="#" class="btn btn-dark w-50">Add To Cart</a>
								</div>
								
							</div>
						</div>

							<hr class="m-0 pt-2 mt-2"/>
						</div>
						<div class="col-lg-12 pt-2">
							
							<span> A beautiful short black shirt ,featuring intricate gold embellishments,
                            worn with a grip shalwar,whose drape is sure to turn all heads. This outfit is paired 
                            with an elegant chiffon dupatta,finished off delicately with gota</span><hr class="m-0 pt-2 mt-2"/>
						</div>
						
						<div class="col-lg-12">
                        <h5>Product Details</h5>
                        <ul >
                        <li> Stitched 3-Piece Suit</li>
                        <li> Color:Black </li>
                        <li> Fabric:Velvet </li>
                        <li> &nbsp;&nbsp; </li>
                        
                        <li> Shalwar: </li>
                        <li> Color:Black </li>
                        <li> Fabric: Grip </li>
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
        
                <Articles
                image={blue}
                title="Darakshan"
                piece="3 piece"
                price="Rs 5650"
                url=""
                />
                 <Articles
                image={red}
                title="Mahtaab"
                piece="2 piece"
                price="Rs 6550"
                url=""
                />
                <Articles
                image={maroon}
                title="Mahjabeen"
                piece="3 piece"
                price="Rs 8000"
                url=""
                />
            
         </div>
	</div>
</div>
</body>
<Clientfooter/>
</div>

    )
}


export default Product;
