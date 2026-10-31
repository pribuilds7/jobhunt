import Spinner from './Spinner';

export default function SubmitButton({ loading, children }) {
  return (
    <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading} aria-busy={loading}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
