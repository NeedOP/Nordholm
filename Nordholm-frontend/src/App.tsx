import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
