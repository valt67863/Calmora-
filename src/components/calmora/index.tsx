
'use client';
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Menu,
  FileText,
  MoreHorizontal,
  Minimize2,
  Maximize2,
  X,
  Check,
  Lock,
  LogOut,
  Folder,
  TrendingUp,
  Target,
  CheckCircle2,
  Plus,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Download,
  Trash2,
  Flame,
  Lightbulb,
  Pin,
  Edit3,
  Edit2, 
  Share2,
  Book,
  Activity,
  MessageSquare,
  Users,          
  Shield,        
  Zap,            
  Archive,        
  AlertTriangle, 
  Mail,          
  ListTodo,
  Search,        
  Link,            
  CornerDownRight,
  Cloud,
  History,
  KeyRound,
  Eye,
  EyeOff,
  User,
  CreditCard,
  Copy
} from "lucide-react";
import { differenceInCalendarDays } from 'date-fns';
import { normalizeStatus } from "@/lib/calmora-utils";

// --- Branding Component ---
export const CalmoraLogo = ({
  size = 32,
  className = ""
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Calmora logo"
      className={className}
      fill="none"
    >
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="24"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M50 28
           C40 28 34 36 34 46
           C34 58 42 66 54 66
           C62 66 68 62 68 54"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="50"
        cy="52"
        r="3.5"
        fill="currentColor"
      />
    </svg>
  );
};

