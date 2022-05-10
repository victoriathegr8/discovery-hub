import React, { useState, useEffect } from "react";
import './index.css';
//import orgProfilePages from './orgProfile';
import { UserReg } from './userReg';
import {ProfilePage}  from './userProfile';
import userOrOrg from './userOrOrg.js';
import registerOrg from './registerOrg.js'
import { Filtering } from './filters.js'
import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaHeart } from "react-icons/fa";
//import Button from 'react-bootstrap/Button';
import {Button, Navbar, Nav, Form, NavItem, Container} from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { BrowserRouter, useHistory, Route, Switch, Link, Redirect } from "react-router-dom";
import OrgProfilePages from './orgProfile';
import Createform from './registerOrg.js'
import { CreateCardsList } from './homepage.js';
import About from './About.js';
import 'bootstrap/dist/css/bootstrap.css';
import {FavoritesContent} from './favorites.js';
import { PopUp } from './popUp.js';
import "firebase/database";
import { slide as Menu } from 'react-burger-menu';


import { getDatabase, ref, push, onValue, set, update } from "firebase/database";


function App(props) {
  console.log(props.Createform)
  const [buttonText, setbuttonText] = useState("Sign Up/Login");
  const [buttonLink, setbuttonLink] = useState("/userreg");
  const [user, setUser] = useState(undefined);
  let [currentData, setCurrentData] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [dataCopy, setDataCopy] = useState();
  const [allusers, setAllUsers] = useState();
  const [favOrgs, setFavOrgs] = useState();
  const [customUser, setcustomUser] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [popupClosed, setPopupClosed] = useState(false);

  const db = getDatabase();

  useEffect(() => {
    fetch("orgData.json")
      .then((response) => response.json())
      .then((data) => {
        let cdata = data;
        setCurrentData(cdata);
        setDataCopy(cdata);
        //setUserFavs();
      })
      // .then((data) => {
      //   setUserFavs();
      // })
      .catch((err) => {
        //throw(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  console.log(customUser)
console.log(user)
  // auth state event listener
  // we're listening for authentication state changes (user logged in, out)
  // need to make sure that we the component is loaded before, so we do this with an effect hook 
  useEffect(() => {   //run after component loads
    //listen for changes to the authstate (logged in or not)
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setbuttonText("Profile");
        setbuttonLink("/userprofile");
        setUser(firebaseUser);
        writeUserData(firebaseUser);
        if(firebaseUser.photoURL != null) {
          setProfilePicture(firebaseUser.photoURL);
        }
        else {
          setProfilePicture("emptyProfile.png");
        }
  }
    // if (customUser != undefined) {
    //   console.log("hello")
    //   setbuttonText("Profile");
    //   setbuttonLink("/userprofile");
    //   setUser(customUser);
    // }
    else { //not defined
      setbuttonText("Sign Up/Login")
      setUser(null);
    }
  })
});

// useEffect(() => {   //run after component loads
//   //listen for changes to the authstate (logged in or not)
  
//   if (customUser != undefined) {
//     console.log("hello")
//     setbuttonText("Profile");
//     setbuttonLink("/userprofile");
//     setUser(customUser);
//   }
//   else { //not defined
//     setbuttonText("SignUp/Login")
//     setUser(null);
//   }
// });

console.log(customUser)
  if (loading) {
    return (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
    );
  }


//Writes user to firebase database when the user logs in
  function writeUserData(props) {
    //console.log(props);
    const db = getDatabase();
    update(ref(db, 'users/' + props.uid), {
      name: props.displayName,
      email: props.email,
      id: props.uid
     // image: props.imageURL
    });

  }

  //A callback function for logging out the current user
  const handleSignOut = () => {
    firebase.auth().signOut();
    setbuttonLink("/userReg");
    history.push("/");
    window.location.reload();
  }

  console.log(customUser)
  // function customSignUp() {
  //   if (customUser != undefined) {
  //     console.log("hello")
  //     setbuttonText("Profile");
  //     setbuttonLink("/userprofile");
  //     setUser(customUser);
  //   }
  // }
  
  if (user) {
    let popupModal = document.getElementById("popupmodal");
    if (popupModal) popupModal.style.display = "none";
  }


  console.log(user);
  let content = null; //content to render

  if (!user) { //if logged out, show signup form
    content = (
      <div>
        <div id="burgerMenu1">
        <Menu right>
            <a id="home" className="menu-item" onClick={showAddModalReg}>Favorites</a>
            <a id="about" className="menu-item" href="/aboutus">About Us</a>
            <a id="contact" className="menu-item" onClick={showAddModal}>Add Your Organization</a>
            <a className="menu-item--small" onClick={showAddModalReg}>{buttonText}</a>
          </Menu>
        </div>

        <Navigation buttonText={buttonText} buttonLink={buttonLink} user={user} />
      </div>
    );
  }
  else { //if logged in, show new button
    
    content = (
        <div>
          <div id="burgerMenu2">
          <Menu right>
            <a id="home" className="menu-item" href="/favorites">Favorites</a>
            <a id="about" className="menu-item" href="/aboutus">About Us</a>
            <a id="contact" className="menu-item" onClick={showAddModal}>Add Your Organization</a>
            <a className="menu-item--small" href={buttonLink}>{buttonText}</a>
          </Menu>
          </div>
          {/* <Redirect to="/" /> */}
          <Navigation buttonText={buttonText} buttonLink={buttonLink} user={user}/>
          <Route path="/userprofile">
            {/* {ProfilePage} */}
            <ProfilePage user={user} handleSignOut={handleSignOut} profilePicture={profilePicture} />
          </Route>
        </div>
    );
    //console.log(user);
  }

  return (
    <BrowserRouter>
      <div>
        {content}
        <Createform />
        <UserReg />
        <Switch>
          {/* details */}
          <Route path="/details/:org">
            {/* <Link to="my-app/src/orgProfile.js" component={OrgProfilePages} data={currentData}/> */}
            <OrgProfilePages data={currentData} loading={loading} />
          </Route>
          {/* homepage */}
          <Route exact path="/">
            <PopUp user={user}/>
            <div className="homepageContainer">
              <Filtering data={currentData} setCurrentData={setCurrentData} dataCopy={dataCopy}/>
              <section className="homepageCardsContainer">
                <CreateCardsList orgData={currentData} user={user} favOrgs={favOrgs} setCurrentData={setCurrentData} dataCopy={dataCopy}/>
                <br></br><br></br>
                <h2 id="no-results-message"></h2>
              </section>
            </div>
          </Route>
          {/* sign Up/Login */}
          <Route path="/userreg">
            <UserReg customUser={customUser} setcustomUser={setcustomUser}/>
            {/* <UserReg /> */}
          </Route>
          <Route path="/favorites">
          <div className="favoritesPageContainer">
            <section className="favioritesCardsContainer">
                <FavoritesContent orgData={currentData} user={user} favOrgs={favOrgs}/>
              </section>
          </div>
          </Route>
          <Route path="/aboutus">
            {/* About Us page*/}
            <About />
          </Route>
        </Switch>
         {/* Redirectiing Pages Based on User State */}
        <Switch>
        <Redirect from="/signedIn" to="/" />
        <Route exact path="/" />
        </Switch> 
      </div>
    </BrowserRouter>
  )

}



function Navigation(props) {

  //console.log(props.buttonLink)
  //  let [currentData, setCurrentData] = useState(props.data);
  return (
    <Navbar expand="lg">
      {/* <Container fluid> */}
      
        <Nav id="mainNav" className="justify-content-start me-auto my-2 my-lg-3" expand="lg">
        <NavLink to='/'><img src="sammy-stack-of-books-1.png" height="50" className="align-bottom" alt="React Bootstrap logo"/></NavLink>
          <NavLink to='/' className="mr-3" className="d-inline-block" activeClassName="activeLink"><h5>DiscoveryHub</h5></NavLink>
        </Nav>
        <Nav>
        {/* <Container> */}
        <Nav id="navLinks" className="justify-content-end">
          { props.buttonLink === "/userprofile" &&
            <NavLink to='/favorites'  className="m-2" activeClassName="activeLink">Favorites</NavLink>
          }
          { props.buttonLink === "/userreg" &&
            <a className="m-2" role="button" onClick={showAddModalReg}>Favorites</a>
          }
          <NavLink to='/aboutus' className="m-2" activeClassName="activeLink"> About Us</NavLink>
        <Nav/>
          <button className="addOrgButton" type="button" size="md" variant="info" onClick={showAddModal}><span>Add your Organization</span></button>
          {/* <button className="signUpButton" type="button" size="md" variant="info" onClick={showAddModal}><span>{props.buttonText}</span></button> */}
          { props.buttonLink === "/userprofile" &&
            <Link to={props.buttonLink} className="d-flex">
            <button  className="signUpButton" ttype="button" size="md" variant="info" onClick={showAddModalReg}>{props.buttonText}</button>
            </Link>   
          }
          { props.buttonLink === "/userreg" &&
            <button  className="signUpButton" ttype="button" size="md" variant="info" onClick={showAddModalReg}>{props.buttonText}</button>
          }

          </Nav>
          {/* </Container> */}
        </Nav>
      {/* </Container> */}
    </Navbar>
  );
}

function showAddModal() {
  let modal = document.getElementById("addModal");
  modal.style.display = "block";

}

function showAddModalReg(props) {
  let modal = document.getElementById("signUpmodal");
  modal.style.display = "block";
  }


export default App;