import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const services = [
    {
      title: "Sustainability Consulting",
      description: "Transform your business with sustainable practices and green solutions",
      icon: "♻️",
      features: ["Carbon Footprint", "Green Certification", "Waste Reduction"]
    },
    {
      title: "Compliance & Auditing",
      description: "Ensure regulatory compliance with expert auditing and monitoring",
      icon: "📋",
      features: ["Regulatory Review", "Compliance Audits", "Risk Management"]
    },
    {
      title: "Environmental Training",
      description: "Comprehensive training programs for environmental awareness",
      icon: "🎓",
      features: ["Staff Training", "Safety Protocols", "Best Practices"]
    }
  ];

  return (
    <div className="home">
      {/* Dynamic Hero Section */}
      <section className="modern-hero">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
        
        <div className="hero-container">
          <div className={`hero-content ${isVisible ? 'animate-in' : ''}`}>
            <div className="hero-badge">
              <span className="badge-text">🌿 NIT Raipur Environmental Initiative</span>
            </div>
            
            <h1 className="hero-title">
              Transforming Tomorrow Through
              <span className="gradient-text"> Sustainable Innovation</span>
            </h1>
            
            <p className="hero-subtitle">
              Leading environmental consulting services that bridge the gap between 
              business growth and ecological responsibility. Join us in creating a 
              sustainable future for generations to come.
            </p>
            
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => navigate('/contact')}>
                <span>Start Your Journey</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="secondary-cta" onClick={() => navigate('/about')}>
                <span>Learn More</span>
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="card card-1">
                <div className="card-icon">🌱</div>
                <div className="card-text">Eco-Friendly Solutions</div>
              </div>
              <div className="card card-2">
                <div className="card-icon">📊</div>
                <div className="card-text">Data-Driven Insights</div>
              </div>
              <div className="card card-3">
                <div className="card-icon">🎯</div>
                <div className="card-text">Targeted Results</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility & Certifications */}
      <section className="credibility-section">
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

      {/* Services Showcase */}
      <section className="services-showcase">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Expertise</h2>
            <p className="section-subtitle">
              Comprehensive environmental solutions tailored to your business needs
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="service-cta" onClick={() => navigate('/services')}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make an Impact?</h2>
            <p className="cta-description">
              Join hundreds of organizations already transforming their environmental footprint
            </p>
            <div className="cta-actions">
              <button className="cta-primary" onClick={() => navigate('/contact')}>
                Get Started Today
              </button>
              <button className="cta-secondary" onClick={() => navigate('/projects')}>
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 