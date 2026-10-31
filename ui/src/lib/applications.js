import { newestFirst, shortDate } from './dates';

export function initial(name) {
  const trimmed = (name || '?').trim();
  return trimmed.charAt(0).toUpperCase();
}

export function interviewEvents(application) {
  return application.timeline.filter((event) => event.type === 'interview');
}

function roundLabel(interviews) {
  const sorted = [...interviews].sort(newestFirst);
  return `Round ${interviews.length} · ${shortDate(sorted[0].at)}`;
}

export function dateContext(application) {
  const interviews = interviewEvents(application);
  if (application.status === 'interviewing' && interviews.length > 0) {
    return roundLabel(interviews);
  }
  if (application.appliedAt) return `Applied ${shortDate(application.appliedAt)}`;
  return `Added ${shortDate(application.createdAt)}`;
}

export function matchesSearch(application, query) {
  const text = `${application.company} ${application.role}`.toLowerCase();
  const needle = query.trim().toLowerCase();
  return text.includes(needle);
}

export function byStatus(applications, status) {
  return applications.filter((application) => application.status === status);
}
