import { useState } from 'react';
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import ApplicationCard from '../applications/ApplicationCard';
import { STATUSES } from '../../lib/status';
import { byStatus } from '../../lib/applications';
import { useDataStore } from '../../store/dataStore';

function useBoardSensors() {
  const mouse = useSensor(MouseSensor, { activationConstraint: { distance: 6 } });
  const touch = useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } });
  return useSensors(mouse, touch);
}

function useDragHandlers(applications) {
  const moveApplication = useDataStore((state) => state.moveApplication);
  const [activeId, setActiveId] = useState(null);
  const onDragEnd = ({ active, over }) => {
    setActiveId(null);
    const dragged = applications.find((app) => app.id === active.id);
    if (over && dragged.status !== over.id) moveApplication(active.id, over.id);
  };
  return { activeId, onDragStart: ({ active }) => setActiveId(active.id), onDragEnd, onDragCancel: () => setActiveId(null) };
}

export default function KanbanBoard({ applications }) {
  const sensors = useBoardSensors();
  const { activeId, ...handlers } = useDragHandlers(applications);
  const active = applications.find((app) => app.id === activeId);
  return (
    <DndContext sensors={sensors} {...handlers}>
      <div className="board">
        {STATUSES.map((status) => (
          <KanbanColumn key={status.id} status={status} applications={byStatus(applications, status.id)} />
        ))}
      </div>
      <DragOverlay>{active && <ApplicationCard application={active} tabIndex={-1} />}</DragOverlay>
    </DndContext>
  );
}
