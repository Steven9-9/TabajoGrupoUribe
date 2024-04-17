import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../index.css";



const apiEstudiantes = "http://localhost:5180/estudiante";

const Registro = () => {
    const [getUsuario, setUsuario] = useState("");
    const [getNotaExcel, setNotaExcel] = useState("");
    const [getCorreo, setCorreo] = useState("");
    const [getDocumento, setDocumento] = useState("");
    const [getTelefono, setTelefono] = useState("");
    const [getDireccion, setDireccion] = useState("");
    const [estudiantes, setEstudiantes] = useState([]);
    const redireccion = useNavigate();

    const buscarEstudiante = () => {
        return estudiantes.some((estudiante) => {
            return getUsuario === estudiante.nombreEstudiante;
        });
    };

    const agregarEstudiante = async () => {
        try {
            const estudianteNuevo = {
                id: Math.round(Math.random() * 100).toFixed(0),
                nombreEstudiante: getUsuario,
                notaExcel: getNotaExcel,
                correo: getCorreo,
                documento: getDocumento,
                telefono: getTelefono,
                direccion: getDireccion
            };
            await axios.post(apiEstudiantes, estudianteNuevo);
            setEstudiantes([...estudiantes, estudianteNuevo]);
        } catch (error) {
            console.error("Error al agregar estudiante:", error);
        }
    };

    const registrarEstudiante = () => {
        if (buscarEstudiante()) {
            Swal.fire({
                title: "Error",
                text: "El estudiante ya existe en la base de datos",
                icon: "error",
            });
        } else {
            agregarEstudiante();
            Swal.fire({
                title: "Registro exitoso",
                text: "El estudiante ha sido registrado correctamente",
                icon: "success",
            });
            redireccion('/inicio');
            
  
        }
    };

    useEffect(() => {
        setUsuario("");
        setNotaExcel("");
        setCorreo("");
        setDocumento("");
        setTelefono("");
        setDireccion("");
    }, [estudiantes]);

    return (

        <>
        <form className="registro-form">
            <h2>Registro de Estudiante</h2>
            <div className="input-group">
                <label htmlFor="nombreEstudiante">Nombre del estudiante:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsuario(e.target.value);
                    }}
                    value={getUsuario}
                />
            </div>
            <div className="input-group">
                <label htmlFor="notaExcel">Nota en Excel:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setNotaExcel(e.target.value);
                    }}
                    value={getNotaExcel}
                />
            </div>
            <div className="input-group">
                <label htmlFor="correo">Correo electrónico:</label>
                <input
                    type="email"
                    onChange={(e) => {
                        setCorreo(e.target.value);
                    }}
                    value={getCorreo}
                />
            </div>
            <div className="input-group">
                <label htmlFor="documento">Documento de identidad:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setDocumento(e.target.value);
                    }}
                    value={getDocumento}
                />
            </div>
            <div className="input-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setTelefono(e.target.value);
                    }}
                    value={getTelefono}
                />
            </div>
            <div className="input-group">
                <label htmlFor="direccion">Dirección:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setDireccion(e.target.value);
                    }}
                    value={getDireccion}
                />
            </div>
            <button onClick={registrarEstudiante} type="button">
                Registrar Estudiante
            </button>
        </form>

<section className="filtros">

    
    
</section>
</>
    );
};

export default Registro;
