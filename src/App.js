import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa tus componentes/páginas
import Home from './pages/Home'; // Si existe
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import FormularioJuego from './pages/FormularioJuego';
import DetalleJuego from './pages/DetalleJuego';
import Estadisticas from './pages/Estadisticas'; // Si existe

// --- Componente de Navegación Simple ---
const NavBar = () => {
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#222',
        color: 'white'
    };
    const linkContainerStyle = {
        display: 'flex',
        gap: '20px'
    };
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold'
    };

    return (
        <nav style={navStyle}>
            <h2>GameTracker 🎮</h2>
            <div style={linkContainerStyle}>
                <Link to="/" style={linkStyle}>Inicio</Link>
                <Link to="/biblioteca" style={linkStyle}>Mi Biblioteca</Link>
                <Link to="/agregar-juego" style={linkStyle}>Agregar Juego</Link>
                <Link to="/estadisticas" style={linkStyle}>Estadísticas</Link>
            </div>
        </nav>
    );
};
// ----------------------------------------


const App = () => {
    return (
        <Router>
            <NavBar />
            
            <div className="container" style={{ padding: '20px' }}>
                <Routes>
                    {/* Rutas principales */}
                    <Route path="/" element={<Home />} />
                    <Route path="/biblioteca" element={<BibliotecaJuegos />} />
                    <Route path="/agregar-juego" element={<FormularioJuego />} />
                    
                    {/* CRÍTICO: CORRECCIÓN DE LA RUTA 404 DE EDICIÓN */}
                    <Route 
                        path="/editar-juego/:id" 
                        element={<FormularioJuego />} 
                    />
                    
                    {/* Ruta de Detalle */}
                    <Route path="/juegos/:id" element={<DetalleJuego />} />
                    
                    {/* Ruta de Estadísticas */}
                    <Route path="/estadisticas" element={<Estadisticas />} />
                    
                    {/* Ruta para Not Found (404) */}
                    <Route path="*" element={<h1>404: Página no encontrada</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;