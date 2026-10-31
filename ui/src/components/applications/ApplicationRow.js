import StatusBadge from '../ui/StatusBadge';
import DueDate from './DueDate';
import { shortDate } from '../../lib/dates';
import { useUiStore } from '../../store/uiStore';

export default function ApplicationRow({ application }) {
  const openApplication = useUiStore((state) => state.openApplication);
  return (
    <tr>
      <td>
        <button type="button" className="text-link strong" onClick={() => openApplication(application.id)}>
          {application.company}
        </button>
      </td>
      <td>{application.role}</td>
      <td><StatusBadge status={application.status} /></td>
      <td>{shortDate(application.appliedAt) || '—'}</td>
      <td>{application.nextAction || '—'}</td>
      <td><DueDate iso={application.nextActionDue} /></td>
    </tr>
  );
}
