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

    // ✅ REGISTER
    const register = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await API.post("/auth/register", { email, password });

            setSuccess("✅ Account created! Check your email to verify.");

        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data ||
                "Registration failed";

            setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    // ✅ LOGIN
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
                "Login failed";

            // 🔥 CUSTOM FRIENDLY MESSAGES
            if (typeof msg === "string") {
                if (msg.toLowerCase().includes("verify")) {
                    msg = "⚠️ Please verify your email before logging in.";
                }
                if (msg.toLowerCase().includes("not found")) {
                    msg = "❌ Account does not exist.";
                }
                if (msg.toLowerCase().includes("password")) {
                    msg = "❌ Wrong password.";
                }
            }

            setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h1 className="logo">Nordholm</h1>
                <p className="subtitle">EL & BYGG</p>

                <input
                    className="auth-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="auth-input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* ✅ SUCCESS */}
                {success && <div className="success-box">{success}</div>}

                {/* ❌ ERROR */}
                {error && <div className="error-box">{error}</div>}

                <div className="button-group">

                    <button
                        className="btn login"
                        onClick={login}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <button
                        className="btn register"
                        onClick={register}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>

                </div>

                {/* 🔥 FORGOT PASSWORD */}
                <p
                    className="forgot-password"
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot password?
                </p>

                {loading && <div className="loader"></div>}
            </div>
        </div>
    );
}

export default Auth;
