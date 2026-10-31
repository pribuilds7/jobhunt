import { STATUSES } from '../../lib/status';

const CHIPS = [{ id: 'all', label: 'All' }, ...STATUSES];

export default function StatusFilter({ value, onChange }) {
  return (
    <div className="chip-row" role="group" aria-label="Filter by status">
      {CHIPS.map((chip) => (
        <button key={chip.id} type="button" className="chip" aria-pressed={value === chip.id} onClick={() => onChange(chip.id)}>
          {chip.label}
        </button>
      ))}
    </div>
  );
}
