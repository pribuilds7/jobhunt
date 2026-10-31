import { z } from 'zod';

const required = (message) => z.string().trim().min(1, message);
const optionalText = z.string().optional();
const email = required('Enter your email').email('Enter a valid email address');
const password = z.string().min(8, 'Use at least 8 characters');
const optionalEmail = z.union([z.literal(''), z.string().email('Enter a valid email address')]);
const optionalUrl = z.union([z.literal(''), z.string().url('Enter a full link, starting with https://')]);
const statusIds = ['wishlist', 'applied', 'interviewing', 'offer', 'closed'];

export const loginSchema = z.object({
  email,
  password: required('Enter your password'),
  remember: z.boolean(),
});

export const signupSchema = z.object({
  name: required('Enter your name'),
  email,
  password,
  targetRole: optionalText,
  terms: z.literal(true, { errorMap: () => ({ message: 'Please accept the Terms and Privacy Policy' }) }),
});

export const forgotSchema = z.object({ email });

export const applicationSchema = z.object({
  company: required('Company is required'),
  role: required('Role is required'),
  url: optionalUrl,
  location: optionalText,
  workMode: optionalText,
  salary: optionalText,
  status: z.enum(statusIds),
  closedReason: optionalText,
  source: optionalText,
  appliedAt: optionalText,
  contactId: optionalText,
  resumeVersion: optionalText,
  notes: optionalText,
  nextAction: optionalText,
  nextActionDue: optionalText,
});

export const eventSchema = z.object({
  type: z.enum(['interview', 'note', 'email']),
  at: required('Pick a date'),
  text: required('Add a short description'),
});

export const contactSchema = z.object({
  name: required('Name is required'),
  company: optionalText,
  email: optionalEmail,
  linkedin: optionalUrl,
  notes: optionalText,
});

export const documentSchema = z.object({
  name: required('Name is required'),
  kind: z.enum(['resume', 'cover-letter']),
  note: optionalText,
});

export const profileSchema = z.object({
  name: required('Enter your name'),
  targetRole: optionalText,
  weeklyGoal: z.coerce.number().int('Use a whole number').min(1, 'At least 1').max(100, 'At most 100'),
});

export const passwordChangeSchema = z.object({
  current: required('Enter your current password'),
  next: password,
});
