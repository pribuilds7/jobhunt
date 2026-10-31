export const STATUSES = [
  { id: 'wishlist', label: 'Wishlist', color: '#B0D4E8' },
  { id: 'applied', label: 'Applied', color: '#6FA8C9' },
  { id: 'interviewing', label: 'Interviewing', color: '#2B5F7E' },
  { id: 'offer', label: 'Offer', color: '#1E3A4C' },
  { id: 'closed', label: 'Closed', color: '#A7B4BD' },
];

export const WORK_MODES = [
  { id: 'remote', label: 'Remote' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'onsite', label: 'On-site' },
];

export const CLOSED_REASONS = [
  { id: 'rejected', label: 'Rejected' },
  { id: 'withdrawn', label: 'Withdrawn' },
  { id: 'ghosted', label: 'Ghosted' },
  { id: 'accepted-elsewhere', label: 'Accepted elsewhere' },
];

export const SOURCES = [
  { id: 'LinkedIn', label: 'LinkedIn' },
  { id: 'Referral', label: 'Referral' },
  { id: 'Careers page', label: 'Careers page' },
  { id: 'Job board', label: 'Job board' },
  { id: 'Recruiter', label: 'Recruiter' },
  { id: 'Other', label: 'Other' },
];

export const EVENT_TYPES = [
  { id: 'interview', label: 'Interview' },
  { id: 'note', label: 'Note' },
  { id: 'email', label: 'Email' },
];

export const DOCUMENT_KINDS = [
  { id: 'resume', label: 'Resume' },
  { id: 'cover-letter', label: 'Cover letter' },
];

export function findStatus(id) {
  return STATUSES.find((status) => status.id === id);
}

export function statusLabel(id) {
  const status = findStatus(id);
  return status ? status.label : id;
}

export function statusIndex(id) {
  return STATUSES.findIndex((status) => status.id === id);
}
