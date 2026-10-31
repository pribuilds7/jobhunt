import { Link } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useDataStore } from '../../store/dataStore';

export default function UserMenu({ onNavigate }) {
  const logOut = useAuthStore((state) => state.logOut);
  const name = useDataStore((state) => state.profile?.name ?? 'You');
  return (
    <div className="user-menu">
      <Avatar name={name} />
      <span className="user-name">{name}</span>
      <Link to="/settings" className="icon-btn" aria-label="Settings" onClick={onNavigate}>
        <Settings size={18} aria-hidden="true" />
      </Link>
      <button type="button" className="icon-btn" aria-label="Log out" onClick={logOut}>
        <LogOut size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
