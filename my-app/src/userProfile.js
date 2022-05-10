// for user profile page
import React, { useState } from "react";
import './App.css';
import './index.css';
//import orgProfilePages from './orgProfile';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import { getDatabase, ref, push, set } from "firebase/database";
import imageToBase64 from 'image-to-base64/browser';
// // For edit mode and edit button
// export function editMode() {
//   // upon clicking "edit profile" button, user enters edit mode. "edit profile" button now reads "done" and input fields with profile details are now editable
//   // gives error message if user inputs an invalid email or a password that doesn't meet minimum requirements
//   // edits firebase according to user edits
// }

// fetching for the profile page
export function ProfilePage(props) {
  console.log(props);
  console.log(props.user.displayName)
  console.log(props.user.photoURL)
  
  let [base64URL, setBase64URL] = useState(props.user.photoURL);
  var getBase64 = require('get-base64');

  // const [buttonState, setButtonState] = useState("Edit Profile");
  const [newName, setNewName] = useState(props.user.displayName);
  const [newEmail, setNewEmail] = useState(props.user.email);
  //const [userPicture, setUserPicture] = useState(props.user.photoURL);

  let picture = {
    file: null,
    base64URL: base64URL
  };

  console.log(props.user)


    const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    let { file } = picture;

    file = e.target.files[0];

    getBase64(file)
      .then(result => {
        file["base64"] = result;
        setBase64URL(file["base64"]);
        //setUserPicture(picture.base64URL);
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
  
  // handle editing profile feature
  function handleNameEdit(event) {
   // console.log(event.target.value)
    let name = event.target.value;
    setNewName(name);
  }

   // handle editing email
  function handleEmailEdit(event) {
    //console.log(event.target.value)
    let email = event.target.value;
    setNewEmail(email);
  }

  console.log(base64URL);

  // changes user information in firebase based on the user's uid
  function writeUserData() {
    console.log(newName);
    console.log(newEmail);
    const db = getDatabase();
    set(ref(db, 'users/' + props.user.uid), {
      photoURL: picture.base64URL,
      name: newName,
      email: newEmail
    });
  }
  console.log(props.user);

  document.getElementById('signUpmodal').style.display = "none";

  // when a signed-in user clicks the profile button, a formatted profile page using the user's details in firebase are presented
  // a firebase reference is found using the unique ID of the user
  // returns an object of the user's profile details
  return (
    <div className="profilePage">
      <div className="profileContainer">
        <section className="profileContent">
          {/* profile image */}
          <img src={props.profilePicture} alt="empty profile" className="profilePagePicture"/>
          <form>
            <label>
              Name:
              <input type="text" name="name" size="25"className="userNameInput" placeholder={props.user.displayName} onChange={handleNameEdit} disabled />
              </label>
            <label>
              Email:
              <input type="text" name="email" size="25" className="emailNameInput" placeholder={props.user.email} onChange={handleEmailEdit} disabled/>
              </label>
          <section className="buttonRow">
            <Link to="favorites"  >
            <button  to="favorites" className="viewFavoritesProfileButton" type="submit">
              View Favorites
            </button>
            </Link>
            {props.user && <button color="danger" onClick={props.handleSignOut} className="profileLogOutButton">
            Log Out 
          </button>
          }
            </section>
            </form>
        </section>
      </div>
    </div>

  )
}

export default ProfilePage;

 // if (props.user.photoURL === null) {
  //   setBase64URL("emptyProfile.png");
  // } 
  // else {
  //   setBase64URL(props.user.photoURL);
  // }
  // var getBase64 = require('get-base64');
