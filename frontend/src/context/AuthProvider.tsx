import React, { useState, createContext, PropsWithChildren, useContext } from 'react';
import * as jose from 'jose';
import { logout } from "../api";

export interface Role {
    authority: string;
}

interface User {
    username: string;
    firstName: string;
    surname: string;
    roles: Role[];
}

export interface AuthContextType {
    user: User | null;
    handleLogin: (token: string) => void;
    handleLogout: () => void;
}

const initialAuthContext: AuthContextType = {
    user: null,
    handleLogin: () => {},
    handleLogout: () => {}
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (token: string) => {
        try {
            const decodedToken = jose.decodeJwt(token);
            if (decodedToken) {
                const { sub, firstName, surname, roles } = decodedToken;
                setUser( {
                    username: sub!,
                    firstName: firstName! as string,
                    surname: surname! as string,
                    roles: roles! as Role[]
                });
            } else {
                // Handle invalid token
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    );
};
