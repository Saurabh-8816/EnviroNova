import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './TeamMemberDetail.css';

interface TeamMember {
  id: string;
  name: string;
  location: string;
  role: string;
  shortDescription: string;
  fullBio: string;
  image: string;
  email: string;
  expertise: string[];
}

const teamMembersData: TeamMember[] = [
  {
    id: 'rajesh-kumar',
    name: 'Dr. Rajesh Kumar',
    location: 'New Delhi',
    role: 'Founder & CEO',
    shortDescription: 'Leads Environova with over 25 years of experience in environmental engineering and sustainability consulting. Pioneer in water treatment innovations across India.',
    fullBio: 'An visionary leader with a strong track record of delivering transformational impact, Dr. Rajesh Kumar has served a range of clients across industrial, infrastructure, and government sectors, helping them with environmental compliance and sustainable development strategies. He founded Environova with the mission to bridge the gap between industrial growth and environmental stewardship.\n\nWith over 25 years of experience, he has led more than 500 environmental impact assessments and has been instrumental in developing innovative water treatment solutions that have been deployed across major industrial corridors in India. He holds a Ph.D. in Environmental Engineering from IIT Delhi and has published extensively in peer-reviewed journals.',
    image: '/team/mem1.jpeg',
    email: 'rajesh.kumar@environova.com',
    expertise: ['Environmental Engineering', 'Water Treatment', 'Sustainability Strategy', 'Policy Advisory']
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    location: 'Mumbai',
    role: 'Chief Operations Officer',
    shortDescription: 'Oversees operations and project delivery with expertise in environmental compliance and regulatory frameworks. Drives operational excellence across all regions.',
    fullBio: 'Priya Sharma brings over 18 years of experience in operations management and environmental consulting. She has been instrumental in scaling Environova\'s operations across India, establishing robust processes that ensure consistent quality in project delivery.\n\nHer expertise spans environmental compliance, regulatory frameworks, and operational optimization. Prior to joining Environova, she held leadership positions at leading consulting firms where she managed multi-million dollar environmental projects. She is known for her ability to navigate complex regulatory landscapes and build strong client relationships.',
    image: '/team/mem2.jpeg',
    email: 'priya.sharma@environova.com',
    expertise: ['Operations Management', 'Regulatory Compliance', 'Project Delivery', 'Quality Assurance']
  },
  {
    id: 'vikram-mehta',
    name: 'Vikram Mehta',
    location: 'Bengaluru',
    role: 'Technical Director',
    shortDescription: 'Heads the technical division with specialization in EIA studies and environmental auditing. Published researcher in sustainable development practices.',
    fullBio: 'Vikram Mehta is a seasoned environmental professional with deep expertise in Environmental Impact Assessment studies and environmental auditing. As Technical Director, he leads a team of specialists who deliver cutting-edge solutions across diverse sectors.\n\nHe has conducted over 200 EIA studies for projects ranging from industrial facilities to large infrastructure developments. His research on sustainable development practices has been published in leading environmental journals. He holds a Master\'s degree in Environmental Sciences and is a certified environmental auditor.',
    image: '/team/mem3.jpeg',
    email: 'vikram.mehta@environova.com',
    expertise: ['Environmental Impact Assessment', 'Environmental Auditing', 'Technical Consulting', 'Research & Development']
  },
  {
    id: 'ananya-patel',
    name: 'Dr. Ananya Patel',
    location: 'Ahmedabad',
    role: 'Head of Research',
    shortDescription: 'Leads research initiatives and innovation in environmental sciences. Expert in air quality management and pollution control technologies.',
    fullBio: 'Dr. Ananya Patel leads Environova\'s research division, driving innovation in environmental monitoring and pollution control technologies. Her work has contributed to the development of several proprietary methodologies used in air quality assessments.\n\nWith a Ph.D. in Atmospheric Sciences, she has over 15 years of experience in environmental research. She has led multiple government-funded research projects and has been a key contributor to national air quality monitoring frameworks. Her expertise is sought after by regulatory bodies and industry associations alike.',
    image: '/team/mem4.jpg',
    email: 'ananya.patel@environova.com',
    expertise: ['Air Quality Management', 'Pollution Control', 'Environmental Research', 'Technology Innovation']
  },
  {
    id: 'suresh-reddy',
    name: 'Suresh Reddy',
    location: 'Hyderabad',
    role: 'Senior Project Manager',
    shortDescription: 'Manages large-scale environmental projects with focus on water resource management and industrial effluent treatment solutions.',
    fullBio: 'Suresh Reddy is a dynamic project manager with extensive experience in water resource management and industrial effluent treatment. He has successfully delivered over 100 projects across pharmaceutical, chemical, and manufacturing sectors.\n\nHis hands-on approach and deep technical knowledge enable him to tackle complex environmental challenges effectively. He specializes in designing and implementing effluent treatment systems that not only meet regulatory requirements but also optimize resource utilization.',
    image: '/team/mem5.jpeg',
    email: 'suresh.reddy@environova.com',
    expertise: ['Water Resource Management', 'Effluent Treatment', 'Project Management', 'Industrial Solutions']
  },
  {
    id: 'meera-krishnan',
    name: 'Meera Krishnan',
    location: 'Chennai',
    role: 'Compliance Director',
    shortDescription: 'Ensures regulatory compliance and environmental clearances. Expert in navigating complex environmental regulations and policy frameworks.',
    fullBio: 'Meera Krishnan is an expert in environmental regulatory compliance with over 20 years of experience. She has guided numerous organizations through complex environmental clearance processes and helped them achieve and maintain compliance.\n\nHer deep understanding of environmental laws and regulations, coupled with strong relationships with regulatory bodies, makes her invaluable in navigating the compliance landscape. She has been instrumental in securing environmental clearances for major infrastructure and industrial projects.',
    image: '/team/mem6.png',
    email: 'meera.krishnan@environova.com',
    expertise: ['Regulatory Compliance', 'Environmental Clearances', 'Policy Frameworks', 'Legal Advisory']
  },
  {
    id: 'amit-saxena',
    name: 'Amit Saxena',
    location: 'Gurugram',
    role: 'Business Development Head',
    shortDescription: 'Drives business growth and strategic partnerships. Leads client engagement across industrial, infrastructure, and government sectors.',
    fullBio: 'Amit Saxena leads business development at Environova, building strategic partnerships and expanding the company\'s presence across sectors. His client-centric approach has been key to establishing long-term relationships with major corporations and government bodies.\n\nWith 16 years of experience in environmental consulting sales, he has a proven track record of identifying opportunities and converting them into successful engagements. He is known for understanding client needs deeply and crafting solutions that deliver real value.',
    image: '/team/mem7.jpeg',
    email: 'amit.saxena@environova.com',
    expertise: ['Business Development', 'Strategic Partnerships', 'Client Relations', 'Market Expansion']
  },
  {
    id: 'kavita-joshi',
    name: 'Dr. Kavita Joshi',
    location: 'Pune',
    role: 'Environmental Scientist',
    shortDescription: 'Specializes in ecological impact assessments and biodiversity conservation. PhD in Environmental Sciences with focus on sustainable ecosystems.',
    fullBio: 'Dr. Kavita Joshi is a distinguished environmental scientist specializing in ecological impact assessments and biodiversity conservation. Her work has been crucial in protecting sensitive ecosystems while enabling sustainable development.\n\nHolding a Ph.D. in Environmental Sciences from Pune University, she has conducted ecological studies across diverse habitats, from Western Ghats to coastal ecosystems. Her expertise in species identification and habitat assessment is widely recognized in the environmental community.',
    image: '/team/mem8.jpeg',
    email: 'kavita.joshi@environova.com',
    expertise: ['Ecological Assessment', 'Biodiversity Conservation', 'Habitat Studies', 'Sustainable Ecosystems']
  },
  {
    id: 'rahul-verma',
    name: 'Rahul Verma',
    location: 'Kolkata',
    role: 'Safety & Training Lead',
    shortDescription: 'Heads safety training programs and occupational health initiatives. Certified trainer in environmental health and workplace safety standards.',
    fullBio: 'Rahul Verma leads Environova\'s safety training and capacity building initiatives. He has trained thousands of professionals in environmental health and workplace safety through customized programs designed for various industries.\n\nAs a certified trainer with over 12 years of experience, he has developed comprehensive training modules that combine theoretical knowledge with practical applications. His programs have significantly improved safety records at client facilities across manufacturing, chemical, and construction sectors.',
    image: '/team/mem9.jpeg',
    email: 'rahul.verma@environova.com',
    expertise: ['Safety Training', 'Occupational Health', 'Capacity Building', 'Workplace Safety']
  }
];

