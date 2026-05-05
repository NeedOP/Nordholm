import { useState, useEffect } from "react";
import "../styles/home.css";

function Home() {
    const images = [
        {
            src: "/hero1.jpg",
            alt: "Elinstallation",
            text: "Professionella elinstallationer"
        },
        {
            src: "/hero2.jpg",
            alt: "Renovering",
            text: "Kvalitativa bygg- och renoveringsprojekt"
        },
        {
            src: "/hero3.jpg",
            alt: "Service",
            text: "Snabb hjälp vid akuta elproblem"
        }
    ];

    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // fade out

            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % images.length);
                setFade(true); // fade in
            }, 500); // fade duration

        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home">

            {/* HERO */}
            <section className="hero">
                <div
                    className={`hero-bg ${fade ? "fade-in" : "fade-out"}`}
                    style={{backgroundImage: `url(${images[current].src})`}}
                />

                <div className="hero-overlay">
                    <h1>Nordholm El & Bygg</h1>
                    <p>{images[current].text}</p>
                    <button onClick={() => window.location.href = "/auth"}>
                        Logga in
                    </button>
                </div>
            </section>


    {/* ABOUT */
    }
    <section className="about">
        <h2>Om oss</h2>

        <p>
            Vi är ett erfaret team inom bygg och el som levererar
            moderna och pålitliga lösningar anpassade efter dina behov.
        </p>

        <p>
                    Vi hjälper dig med renoveringar och ombyggnationer och
                    skapar funktionella och attraktiva miljöer – från snickeri
                    till färdiga installationer.
                </p>

                <p>
                    Vi installerar belysning, laddboxar, spishällar och
                    elcentraler samt hjälper dig vid felsökning och akuta problem.
                </p>

                <p>
                    Oavsett projektets storlek kan du räkna med kvalitet,
                    noggrannhet och snabb service.
                </p>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div>
                    <h3>Nordholm El & Bygg</h3>
                    <p>© {new Date().getFullYear()}</p>
                </div>

                <div>
                    <p>Email: kontakt@nordholm.se</p>
                    <p>Telefon: 070-000 00 00</p>
                </div>
            </footer>

        </div>
    );
}

export default Home;
