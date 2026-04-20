import { useEffect, useState } from "react";
import API from "../services/api";

function Messages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState("");

    const user1 = 1; // later from backend
    const user2 = 2; // example admin/user

    const fetchMessages = async () => {
        const res = await API.get(`/messages/${user1}/${user2}`);
        setMessages(res.data);
    };

    const sendMessage = async () => {
        await API.post("/messages", {
            receiverId: user2,
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
        <div>
            <h2>Messages</h2>

            <div>
                {messages.map((m, i) => (
                    <div key={i}>
                        <p>{m.text}</p>

                        {m.fileUrl && (
                            <a
                                href={`http://localhost:8080/uploads/${m.fileUrl}`}
                                target="_blank"
                            >
                                📎 file
                            </a>
                        )}
                    </div>
                ))}
            </div>

            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type message..."
            />

            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Messages;
