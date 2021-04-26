import React from "react";
import "./carousel/carousel.css"
import Carousel from 'react-bootstrap/Carousel'
function ProductCarousel(props)
{
    return(
    <Carousel>
        {/* this is the first slide */}
        {props.array.map(val=>{
            {console.log("this is the map",val)}
            return(
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={process.env.PUBLIC_URL + val}
                    alt="First slide"
                    />
                </Carousel.Item>
            )
        })}
    </Carousel>
    )

}

export default ProductCarousel;