import React, { useState } from 'react';
import './Services.css';

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const serviceCategories = [
    {
      id: 'sustainability',
      title: 'Sustainability Consulting',
      icon: '♻️',
      description: 'Transform your business with sustainable practices and green solutions that reduce environmental impact while improving operational efficiency.',
      services: [
        {
          name: 'Carbon Footprint Assessment',
          description: 'Comprehensive analysis of your organization\'s greenhouse gas emissions with actionable reduction strategies.',
          features: ['GHG Protocol compliance', 'Scope 1, 2, 3 emissions', 'Carbon reduction roadmap', 'Offset recommendations']
        },
        {
          name: 'Green Certification Support',
          description: 'Guidance through LEED, BREEAM, and other green building certification processes.',
          features: ['LEED AP consultation', 'Documentation support', 'Credit optimization', 'Commissioning assistance']
        },
        {
          name: 'Waste Reduction Programs',
          description: 'Develop comprehensive waste management strategies to minimize environmental impact.',
          features: ['Waste stream analysis', 'Circular economy solutions', 'Recycling programs', 'Zero waste strategies']
        },
        {
          name: 'Renewable Energy Planning',
          description: 'Strategic planning for solar, wind, and other renewable energy implementations.',
          features: ['Feasibility studies', 'ROI analysis', 'Technology selection', 'Implementation roadmap']
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Auditing',
      icon: '📋',
      description: 'Ensure regulatory compliance with expert auditing, monitoring, and risk management services tailored to your industry.',
      services: [
        {
          name: 'Environmental Compliance Audits',
          description: 'Comprehensive audits to ensure adherence to environmental regulations and standards.',
          features: ['Regulatory gap analysis', 'Compliance reporting', 'Corrective action plans', 'Ongoing monitoring']
        },
        {
          name: 'Permit Management',
          description: 'Complete permit application, renewal, and compliance management services.',
          features: ['Air quality permits', 'Water discharge permits', 'Waste management permits', 'Renewal tracking']
        },
        {
          name: 'Risk Assessment',
          description: 'Identify and evaluate environmental risks to protect your business and stakeholders.',
          features: ['Environmental site assessments', 'Contamination studies', 'Risk mitigation strategies', 'Insurance support']
        },
        {
          name: 'Regulatory Consulting',
          description: 'Stay ahead of changing regulations with expert guidance and compliance strategies.',
          features: ['Regulatory updates', 'Policy interpretation', 'Compliance strategies', 'Government liaison']
        }
      ]
    },
    {
      id: 'training',
      title: 'Environmental Training',
      icon: '🎓',
      description: 'Comprehensive training programs to build environmental awareness and ensure your team has the knowledge to maintain compliance.',
      services: [
        {
          name: 'Staff Environmental Training',
          description: 'Customized training programs for employees at all levels to build environmental competency.',
          features: ['Role-specific training', 'Interactive workshops', 'Certification programs', 'Progress tracking']
        },
        {
          name: 'Safety Protocol Training',
          description: 'Comprehensive safety training to protect workers and ensure OSHA compliance.',
          features: ['OSHA compliance training', 'Hazard recognition', 'Emergency procedures', 'Safety culture development']
        },
        {
          name: 'Management Systems Training',
          description: 'Train your team on ISO 14001, ISO 45001, and other management system standards.',
          features: ['ISO 14001 implementation', 'Internal auditor training', 'Management review processes', 'Continuous improvement']
        },
        {
          name: 'Best Practices Workshops',
          description: 'Interactive workshops covering industry best practices and emerging trends.',
          features: ['Industry benchmarking', 'Case study analysis', 'Hands-on exercises', 'Networking opportunities']
        }
      ]
    },
    {
      id: 'assessment',
      title: 'Environmental Assessment',
      icon: '🔬',
      description: 'Detailed environmental impact assessments and monitoring services to support informed decision-making.',
      services: [
        {
          name: 'Environmental Impact Assessment',
          description: 'Comprehensive EIA studies for projects requiring environmental clearance.',
          features: ['Baseline studies', 'Impact prediction', 'Mitigation measures', 'Monitoring plans']
        },
        {
          name: 'Air Quality Monitoring',
          description: 'Continuous air quality monitoring and analysis for industrial and urban environments.',
          features: ['Real-time monitoring', 'Pollutant analysis', 'Compliance reporting', 'Trend analysis']
        },
        {
          name: 'Water Quality Testing',
          description: 'Comprehensive water quality testing and analysis for various applications.',
          features: ['Chemical analysis', 'Biological testing', 'Contamination assessment', 'Treatment recommendations']
        },
        {
          name: 'Soil Contamination Studies',
          description: 'Detailed soil analysis and contamination assessment for remediation planning.',
          features: ['Contamination mapping', 'Risk assessment', 'Remediation planning', 'Monitoring protocols']
        }
      ]
    },
    {
      id: 'consulting',
      title: 'Strategic Environmental Consulting',
      icon: '🌱',
      description: 'High-level strategic consulting to integrate environmental considerations into business strategy and operations.',
      services: [
        {
          name: 'Environmental Strategy Development',
          description: 'Develop comprehensive environmental strategies aligned with business objectives.',
          features: ['Strategic planning', 'Goal setting', 'Performance metrics', 'Stakeholder engagement']
        },
        {
          name: 'ESG Reporting',
          description: 'Environmental, Social, and Governance reporting to meet investor and stakeholder expectations.',
          features: ['ESG framework development', 'Data collection systems', 'Report preparation', 'Stakeholder communication']
        },
        {
          name: 'Climate Change Adaptation',
          description: 'Develop strategies to adapt to climate change impacts and build resilience.',
          features: ['Climate risk assessment', 'Adaptation planning', 'Resilience building', 'Scenario planning']
        },
        {
          name: 'Green Supply Chain',
          description: 'Optimize supply chains for environmental performance and sustainability.',
          features: ['Supplier assessment', 'Green procurement', 'Logistics optimization', 'Lifecycle analysis']
        }
      ]
    },
    {
      id: 'technology',
      title: 'Environmental Technology',
      icon: '⚡',
      description: 'Cutting-edge environmental technology solutions to optimize performance and reduce environmental impact.',
      services: [
        {
          name: 'Environmental Monitoring Systems',
          description: 'Advanced monitoring systems for real-time environmental data collection and analysis.',
          features: ['IoT sensors', 'Data analytics', 'Alert systems', 'Remote monitoring']
        },
        {
          name: 'Pollution Control Technology',
          description: 'Design and implementation of advanced pollution control systems.',
          features: ['Air pollution control', 'Water treatment systems', 'Waste minimization', 'Energy recovery']
        },
        {
          name: 'Environmental Software Solutions',
          description: 'Custom software solutions for environmental management and compliance tracking.',
          features: ['Compliance tracking', 'Data management', 'Reporting automation', 'Mobile applications']
        },
        {
          name: 'Green Technology Assessment',
          description: 'Evaluate and implement emerging green technologies for your operations.',
          features: ['Technology screening', 'Feasibility studies', 'Implementation support', 'Performance monitoring']
        }
      ]
    }
  ];

  return (
    <div className="services-page">

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Service Categories</h2>
            <p className="section-subtitle">
              Comprehensive environmental solutions tailored to meet your specific needs and industry requirements
            </p>
          </div>
          
          <div className="services-grid">
            {serviceCategories.map((category) => (
              <div 
                key={category.id} 
                className={`service-category-card ${activeCategory === category.id ? 'expanded' : ''}`}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <h3 className="category-title">{category.title}</h3>
                  <div className="expand-arrow">
                    {activeCategory === category.id ? '−' : '+'}
                  </div>
                </div>
                <p className="category-description">{category.description}</p>
                
                {activeCategory === category.id && (
                  <div className="services-list">
                    {category.services.map((service, index) => (
                      <div key={index} className="service-item">
                        <h4 className="service-name">{service.name}</h4>
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              A proven methodology that ensures successful project delivery and lasting results
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Assessment & Analysis</h3>
              <p>Comprehensive evaluation of your current environmental status, compliance requirements, and improvement opportunities.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Strategy Development</h3>
              <p>Custom strategy development based on your specific needs, industry requirements, and sustainability goals.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Implementation</h3>
              <p>Hands-on implementation support with project management, training, and system deployment.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Monitoring & Optimization</h3>
              <p>Ongoing monitoring, performance tracking, and continuous improvement to ensure long-term success.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;