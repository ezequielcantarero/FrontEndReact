import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Bienvenido a la App</h1>
    <p>Esta es la página principal (Home).</p>
  </div>
);

function App() {
  // Estado que simula si el usuario está logueado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para simular el inicio de sesión (se pasará al Login)
  const handleLogin = (datosUsuario) => {
    console.log("Datos recibidos:", datosUsuario);
    setIsLoggedIn(true);
    // Aquí más adelante guardaremos el token en localStorage
  };

  // Función para cerrar sesión (se pasará al Navbar)
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* El Navbar está fuera de Routes para que se vea en todas las páginas.
        Le pasamos el estado y la función de logout.
      */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="container">
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />

          {/* Ruta de Login:
            Si el usuario YA está logueado, lo redirigimos al Home (Navigate).
            Si no, mostramos el componente Login pasando la función handleLogin.
          */}
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;