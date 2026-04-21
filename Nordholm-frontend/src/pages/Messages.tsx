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
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");

    // 🔥 FILE STATE (THIS WAS MISSING)
    const [file, setFile] = useState<File | null>(null);

    const [conversationId, setConversationId] = useState<number | null>(null);

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

    // SEND MESSAGE (WITH FILE SUPPORT)
    const sendMessage = async () => {
        if (!selectedUser || !conversationId) return;

        let fileUrl = null;

        // 📎 upload file first if exists
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await API.post("/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fileUrl = res.data;
        }

        await API.post(`/messages/send/${selectedUser.userId}`, {
            text,
            fileUrl,
        });

        setText("");
        setFile(null);

        fetchMessages(conversationId);
    };

    // REAL-TIME REFRESH
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
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message ${
                                msg.senderId === selectedUser?.userId
                                    ? "received"
                                    : "sent"
                            }`}
                        >
                            <p>{msg.text}</p>

                            {/* FILE DISPLAY */}
                            {msg.fileUrl && (
                                <a
                                    href={`http://localhost:8080/uploads/${msg.fileUrl}`}
                                    target="_blank"
                                >
                                    📎 download file
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* INPUT AREA (RESTORED FILE UPLOAD) */}
                {selectedUser && (
                    <div className="input-area">

                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type message..."
                        />

                        {/* 📎 FILE UPLOAD INPUT (THIS WAS MISSING) */}
                        <input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setFile(e.target.files[0]);
                                }
                            }}
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
