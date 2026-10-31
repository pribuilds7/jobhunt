import { useState } from 'react';
import SortHeader from './SortHeader';
import ApplicationRow from './ApplicationRow';
import { nextSort, sortApplications } from '../../lib/sort';

const COLUMNS = [
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'appliedAt', label: 'Applied' },
  { key: 'nextAction', label: 'Next action' },
  { key: 'nextActionDue', label: 'Due' },
];

export default function ApplicationsTable({ applications }) {
  const [sort, setSort] = useState({ key: 'appliedAt', direction: 'desc' });
  const rows = sortApplications(applications, sort);
  const handleSort = (key) => setSort(nextSort(sort, key));
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>{COLUMNS.map((column) => <SortHeader key={column.key} column={column} sort={sort} onSort={handleSort} />)}</tr>
        </thead>
        <tbody>
          {rows.map((application) => <ApplicationRow key={application.id} application={application} />)}
        </tbody>
      </table>
    </div>
  );
}
