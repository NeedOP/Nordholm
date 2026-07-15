import { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import "../styles/contact.css";

const EMAILJS_SERVICE_ID = "service_yjefzld";
const EMAILJS_TEMPLATE_ID = "template_slow4dw";
const EMAILJS_PUBLIC_KEY = "cEkJb64wgPdjgSN9a";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(false);

    const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError(false);

        emailjs
            .send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    message: form.message,
                },
                { publicKey: EMAILJS_PUBLIC_KEY }
            )
            .then(() => {
                setSent(true);
                setSending(false);
            })
            .catch((err) => {
                console.error("EmailJS error:", err);
                setError(true);
                setSending(false);
            });
    };
    return (
        <main className="contact">
            <div className="page-hero">
                <div className="page-hero-inner">
                    <div className="eyebrow">Kontakt</div>
                    <h1>Hör av dig —<br /><em>vi svarar snabbt</em></h1>
                    <p>
                        Frågor om ett projekt, offertförfrågan eller akut hjälp? Fyll i
                        formuläret så återkommer vi inom 24 timmar.
                    </p>
                </div>
            </div>

            <div className="contact-body">
                <div className="contact-info">
                    <h2>Kontaktuppgifter</h2>
                    {[
                        {icon: "📧", label: "E-post", val: "info@nordholmel.se"},
                        {icon: "📞", label: "Telefon", val: "+46 73 664 84 45"},
                        {icon: "📍", label: "Adress", val: "Stockholm, Sverige"},
                        {icon: "🕐", label: "Öppettider", val: "Mån–Fre 07:00–17:00"},
                    ].map((c, i) => (
                        <div className="contact-info-item" key={i}>
                            <div className="contact-icon">{c.icon}</div>
                            <div>
                                <label>{c.label}</label>
                                <span>{c.val}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="contact-form">
                    <h2>Skicka ett meddelande</h2>
                    {sent ? (
                        <div className="form-ok">✅ Tack! Vi återkommer inom 24 timmar.</div>
                    ) : (
                        <form onSubmit={submit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Namn</label>
                                    <input className="form-input" name="name" placeholder="Ditt namn" value={form.name}
                                           onChange={change} required/>
                                </div>
                                <div className="form-group">
                                    <label>Telefon</label>
                                    <input className="form-input" name="phone" placeholder="+46 70 000 00 00"
                                           value={form.phone} onChange={change}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>E-postadress</label>
                                <input className="form-input" name="email" type="email" placeholder="din@email.se"
                                       value={form.email} onChange={change} required/>
                            </div>
                            <div className="form-group">
                                <label>Meddelande</label>
                                <textarea className="form-input" name="message"
                                          placeholder="Beskriv ditt projekt eller din fråga..." value={form.message}
                                          onChange={change} required/>
                            </div>

                            {error && (
                                <div className="form-error">
                                    ❌ Något gick fel. Försök igen eller ring oss direkt på +46 73 664 84 45.
                                </div>
                            )}

                            <button type="submit" className="form-submit" disabled={sending}>
                                {sending ? "Skickar..." : "Skicka meddelande"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
