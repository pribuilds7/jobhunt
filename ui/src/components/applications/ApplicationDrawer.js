import DrawerContent from './DrawerContent';
import { useDialog } from '../../hooks/useDialog';
import { useDataStore } from '../../store/dataStore';
import { useUiStore } from '../../store/uiStore';

export default function ApplicationDrawer() {
  const drawer = useUiStore((state) => state.drawer);
  const closeDrawer = useUiStore((state) => state.closeDrawer);
  const application = useDataStore((state) => state.applications.find((app) => app.id === drawer?.id));
  const ref = useDialog(Boolean(drawer));
  const handleCancel = (event) => {
    event.preventDefault();
    closeDrawer();
  };
  return (
    <dialog ref={ref} className="drawer" onCancel={handleCancel} aria-labelledby="drawer-title">
      {drawer && <DrawerContent key={drawer.id ?? 'new'} application={application} onClose={closeDrawer} />}
    </dialog>
  );
}
