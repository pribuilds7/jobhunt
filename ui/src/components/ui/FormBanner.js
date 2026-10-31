import { CircleAlert } from 'lucide-react';

export default function FormBanner({ message }) {
  if (!message) return null;
  return (
    <div className="form-banner" role="alert">
      <CircleAlert size={18} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
