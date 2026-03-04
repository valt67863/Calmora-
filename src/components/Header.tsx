import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowLeft, ChevronDown } from 'lucide-react';
import UserMenuModal from './UserMenuModal';

interface Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
    isPro: boolean;
  };
  onMenu: () => void;
  isMobile: boolean;
  onSignOut: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  projects: any[];
  onOpenProject: (project: any) => void;
  activeProject: any | null;
  onTriggerProjectAction: (data: any) => void;
  onExitProject: () => void;
}

const Header: React.FC<Props> = ({ 
  user, 
  onMenu, 
  isMobile, 
  onSignOut, 
  theme, 
  setTheme,
  activeProject,
  onTriggerProjectAction,
  onExitProject,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <header className="app-header">
      
      <div className="header-left-container">
        {isMobile && !activeProject && (
          <button className="header-btn" onClick={onMenu} title="Open menu">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        )}
        {activeProject && (
           <button className="header-btn" onClick={onExitProject} title="Exit Project">
              <ArrowLeft size={20} strokeWidth={2} />
           </button>
        )}
      </div>

      {activeProject ? (
        <div className="flex-1 flex items-center justify-center gap-2 text-center min-w-0">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] truncate">{activeProject.title}</h2>
          <button
              className="p-1 rounded-md hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0"
              onClick={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  onTriggerProjectAction({ project: activeProject, position: { x: rect.left, y: rect.bottom + 5 } });
              }}
          >
              <ChevronDown size={20} />
          </button>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="header-actions">
        
        <div className="user-menu-wrapper" ref={userMenuRef}>
          <button
            className={`user-avatar ${showUserMenu ? 'active' : ''}`}
            onClick={() => {
              setShowUserMenu(!showUserMenu);
            }}
            title="Account menu"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="avatar-img" />
            ) : (
              <span className="avatar-initials">{getInitials(user.name)}</span>
            )}
            {user.isPro && <div className="pro-badge-header">PRO</div>}
          </button>

          {showUserMenu && (
            <UserMenuModal
              user={user}
              onClose={() => setShowUserMenu(false)}
              onSignOut={onSignOut}
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
