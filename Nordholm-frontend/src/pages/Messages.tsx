import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/chat.css";

interface Message {
    id: number;
    senderId: number;
    text: string;
    fileUrl?: string;
    createdAt?: string;
}

interface User {
    userId: number;
    email: string;
    lastMessage: string;
}

function Messages() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [conversationId, setConversationId] = useState<number | null>(null);

    // GET CURRENT USER ID FROM TOKEN
    const getCurrentUserId = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.userId; // make sure backend sends this
        } catch {
            return null;
        }
    };

    const currentUserId = getCurrentUserId();

    // USERS
    const fetchUsers = async () => {
        const res = await API.get("/users");
        setUsers(res.data);
    };

    // OPEN CHAT
    const openChat = async (user: User) => {
        setSelectedUser(user);

        const res = await API.get(`/conversations/with/${user.userId}`);
        const convoId = res.data.id;

        setConversationId(convoId);
        fetchMessages(convoId);
    };

    // MESSAGES
    const fetchMessages = async (convoId: number) => {
        const res = await API.get(`/messages/conversation/${convoId}`);
        setMessages(res.data);
    };

    // SEND MESSAGE
    const sendMessage = async () => {
        if (!selectedUser || !conversationId) return;

        let fileUrl = null;

        try {
            //  upload file if exists
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const res = await API.post("/files/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                fileUrl = res.data; // ✅ full URL now
            }

            await API.post(`/messages/send/${selectedUser.userId}`, {
                text,
                fileUrl,
            });

            setText("");
            setFile(null);

            fetchMessages(conversationId);

        } catch (err) {
            console.error("Send message error:", err);
        }
    };

    // AUTO REFRESH
    useEffect(() => {
        if (!conversationId) return;

        const interval = setInterval(() => {
            fetchMessages(conversationId);
        }, 2000);

        return () => clearInterval(interval);
    }, [conversationId]);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="app-container">

            {/* SIDEBAR */}
            <div className="sidebar">
                <h3>Chats</h3>

                {users.map((user) => (
                    <div
                        key={user.userId}
                        className={`user-item ${
                            selectedUser?.userId === user.userId ? "active" : ""
                        }`}
                        onClick={() => openChat(user)}
                    >
                        <div style={{ fontWeight: "bold" }}>
                            {user.email}
                        </div>
                        <div style={{ fontSize: "12px", opacity: 0.7 }}>
                            {user.lastMessage}
                        </div>
                    </div>
                ))}
            </div>

            {/* CHAT AREA */}
            <div className="chat-area">

                <div className="messages">
                    {messages.map((msg) => {
                        const isSent = msg.senderId === currentUserId;

                        return (
                            <div
                                key={msg.id}
                                className={`message ${isSent ? "sent" : "received"}`}
                            >
                                <p>{msg.text}</p>

                                {/*  FIXED FILE LINK */}
                                {msg.fileUrl && (
                                    <a
                                        href={msg.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        📎 Download file
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* INPUT */}
                {selectedUser && (
                    <div className="input-area">

                        <label className="file-btn">
                            📎
                            <input
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>

                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type a message..."
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                )}

            </div>
        </div>
    );
}

export default Messages;
