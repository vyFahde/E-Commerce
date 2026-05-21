import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;
      
      // Armazenar o token no localStorage
      localStorage.setItem('token', token);
      
      // Disparar evento de storage para sincronizar com outras abas/componentes
      window.dispatchEvent(new Event('storage'));
      
      // Atualizar o estado de autenticação
      setAuth(true);
      
      // Redirecionar para o dashboard
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Credenciais inválidas. Tente novamente.';
      setError(errorMessage);
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <p style={{ marginTop: '10px' }}>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
