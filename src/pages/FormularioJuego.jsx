import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const FormularioJuego = () => {
    // Hooks de enrutamiento
    const { id } = useParams(); // Obtiene el ID si estamos en /editar-juego/:id
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        platform: '',
        status: 'Pendiente', // Valor por defecto
        hoursPlayed: 0,
        rating: 0,
        coverUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Determina si estamos editando o creando
    const isEditing = !!id;

    // useEffect para cargar los datos si estamos en modo Edición
    useEffect(() => {
        if (isEditing) {
            const fetchGameDetails = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${API_BASE_URL}/games/${id}`);
                    setFormData(response.data.data); // Asume que la API devuelve el objeto de juego
                } catch (err) {
                    setError('Error al cargar los detalles del juego para edición.');
                    console.error('Error fetching game details:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchGameDetails();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); // Solo se ejecuta si el ID de la URL cambia

    // Función que maneja los cambios en los inputs
    const handleChange = (e) => {
        // Corrección: Remueve 'checked' para evitar la advertencia de no-used-vars
        const { name, value, type } = e.target; 
        
        setFormData(prev => ({
            ...prev,
            // Convierte valores a número si el tipo de input es 'number'
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditing) {
                // MODO EDICIÓN (PUT)
                await axios.put(`${API_BASE_URL}/games/${id}`, formData);
                alert('Juego actualizado con éxito.');
            } else {
                // MODO CREACIÓN (POST)
                await axios.post(`${API_BASE_URL}/games`, formData);
                alert('Juego agregado con éxito.');
            }
            
            // Redirigir a la biblioteca después de la operación
            navigate('/biblioteca');

        } catch (err) {
            setError(`Error al ${isEditing ? 'actualizar' : 'crear'} el juego. Verifique el servidor.`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) return <p style={{ padding: '20px', textAlign: 'center' }}>Cargando datos para editar...</p>;
    if (error) return <p style={{ color: 'red', padding: '20px', textAlign: 'center' }}>{error}</p>;

    return (
        <div style={containerStyle}>
            <h1>{isEditing ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h1>
            
            <form onSubmit={handleSubmit} style={formStyle}>
                
                {/* Título */}
                <div style={fieldGroupStyle}>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                {/* Género */}
                <div style={fieldGroupStyle}>
                    <label htmlFor="genre">Género:</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                {/* Plataforma */}
                <div style={fieldGroupStyle}>
                    <label htmlFor="platform">Plataforma:</label>
                    <input
                        type="text"
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                {/* Estado */}
                <div style={fieldGroupStyle}>
                    <label htmlFor="status">Estado:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Jugando">Jugando</option>
                        <option value="Completado">Completado</option>
                    </select>
                </div>

                {/* Horas Jugadas */}
                <div style={fieldGroupStyle}>
                    <label htmlFor="hoursPlayed">Horas Jugadas:</label>
                    <input
                        type="number"
                        name="hoursPlayed"
                        value={formData.hoursPlayed}
                        onChange={handleChange}
                        min="0"
                        style={inputStyle}
                    />
                </div>

                {/* Puntuación (Rating) */}
                <div style={fieldGroupStyle}>
                    <label htmlFor="rating">Puntuación (1-5):</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        style={inputStyle}
                    />
                </div>

                {/* URL de Portada */}
                <div style={fieldGroupStyle}>
                    <label htmlFor="coverUrl">URL de Portada (Opcional):</label>
                    <input
                        type="text"
                        name="coverUrl"
                        value={formData.coverUrl}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>
                
                {/* Botón de envío */}
                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? 'Procesando...' : isEditing ? 'Guardar Cambios' : 'Añadir Juego'}
                </button>
            </form>
        </div>
    );
};

// --- Estilos ---
const containerStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#333',
    borderRadius: '8px',
    color: 'white'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
};

const fieldGroupStyle = {
    display: 'flex',
    flexDirection: 'column'
};

const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #555',
    marginTop: '5px',
    backgroundColor: '#444',
    color: 'white'
};

const buttonStyle = {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
};

export default FormularioJuego;