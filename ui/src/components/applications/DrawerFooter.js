export default function DrawerFooter({ canDelete, onCancel, onDelete }) {
  return (
    <footer className="drawer-footer">
      <button type="submit" form="application-form" className="btn btn-primary">Save</button>
      <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      {canDelete && <button type="button" className="link-btn drawer-delete" onClick={onDelete}>Delete</button>}
    </footer>
  );
}
