import "../styles/home.css";

function Home() {
    return (
        <div className="home">

            <section className="hero">
                <h1>Nordholm EL & BYGG</h1>
                <p>
                    Professional electrical and construction services in Sweden.
                    Reliable. Modern. Safe.
                </p>

                <button>Contact Us</button>
            </section>

            <section className="services">
                <div className="card">
                    <h3>Electrical Work</h3>
                    <p>Installations, repairs, and smart solutions.</p>
                </div>

                <div className="card">
                    <h3>Construction</h3>
                    <p>Modern building with high-quality standards.</p>
                </div>

                <div className="card">
                    <h3>Maintenance</h3>
                    <p>Reliable service and long-term support.</p>
                </div>
            </section>

        </div>
    );
}

export default Home;
