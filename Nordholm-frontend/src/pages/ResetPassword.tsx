import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/verify.css";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const token = searchParams.get("token");

    const reset = async () => {
        if (!token) { setMsg("Ogiltig länk"); return; }
        setLoading(true);
        try {
            await API.post("/auth/reset-password", { token, password });
            setMsg("✅ Lösenordet har uppdaterats!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (e: any) {
            const m = e.response?.data?.message || e.response?.data || "Återställning misslyckades";
            setMsg(typeof m === "string" ? m : JSON.stringify(m));
        } finally { setLoading(false); }
    };

    return (
        <div className="verify-page">
            <div className="verify-card">
                <h2>Nytt lösenord</h2>
                <p>Ange ditt nya lösenord nedan.</p>
                <input type="password" placeholder="Nytt lösenord" value={password}
                       onChange={e => setPassword(e.target.value)} />
                <button onClick={reset} disabled={loading}>{loading ? "Uppdaterar..." : "Uppdatera lösenord"}</button>
                {msg && <p className="small">{msg}</p>}
            </div>
        </div>
    );
}
