import Avatar from '../ui/Avatar';
import CardPills from './CardPills';
import NextAction from './NextAction';
import { dateContext } from '../../lib/applications';

export default function ApplicationCard({ application, className = '', ...buttonProps }) {
  return (
    <button type="button" className={`app-card ${className}`} {...buttonProps}>
      <span className="app-card-head">
        <Avatar name={application.company} />
        <span className="app-card-titles">
          <span className="app-card-role">{application.role}</span>
          <span className="app-card-company">{application.company}</span>
        </span>
      </span>
      <CardPills application={application} />
      <span className="app-card-footer">
        <span>{dateContext(application)}</span>
        <NextAction application={application} />
      </span>
    </button>
  );
}
