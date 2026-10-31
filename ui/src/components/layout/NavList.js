import { NavLink } from 'react-router-dom';
import { CalendarDays, FileText, List, SquareKanban, Users } from 'lucide-react';

const ITEMS = [
  { to: '/', label: 'Pipeline', icon: SquareKanban },
  { to: '/applications', label: 'All applications', icon: List },
  { to: '/interviews', label: 'Interviews', icon: CalendarDays },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/contacts', label: 'Contacts', icon: Users },
];

function navClass({ isActive }) {
  return isActive ? 'nav-item is-active' : 'nav-item';
}

export default function NavList({ onNavigate }) {
  return (
    <nav aria-label="Main">
      <ul className="nav-list">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} end={to === '/'} className={navClass} onClick={onNavigate}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
