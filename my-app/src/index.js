import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
// import reportWebVitals from './reportWebVitals';

//import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';



const firebaseConfig = {
  apiKey: "AIzaSyCEI61E7czO3qNXu0CHEg6jeE-NF_n_oAw",
  authDomain: "discoveryhub-86001.firebaseapp.com",
  projectId: "discoveryhub-86001",
  storageBucket: "discoveryhub-86001.appspot.com",
  messagingSenderId: "359227253876",
  appId: "1:359227253876:web:0162ca95dfefd23e671d21",
  measurementId: "G-JT4DXYDMCQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const database = getDatabase(app);


fetch("orgData.json")
    // gets the data as a json file
    .then(function(response){
      let r = response.json();
      return r;
    })
    .then(function(data){
        //sets the data to state
        //STATE.currentData = data; 

    })

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter><App /></BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
