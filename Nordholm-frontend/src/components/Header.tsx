import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { isLoggedIn, getRole, logout } from "../utils/auth";

function Header() {
    const navigate = useNavigate();
    const loggedIn = isLoggedIn();
    const isAdmin = getRole() === "ADMIN";

    const handleBookingClick = () => {
        if (!loggedIn) navigate("/login");
        else navigate("/booking");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate("/")}>
                Nordholm <span>El &amp; Bygg</span>
            </div>

            <nav className="nav">
                <button onClick={() => navigate("/")}>Hem</button>
                <button onClick={() => navigate("/about")}>Om oss</button>
                <button onClick={() => navigate("/contact")}>Kontakt</button>
                <button onClick={handleBookingClick}>Boka tid</button>
                {isAdmin && <button onClick={() => navigate("/admin")}>Adminpanel</button>}
                {loggedIn ? (
                    <button onClick={handleLogout}>Logga ut</button>
                ) : (
                    <button className="nav-cta" onClick={() => navigate("/login")}>Logga in</button>
                )}
            </nav>
        </header>
    );
}

export default Header;
