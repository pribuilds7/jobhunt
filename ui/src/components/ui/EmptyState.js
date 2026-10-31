export default function EmptyState({ message, children }) {
  return (
    <div className="empty-state">
      <p className="empty-state-text">{message}</p>
      {children && <div className="empty-state-actions">{children}</div>}
    </div>
  );
}
