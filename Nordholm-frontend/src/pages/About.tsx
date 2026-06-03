import "../styles/about.css";

function About() {
    return (
        <main className="about">
            <div className="about-hero">
                <div className="about-hero-inner">
                    <div className="section-eyebrow">Om oss</div>
                    <h1>
                        Hantverkare med <em>passion</em><br />
                        för kvalitet
                    </h1>
                    <p>
                        Nordholm El &amp; Bygg grundades med en enkel övertygelse: att
                        varje kund förtjänar professionellt arbete, ärlighet och
                        engagemang — från offert till färdigställt projekt.
                    </p>
                </div>
            </div>

            <div className="about-body">
                {/* Historia */}
                <div className="about-section">
                    <div className="about-text">
                        <div className="section-eyebrow">Vår historia</div>
                        <h2>Från litet bolag till etablerat varumärke</h2>
                        <p>
                            Nordholm El &amp; Bygg startades för över ett decennium sedan
                            av grundaren Erik Nordholm, med en önskan om att kombinera
                            gedigen hantverksskicklighet med modern teknik och kundservice
                            i världsklass.
                        </p>
                        <p>
                            Idag är vi ett fullserviceföretag inom el och bygg, med ett
                            team av erfarna och certifierade medarbetare. Vi har genomfört
                            hundratals projekt i Stockholmsregionen — allt från enskilda
                            lägenhetsrenoveringar till kommersiella fastigheter.
                        </p>
                        <p>
                            Vår tillväxt bygger på ett enkelt recept: håll det du lovar,
                            leverera mer än förväntat och behandla varje kund som en
                            långsiktig partner.
                        </p>
                    </div>

                    <div className="about-visual">
                        <div className="about-value">
                            <div className="about-value-icon">🎯</div>
                            <div>
                                <h4>Noggrannhet</h4>
                                <p>Vi detaljgranskar varje installtion och byggnation för att säkerställa långsiktig hållbarhet.</p>
                            </div>
                        </div>
                        <div className="about-value">
                            <div className="about-value-icon">🤝</div>
                            <div>
                                <h4>Ärlighet</h4>
                                <p>Inga dolda kostnader. Fasta priser och tydlig kommunikation från dag ett.</p>
                            </div>
                        </div>
                        <div className="about-value">
                            <div className="about-value-icon">🏆</div>
                            <div>
                                <h4>Kvalitetsgaranti</h4>
                                <p>Vi backar allt utfört arbete med fem års garanti — för din trygghet.</p>
                            </div>
                        </div>
                        <div className="about-value">
                            <div className="about-value-icon">⚡</div>
                            <div>
                                <h4>Snabb respons</h4>
                                <p>Vi svarar på alla förfrågningar inom 24 timmar och erbjuder akutservice dygnet runt.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech */}
                <div className="about-section reverse">
                    <div className="about-text">
                        <div className="section-eyebrow">Vår plattform</div>
                        <h2>Digitaliserat för din bekvämlighet</h2>
                        <p>
                            Vi har investerat i en modern kundplattform som gör det enkelt
                            att kommunicera med oss, följa ditt projekts framsteg och dela
                            dokument och ritningar direkt i appen.
                        </p>
                        <p>
                            Plattformen är byggd med React, Spring Boot och PostgreSQL —
                            robust, säker och skalbar.
                        </p>
                    </div>

                    <div className="about-visual">
                        <div className="about-value">
                            <div className="about-value-icon">💬</div>
                            <div>
                                <h4>Direktmeddelanden</h4>
                                <p>Kommunicera med din projektledare direkt via vår inbyggda chattfunktion.</p>
                            </div>
                        </div>
                        <div className="about-value">
                            <div className="about-value-icon">📁</div>
                            <div>
                                <h4>Fildelning</h4>
                                <p>Skicka och ta emot ritningar, offerter och projektdokument säkert via plattformen.</p>
                            </div>
                        </div>
                        <div className="about-value">
                            <div className="about-value-icon">🔐</div>
                            <div>
                                <h4>Säker inloggning</h4>
                                <p>Krypterad kommunikation och verifierad e-post för din säkerhet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default About;
