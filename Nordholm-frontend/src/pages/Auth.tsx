import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const register = async () => {
        setLoading(true);
        setError(null);

        try {
            await API.post("/auth/register", { email, password });
            alert("Account created!");
        } catch (err: any) {

            const msg =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.response?.data ||
                "Registration failed";

            setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };


    const login = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await API.post("/auth/login", { email, password });

            localStorage.setItem("token", res.data);

            navigate("/messages");
        } catch (err: any) {

            const msg =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.response?.data ||
                "Login failed";

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
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="auth-input"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

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

                {loading && <div className="loader"></div>}

            </div>
        </div>
    );
}

export default Auth;
