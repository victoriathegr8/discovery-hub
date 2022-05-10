import React, { useRef, useState } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import './index.css';
import Modal from 'react-bootstrap/Modal'

export function PopUp() {
  const [closedModal, setClosedModal] = useState(false);
  console.log(closedModal);

  function closeAddModal() {
    let popupModal = document.getElementById("popupmodal");
    popupModal.style.display = "none";
    setClosedModal(true);
    console.log(closedModal)
  }

  function showAddModal() {
    let modal = document.getElementById("addModal");
    modal.style.display = "block";
    let signupmodal = document.getElementById("signUpmodal");
    signupmodal.style.display = "none";
    closeAddModal();
  }
  
  function showAddModalReg() {
    let signupmodal = document.getElementById("signUpmodal");
    signupmodal.style.display = "block";
    closeAddModal();
  }


  return (
    // <p> hello</p>
    <div id="popupmodal" className="popupmodal" >
      <div id="popupContent" class="modal-content">
        <span id="addModalClose" className="close" onClick={e => closeAddModal()}>&times;</span>
        <div className="popUpContainer">
          <h1 className="modalImage">Join Our Academic Community!</h1>
          <div className="popUpContent" >
            {/* <Container> */}
              {/* <Row className="justify-content-md-center"> */}
              <div className="testOne">
                <section className="Popsignup">
                  <h3>Recieve Additional Academic Support </h3>
                  <img className="modalImage" src="/dizzy-reading.png" alt="Student" width="300" height="250" />
                  <button className="modalButtons" onClick={e => showAddModalReg()}>SignUp/Login</button>
                </section>
                </div>
                <div className="testTwo">
                <section className="PopRegisterOrg">
                  <h3 className="modalImage">Register Your Academic Organization</h3>
                  <img className="modalImage" src="/dizzy-teamwork.png" alt="Mentor" width="300" height="250" />
                  <button className="modalButtons" onClick={e => showAddModal()}>Register Here</button>
                </section>
                </div>
              {/* </Row> */}
            {/* </Container> */}
          </div>
       </div>
    </div>
   </div>
  )
}




export default PopUp;
