import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_INDEX } from './searchIndex';
import { navigateToTarget } from './searchNavigator';
import { askPerplexity } from '../services/perplexity';
import './SearchModal.css';

type Props = { isOpen: boolean; onClose: () => void; };

const SearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setAiAnswer(null);
      setIsLoadingAI(false);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_INDEX.slice(0, 7);
    return SEARCH_INDEX.filter(item => {
      const hay = `${item.title} ${item.keywords?.join(' ') || ''}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 8);
  }, [query]);

  const go = (route: string, hash?: string) => {
    onClose();
    navigateToTarget(navigate, route, hash);
  };

  const askAI = async () => {
    setIsLoadingAI(true);
    const answer = await askPerplexity(`User is browsing an EH&S consulting site. Interpret this query and suggest the best page/section or a short answer: "${query}"`);
    setAiAnswer(answer);
    setIsLoadingAI(false);
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <div className="search-dialog">
        <div className="search-input-row">
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages or sections… (Try: services, about mission)"
            aria-label="Search"
          />
          <button className="search-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <ul className="search-results">
          {results.map(r => (
            <li key={r.id}>
              <button onClick={() => go(r.route, r.hash)}>
                <span className="result-title">{r.title}</span>
                {r.hash ? <span className="result-chip">section</span> : <span className="result-chip">page</span>}
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="search-empty">No local matches.</li>
          )}
        </ul>

        <div className="search-ai">
          <button className="ask-ai" onClick={askAI} disabled={!query || isLoadingAI}>
            {isLoadingAI ? 'Thinking…' : 'Ask AI (Perplexity)'}
          </button>
          {aiAnswer && <div className="ai-answer">{aiAnswer}</div>}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
