import "../styles/footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div>
                <h3>Nordholm El & Bygg</h3>
                <p>Professionella el- och byggtjänster i Sverige</p>
            </div>

            <div>
                <p>Email: info@nordholmbygg.se</p>
                <p>Telefon: +46 70 123 45 67</p>
            </div>

            <div className="bottom">
                © {new Date().getFullYear()} Nordholm El & Bygg
            </div>
        </footer>
    );
}

export default Footer;
