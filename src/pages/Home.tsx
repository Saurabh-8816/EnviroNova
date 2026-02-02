import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const certificates = [
    {
      id: 1,
      title: "Environmental Excellence",
      image: "/Cert1.jpg",
      alt: "Environmental Certification 1",
      description: "Certified for outstanding environmental management and sustainable practices.",
      issuer: "Environmental Standards Authority",
      validUntil: "2025-12-31"
    },
    {
      id: 2,
      title: "Safety Standards",
      image: "/Cert2.jpg",
      alt: "Environmental Certification 2",
      description: "Recognized for maintaining the highest safety standards in environmental operations.",
      issuer: "Safety Compliance Board",
      validUntil: "2025-10-15"
    },
    {
      id: 3,
      title: "Quality Assurance",
      image: "/Cert3.jpg",
      alt: "Environmental Certification 3",
      description: "Awarded for exceptional quality assurance in environmental consulting services.",
      issuer: "Quality Standards Institute",
      validUntil: "2026-03-20"
    },
    {
      id: 4,
      title: "Compliance Certified",
      image: "/Cert4.jpg",
      alt: "Environmental Certification 4",
      description: "Certified for full compliance with environmental regulations and standards.",
      issuer: "Regulatory Compliance Authority",
      validUntil: "2025-08-30"
    },
    {
      id: 5,
      title: "ISO 9001 Certified",
      image: "/logo_9001.png",
      alt: "ISO 9001 Certification",
      description: "International standard for quality management systems certification.",
      issuer: "International Organization for Standardization",
      validUntil: "2026-01-15"
    },
    {
      id: 6,
      title: "ISO 14001 Certified",
      image: "/logo_14001.png",
      alt: "ISO 14001 Certification",
      description: "International standard for environmental management systems certification.",
      issuer: "International Organization for Standardization",
      validUntil: "2026-01-15"
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
          
          {/* 3D Spline Visual */}
          <div className="hero-visual">
            <div 
              className="spline-container"
              dangerouslySetInnerHTML={{
                __html: `<spline-viewer url="https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode"></spline-viewer>`
              }}
            />
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
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="credential-item clickable"
                  onClick={() => {
                    setSelectedCertificate(cert);
                    setIsModalOpen(true);
                  }}
                >
                  <img src={cert.image} alt={cert.alt} className="credential-image" />
                  <h4>{cert.title}</h4>
                </div>
              ))}
            </div>
            <div className="credentials-footer">
              <button className="see-more-link" onClick={() => navigate('/certifications')}>
                Want to see more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - McKinsey Style */}
      <section className="vision-section">
        <div className="vision-container">
          <div className="vision-content">
            <h2>Building Tomorrow's Sustainable Future</h2>
            <p>
              There's consulting. Then there's consulting that reimagines and transforms 
              organizations - powered by expertise, built with innovation, and proven to 
              create lasting environmental impact.
            </p>
            <a href="/contact" className="vision-cta">
              Get started <span className="arrow">→</span>
            </a>
          </div>
          <div className="vision-image">
            <img src="/TeamCollab.jpg" alt="Team collaboration" />
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
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">♻️</div>
                <h3 className="category-title">Sustainability Consulting</h3>
              </div>
              <p className="category-description">Transform your business with sustainable practices and green solutions that reduce environmental impact while improving operational efficiency.</p>
            </div>
            
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">📋</div>
                <h3 className="category-title">Compliance & Auditing</h3>
              </div>
              <p className="category-description">Ensure regulatory compliance with expert auditing, monitoring, and risk management services tailored to your industry.</p>
            </div>
            
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">🎓</div>
                <h3 className="category-title">Environmental Training</h3>
              </div>
              <p className="category-description">Comprehensive training programs to build environmental awareness and ensure your team has the knowledge to maintain compliance.</p>
            </div>
            
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">🔬</div>
                <h3 className="category-title">Environmental Assessment</h3>
              </div>
              <p className="category-description">Detailed environmental impact assessments and monitoring services to support informed decision-making.</p>
            </div>
            
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">🌱</div>
                <h3 className="category-title">Strategic Environmental Consulting</h3>
              </div>
              <p className="category-description">High-level strategic consulting to integrate environmental considerations into business strategy and operations.</p>
            </div>
            
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">⚡</div>
                <h3 className="category-title">Environmental Technology</h3>
              </div>
              <p className="category-description">Cutting-edge environmental technology solutions to optimize performance and reduce environmental impact.</p>
            </div>
            
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">🌊</div>
                <h3 className="category-title">Water & Wastewater Management</h3>
              </div>
              <p className="category-description">Comprehensive water resource management, treatment solutions, and wastewater optimization for sustainable operations.</p>
            </div>
            
            <div className="service-category-card">
              <div className="category-header">
                <div className="category-icon">🏭</div>
                <h3 className="category-title">Industrial Environmental Solutions</h3>
              </div>
              <p className="category-description">Specialized environmental solutions for industrial facilities including emission control, waste management, and process optimization.</p>
            </div>
          </div>
          
          <div className="services-cta-section">
            <button className="services-learn-more-btn" onClick={() => navigate('/services')}>
              <span>Explore All Our Services</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
        </div>
      </section>

      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div className="modal-header">
              <h2>{selectedCertificate.title}</h2>
            </div>
            <div className="modal-body">
              <div className="certificate-image-container">
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.alt} 
                  className="certificate-modal-image"
                />
              </div>
              <div className="certificate-details">
                <p className="certificate-description">{selectedCertificate.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 