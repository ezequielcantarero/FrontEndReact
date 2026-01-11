import { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para mostrar errores del backend

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiamos errores previos

        const formData = new URLSearchParams();
        formData.append('username', username); // OJO: La llave debe ser 'username' sí o sí
        formData.append('password', password);

        try {
            // 1. Hacemos la petición a tu Backend
            const response = await fetch('http://localhost:8000/auth/login', { // <--- AJUSTA ESTA URL si es /token
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            // 2. Verificamos si la respuesta fue exitosa (Status 200-299)
            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            // 3. Obtenemos el token (asumiendo que devuelves un JSON)
            const data = await response.json();
            console.log("Login exitoso, token recibido:", data);

            // 4. Avisamos a la App que entramos
            onLogin(data);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Iniciar Sesión</h2>

            {/* Mostramos mensaje de error si existe */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Ingresar</button>
            </form>
        </div>
    );
};

// ... (Los estilos styles siguen igual que antes)
const styles = {
    // ... tus estilos previos ...
    // (Solo asegúrate de copiar los estilos que ya tenías)
    container: { maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#1a1a1a' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' },
    input: { padding: '8px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white' },
    button: { marginTop: '1rem', padding: '10px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Login;