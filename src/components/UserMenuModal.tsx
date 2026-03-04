import React from 'react';
import { User, CreditCard, Moon, Sun, LogOut } from 'lucide-react';

interface Props {
  user: {
    name: string;
    email: string;
    isPro: boolean;
  };
  onClose: () => void;
  onSignOut: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const UserMenuModal: React.FC<Props> = ({ user, onSignOut, theme, setTheme }) => {

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleSignOut = () => {
    onSignOut();
    console.log('Signing out...');
  };

  return (
    <div className="user-menu-modal">
      
      {/* User Info */}
      <div className="user-info">
        <div className="user-details">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
        {user.isPro && <div className="pro-badge">PRO</div>}
      </div>

      {/* Menu Items */}
      <div className="menu-section">
        <button className="menu-item">
          <User size={20} strokeWidth={1.5} />
          <span>Profile</span>
        </button>

        <button className="menu-item">
          <CreditCard size={20} strokeWidth={1.5} />
          <span>Billing</span>
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="menu-section theme-section">
        <button className="menu-item theme-item" onClick={handleThemeToggle}>
          {theme === 'light' ? (
            <Moon size={20} strokeWidth={1.5} />
          ) : (
            <Sun size={20} strokeWidth={1.5} />
          )}
          <span>Theme</span>
          <span className="theme-value">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      {/* Sign Out */}
      <div className="menu-section">
        <button className="menu-item sign-out-item" onClick={handleSignOut}>
          <LogOut size={20} strokeWidth={1.5} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenuModal;
