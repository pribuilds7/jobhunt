import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FieldShell, { inputA11y } from './FieldShell';

function ToggleButton({ visible, onToggle }) {
  return (
    <button type="button" className="password-toggle" onClick={onToggle} aria-label={visible ? 'Hide password' : 'Show password'}>
      {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
    </button>
  );
}

export default function PasswordField({ id, label, error, aside, ...inputProps }) {
  const [visible, setVisible] = useState(false);
  return (
    <FieldShell id={id} label={label} error={error} aside={aside}>
      <div className="password-wrap">
        <input className="input" type={visible ? 'text' : 'password'} {...inputA11y(id, error)} {...inputProps} />
        <ToggleButton visible={visible} onToggle={() => setVisible(!visible)} />
      </div>
    </FieldShell>
  );
}
