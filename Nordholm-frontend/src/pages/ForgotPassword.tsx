import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendReset = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            await API.post("/auth/forgot-password", { email });
            setMessage("📩 Återställningslänk skickad! Kontrollera din e-post.");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data ||
                "Något gick fel";
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

                <h2 className="auth-title">Återställ lösenord</h2>

                <div className="auth-divider">
                    <span>Ange din e-postadress</span>
                </div>

                <label className="auth-label">E-postadress</label>
                <input
                    className="auth-input"
                    placeholder="din@email.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {message && <div className="success-box">{message}</div>}
                {error && <div className="error-box">{error}</div>}

                <div className="auth-button-group">
                    <button className="btn-login" onClick={sendReset} disabled={loading}>
                        {loading ? "Skickar..." : "Skicka återställningslänk"}
                    </button>
                </div>

                <p className="auth-footer-link" onClick={() => navigate("/login")}>
                    ← Tillbaka till inloggning
                </p>

                {loading && <div className="loader" />}
            </div>
        </div>
    );
}

export default ForgotPassword;
