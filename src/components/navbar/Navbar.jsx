import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="nav-container">
            <Link to="/">Home</Link>
            <Link to="/create-product">Crear Producto</Link>
        </nav>
    );
}

export default Navbar;