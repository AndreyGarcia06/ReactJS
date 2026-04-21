import { createContext, useState, useContext } from 'react';
const AuthContext = createContext();

const decodeToken = (token) => {
    if (!token || typeof token !== 'string') return null;
    try {
        const [, payload] = token.split('.');
        if (!payload) return null;
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
};

const getStoredAuth = () => {
    const token = localStorage.getItem('token');
    const user = decodeToken(token);
    return {
        token,
        user,
        isLoggedIn: !!token,
        role: user?.rol || 'cliente',
        isAdmin: user?.rol === 'admin',
    };
};

export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState(getStoredAuth);
    const login = (token) => {
        localStorage.setItem('token', token);
        const user = decodeToken(token);
        setAuthState({
            token,
            user,
            isLoggedIn: true,
            role: user?.rol || 'cliente',
            isAdmin: user?.rol === 'admin',
        });
    };
    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            user: null,
            isLoggedIn: false,
            role: 'cliente',
            isAdmin: false,
        });
    };
    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};