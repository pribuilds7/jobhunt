import { useState } from 'react';
import { X } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import TimelineSection from './TimelineSection';
import DocumentsSection from './DocumentsSection';
import DrawerTabs from './DrawerTabs';
import DrawerFooter from './DrawerFooter';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useDataStore } from '../../store/dataStore';

function DrawerHeader({ title, onClose }) {
  return (
    <header className="drawer-header">
      <h2 id="drawer-title" className="section-heading">{title}</h2>
      <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
        <X size={20} aria-hidden="true" />
      </button>
    </header>
  );
}

function useDelete(application, onClose) {
  const deleteApplication = useDataStore((state) => state.deleteApplication);
  const [confirming, setConfirming] = useState(false);
  const confirm = () => {
    deleteApplication(application.id);
    onClose();
  };
  return { confirming, setConfirming, confirm };
}

export default function DrawerContent({ application, onClose }) {
  const [tab, setTab] = useState('overview');
  const remove = useDelete(application, onClose);
  return (
    <div className="drawer-inner">
      <DrawerHeader title={application ? `${application.role} · ${application.company}` : 'Add application'} onClose={onClose} />
      {application && <DrawerTabs tab={tab} onChange={setTab} />}
      <div className="drawer-body">
        <ApplicationForm application={application} hidden={tab !== 'overview'} onSaved={onClose} onInvalid={() => setTab('overview')} />
        {tab === 'timeline' && <TimelineSection application={application} />}
        {tab === 'documents' && <DocumentsSection application={application} />}
      </div>
      <DrawerFooter canDelete={Boolean(application)} onCancel={onClose} onDelete={() => remove.setConfirming(true)} />
      <ConfirmDialog open={remove.confirming} title="Delete this application?" message="This removes it and its timeline. This can't be undone." confirmLabel="Delete" onConfirm={remove.confirm} onClose={() => remove.setConfirming(false)} />
    </div>
  );
}
