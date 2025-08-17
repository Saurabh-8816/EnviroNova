import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="page-header" id="about-header">
        <div className="container">
          <h1>About EnviroNova</h1>
          <p>Leading Environmental Health & Safety Consulting in California</p>
        </div>
      </div>
      
      <div className="page-content" id="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text" id="about-mission">
              <h2>Our Mission</h2>
              <p>
                EnviroNova is dedicated to providing comprehensive Environmental Health and Safety 
                consulting services that help businesses navigate complex regulations while promoting 
                sustainable practices and workplace safety.
              </p>
              
              <h2>Our Expertise</h2>
              <p>
                With over 15 years of experience in the field, our team of certified professionals 
                specializes in environmental compliance, safety management, and regulatory consulting 
                across various industries in California.
              </p>
            </div>
            
            <div className="about-stats" id="about-stats">
              <div className="stat">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 