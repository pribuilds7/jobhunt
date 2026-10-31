import Avatar from '../ui/Avatar';
import StatusBadge from '../ui/StatusBadge';

export default function BrandCard({ company, role, status, offset }) {
  return (
    <div className="brand-card" style={{ marginLeft: offset }}>
      <Avatar name={company} />
      <div className="brand-card-text">
        <span className="app-card-role">{role}</span>
        <span className="app-card-company">{company}</span>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}