export const renderIcon = (iconName: string, props = {}) => {
    const iconProps = { size: 18, ...props };
    switch (iconName) {
      case 'file-text': return <FileText {...iconProps} />;
      case 'folder': return <Folder {...iconProps} />;
      case 'book': return <Book {...iconProps} />;
      case 'target': return <Target {...iconProps} />;
      case 'trending-up': return <TrendingUp {...iconProps} />;
      case 'activity': return <Activity {...iconProps} />;
      case 'message-square': return <MessageSquare {...iconProps} />;
      case 'flame': return <Flame {...iconProps} />;
      case 'lightbulb': return <Lightbulb {...iconProps} />;
      case 'cloud': return <Cloud {...iconProps} />;
      default: return <FileText {...iconProps} />;
    }
  };
  
  export const EditNameModal = ({ currentName, onSave, onClose }: any) => {
    const [name, setName] = useState(currentName);
  
    const handleSave = () => {
      if (name.trim()) {
        onSave(name.trim());
      }
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Edit Project Name</h3>
            <button className="modal-close" onClick={onClose}>
              <X size={18} strokeWidth={2} />
            </button>
          </div>
          <div className="modal-body">
            <label className="modal-label">Project Name</label>
            <input
              type="text"
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleSave} disabled={!name.trim()}>Save</button>
          </div>
        </div>
      </div>
    );
  };
  
  export const EditDescriptionModal = ({ currentDesc, onSave, onClose }: any) => {
    const [desc, setDesc] = useState(currentDesc || "");
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Edit Description</h3>
            <button className="modal-close" onClick={onClose}><X size={18} strokeWidth={2} /></button>
          </div>
          <div className="modal-body">
            <label className="modal-label">Description</label>
            <textarea
              className="modal-input"
              style={{ height: '120px', resize: 'none', paddingTop: '12px' }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What is this project about?"
              autoFocus
            />
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={() => onSave(desc)}>Save</button>
          </div>
        </div>
      </div>
    );
  };
  
  export const IconPickerModal = ({ currentIconName, onSelect, onClose }: any) => {
    const icons = [
      { id: 'file-text', Icon: FileText },
      { id: 'folder', Icon: Folder },
      { id: 'book', Icon: Book },
      { id: 'target', Icon: Target },
      { id: 'trending-up', Icon: TrendingUp },
      { id: 'activity', Icon: Activity },
      { id: 'message-square', Icon: MessageSquare },
      { id: 'flame', Icon: Flame },
      { id: 'lightbulb', Icon: Lightbulb },
      { id: 'cloud', Icon: Cloud }
    ];
      
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Select Icon</h3>
            <button className="modal-close" onClick={onClose}><X size={18} strokeWidth={2} /></button>
          </div>
          <div className="modal-body">
            <div className="type-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {icons.map(({ id, Icon }) => (
                <button 
                  key={id}
                  className={`type-option ${currentIconName === id ? 'selected' : ''}`}
                  style={{ justifyContent: 'center' }}
                  onClick={() => onSelect(id)}
                >
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export const InviteMembersModal = ({ projectId, onClose }: any) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
  
    const handleInvite = () => {
      console.log('Inviting:', email, role);
      onClose();
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Invite Members</h3>
            <button className="modal-close" onClick={onClose}>
              <X size={18} strokeWidth={2} />
            </button>
          </div>
          <div className="modal-body">
            <label className="modal-label">Email Address</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Mail size={16} className="input-icon" style={{ position: 'absolute', left: '16px', top: '16px', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="email"
                className="modal-input"
                style={{ paddingLeft: '44px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                autoFocus
              />
            </div>
            <label className="modal-label" style={{ marginTop: '20px' }}>Role</label>
            <div className="radio-group">
              {['viewer', 'editor', 'admin'].map((r) => (
                <label key={r} className="radio-option">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <div className="radio-label">
                    <div className="radio-title" style={{ textTransform: 'capitalize' }}>{r}</div>
                    <div className="radio-desc">
                      {r === 'viewer' ? 'Can view project only' : r === 'editor' ? 'Can view and edit project' : 'Full access including deletion'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleInvite} disabled={!email}>Send Invite</button>
          </div>
        </div>
      </div>
    );
  };
  
  export const PermissionsModal = ({ onClose }: any) => (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Permissions</h3>
            <button className="modal-close" onClick={onClose}><X size={18} strokeWidth={2} /></button>
          </div>
          <div className="modal-body">
              <div className="setting-desc">Permissions management is coming soon.</div>
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
  );
  
  export const SessionTypeModal = ({ currentType, onSelect, onClose }: any) => {
    const [selected, setSelected] = useState(currentType || 'focus-chat');
  
    const sessionTypes = [
      { id: 'focus-chat', name: 'Focus Chat', icon: MessageSquare, desc: 'Standard conversation mode' },
      { id: 'planning', name: 'Planning Mode', icon: Target, desc: 'Strategic planning and goal setting' },
      { id: 'brainstorm', name: 'Brainstorm Mode', icon: Lightbulb, desc: 'Creative ideation and exploration' },
      { id: 'task-breakdown', name: 'Task Breakdown', icon: ListTodo, desc: 'Break work into actionable steps' }
    ];
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Default Session Type</h3>
            <button className="modal-close" onClick={onClose}>
              <X size={18} strokeWidth={2} />
            </button>
          </div>
          <div className="modal-body">
            <div className="type-grid">
              {sessionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    className={`type-option ${selected === type.id ? 'selected' : ''}`}
                    onClick={() => setSelected(type.id)}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <div className="type-info">
                      <div className="type-name">{type.name}</div>
                      <div className="type-desc">{type.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={() => onSelect(selected)}>Save</button>
          </div>
        </div>
      </div>
    );
  };
  
  export const TaskCategoriesModal = ({ onClose }: any) => (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Task Categories</h3>
            <button className="modal-close" onClick={onClose}><X size={18} strokeWidth={2} /></button>
          </div>
          <div className="modal-body">
              <div className="setting-desc">Task category customization coming soon.</div>
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
  );
  
  export const SessionsListModal = ({ onClose }: any) => (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">All Sessions</h3>
            <button className="modal-close" onClick={onClose}><X size={18} strokeWidth={2} /></button>
          </div>
          <div className="modal-body">
              <div className="setting-desc">Full session history view coming soon.</div>
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
  );
  
  export const DeleteConfirmModal = ({ projectName, onConfirm, onClose }: any) => {
    const [confirmText, setConfirmText] = useState('');
    const isValid = confirmText === projectName;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content modal-danger" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-header-content">
              <AlertTriangle size={20} className="text-danger" />
              <h3 className="modal-title">Delete Project</h3>
            </div>
            <button className="modal-close" onClick={onClose}>
              <X size={18} strokeWidth={2} />
            </button>
          </div>
          <div className="modal-body">
            <p className="modal-warning">
              This action is <strong>permanent</strong> and cannot be undone. 
              All sessions, notes, tasks, and AI memory will be deleted.
            </p>
            <label className="modal-label">
              Type <strong>{projectName}</strong> to confirm
            </label>
            <input
              type="text"
              className="modal-input"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type project name"
              autoFocus
            />
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-danger" onClick={onConfirm} disabled={!isValid}>Delete Project</button>
          </div>
        </div>
      </div>
    );
  };
  
  export const Toggle = ({ value, onChange }: any) => (
    <label className="toggle">
        <input 
            type="checkbox" 
            checked={value} 
            onChange={(e) => onChange(e.target.checked)} 
        />
        <span className="toggle-slider"></span>
    </label>
  );
  
  export const NavItem = ({ icon: Icon, label, collapsed, onClick, danger, active }: any) => {
    if (collapsed) {
      return (
        <button
          onClick={onClick}
          className={`
            w-10 h-10 mx-auto flex items-center justify-center rounded-lg
            transition-all duration-200
            ${active
              ? "sidebar-list-item active"
              : "hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-hover)]"
            }
            ${danger ? "text-[var(--danger)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]" : ""}
          `}
          title={label}
        >
          <Icon size={18} strokeWidth={active ? 2 : 1.5} />
        </button>
      );
    }
    return (
      <button
        onClick={onClick}
        className={`
          sidebar-list-item w-full flex items-center gap-3
          ${active ? 'active' : ''}
          ${danger ? '!text-[var(--danger)] hover:!bg-[var(--danger-bg)]' : ''}
        `}
      >
        <Icon size={16} strokeWidth={active ? 2 : 1.5} />
        <span>{label}</span>
      </button>
    );
  };
  
  export const SystemHeader = ({ onMenu, onReset, isMobile }: any) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const avatarMenuRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (avatarMenuRef.current && !(avatarMenuRef.current as any).contains(e.target)) {
            setMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <>
          <header className="workspace-header">
              <div className="flex items-center gap-3">
                   {isMobile && (
                      <button className="header-icon-btn md:hidden" title="Menu" onClick={onMenu}>
                          <Menu size={18} strokeWidth={1.5} />
                      </button>
                   )}
              </div>
  
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-w-md hidden md:block">
              </div>
  
              <div className="flex items-center gap-2">
                  <div className="relative" ref={avatarMenuRef}>
                      <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 rounded-full bg-blue-400/10 text-blue-300 flex items-center justify-center font-bold text-sm border border-blue-400/30 hover:brightness-125 transition">
                          J
                      </button>
                      {menuOpen && (
                          <div className="menu-pop animate-pop-in" style={{ right: 0, top: 'calc(100% + 12px)', width: '260px' }}>
                               <div className="px-4 py-3 border-b border-b-[var(--border)]">
                                  <p className="text-sm font-medium text-[var(--text-primary)]">Jane Doe</p>
                                  <p className="text-xs text-[var(--text-tertiary)]">demo@calmora.app</p>
                              </div>
                              <div className="p-2">
                                  <button className="menu-item w-full text-left flex items-center gap-3" onClick={onReset}><Plus size={15}/><span>New Session</span></button>
                                  <div className="h-px bg-[var(--border)] my-1" />
                                  <button className="menu-item w-full text-left danger !text-[var(--danger)] flex items-center gap-3" onClick={() => window.location.reload()}><LogOut size={15}/><span>Sign Out</span></button>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </header>
      </>
    );
  };
  
  export const ModalOverlay = ({ onClose, children }: any) => (
    <div className="fixed inset-0 z-[1005] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      {children}
    </div>
  );
  
  export const NewProjectModal = ({ onClose, onCreate }: any) => {
    const [title, setTitle] = useState("");
    return (
      <ModalOverlay onClose={onClose}>
        <div className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-1 font-sans">New Project</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 font-sans">What are you working on?</p>
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Project name..."
            className="w-full bg-[var(--surface-hover)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[hsl(var(--accent))] transition-colors mb-6 font-sans"
            onKeyDown={e => e.key === 'Enter' && title.trim() && onCreate(title)}
          />
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Cancel</button>
            <button onClick={() => title.trim() && onCreate(title)} disabled={!title.trim()} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-opacity disabled:opacity-50">Create Project</button>
          </div>
        </div>
      </ModalOverlay>
    );
  };
  
  export const NewGoalModal = ({ onClose, onCreate }: any) => {
    const [title, setTitle] = useState("");
    return (
      <ModalOverlay onClose={onClose}>
        <div className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
          <h2 className="text-xl font-medium text-[var(--text-primary)] mb-1 font-sans">New Goal</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 font-sans">What do you want to achieve?</p>
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Goal title..."
            className="w-full bg-[var(--surface-hover)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[hsl(var(--accent))] transition-colors mb-6 font-sans"
            onKeyDown={e => e.key === 'Enter' && title.trim() && onCreate(title)}
          />
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Cancel</button>
            <button onClick={() => title.trim() && onCreate(title)} disabled={!title.trim()} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-opacity disabled:opacity-50">Set Goal</button>
          </div>
        </div>
      </ModalOverlay>
    );
  };
  
  export const ProjectActionSheet = ({ projectData, onClose, onRename, onDuplicate, onDelete }: any) => {
      const sheetRef = useRef(null);
      const { project, position } = projectData;
  
      useEffect(() => {
          const handleClickOutside = (e: MouseEvent) => {
              if (sheetRef.current && !(sheetRef.current as any).contains(e.target)) {
                  onClose();
              }
          };
          document.addEventListener('mousedown', handleClickOutside);
          return () => document.removeEventListener('mousedown', handleClickOutside);
      }, [onClose]);
  
      const style: React.CSSProperties = {
          top: position.y,
          left: position.x,
          transformOrigin: "top left",
          position: "fixed",
          zIndex: 201,
      };
      
      if (typeof window !== 'undefined') {
          if (position.x > window.innerWidth - 250) style.left = position.x - 240;
          if (position.y > window.innerHeight - 200) style.top = position.y - 150;
      }
  
      return (
        <div ref={sheetRef} style={style} className="menu-pop w-[240px] animate-pop-in">
          <div className="p-2">
            <button onClick={() => { onRename(project); onClose(); }} className="menu-item w-full text-left flex items-center gap-3">
                <Edit3 size={15} /> Rename
            </button>
            <button onClick={() => { onDuplicate(project); onClose(); }} className="menu-item w-full text-left flex items-center gap-3">
                <Copy size={15} /> Duplicate
            </button>
            <div className="h-px bg-[var(--border)] my-1" />
            <button onClick={() => { onDelete(project); onClose(); }} className="menu-item w-full text-left !text-[var(--danger)] flex items-center gap-3">
                <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      );
  };
  
  export const GoalRow = ({ goal, isRecommended }: any) => {
    return (
      <div className="py-5 border-b border-[var(--border)] last:border-0 group">
          {isRecommended && (
              <div className="mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--accent))] font-medium font-sans">
                      Recommended Focus
                  </span>
              </div>
          )}
          <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                      <div className="text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">
                          {renderIcon(goal.icon)}
                      </div>
                      <h3 className="text-[15px] font-medium leading-tight text-[var(--text-primary)] font-sans">
                          {goal.title}
                      </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] font-sans pl-8">
                     <span>Step {goal.currentStep} of {goal.totalSteps}</span>
                     <span>•</span>
                     <span>Last active {goal.startedDaysAgo === 0 ? 'today' : `${goal.startedDaysAgo}d ago`}</span>
                  </div>
              </div>
              <button className="text-[hsl(var(--accent))] hover:text-[var(--accent-hover)] font-medium text-sm transition-colors flex items-center gap-2 font-sans self-start mt-1">
                  <span>{goal.nextStep}</span>
                  <ArrowRight size={14} />
              </button>
          </div>
      </div>
    );
  };
  
  export const AchievementRow = ({ achievement }: any) => {
    const getTimeAgo = (days: number) => {
      if (days === 0) return 'today';
      if (days === 1) return 'yesterday';
      if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      if (days < 14) return 'last week';
      if (days < 30) {
          const weeks = Math.floor(days / 7);
          return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
      }
      const months = Math.floor(days / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    };
    return (
      <div className="py-4 border-b border-[var(--border)] last:border-0 flex items-start gap-4 group">
        <div className="mt-1 text-[var(--success)]">
          <Check size={16} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
            <h3 className="text-[15px] font-medium text-[var(--text-primary)] font-sans mb-1 group-hover:text-[var(--text-primary)] transition-colors">
                {achievement.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] font-sans">
                <span>Completed {getTimeAgo(achievement.completedDaysAgo)}</span>
                <span>•</span>
                <span>Took {achievement.duration}</span>
            </div>
        </div>
      </div>
    );
  };
  
  export const ProgressBlock = ({ title, children, noBorder }: any) => (
      <div className={`py-8 ${!noBorder ? 'border-b border-[var(--border)]' : ''}`}>
          <h2 className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mb-4 font-medium font-sans opacity-60">
              {title}
          </h2>
          <div className="space-y-3">
              {children}
          </div>
      </div>
  );

  export const ProjectCard = ({ project, onClick, onTriggerAction }: any) => (
    <div className="group/card project-card">
      <div className="card-content" onClick={() => onClick(project)}>
        <div className="card-header !p-0 !mb-4">
          <div className="card-icon-wrapper">
            {renderIcon(project.icon, { size: 20 })}
          </div>
        </div>
        <div className="card-body !p-0">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-subtitle">Last active: {project.lastActive}</p>
        </div>
        <div className="card-footer !p-0 !mt-4 !border-0">
          <div className="progress-bar-wrapper">
            <div className="progress-bar-fill" style={{ width: `${project.progress || 0}%` }} />
          </div>
          <span className="progress-label">{project.progress || 0}%</span>
        </div>
      </div>
      <button 
        className="card-menu-button"
        onClick={(e) => { 
          e.stopPropagation(); 
          const rect = e.currentTarget.getBoundingClientRect();
          onTriggerAction({ project, position: { x: rect.left, y: rect.bottom + 5 } }); 
        }}
      >
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
  
export const ProjectsView = ({ projects, setShowProjectModal, onOpenProject, setProjectActionData }: any) => (
      <div className="desktop-content">
          <div className="content-container">
              <section className="hero-desktop">
                  <h1 className="desktop-h1 font-serif mb-3 tracking-tight text-[var(--text-primary)]">Projects</h1>
                  <p className="desktop-body text-[var(--text-secondary)]">Continue what matters</p>
              </section>
  
              <section className="section-primary">
                <button onClick={() => setShowProjectModal(true)} className="px-6 py-3 bg-primary text-primary-foreground rounded-[12px] font-medium transition-all hover:scale-[1.02] active:scale-98 shadow-xl shadow-primary/10 flex items-center gap-2 font-sans text-[15px]">
                    <Plus size={18} strokeWidth={2.5} /> New Project
                </button>
              </section>
  
              <section className="section-secondary">
                  <div className="content-grid">
                      {projects.map((p: any) => <ProjectCard key={p.id} project={p} onClick={onOpenProject} onTriggerAction={setProjectActionData} />)}
                  </div>
                  {projects.length === 0 && (
                      <div className="text-center py-20 col-span-full border border-dashed border-[var(--border)] rounded-xl">
                          <p className="text-[var(--text-tertiary)] text-lg mb-6 font-sans">No projects yet. Start your first one.</p>
                      </div>
                  )}
              </section>
          </div>
      </div>
  );
  
  export const HistoryView = ({ sessions, onOpenSession }: any) => {
    const groupedSessions = useMemo(() => {
        const groups: { [key: string]: any[] } = {};

        [...sessions].sort((a,b) => b.updatedAt - a.updatedAt).forEach((session: any) => {
            if (!session.updatedAt) return;
            const sessionDate = new Date(session.updatedAt);
            const now = new Date();
            const daysAgo = differenceInCalendarDays(now, sessionDate);

            let groupKey: string;
            if (daysAgo === 0) {
                groupKey = 'Today';
            } else if (daysAgo === 1) {
                groupKey = 'Yesterday';
            } else if (daysAgo < 7) {
                groupKey = 'Previous 7 Days';
            } else if (daysAgo < 30) {
                groupKey = 'Previous 30 Days';
            } else {
                groupKey = 'Older';
            }

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(session);
        });
        return groups;
    }, [sessions]);

    const groupOrder = ['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days', 'Older'];

    return (
      <div className="desktop-content">
          <div className="content-container">
              <section className="hero-desktop">
                  <h1 className="desktop-h1 font-serif mb-3 tracking-tight text-[var(--text-primary)]">History</h1>
                  <p className="desktop-body text-[var(--text-secondary)]">Review your past sessions.</p>
              </section>

              <section className="section-secondary">
                  {sessions.length > 0 ? (
                      <div className="space-y-8">
                          {groupOrder.map(groupName => (
                              groupedSessions[groupName] && groupedSessions[groupName].length > 0 && (
                                  <div key={groupName}>
                                      <h2 className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mb-4 font-medium font-sans opacity-60">
                                          {groupName}
                                      </h2>
                                      <div className="space-y-0">
                                          {groupedSessions[groupName].map((s: any) => <SessionRow key={s.id} session={s} onOpen={onOpenSession} />)}
                                      </div>
                                  </div>
                              )
                          ))}
                      </div>
                  ) : (
                      <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-xl">
                          <p className="text-[var(--text-tertiary)] text-lg mb-6 font-sans">No sessions in your history yet.</p>
                      </div>
                  )}
              </section>
          </div>
      </div>
    );
};

export const SessionRow = ({ session, onOpen }: any) => (
    <div onClick={() => onOpen(session.id)} className="py-4 border-b border-[var(--border)] last:border-0 group cursor-pointer hover:bg-[var(--surface-hover)] -mx-4 px-4 rounded-lg transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">
            <MessageSquare size={18} />
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-medium text-[var(--text-primary)] font-sans truncate">{session.title}</h3>
        </div>
        <ChevronRight size={16} className="text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
);
  
    export const GoalsView = ({ activeGoals, setShowGoalModal }: any) => {
        const recommendedGoal = useMemo(() => {
            if (activeGoals.length === 0) return null;
            const currentRecommended = activeGoals.find((g: any) => {
                if (!g.recommendedSince) return false;
                const hoursSince = (Date.now() - g.recommendedSince) / (60 * 60 * 1000);
                return hoursSince < 24;
            });
            if (currentRecommended) return currentRecommended;
  
            const scored = activeGoals.map((goal: any) => {
                let score = goal.priority;
                if (goal.startedDaysAgo <= 3) score += 3;
                if (goal.lastWorkedDaysAgo === 0) score += 4;
                const progress = (goal.currentStep || 0) / (goal.totalSteps || 1);
                if (progress > 0.7) score += 5;
                if (goal.lastWorkedDaysAgo > 7) score -= 3;
                return { ...goal, aiScore: score };
            });
            return scored.reduce((best: any, current: any) => current.aiScore > best.aiScore ? current : best, scored[0]);
        }, [activeGoals]);
  
        const otherGoals = activeGoals.filter((g: any) => g.id !== recommendedGoal?.id);
  
        return (
          <div className="desktop-content">
              <div className="content-container">
                  <section className="hero-desktop">
                      <h1 className="desktop-h1 font-serif mb-3 tracking-tight text-[var(--text-primary)]">Active Goals</h1>
                      <p className="desktop-body text-[var(--text-secondary)] mb-2">What you're working toward</p>
                      <p className="desktop-small text-[var(--text-tertiary)] italic opacity-60">These are shaping who you're becoming.</p>
                  </section>
  
                  <section className="section-primary">
                      <button onClick={() => setShowGoalModal(true)} className="px-6 py-3 bg-primary text-primary-foreground rounded-[12px] font-medium transition-all hover:scale-[1.02] active:scale-98 shadow-xl shadow-primary/10 flex items-center gap-2 font-sans text-[15px]">
                          <Plus size={18} strokeWidth={2.5} /> New Goal
                      </button>
                  </section>
  
                  {recommendedGoal && (
                      <section className="section-secondary">
                            <div className="flex items-center justify-between mb-2">
                              <h2 className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] font-medium font-sans opacity-60">Recommended Focus</h2>
                          </div>
                          <GoalRow key={recommendedGoal.id} goal={recommendedGoal} isRecommended={true} />
                      </section>
                  )}
  
                  {otherGoals.length > 0 && (
                      <section className="section-tertiary">
                          <h2 className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2 mt-8 font-medium font-sans opacity-60">Other Active Goals</h2>
                          <div>
                              {otherGoals.map((g: any) => (
                                  <GoalRow key={g.id} goal={g} isRecommended={false} />
                              ))}
                          </div>
                      </section>
                  )}
  
                  {activeGoals.length === 0 && (
                      <div className="text-center py-24">
                          <div className="text-6xl mb-6 grayscale opacity-40">🎯</div>
                          <p className="text-[var(--text-tertiary)] text-xl mb-3 font-sans">No active goals yet</p>
                      </div>
                  )}
              </div>
          </div>
        );
    };
  
    export const ProjectActivityView = ({ activities }: any) => {
        const getActivityIcon = (type: string) => {
            switch (type) {
                case 'task':
                    return <ListTodo size={16} className="text-[var(--text-tertiary)]" />;
                case 'note':
                    return <FileText size={16} className="text-[var(--text-tertiary)]" />;
                default:
                    return <Activity size={16} className="text-[var(--text-tertiary)]" />;
            }
        };
    
        return (
            <div className="desktop-content">
                <div className="content-container">
                    <section className="hero-desktop">
                        <h1 className="desktop-h1 font-serif mb-3 tracking-tight text-[var(--text-primary)]">Activity</h1>
                        <p className="desktop-body text-[var(--text-secondary)]">A log of recent project events.</p>
                    </section>
    
                    <section className="section-secondary">
                        <div className="space-y-2">
                            {activities && activities.length > 0 ? (
                                activities.map((activity: any) => (
                                    <div key={activity.id} className="py-4 border-b border-[var(--border)] last:border-0 flex items-start gap-4">
                                        <div className="mt-1">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-[var(--text-primary)] font-sans">{activity.content}</p>
                                            <p className="text-xs text-[var(--text-tertiary)] font-sans mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-xl">
                                    <p className="text-[var(--text-tertiary)] text-lg mb-6 font-sans">No activity to show yet.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        );
    };

    export const CompletedView = ({ achievements }: any) => {
        const grouped = useMemo(() => {
            const thisMonth: any[] = [];
            const earlier: any[] = [];
            achievements.forEach((a: any) => {
                if (a.completedDaysAgo <= 30) thisMonth.push(a);
                else earlier.push(a);
            });
            return { thisMonth, earlier };
        }, [achievements]);
  
        return (
          <div className="desktop-content">
              <div className="content-container">
                  <section className="hero-desktop">
                      <h1 className="desktop-h1 font-serif mb-3 tracking-tight text-[var(--text-primary)]">Completed</h1>
                      <p className="desktop-body text-[var(--text-secondary)] mb-2">Look how far you've come.</p>
                  </section>
                  <div className="space-y-12">
                      {grouped.thisMonth.length > 0 && (
                          <section className="section-secondary">
                              <div className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mb-4 font-medium font-sans opacity-60">This Month</div>
                              <div>
                                  {grouped.thisMonth.map((a: any) => <AchievementRow key={a.id} achievement={a} />)}
                              </div>
                          </section>
                      )}
                      {grouped.earlier.length > 0 && (
                          <section className="section-tertiary">
                              <div className="text-[11px] uppercase tracking-widest text-[var(--text-tertiary)] mb-4 font-medium font-sans opacity-60">Earlier</div>
                              <div>
                                  {grouped.earlier.map((a: any) => <AchievementRow key={a.id} achievement={a} />)}
                              </div>
                          </section>
                      )}
                  </div>
                  {achievements.length === 0 && (
                      <div className="text-center py-24">
                          <div className="text-6xl mb-6 grayscale opacity-40">✅</div>
                          <p className="text-[var(--text-tertiary)] text-xl mb-3 font-sans">Your completed goals will appear here</p>
                      </div>
                  )}
              </div>
          </div>
        );
    };
  
    export const FocusMode = ({ onExit, stepIndex, setStepIndex, steps }: any) => {
      const [animating, setAnimating] = useState(false);
      const currentStep = steps[stepIndex] || steps[0];
      const isLastStep = stepIndex === steps.length - 1;
      
      const handleNext = () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
        setAnimating(true);
        setTimeout(() => {
            if (isLastStep) onExit();
            else setStepIndex((prev: any) => prev + 1);
            setAnimating(false);
        }, 400); 
      };
      
      return (
        <div className="h-full flex flex-col bg-[var(--bg)] animate-in fade-in duration-500">
          <div className="h-14 flex-none flex items-center justify-between px-6 border-b border-[var(--border)]">
            <button onClick={onExit} className="flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft size={18} /><span className="text-sm font-medium font-sans">Exit Focus</span>
            </button>
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--text-tertiary)]">{currentStep.title}</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">Step {stepIndex + 1} of {steps.length}</span>
            </div>
            <div className="w-20" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
            <div className={`w-full max-w-[480px] bg-[var(--surface-hover)] border border-[var(--border)] rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col gap-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${animating ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"}`}>
                <div className="flex items-center gap-2 mb-1"><span className="text-[hsl(var(--accent))] text-xs font-bold px-2 py-1 rounded-md bg-[var(--accent-subtle)] uppercase tracking-wider">Action</span></div>
                <div className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-medium text-[var(--text-primary)] font-sans leading-tight">{currentStep.instruction}</h2>
                    <p className="text-[var(--text-secondary)] text-base font-sans leading-relaxed">{currentStep.detail}</p>
                </div>
                <div className="pt-2 flex flex-col gap-3">
                    <button onClick={handleNext} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                        <CheckCircle2 size={18} className="text-primary-foreground" /> I did it
                    </button>
                    <button className="w-full py-3 rounded-xl bg-transparent border border-[var(--border-strong)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] font-medium text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <HelpCircle size={16} /> This is too hard
                    </button>
                </div>
            </div>
          </div>
        </div>
      );
    };

export const BillingModal = ({ user, onClose }: any) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="w-full max-w-[520px] bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Billing</h2>
          <button
            onClick={onClose}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan Info */}
        <div className="bg-[var(--surface-raised)] rounded-xl p-4 mb-4 border border-[var(--border)]">
          <p className="text-[var(--text-tertiary)] text-sm mb-1">Current Plan</p>
          <div className="flex items-center justify-between">
            <h3 className="text-[var(--text-primary)] font-semibold">Calmora {user.plan}</h3>
            <span className="text-[hsl(var(--accent))] font-medium">$19 / month</span>
          </div>
          <p className="text-[var(--success)] text-sm mt-1">Active subscription</p>
        </div>

        {/* Billing Cycle */}
        <div className="bg-[var(--surface-raised)] rounded-xl p-4 mb-4 border border-[var(--border)]">
          <p className="text-[var(--text-tertiary)] text-sm mb-2">Billing Cycle</p>

          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-tertiary)]">Next billing date</span>
            <span className="text-[var(--text-primary)]">Aug 25, 2026</span>
          </div>

          <div className="flex justify-between text-sm mt-1">
            <span className="text-[var(--text-tertiary)]">Billing interval</span>
            <span className="text-[var(--text-primary)]">Monthly</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-[var(--surface-raised)] rounded-xl p-4 mb-6 border border-[var(--border)]">
          <p className="text-[var(--text-tertiary)] text-sm mb-2">Payment Method</p>

          <div className="flex items-center justify-between">
            <span className="text-[var(--text-primary)]">
              Visa •••• 4242
            </span>

            <button className="text-[hsl(var(--accent))] hover:text-[var(--accent-hover)] text-sm font-medium">
              Update
            </button>
          </div>

          <p className="text-[var(--text-tertiary)] text-xs mt-1">
            Expires 12/27
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">

          <button className="flex-1 bg-[var(--surface-hover)] hover:bg-[var(--surface-raised)] text-[var(--text-primary)] rounded-lg py-2 text-sm border border-[var(--border)]">
            Change Plan
          </button>

          <button className="flex-1 btn-primary justify-center">
            Manage Subscription
          </button>

        </div>
      </div>
    </div>
  );
};

export const EditProfileModal = ({ user, onSave, onClose }: any) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    onSave({ ...user, name });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Edit Profile</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-label">Full Name</label>
          <input
            type="text"
            className="modal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            autoFocus
          />
          <label className="modal-label" style={{ marginTop: '20px' }}>Email Address</label>
          <input
            type="email"
            className="modal-input"
            value={email}
            disabled
            readOnly
          />
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={!name.trim()}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export const ChangePasswordModal = ({ onClose }: any) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const canSave = currentPassword && newPassword && newPassword === confirmPassword;

  const handleSave = () => {
    console.log("Password change requested.");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Change Password</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="modal-body">
          <div style={{ marginBottom: 16 }}>
            <label className="modal-label">Current Password</label>
            <div style={{position: 'relative'}}>
              <input
                type={showPasswords ? "text" : "password"}
                className="modal-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="modal-label">New Password</label>
             <div style={{position: 'relative'}}>
              <input
                type={showPasswords ? "text" : "password"}
                className="modal-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="modal-label">Confirm New Password</label>
             <div style={{position: 'relative'}}>
              <input
                type={showPasswords ? "text" : "password"}
                className="modal-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
           <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-secondary)]">
                <input type="checkbox" checked={showPasswords} onChange={() => setShowPasswords(!showPasswords)} />
                Show Passwords
            </label>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={!canSave}>Update Password</button>
        </div>
      </div>
    </div>
  );
};

export const SettingsSheet = ({ open, onClose, user, theme, setTheme, onUpdateUser }: any) => {
    const [view, setView] = useState('main');

    const [name, setName] = useState(user.name);
    const [email, ] = useState(user.email);
    const handleProfileSave = () => {
        onUpdateUser({ ...user, name });
        setView('main');
    };

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const canSavePassword = currentPassword && newPassword && newPassword === confirmPassword;

    const handlePasswordSave = () => {
        console.log("Password change requested.");
        setView('main');
    };
    
    useEffect(() => {
        if(open) {
            setView('main');
        }
    }, [open]);

    if (!open) return null;

    const getTitle = () => {
        switch(view) {
            case 'profile': return 'Edit Profile';
            case 'password': return 'Change Password';
            case 'billing': return 'Billing';
            default: return 'Settings';
        }
    };

    const renderSheetContent = () => {
        switch (view) {
            case 'profile':
                return (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="modal-label">Full Name</label>
                                <input type="text" className="modal-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoFocus />
                            </div>
                            <div>
                                <label className="modal-label">Email Address</label>
                                <input type="email" className="modal-input" value={email} disabled readOnly />
                            </div>
                        </div>
                        <button className="btn-primary w-full mt-6" onClick={handleProfileSave} disabled={!name.trim()}>Save Changes</button>
                    </>
                );
            case 'password':
                return (
                     <>
                        <div className="space-y-4">
                            <div>
                                <label className="modal-label">Current Password</label>
                                <input type={showPasswords ? "text" : "password"} className="modal-input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} autoFocus />
                            </div>
                            <div>
                                <label className="modal-label">New Password</label>
                                <input type={showPasswords ? "text" : "password"} className="modal-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div>
                                <label className="modal-label">Confirm New Password</label>
                                <input type={showPasswords ? "text" : "password"} className="modal-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-secondary)] pt-2">
                                <input type="checkbox" checked={showPasswords} onChange={() => setShowPasswords(!showPasswords)} />
                                Show Passwords
                            </label>
                        </div>
                        <button className="btn-primary w-full mt-6" onClick={handlePasswordSave} disabled={!canSavePassword}>Update Password</button>
                    </>
                );
            case 'billing':
                return (
                    <>
                        <div className="space-y-4">
                            <div className="bg-[var(--surface-raised)] rounded-xl p-4 border border-[var(--border)]">
                                <p className="text-[var(--text-tertiary)] text-sm mb-1">Current Plan</p>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[var(--text-primary)] font-semibold">Calmora {user.plan}</h3>
                                    <span className="text-[hsl(var(--accent))] font-medium">$19 / month</span>
                                </div>
                                <p className="text-[var(--success)] text-sm mt-1">Active subscription</p>
                            </div>
                            <div className="bg-[var(--surface-raised)] rounded-xl p-4 border border-[var(--border)]">
                                <p className="text-[var(--text-tertiary)] text-sm mb-2">Billing Cycle</p>
                                <div className="flex justify-between text-sm"><span className="text-[var(--text-tertiary)]">Next billing date</span><span className="text-[var(--text-primary)]">Aug 25, 2026</span></div>
                                <div className="flex justify-between text-sm mt-1"><span className="text-[var(--text-tertiary)]">Billing interval</span><span className="text-[var(--text-primary)]">Monthly</span></div>
                            </div>
                            <div className="bg-[var(--surface-raised)] rounded-xl p-4 border border-[var(--border)]">
                                <p className="text-[var(--text-tertiary)] text-sm mb-2">Payment Method</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[var(--text-primary)]">Visa •••• 4242</span>
                                    <button className="text-[hsl(var(--accent))] hover:text-[var(--accent-hover)] text-sm font-medium">Update</button>
                                </div>
                                <p className="text-[var(--text-tertiary)] text-xs mt-1">Expires 12/27</p>
                            </div>
                             <div className="bg-[var(--surface-raised)] rounded-xl p-4 border border-[var(--border)]">
                                <p className="text-[var(--text-tertiary)] text-sm mb-2">History</p>
                                <div className="flex flex-col items-start gap-2">
                                    <button className="text-sm text-[hsl(var(--accent))] hover:text-[var(--accent-hover)] font-medium">View invoices</button>
                                    <button className="text-sm text-[hsl(var(--accent))] hover:text-[var(--accent-hover)] font-medium">Payment history</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 bg-[var(--surface-hover)] hover:bg-[var(--surface-raised)] text-[var(--text-primary)] rounded-lg py-2 text-sm border border-[var(--border)]">Change Plan</button>
                            <button className="flex-1 btn-primary justify-center">Manage Subscription</button>
                        </div>
                    </>
                );
            default:
                return (
                     <>
                        <div className="space-y-6">
                             <div>
                                 <h3 className="text-[var(--text-tertiary)] text-xs font-medium uppercase tracking-wider mb-2">Appearance</h3>
                                 <div className="bg-[var(--surface-raised)] p-3 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--text-primary)] font-medium text-sm pl-1">Theme</span>
                                        <div className="flex items-center gap-1 bg-[var(--bg)] p-1 rounded-lg border border-[var(--border)]">
                                            <button onClick={() => setTheme('light')} className={`px-3 py-1.5 rounded-md text-sm transition ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>Light</button>
                                            <button onClick={() => setTheme('dark')} className={`px-3 py-1.5 rounded-md text-sm transition ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>Dark</button>
                                        </div>
                                    </div>
                                </div>
                             </div>
                             <div>
                                 <h3 className="text-[var(--text-tertiary)] text-xs font-medium uppercase tracking-wider mb-2">Account</h3>
                                 <div className="bg-[var(--surface-raised)] p-2 rounded-xl space-y-1">
                                     <button onClick={() => setView('profile')} className="w-full text-left p-3 rounded-lg text-[var(--text-primary)] font-medium flex items-center justify-between text-sm hover:bg-[var(--surface-hover)]"><span>Profile</span> <ChevronRight size={16} /></button>
                                     <button onClick={() => setView('password')} className="w-full text-left p-3 rounded-lg text-[var(--text-primary)] font-medium flex items-center justify-between text-sm hover:bg-[var(--surface-hover)]"><span>Password</span> <ChevronRight size={16} /></button>
                                     <button onClick={() => setView('billing')} className="w-full text-left p-3 rounded-lg text-[var(--text-primary)] font-medium flex items-center justify-between text-sm hover:bg-[var(--surface-hover)]"><span>Billing</span> <ChevronRight size={16} /></button>
                                 </div>
                             </div>
                             <div className="mt-6">
                                 <h3 className="text-red-500/80 text-xs font-medium uppercase tracking-wider mb-2">Danger Zone</h3>
                                 <div className="bg-red-500/10 border border-red-500/30 p-2 rounded-xl">
                                     <button className="w-full text-left p-3 rounded-lg text-red-500 font-medium flex items-center justify-between text-sm hover:bg-red-500/10"><span>Delete Account</span> <ChevronRight size={16} /></button>
                                 </div>
                             </div>
                         </div>
                    </>
                );
        }
    };
    
    return (
        <div className="fixed inset-0 z-[1001] flex items-end justify-center">
            <div
                className="absolute inset-0 z-[1002] bg-black/40 backdrop-blur-md"
                onClick={onClose}
            />
            <div className="relative w-full bg-[var(--surface)] rounded-t-3xl border-t border-[var(--border)] shadow-[0_20px_80px_rgba(0,0,0,0.6)] flex flex-col animate-sheet-up" style={{maxHeight: 'fit-content'}}>
                
                {/* Drag Handle */}
                <div className="flex-shrink-0">
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="w-10 h-1 bg-[var(--border-strong)] rounded-full"/>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto custom-scrollbar px-5 pb-6">
                    <div className="flex items-center justify-between mb-4">
                        {view !== 'main' ? (
                            <button onClick={() => setView('main')} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] -ml-1">
                                <ArrowLeft size={16} /> Back
                            </button>
                        ) : <div />}
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] absolute left-1/2 -translate-x-1/2">
                            {getTitle()}
                        </h2>
                        <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                            <X size={20} />
                        </button>
                    </div>
                    {renderSheetContent()}
                </div>
            </div>
        </div>
    );
};

