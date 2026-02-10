import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Publications.css';

// Publication data
const publications = [
    {
        id: 1,
        type: 'RESEARCH',
        date: 'February 6, 2026',
        title: 'Environmental Impact Assessment: Best Practices',
        image: '/img1.jpg',
        hasVideo: true,
        category: 'Environmental Assessment',
        industry: 'All Industries'
    },
    {
        id: 2,
        type: 'ARTICLE',
        date: 'January 28, 2026',
        title: 'Sustainable Development Goals and Corporate Responsibility',
        image: '/img2.jpg',
        hasVideo: false,
        category: 'Sustainability',
        industry: 'Corporate'
    },
    {
        id: 3,
        type: 'VIDEO',
        date: 'January 20, 2026',
        title: 'Air Quality Monitoring: Innovations and Trends',
        image: '/img3.jpg',
        hasVideo: true,
        category: 'Air Quality',
        industry: 'Industrial'
    },
    {
        id: 4,
        type: 'REPORT',
        date: 'January 15, 2026',
        title: 'Water Resource Management in Industrial Zones',
        image: '/img4.jpg',
        hasVideo: false,
        category: 'Water Resources',
        industry: 'Industrial'
    },
    {
        id: 5,
        type: 'VIDEO',
        date: 'January 10, 2026',
        title: 'Climate Change Mitigation Strategies for Industries',
        image: '/img5.jpg',
        hasVideo: true,
        category: 'Climate Change',
        industry: 'All Industries'
    },
    {
        id: 6,
        type: 'RESEARCH',
        date: 'January 5, 2026',
        title: 'Biodiversity Conservation in Mining Regions',
        image: '/img7.jpg',
        hasVideo: false,
        category: 'Biodiversity',
        industry: 'Mining'
    },
    {
        id: 7,
        type: 'ARTICLE',
        date: 'December 28, 2025',
        title: 'Waste Management Solutions for Smart Cities',
        image: '/img8.jpg',
        hasVideo: true,
        category: 'Waste Management',
        industry: 'Municipal'
    },
    {
        id: 8,
        type: 'REPORT',
        date: 'December 20, 2025',
        title: 'Renewable Energy Integration in Manufacturing',
        image: '/img9.jpg',
        hasVideo: false,
        category: 'Renewable Energy',
        industry: 'Manufacturing'
    },
];

const topics = ['All Topics', 'Environmental Assessment', 'Sustainability', 'Air Quality', 'Water Resources', 'Climate Change', 'Biodiversity', 'Waste Management', 'Renewable Energy'];
const capabilities = ['All Capabilities', 'Research', 'Consulting', 'Training', 'Monitoring', 'Compliance'];
const industries = ['All Industries', 'Industrial', 'Corporate', 'Mining', 'Municipal', 'Manufacturing', 'Power'];

const Publications: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState('All Topics');
    const [selectedCapability, setSelectedCapability] = useState('All Capabilities');
    const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
    const [topicOpen, setTopicOpen] = useState(false);
    const [capabilityOpen, setCapabilityOpen] = useState(false);
    const [industryOpen, setIndustryOpen] = useState(false);

    const filteredPublications = publications.filter(pub => {
        const topicMatch = selectedTopic === 'All Topics' || pub.category === selectedTopic;
        const industryMatch = selectedIndustry === 'All Industries' || pub.industry === selectedIndustry;
        return topicMatch && industryMatch;
    });

    return (
        <div className="publications-page">
            {/* Hero Section */}
            <section className="publications-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Featured Insights and<br />
                        Perspectives from EnviroNova
                    </h1>
                    <p className="hero-description">
                        <strong>The latest insights, ideas, and perspectives from EnviroNova.</strong>{' '}
                        Explore a cross-section of up-to-date content on the trends shaping the future of environmental sustainability and compliance.
                    </p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-row">
                        {/* Topic Filter */}
                        <div className="filter-dropdown">
                            <button
                                className={`filter-button ${topicOpen ? 'open' : ''}`}
                                onClick={() => {
                                    setTopicOpen(!topicOpen);
                                    setCapabilityOpen(false);
                                    setIndustryOpen(false);
                                }}
                            >
                                <span>{selectedTopic === 'All Topics' ? 'Featured Topics' : selectedTopic}</span>
                                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                            {topicOpen && (
                                <div className="dropdown-menu">
                                    {topics.map(topic => (
                                        <button
                                            key={topic}
                                            className={`dropdown-item ${selectedTopic === topic ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedTopic(topic);
                                                setTopicOpen(false);
                                            }}
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Capability Filter */}
                        <div className="filter-dropdown">
                            <button
                                className={`filter-button ${capabilityOpen ? 'open' : ''}`}
                                onClick={() => {
                                    setCapabilityOpen(!capabilityOpen);
                                    setTopicOpen(false);
                                    setIndustryOpen(false);
                                }}
                            >
                                <span>{selectedCapability === 'All Capabilities' ? 'Capabilities' : selectedCapability}</span>
                                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                            {capabilityOpen && (
                                <div className="dropdown-menu">
                                    {capabilities.map(cap => (
                                        <button
                                            key={cap}
                                            className={`dropdown-item ${selectedCapability === cap ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedCapability(cap);
                                                setCapabilityOpen(false);
                                            }}
                                        >
                                            {cap}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Industry Filter */}
                        <div className="filter-dropdown">
                            <button
                                className={`filter-button ${industryOpen ? 'open' : ''}`}
                                onClick={() => {
                                    setIndustryOpen(!industryOpen);
                                    setTopicOpen(false);
                                    setCapabilityOpen(false);
                                }}
                            >
                                <span>{selectedIndustry === 'All Industries' ? 'Industries' : selectedIndustry}</span>
                                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                            {industryOpen && (
                                <div className="dropdown-menu">
                                    {industries.map(ind => (
                                        <button
                                            key={ind}
                                            className={`dropdown-item ${selectedIndustry === ind ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedIndustry(ind);
                                                setIndustryOpen(false);
                                            }}
                                        >
                                            {ind}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Publications Grid */}
            <section className="publications-grid-section">
                <div className="container">
                    <div className="publications-grid">
                        {filteredPublications.map(pub => (
                            <Link to={`/publications/${pub.id}`} className="publication-card" key={pub.id}>
                                <div className="card-image-container">
                                    <img src={pub.image} alt={pub.title} className="card-image" />
                                    {pub.hasVideo && (
                                        <div className="play-button">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="card-overlay">
                                        <div className="card-meta">
                                            <span className="card-type">{pub.type}</span>
                                            <span className="card-date">{pub.date}</span>
                                        </div>
                                        <h3 className="card-title">{pub.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredPublications.length === 0 && (
                        <div className="no-results">
                            <p>No publications found matching your filters.</p>
                            <button
                                className="reset-filters"
                                onClick={() => {
                                    setSelectedTopic('All Topics');
                                    setSelectedCapability('All Capabilities');
                                    setSelectedIndustry('All Industries');
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Load More */}
            <section className="load-more-section">
                <div className="container">
                    <button className="load-more-btn">
                        Load More Publications
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-content">
                        <h2>Stay Updated</h2>
                        <p>Subscribe to receive the latest insights and research directly to your inbox</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email address" className="newsletter-input" />
                            <button type="submit" className="newsletter-submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Publications;
