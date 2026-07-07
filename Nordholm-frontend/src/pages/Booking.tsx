import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import API from "../services/api";
import "../styles/booking.css";
import { getEmail } from "../utils/auth";

interface Appointment {
    id: number;
    name: string;
    email: string;
    phone: string;
    description: string;
    preferredDate: string;
    preferredTime: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
}

const STATUS_LABELS: Record<string, string> = {
    PENDING: "Väntande",
    ACCEPTED: "Accepterad",
    REJECTED: "Avböjd",
    COMPLETED: "Avslutad",
};

const emptyForm = { name: "", email: getEmail() ?? "", phone: "", description: "", preferredDate: "", preferredTime: "" };

export default function Booking() {
    const [form, setForm] = useState(emptyForm);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const loadAppointments = async () => {
        setLoadingList(true);
        try {
            const res = await API.get("/appointments/me");
            setAppointments(res.data);
        } catch {
            // silent — list is secondary to the booking form
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => { loadAppointments(); }, []);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true); setError(null); setSuccess(null);
        try {
            await API.post("/appointments", form);
            setSuccess("✅ Din bokningsförfrågan har skickats! Vi återkommer inom 24 timmar.");
            setForm({ ...emptyForm, email: getEmail() ?? "" });
            loadAppointments();
        } catch (err: any) {
            const m = err.response?.data?.message || err.response?.data || "Bokningen misslyckades. Försök igen.";
            setError(typeof m === "string" ? m : JSON.stringify(m));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="booking">
            <div className="page-hero">
                <div className="page-hero-inner">
                    <div className="eyebrow">Boka tid</div>
                    <h1>Boka din <em>kostnadsfria</em><br />konsultation</h1>
                    <p>
                        Fyll i formuläret nedan så återkommer vi inom 24 timmar för att
                        bekräfta din bokning.
                    </p>
                </div>
            </div>

            <div className="booking-body">
                <div className="booking-form-block">
                    <h2>Ny bokningsförfrågan</h2>

                    {success && <div className="success-box">{success}</div>}
                    {error && <div className="error-box">{error}</div>}

                    <form onSubmit={submit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Namn</label>
                                <input className="form-input" name="name" placeholder="Ditt namn" value={form.name} onChange={change} required />
                            </div>
                            <div className="form-group">
                                <label>Telefon</label>
                                <input className="form-input" name="phone" placeholder="+46 70 000 00 00" value={form.phone} onChange={change} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>E-postadress</label>
                            <input className="form-input" name="email" type="email" placeholder="din@email.se" value={form.email} onChange={change} required />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Önskat datum</label>
                                <input className="form-input" name="preferredDate" type="date" value={form.preferredDate} onChange={change} required />
                            </div>
                            <div className="form-group">
                                <label>Önskad tid</label>
                                <input className="form-input" name="preferredTime" type="time" value={form.preferredTime} onChange={change} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Beskrivning</label>
                            <textarea className="form-input" name="description" placeholder="Beskriv ditt projekt eller din fråga..." value={form.description} onChange={change} required />
                        </div>

                        <button type="submit" className="form-submit" disabled={loading}>
                            {loading ? "Skickar..." : "Skicka bokningsförfrågan"}
                        </button>
                    </form>
                </div>

                <div className="booking-list-block">
                    <h2>Dina bokningar</h2>

                    {loadingList ? (
                        <div className="booking-empty">Laddar...</div>
                    ) : appointments.length === 0 ? (
                        <div className="booking-empty">
                            <span className="booking-empty-icon">📅</span>
                            <p>Du har inga bokningar ännu.</p>
                        </div>
                    ) : (
                        <div className="booking-list">
                            {appointments.map(a => (
                                <div className="booking-card" key={a.id}>
                                    <div className="booking-card-top">
                                        <span className={`status-badge ${a.status}`}>{STATUS_LABELS[a.status]}</span>
                                        <span className="booking-card-date">{a.preferredDate} · {a.preferredTime}</span>
                                    </div>
                                    <p className="booking-card-desc">{a.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
