import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        await API.post("/auth/register", { email, password });
        alert("Registered!");
    };

    const login = async () => {
        const res = await API.post("/auth/login", { email, password });

        localStorage.setItem("token", res.data);

        alert("Logged in!");
        navigate("/messages");
    };

    return (
        <div>
            <h2>Login / Register</h2>

            <input placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />

            <div>
                <button onClick={login}>Login</button>
                <button onClick={register}>Register</button>
            </div>
        </div>
    );
}

export default Auth;
