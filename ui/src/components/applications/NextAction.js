import { Clock } from 'lucide-react';
import { isOverdue, shortDate } from '../../lib/dates';

export default function NextAction({ application }) {
  if (!application.nextAction) return null;
  const overdue = isOverdue(application.nextActionDue);
  return (
    <span className={overdue ? 'next-action is-overdue' : 'next-action'}>
      {overdue && <Clock size={12} aria-label="Overdue" />}
      {application.nextAction}
      {overdue && ` · ${shortDate(application.nextActionDue)}`}
    </span>
  );
}
