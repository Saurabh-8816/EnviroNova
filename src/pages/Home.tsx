import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate('/contact');
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section id="home-hero" className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              An project on Environment made for Business NITRR
            </h1>
            <button className="cta-button" onClick={handleAppointmentClick}>
              Make An Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section id="home-credibility" className="credibility-section">
        <div className="container">
          <div className="credibility-content">
            <h2 className="section-title">Our Credibility & Certifications</h2>
            <p className="credibility-text">
              Recognized and certified by leading environmental and quality standards organizations
            </p>
            <div className="credentials-grid">
              <div className="credential-item">
                <img src="/Cert1.jpg" alt="Environmental Certification 1" className="credential-image" />
                <h4>Environmental Excellence</h4>
              </div>
              <div className="credential-item">
                <img src="/Cert2.jpg" alt="Environmental Certification 2" className="credential-image" />
                <h4>Safety Standards</h4>
              </div>
              <div className="credential-item">
                <img src="/Cert3.jpg" alt="Environmental Certification 3" className="credential-image" />
                <h4>Quality Assurance</h4>
              </div>
              <div className="credential-item">
                <img src="/Cert4.jpg" alt="Environmental Certification 4" className="credential-image" />
                <h4>Compliance Certified</h4>
              </div>
              <div className="credential-item">
                <img src="/logo_9001.png" alt="ISO 9001 Certification" className="credential-image" />
                <h4>ISO 9001 Certified</h4>
              </div>
              <div className="credential-item">
                <img src="/logo_14001.png" alt="ISO 14001 Certification" className="credential-image" />
                <h4>ISO 14001 Certified</h4>
              </div>
            </div>
            <div className="credentials-footer">
              <button className="see-more-link" onClick={() => navigate('/certifications')}>
                Want to see more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="home-services" className="services-preview">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Environmental Compliance</h3>
              <p>Navigate complex environmental regulations with our expert guidance.</p>
            </div>
            <div className="service-card">
              <h3>Safety Training</h3>
              <p>Comprehensive safety training programs for your workforce.</p>
            </div>
            <div className="service-card">
              <h3>Risk Assessment</h3>
              <p>Identify and mitigate potential environmental and safety risks.</p>
            </div>
            <div className="service-card">
              <h3>Audit Services</h3>
              <p>Thorough compliance audits and corrective action planning.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 