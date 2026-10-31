function read(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function readJson(key, fallback) {
  const value = read(localStorage, key);
  return value ?? fallback;
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeJson(key) {
  localStorage.removeItem(key);
}

export function readSession(key) {
  const value = read(sessionStorage, key);
  return value ?? read(localStorage, key);
}

export function writeSession(key, value, remember) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(key, JSON.stringify(value));
}

export function clearSession(key) {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}
