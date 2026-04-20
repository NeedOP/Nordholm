import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleMessagesClick = () => {
        if (!token) {
            navigate("/auth");
        } else {
            navigate("/messages");
        }
    };

    return (
        <header style={{ display: "flex", gap: 20, padding: 10 }}>
            <h3>Faktura App</h3>

            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/auth")}>Login</button>

            {/* 💬 Chat icon behavior */}
            <button onClick={handleMessagesClick}>
                💬 Messages
            </button>
        </header>
    );
}

export default Header;
