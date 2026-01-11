export default function Navbar({ isLoggedIn, onLogout }) {
    return <nav>Soy el Navbar (Login: {isLoggedIn ? 'SI' : 'NO'})</nav>
}