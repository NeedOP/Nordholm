import { useState } from "react";
import "../styles/contact.css";

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [sent, setSent] = useState(false);

    // @ts-ignore
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // @ts-ignore
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production: send to your backend
        setSent(true);
    };

    return (
        <main className="contact">
            <div className="contact-hero">
                <div className="contact-hero-inner">
                    <div className="section-eyebrow">Kontakt</div>
                    <h1>Hör av dig — vi<br /><em>svarar snabbt</em></h1>
                    <p>
                        Har du frågor om ett projekt, vill ha en offert eller behöver
                        akut hjälp? Fyll i formuläret så återkommer vi inom 24 timmar.
                    </p>
                </div>
            </div>

            <div className="contact-body">
                {/* Info */}
                <div className="contact-info-block">
                    <h2>Kontaktuppgifter</h2>
                    <div className="contact-info-items">
                        <div className="contact-info-item">
                            <div className="contact-info-item-icon">📧</div>
                            <div className="contact-info-item-text">
                                <label>E-post</label>
                                <span>info@nordholmbygg.se</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-info-item-icon">📞</div>
                            <div className="contact-info-item-text">
                                <label>Telefon</label>
                                <span>+46 70 123 45 67</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-info-item-icon">📍</div>
                            <div className="contact-info-item-text">
                                <label>Adress</label>
                                <span>Stockholm, Sverige</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-info-item-icon">🕐</div>
                            <div className="contact-info-item-text">
                                <label>Öppettider</label>
                                <span>Mån–Fre: 07:00–17:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="contact-form-block">
                    <h2>Skicka ett meddelande</h2>

                    {sent ? (
                        <div className="form-success">
                            ✅ Tack! Vi återkommer till dig inom 24 timmar.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Namn</label>
                                    <input
                                        className="form-input"
                                        name="name"
                                        placeholder="Ditt namn"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Telefon</label>
                                    <input
                                        className="form-input"
                                        name="phone"
                                        placeholder="+46 70 000 00 00"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>E-postadress</label>
                                <input
                                    className="form-input"
                                    name="email"
                                    type="email"
                                    placeholder="din@email.se"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Meddelande</label>
                                <textarea
                                    className="form-input"
                                    name="message"
                                    placeholder="Beskriv ditt projekt eller din fråga..."
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="form-submit">
                                Skicka meddelande
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Contact;
