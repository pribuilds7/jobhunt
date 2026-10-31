function toHex(buffer) {
  const bytes = Array.from(new Uint8Array(buffer));
  const parts = bytes.map((byte) => byte.toString(16).padStart(2, '0'));
  return parts.join('');
}

export async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return toHex(digest);
}

export function passwordStrength(password) {
  const checks = [
    password.length >= 12,
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
    /[a-z]/.test(password) && /[A-Z]/.test(password),
  ];
  const passed = checks.filter(Boolean);
  return passed.length;
}

export const STRENGTH_LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
