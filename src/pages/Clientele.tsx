import React from 'react';
import { Link } from 'react-router-dom';
import './Clientele.css';

const Clientele: React.FC = () => {
    return (
        <div className="clientele-page">
            {/* Hero Section with Scattered Photos */}
            <section className="clientele-hero">
                <div className="scattered-photos-container">
                    {/* Left side photos */}
                    <div className="photo-group left-group">
                        <div className="client-photo photo-1">
                            <img src="/team/mem1.jpeg" alt="Client 1" />
                        </div>
                        <div className="client-photo photo-2">
                            <img src="/team/mem2.jpeg" alt="Client 2" />
                        </div>
                        <div className="client-photo photo-3">
                            <img src="/team/mem3.jpeg" alt="Client 3" />
                        </div>
                        <div className="client-photo photo-4">
                            <img src="/team/mem7.jpeg" alt="Client 7" />
                        </div>
                    </div>

                    {/* Center content */}
                    <div className="hero-center-content">
                        <span className="section-badge">Our Clientele</span>
                        <h1 className="hero-title">
                            Trusted by leaders
                            <br />
                            <span className="title-muted">from various industries</span>
                        </h1>
                        <p className="hero-description">
                            Learn why professionals and organizations trust our solutions to
                            achieve their environmental compliance and sustainability goals.
                        </p>
                        <Link to="/contact" className="cta-button">
                            Partner With Us
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right side photos */}
                    <div className="photo-group right-group">
                        <div className="client-photo photo-5">
                            <img src="/team/mem4.jpg" alt="Client 4" />
                        </div>
                        <div className="client-photo photo-6">
                            <img src="/team/mem5.jpeg" alt="Client 5" />
                        </div>
                        <div className="client-photo photo-7">
                            <img src="/team/mem6.png" alt="Client 6" />
                        </div>
                        <div className="client-photo photo-8">
                            <img src="/team/mem8.jpeg" alt="Client 8" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Categories */}
            <section className="client-categories">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Who We Serve</span>
                        <h2 className="section-title">Our Diverse Clientele</h2>
                        <p className="section-subtitle">
                            We proudly serve a wide range of clients across various sectors
                        </p>
                    </div>

                    <div className="categories-grid">
                        <div className="category-card government">
                            <div className="category-icon">🏛️</div>
                            <h3>Government Bodies</h3>
                            <p>State and Central government agencies, pollution control boards, and regulatory authorities</p>
                            <ul className="category-list">
                                <li>State Pollution Control Boards</li>
                                <li>Municipal Corporations</li>
                                <li>Forest Departments</li>
                                <li>Environmental Agencies</li>
                            </ul>
                        </div>

                        <div className="category-card industry">
                            <div className="category-icon">🏭</div>
                            <h3>Industries</h3>
                            <p>Manufacturing units, power plants, mining operations, and industrial complexes</p>
                            <ul className="category-list">
                                <li>Steel & Metal Industries</li>
                                <li>Power Generation Plants</li>
                                <li>Mining Operations</li>
                                <li>Chemical Industries</li>
                            </ul>
                        </div>

                        <div className="category-card academic">
                            <div className="category-icon">🎓</div>
                            <h3>Academic Institutions</h3>
                            <p>Universities, research centers, and educational institutions for collaborative research</p>
                            <ul className="category-list">
                                <li>National Institutes of Technology</li>
                                <li>Research Universities</li>
                                <li>Engineering Colleges</li>
                                <li>Environmental Research Centers</li>
                            </ul>
                        </div>

                        <div className="category-card corporate">
                            <div className="category-icon">🏢</div>
                            <h3>Corporate Sector</h3>
                            <p>Private enterprises seeking environmental compliance and sustainability solutions</p>
                            <ul className="category-list">
                                <li>Large Corporations</li>
                                <li>MSMEs</li>
                                <li>Real Estate Developers</li>
                                <li>Infrastructure Companies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="statistics-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">100+</span>
                            <span className="stat-label">Projects Completed</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">15+</span>
                            <span className="stat-label">Industry Sectors</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Testimonials</span>
                        <h2 className="section-title">What Our Clients Say</h2>
                    </div>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="quote-icon">"</div>
                                <p>EnviroNova's expertise in environmental impact assessment helped us achieve compliance seamlessly. Their team's dedication and knowledge are unmatched.</p>
                            </div>
                            <div className="testimonial-author">
                                <img src="/team/mem1.jpeg" alt="Client" className="author-image" />
                                <div className="author-info">
                                    <span className="author-name">Industry Professional</span>
                                    <span className="author-role">Manufacturing Sector</span>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="quote-icon">"</div>
                                <p>Outstanding support for our environmental monitoring needs. They provided comprehensive solutions that exceeded our expectations.</p>
                            </div>
                            <div className="testimonial-author">
                                <img src="/team/mem2.jpeg" alt="Client" className="author-image" />
                                <div className="author-info">
                                    <span className="author-name">Government Official</span>
                                    <span className="author-role">Environmental Agency</span>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="quote-icon">"</div>
                                <p>Their innovative approach to sustainability consulting has transformed our operations. Highly recommend their services to any organization.</p>
                            </div>
                            <div className="testimonial-author">
                                <img src="/team/mem3.jpeg" alt="Client" className="author-image" />
                                <div className="author-info">
                                    <span className="author-name">Corporate Director</span>
                                    <span className="author-role">Energy Sector</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="clientele-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Join Our Growing List of Satisfied Clients?</h2>
                        <p>Let's discuss how we can help you achieve your environmental goals</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="cta-primary">
                                Get in Touch
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/services" className="cta-secondary">
                                View Our Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Clientele;
