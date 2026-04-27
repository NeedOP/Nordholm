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

        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link");
            return;
        }

        const verify = async () => {
            try {
                await API.get(`/auth/verify?token=${token}`);

                setStatus("success");
                setMessage("Email verified successfully!");

                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } catch (err: any) {
                const msg =
                    err.response?.data?.message ||
                    err.response?.data ||
                    "Verification failed";

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
                        <div className="loader"></div>
                        <p>Verifying your email...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h2 className="success">✅ Success</h2>
                        <p>{message}</p>
                        <p className="small">Redirecting...</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h2 className="error">❌ Error</h2>
                        <p>{message}</p>
                        <button onClick={() => navigate("/")}>
                            Go back
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}

export default Verify;
