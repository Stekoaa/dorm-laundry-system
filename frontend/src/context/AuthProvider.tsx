import React, { useState, createContext, PropsWithChildren, useContext } from 'react';
import * as jose from 'jose';

export interface Role {
    authority: string;
}

interface User {
    username: string;
    firstName: string;
    surname: string;
    roles: Role[];
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const initialAuthContext: AuthContextType = {
    user: null,
    login: () => {},
    logout: () => {}
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (token: string) => {
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

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};
