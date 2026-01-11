import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav style={styles.nav}>
            {/* Hacemos click en el título para volver al Home siempre */}
            <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
                Mi App React
            </h2>

            {isLoggedIn ? (
                // CASO A: Si ya entró, mostramos Cerrar Sesión
                <button onClick={onLogout} style={styles.logoutBtn}>
                    Cerrar Sesión
                </button>
            ) : (
                // CASO B: No ha entrado.
                // Solo mostramos el botón si NO estamos ya en la página '/login'
                location.pathname !== '/login' && (
                    <button onClick={() => navigate('/login')} style={styles.loginBtn}>
                        Iniciar Sesión
                    </button>
                )
            )}
        </nav>
    );
};

// Estilos básicos para que se vea ordenado
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#242424',
        borderBottom: '1px solid #333',
        marginBottom: '2rem'
    },
    loginBtn: {
        backgroundColor: '#646cff',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    logoutBtn: {
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Navbar;