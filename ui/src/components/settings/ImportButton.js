import { Upload } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';

function parseExport(text) {
  const data = JSON.parse(text);
  if (!Array.isArray(data.applications)) throw new Error('Missing applications');
  return data;
}

export default function ImportButton({ onResult }) {
  const importData = useDataStore((state) => state.importData);
  const handleFile = async (event) => {
    const file = event.target.files[0];
    event.target.value = '';
    try {
      importData(parseExport(await file.text()));
      onResult('Data imported.');
    } catch {
      onResult("That file doesn't look like a Hunt export.");
    }
  };
  return (
    <label className="btn btn-ghost file-btn">
      <Upload size={18} aria-hidden="true" />
      Import JSON
      <input type="file" accept="application/json" className="visually-hidden" onChange={handleFile} />
    </label>
  );
}
