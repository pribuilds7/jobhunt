import { useState } from 'react';
import { Download } from 'lucide-react';
import ImportButton from './ImportButton';
import LoadSampleButton from '../ui/LoadSampleButton';
import StatusMessage from '../ui/StatusMessage';
import { downloadJson } from '../../lib/download';
import { todayIso } from '../../lib/dates';
import { useDataStore } from '../../store/dataStore';

export default function DataSection() {
  const exportData = useDataStore((state) => state.exportData);
  const [message, setMessage] = useState('');
  const handleExport = () => downloadJson(`hunt-export-${todayIso()}.json`, exportData());
  return (
    <div className="form-stack">
      <div className="button-row">
        <button type="button" className="btn btn-ghost" onClick={handleExport}>
          <Download size={18} aria-hidden="true" />
          Export JSON
        </button>
        <ImportButton onResult={setMessage} />
        <LoadSampleButton />
      </div>
      <StatusMessage message={message} />
    </div>
  );
}
