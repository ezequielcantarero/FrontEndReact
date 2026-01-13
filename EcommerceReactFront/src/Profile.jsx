import { useState, useEffect } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:8000/users/me', { // <--- AJUSTA A TU ENDPOINT
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // ESTA ES LA CLAVE: Enviamos el token como Bearer
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los datos (¿Token vencido?)');
                }

                const data = await response.json();
                setUserData(data);

            } catch (err) {
                setError(err.message);
            }
        };

        fetchProtectedData();
    }, []); // El array vacío [] significa "ejecutar solo una vez al montar"

    return (
        <div style={styles.container}>
            <h2>Perfil del Usuario (Privado)</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {userData ? (
                <div style={styles.card}>
                    {/* Ajusta estas claves según lo que devuelva tu API */}
                    <p><strong>Usuario:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Rol:</strong> {userData.role || 'Usuario'}</p>
                    <pre style={styles.json}>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            ) : (
                <p>Cargando datos protegidos...</p>
            )}
        </div>
    );
};

const styles = {
    container: { textAlign: 'center', padding: '2rem' },
    card: {
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '8px',
        display: 'inline-block',
        textAlign: 'left'
    },
    json: { fontSize: '0.8rem', color: '#aaa', marginTop: '1rem' }
};

export default Profile;