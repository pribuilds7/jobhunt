import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import AddApplicationButton from '../components/ui/AddApplicationButton';
import StatusFilter from '../components/applications/StatusFilter';
import ApplicationsTable from '../components/applications/ApplicationsTable';
import { byStatus } from '../lib/applications';
import { useDataStore } from '../store/dataStore';

function FilteredTable({ applications, filter }) {
  const rows = filter === 'all' ? applications : byStatus(applications, filter);
  if (rows.length === 0) return <EmptyState message="Nothing with this status right now." />;
  return <ApplicationsTable applications={rows} />;
}

export default function Applications() {
  const applications = useDataStore((state) => state.applications);
  const [filter, setFilter] = useState('all');
  const isEmpty = applications.length === 0;
  return (
    <>
      <PageHeader title="All applications" subtitle="Every role in one sortable list.">
        <AddApplicationButton />
      </PageHeader>
      {isEmpty && <EmptyState message="No applications yet — add your first one."><AddApplicationButton /></EmptyState>}
      {!isEmpty && <StatusFilter value={filter} onChange={setFilter} />}
      {!isEmpty && <FilteredTable applications={applications} filter={filter} />}
    </>
  );
}
