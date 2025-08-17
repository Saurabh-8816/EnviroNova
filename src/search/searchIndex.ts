export type SearchTarget = {
  id: string;
  title: string;
  route: string;
  hash?: string;
  keywords?: string[];
};

export const SEARCH_INDEX: SearchTarget[] = [
  { id: 'home', title: 'Home', route: '/', keywords: ['start', 'landing'] },
  { id: 'home-hero', title: 'Home → Hero', route: '/', hash: '#home-hero', keywords: ['intro', 'top'] },
  { id: 'home-about', title: 'Home → About', route: '/', hash: '#home-about', keywords: ['about home'] },
  { id: 'home-services', title: 'Home → Services', route: '/', hash: '#home-services', keywords: ['services', 'offerings'] },

  { id: 'about', title: 'About', route: '/about', keywords: ['company', 'who we are'] },
  { id: 'about-header', title: 'About → Header', route: '/about', hash: '#about-header' },
  { id: 'about-mission', title: 'About → Mission', route: '/about', hash: '#about-mission', keywords: ['mission'] },
  { id: 'about-stats', title: 'About → Stats', route: '/about', hash: '#about-stats', keywords: ['numbers', 'figures'] },

  { id: 'services', title: 'Services', route: '/services' },
  { id: 'projects', title: 'Projects', route: '/projects' },
  { id: 'careers', title: 'Careers', route: '/careers' },
  { id: 'certifications', title: 'Certifications', route: '/certifications' },
  { id: 'contact', title: 'Contact', route: '/contact' }
];
