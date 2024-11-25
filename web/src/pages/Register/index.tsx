import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, firstName, surname, email, password, confirmPassword } = formData;

    // Validações
    if (!username || !firstName || !surname || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não correspondem.');
      return;
    }

    setError(''); // Limpa os erros caso tudo esteja válido

    console.log(JSON.stringify(formData));

    const response = await fetch('http://localhost:8000/api/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        first_name: firstName,
        last_name: surname,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      document.cookie = `refresh_token=${data.refresh}; Path=/;`;
      navigate('/login');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>Cadastre-se</h2>
        {error && (
          <div className='mb-4 text-red-600 bg-red-100 p-2 rounded-lg text-sm'>{error}</div>
        )}
        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className='mb-4'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Usuário
            </label>
            <input
              type='text'
              id='username'
              value={formData.username}
              onChange={handleInputChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* First Name */}
          <div className='mb-4'>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
              Nome
            </label>
            <input
              type='text'
              id='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Surname */}
          <div className='mb-4'>
            <label htmlFor='surname' className='block text-sm font-medium text-gray-700'>
              Sobrenome
            </label>
            <input
              type='text'
              id='surname'
              value={formData.surname}
              onChange={handleInputChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Senha
            </label>
            <input
              type='password'
              id='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Confirm Password */}
          <div className='mb-6'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Confirmar Senha
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Registrar
          </button>
        </form>
        <p className='mt-4 text-sm text-center text-gray-600'>
          Já possui uma conta?{' '}
          <Link to={'/login'} className='text-blue-600'>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};
