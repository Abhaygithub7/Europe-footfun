"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface User {
    username: string;
    avatar: string;
    xp: number;
    level: number;
}

interface AuthContextType {
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [supabase] = useState(() => createClient());

    useEffect(() => {
        // Check for Supabase session
        if (supabase) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session?.user) {
                    setUser({
                        username: session.user.email?.split('@')[0] || "Agent",
                        avatar: session.user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.id}`,
                        xp: 2500, // Bonus for real auth
                        level: 10
                    });
                }
            });

            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
                if (session?.user) {
                    setUser({
                        username: session.user.email?.split('@')[0] || "Agent",
                        avatar: session.user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.id}`,
                        xp: 2500,
                        level: 10
                    });
                } else {
                    // Fallback to local storage if no Supabase session (or logout)
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        setUser(null);
                    }
                }
            });

            return () => subscription.unsubscribe();
        } else {
            // Fallback: Check local storage on mount (Simulated Mode)
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [supabase]);

    const login = async (username: string) => {
        // If Supabase is active, this function might be used for "Email Login" 
        // But for now we keep the simulation logic available for the specific "Codename" flow
        // The real login will be handled directly in the Login Page via supabase.auth.signInWith...

        const newUser: User = {
            username,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            xp: 1250,
            level: 5
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/");
    };

    const logout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return { ...context, supabase: createClient() }; // Expose supabase client for direct usage
}
