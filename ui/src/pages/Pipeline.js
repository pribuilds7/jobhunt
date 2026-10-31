import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import AddApplicationButton from '../components/ui/AddApplicationButton';
import LoadSampleButton from '../components/ui/LoadSampleButton';
import StatTiles from '../components/applications/StatTiles';
import KanbanBoard from '../components/pipeline/KanbanBoard';
import { matchesSearch } from '../lib/applications';
import { useDataStore } from '../store/dataStore';
import { useUiStore } from '../store/uiStore';

function PipelineEmpty() {
  return (
    <EmptyState message="No applications yet — add your first one.">
      <AddApplicationButton />
      <LoadSampleButton />
    </EmptyState>
  );
}

export default function Pipeline() {
  const applications = useDataStore((state) => state.applications);
  const search = useUiStore((state) => state.search);
  const visible = applications.filter((app) => matchesSearch(app, search));
  return (
    <>
      <PageHeader title="Pipeline" subtitle="Drag cards between columns as things move along.">
        <SearchInput />
        <AddApplicationButton />
      </PageHeader>
      {applications.length === 0 && <PipelineEmpty />}
      {applications.length > 0 && <StatTiles applications={applications} />}
      {applications.length > 0 && <KanbanBoard applications={visible} />}
    </>
  );
}
