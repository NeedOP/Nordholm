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
        if (!token) {
            setMessage("Invalid link");
            return;
        }

        setLoading(true);

        try {
            await API.post("/auth/reset-password", {
                token,
                password
            });

            setMessage("✅ Password updated!");

            setTimeout(() => navigate("/"), 2000);

        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data ||
                "Reset failed";

            setMessage(typeof msg === "string" ? msg : JSON.stringify(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-page">
            <div className="verify-card">

                <h2>Reset Password</h2>

                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={reset} disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                </button>

                {message && <p className="small">{message}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
