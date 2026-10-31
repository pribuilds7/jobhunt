import Avatar from '../ui/Avatar';
import RowActions from '../ui/RowActions';

function ContactLinks({ contact }) {
  return (
    <span className="contact-links">
      {contact.email && <a href={`mailto:${contact.email}`} className="text-link">{contact.email}</a>}
      {contact.linkedin && <a href={contact.linkedin} className="text-link" target="_blank" rel="noreferrer">LinkedIn</a>}
    </span>
  );
}

export default function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <li className="list-row is-static">
      <Avatar name={contact.name} />
      <span className="list-row-main">
        <span className="app-card-role">{contact.name}</span>
        {contact.company && <span className="app-card-company">{contact.company}</span>}
        <ContactLinks contact={contact} />
      </span>
      <RowActions name={contact.name} onEdit={onEdit} onDelete={onDelete} />
    </li>
  );
}
