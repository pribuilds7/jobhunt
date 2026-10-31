import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

function SortIcon({ direction }) {
  if (direction === 'asc') return <ArrowUp size={14} aria-hidden="true" />;
  if (direction === 'desc') return <ArrowDown size={14} aria-hidden="true" />;
  return <ArrowUpDown size={14} aria-hidden="true" />;
}

export default function SortHeader({ column, sort, onSort }) {
  const direction = sort.key === column.key ? sort.direction : null;
  const ariaSort = direction ? `${direction}ending` : 'none';
  return (
    <th scope="col" aria-sort={ariaSort}>
      <button type="button" className="sort-btn" onClick={() => onSort(column.key)}>
        {column.label}
        <SortIcon direction={direction} />
      </button>
    </th>
  );
}
