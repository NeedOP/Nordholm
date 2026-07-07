import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { getRole } from "../utils/auth";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const register = async () => {
        setLoading(true); setError(null); setSuccess(null);
        try {
            await API.post("/auth/register", { email, password });
            setSuccess("✅ Konto skapat! Kontrollera din e-post för verifiering.");
        } catch (err: any) {
            const m = err.response?.data?.message || err.response?.data || "Registrering misslyckades";
            setError(typeof m === "string" ? m : JSON.stringify(m));
        } finally { setLoading(false); }
    };

    const login = async () => {
        setLoading(true); setError(null); setSuccess(null);
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            const role = getRole();
            navigate(role === "ADMIN" ? "/admin" : "/booking");
        } catch (err: any) {
            let m = err.response?.data?.message || err.response?.data || "Inloggning misslyckades";
            if (typeof m === "string") {
                if (m.toLowerCase().includes("verify")) m = "⚠️ Verifiera din e-post innan du loggar in.";
                else if (m.toLowerCase().includes("not found")) m = "❌ Kontot finns inte.";
                else if (m.toLowerCase().includes("password")) m = "❌ Fel lösenord.";
            }
            setError(typeof m === "string" ? m : JSON.stringify(m));
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <span className="auth-logo-main">Nordholm</span>
                    <span className="auth-logo-sub">El &amp; Bygg</span>
                </div>
                <h2 className="auth-title">Välkommen tillbaka</h2>
                <p className="auth-sub">Logga in eller skapa ett nytt konto</p>

                {success && <div className="success-box">{success}</div>}
                {error && <div className="error-box">{error}</div>}

                <label className="auth-label">E-postadress</label>
                <input className="auth-input" placeholder="din@email.se" value={email}
                       onChange={e => setEmail(e.target.value.trim().toLowerCase())} />

                <label className="auth-label">Lösenord</label>
                <input className="auth-input" type="password" placeholder="••••••••" value={password}
                       onChange={e => setPassword(e.target.value)} />

                <div className="auth-btns">
                    <button className="btn-login" onClick={login} disabled={loading}>
                        {loading ? "Loggar in..." : "Logga in"}
                    </button>
                    <button className="btn-reg" onClick={register} disabled={loading}>
                        {loading ? "Skapar konto..." : "Skapa nytt konto"}
                    </button>
                </div>

                <p className="auth-link" onClick={() => navigate("/forgot-password")}>
                    Glömt lösenordet?
                </p>

                {loading && <div className="loader" />}
            </div>
        </div>
    );
}
