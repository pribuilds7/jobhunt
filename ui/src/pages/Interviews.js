import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import InterviewDay from '../components/interviews/InterviewDay';
import { groupByDay, upcomingInterviews } from '../lib/interviews';
import { useDataStore } from '../store/dataStore';

function NoInterviews() {
  return (
    <EmptyState message="No upcoming interviews. Log one from an application's Timeline.">
      <Link to="/" className="btn btn-primary">Go to pipeline</Link>
    </EmptyState>
  );
}

export default function Interviews() {
  const applications = useDataStore((state) => state.applications);
  const upcoming = upcomingInterviews(applications);
  const days = groupByDay(upcoming);
  return (
    <>
      <PageHeader title="Interviews" subtitle="What's coming up, day by day." />
      {days.length === 0 && <NoInterviews />}
      {days.map(([day, events]) => <InterviewDay key={day} day={day} events={events} />)}
    </>
  );
}
