// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tokens } from '../entity/Tokens';
import { Token } from '../entity/Token';

interface AuthContextType {
    tokens: Tokens | null;
    isAuthenticated: boolean;
    loading: boolean;
    checkAuthStatus: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga

    useEffect(() => {
        const accessTokenValue = localStorage.getItem('accessToken');
        const refreshTokenValue = localStorage.getItem('refreshToken');

        if (accessTokenValue && refreshTokenValue) {
            const accessToken = new Token(accessTokenValue, 3600); // Ajusta la expiración
            const refreshToken = new Token(refreshTokenValue, 86400);
            const tokensInstance = new Tokens(accessToken, refreshToken);

            setTokens(tokensInstance);
            setIsAuthenticated(tokensInstance.isAccessTokenValid || tokensInstance.isRefreshTokenValid);
        }

        setLoading(false); // Estado de carga finalizado
    }, []);

    const checkAuthStatus = () => {
        const accessTokenValue = localStorage.getItem('accessToken');
        const refreshTokenValue = localStorage.getItem('refreshToken');
        if (accessTokenValue && refreshTokenValue) {
            const accessToken = new Token(accessTokenValue, 3600); // Ajusta la expiración
            const refreshToken = new Token(refreshTokenValue, 86400);
            const tokens = new Tokens(accessToken, refreshToken);
        }

        if (tokens) {
            const valid = tokens.isAccessTokenValid || tokens.isRefreshTokenValid;
            setIsAuthenticated(valid);

            if (!valid) {
                logout();
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setTokens(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ tokens, isAuthenticated, loading, checkAuthStatus, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe ser usado dentro de AuthProvider');
    return context;
};
