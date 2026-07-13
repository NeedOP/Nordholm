import {useNavigate} from "react-router-dom";
import "../styles/home.css";


const services = [
    {
        icon: "⚡",
        title: "Elinstallation",
        desc: "Nyinstallation, ombyggnad och felsökning av behöriga elektriker med certifiering."
    },
    {
        icon: "🏗️",
        title: "Byggarbeten",
        desc: "Renovering, tillbyggnad och nybyggnad från grunden till färdigställande."
    },
    {
        icon: "☀️",
        title: "Elcentraler",
        desc: "Installation och uppgradering av elcentraler för ökad säkerhet, bättre kontroll och effektiv energifördelning i hemmet."
    },
    {
        icon: "🔌",
        title: "Smart hem",
        desc: "Moderna lösningar för belysning, larm och styrning — framtidssäkra ditt hem."
    },
    {
        icon: "🛡️",
        title: "Besiktning",
        desc: "Teknisk besiktning av el- och byggnadsinstallationer med intyg och protokoll."
    },
    {icon: "🔧", title: "Underhåll", desc: "Löpande underhåll, servicekontrakt och akutjänster dygnet runt."},
];

export default function Home() {
    const navigate = useNavigate();
    return (
        <main className="home">

            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-left">
                    <div className="hero-tag">
                        <span/>
                        Certifierade hantverkare · Stockholm
                    </div>

                    <h1>
                        El &amp; bygg du<br/>
                        kan lita på —<br/>
                        <em>alltid</em>
                    </h1>

                    <p className="hero-desc">
                        Nordholm El &amp; Bygg levererar professionella el- och byggtjänster
                        med fokus på kvalitet, säkerhet och pålitlig service. Boka en tid
                        online — vi återkommer inom 24 timmar.
                    </p>

                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigate("/booking")}>
                            Boka tid
                        </button>
                        <button className="btn-ghost" onClick={() => navigate("/about")}>
                            Läs om oss
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="num">5</div>
                            <div className="lbl">Års garanti </div>
                        </div>
                        <div className="hero-stat">
                            <div className="num">350+</div>
                            <div className="lbl">Projekt slutförda</div>
                        </div>
                        <div className="hero-stat">
                            <div className="num">98%</div>
                            <div className="lbl">Nöjda kunder</div>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-overlay-badge">
                        <div className="dot"/>
                        <span>Tillgängliga för nya projekt</span>
                    </div>
                    <div className="hero-photo-grid">
                        <div className="hero-photo-main" style={{
                            backgroundImage: "url(/hero1.jpg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                        </div>
                        <div className="hero-photo-row">
                            <div className="hero-photo-row-item" style={{
                                backgroundImage: "url(/hero2.jpg)",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}>
                            </div>
                            <div className="hero-photo-row-item" style={{
                                backgroundImage: "url(/hero3.jpg)",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="services">
                <div className="services-inner">
                    <div className="services-header">
                        <div>
                            <div className="eyebrow">Vad vi erbjuder</div>
                            <h2 className="section-title">Kompletta tjänster<br/>för alla behov</h2>
                        </div>
                        <p>
                            Oavsett om det gäller en liten elreparation eller en komplett
                            byggrenovering — vi hanterar allt med samma noggrannhet och
                            professionalism. Inga dolda avgifter, inga överraskningar.
                        </p>
                    </div>

                    <div className="services-grid">
                        {services.map((s, i) => (
                            <div className="svc" key={i}>
                                <div className="svc-num">0{i + 1}</div>
                                <div className="svc-icon">{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <div className="svc-arrow">→</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PHOTO ── */}
            <section className="photo-section">
                <div className="photo-section-inner">
                    <div className="photo-section-header">
                        <div>
                            <h2 className="section-title">Bilder talar<br/>mer än ord</h2>
                        </div>

                    </div>

                    <div className="photo-mosaic">
                        <div className="photo-tile tall" style={{
                            backgroundImage: "url(/home4.jpeg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <div className="photo-tile-caption">
                                <span>Elinstallation</span>
                                <small>Företagskund · Stockholm</small>
                            </div>
                        </div>

                        <div className="photo-tile " style={{
                            backgroundImage: "url(/home8.jpeg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <div className="photo-tile-caption">
                                <span>Elinstallation</span>
                                <small>Företagskund · Stockholm</small>
                            </div>
                        </div>

                        <div className="photo-tile " style={{
                            backgroundImage: "url(/home7.jpeg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <div className="photo-tile-caption">
                                <span>Underhållsarbete</span>
                                <small>Privatbostad</small>
                            </div>
                        </div>

                        <div className="photo-tile wide" style={{
                            backgroundImage: "url(/home5.jpeg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <div className="photo-tile-caption">
                                <span>Komplett renovering</span>
                                <small>Villaägare · Täby</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY ── */}
            <section className="why">
                <div className="why-inner">
                    <div className="why-text">
                    <div className="eyebrow">Varför välja oss</div>
                        <h2 className="section-title">Kvalitet som<br/>håller över tid</h2>
                        <p>
                            Vi kombinerar gedigen hantverkserfarenhet med moderna arbetsmetoder
                            och ett enkelt digitalt bokningsflöde. Varje projekt behandlas som
                            unikt — för att det är det.
                        </p>
                        <ul className="why-list">
                            {[
                                "Behöriga elektriker och certifierade byggnadsarbetare",
                                "Fasta priser utan dolda avgifter — alltid",
                                "Boka tid online och följ status på din förfrågan",
                                "5 års garanti på allt utfört arbete",
                                "ROT-avdrag hanteras direkt av oss",
                                "Akutservice tillgänglig dygnet runt",
                            ].map((t, i) => (
                                <li className="why-item" key={i}>
                                    <div className="why-check">✓</div>
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="why-cards">
                        {[
                            {num: "12", unit: "år", lbl: "i branschen"},
                            {num: "350+", unit: "", lbl: "slutförda projekt"},
                            {num: "5", unit: "år", lbl: "garanti på allt arbete"},
                            {num: "24/7", unit: "", lbl: "akutservice tillgänglig"},
                        ].map((c, i) => (
                            <div className="why-card" key={i}>
                                <div className="num">{c.num} <span className="unit">{c.unit}</span></div>
                                <div className="lbl">{c.lbl}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta">
                <div className="cta-inner">
                    <div>
                        <h2>Redo att boka din tid?</h2>
                        <p>Skapa ett konto, boka online, och följ status på din förfrågan när som helst.</p>
                    </div>
                    <button className="btn-dark" onClick={() => navigate("/booking")}>
                        Boka tid nu →
                    </button>
                </div>
            </section>
        </main>
    );
}
