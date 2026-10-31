import { useDroppable } from '@dnd-kit/core';
import StatusDot from '../ui/StatusDot';
import DraggableCard from './DraggableCard';

export default function KanbanColumn({ status, applications }) {
  const { setNodeRef, isOver } = useDroppable({ id: status.id });
  const headingId = `column-${status.id}`;
  return (
    <section ref={setNodeRef} className={isOver ? 'column is-over' : 'column'} aria-labelledby={headingId}>
      <header className="column-header">
        <StatusDot status={status.id} />
        <h2 id={headingId} className="column-title">{status.label}</h2>
        <span className="count-pill">{applications.length}</span>
      </header>
      {applications.map((application) => (
        <DraggableCard key={application.id} application={application} />
      ))}
    </section>
  );
}
