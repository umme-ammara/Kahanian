import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import image1 from "./imagesToDisplay/USM_2344.jpg"
import image2 from "./imagesToDisplay/USM_2422.jpg"
import image3 from "./imagesToDisplay/IMG_0538.jpg"
import image4 from "./imagesToDisplay/USM_3015.jpg"
import "./carousel.css"
function CarouselDisplay()
{
    return(
    <Carousel>
        {/* this is the first slide */}
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>DISCOVER OUR DENJ COLLECTION</h3>
            </Carousel.Caption>
        </Carousel.Item>

        {/* this is the second slide */}
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
            />
            <Carousel.Caption>
            <h3>DISCOVER OUR DENJ COLLECTION</h3>
            </Carousel.Caption>
        </Carousel.Item>
        {/* this is the third slide */}
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={image3}
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3>DISCOVER OUR DENJ COLLECTION</h3>
            </Carousel.Caption>
        </Carousel.Item>

         {/* this is the fourth slide */}
         <Carousel.Item>
            <img
            className="d-block w-100"
            src={image4}
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3>DISCOVER OUR DENJ COLLECTION</h3>
            </Carousel.Caption>
        </Carousel.Item>


</Carousel>
    )

}

export default CarouselDisplay;