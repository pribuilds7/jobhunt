import { useDataStore } from '../../store/dataStore';

export default function LoadSampleButton() {
  const loadSampleData = useDataStore((state) => state.loadSampleData);
  return (
    <button type="button" className="btn btn-ghost" onClick={loadSampleData}>
      Load sample data
    </button>
  );
}
