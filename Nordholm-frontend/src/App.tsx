import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Verify from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";

const NO_FOOTER = ["/login", "/verify", "/reset-password", "/forgot-password", "/admin"];

function Layout() {
    const { pathname } = useLocation();
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/booking" element={
                    <ProtectedRoute><Booking /></ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
            {!NO_FOOTER.includes(pathname) && <Footer />}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}
