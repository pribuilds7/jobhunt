import Logo from '../ui/Logo';

export default function AuthLayout({ headline, copy, visual, children }) {
  return (
    <div className="auth">
      <section className="auth-brand">
        <Logo tone="bg" />
        <p className="auth-headline">{headline}</p>
        {copy && <p className="auth-copy">{copy}</p>}
        {visual && <div className="auth-visual">{visual}</div>}
      </section>
      <main className="auth-main">
        <div className="auth-form-wrap">{children}</div>
      </main>
    </div>
  );
}
