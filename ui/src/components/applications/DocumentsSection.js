import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { useUiStore } from '../../store/uiStore';

function LinkedDocument({ doc }) {
  return (
    <div className="doc-row">
      <FileText size={18} aria-hidden="true" />
      <div>
        <p className="doc-name">{doc.name}</p>
        {doc.note && <p className="meta">{doc.note}</p>}
      </div>
    </div>
  );
}

export default function DocumentsSection({ application }) {
  const documents = useDataStore((state) => state.documents);
  const closeDrawer = useUiStore((state) => state.closeDrawer);
  const doc = documents.find((item) => item.id === application.resumeVersion);
  return (
    <div className="drawer-section">
      {doc ? <LinkedDocument doc={doc} /> : <p className="meta">No resume linked. Pick one under Overview.</p>}
      <Link to="/documents" className="text-link strong" onClick={closeDrawer}>Manage documents</Link>
    </div>
  );
}
