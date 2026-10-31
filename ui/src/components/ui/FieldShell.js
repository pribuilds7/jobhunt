import FieldError from './FieldError';

export default function FieldShell({ id, label, error, aside, children }) {
  return (
    <div className="field">
      <div className="field-label-row">
        <label htmlFor={id} className="field-label">{label}</label>
        {aside}
      </div>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function inputA11y(id, error) {
  return { id, 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined };
}
