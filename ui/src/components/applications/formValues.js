const TEXT_FIELDS = [
  'company', 'role', 'url', 'location', 'workMode', 'salary', 'closedReason',
  'source', 'appliedAt', 'resumeVersion', 'notes', 'nextAction', 'nextActionDue',
];

export function toFormValues(application = {}) {
  const values = {};
  for (const field of TEXT_FIELDS) {
    values[field] = application[field] ?? '';
  }
  const contactId = application.contactIds?.[0] ?? '';
  return { ...values, status: application.status ?? 'wishlist', contactId };
}
