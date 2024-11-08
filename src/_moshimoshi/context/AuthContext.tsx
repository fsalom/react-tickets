import React, { createContext, useContext, useEffect, useState } from 'react';
import { Moshimoshi } from "../Moshimoshi";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
    authenticator: Moshimoshi;
}

export const AuthProvider = ({ children, authenticator }: AuthProviderProps): React.JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const checkAuthStatus = async () => {
        const accessTokenValue = await authenticator.getAccessToken();
        setIsAuthenticated(!!accessTokenValue);
        setLoading(false);
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe ser usado dentro de AuthProvider');
    return context;
};
