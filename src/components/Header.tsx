import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchModal from '../search/SearchModal';
import './Header.css';

const Header: React.FC = () => {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 8;
      setIsScrolled(scrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`header${isHome && !isScrolled ? ' header--transparent' : ''} header--mounted${isScrolled ? ' header--scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <div className="logo-container">
              <img 
                src="/Mainlogo.png" 
                alt="Environova Logo" 
                className="logo-image"
              />
              <div className="logo-text-group">
                <div className="logo-title">Environova</div>
                <div className="logo-subtitle">Engineering and Consultancy Services Private Limited</div>
              </div>
            </div>
          </Link>
        </div>
        
        <nav className="navigation">
          <ul className="nav-list">
            <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              <Link to="/">Home</Link>
            </li>
            <li 
              className={`nav-item dropdown ${isActive('/about') ? 'active' : ''}`}
              onMouseEnter={() => setIsAboutDropdownOpen(true)}
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
            >
              <Link to="/about">
                About <span className="dropdown-arrow">▼</span>
              </Link>
              {isAboutDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/about/team">Our Team</Link></li>
                  <li><Link to="/about/history">History</Link></li>
                </ul>
              )}
            </li>
            <li 
              className={`nav-item dropdown ${isActive('/services') ? 'active' : ''}`}
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <Link to="/services">
                Services <span className="dropdown-arrow">▼</span>
              </Link>
              {isServicesDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/services">All Services</Link></li>
                  <li><Link to="/services/consulting">Consulting</Link></li>
                  <li><Link to="/services/compliance">Compliance</Link></li>
                  <li><Link to="/services/training">Training</Link></li>
                </ul>
              )}
            </li>
            <li className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
              <Link to="/projects">Projects</Link>
            </li>
            <li className={`nav-item ${isActive('/Research') ? 'active' : ''}`}>
              <Link to="/Research">Research</Link>
            </li>
             <li className={`nav-item ${isActive('/Publications') ? 'active' : ''}`}>
              <Link to="/Publications">Publications</Link>
            </li>
             <li className={`nav-item ${isActive('/Clientele') ? 'active' : ''}`}>
              <Link to="/Clientele">Clientele</Link>
            </li>
            <li className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="nav-item nav-search">
              <button
                className="search-button"
                aria-label="Search (Ctrl/⌘+K)"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header; 