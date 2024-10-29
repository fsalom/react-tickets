// ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, loading, checkAuthStatus } = useAuth();

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Esperar a que el estado de autenticación esté listo
    if (loading) {
        return <div>Loading...</div>; // O un indicador de carga personalizado
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
