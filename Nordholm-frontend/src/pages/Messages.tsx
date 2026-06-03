import { useEffect, useState, useRef } from "react";
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

function getInitials(email: string) {
    return email.slice(0, 2).toUpperCase();
}

function Messages() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getCurrentUserId = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.userId;
        } catch { return null; }
    };

    const currentUserId = getCurrentUserId();

    const fetchUsers = async () => {
        const res = await API.get("/users");
        setUsers(res.data);
    };

    const openChat = async (user: User) => {
        setSelectedUser(user);
        const res = await API.get(`/conversations/with/${user.userId}`);
        const convoId = res.data.id;
        setConversationId(convoId);
        fetchMessages(convoId);
    };

    const fetchMessages = async (convoId: number) => {
        const res = await API.get(`/messages/conversation/${convoId}`);
        setMessages(res.data);
    };

    const sendMessage = async () => {
        if (!selectedUser || !conversationId || (!text.trim() && !file)) return;
        let fileUrl = null;
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await API.post("/files/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                fileUrl = res.data;
            }
            await API.post(`/messages/send/${selectedUser.userId}`, { text, fileUrl });
            setText("");
            setFile(null);
            fetchMessages(conversationId);
        } catch (err) {
            console.error("Fel vid skicka meddelande:", err);
        }
    };

    // @ts-ignore
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!conversationId) return;
        const interval = setInterval(() => fetchMessages(conversationId), 2000);
        return () => clearInterval(interval);
    }, [conversationId]);

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div className="chat-layout">
            {/* SIDEBAR */}
            <div className="chat-sidebar">
                <div className="chat-sidebar-header">
                    <h3>Meddelanden</h3>
                    <span>{users.length} kontakter</span>
                </div>

                <div className="chat-user-list">
                    {users.map((user) => (
                        <div
                            key={user.userId}
                            className={`chat-user-item ${selectedUser?.userId === user.userId ? "active" : ""}`}
                            onClick={() => openChat(user)}
                        >
                            <div className="chat-avatar">{getInitials(user.email)}</div>
                            <div className="chat-user-info">
                                <div className="chat-user-email">{user.email}</div>
                                <div className="chat-user-last">
                                    {user.lastMessage || "Inga meddelanden ännu"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN */}
            <div className="chat-main">
                {!selectedUser ? (
                    <div className="chat-empty">
                        <div className="chat-empty-icon">💬</div>
                        <p>Välj ett samtal för att komma igång</p>
                        <small>Dina konversationer visas till vänster</small>
                    </div>
                ) : (
                    <>
                        {/* Chat header */}
                        <div className="chat-header">
                            <div className="chat-avatar">{getInitials(selectedUser.email)}</div>
                            <div className="chat-header-info">
                                <h4>{selectedUser.email}</h4>
                                <span>Aktiv</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {messages.map((msg) => {
                                const isSent = msg.senderId === currentUserId;
                                return (
                                    <div key={msg.id} className={`chat-message-wrap ${isSent ? "sent" : ""}`}>
                                        {!isSent && (
                                            <div className="chat-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>
                                                {getInitials(selectedUser.email)}
                                            </div>
                                        )}
                                        <div className={`chat-bubble ${isSent ? "sent" : "received"}`}>
                                            {msg.text && <p>{msg.text}</p>}
                                            {msg.fileUrl && (
                                                <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                                                    📎 Ladda ner fil
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chat-input-area">
                            <label className="chat-file-btn" title="Bifoga fil">
                                📎
                                <input
                                    type="file"
                                    onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); }}
                                />
                            </label>

                            {file && <span className="chat-file-name">{file.name}</span>}

                            <input
                                className="chat-text-input"
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Skriv ett meddelande..."
                            />

                            <button className="chat-send-btn" onClick={sendMessage} title="Skicka">
                                ➤
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Messages;
