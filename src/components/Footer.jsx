import React from "react";
import "./Footer.css";


function Footer() {
  
    return (   
        <footer id="footer" class="footer-1">
        <div class="footer-copyright">
        <div class="container">
            <div class="row">
            <div class="col-md-12 text-center">
                    <p>Copyrights © {new Date().getFullYear()} Kahanian. All rights reserved.</p>
             </div>
            </div>
        </div>
        </div>
        </footer> 
    )
}

export default Footer;
