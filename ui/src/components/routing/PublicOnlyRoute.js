import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function PublicOnlyRoute() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  if (!user) return <Outlet />;
  const target = location.state?.from ?? '/';
  return <Navigate to={target} replace />;
}
