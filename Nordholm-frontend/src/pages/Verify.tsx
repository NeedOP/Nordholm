import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/verify.css";

function Verify() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) { setStatus("error"); setMessage("Ogiltig verifieringslänk"); return; }

        const verify = async () => {
            try {
                await API.get(`/auth/verify?token=${token}`);
                setStatus("success");
                setMessage("E-postadressen har verifierats!");
                setTimeout(() => navigate("/login"), 2000);
            } catch (err: any) {
                const msg =
                    err.response?.data?.message ||
                    err.response?.data ||
                    "Verifiering misslyckades";
                setStatus("error");
                setMessage(typeof msg === "string" ? msg : JSON.stringify(msg));
            }
        };

        verify();
    }, []);

    return (
        <div className="verify-page">
            <div className="verify-card">
                {status === "loading" && (
                    <>
                        <div className="loader" style={{ margin: "0 auto 20px" }} />
                        <p>Verifierar din e-post...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h2 className="success">✅ Klart!</h2>
                        <p>{message}</p>
                        <p className="small">Omdirigerar...</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h2 className="error">❌ Fel</h2>
                        <p>{message}</p>
                        <button onClick={() => navigate("/login")}>
                            Tillbaka till inloggning
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Verify;
