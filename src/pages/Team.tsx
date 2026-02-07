import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Team.css';

interface TeamMember {
  id: string;
  name: string;
  location: string;
  role: string;
  description: string;
  image: string;
  email: string;
}

const Team: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers: TeamMember[] = [
    {
      id: 'rajesh-kumar',
      name: 'Dr. Rajesh Kumar',
      location: 'New Delhi',
      role: 'Founder & CEO',
      description: 'Leads Environova with over 25 years of experience in environmental engineering and sustainability consulting. Pioneer in water treatment innovations across India.',
      image: '/team/mem1.jpeg',
      email: 'rajesh.kumar@environova.com'
    },
    {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      location: 'Mumbai',
      role: 'Chief Operations Officer',
      description: 'Oversees operations and project delivery with expertise in environmental compliance and regulatory frameworks. Drives operational excellence across all regions.',
      image: '/team/mem2.jpeg',
      email: 'priya.sharma@environova.com'
    },
    {
      id: 'vikram-mehta',
      name: 'Vikram Mehta',
      location: 'Bengaluru',
      role: 'Technical Director',
      description: 'Heads the technical division with specialization in EIA studies and environmental auditing. Published researcher in sustainable development practices.',
      image: '/team/mem3.jpeg',
      email: 'vikram.mehta@environova.com'
    },
    {
      id: 'ananya-patel',
      name: 'Dr. Ananya Patel',
      location: 'Ahmedabad',
      role: 'Head of Research',
      description: 'Leads research initiatives and innovation in environmental sciences. Expert in air quality management and pollution control technologies.',
      image: '/team/mem4.jpg',
      email: 'ananya.patel@environova.com'
    },
    {
      id: 'suresh-reddy',
      name: 'Suresh Reddy',
      location: 'Hyderabad',
      role: 'Senior Project Manager',
      description: 'Manages large-scale environmental projects with focus on water resource management and industrial effluent treatment solutions.',
      image: '/team/mem5.jpeg',
      email: 'suresh.reddy@environova.com'
    },
    {
      id: 'meera-krishnan',
      name: 'Meera Krishnan',
      location: 'Chennai',
      role: 'Compliance Director',
      description: 'Ensures regulatory compliance and environmental clearances. Expert in navigating complex environmental regulations and policy frameworks.',
      image: '/team/mem6.png',
      email: 'meera.krishnan@environova.com'
    },
    {
      id: 'amit-saxena',
      name: 'Amit Saxena',
      location: 'Gurugram',
      role: 'Business Development Head',
      description: 'Drives business growth and strategic partnerships. Leads client engagement across industrial, infrastructure, and government sectors.',
      image: '/team/mem7.jpeg',
      email: 'amit.saxena@environova.com'
    },
    {
      id: 'kavita-joshi',
      name: 'Dr. Kavita Joshi',
      location: 'Pune',
      role: 'Environmental Scientist',
      description: 'Specializes in ecological impact assessments and biodiversity conservation. PhD in Environmental Sciences with focus on sustainable ecosystems.',
      image: '/team/mem8.jpeg',
      email: 'kavita.joshi@environova.com'
    },
    {
      id: 'rahul-verma',
      name: 'Rahul Verma',
      location: 'Kolkata',
      role: 'Safety & Training Lead',
      description: 'Heads safety training programs and occupational health initiatives. Certified trainer in environmental health and workplace safety standards.',
      image: '/team/mem9.jpeg',
      email: 'rahul.verma@environova.com'
    }
  ];

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/about/team/${memberId}`);
  };

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-content">
          <h1>Our Team</h1>
          <p>Meet the experts driving environmental excellence and sustainable solutions</p>
        </div>
        <div className="team-hero-pattern"></div>
      </section>

      {/* Team Introduction */}
      <section className="team-intro">
        <div className="team-intro-container">
          <h2>Leadership & Experts</h2>
          <p>
            Our team brings together diverse expertise in environmental engineering, 
            regulatory compliance, and sustainable development. With decades of combined 
            experience, we deliver innovative solutions that protect our environment 
            and drive positive change.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-grid-section">
        <div className="team-grid-container">
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="team-card"
                onClick={() => handleMemberClick(member.id)}
              >
                <div className="team-card-image-wrapper">
                  <div className="team-card-image">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=1a5f2a&color=fff&bold=true`;
                      }}
                    />
                  </div>
                </div>
                <div className="team-card-content">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-location">{member.location}</p>
                  <p className="team-card-description">{member.description}</p>
                  <button 
                    className="team-card-email-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmailClick(member.email);
                    }}
                    aria-label={`Email ${member.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="team-cta">
        <div className="team-cta-container">
          <h2>Join Our Team</h2>
          <p>
            We're always looking for talented individuals passionate about 
            environmental sustainability and making a positive impact.
          </p>
          <a href="/careers" className="team-cta-button">
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;
