import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Messages from "./pages/Messages";
import About from "./pages/About";
import Login from "./pages/Auth";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<div style={{padding: "20px"}}>Home Page</div>} />
                <Route path="/about" element={<About />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
