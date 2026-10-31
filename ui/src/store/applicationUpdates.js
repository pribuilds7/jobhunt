import { newId } from '../lib/ids';
import { nowIso, todayIso } from '../lib/dates';
import { statusLabel } from '../lib/status';

function statusEvent(status) {
  return { id: newId(), type: 'status', at: nowIso(), text: `Moved to ${statusLabel(status)}` };
}

export function fromForm(values) {
  const { contactId, ...rest } = values;
  const contactIds = contactId ? [contactId] : [];
  return { ...rest, contactIds };
}

export function buildApplication(values) {
  const now = nowIso();
  const fields = fromForm(values);
  const timeline = [statusEvent(values.status)];
  return { ...fields, id: newId(), timeline, createdAt: now, updatedAt: now };
}

export function changeStatus(application, status) {
  if (application.status === status) return application;
  const appliedAt = application.appliedAt || (status === 'applied' ? todayIso() : '');
  const timeline = [...application.timeline, statusEvent(status)];
  return { ...application, status, appliedAt, timeline };
}

export function applyEdit(application, values) {
  const edited = { ...application, ...fromForm(values), status: application.status };
  return changeStatus(edited, values.status);
}

export function addEvent(application, event) {
  const timeline = [...application.timeline, { ...event, id: newId() }];
  return { ...application, timeline };
}
