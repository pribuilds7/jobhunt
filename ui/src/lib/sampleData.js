import { addDays, format } from 'date-fns';
import { newId } from './ids';
import { nowIso } from './dates';

function day(offset) {
  return format(addDays(new Date(), offset), 'yyyy-MM-dd');
}

function event(type, offset, text) {
  return { id: newId(), type, at: day(offset), text };
}

function sample(fields) {
  const now = nowIso();
  return { id: newId(), contactIds: [], timeline: [], createdAt: now, updatedAt: now, ...fields };
}

const northwind = () => sample({
  company: 'Northwind', role: 'Product Designer', location: 'Remote', workMode: 'remote',
  salary: '$110–130k', status: 'wishlist', source: 'LinkedIn',
  nextAction: 'Tailor portfolio', nextActionDue: day(3),
});

const lumen = () => sample({
  company: 'Lumen Labs', role: 'Frontend Engineer', location: 'Berlin', workMode: 'hybrid',
  salary: '€70–85k', status: 'applied', source: 'Careers page', appliedAt: day(-6),
  nextAction: 'Follow up', nextActionDue: day(-1),
  timeline: [event('status', -6, 'Moved to Applied')],
});

const harbor = () => sample({
  company: 'Harbor & Co', role: 'UX Researcher', location: 'London', workMode: 'onsite',
  salary: '£55–65k', status: 'applied', source: 'Referral', appliedAt: day(-3),
  nextAction: 'Follow up', nextActionDue: day(4),
  timeline: [event('status', -3, 'Moved to Applied')],
});

const fieldnote = () => sample({
  company: 'Fieldnote', role: 'Design Engineer', location: 'New York', workMode: 'hybrid',
  salary: '$140–160k', status: 'interviewing', source: 'Recruiter', appliedAt: day(-14),
  nextAction: 'Prep case study', nextActionDue: day(2),
  timeline: [
    event('status', -14, 'Moved to Applied'),
    event('interview', -5, 'Recruiter screen'),
    event('status', -5, 'Moved to Interviewing'),
    event('interview', 2, 'Portfolio review with the design team'),
  ],
});

const quarry = () => sample({
  company: 'Quarry', role: 'Senior Product Designer', location: 'Remote', workMode: 'remote',
  salary: '$150k', status: 'offer', source: 'Referral', appliedAt: day(-25),
  nextAction: 'Review offer', nextActionDue: day(5),
  timeline: [event('status', -25, 'Moved to Applied'), event('status', -2, 'Moved to Offer')],
});

const tidewater = () => sample({
  company: 'Tidewater', role: 'Product Manager', location: 'Toronto', workMode: 'onsite',
  status: 'closed', closedReason: 'rejected', source: 'Job board', appliedAt: day(-30),
  timeline: [event('status', -30, 'Moved to Applied'), event('status', -10, 'Moved to Closed')],
});

export function sampleApplications() {
  return [northwind(), lumen(), harbor(), fieldnote(), quarry(), tidewater()];
}
