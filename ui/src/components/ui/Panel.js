export default function Panel({ title, children }) {
  return (
    <section className="panel">
      {title && <h2 className="section-heading">{title}</h2>}
      {children}
    </section>
  );
}
