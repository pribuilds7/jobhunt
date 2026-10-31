import PageHeader from '../components/ui/PageHeader';
import Panel from '../components/ui/Panel';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import ContactForm from '../components/contacts/ContactForm';
import ContactItem from '../components/contacts/ContactItem';
import { useEditableList } from '../hooks/useEditableList';
import { useDataStore } from '../store/dataStore';

function ContactList({ contacts, list }) {
  if (contacts.length === 0) return <EmptyState message="No contacts yet — add a recruiter or referrer." />;
  return (
    <ul className="list">
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onEdit={() => list.setEditing(contact)} onDelete={() => list.setDeleting(contact)} />
      ))}
    </ul>
  );
}

export default function Contacts() {
  const contacts = useDataStore((state) => state.contacts);
  const saveContact = useDataStore((state) => state.saveContact);
  const list = useEditableList(useDataStore((state) => state.deleteContact));
  const save = (contact) => {
    saveContact(contact);
    list.setEditing(null);
  };
  return (
    <>
      <PageHeader title="Contacts" subtitle="Recruiters, referrers and hiring managers." />
      <div className="split-layout">
        <Panel title={list.editing ? 'Edit contact' : 'Add a contact'}>
          <ContactForm key={list.editing?.id ?? 'new'} contact={list.editing} onSave={save} onCancel={() => list.setEditing(null)} />
        </Panel>
        <ContactList contacts={contacts} list={list} />
      </div>
      <ConfirmDialog open={Boolean(list.deleting)} title="Delete this contact?" message="Applications linked to them will lose the link." confirmLabel="Delete" onConfirm={list.confirmDelete} onClose={() => list.setDeleting(null)} />
    </>
  );
}
