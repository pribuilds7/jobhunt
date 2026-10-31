import { Clock } from 'lucide-react';
import { isOverdue, shortDate } from '../../lib/dates';

export default function DueDate({ iso }) {
  if (!iso) return <span className="muted">—</span>;
  if (!isOverdue(iso)) return <span>{shortDate(iso)}</span>;
  return (
    <span className="overdue">
      <Clock size={14} aria-hidden="true" />
      {shortDate(iso)}
      <span className="visually-hidden"> (overdue)</span>
    </span>
  );
}
