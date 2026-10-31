import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';
import NavList from './NavList';
import WeeklyGoal from './WeeklyGoal';
import UserMenu from './UserMenu';

function MenuToggle({ open, onToggle }) {
  return (
    <button type="button" className="icon-btn sidebar-toggle" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={onToggle}>
      {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
    </button>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <aside className={open ? 'sidebar is-open' : 'sidebar'}>
      <div className="sidebar-top">
        <Logo />
        <MenuToggle open={open} onToggle={() => setOpen(!open)} />
      </div>
      <div className="sidebar-body">
        <NavList onNavigate={close} />
        <div className="sidebar-bottom">
          <WeeklyGoal />
          <UserMenu onNavigate={close} />
        </div>
      </div>
    </aside>
  );
}
