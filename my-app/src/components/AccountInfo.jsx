import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";


function AccountInfo()
{
    return (
        <div>
            <div className="row">

                <div className="col-lg-4">

                <>
      
      <InputGroup>
        <Form.Control type="text" placeholder="With addon"></Form.Control>
          <InputGroup.Append>
           {/* <InputGroup.Text></InputGroup.Text> */}
         </InputGroup.Append>
      </InputGroup>
    </>

                </div>



            </div>



        </div>


    )
}

export default AccountInfo; 