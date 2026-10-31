import { useDialog } from '../../hooks/useDialog';

export default function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onClose }) {
  const ref = useDialog(open);
  const handleCancel = (event) => {
    event.preventDefault();
    onClose();
  };
  return (
    <dialog ref={ref} className="confirm" onCancel={handleCancel} aria-labelledby="confirm-title">
      <h2 id="confirm-title" className="section-heading">{title}</h2>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </dialog>
  );
}
