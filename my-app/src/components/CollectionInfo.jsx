import React from "react";
import './collectionInfo.css'
import Image from 'react-bootstrap/Image'

function CollectionInfo (props)
{
    return(
        <div>
        {/* front page image */}
        <div id="container"> <Image className="img" src={props.image} fluid /></div>
        {/* name of collection */}
        <h2 className = "collection-info-text">{props.title}</h2>
        {/* text info of collection */}
        <p className= "info-text">{props.text}</p>
        </div>
    )
}
export default CollectionInfo;