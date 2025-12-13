import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Actualizar estado al escribir en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar datos al Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Petición de registro
      await axios.post('http://localhost:3000/auth/register', formData);
      alert('¡Usuario registrado con éxito!');
      navigate('/login'); // Redirigir al login
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || 'Algo salió mal'));
    }
  };

  return (
    <div className="container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" name="username" placeholder="Nombre de usuario" 
          onChange={handleChange} required 
        />
        <input 
          type="email" name="email" placeholder="Email" 
          onChange={handleChange} required 
        />
        <input 
          type="password" name="password" placeholder="Contraseña" 
          onChange={handleChange} required 
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPage;