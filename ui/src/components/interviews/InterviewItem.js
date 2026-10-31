import Avatar from '../ui/Avatar';
import { useUiStore } from '../../store/uiStore';

export default function InterviewItem({ event }) {
  const openApplication = useUiStore((state) => state.openApplication);
  const { application } = event;
  return (
    <li>
      <button type="button" className="list-row" onClick={() => openApplication(application.id)}>
        <Avatar name={application.company} />
        <span className="list-row-main">
          <span className="app-card-role">{event.text}</span>
          <span className="app-card-company">{application.role} · {application.company}</span>
        </span>
      </button>
    </li>
  );
}
