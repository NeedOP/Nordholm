import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/verify.css";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const token = searchParams.get("token");

    const reset = async () => {
        if (!token) { setMessage("Ogiltig länk"); return; }
        setLoading(true);
        try {
            await API.post("/auth/reset-password", { token, password });
            setMessage("✅ Lösenordet har uppdaterats!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data ||
                "Återställning misslyckades";
            setMessage(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-page">
            <div className="verify-card">
                <h2 style={{ color: "var(--white)", marginBottom: "8px" }}>
                    Nytt lösenord
                </h2>
                <p>Ange ditt nya lösenord nedan.</p>

                <input
                    type="password"
                    placeholder="Nytt lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={reset} disabled={loading}>
                    {loading ? "Uppdaterar..." : "Uppdatera lösenord"}
                </button>

                {message && <p className="small" style={{ marginTop: "16px" }}>{message}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
