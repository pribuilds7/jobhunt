import { Search } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

export default function SearchInput() {
  const search = useUiStore((state) => state.search);
  const setSearch = useUiStore((state) => state.setSearch);
  return (
    <div className="search">
      <Search size={18} className="search-icon" aria-hidden="true" />
      <input
        type="search"
        className="search-input"
        placeholder="Search company or role"
        aria-label="Search company or role"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}
