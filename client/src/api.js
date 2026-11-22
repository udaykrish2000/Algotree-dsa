const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('santa_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function fetchPhaseState() {
  const res = await fetch(`${API_BASE}/phase`);
  if (!res.ok) throw new Error('Failed to fetch phase state');
  return res.json();
}

export async function setPhase(phase) {
  const res = await fetch(`${API_BASE}/phase/set`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phase })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update phase');
  return data;
}

export async function sendOtp(email) {
  const res = await fetch(`${API_BASE}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
  return data;
}

export async function registerUser(formData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function fetchCurrentUser() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export async function drawChild() {
  const res = await fetch(`${API_BASE}/phase/draw`, {
    method: 'POST',
    headers: { ...getAuthHeader() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to draw child');
  return data;
}

export async function fetchMyChild() {
  const res = await fetch(`${API_BASE}/phase/my-child`, {
    headers: { ...getAuthHeader() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch child');
  return data;
}

export async function revealSecretSanta() {
  const res = await fetch(`${API_BASE}/phase/reveal-santa`, {
    headers: { ...getAuthHeader() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to reveal Secret Santa');
  return data;
}

export async function seedMockData() {
  const res = await fetch(`${API_BASE}/admin/seed`, {
    method: 'POST'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to seed data');
  return data;
}

export async function resetDatabase() {
  const res = await fetch(`${API_BASE}/admin/reset`, {
    method: 'POST'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to reset database');
  return data;
}
