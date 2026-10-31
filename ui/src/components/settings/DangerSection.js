import { useState } from 'react';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useAuthStore } from '../../store/authStore';

export default function DangerSection() {
  const deleteAccount = useAuthStore((state) => state.deleteAccount);
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="form-stack">
      <p className="meta">Deleting your account removes all applications, contacts and documents. This can't be undone.</p>
      <div>
        <button type="button" className="btn btn-ghost" onClick={() => setConfirming(true)}>Delete account</button>
      </div>
      <ConfirmDialog open={confirming} title="Delete your account?" message="All of your data will be removed permanently." confirmLabel="Delete account" onConfirm={deleteAccount} onClose={() => setConfirming(false)} />
    </div>
  );
}
