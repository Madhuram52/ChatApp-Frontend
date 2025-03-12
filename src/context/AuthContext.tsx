"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "@/lib/auth";

import { ReactNode } from "react";


interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

// Provide a default value to avoid TypeScript errors
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Use `false` initially
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const result = await checkAuth();
            setIsAuthenticated(result);
            setLoading(false);
        }
        fetchAuthStatus();
    }, []);

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
