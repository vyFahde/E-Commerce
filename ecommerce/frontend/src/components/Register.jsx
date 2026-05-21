import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cep: '',
    cpf: '',
    birth: '',
    gender: 'MASCULINO',
    sex: 'M',
    contactNumber: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validar campos obrigatórios
      if (!formData.name || !formData.email || !formData.password || !formData.cep || 
          !formData.cpf || !formData.birth || !formData.contactNumber) {
        setError('Todos os campos são obrigatórios.');
        setLoading(false);
        return;
      }

      // Validar CEP (8 dígitos)
      if (!/^\d{8}$/.test(formData.cep)) {
        setError('CEP deve conter exatamente 8 dígitos.');
        setLoading(false);
        return;
      }

      // Validar CPF (11 dígitos)
      if (!/^\d{11}$/.test(formData.cpf)) {
        setError('CPF deve conter exatamente 11 dígitos.');
        setLoading(false);
        return;
      }

      // Validar telefone (apenas números)
      if (!/^\d+$/.test(formData.contactNumber)) {
        setError('Telefone deve conter apenas números.');
        setLoading(false);
        return;
      }

      // Preparar dados para envio - converter contactNumber para BigInteger
      const dataToSend = {
        ...formData,
        contactNumber: BigInt(formData.contactNumber)
      };

      // Enviar para o servidor
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cep: formData.cep,
        cpf: formData.cpf,
        birth: formData.birth,
        gender: formData.gender,
        sex: formData.sex,
        contactNumber: formData.contactNumber
      });

      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          'Erro ao registrar. Verifique os dados (CEP: 8 dígitos, CPF: 11 dígitos, Telefone: apenas números).';
      setError(errorMessage);
      console.error('Erro no registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '500px' }}>
      <h2>Cadastro de Usuário</h2>
      {success ? (
        <p style={{ color: 'green' }}>Cadastro realizado com sucesso! Redirecionando para o login...</p>
      ) : (
        <form onSubmit={handleRegister}>
          <div>
            <label>Nome Completo:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>
          <div>
            <label>Senha:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>CEP (8 dígitos):</label>
              <input 
                type="text" 
                name="cep" 
                value={formData.cep} 
                onChange={handleChange} 
                pattern="\d{8}" 
                title="8 dígitos numéricos" 
                required 
                disabled={loading}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>CPF (11 dígitos):</label>
              <input 
                type="text" 
                name="cpf" 
                value={formData.cpf} 
                onChange={handleChange} 
                pattern="\d{11}" 
                title="11 dígitos numéricos" 
                required 
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label>Telefone (Apenas números):</label>
            <input 
              type="text" 
              name="contactNumber" 
              value={formData.contactNumber} 
              onChange={handleChange} 
              placeholder="Ex: 62988887777"
              required 
              disabled={loading}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Gênero:</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
                <option value="PREFIRO_NAO_DIZER">Prefiro não dizer</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Sexo Biológico:</label>
              <select 
                name="sex" 
                value={formData.sex} 
                onChange={handleChange}
                disabled={loading}
              >
                <option value="M">Masculino (M)</option>
                <option value="F">Feminino (F)</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input 
              type="date" 
              name="birth" 
              value={formData.birth} 
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <p style={{ marginTop: '10px' }}>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
