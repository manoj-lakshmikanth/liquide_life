'use client';

const mockUsers = [
  { username: 'user', password: 'user123' },
];

export function login(username: string, password: string) {
  const user = mockUsers.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    const session = {
      username: user.username,
      token: `${user.username}-token`,
    };
    localStorage.setItem('session', JSON.stringify(session));
    return { success: true, code: 200, session };
  }
  return { success: false, code: 400,  message: 'Invalid credentials' };
}

export function logout() {
  localStorage.removeItem('session');
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('session');
  return session ? JSON.parse(session) : null;
}

export function isAuthenticated() {
  return !!getSession();
}
