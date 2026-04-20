import { useEffect, useState } from "react";
import API from "../services/api";

interface Message {
    id: number;
    senderId: number;
    text: string;
    fileUrl?: string;
    conversationId: number;
}

function Messages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");

    const conversationId = 1; // 🔥 temporary (we will improve later)
    const receiverId = 2; // admin/user test

    // 🔥 LOAD MESSAGES
    const fetchMessages = async () => {
        const res = await API.get(`/messages/conversation/${conversationId}`);
        setMessages(res.data);
    };

    // 🔥 SEND MESSAGE
    const sendMessage = async () => {
        await API.post(`/messages/send/${receiverId}`, {
            text,
            fileUrl: null
        });

        setText("");
        fetchMessages();
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Chat</h2>

            {/* CHAT BOX */}
            <div style={styles.chatBox}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            ...styles.message,
                            alignSelf:
                                msg.senderId === receiverId ? "flex-start" : "flex-end",
                            backgroundColor:
                                msg.senderId === receiverId ? "#e5e5e5" : "#4caf50",
                            color: msg.senderId === receiverId ? "black" : "white"
                        }}
                    >
                        <p>{msg.text}</p>

                        {/* FILE SUPPORT */}
                        {msg.fileUrl && (
                            <a
                                href={`http://localhost:8080/uploads/${msg.fileUrl}`}
                                target="_blank"
                                style={{ color: "blue" }}
                            >
                                📎 file
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* INPUT AREA */}
            <div style={styles.inputBox}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                    style={styles.input}
                />

                <button onClick={sendMessage} style={styles.button}>
                    Send
                </button>
            </div>
        </div>
    );
}

const styles: any = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        width: "400px",
        margin: "0 auto"
    },

    chatBox: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #ccc"
    },

    message: {
        padding: "10px",
        margin: "5px",
        borderRadius: "10px",
        maxWidth: "70%"
    },

    inputBox: {
        display: "flex",
        marginTop: "10px"
    },

    input: {
        flex: 1,
        padding: "10px"
    },

    button: {
        padding: "10px"
    }
};

export default Messages;
