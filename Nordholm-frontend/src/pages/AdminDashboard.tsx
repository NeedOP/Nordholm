import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import API from "../services/api";
import "../styles/admin.css";

interface Appointment {
    id: number;
    userId: number;
    name: string;
    email: string;
    phone: string;
    description: string;
    preferredDate: string;
    preferredTime: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
}

interface CustomerDetails {
    id: number;
    email: string;
    verified: boolean;
    role: string;
}

const STATUS_LABELS: Record<string, string> = {
    PENDING: "Väntande",
    ACCEPTED: "Accepterad",
    REJECTED: "Avböjd",
    COMPLETED: "Avslutad",
};

const emptyForm = { customerEmail: "", name: "", email: "", phone: "", description: "", preferredDate: "", preferredTime: "" };

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filter, setFilter] = useState<string>("ALL");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState(emptyForm);
    const [creating, setCreating] = useState(false);
    const [createMsg, setCreateMsg] = useState<string | null>(null);
    const [createErr, setCreateErr] = useState<string | null>(null);

    const [customer, setCustomer] = useState<CustomerDetails | null>(null);

    const loadAppointments = async (status: string) => {
        setLoading(true); setError(null);
        try {
            const res = await API.get("/admin/appointments", {
                params: status !== "ALL" ? { status } : {},
            });
            setAppointments(res.data);
        } catch (err: any) {
            const m = err.response?.data?.message || "Kunde inte hämta bokningar.";
            setError(typeof m === "string" ? m : JSON.stringify(m));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadAppointments(filter); }, [filter]);

    const updateStatus = async (id: number, status: string) => {
        try {
            await API.put(`/admin/appointments/${id}/status`, { status });
            loadAppointments(filter);
        } catch (err: any) {
            const m = err.response?.data?.message || "Kunde inte uppdatera status.";
            alert(typeof m === "string" ? m : JSON.stringify(m));
        }
    };

    const viewCustomer = async (userId: number) => {
        setCustomer(null);
        try {
            const res = await API.get(`/admin/users/${userId}`);
            setCustomer(res.data);
        } catch {
            alert("Kunde inte hämta kunduppgifter.");
        }
    };

    const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submitManual = async (e: FormEvent) => {
        e.preventDefault();
        setCreating(true); setCreateMsg(null); setCreateErr(null);
        try {
            const { customerEmail, ...rest } = form;
            await API.post(`/admin/appointments`, rest, { params: { customerEmail } });
            setCreateMsg("✅ Bokning skapad.");
            setForm(emptyForm);
            loadAppointments(filter);
        } catch (err: any) {
            const m = err.response?.data?.message || "Kunde inte skapa bokningen.";
            setCreateErr(typeof m === "string" ? m : JSON.stringify(m));
        } finally {
            setCreating(false);
        }
    };

    return (
        <main className="admin">
            <div className="admin-header">
                <div>
                    <div className="eyebrow">Adminpanel</div>
                    <h1>Hantera bokningar</h1>
                </div>
                <div className="admin-filters">
                    {["ALL", "PENDING", "ACCEPTED", "REJECTED", "COMPLETED"].map(s => (
                        <button
                            key={s}
                            className={`admin-filter${filter === s ? " active" : ""}`}
                            onClick={() => setFilter(s)}
                        >
                            {s === "ALL" ? "Alla" : STATUS_LABELS[s]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="admin-body">
                <div className="admin-table-block">
                    {loading ? (
                        <div className="admin-empty">Laddar bokningar...</div>
                    ) : error ? (
                        <div className="error-box">{error}</div>
                    ) : appointments.length === 0 ? (
                        <div className="admin-empty">Inga bokningar i denna kategori.</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Kund</th>
                                    <th>Kontakt</th>
                                    <th>Datum &amp; tid</th>
                                    <th>Beskrivning</th>
                                    <th>Status</th>
                                    <th>Åtgärder</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(a => (
                                    <tr key={a.id}>
                                        <td>
                                            <button className="admin-link" onClick={() => viewCustomer(a.userId)}>
                                                {a.name}
                                            </button>
                                        </td>
                                        <td>
                                            <div>{a.email}</div>
                                            <div className="admin-muted">{a.phone}</div>
                                        </td>
                                        <td>{a.preferredDate}<br /><span className="admin-muted">{a.preferredTime}</span></td>
                                        <td className="admin-desc">{a.description}</td>
                                        <td><span className={`status-badge ${a.status}`}>{STATUS_LABELS[a.status]}</span></td>
                                        <td>
                                            <div className="admin-actions">
                                                {a.status === "PENDING" && (
                                                    <>
                                                        <button className="admin-btn accept" onClick={() => updateStatus(a.id, "ACCEPTED")}>Acceptera</button>
                                                        <button className="admin-btn reject" onClick={() => updateStatus(a.id, "REJECTED")}>Avböj</button>
                                                    </>
                                                )}
                                                {a.status === "ACCEPTED" && (
                                                    <button className="admin-btn complete" onClick={() => updateStatus(a.id, "COMPLETED")}>Markera klar</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="admin-side">
                    {customer && (
                        <div className="admin-customer-card">
                            <h3>Kunduppgifter</h3>
                            <div className="admin-customer-row"><span>E-post</span><span>{customer.email}</span></div>
                            <div className="admin-customer-row"><span>Verifierad</span><span>{customer.verified ? "Ja" : "Nej"}</span></div>
                            <div className="admin-customer-row"><span>Roll</span><span>{customer.role}</span></div>
                            <button className="admin-close" onClick={() => setCustomer(null)}>Stäng</button>
                        </div>
                    )}

                    <div className="admin-create-card">
                        <h3>Skapa bokning manuellt</h3>
                        {createMsg && <div className="success-box">{createMsg}</div>}
                        {createErr && <div className="error-box">{createErr}</div>}
                        <form onSubmit={submitManual}>
                            <div className="form-group">
                                <label>Kundens registrerade e-post</label>
                                <input className="form-input" name="customerEmail" type="email" value={form.customerEmail} onChange={changeForm} required />
                            </div>
                            <div className="form-group">
                                <label>Namn</label>
                                <input className="form-input" name="name" value={form.name} onChange={changeForm} required />
                            </div>
                            <div className="form-group">
                                <label>Kontakt-e-post</label>
                                <input className="form-input" name="email" type="email" value={form.email} onChange={changeForm} required />
                            </div>
                            <div className="form-group">
                                <label>Telefon</label>
                                <input className="form-input" name="phone" value={form.phone} onChange={changeForm} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Datum</label>
                                    <input className="form-input" name="preferredDate" type="date" value={form.preferredDate} onChange={changeForm} required />
                                </div>
                                <div className="form-group">
                                    <label>Tid</label>
                                    <input className="form-input" name="preferredTime" type="time" value={form.preferredTime} onChange={changeForm} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Beskrivning</label>
                                <textarea className="form-input" name="description" value={form.description} onChange={changeForm} />
                            </div>
                            <button type="submit" className="form-submit" disabled={creating}>
                                {creating ? "Skapar..." : "Skapa bokning"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
