import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../utils/auth";

interface Props {
    children?: ReactNode;
    adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: Props) {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && getRole() !== "ADMIN") {
        return <Navigate to="/booking" replace />;
    }

    return <>{children}</>;
}