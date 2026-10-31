import { statusIndex } from './status';

function sortValue(application, key) {
  if (key === 'status') return statusIndex(application.status);
  const value = application[key] ?? '';
  return value.toLowerCase();
}

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function sortApplications(applications, sort) {
  const factor = sort.direction === 'asc' ? 1 : -1;
  const sorted = [...applications];
  sorted.sort((a, b) => compare(sortValue(a, sort.key), sortValue(b, sort.key)) * factor);
  return sorted;
}

export function nextSort(current, key) {
  if (current.key !== key) return { key, direction: 'asc' };
  const direction = current.direction === 'asc' ? 'desc' : 'asc';
  return { key, direction };
}
