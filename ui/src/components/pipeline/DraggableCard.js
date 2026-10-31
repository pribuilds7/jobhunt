import { useDraggable } from '@dnd-kit/core';
import ApplicationCard from '../applications/ApplicationCard';
import { useUiStore } from '../../store/uiStore';

export default function DraggableCard({ application }) {
  const openApplication = useUiStore((state) => state.openApplication);
  const { listeners, setNodeRef, isDragging } = useDraggable({ id: application.id });
  return (
    <ApplicationCard
      ref={setNodeRef}
      application={application}
      className={isDragging ? 'is-dragging' : ''}
      onClick={() => openApplication(application.id)}
      {...listeners}
    />
  );
}
