import React, { useState } from 'react';
import { Footer } from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      document.cookie = `refresh_token=${data.refresh}; Path=/;`;
      navigate('/');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>Portal Cidadágil</h2>
        <img src='./fav.ico' alt='Logo cidadagil' className='m-auto w-16' />
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Usuário
            </label>
            <input
              type='username'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Senha
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Entrar
          </button>
        </form>
        <p className='mt-4 text-sm text-center text-gray-600'>
          Não possui uma conta?{' '}
          <Link to={'/register'} className='text-blue-600'>
            Cadastre-se
          </Link>
        </p>
        <Footer />
      </div>
    </div>
  );
};
