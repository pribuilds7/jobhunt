import { interviewEvents } from './applications';
import { isUpcoming, oldestFirst } from './dates';

function eventsWithApplication(application) {
  const events = interviewEvents(application);
  return events.map((event) => ({ ...event, application }));
}

export function upcomingInterviews(applications) {
  const all = applications.flatMap(eventsWithApplication);
  const upcoming = all.filter((event) => isUpcoming(event.at));
  upcoming.sort(oldestFirst);
  return upcoming;
}

export function groupByDay(events) {
  const groups = new Map();
  for (const event of events) {
    const day = event.at.slice(0, 10);
    const existing = groups.get(day) ?? [];
    groups.set(day, [...existing, event]);
  }
  return Array.from(groups.entries());
}
