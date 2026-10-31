import PageHeader from '../components/ui/PageHeader';
import Panel from '../components/ui/Panel';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import DocumentForm from '../components/documents/DocumentForm';
import DocumentItem from '../components/documents/DocumentItem';
import { useEditableList } from '../hooks/useEditableList';
import { useDataStore } from '../store/dataStore';

function useUsageCount() {
  const applications = useDataStore((state) => state.applications);
  return (docId) => applications.filter((app) => app.resumeVersion === docId).length;
}

function DocumentList({ documents, list }) {
  const usageCount = useUsageCount();
  if (documents.length === 0) return <EmptyState message="No documents yet — add your first resume version." />;
  return (
    <ul className="list">
      {documents.map((doc) => (
        <DocumentItem key={doc.id} doc={doc} usedBy={usageCount(doc.id)} onEdit={() => list.setEditing(doc)} onDelete={() => list.setDeleting(doc)} />
      ))}
    </ul>
  );
}

export default function Documents() {
  const documents = useDataStore((state) => state.documents);
  const saveDocument = useDataStore((state) => state.saveDocument);
  const list = useEditableList(useDataStore((state) => state.deleteDocument));
  const save = (doc) => {
    saveDocument(doc);
    list.setEditing(null);
  };
  return (
    <>
      <PageHeader title="Documents" subtitle="Resume and cover-letter versions you can link to applications." />
      <div className="split-layout">
        <Panel title={list.editing ? 'Edit document' : 'Add a document'}>
          <DocumentForm key={list.editing?.id ?? 'new'} doc={list.editing} onSave={save} onCancel={() => list.setEditing(null)} />
        </Panel>
        <DocumentList documents={documents} list={list} />
      </div>
      <ConfirmDialog open={Boolean(list.deleting)} title="Delete this document?" message="Applications that used it will no longer link to it." confirmLabel="Delete" onConfirm={list.confirmDelete} onClose={() => list.setDeleting(null)} />
    </>
  );
}
