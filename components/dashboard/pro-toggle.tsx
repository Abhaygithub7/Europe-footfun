"use client";

import { useProMode } from "@/context/pro-mode-context";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export function ProToggle() {
    const { isProMode, toggleProMode } = useProMode();

    return (
        <button
            onClick={toggleProMode}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 relative overflow-hidden group",
                isProMode
                    ? "bg-slate-800 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "bg-slate-900 border-slate-700 hover:border-slate-600"
            )}
        >
            {isProMode && (
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
            )}

            <div className={cn(
                "w-8 h-4 rounded-full relative transition-colors duration-300",
                isProMode ? "bg-blue-600" : "bg-slate-700"
            )}>
                <div className={cn(
                    "absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm",
                    isProMode ? "translate-x-4" : "translate-x-0"
                )} />
            </div>

            <span className={cn(
                "text-xs font-bold uppercase tracking-wider flex items-center gap-1",
                isProMode ? "text-blue-400" : "text-slate-500"
            )}>
                {isProMode && <Zap className="w-3 h-3 fill-blue-400" />}
                Pro Mode
            </span>
        </button>
    );
}
