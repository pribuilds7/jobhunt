import { passwordStrength, STRENGTH_LABELS } from '../../lib/password';

const SEGMENTS = [1, 2, 3, 4];

export default function StrengthMeter({ password }) {
  const strength = passwordStrength(password);
  return (
    <div className="strength">
      <div className="strength-bar" aria-hidden="true">
        {SEGMENTS.map((segment) => (
          <span key={segment} className={segment <= strength ? 'strength-seg is-filled' : 'strength-seg'} />
        ))}
      </div>
      <p className="helper-text" aria-live="polite">
        {password ? STRENGTH_LABELS[strength] : 'Use 8+ characters. Mix in numbers, symbols and capitals.'}
      </p>
    </div>
  );
}
