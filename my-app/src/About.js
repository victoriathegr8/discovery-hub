import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { CardGroup } from 'react-bootstrap';
// Renders 'About' page content

export function About() {
    return (
        <div>
            <Content />
        </div>
    );
}

function Content() {
    return (
        <main className="text-center px-5">
            <div className="about-content">
                <img src="dizzy-education.png" alt="student reading book" />
                <div className="about-row">
                    <h3>Creating Equitable Educational Opportunities for All</h3>
                    <div className="about-info">
                        <h4 className="font-weight-light">Our Envision</h4>
                        <p>We envision that our web application will provide elementary school children with access to education in the form of a marketplace
                            where parents can find organizations that provide tutoring services to assist with their children’s educational needs. Parents
                            will be able to input the educational needs of their children in the form of a survey, and the application will then bring up
                            a list of organizations that have tutors qualified to provide assistance in those areas.</p>
                    </div>
                </div>
                <div className="about-row">
                    <div className="about-info">
                        <h4>Why is this important?</h4>
                        <p>Individuals that are unable to access high quality education often find themselves cut off from opportunities to excel
                            in life. This contributes to an already ongoing poverty cycle, where individuals who cannot receive high quality education
                            are unable to find sustainable careers, and as a result are unable to provide high quality education for their children (Ireland, 2016).</p><p>
                            This disparity is caused by inequality between schools. Schools in higher income areas are able to attract more skilled
                            instructors. This makes the quality of instruction received by children in lower income or rural areas lower than those living in
                            higher income neighborhoods in the city (Hammond,1998). In the US, this usually means that children from minority populations receive
                            lower quality resources as well as larger class sizes.</p>
                            <h4>Meet the Team</h4>
                        <div className="team-row">
                            <div className="team-card">
                                <img className="teamPicture" src="natt.jpg" alt="Natt" />
                                <div className="team-container">
                                <h4><b>Natt Sakulborrirug</b></h4>
                                <h5 className="team-text">Product Manager</h5>
                                {/* <p><b>Major:</b></p> */}
                                <p className="team-bio">Informatics Major - Data Science 
                                Minor in Buisness Administration  </p>
                                <br/>
                                </div>
                                <a href="https://www.linkedin.com/in/natthapat-sakulborrirug/" target="_blank" className="LinkedInButton" >
                                <button  className="LinkedInButton">
                                LinkedIn
                                </button>
                                </a>
                            </div>
                            <div class="team-card">
                                <img className="teamPicturePrecious" src="precious2.png" alt="Precious"/>
                                <div className="team-container">
                                <h4><b>Precious Stowers</b></h4>
                                <h5 className="team-text">Product Designer</h5>
                                {/* <p><b>Major:</b></p> */}
                                <p className="team-bio">Informatics Major - Data Science and Human Computer Interaction
                                Intended Minor in Writing</p>
                                {/* <p className="team-bio">Intended Writing Minor</p> */}
                                </div>
                                <a href="https://www.linkedin.com/in/precious-jane-stowers-a2201119a/" target="_blank" className="LinkedInButton" >
                                <button  className="LinkedInButton">
                                LinkedIn
                                </button>
                                </a>
                            </div>
                            <div class="team-card">
                                <img className="teamPicture" src="victoria.jpg" alt="Victoria" />
                                <div className="team-container">
                                <h4><b>Victoria Nguyen</b></h4>
                                <h5 className="team-text">Developer</h5>
                                {/* <p><b>Major:</b></p> */}
                                <p className="team-bio">Informatics Major - Human Computer Interaction</p>
                                <br/>
                                </div>
                                <a href="https://www.linkedin.com/in/victoriabnguyen/" target="_blank" className="LinkedInButton" >
                                <button  className="LinkedInButton">
                                LinkedIn
                                </button>
                                </a>
                            </div>
                            <div class="team-card">
                                <img className="teamPicture" src="Sneha.jpg" alt="Sneha"  />
                                <div className="team-container">
                                <h4><b>Sneha Reddy</b></h4>
                                <h5 className="team-text">Developer</h5>
                                {/* <p><b>Major:</b></p> */}
                                <p className="team-bio">Informatics Major - Data Science and Human Computer Interaction </p>
                                <br/>
                                </div>
                                <a href="https://www.linkedin.com/in/sneha-reddy-ab190518b/" target="_blank" className="LinkedInButton" >
                                <button  className="LinkedInButton">
                                LinkedIn
                                </button>
                                </a>
                                <br/>
                            {/* </div> */}
                            </div>
                            
                        </div>
                        <Link to="/" className="hompageButtonLink">
                            <button className="hompageButton" >
                                Back to hompage
                            </button>
                        </Link>
                        {/*                   
                        <h5>External Resources:</h5>
                        <p><a href="https://www.brookings.edu/articles/unequal-opportunity-race-and-education/">Unequal Opportunity: Race and Education.</a></p>
                        <p><a href="https://blogs.worldbank.org/education/silent-and-unequal-education-crisis-and-seeds-its-solution">The Costs of Inequality: Education's the One Key That Rules Them All</a></p>
                        <p><a href="https://news.harvard.edu/gazette/story/2016/02/the-costs-of-inequality-educations-the-one-key-that-rules-them-all/">A Silent and Unequal Education Crisis. and the Seeds for Its Solution.</a></p> */}

                    </div>
                </div>
            </div>
        </main>
    );
}

export default About;