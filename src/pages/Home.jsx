import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={homeStyle}>
            <h1>Bienvenido a GameTracker 🎮</h1>
            <p>Tu aplicación personal para seguir tu progreso de juegos, horas jugadas y puntuaciones.</p>
            <Link to="/biblioteca" style={buttonStyle}>
                Ir a Mi Biblioteca
            </Link>
        </div>
    );
};

const homeStyle = {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: '#f4f4f4',
    color: '#333',
    borderRadius: '8px',
    margin: '20px auto',
    maxWidth: '800px'
};

const buttonStyle = {
    display: 'inline-block',
    marginTop: '30px',
    padding: '12px 25px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '1.1em',
    fontWeight: 'bold'
};

export default Home;