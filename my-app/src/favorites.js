// for Favorites page

import React, { useState, useEffect } from "react";
import './index.css';
// import imageTwo from "./images/2.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import PasswordChecklist from "react-password-checklist" //react password
import { CardGroup, footer, Card, Button, Form, Col, InputGroup } from 'react-bootstrap';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { BrowserRouter, useHistory, Route, Switch, Link, Redirect } from "react-router-dom";
import { getStorage, uploadString } from "firebase/storage";
import "firebase/database";
import imageToBase64 from 'image-to-base64/browser';


// Handles the favorite button input when the user selects 
//export function favoriteOrgbuttonhandler(props) {
// Saves the selected organization card under the favorites tab
// when user clicks on favorite button, new firebase reference is created. organization number is recorded and pushed to favorites tree of individual user
// when favorite button is clicked again, delete organization number from favorites tree
// props: organization number
//}

// Creates a new list based on the number of favorited orginizations 
//export function favoriteOrgList(props) {
// when visiting the favorites page, the function will retrieve from firebase and search for all organizations that are designated as a favorited function by the logged in user 
// props: orgCards and cards list function to create the favorites homepage with correct cards
//returns an array of favourited organizations 
//return []
//}


export function FavoritesContent(props) {

  const [loading, setLoading] = useState(true);
  const [favOrgs, setFavOrgs]= useState();
  let favOrgData = [];

  console.log(props.orgData);

  // useEffect(() => {
  //   const db = getDatabase();
  //   let favOrgsRef = ref(db, "users/" + props.user.uid + "/favs");
  //   let favs;
  //   onValue(favOrgsRef, (snapshot) => {
  //     favs = snapshot.val();
  //     if (favs !== null) {
  //       favs = favs.filter(function (x) {
  //         return x != null;
  //       })
  //       for (let i = 0; i < favs.length; i++) {
  //         favIds.push(favs[i].id);
  //       }
  //       console.log(favIds);
  //       //setFavOrgs(favIds);
  //       favOrgData = props.orgData.filter(org => {
  //         if (favIds.includes(org.orgID)) return org;
  //       })
  //       console.log(favOrgData);
      
  //     }
  //   })
  // }, []);

  useEffect(() => {
    fetch("orgData.json")
      .then((response) => response.json())
      .then((data) => {
        const db = getDatabase();
        let favOrgsRef = ref(db, "users/" + props.user.uid + "/favs");
        onValue(favOrgsRef, (snapshot) => {
          let favs = snapshot.val();
          console.log(favs);
          let favIds = [];
          if (favs !== null) {
            let favObjs = Object.keys(favs);
            console.log(favObjs);
            for (let i = 0; i < favObjs.length; i++) {
              if (isNaN(Number(favObjs[i]))) favIds.push(favObjs[i]);
              else favIds.push(Number(favObjs[i]));
            }
            console.log(favIds);
            //setFavOrgs(favIds);
            favOrgData = props.orgData.filter(org => {
              if (favIds.includes(org.orgID)) return org;
            })
            console.log(favOrgData);
            setFavOrgs(favOrgData);
          
          }
        })
      })
      .catch((err) => {
        //throw(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //console.log( document.getElementById("favBtn"))

  if (!props.user) { //if logged out, show splease sign up
    // document.getElementById("favBtn").addEventListener("click", 
    // console.log("hello"),
    // console.log(document.querySelector("favBtn1"))
    // <Switch>
    // <Redirect from="/" to="/userreg" />
    // <Route exact path="/userreg" />
    //  </Switch> 
 // );       tried working on this
    return (
      <div>
          {/* Redirectiing Favories page Based on User State */}
          <Switch>
        <Redirect from="/favorites" to="/favorites" />
        <Route exact path="/userreg" />
         </Switch> 
      </div>
    );
  }
  else { //if logged in, show new content

    if (loading) {
      console.log("loading");
      return (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      );
    } else

    if (favOrgs === undefined) return (<div>You don't have any favorites yet!</div>)

    else return favOrgs.map((currentCard) => {
      // console.log(currentCard)
      function handleFavButton() {
        document.getElementById("favBtn" + currentCard.orgID).classList.toggle('fa-solid');
        const db = getDatabase();
        let tempRef = ref(db, "users/" + props.user.uid + "/favs/" + currentCard.orgID);
        let tempVal;
        onValue(tempRef, (snapshot) => {
            tempVal = snapshot.val();
        });
        if (tempVal !== null) {
            console.log("fav deleted");
            set(ref(db, "users/" + props.user.uid + "/favs/" + currentCard.orgID), {
                id: null
            });
            //tempRef.remove();
        } else {
            set(ref(db, "users/" + props.user.uid + "/favs/" + currentCard.orgID), {
                id: currentCard.orgID
            });
        }
      }

      return (
        <div className="favoritesPageContainer" >
          {/* <CardGroup>  */}
          <Card className="text-right" style={{ width: '18rem' }} key={currentCard.orgID}>
            <div className="fav-orgCard-image">
              <Card.Img variant="top" src={currentCard.picture} />
              <i id={"favBtn" + currentCard.orgID} class="fa-regular fa-star fa-solid" onClick={(e) => handleFavButton()}></i>
            </div>
            <Card.Body>
              <Card.Title>{currentCard.name}</Card.Title>
              {"Location: " + currentCard.city}
              <p className="fav-orgCard-offerings-titles">Services Available:</p>
              <div className="fav-orgCard-offerings">
                {currentCard.services.map(function (service, i) {
                  return <p className="fav-orgCard-rCorners">{service}</p>
                })}
              </div>
              <p className="fav-orgCard-offerings-titles">Subjects Available:</p>
              <div className="fav-orgCard-offerings">
                {currentCard.subjects.map(function (subject, i) {
                  return <p className="fav-orgCard-rCorners">{subject}</p>
                })}
              </div>
            </Card.Body>
            <footer>
              <Link className="favCardLink" to={"/details/" + currentCard.orgID}>See More </Link>
            </footer>
          </Card>
        </div>
      );
    })
  }
}
//}

export default FavoritesContent;