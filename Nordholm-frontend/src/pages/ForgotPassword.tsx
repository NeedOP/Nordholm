import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const send = async () => {
        setLoading(true); setErr(null); setMsg(null);
        try {
            await API.post("/auth/forgot-password", { email });
            setMsg("📩 Återställningslänk skickad! Kontrollera din e-post.");
        } catch (e: any) {
            const m = e.response?.data?.message || e.response?.data || "Något gick fel";
            setErr(typeof m === "string" ? m : JSON.stringify(m));
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <span className="auth-logo-main">Nordholm</span>
                    <span className="auth-logo-sub">El &amp; Bygg</span>
                </div>
                <h2 className="auth-title">Återställ lösenord</h2>
                <p className="auth-sub">Ange din e-postadress nedan</p>

                {msg && <div className="success-box">{msg}</div>}
                {err && <div className="error-box">{err}</div>}

                <label className="auth-label">E-postadress</label>
                <input className="auth-input" placeholder="din@email.se" value={email}
                       onChange={e => setEmail(e.target.value)} />

                <div className="auth-btns">
                    <button className="btn-login" onClick={send} disabled={loading}>
                        {loading ? "Skickar..." : "Skicka återställningslänk"}
                    </button>
                </div>

                <p className="auth-link" onClick={() => navigate("/login")}>← Tillbaka till inloggning</p>
                {loading && <div className="loader" />}
            </div>
        </div>
    );
}
