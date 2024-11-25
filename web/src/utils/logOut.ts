export function logout(){
  localStorage.removeItem('access_token');
  document.cookie = 'refresh_token=; Max-Age=-99999999;';
  return
}