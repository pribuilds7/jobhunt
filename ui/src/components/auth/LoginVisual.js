import BrandCard from './BrandCard';

export default function LoginVisual() {
  return (
    <div className="brand-cards" aria-hidden="true">
      <BrandCard company="Fieldnote" role="Design Engineer" status="interviewing" offset={0} />
      <BrandCard company="Quarry" role="Senior Product Designer" status="offer" offset={32} />
    </div>
  );
}
