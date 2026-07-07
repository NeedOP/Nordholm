import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/verify.css";

export default function Verify() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) { setStatus("error"); setMessage("Ogiltig verifieringslänk"); return; }
        (async () => {
            try {
                await API.get(`/auth/verify?token=${token}`);
                setStatus("success"); setMessage("E-postadressen har verifierats!");
                setTimeout(() => navigate("/login"), 2000);
            } catch (e: any) {
                const m = e.response?.data?.message || e.response?.data || "Verifiering misslyckades";
                setStatus("error"); setMessage(typeof m === "string" ? m : JSON.stringify(m));
            }
        })();
    }, []);

    return (
        <div className="verify-page">
            <div className="verify-card">
                {status === "loading" && (
                    <><div className="verify-loader" /><p>Verifierar din e-post...</p></>
                )}
                {status === "success" && (
                    <><h2 className="success">Klart!</h2><p>{message}</p><p className="small">Omdirigerar...</p></>
                )}
                {status === "error" && (
                    <><h2 className="error">Fel</h2><p>{message}</p><button onClick={() => navigate("/login")}>Tillbaka till inloggning</button></>
                )}
            </div>
        </div>
    );
}
