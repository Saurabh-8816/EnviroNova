import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top-inner">
          <h3>Connect with EnviroNova</h3>
          <Link to="/contact" className="footer-contact-btn">
            <span className="footer-contact-icon">✉️</span>
            Contact
          </Link>
        </div>
      </div>

      <div className="footer-social-row">
        <a href="https://twitter.com" aria-label="X" target="_blank" rel="noreferrer">
          <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.507 11.24h-6.66l-5.21-6.81-5.96 6.81H1.694l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.454-6.23z" fill="currentColor" />
          </svg>
        </a>
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
          <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.5 9.25V7.6c0-.85.57-1.05 1.01-1.05h1.75V3.2l-2.4-.01c-2.66 0-3.86 1.99-3.86 3.73v2.33H8.25v3.1H10v8.2h3.5v-8.2h2.35l.35-3.1H13.5z" fill="currentColor" />
          </svg>
        </a>
        <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.94 8.5H3.8v11.7h3.14V8.5zM5.37 3.8a1.82 1.82 0 1 0 0 3.64 1.82 1.82 0 0 0 0-3.64zM20.2 13.1c0-3.1-1.65-4.55-3.85-4.55-1.78 0-2.58.98-3.02 1.67V8.5H10.2v11.7h3.14v-5.78c0-1.52.29-3 2.17-3 1.85 0 1.88 1.74 1.88 3.1v5.68h3.14v-7.1z" fill="currentColor" />
          </svg>
        </a>
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
          <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm0 6.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8zm4.85-6.55a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z" fill="currentColor" />
            <path d="M16.5 3.5h-9A4 4 0 0 0 3.5 7.5v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4zm2.6 13a2.6 2.6 0 0 1-2.6 2.6h-9a2.6 2.6 0 0 1-2.6-2.6v-9a2.6 2.6 0 0 1 2.6-2.6h9a2.6 2.6 0 0 1 2.6 2.6v9z" fill="currentColor" />
          </svg>
        </a>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-brand-title">EnviroNova</div>
          <div className="footer-brand-subtitle">&amp; Company</div>
        </div>

        <div className="footer-links">
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
        </div>

        <div className="footer-subscribe">
          <div className="footer-subscribe-title">Subscribe</div>
          <div className="footer-subscribe-text">Select topics and stay current with our latest insights</div>
          <div className="footer-subscribe-form">
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button type="button">Submit</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-social">
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.94 8.5H3.8v11.7h3.14V8.5zM5.37 3.8a1.82 1.82 0 1 0 0 3.64 1.82 1.82 0 0 0 0-3.64zM20.2 13.1c0-3.1-1.65-4.55-3.85-4.55-1.78 0-2.58.98-3.02 1.67V8.5H10.2v11.7h3.14v-5.78c0-1.52.29-3 2.17-3 1.85 0 1.88 1.74 1.88 3.1v5.68h3.14v-7.1z" fill="currentColor" />
            </svg>
          </a>
          <a href="https://twitter.com" aria-label="X" target="_blank" rel="noreferrer">
            <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.507 11.24h-6.66l-5.21-6.81-5.96 6.81H1.694l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.454-6.23z" fill="currentColor" />
            </svg>
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
            <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.5 9.25V7.6c0-.85.57-1.05 1.01-1.05h1.75V3.2l-2.4-.01c-2.66 0-3.86 1.99-3.86 3.73v2.33H8.25v3.1H10v8.2h3.5v-8.2h2.35l.35-3.1H13.5z" fill="currentColor" />
            </svg>
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
            <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm0 6.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8zm4.85-6.55a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z" fill="currentColor" />
              <path d="M16.5 3.5h-9A4 4 0 0 0 3.5 7.5v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4zm2.6 13a2.6 2.6 0 0 1-2.6 2.6h-9a2.6 2.6 0 0 1-2.6-2.6v-9a2.6 2.6 0 0 1 2.6-2.6h9a2.6 2.6 0 0 1 2.6 2.6v9z" fill="currentColor" />
            </svg>
          </a>
        </div>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Terms of use</a>
          <a href="/accessibility">Accessibility statement</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
