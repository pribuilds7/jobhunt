import { Plus } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

export default function AddApplicationButton() {
  const openNewApplication = useUiStore((state) => state.openNewApplication);
  return (
    <button type="button" className="btn btn-primary" onClick={openNewApplication}>
      <Plus size={18} aria-hidden="true" />
      Add application
    </button>
  );
}
