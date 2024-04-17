import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../index.css";


const Login = () => {
  const [getCorreo, setCorreo] = useState('');
  const [getContrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  
  const profesoresData = 'http://localhost:5181/profesor'; 

  const buscarProfesor = async () => {
    try {
      const response = await fetch(profesoresData);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los profesores');
      }
      const data = await response.json();
      const estado = data.some((profesor) => {
        return getCorreo === profesor.correo && getContrasena === profesor.contrasena;
      });
      return estado;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const iniciarSesion = async () => {
    if (await buscarProfesor()) {
      Swal.fire({
        title: 'Bienvenido',
        text: 'Será redireccionado a la página principal',
        icon: 'success',
      });
      navigate('/inicio');
     



    } else {
      Swal.fire({
        title: 'Error de credenciales',
        text: 'Usuario y/o contraseña no existe o son incorrectos',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <form className="login-form">
        <h2>Iniciar sesión</h2>
        <div className="input-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="text"
            onChange={(e) => {
              setCorreo(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            onChange={(e) => {
              setContrasena(e.target.value);
            }}
          />
        </div>
        <button type="button" onClick={iniciarSesion}>
          Iniciar sesión
        </button>
      </form>
    </>
  );
};

export default Login;
