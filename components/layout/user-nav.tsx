"use client";

import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { User, LogOut, History } from "lucide-react";
import { useState } from "react";

export function UserNav() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!isAuthenticated || !user) {
        return (
            <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-colors flex items-center gap-2">
                <User className="w-4 h-4" />
                LOGIN
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 group"
            >
                <div className="text-right hidden md:block">
                    <div className="text-xs font-bold text-slate-400">LVL {user.level}</div>
                    <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{user.username}</div>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 overflow-hidden relative group-hover:border-blue-500 transition-colors">
                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-14 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="p-4 border-b border-slate-800">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">My Stats</div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-white font-bold">XP</span>
                            <span className="text-sm text-blue-400 font-mono">{user.xp}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[60%]" />
                        </div>
                    </div>

                    <div className="p-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
                            <History className="w-4 h-4 text-slate-400" />
                            Prediction History
                        </button>
                        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop to close */}
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
}
