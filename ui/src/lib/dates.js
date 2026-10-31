import { endOfWeek, format, isBefore, isWithinInterval, parseISO, startOfDay, startOfWeek } from 'date-fns';

export function nowIso() {
  return new Date().toISOString();
}

export function todayIso() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function shortDate(iso) {
  if (!iso) return '';
  return format(parseISO(iso), 'MMM d');
}

export function longDate(iso) {
  return format(parseISO(iso), 'EEEE, MMM d');
}

export function isOverdue(iso) {
  if (!iso) return false;
  const today = startOfDay(new Date());
  return isBefore(parseISO(iso), today);
}

export function isUpcoming(iso) {
  return Boolean(iso) && !isOverdue(iso);
}

export function isThisWeek(iso) {
  if (!iso) return false;
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });
  const end = endOfWeek(now, { weekStartsOn: 1 });
  return isWithinInterval(parseISO(iso), { start, end });
}

export function newestFirst(a, b) {
  return b.at.localeCompare(a.at);
}

export function oldestFirst(a, b) {
  return a.at.localeCompare(b.at);
}
