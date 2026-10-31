export default function AuthHeading({ title, subtitle }) {
  return (
    <div className="auth-heading">
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </div>
  );
}
