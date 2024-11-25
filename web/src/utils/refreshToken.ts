export const refreshToken = async () => {
  const refreshToken = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith('refresh_token='));
  if (!refreshToken) return;

  const response = await fetch('http://localhost:8000/api/token/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken.split('=')[1] }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
  } else {
    localStorage.removeItem('access_token');
    document.cookie = 'refresh_token=; Max-Age=-99999999;';
  }
};
