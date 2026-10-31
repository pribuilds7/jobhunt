import { useDataStore } from '../../store/dataStore';
import { countAppliedThisWeek } from '../../lib/stats';

export default function WeeklyGoal() {
  const applications = useDataStore((state) => state.applications);
  const goal = useDataStore((state) => state.profile?.weeklyGoal ?? 10);
  const done = countAppliedThisWeek(applications);
  const percent = Math.min(100, Math.round((done / goal) * 100));
  return (
    <div className="weekly-goal">
      <p className="caps-label">Weekly goal</p>
      <p className="weekly-goal-text">{done} of {goal} applications</p>
      <div className="progress" role="progressbar" aria-label="Weekly goal" aria-valuemin={0} aria-valuemax={goal} aria-valuenow={done}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
