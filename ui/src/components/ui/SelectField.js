import FieldShell, { inputA11y } from './FieldShell';

export default function SelectField({ id, label, error, options, placeholder, ...selectProps }) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <select className="input" {...inputA11y(id, error)} {...selectProps}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </select>
    </FieldShell>
  );
}
