import EventForm from './EventForm';
import TimelineItem from './TimelineItem';
import { newestFirst } from '../../lib/dates';

export default function TimelineSection({ application }) {
  const events = [...application.timeline];
  events.sort(newestFirst);
  return (
    <div className="drawer-section">
      <EventForm applicationId={application.id} />
      <ol className="timeline">
        {events.map((event) => <TimelineItem key={event.id} event={event} />)}
      </ol>
    </div>
  );
}
