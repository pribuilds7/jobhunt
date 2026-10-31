import { FileText } from 'lucide-react';
import RowActions from '../ui/RowActions';
import { shortDate } from '../../lib/dates';

function kindLabel(kind) {
  return kind === 'resume' ? 'Resume' : 'Cover letter';
}

export default function DocumentItem({ doc, usedBy, onEdit, onDelete }) {
  return (
    <li className="list-row is-static">
      <FileText size={20} aria-hidden="true" />
      <span className="list-row-main">
        <span className="app-card-role">{doc.name}</span>
        <span className="app-card-company">{kindLabel(doc.kind)} · {shortDate(doc.createdAt)} · Used by {usedBy}</span>
        {doc.note && <span className="meta">{doc.note}</span>}
      </span>
      <RowActions name={doc.name} onEdit={onEdit} onDelete={onDelete} />
    </li>
  );
}
