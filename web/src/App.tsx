import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { HomePage, Login, Register } from './pages';
import './styles/index.css';

export function App() {
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    console.log('alooo');
    const user = localStorage.getItem('access_token');

    if (!user) {

      return <Navigate to='/login' />;
    }

    return children;
  };

  const GuestRoute = ({ children }: { children: JSX.Element }) => {
    const user = localStorage.getItem('access_token');

    if (user) {
      return <Navigate to='/' />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path='/register'
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
