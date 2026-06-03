import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const register = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await API.post("/auth/register", { email, password });
            setSuccess("✅ Konto skapat! Kontrollera din e-post för att verifiera.");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data ||
                "Registrering misslyckades";
            setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data);
            navigate("/messages");
        } catch (err: any) {
            let msg =
                err.response?.data?.message ||
                err.response?.data ||
                "Inloggning misslyckades";
            if (typeof msg === "string") {
                if (msg.toLowerCase().includes("verify")) msg = "⚠️ Vänligen verifiera din e-post innan du loggar in.";
                else if (msg.toLowerCase().includes("not found")) msg = "❌ Kontot finns inte.";
                else if (msg.toLowerCase().includes("password")) msg = "❌ Fel lösenord.";
            }
            setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <span className="auth-logo-main">Nordholm</span>
                    <span className="auth-logo-sub">El &amp; Bygg</span>
                </div>

                <h2 className="auth-title">Välkommen tillbaka</h2>

                <div className="auth-divider">
                    <span>Logga in eller registrera dig</span>
                </div>

                <label className="auth-label">E-postadress</label>
                <input
                    className="auth-input"
                    placeholder="din@email.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                />

                <label className="auth-label">Lösenord</label>
                <input
                    className="auth-input"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {success && <div className="success-box">{success}</div>}
                {error && <div className="error-box">{error}</div>}

                <div className="auth-button-group">
                    <button className="btn-login" onClick={login} disabled={loading}>
                        {loading ? "Loggar in..." : "Logga in"}
                    </button>
                    <button className="btn-register" onClick={register} disabled={loading}>
                        {loading ? "Skapar konto..." : "Skapa nytt konto"}
                    </button>
                </div>

                <p
                    className="auth-footer-link"
                    onClick={() => navigate("/forgot-password")}
                >
                    Glömt lösenordet?
                </p>

                {loading && <div className="loader" />}
            </div>
        </div>
    );
}

export default Auth;
