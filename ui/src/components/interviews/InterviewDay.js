import InterviewItem from './InterviewItem';
import { longDate } from '../../lib/dates';

export default function InterviewDay({ day, events }) {
  return (
    <section className="day-group">
      <h2 className="caps-label">{longDate(day)}</h2>
      <ul className="list">
        {events.map((event) => <InterviewItem key={event.id} event={event} />)}
      </ul>
    </section>
  );
}
