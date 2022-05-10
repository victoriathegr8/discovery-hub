import { getDatabase, ref, onValue, set, push } from "firebase/database";
import './index.css';
import firebase from 'firebase/compat/app';
import { BrowserRouter, useHistory, Route, Switch, Link, Redirect } from "react-router-dom";

// Functions for the homepage
import React, {useEffect, useState} from "react";
import './App.css';
import { remove } from "lodash";
import { FaLessThan } from "react-icons/fa";

// Creates a list of individual cards
export function CreateCardsList(props) {
  // create the entire list of cards from each orgnaization card
  // takes in the individal orginization cards to make the entire list 
  // of cards for either the homepage or favorites page
  // returns array of card objects

  const [loading, setLoading] = useState(true);
  const [favIdArr, setFavIdArr] = useState();
  let favIds = [];
  useEffect(() => {
    fetch("orgData.json")
      .then((response) => response.json())
      .then((data) => {
        const db = getDatabase();

        let addedOrgsRef = ref(db, "orgs");
        onValue(addedOrgsRef, (snapshot) => {
            let orgs = [];
            let snapshotObj = snapshot.val()
            
            if (snapshotObj) {
                orgs = Object.values(snapshot.val());
                console.log([].concat(props.orgData, orgs))
                props.setCurrentData([].concat(props.dataCopy, orgs))
            }
            console.log(orgs)
        })

        let favOrgsRef = ref(db, "users/" + props.user.uid + "/favs");
        let favs;
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
            console.log(favIds);
            setFavIdArr(favIds);
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

  if (loading) {
    console.log("loading");
    return (
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>
    );
    } else
    return props.orgData.map((currentCard) => {
    function handleFavButton() {
        if (!props.user) {
            alert('You must be logged in to favorite organizations!');
        } else {
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


        // set(ref(db, "users/" + props.user.uid + "/favs/" + currentCard.orgID), {
        //     id: currentCard.orgID
        // });

    }
    function favBtnStatus() {
        if (favIdArr !== undefined) {
            if (favIdArr.includes(currentCard.orgID)) {
                return (" fa-solid")
            }
            else return ("")
        }
        else return ("")
    }
    return(
    <div className="orgCard" key={currentCard.orgID}>
    <div className="orgCard-image">
        <img src={currentCard.picture}/>
        <i id={"favBtn" + currentCard.orgID} className={"fa-regular fa-star" + favBtnStatus()} onClick={(e) => handleFavButton()}></i>
    </div>
    <div className="orgCard-content">
        <div className="orgCard-content2">
            <h2>{currentCard.name}</h2>
            <Link to={"/details/" + currentCard.orgID}>See More</Link>
        </div>
        <p>{currentCard.city}</p>
        <img className="iphone-orgCard-image" src={currentCard.picture}/>
        <div className="orgCard-content3">
        {/* <img src={currentCard.picture}/> */}
            <div className="orgCard-services">
                <p className="orgCard-offerings-titles">Services Available:</p>
                <div className="orgCard-offerings">
                    {currentCard.services.map(function(service, i){
                        return <p className="orgCard-rCorners">{service}</p>
                    })}
                </div>
            </div>
            <div className="orgCard-border"></div>
            <div className="orgCard-subjects">
                <p className="orgCard-offerings-titles">Subjects Available:</p>
                <div className="orgCard-offerings">
                    {currentCard.subjects.map(function(subject, i){
                        return <p className="orgCard-rCorners">{subject}</p>
                    })}
                </div>
            </div>
            <div className="orgCard-border"></div>
            <div className="orgCard-platforms">
                <p className="orgCard-offerings-titles">Platforms Available:</p>
                <div className="orgCard-offerings">
                    {currentCard.platform.map(function(platform, i){
                        return <p className="orgCard-rCorners">{platform}</p>
                    })}
                </div>
            </div>
        </div>
    </div>
    </div>
    )
  })
}

export default CreateCardsList;
// export 
