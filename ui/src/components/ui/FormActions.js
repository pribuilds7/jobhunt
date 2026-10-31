export default function FormActions({ isEditing, onCancel }) {
  return (
    <div className="form-actions">
      <button type="submit" className="btn btn-primary">{isEditing ? 'Save changes' : 'Add'}</button>
      {isEditing && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
    </div>
  );
}
