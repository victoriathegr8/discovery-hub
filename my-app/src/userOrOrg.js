// for user registration
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
//import PasswordChecklist from "react-password-checklist" //react password
import { Button, Form, Col, InputGroup } from 'react-bootstrap';
import {BsXSquareFill} from "react-icons/bs";
import './index.css';
// import {userRegPicture} from 'my-app/src/MessyDoodle.png';


function userOrOrg(props) {

  // for profile pag
  // populate profile page with individual organization details that user chooses
  // return formatted profile page component

  return (
    <div>
        <UserOrOrg />
    </div>
  )
}

function UserOrOrg() {

  
  return (
      <div className="userOrOrg">
      <section className="userOrOrgContainer">
        <section className="titleAndExit">
        <BsXSquareFill className="exitButton" />
        </section>
        <h1>Join Our Academic Community!</h1>
        <div className="signUpLoginContent">
          
          
          <section className="registerUser">
                <h3>Recieve additional academic support</h3>
                <img src="ReadingDoodle.png" alt="student reading book" />
                <Button variant="primary" type="submit" >
                  Sign Up/Login
                </Button>
          </section>
      
          <section className="registerOrg">
              <h3>Register your academic organization </h3>
              <img src="MessyDoodle.png" alt="student reading book" />
              <Button variant="primary" type="submit">
                Register Organization
              </Button>
          </section>
        </div>
      </section>
    </div>  
  )
}

export default userOrOrg;
export { };