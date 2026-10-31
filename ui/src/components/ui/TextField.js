import FieldShell, { inputA11y } from './FieldShell';

export default function TextField({ id, label, error, aside, ...inputProps }) {
  return (
    <FieldShell id={id} label={label} error={error} aside={aside}>
      <input className="input" {...inputA11y(id, error)} {...inputProps} />
    </FieldShell>
  );
}
