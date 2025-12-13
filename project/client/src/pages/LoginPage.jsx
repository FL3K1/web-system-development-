import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      
      // Guardar token en LocalStorage
      const token = response.data.token;
      localStorage.setItem('token', token); 
      
      alert('¡Bienvenido!');
      navigate('/'); // Redirigir al inicio
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || 'Credenciales incorrectas'));
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" name="email" placeholder="Email" 
          onChange={handleChange} required 
        />
        <input 
          type="password" name="password" placeholder="Contraseña" 
          onChange={handleChange} required 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;