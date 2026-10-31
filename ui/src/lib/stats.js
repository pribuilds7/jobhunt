import { interviewEvents } from './applications';
import { isThisWeek } from './dates';

const ACTIVE = ['applied', 'interviewing', 'offer'];
const RESPONDED = ['interviewing', 'offer'];

function hasResponse(application) {
  if (RESPONDED.includes(application.status)) return true;
  if (application.closedReason === 'rejected') return true;
  return interviewEvents(application).length > 0;
}

export function countActive(applications) {
  const active = applications.filter((application) => ACTIVE.includes(application.status));
  return active.length;
}

export function countInterviewsThisWeek(applications) {
  const events = applications.flatMap(interviewEvents);
  const thisWeek = events.filter((event) => isThisWeek(event.at));
  return thisWeek.length;
}

export function responseRate(applications) {
  const applied = applications.filter((application) => application.status !== 'wishlist');
  if (applied.length === 0) return '—';
  const responded = applied.filter(hasResponse);
  return `${Math.round((responded.length / applied.length) * 100)}%`;
}

export function countOffers(applications) {
  const offers = applications.filter((application) => application.status === 'offer');
  return offers.length;
}

export function countAppliedThisWeek(applications) {
  const applied = applications.filter((application) => isThisWeek(application.appliedAt));
  return applied.length;
}
