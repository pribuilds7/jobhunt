import { newId } from '../lib/ids';

export function upsert(list, item) {
  if (!item.id) return [{ ...item, id: newId() }, ...list];
  return list.map((existing) => (existing.id === item.id ? { ...existing, ...item } : existing));
}

export function removeById(list, id) {
  return list.filter((item) => item.id !== id);
}

export function updateById(list, id, update) {
  return list.map((item) => (item.id === id ? update(item) : item));
}
