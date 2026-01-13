import { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Consumimos tu endpoint de MongoDB
        fetch('http://localhost:8000/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error cargando productos:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Cargando catálogo...</p>;

    return (
        <div style={styles.container}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Nuestros Productos</h2>

            <div style={styles.grid}>
                {products.map((product) => (
                    <div key={product.id} style={styles.card}>
                        {/* Si tienes imágenes configuradas, aquí irían. Por ahora ponemos un placeholder */}
                        <div style={styles.imageContainer}>
                            {product.image_url ? (
                                <img
                                    // Si la URL viene de tu DB como "static/...", le pegamos el host del backend
                                    src={`http://localhost:8000/${product.image_url}`}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={styles.placeholder}>Sin Imagen</div>
                            )}
                        </div>

                        <div style={styles.info}>
                            <h3>{product.name}</h3>
                            <p style={styles.description}>{product.description || "Sin descripción"}</p>

                            <div style={styles.footer}>
                                <span style={styles.price}>${product.price}</span>
                                <span style={styles.stock}>Stock: {product.stock}</span>
                            </div>

                            <button style={styles.button}>Agregar al Carrito</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Estilos simples para Cards (Tarjetas)
const styles = {
    container: { padding: '2rem' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Responsivo automático
        gap: '2rem',
    },
    card: {
        border: '1px solid #333',
        borderRadius: '8px',
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
    },
    imageContainer: {
        height: '200px', // Altura fija para todas las fotos
        width: '100%',
        backgroundColor: '#333',
        overflow: 'hidden' // Corta la imagen si es muy grande
    },
    placeholder: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#aaa'
    }
    ,
    info: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    description: { fontSize: '0.9rem', color: '#ccc' },
    footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
    price: { fontSize: '1.2rem', fontWeight: 'bold', color: '#646cff' },
    stock: { fontSize: '0.8rem', color: '#888' },
    button: {
        marginTop: '1rem',
        padding: '8px',
        backgroundColor: '#646cff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default ProductList;