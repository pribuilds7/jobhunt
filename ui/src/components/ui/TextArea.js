import FieldShell, { inputA11y } from './FieldShell';

export default function TextArea({ id, label, error, ...textareaProps }) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea className="input textarea" rows={4} {...inputA11y(id, error)} {...textareaProps} />
    </FieldShell>
  );
}
