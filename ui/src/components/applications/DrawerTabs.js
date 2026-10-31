const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'documents', label: 'Documents' },
];

export default function DrawerTabs({ tab, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Application sections">
      {TABS.map((item) => (
        <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} className="tab" onClick={() => onChange(item.id)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