const TeamMemberDetail: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();

  const member = teamMembersData.find(m => m.id === memberId);

  if (!member) {
    return (
      <div className="member-not-found">
        <h2>Team Member Not Found</h2>
        <p>The requested team member could not be found.</p>
        <Link to="/about/team" className="back-link">
          ← Back to Our People
        </Link>
      </div>
    );
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${member.email}`;
  };

  return (
    <div className="member-detail-page">
      {/* Hero Section */}
      <section className="member-hero">
        <div className="member-hero-image">
          <img 
            src={member.image} 
            alt={member.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=1a5f2a&color=fff&bold=true`;
            }}
          />
        </div>
        <div className="member-hero-content">
          <Link to="/about/team" className="back-to-team">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Our People
          </Link>
          
          <h1 className="member-name">{member.name}</h1>
          <p className="member-role-location">
            <span className="member-role">{member.role},</span>
            <span className="member-location">{member.location}</span>
          </p>
          
          <p className="member-short-desc">{member.shortDescription}</p>
          
          <button className="member-contact-btn" onClick={handleEmailClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            Contact
          </button>
        </div>
        <div className="member-hero-gradient"></div>
      </section>

      {/* Bio Section */}
      <section className="member-bio-section">
        <div className="member-bio-container">
          <div className="member-bio-main">
            <div className="member-bio-divider"></div>
            <h2 className="member-bio-heading">ABOUT {member.name.split(' ')[0].toUpperCase()}</h2>
            <div className="member-bio-content">
              {member.fullBio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <aside className="member-sidebar">
            <button className="sidebar-cta-btn" onClick={handleEmailClick}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              Get in touch
            </button>
            
            <div className="sidebar-expertise">
              <h3>EXPERTISE</h3>
              <ul>
                {member.expertise.map((skill, index) => (
                  <li key={index}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Team Members */}
      <section className="member-related-section">
        <div className="member-related-container">
          <h2>More from Our Team</h2>
          <div className="member-related-grid">
            {teamMembersData
              .filter(m => m.id !== member.id)
              .slice(0, 3)
              .map((relatedMember) => (
                <div 
                  key={relatedMember.id} 
                  className="related-member-card"
                  onClick={() => navigate(`/about/team/${relatedMember.id}`)}
                >
                  <div className="related-member-image">
                    <img 
                      src={relatedMember.image} 
                      alt={relatedMember.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(relatedMember.name)}&size=150&background=1a5f2a&color=fff&bold=true`;
                      }}
                    />
                  </div>
                  <h4>{relatedMember.name}</h4>
                  <p>{relatedMember.role}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamMemberDetail;
