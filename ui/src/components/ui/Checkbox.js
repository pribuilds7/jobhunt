import FieldError from './FieldError';

export default function Checkbox({ id, error, children, ...inputProps }) {
  return (
    <div className="field">
      <label className="checkbox" htmlFor={id}>
        <input id={id} type="checkbox" aria-invalid={Boolean(error)} {...inputProps} />
        <span>{children}</span>
      </label>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
