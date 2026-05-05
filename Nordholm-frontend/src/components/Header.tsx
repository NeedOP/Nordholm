import { useNavigate } from "react-router-dom";
import "../styles/header.css";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleMessagesClick = () => {
        if (!token) navigate("/auth");
        else navigate("/messages");
    };

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate("/")}>
                Nordholm <span>El & Bygg</span>
            </div>

            <nav className="nav">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/about")}>About</button>
                <button onClick={() => navigate("/contact")}>Contact</button>
                <button onClick={handleMessagesClick}>Messages</button>
                <button onClick={() => navigate("/auth")}>Login</button>
            </nav>
        </header>
    );
}

export default Header;
