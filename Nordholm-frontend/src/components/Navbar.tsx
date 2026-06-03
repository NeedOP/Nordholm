import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const isActive = (path: string) => location.pathname === path;

    const handleMessagesClick = () => {
        if (!token) navigate("/login");
        else navigate("/messages");
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-logo" onClick={() => navigate("/")}>
                <span className="logo-main">Nordholm</span>
                <span className="logo-sub">El &amp; Bygg</span>
            </div>

            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <button
                    className={`nav-link ${isActive("/") ? "active" : ""}`}
                    onClick={() => navigate("/")}
                >
                    Hem
                </button>
                <button
                    className={`nav-link ${isActive("/about") ? "active" : ""}`}
                    onClick={() => navigate("/about")}
                >
                    Om oss
                </button>
                <button
                    className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                    onClick={() => navigate("/contact")}
                >
                    Kontakt
                </button>
                <button
                    className={`nav-link ${isActive("/messages") ? "active" : ""}`}
                    onClick={handleMessagesClick}
                >
                    Meddelanden
                </button>
                <button
                    className="nav-link-cta"
                    onClick={() => navigate("/login")}
                >
                    {token ? "Mitt konto" : "Logga in"}
                </button>
            </div>

            <button
                className="navbar-mobile-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Öppna meny"
            >
                {menuOpen ? (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )}
            </button>
        </nav>
    );
}

export default Navbar;
