import {React} from "react";
import {useParams} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";


// for profile page
function OrgProfilePages(props) {
  // populate profile page with individual organization details that user chooses
  // return formatted profile page component
  // const {id} = useParams();
  let urlParams = useParams();
  let indvOrgID = urlParams.org;
  let org = props.data.filter((orgObj) => {
    return orgObj.orgID == indvOrgID;
  }); 
  org = org[0];


  return (
    <div>
    <div className="org-container">
      <section className="picture">
        <img src={org.picture} alt="org" />
      </section>
      <section className="org-content">
        <section className="orgName">
          <h1>{org.name}</h1>
        </section>
        <h4>{org.city}</h4>
        <h6>{org.institution}</h6>

        <section className="bio-content">
          <div className="bio-title">
            <p>Bio:</p>
            <div className="bio-para">
              <p>{org.bio}</p>
            </div>
          </div>
        </section>
        <div className="orgCard-content3">
          <div className="orgCard-services">
            <p className="orgCard-offerings-titles">Services Available:</p>
            <div className="orgCard-offerings">
              {org.services.map(function(service, i){
                return <p className="orgCard-rCorners">{service}</p>
              })}
            </div>
          </div>
          <div className="orgCard-border"></div>
          <div className="orgCard-subjects">
            <p className="orgCard-offerings-titles">Subjects Available:</p>
            <div className="orgCard-offerings">
              {org.subjects.map(function(subject, i){
                return <p className="orgCard-rCorners">{subject}</p>
              })}
            </div>
          </div>
        </div>
        <section className="org-content">
          <section className="org-contactInfo">
          <br />
            <p>Contact Information:</p>
            <section className="org-contactEmail">
              <p>Email:</p>
              <section className="orgEmail">
              <nobr><a href={"mailto:" + org.email}>{org.email}</a></nobr>
              </section>
            </section>
            <p>Website: <a href={org.url} target="_blank">{org.url}</a></p>
          </section>
        </section>
      </section>
      </div>
      <Link className="hompageButtonLink" to="/">
      <button className="hompageButton">Back to hompage</button>
      </Link>
    </div>
  );
}

export default OrgProfilePages;
