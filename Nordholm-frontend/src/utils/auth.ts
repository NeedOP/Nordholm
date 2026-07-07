export interface DecodedToken {
    sub: string;   // email
    role: string;  // "USER" | "ADMIN"
    exp: number;
}

export function decodeToken(token: string): DecodedToken | null {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function getDecoded(): DecodedToken | null {
    const token = getToken();
    if (!token) return null;
    const decoded = decodeToken(token);
    if (!decoded) return null;
    if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
    }
    return decoded;
}

export function isLoggedIn(): boolean {
    return getDecoded() !== null;
}

export function getRole(): string | null {
    return getDecoded()?.role ?? null;
}

export function getEmail(): string | null {
    return getDecoded()?.sub ?? null;
}

export function logout(): void {
    localStorage.removeItem("token");
}