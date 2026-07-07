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
                        <h2>Från litet bolag<br />till etablerat varumärke</h2>
                        <p>
                            Nordholm El &amp; Bygg startades för över ett decennium sedan av
                            grundaren Erik Nordholm, med en vilja att kombinera gedigen
                            hantverksskicklighet med modern teknik och kundservice i världsklass.
                        </p>
                        <p>
                            Idag är vi ett fullserviceföretag inom el och bygg med erfarna och
                            certifierade medarbetare. Vi har genomfört hundratals projekt i
                            Stockholmsregionen — från lägenhetsrenoveringar till kommersiella
                            fastigheter.
                        </p>
                        <p>
                            Vår tillväxt bygger på ett enkelt recept: håll det du lovar, leverera
                            mer än förväntat och behandla varje kund som en långsiktig partner.
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
