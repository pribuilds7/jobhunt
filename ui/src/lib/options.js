export function toOptions(items, labelKey) {
  return items.map((item) => ({ id: item.id, label: item[labelKey] }));
}
