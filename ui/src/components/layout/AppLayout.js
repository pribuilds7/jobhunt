import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ApplicationDrawer from '../applications/ApplicationDrawer';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
      <ApplicationDrawer />
    </div>
  );
}