export const SettingsView = ({ user, theme, setTheme, onShowEditProfile, onShowChangePassword, onShowBilling }: any) => {
    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1 className="settings-title">Settings</h1>
                <p className="settings-subtitle">Manage your account and preferences.</p>
            </div>

            <div className="settings-content">
                 <div className="settings-card">
                    <div className="card-header">
                        <h2 className="card-title">Appearance</h2>
                    </div>
                    <div className="card-content">
                        <div className="setting-row">
                            <div className="setting-info">
                                <div className="setting-label">Theme</div>
                                <div className="setting-desc">
                                    Choose between light and dark mode.
                                </div>
                            </div>
                            <div className="theme-toggle">
                                <button 
                                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                                    onClick={() => setTheme('light')}>
                                    <Sun size={14} /> Light
                                </button>
                                <button 
                                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                                    onClick={() => setTheme('dark')}>
                                    <Moon size={14} /> Dark
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-card">
                    <div className="card-header">
                        <h2 className="card-title">Account</h2>
                    </div>
                    <div className="card-content">
                        <div className="setting-row">
                            <div className="setting-info">
                                <div className="setting-label">Profile</div>
                                <div className="setting-desc">Your name and email address.</div>
                            </div>
                            <button className="btn-secondary" onClick={onShowEditProfile}>
                                <User size={14} /> Edit Profile
                            </button>
                        </div>
                         <div className="setting-row">
                            <div className="setting-info">
                                <div className="setting-label">Password</div>
                                <div className="setting-desc">Update your login password.</div>
                            </div>
                            <button className="btn-secondary" onClick={onShowChangePassword}>
                                <KeyRound size={14} /> Change Password
                            </button>
                        </div>
                        <div className="setting-row">
                            <div className="setting-info">
                                <div className="setting-label">Billing</div>
                                <div className="setting-desc">Manage your subscription and view invoices.</div>
                            </div>
                            <button className="btn-secondary" onClick={onShowBilling}>
                                <CreditCard size={14} /> Manage Billing
                            </button>
                        </div>
                    </div>
                </div>

                <div className="settings-card danger-card">
                    <div className="card-header">
                        <h2 className="card-title">Danger Zone</h2>
                    </div>
                    <div className="card-content">
                        <div className="setting-row">
                            <div className="setting-info">
                                <div className="setting-label">Delete Account</div>
                                <div className="setting-desc">
                                    Permanently delete your account and all data. This action cannot be undone.
                                </div>
                            </div>
                            <button className="btn-danger">
                                <Trash2 size={14} strokeWidth={2} />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
    










    











