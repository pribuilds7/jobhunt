import { useState } from 'react';

export function useEditableList(onDelete) {
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const confirmDelete = () => {
    onDelete(deleting.id);
    setDeleting(null);
  };
  return { editing, setEditing, deleting, setDeleting, confirmDelete };
}
