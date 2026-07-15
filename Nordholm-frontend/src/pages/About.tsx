import "../styles/about.css";

export default function About() {
    return (
        <main className="about">
            <div className="page-hero">
                <div className="page-hero-inner">
                    <div className="eyebrow">Om oss</div>
                    <h1>Hantverkare med<br /><em>passion för kvalitet</em></h1>
                    <p>
                        Nordholm El &amp; Bygg grundades med en enkel övertygelse: att varje
                        kund förtjänar professionellt arbete, ärlighet och engagemang — från
                        offert till färdigställt projekt.
                    </p>
                </div>
            </div>

            <div className="about-body">
                <div className="about-block">
                    <div className="about-text">
                        <div className="eyebrow">Vår historia</div>
                        <h2>Ett bolag som har<br />en standard</h2>
                        <p>
                            Vi är ett nytt elinstallationsföretag med lång erfarenhet inom elbranschen.
                            Vårt företag bygger på gedigen kompetens, yrkesstolthet och många års praktisk
                            erfarenhet av elinstallationer för privatpersoner, företag och bostadsrättsföreningar.
                        </p>
                        <p>
                            Som registrerat elinstallationsföretag hos Elsäkerhetsverket arbetar vi enligt
                            gällande lagar, föreskrifter och branschstandarder. Vi har F-skatt och ansvarsförsäkring,
                            vilket ger dig som kund en extra trygghet genom hela projektet.
                        </p>
                        <p>
                            Vi sätter alltid säkerhet, kvalitet och noggrannhet i första hand.
                            Oavsett om det gäller felsökning, service, renovering eller
                            nyinstallation levererar vi hållbara lösningar med ett professionellt
                            utförande och ett personligt bemötande.
                        </p>
                    </div>
                    <div className="about-panel">
                        {[
                            { icon: "🎯", title: "Noggrannhet", desc: "Vi detaljgranskar varje installation och byggnation för att säkerställa långsiktig hållbarhet." },
                            { icon: "🤝", title: "Ärlighet", desc: "Inga dolda kostnader. Fasta priser och tydlig kommunikation från dag ett." },
                            { icon: "🏆", title: "Kvalitetsgaranti", desc: "Vi backar allt utfört arbete med fem års garanti — för din trygghet." },
                            { icon: "⚡", title: "Snabb respons", desc: "Vi svarar på alla förfrågningar inom 24 timmar och erbjuder akutservice dygnet runt." },
                        ].map((v, i) => (
                            <div className="about-value" key={i}>
                                <div className="about-val-icon">{v.icon}</div>
                                <div className="about-val-text">
                                    <h4>{v.title}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="about-block flip">
                    <div className="about-text">
                        <div className="eyebrow">Vår plattform</div>
                        <h2>Digitaliserat för<br />din bekvämlighet</h2>
                        <p>
                            Vi har investerat i en modern kundplattform som gör det enkelt att
                            boka en tid, följa status på din bokning och hantera ditt konto
                            direkt i appen.
                        </p>
                        <p>
                            Plattformen är byggd med robusta och moderna teknologier för att
                            säkerställa säkerhet, prestanda och en smidig upplevelse.
                        </p>
                        <div className="tech-chips">
                            {["React", "TypeScript", "Spring Boot", "PostgreSQL", "JWT Auth", "REST API"].map(t => (
                                <span className="tech-chip" key={t}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="about-panel">
                        {[
                            { icon: "📅", title: "Onlinebokning", desc: "Boka en tid för ditt projekt direkt via plattformen — enkelt och snabbt." },
                            { icon: "📊", title: "Statusuppföljning", desc: "Följ status på din bokning: väntande, accepterad, avslutad." },
                            { icon: "🔐", title: "Säker inloggning", desc: "Krypterad kommunikation och verifierad e-post för din säkerhet." },
                        ].map((v, i) => (
                            <div className="about-value" key={i}>
                                <div className="about-val-icon">{v.icon}</div>
                                <div className="about-val-text">
                                    <h4>{v.title}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
