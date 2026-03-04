import React, { useRef, useEffect } from 'react';
import { Folder, FileText, History } from 'lucide-react';

const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={i}>{part}</strong>
        ) : (
          part
        )
      )}
    </span>
  );
};

const SearchResultItem = ({ item, type, onSelect, query, isSelected }: any) => {
  const itemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isSelected]);

  const getIcon = () => {
    switch (type) {
      case 'Projects': return <Folder size={16} className="text-[var(--text-tertiary)]" />;
      case 'Notes': return <FileText size={16} className="text-[var(--text-tertiary)]" />;
      case 'History': return <History size={16} className="text-[var(--text-tertiary)]" />;
      default: return null;
    }
  };

  return (
    <button 
      ref={itemRef}
      role="option"
      aria-selected={isSelected}
      className={`search-result-item ${isSelected ? 'active' : ''}`}
      onClick={() => onSelect(item, type)}
    >
      <div className="search-result-icon">{getIcon()}</div>
      <span className="search-result-title">
        <Highlight text={item.title} highlight={query} />
      </span>
    </button>
  );
};

const SearchModal = ({ results, onSelect, onClose, query, activeIndex }: any) => {
  const hasResults = results.projects.length > 0 || results.notes.length > 0 || results.history.length > 0;
  const itemIndexRef = useRef(-1);

  useEffect(() => {
    itemIndexRef.current = -1; // Reset on each render
  });

  const renderCategory = (categoryName: 'Projects' | 'Notes' | 'History', items: any[]) => {
    if (items.length === 0) return null;
    return (
      <div className="search-category">
        <h3 className="search-category-title">{categoryName}</h3>
        {items.map((item: any) => {
          itemIndexRef.current++;
          return (
            <SearchResultItem
              key={`${categoryName}-${item.id}`}
              item={item}
              type={categoryName}
              onSelect={onSelect}
              query={query}
              isSelected={itemIndexRef.current === activeIndex}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="search-modal-overlay" onClick={onClose} />
      <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
        <div id="search-modal-body" className="search-modal-body custom-scrollbar" role="listbox">
          {query.trim() && !hasResults ? (
            <div className="search-no-results">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <>
              {renderCategory('Projects', results.projects)}
              {renderCategory('Notes', results.notes)}
              {renderCategory('History', results.history)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
