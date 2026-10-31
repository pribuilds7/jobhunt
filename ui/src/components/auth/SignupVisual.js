import { Check } from 'lucide-react';

const BENEFITS = [
  'See every application on one calm board',
  'Never miss a follow-up or interview',
  'Keep resumes and contacts next to each role',
];

export default function SignupVisual() {
  return (
    <ul className="tick-list">
      {BENEFITS.map((benefit) => (
        <li key={benefit} className="tick-item">
          <span className="tick-chip"><Check size={16} aria-hidden="true" /></span>
          {benefit}
        </li>
      ))}
    </ul>
  );
}
