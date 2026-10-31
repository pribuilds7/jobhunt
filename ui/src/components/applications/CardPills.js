export default function CardPills({ application }) {
  if (!application.location && !application.salary) return null;
  return (
    <span className="pill-row">
      {application.location && <span className="pill">{application.location}</span>}
      {application.salary && <span className="pill">{application.salary}</span>}
    </span>
  );
}
