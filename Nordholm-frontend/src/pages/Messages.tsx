import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/chat.css";

interface Message {
    id: number;
    senderId: number;
    text: string;
    fileUrl?: string;
}

interface User {
    id: number;
    email: string;
}

function Messages() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);

    // 🔥 LOAD USERS
    const fetchUsers = async () => {
        const res = await API.get("/users");
        setUsers(res.data);
    };

    // 🔥 OPEN CHAT
    const openChat = async (user: User) => {
        setSelectedUser(user);

        const res = await API.get(`/conversations/with/${user.id}`);
        const convoId = res.data.id;

        setConversationId(convoId);
        fetchMessages(convoId);
    };

    // 🔥 LOAD MESSAGES
    const fetchMessages = async (convoId: number) => {
        const res = await API.get(`/messages/conversation/${convoId}`);
        setMessages(res.data);
    };

    // 🔥 AUTO REFRESH (REAL-TIME FEEL)
    useEffect(() => {
        if (!conversationId) return;

        const interval = setInterval(() => {
            fetchMessages(conversationId);
        }, 2000);

        return () => clearInterval(interval);
    }, [conversationId]);

    // 🔥 SEND MESSAGE WITH FILE
    const sendMessage = async () => {
        if (!selectedUser) return;

        let fileUrl = null;

        // 📎 Upload file first
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await API.post("/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            fileUrl = res.data;
        }

        // 💬 Send message
        await API.post(`/messages/send/${selectedUser.id}`, {
            text,
            fileUrl
        });

        setText("");
        setFile(null);

        if (conversationId) {
            fetchMessages(conversationId);
        }
    };

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
                        key={user.id}
                        className={`user-item ${
                            selectedUser?.id === user.id ? "active" : ""
                        }`}
                        onClick={() => openChat(user)}
                    >
                        {user.email}
                    </div>
                ))}
            </div>

            {/* CHAT AREA */}
            <div className="chat-area">
                <div className="messages">
                    {messages.map((msg) => {
                        const isImage =
                            msg.fileUrl &&
                            (msg.fileUrl.endsWith(".png") ||
                                msg.fileUrl.endsWith(".jpg") ||
                                msg.fileUrl.endsWith(".jpeg"));

                        return (
                            <div
                                key={msg.id}
                                className={`message ${
                                    msg.senderId === selectedUser?.id
                                        ? "received"
                                        : "sent"
                                }`}
                            >
                                <p>{msg.text}</p>

                                {/* 🖼 IMAGE PREVIEW */}
                                {isImage && (
                                    <img
                                        src={`http://localhost:8080/uploads/${msg.fileUrl}`}
                                        alt="img"
                                        style={{ maxWidth: "200px", marginTop: "5px" }}
                                    />
                                )}

                                {/* 📎 FILE DOWNLOAD */}
                                {msg.fileUrl && !isImage && (
                                    <a
                                        href={`http://localhost:8080/uploads/${msg.fileUrl}`}
                                        target="_blank"
                                    >
                                        📎 Download file
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* INPUT AREA */}
                {selectedUser && (
                    <div className="input-area">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type message..."
                        />

                        {/* 📎 FILE INPUT */}
                        <input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setFile(e.target.files[0]);
                                }
                            }}
                        />

                        <button onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;
