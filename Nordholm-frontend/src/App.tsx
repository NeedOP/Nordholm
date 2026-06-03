import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Verify from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";

// Hide footer on chat and auth pages
function Layout() {
    const location = useLocation();
    const noFooterRoutes = ["/messages", "/login", "/verify", "/reset-password", "/forgot-password"];
    const showFooter = !noFooterRoutes.includes(location.pathname);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            {showFooter && <Footer />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;
