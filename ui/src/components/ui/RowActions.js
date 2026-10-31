import { Pencil, Trash2 } from 'lucide-react';

export default function RowActions({ name, onEdit, onDelete }) {
  return (
    <div className="row-actions">
      <button type="button" className="icon-btn" aria-label={`Edit ${name}`} onClick={onEdit}>
        <Pencil size={16} aria-hidden="true" />
      </button>
      <button type="button" className="icon-btn" aria-label={`Delete ${name}`} onClick={onDelete}>
        <Trash2 size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
