import React, { useState } from 'react';
import './Contact.css';

const GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbw_gOczPF6AUjpUBH6UF-3siSMYG25nJWVoHXGjiYwYzMBPdy164mo5gX9oVrCYoCTc/exec';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      ...formData,
      pageUrl: window.location.href,
      userAgent: navigator.userAgent
    };

    try {
      // Prefer a CORS request (lets us read the JSON response). If CORS is not enabled
      // on the Apps Script deployment, we'll fall back to a `no-cors` fire-and-forget.
      const res = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          // Use a simple content-type to reduce preflight/CORS issues.
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // Apps Script typically returns JSON; if it doesn't, we still treat 2xx as success.
        try {
          const data = (await res.json()) as { ok?: boolean; error?: string };
          if (data?.ok === false) throw new Error(data.error || 'Submission failed.');
        } catch {
          // ignore parse errors
        }
      } else {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status}).`);
      }

      alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (err) {
      // If your Apps Script web app doesn’t allow CORS, browsers will block reading the response.
      // Fallback: send with no-cors (request still goes through), then show success.
      try {
        await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
        alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      } catch (fallbackErr) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setSubmitError(message);
        alert(`Sorry — we couldn't submit the form. ${message}`);
        console.error('Contact form submission failed:', err, fallbackErr);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetDirections = () => {
    const coordinates = "21.2497,81.6050";
    const address = "NIT Raipur Campus, G.E. Road, Raipur, Chhattisgarh 492010";
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&destination_place_id=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleMethodAction = (action: string, method: any) => {
    switch (action) {
      case "Get Directions":
        handleGetDirections();
        break;
      case "Call Now":
        window.open(`tel:${method.details[0]}`, '_self');
        break;
      case "Send Email":
        window.open(`mailto:${method.details[0]}`, '_self');
        break;
      default:
        break;
    }
  };

  const contactMethods = [
    {
      title: "Visit Our Office",
      description: "Drop by for a coffee and discuss your environmental projects",
      icon: "🏢",
      details: ["NIT Raipur Campus", "G.E. Road, Raipur, Chhattisgarh 492010"],
      action: "Get Directions"
    },
    {
      title: "Call Us Direct",
      description: "Speak with our environmental consultants immediately",
      icon: "📞",
      details: ["(415) 883-7575", "Mon-Fri: 9AM-6PM PST"],
      action: "Call Now"
    },
    {
      title: "Email Support",
      description: "Send us detailed project requirements and documentation",
      icon: "✉️",
      details: ["info@environova.com", "Response within 4 hours"],
      action: "Send Email"
    }
  ];

  return (
    <div className="contact-page">
      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <h2>Choose Your Preferred Way to Connect</h2>
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className={`method-card ${activeCard === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <div className="method-details">
                  {method.details.map((detail, idx) => (
                    <span key={idx} className="detail-item">{detail}</span>
                  ))}
                </div>
                <button 
                  className="method-action"
                  onClick={() => handleMethodAction(method.action, method)}
                >
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Start Your Environmental Journey</h2>
              <p>Tell us about your project and we'll provide a customized solution</p>
            </div>
            
            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-row">
                <div className="input-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                  />
                  <label htmlFor="name">Full Name *</label>
                  <div className="input-highlight"></div>
                </div>
                
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                  />
                  <label htmlFor="email">Email Address *</label>
                  <div className="input-highlight"></div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                  />
                  <label htmlFor="phone">Phone Number *</label>
                  <div className="input-highlight"></div>
                </div>
                
                <div className="input-group">
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="company">Company/Organization</label>
                  <div className="input-highlight"></div>
                </div>
              </div>

              <div className="input-group">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Project Type</option>
                  <option value="environmental-assessment">Environmental Impact Assessment</option>
                  <option value="sustainability-consulting">Sustainability Consulting</option>
                  <option value="waste-management">Waste Management Solutions</option>
                  <option value="renewable-energy">Renewable Energy Projects</option>
                  <option value="compliance-audit">Environmental Compliance Audit</option>
                  <option value="other">Other Services</option>
                </select>
                <label htmlFor="subject">Project Type *</label>
              </div>

              <div className="input-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder=" "
                />
                <label htmlFor="message">Project Details & Requirements</label>
                <div className="input-highlight"></div>
              </div>

              <button type="submit" className="submit-button">
                <span>{isSubmitting ? 'Sending…' : 'Send My Request'}</span>
                <div className="button-ripple"></div>
              </button>

              {submitError && (
                <div role="alert" style={{ marginTop: '12px' }}>
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="interactive-map">
        <div className="map-background-effects">
          <div className="floating-icon icon-1">🌍</div>
          <div className="floating-icon icon-2">🌱</div>
          <div className="floating-icon icon-3">♻️</div>
          <div className="floating-icon icon-4">🌿</div>
          <div className="floating-icon icon-5">🔋</div>
          <div className="floating-icon icon-6">💧</div>
        </div>
        <div className="map-header">
          <div className="location-badge">
            <span className="badge-pulse"></span>
            <span className="badge-text">📍 We're Here</span>
          </div>
          <h2>Find Us on the Map</h2>
          <p>Located at National Institute of Technology Raipur</p>
          <div className="map-stats">
            <div className="map-stat">
              <div className="stat-icon">🚗</div>
              <span>15 min from city center</span>
            </div>
            <div className="map-stat">
              <div className="stat-icon">🅿️</div>
              <span>Free parking available</span>
            </div>
            <div className="map-stat">
              <div className="stat-icon">🚌</div>
              <span>Public transport nearby</span>
            </div>
          </div>
        </div>
        <div className="map-container">
          <div className="map-frame">
            <iframe
              src="https://maps.google.com/maps?q=21.2497,81.6050&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NIT Raipur Location"
            />
          </div>
          <div className="map-overlay">
            <div className="office-info">
              <div className="office-header">
                <div className="office-avatar">🏢</div>
                <div className="office-status">
                  <span className="status-dot"></span>
                  <span>Open Now</span>
                </div>
              </div>
              <h3>🌿 Environova Office</h3>
              <div className="office-details">
                <div className="detail-row">
                  <span className="detail-icon">📍</span>
                  <span>NIT Raipur Campus</span>
                </div>
                <div className="detail-row">
                  <span className="detail-icon">🏠</span>
                  <span>G.E. Road, Raipur, Chhattisgarh 492010</span>
                </div>
                <div className="detail-row">
                  <span className="detail-icon">🕒</span>
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
              <div className="office-actions">
                <button 
                  className="directions-btn primary"
                  onClick={handleGetDirections}
                >
                  <span className="btn-icon">🧭</span>
                  Get Directions
                </button>
                <button className="directions-btn secondary">
                  <span className="btn-icon">📞</span>
                  Call Office
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 