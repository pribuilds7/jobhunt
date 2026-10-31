import { CalendarClock, Flag, Mail, StickyNote } from 'lucide-react';
import { shortDate } from '../../lib/dates';

const ICONS = { status: Flag, interview: CalendarClock, note: StickyNote, email: Mail };

export default function TimelineItem({ event }) {
  const Icon = ICONS[event.type];
  return (
    <li className="timeline-item">
      <span className="timeline-icon"><Icon size={16} aria-hidden="true" /></span>
      <span className="timeline-text">{event.text}</span>
      <time className="timeline-date" dateTime={event.at}>{shortDate(event.at)}</time>
    </li>
  );
}
