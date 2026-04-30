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

            setMessage("📩 Reset link sent! Check your email.");

        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data ||
                "Something went wrong";

            setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h1 className="logo">Reset Password</h1>
                <p className="subtitle">Enter your email</p>

                <input
                    className="auth-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {message && <div className="success-box">{message}</div>}
                {error && <div className="error-box">{error}</div>}

                <button
                    className="btn login"
                    onClick={sendReset}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send reset link"}
                </button>

                {/* 🔙 BACK */}
                <p
                    className="forgot-password"
                    onClick={() => navigate("/")}
                >
                    Back to login
                </p>

                {loading && <div className="loader"></div>}
            </div>
        </div>
    );
}

export default ForgotPassword;
