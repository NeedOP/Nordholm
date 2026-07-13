import { useNavigate } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <span className="footer-logo-main">Nordholm</span>
                    <span className="footer-logo-sub">El &amp; Bygg</span>
                    <p className="footer-desc">
                        Professionella el- och byggtjänster i Stockholmsregionen. Certifierade
                        hantverkare med fokus på kvalitet och säkerhet.
                    </p>
                </div>
                <div className="footer-col">
                    <h4>Navigering</h4>
                    <ul>
                        <li onClick={() => navigate("/")}>Hem</li>
                        <li onClick={() => navigate("/about")}>Om oss</li>
                        <li onClick={() => navigate("/contact")}>Kontakt</li>
                        <li onClick={() => navigate("/booking")}>Boka tid</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Kontakt</h4>
                    <div className="footer-contact-entry">
                        <label>E-post</label>
                        <span>info@nordholmel.se</span>
                    </div>
                    <div className="footer-contact-entry">
                        <label>Telefon</label>
                        <span>+46 73 664 84 45</span>
                    </div>
                    <div className="footer-contact-entry">
                        <label>Adress</label>
                        <span>Stockholm, Sverige</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} <span>Nordholm El &amp; Bygg</span>. Alla rättigheter förbehållna.</p>
                <p>Org.nr: 559590-9408</p>
            </div>
        </footer>
    );
}
