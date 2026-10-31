import { initial } from '../../lib/applications';

export default function Avatar({ name, size = 36 }) {
  return (
    <span className="avatar" style={{ width: size, height: size }} aria-hidden="true">
      {initial(name)}
    </span>
  );
}
