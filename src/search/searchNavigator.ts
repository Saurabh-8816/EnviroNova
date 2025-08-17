import { NavigateFunction } from 'react-router-dom';

export const navigateToTarget = async (
  navigate: NavigateFunction,
  route: string,
  hash?: string
) => {
  // If we're already on the route, just scroll
  const sameRoute = window.location.pathname === route;

  if (!sameRoute) {
    navigate(route);
    await new Promise(r => setTimeout(r, 0));
  }

  if (hash) {
    const id = hash.replace('#', '');
    // wait a tick for the page to render
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  } else if (!sameRoute) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
