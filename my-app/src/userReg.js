// for user registration

import React, { useState, useEffect} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
// import PasswordChecklist from "react-password-checklist" //react password
import { Button, Form, Col, InputGroup } from 'react-bootstrap';
import imageToBase64 from 'image-to-base64/browser';
import { getDatabase, ref, push, set } from "firebase/database";
import { BrowserRouter, useHistory, Route, Switch, Link, Redirect } from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; //react google auth

// Configure FirebaseUI
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
};

export function UserReg(props) {
  
  console.log(props);
  
  
  const [image, setImage] = useState();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(1);
  const [picture, setPicture] = useState();
  let [base64URL, setBase64URL] = useState();
  
  console.log(props)

  const user = {
    uid: id + 1,
    image: picture,
    displayName: name,
    email: email,
    password: password
  };

  var getBase64 = require('get-base64');
  // for profile page
  const [values, setValues] = useState(user);
  // populate profile page with individual organization details that user chooses
  // return formatted profile page component
  const [validated, setValidated] = useState([false, false, false, false]);
  //let validated = [false, false, false, false];
  //const [values, setValues] = useState(user);


  let pic = {
    file: null,
    base64URL: base64URL
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    let { file } = pic;

    file = e.target.files[0];

    getBase64(file)
      .then(result => {
        file["base64"] = result;
        setBase64URL(file["base64"]);
        console.log(base64URL);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  function handleName() {
    //console.log(event.target.value)
    let name = document.getElementById('signup-name');
    let validatedCopy = validated;
    if (name.value !== null) validatedCopy[0] = true;
    else validatedCopy[0] = false;
    setName(name.value);
    setValidated(validatedCopy);
    //console.log(validated)
  }





  function handleEmail() {
    //console.log(event.target.value)
    let email = document.getElementById('signup-email')
    let validatedCopy = validated;
    if (email.value !== null) {
      if (email.value.includes("@") && email.value.includes(".")) {
        validatedCopy[1] = true;
        document.getElementById('signup-email-error').innerHTML = "&nbsp;";
      }
      else {
        validatedCopy[1] = false;
        document.getElementById('signup-email-error').innerHTML = "Please enter a valid email";
      }
    }
    else {
      validatedCopy[1] = false;
      document.getElementById('signup-email-error').innerHTML = "Please enter a valid email";
    }
    setEmail(email.value);
    setValidated(validatedCopy);
    //console.log(validated)
  }


  function handleAgeCheck() {
    let age = document.getElementById('signup-age');
    let validatedCopy = validated;
    if (age.checked) validatedCopy[2] = true;
    else validatedCopy[2] = false;
    setValidated(validatedCopy);
  }


  function handleValidPassword() {
    let validatedCopy = validated;
    let x = !validatedCopy[3];
    console.log(x);
    validatedCopy[3] = x;
    setValidated(validatedCopy);
  }

  console.log(picture)
  console.log(name);
  console.log(email);
  console.log(password);


  function handleSubmit() {
    console.log("i was clikce")
    setId(id + 1);
      console.log(validated);
      if (validated.includes(false)) console.log("invalid");
      else {
        console.log("form submitted!");
      }
    //if (!validated.includes(false)) {
  //     const db = getDatabase();
  //     const postListRef = ref(db, 'users');
  //     const newPostRef = push(postListRef);
  //     set(newPostRef, {
  //       uid: id,
  //       picture: picture,
  //       email: email,
  //       displayName: name,
  //       password: password
  //  // });
  //   });
    //props.setcustomUser(user);
    console.log(user);
  }
console.log(props);
console.log(user);
  return (
    <div id="signUpmodal" className="signUpmodal" >
    <div class="modal-content" id="signUpModalContent">
      <span id="addModalClose" className="close" onClick={e => closeAddModal()}>&times;</span>
    <div className="signUpLogin">
      <div className="signUpContainer">
        <h1>Sign Up/Sign In</h1>
              <section className="signInGoogle">
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              </section>
        </div>
    </div>
    </div>
   </div>
  )

}

function closeAddModal() {
  let signUpmodal = document.getElementById("signUpmodal");
  signUpmodal.style.display = "none";
}

export default UserReg;
// export {CreateRegform};