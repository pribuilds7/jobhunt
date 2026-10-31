const API_HOST = (process.env.REACT_APP_API_HOST ?? '').replace(/\/+$/, '');
const DEFAULT_ERROR = 'Something went wrong. Please try again.';
const NETWORK_ERROR = "Can't reach the server. Check your connection and try again.";

async function readBody(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

async function send(path, options) {
  try {
    return await fetch(`${API_HOST}${path}`, options);
  } catch {
    throw new Error(NETWORK_ERROR);
  }
}

export async function postJson(path, data) {
  const headers = { 'Content-Type': 'application/json' };
  const response = await send(path, { method: 'POST', headers, body: JSON.stringify(data) });
  const body = await readBody(response);
  if (!response.ok) throw new Error(body.message || body.detail || DEFAULT_ERROR);
  return body;
}
