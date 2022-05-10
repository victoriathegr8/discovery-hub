// organization filters
import React, { useState } from 'react';
import './index.css';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

export function Filtering(props) {

  // console.log(props.data);
  // console.log(props.dataCopy);
  
  function HandleFilterInput() {
    let copyData = props.dataCopy;
    props.setCurrentData(copyData); // reset rendered data to default
    let newOrgsState = []; // create new temp set of data to render

    // get all city dropdown options
    let cityFilter = document.getElementById('geographicLocation');
    let cityOptions = [];
    for (let i = 0; i < cityFilter.options.length; i++) {
      cityOptions[i] = cityFilter.options[i].value;
    }

    // get all service, subject, and platform checkbox options
    let serviceOptionElems = document.querySelectorAll('input[name=servicesFilter]');
    let serviceOptions = [];
    for (let i = 0; i < serviceOptionElems.length; i++) {
      serviceOptions.push(serviceOptionElems[i].value)
    }

    let subjectOptionElems = document.querySelectorAll('input[name=subjectsFilter]');
    let subjectOptions = [];
    for (let i = 0; i < subjectOptionElems.length; i++) {
      subjectOptions.push(subjectOptionElems[i].value)
    }
    
    let platformOptionElems = document.querySelectorAll('input[name=platformsFilter]');
    let platformOptions = [];
    for (let i = 0; i < platformOptionElems.length; i++) {
      platformOptions.push(platformOptionElems[i].value)
    }

    // get selected city value
    let selectedCity = document.getElementById('geographicLocation').value;

    // get checked services, subjects, and platforms
    let checkedServices = [];
    let checkedServiceElems = document.querySelectorAll('input[name=servicesFilter]:checked');
    for (let i = 0; i < checkedServiceElems.length; i++) {
      checkedServices.push(checkedServiceElems [i].value)
    }

    let checkedSubjects = [];
    let checkedSubjectElems = document.querySelectorAll('input[name=subjectsFilter]:checked');
    for (let i = 0; i < checkedSubjectElems.length; i++) {
      checkedSubjects.push(checkedSubjectElems[i].value)
    }

    let checkedPlatforms = [];
    let checkedPlatformElems = document.querySelectorAll('input[name=platformsFilter]:checked');
    for (let i = 0; i < checkedPlatformElems.length; i++) {
      checkedPlatforms.push(checkedPlatformElems[i].value)
    }

    // if no services/subjects/platforms are checked, return all orgs that offer
    // a service/subject/platform that we give as a filter option
    // otherwise, return orgs that offer AT LEAST ONE of the services/subjects/platforms checked
    if (checkedServices.length === 0) {
        newOrgsState = copyData.filter((orgObj) => {
        if (orgObj.services.some(r => serviceOptions.includes(r))) return orgObj;
      })
    } else {
      newOrgsState = copyData.filter((orgObj) => {
        if (orgObj.services.some(r => checkedServices.includes(r))) return orgObj;
      })
    }

    if (checkedSubjects.length === 0) {
      newOrgsState = newOrgsState.filter((orgObj) => {
      if (orgObj.subjects.some(r => subjectOptions.includes(r))) return orgObj;
    })
    } else {
    newOrgsState = newOrgsState.filter((orgObj) => {
      if (orgObj.subjects.some(r => checkedSubjects.includes(r))) return orgObj;
    })
    }

    if (checkedPlatforms.length === 0) {
      newOrgsState = newOrgsState.filter((orgObj) => {
      if (orgObj.platform.some(r => platformOptions.includes(r))) return orgObj;
    })
    } else {
      newOrgsState = newOrgsState.filter((orgObj) => {
      if (orgObj.platform.some(r => checkedPlatforms.includes(r))) return orgObj;
    })
    }
    
    // if city dropdown is not default, return orgs that are in the selected city.
    // otherwise, return all orgs that are in cities in the dropdown options
    if (selectedCity != "DEFAULT") {
      newOrgsState = newOrgsState.filter((orgObj) => {
        if (orgObj.city === selectedCity) return orgObj;
      })
    } else {
      newOrgsState = newOrgsState.filter((orgObj) => {
        if (cityOptions.includes(selectedCity)) return orgObj;
      })
    }

    // set rendered data to temp filtered orgs
    if (newOrgsState.length === 0) document.getElementById('no-results-message').innerHTML = "No organizations found matching that criteria";
    else document.getElementById('no-results-message').innerHTML = "";
    props.setCurrentData(newOrgsState);

  }

  return (
    <div className="col-sm-6 col-lg-4 col-xl-3 mb-4 collapse show" id="form-feature">
      <Form >
      <h5 className="filterLabel">Filter by</h5>
        <div className="card">
          <h5 id="Filters" className="card-header mb-2">Geographic Location </h5>
          {/* <FormGroup className="py-3"> */}
        <div className="card-body">
            <Col className="col-md-7 col-lg-8 mb-2">
              <Input className="box" type="select" name="geographicLocation" id="geographicLocation" onChange={HandleFilterInput} >                
              <option value="DEFAULT">Washington Cities</option>
                <option value="Seattle" data-testid="seattleOption">Seattle</option>
                <option value="Spokane">Spokane</option>
                <option value="Tacoma">Tacoma</option>
                <option value="Vancouver">Vancouver</option>
                <option value="Bellevue">Bellevue</option>
                <option value="Kent">Kent</option>
                <option value="Everett">Everett</option>
                <option value="Spokane Valley">Spokane Valley</option>
                <option value="Renton">Renton</option>
                <option value="Kirkland">Kirkland</option>
              </Input>
            </Col>
            </div>
          {/* </FormGroup> */}
        </div>
        <div className="card">
        <h5 id="Filters" className="card-header mb-2">Mentor or Tutor </h5>
          {/* <FormGroup className="py-3"> */}
          <div className="card-body">
            {/* <h5><nobr className="filtertype">Services:</nobr><br /></h5> */}
            <input type="checkbox" name="servicesFilter" defaultValue="Mentor" value={"Mentors"} onClick={HandleFilterInput} />
            <label htmlFor="option1">
              &ensp;Mentor</label><br />
            <input type="checkbox" name="servicesFilter" defaultValue="Tutor" value={"Tutors"} onClick={HandleFilterInput} />
            <label htmlFor="option2">
              &ensp;Tutor</label><br />
            {/* <input type="checkbox" name="option3" defaultValue="Both" value={["Mentors", "Tutors"]} onChange={CheckService} />
            <label htmlFor="option3">
              &ensp;Both</label><br /><br /> */}
              </div>
          {/* </FormGroup> */}
        </div>
        <div className="card" >
        <h5 id="Filters" className="card-header mb-2">Subjects </h5>
          {/* <FormGroup className="py-3" > */}
          <div className="card-body">
            {/* <h5><nobr className="filtertype">Subjects:</nobr><br /></h5> */}
            <input type="checkbox" name="subjectsFilter" defaultValue="Math" value={"Math"} onChange={HandleFilterInput} />
            <label htmlFor="option1">
              &ensp;Math</label><br />
            <input type="checkbox" name="subjectsFilter" defaultValue="Science" value={"Science"} onChange={HandleFilterInput} />
            <label htmlFor="option2">
              &ensp;Science</label><br />
            <input type="checkbox" name="subjectsFilter" defaultValue="Reading" value={"Reading"} onChange={HandleFilterInput} />
            <label htmlFor="option3">
              &ensp;Reading</label><br />
            <input type="checkbox" name="subjectsFilter" defaultValue="Writing" value={"Writing"} onChange={HandleFilterInput} />
            <label htmlFor="option3">
              &ensp;Writing</label><br /><br />
              </div>
          {/* </FormGroup> */}
        </div>
        <div className="card">
        <h5 id="Filters" className="card-header mb-2">Platform </h5>
          {/* <FormGroup className="py-3" > */}
            <div className="card-body">
              {/* <h5><nobr className="filtertype">Platform:</nobr><br /></h5> */}
              <input type="checkbox" name="platformsFilter" defaultValue="In-person" value={"In-person"} onChange={HandleFilterInput} />
              <label htmlFor="option1" >
                &ensp;In person</label><br />
              <input type="checkbox" name="platformsFilter" defaultValue="Online" value={"Online"} onChange={HandleFilterInput} />
              <label htmlFor="option2">
                &ensp;Online</label><br />
              {/* <input type="checkbox" name="option3" defaultValue="Both" /> */}
              {/* <label htmlFor="option3">
                &ensp;Both</label><br /><br /> */}
            </div>
          {/* </FormGroup> */}
        </div>
      </Form>
    </div>
  );
}

export default Filtering;