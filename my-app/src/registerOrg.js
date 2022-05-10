import React, { useState } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup } from 'react-bootstrap';
import "firebase/database";
import { MockDatabase, MockRef } from '../setupTests';

// This component creates a new organization
export function Createform(props) {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [institution, setInstitution] = useState();
  const [bio, setBio] = useState();
  const [services, setServices] = useState();
  const [subjects, setSubjects] = useState();
  const [platforms, setPlatforms] = useState();
  const [website, setWebsite] = useState();
  let [base64URL, setBase64URL] = useState();

  var getBase64 = require('get-base64');

  function setValidationMsg(domSelector, message) {
    document.getElementById(domSelector).innerHTML = message;
  }

  function validatePictureInput() {
    let fileUploadElem = document.getElementById("registerFileUpload");

    if (fileUploadElem.files.length == 0) {
      setValidationMsg("pictureValidationMsg", "Please upload a profile picture");
      return false;
    } else {
      let fileSize = fileUploadElem.files[0].size;
      setValidationMsg("pictureValidationMsg", "&nbsp;");
      if (fileSize / 1024 / 1024 > 1) {
        setValidationMsg("pictureValidationMsg", "Please upload a profile picture smaller than 1 MB");
        return false;
      }
      return true;
    }
  }

  function validateSimpleCondition(state, idSelector, invalidMsg) {
    if (state === undefined) {
      setValidationMsg(idSelector, invalidMsg)
      return false;
    }
    else {
      setValidationMsg(idSelector, "&nbsp;");
      return true;
    }
  }

  function validateEmailInput() {
    if (email === undefined || email.includes("@") == false) {
      setValidationMsg("emailValidationMsg", "Please enter a valid email");
      return false;
    } else {
      setValidationMsg("emailValidationMsg", "&nbsp;");
      return true;
    }
  }

  function validateMultiSelectInputs(state, idSelector, invalidMsg) {
    if (state === undefined || state.length === 0) {
      setValidationMsg(idSelector, invalidMsg);
      return false;
    } else {
      setValidationMsg(idSelector, "&nbsp;");
      return true;
    }
  }

  function validateWebsiteInput() {
    if (website === undefined || website.length === 0 || !website.includes(".")) {
      setValidationMsg("websiteValidationMsg", "Please enter a valid URL");
      return false;
    } else {
      setValidationMsg("emailValidationMsg", "&nbsp;");
      return true;
    }
  }

  const Push = () => {
    let validation = {};
    validation.picture = validatePictureInput();
    validation.city = validateSimpleCondition(city, "cityValidationMsg", "Please select a city");
    validation.email = validateEmailInput();
    validation.name = validateSimpleCondition(name, "nameValidationMsg", "Please enter an organization name");
    validation.bio = validateSimpleCondition(bio, "bioValidationMsg", "Please enter a bio");
    validation.services = validateMultiSelectInputs(services, "servicesValidationMsg", "Please select at least one service");
    validation.subjects = validateMultiSelectInputs(subjects, "subjectsValidationMsg", "Please select at least one subject");
    validation.platforms = validateMultiSelectInputs(platforms, "platformsValidationMsg", "Please select at least one platform");
    validation.website = validateWebsiteInput();

    if (!Object.values(validation).includes(false)) {
      const db = new MockDatabase();
      const postListRef = new MockRef(db, 'orgs');
      postListRef.set({
        picture: picture.base64URL,
        city: city,
        email: email,
        name: name,
        institution: institution,
        bio: bio,
        services: services,
        subjects: subjects,
        platform: platforms,
        url: website,
        orgID: name
      });
      postListRef.push(postListRef);
      console.log(db);
      closeAddModal();
    }
  }

  let picture = {
    file: null,
    base64URL: base64URL
  };

  const handleFileInputChange = (e) => {
    let { file } = picture;

    file = e.target.files[0];

    getBase64(file)
      .then(result => {
        file["base64"] = result;
        setBase64URL(file["base64"]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";

      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  function handleInputs(inputCallback, inputQuerySelector) {
    let inputArr = [];
    let checkedBoxes = document.querySelectorAll(inputQuerySelector);
    for (var i = 0; i < checkedBoxes.length; i++) {
      inputArr.push(checkedBoxes[i].value);
    }
    inputCallback(inputArr);
  }

  return (
    <div id="addModal" className="addmodal">

      <div id="registerModalContent" className="modal-content">
        <span id="addModalClose" className="close" onClick={e => closeAddModal()}>&times;</span>
        <div className="orgSignUpLogin">
          <div className="orgSignUpContainer">
            <div className="orgSignUpLoginContent">
              <h1 className="registerProgileTitle">Register Your Organization</h1>

              <section>
                <Form id="registerForm" validated={props.validated} onSubmit={props.handleSubmit}>
                  <Form.Label>Upload Profile Photo</Form.Label>
                  <Form.Control required type="file" accept="image/png, image/jpeg" id="registerFileUpload" onChange={handleFileInputChange} />
                  <p id="pictureValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label > Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control required type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                  </InputGroup>
                  <p id="nameValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label>Email address</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control required type="email" placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)} />
                  </InputGroup>
                  <p id="emailValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label>What city are you located in?</Form.Label>
                  <InputGroup required hasValidation>
                    <select className="selectCity" onChange={(e) => setCity(e.target.value)} data-testid="testSelectCity">
                      <option disabled defaultValue="DEFAULT">Washington Cities</option>
                      <option value="Seattle">Seattle</option>
                      <option value="Spokane">Spokane</option>
                      <option value="Tacoma">Tacoma</option>
                      <option value="Vancouver">Vancouver</option>
                      <option value="Bellevue">Bellevue</option>
                      <option value="Kent">Kent</option>
                      <option value="Everett">Everett</option>
                      <option value="Spokane Valley">Spokane Valley</option>
                      <option value="Renton">Renton</option>
                      <option value="Kirkland">Kirkland</option>
                    </select>
                  </InputGroup>
                  <p id="cityValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label>What Institution are you associated with?</Form.Label>
                  <InputGroup required hasValidation>
                    <Form.Control placeholder="Enter Institution" className="mb-5" onChange={(e) => setInstitution(e.target.value)} />
                  </InputGroup>

                  <Form.Label>Bio (This will be public on the webite)</Form.Label>
                  <InputGroup required hasValidation>
                    <textarea id="w3review" name="w3review" rows="4" cols="100" placeholder="Enter Bio Here" onChange={(e) => setBio(e.target.value)}></textarea>
                  </InputGroup>
                  <p id="bioValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label>Organization Website</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control placeholder="Enter Website" onChange={(e) => setWebsite(e.target.value)} />
                  </InputGroup>
                  <p id="websiteValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label>What services are you available to offer? (Select all that apply)</Form.Label>
                  <InputGroup required hasValidation controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" value="Mentors" name="services" label="Mentor&nbsp;&nbsp;&nbsp;" id="mentorCheckbox" onChange={(e) => handleInputs(setServices, 'input[name=services]:checked')} />
                    <Form.Check type="checkbox" value="Tutors" name="services" label="Tutor" id="tutorCheckbox" onChange={(e) => handleInputs(setServices, 'input[name=services]:checked')} />
                  </InputGroup>
                  <p id="servicesValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label>What subjects are you available to offer? (Select all that apply)</Form.Label>
                  <InputGroup required hasValidation controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" value="Writing" label="Writing&nbsp;&nbsp;&nbsp;" name="subjects" id="writingCheckbox" onChange={(e) => handleInputs(setSubjects, 'input[name=subjects]:checked')} />
                    <Form.Check type="checkbox" value="Science" label="Science&nbsp;&nbsp;&nbsp;" name="subjects" onChange={(e) => handleInputs(setSubjects, 'input[name=subjects]:checked')} />
                    <Form.Check type="checkbox" value="Math" label="Math&nbsp;&nbsp;&nbsp;" name="subjects" onChange={(e) => handleInputs(setSubjects, 'input[name=subjects]:checked')} />
                    <Form.Check type="checkbox" value="Reading" label="Reading" name="subjects" onChange={(e) => handleInputs(setSubjects, 'input[name=subjects]:checked')} />
                  </InputGroup>
                  <p id="subjectsValidationMsg" className="registrationValidation">&nbsp;</p>

                  <Form.Label>What platform are you available on? (Select all that apply)</Form.Label>
                  <InputGroup required hasValidation controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" value="In-person" label="In-person&nbsp;&nbsp;&nbsp;" name="platforms" id="inPersonCheckbox" onChange={(e) => handleInputs(setPlatforms, 'input[name=platforms]:checked')} />
                    <Form.Check type="checkbox" value="Online" label="Online" name="platforms" onChange={(e) => handleInputs(setPlatforms, 'input[name=platforms]:checked')} />
                  </InputGroup>
                  <p id="platformsValidationMsg" className="registrationValidation">&nbsp;</p>

                  <button className="registerOrgButton" onClick={Push} >
                    Done
                  </button>
                </Form>
              </section>
            </div>
          </div>
        </div>
      </div>

    </div>

  )

}

function closeAddModal() {
  let addModal = document.getElementById("addModal");
  addModal.style.display = "none";
}

window.onclick = function (event) {
  let addModal = document.getElementById("addModal");
  if (event.target == addModal) {

    addModal.style.display = "none";
  }
}

export default Createform;
