import { postJson } from './api';

export function signupRequest({ name, email, password, targetRole }) {
  const payload = { name, email, password, target_role: targetRole };
  return postJson('/api/v1/signup', payload);
}
