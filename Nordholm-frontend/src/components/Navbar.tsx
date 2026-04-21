import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Nordholm</div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;
