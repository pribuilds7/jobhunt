import { findStatus } from '../../lib/status';

export default function StatusDot({ status }) {
  const color = findStatus(status).color;
  return <span className="status-dot" style={{ background: color }} aria-hidden="true" />;
}
