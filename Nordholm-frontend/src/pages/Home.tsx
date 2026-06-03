import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <main className="home">
            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-bg" />
                <div className="hero-grid-overlay" />

                <div className="hero-content">
                    <div className="hero-tag">
                        Certifierade hantverkare · Stockholm
                    </div>

                    <h1>
                        El &amp; bygg du<br />
                        kan lita på — <em>på riktigt</em>
                    </h1>

                    <p className="hero-desc">
                        Nordholm El &amp; Bygg levererar professionella tjänster
                        inom elinstallation och byggarbeten. Vi jobbar noggrannt,
                        säkert och håller alltid våra tidsplaner.
                    </p>

                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigate("/contact")}>
                            Begär offert
                        </button>
                        <button className="btn-outline" onClick={() => navigate("/about")}>
                            Läs om oss
                        </button>
                    </div>
                </div>

                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="number">12+</div>
                        <div className="label">Års erfarenhet</div>
                    </div>
                    <div className="hero-stat">
                        <div className="number">350+</div>
                        <div className="label">Genomförda projekt</div>
                    </div>
                    <div className="hero-stat">
                        <div className="number">98%</div>
                        <div className="label">Nöjda kunder</div>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="services">
                <div className="section-eyebrow">Vad vi erbjuder</div>
                <h2 className="section-title">
                    Kompletta lösningar<br />för hem &amp; företag
                </h2>

                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">⚡</div>
                        <h3>Elinstallation</h3>
                        <p>
                            Allt från nyinstallation och ombyggnad till felsökning och
                            säkerhetskontroller. Behöriga elektriker med certifiering.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🏗️</div>
                        <h3>Byggarbeten</h3>
                        <p>
                            Renovering, tillbyggnad och nybyggnad. Vi hanterar allt från
                            grunden till färdigställande med hög precision.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🔌</div>
                        <h3>Smart hem</h3>
                        <p>
                            Installation av smarta lösningar för belysning, larm och
                            styrning. Framtidssäkra ditt hem med modern teknik.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🔧</div>
                        <h3>Underhåll &amp; service</h3>
                        <p>
                            Löpande underhåll, akutjänster och servicekontrakt för
                            fastigheter och bostadsrättsföreningar.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">☀️</div>
                        <h3>Solcellsinstallation</h3>
                        <p>
                            Professionell installation av solpaneler och lagringssystem.
                            Sänk din elkostnad och minska miljöpåverkan.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🛡️</div>
                        <h3>Besiktning &amp; kontroll</h3>
                        <p>
                            Teknisk besiktning av el- och byggnadsinstallationer.
                            Säkerhetsintyg och protokoll för försäljning och uthyrning.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── WHY US ── */}
            <section className="why-us">
                <div className="why-us-inner">
                    <div className="why-us-text">
                        <div className="section-eyebrow">Varför välja oss</div>
                        <h2 className="section-title">
                            Kvalitet som<br />syns i resultatet
                        </h2>
                        <p>
                            Vi på Nordholm El &amp; Bygg kombinerar gedigen erfarenhet
                            med moderna arbetsmetoder. Varje projekt är unikt — och vi
                            behandlar det som sådant.
                        </p>
                        <ul className="why-us-list">
                            <li>Behöriga elektriker och certifierade byggnadsarbetare</li>
                            <li>Fasta priser utan dolda avgifter</li>
                            <li>Levererar alltid i tid och inom budget</li>
                            <li>5 års garanti på utfört arbete</li>
                            <li>ROT-avdrag hanteras direkt av oss</li>
                        </ul>
                    </div>

                    <div className="why-us-badges">
                        <div className="badge">
                            <div className="badge-number">12+</div>
                            <div className="badge-label">År i branschen</div>
                        </div>
                        <div className="badge">
                            <div className="badge-number">350+</div>
                            <div className="badge-label">Slutförda projekt</div>
                        </div>
                        <div className="badge">
                            <div className="badge-number">5 år</div>
                            <div className="badge-label">Garanti på allt arbete</div>
                        </div>
                        <div className="badge">
                            <div className="badge-number">24/7</div>
                            <div className="badge-label">Akutservice tillgänglig</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BAND ── */}
            <section className="cta-band">
                <div className="section-eyebrow">Redo att börja?</div>
                <h2>Ta kontakt idag för en kostnadsfri offert</h2>
                <p>Inget projekt är för litet eller för stort. Vi svarar inom 24 timmar.</p>
                <button className="btn-primary" onClick={() => navigate("/contact")}>
                    Kontakta oss nu
                </button>
            </section>
        </main>
    );
}

export default Home;
