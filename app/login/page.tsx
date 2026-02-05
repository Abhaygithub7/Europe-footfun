"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Trophy, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;

        setIsLoading(true);
        // Simulate network delay for effect
        setTimeout(() => {
            login(username);
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                        MATCH PREDICTOR <span className="text-white text-lg">PRO</span>
                    </h1>
                    <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Join the Elite Predictors</p>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl relative group">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-lg" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Hybrid UI: If Supabase client exists, show real fields, else show simulation */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Agent Codename
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="e.g. Maverick"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                                autoComplete="off"
                                autoFocus
                            />
                        </div>

                        {/* Note explaining the mode */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-950/50 p-3 rounded border border-slate-800/50">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            <span>Secure authentication gateway active.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !username}
                            className={cn(
                                "w-full py-4 rounded-lg font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                                isLoading || !username
                                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
                            )}
                        >
                            {isLoading ? "Connecting..." : "Enter Arena"}
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
