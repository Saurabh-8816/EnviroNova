import React, { useState, useEffect, useMemo } from 'react';
import './About.css';

const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const originalSlides = [
    {
      id: 1,
      image: '/img99.jpg',
      category: 'SUSTAINABILITY',
      date: 'January 20, 2026',
      title: 'Environmental Impact Assessment',
      type: 'ARTICLE'
    },
    {
      id: 2,
      image: '/TeamCollab.jpg',
      category: 'CONSULTING',
      date: 'January 15, 2026',
      title: 'Expert Team Collaboration',
      type: 'CASE STUDY'
    },
    {
      id: 3,
      image: '/img98.jpg',
      category: 'CERTIFICATIONS',
      date: 'January 10, 2026',
      title: 'Industry Leading Standards',
      type: 'INSIGHT'
    },
    {
      id: 4,
      image: '/img97.jpg',
      category: 'COMPLIANCE',
      date: 'January 5, 2026',
      title: 'Regulatory Excellence',
      type: 'REPORT'
    },
    {
      id: 5,
      image: '/img96.jpg',
      category: 'SAFETY',
      date: 'December 28, 2025',
      title: 'Workplace Safety Solutions',
      type: 'ARTICLE'
    }
  ];

  // Create infinite loop by tripling the slides
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slides = useMemo(() => [...originalSlides, ...originalSlides, ...originalSlides], []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          const next = prev + 1;
          // Reset to middle set when we've gone through one full set
          if (next >= originalSlides.length * 2) {
            return originalSlides.length;
          }
          return next;
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, originalSlides.length]);

  // Start from the middle set for seamless looping
  useEffect(() => {
    setCurrentSlide(originalSlides.length);
  }, [originalSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      if (next >= originalSlides.length * 2) {
        return originalSlides.length;
      }
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev - 1;
      if (next < originalSlides.length) {
        return originalSlides.length * 2 - 1;
      }
      return next;
    });
  };

  // Calculate the offset for sliding animation
  const slideOffset = currentSlide * 245; // 245px = slide width (220) + gap (25)

  // Determine which slides are visible (only 5 at a time) with different sizes
  const getSlideClass = (index: number) => {
    const diff = index - currentSlide;
    if (diff === 0) return 'active'; // Center slide (3rd)
    if (diff === -1 || diff === 1) return 'adjacent'; // 2nd and 4th slides (red arrows)
    if (diff === -2 || diff === 2) return 'outer'; // 1st and 5th slides (yellow arrows)
    return 'hidden';
  };

  return (
    <div className="about-page">
      {/* BCG-Style Hero Section */}
      <section className="bcg-hero">
        <div className="bcg-hero-content">
          <span className="bcg-welcome">WELCOME TO ENVIRONOVA</span>
          <h1 className="bcg-title">Unlocking the Potential of<br />Sustainable Business</h1>
        </div>
        
        <div className="bcg-carousel">
          <div 
            className="bcg-slides"
            style={{ 
              transform: `translateX(calc(50% - ${slideOffset}px - 150px))`,
            }}
          >
            {slides.map((slide, index) => (
              <div 
                key={`${slide.id}-${index}`} 
                className={`bcg-slide ${getSlideClass(index)}`}
              >
                <div className="bcg-slide-image">
                  <img src={slide.image} alt={slide.title} />
                  <span className="bcg-slide-category">{slide.category}</span>
                </div>
                {index === currentSlide && (
                  <div className="bcg-slide-info">
                    <span className="bcg-slide-meta">{slide.type} &nbsp; {slide.date}</span>
                    <h3 className="bcg-slide-title">{slide.title}</h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bcg-controls">
          <button 
            className="bcg-control-btn pause" 
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? '▶' : '❚❚'}
          </button>
          <button className="bcg-control-btn prev" onClick={prevSlide} aria-label="Previous">
            &lt;
          </button>
          <button className="bcg-control-btn next" onClick={nextSlide} aria-label="Next">
            &gt;
          </button>
        </div>
      </section>
      
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