import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; 
import { API_BASE_URL } from '../config'; 

const DetalleJuego = () => {
    const { id } = useParams(); // Obtiene el ID del juego de la URL
    const [game, setGame] = useState(null); // Estado para los detalles del juego
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // CRÍTICO: El useEffect ahora contiene la función fetchGameDetails
    useEffect(() => {
        // Función definida dentro del hook para evitar la advertencia de dependencia
        const fetchGameDetails = async () => {
            setLoading(true);
            try {
                // Petición GET para obtener el detalle de un solo juego por ID
                const response = await axios.get(`${API_BASE_URL}/games/${id}`);
                setGame(response.data.data); 
                setError(null);
            } catch (err) {
                setError('Error al cargar los detalles del juego. Verifique la conexión con el Backend.');
                console.error('Error fetching game details:', err);
                setGame(null); 
            } finally {
                setLoading(false);
            }
        };

        // Llama a la función de carga
        if (id) {
            fetchGameDetails();
        }
        
    }, [id]); // Solo se re-ejecuta si el ID del juego en la URL cambia

    if (loading) return <p style={messageStyle}>Cargando detalles...</p>;
    if (error) return <p style={{ ...messageStyle, color: 'red' }}>{error}</p>;
    if (!game) return <p style={messageStyle}>Juego no encontrado.</p>;

    return (
        <div style={containerStyle}>
            <h1>{game.title}</h1>
            <div style={detailsGridStyle}>
                <div style={imageContainerStyle}>
                    <img 
                        src={game.coverUrl || 'placeholder-default-url.jpg'} 
                        alt={`Portada de ${game.title}`} 
                        style={imageStyle} 
                    />
                </div>
                <div style={infoStyle}>
                    <p><strong>Género:</strong> {game.genre || 'N/A'}</p>
                    <p><strong>Plataforma:</strong> {game.platform || 'N/A'}</p>
                    <p><strong>Estado:</strong> <span style={statusStyle(game.status)}>{game.status}</span></p>
                    <p><strong>Horas Jugadas:</strong> {game.hoursPlayed} h</p>
                    <p><strong>Puntuación:</strong> {'⭐'.repeat(game.rating) || 'N/A'}/5</p>
                    
                    {/* Enlace para editar el juego */}
                    <Link to={`/editar-juego/${game._id}`} style={editLinkStyle}>
                        Editar
                    </Link>
                </div>
            </div>
            
            {/* Aquí irían los componentes de ListaReseñas y FormularioReseña */}
            <div style={{ marginTop: '30px' }}>
                {/* <h2>Reseñas y Comentarios</h2> */}
                {/* <ListaResenas gameId={game._id} /> */}
                {/* <FormularioResena gameId={game._id} /> */}
            </div>
        </div>
    );
};

// --- Estilos ---
const containerStyle = {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    color: 'white'
};

const messageStyle = {
    padding: '20px',
    textAlign: 'center'
};

const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '30px',
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '8px'
};

const imageContainerStyle = {
    overflow: 'hidden',
    borderRadius: '4px'
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block'
};

const infoStyle = {
    fontSize: '1.1em',
    lineHeight: '1.8'
};

const statusStyle = (status) => ({
    fontWeight: 'bold',
    color: status === 'Completado' ? '#28a745' : status === 'Jugando' ? '#ffc107' : '#007bff'
});

const editLinkStyle = {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 15px',
    backgroundColor: '#ffc107',
    color: 'black',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
};

export default DetalleJuego;