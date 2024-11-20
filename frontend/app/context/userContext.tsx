"use client"
import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserContextProps {
    email: string | null;
    token: string | null;
    setEmail: (email: string | null) => void;
    setToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProducer: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{ email, setEmail, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProducer');
    }
    return (context);
}



