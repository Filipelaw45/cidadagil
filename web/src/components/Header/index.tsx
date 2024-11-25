import { Link } from 'react-router-dom';
import { logout } from '../../utils/logOut';

export function Header() {
  return (
    <header className='flex align-middle justify-around bg-green-400 py-5'>
      <div>
        <Link to={'/'} className='flex gap-2 text-lg'>
          <img className='w-6' src='./fav.ico' alt='logo' />
          <h1>Cidadágil</h1>
        </Link>
      </div>
      <nav className='flex gap-4 text-lg'>
        <Link to={'/'}>Inicio</Link>
        <Link to={'/'}>Setores</Link>
        <Link to={'/'}>Notícias</Link>
        <Link to={'/login'} onClick={logout}>
          Sair
        </Link>
      </nav>
    </header>
  );
}
