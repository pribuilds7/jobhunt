import { Briefcase } from 'lucide-react';

export default function Logo({ tone = 'accent' }) {
  return (
    <span className="logo">
      <span className={`logo-tile logo-tile-${tone}`}>
        <Briefcase size={20} aria-hidden="true" />
      </span>
      <span className="logo-word">Hunt</span>
    </span>
  );
}
