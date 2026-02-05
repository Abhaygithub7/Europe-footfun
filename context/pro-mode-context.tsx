"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProModeContextType {
    isProMode: boolean;
    toggleProMode: () => void;
}

const ProModeContext = createContext<ProModeContextType | undefined>(undefined);

export function ProModeProvider({ children }: { children: ReactNode }) {
    const [isProMode, setIsProMode] = useState(false);

    // Optional: Persist to local storage
    useEffect(() => {
        const stored = localStorage.getItem("pro-mode");
        if (stored) {
            setIsProMode(stored === "true");
        }
    }, []);

    const toggleProMode = () => {
        setIsProMode((prev) => {
            const newValue = !prev;
            localStorage.setItem("pro-mode", String(newValue));
            return newValue;
        });
    };

    return (
        <ProModeContext.Provider value={{ isProMode, toggleProMode }}>
            {children}
        </ProModeContext.Provider>
    );
}

export function useProMode() {
    const context = useContext(ProModeContext);
    if (context === undefined) {
        throw new Error("useProMode must be used within a ProModeProvider");
    }
    return context;
}
