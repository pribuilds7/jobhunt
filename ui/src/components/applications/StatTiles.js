import { countActive, countInterviewsThisWeek, countOffers, responseRate } from '../../lib/stats';

function buildTiles(applications) {
  return [
    { label: 'Active applications', value: countActive(applications) },
    { label: 'Interviews this week', value: countInterviewsThisWeek(applications) },
    { label: 'Response rate', value: responseRate(applications) },
    { label: 'Offers', value: countOffers(applications) },
  ];
}

export default function StatTiles({ applications }) {
  const tiles = buildTiles(applications);
  return (
    <dl className="stat-grid">
      {tiles.map((tile) => (
        <div key={tile.label} className="stat-tile">
          <dt className="stat-label">{tile.label}</dt>
          <dd className="stat-value">{tile.value}</dd>
        </div>
      ))}
    </dl>
  );
}
