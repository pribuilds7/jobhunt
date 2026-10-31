import { CircleAlert } from 'lucide-react';

export default function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error" role="alert">
      <CircleAlert size={14} aria-hidden="true" />
      {message}
    </p>
  );
}
