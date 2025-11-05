import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// Recibe 'game' y 'onDelete' como props. 'handleEdit' ya no es necesario.
const TarjetaJuego = ({ game, onDelete }) => { 
    const navigate = useNavigate(); // Inicializa el hook de navegación

    // Estilos internos (ejemplo)
    const cardStyle = {
        // ... (otros estilos de tarjeta)
        border: '1px solid #444',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#222',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
    };
    
    const imageStyle = {
        width: '100%',
        height: '250px', 
        objectFit: 'cover', 
        borderBottom: '1px solid #444'
    };

    const editButtonStyle = {
        backgroundColor: '#ffc107', // Amarillo
        color: 'black',
        padding: '8px',
        margin: '5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: 'calc(100% - 10px)'
    };
    
    const deleteButtonStyle = {
        backgroundColor: '#dc3545', // Rojo
        color: 'white',
        padding: '8px',
        margin: '5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: 'calc(100% - 10px)'
    };

    const handleEditClick = () => {
        // Usa navigate para redirigir al formulario de edición con el ID del juego
        // La ruta en App.js debe ser '/editar-juego/:id'
        navigate(`/editar-juego/${game._id}`); 
    };

    return (
        <div style={cardStyle}>
            {/* Imagen de Portada (Placeholder si no hay URL) */}
            <img 
                src={game.coverUrl || 'placeholder-default-url.jpg'} 
                alt={`Portada de ${game.title}`} 
                style={imageStyle} 
            />
            
            <div style={{ padding: '15px' }}>
                <h3>{game.title}</h3>
                <p><strong>Género:</strong> {game.genre || 'N/A'}</p>
                <p><strong>Plataforma:</strong> {game.platform || 'N/A'}</p>
                <p><strong>Estado:</strong> {game.status}</p>
                <p><strong>Horas:</strong> {game.hoursPlayed} h</p>
                <p><strong>Puntuación:</strong> {'⭐'.repeat(game.rating) || 'N/A'}/5</p>

                {/* Botones de Acción */}
                
                {/* 1. Botón Editar Corregido: Usa la navegación */}
                <button onClick={handleEditClick} style={editButtonStyle}>
                    Editar
                </button>
                
                {/* 2. Botón Eliminar: Usa la prop onDelete */}
                <button onClick={() => onDelete(game._id)} style={deleteButtonStyle}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default TarjetaJuego;