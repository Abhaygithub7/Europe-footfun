"use client";

import { cn } from "@/lib/utils";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function DateStrip() {
    const searchParams = useSearchParams();
    const selectedDate = searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date();

    // Generate a sliding window of dates (e.g., -2 to +2 days from selected)
    const dates = Array.from({ length: 5 }, (_, i) => {
        const d = addDays(selectedDate, i - 2);
        return d;
    });

    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-500" />
                    <span className="capitalize">{format(selectedDate, "EEEE, MMM d")}</span>
                </h3>
                <div className="flex gap-2">
                    <Link
                        href={`/?date=${format(subDays(selectedDate, 1), "yyyy-MM-dd")}`}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <Link
                        href={`/?date=${format(addDays(selectedDate, 1), "yyyy-MM-dd")}`}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {dates.map((date) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const isToday = isSameDay(date, new Date());

                    return (
                        <Link
                            key={date.toISOString()}
                            href={`/?date=${format(date, "yyyy-MM-dd")}`}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-[80px] h-[70px] rounded-xl border transition-all duration-300",
                                isSelected
                                    ? "bg-blue-600 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] transform scale-105"
                                    : "bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800"
                            )}
                        >
                            <span className={cn("text-xs font-bold uppercase tracking-wider mb-1", isSelected ? "text-blue-200" : "text-slate-500")}>
                                {isToday ? "Today" : format(date, "EEE")}
                            </span>
                            <span className={cn("text-xl font-black", isSelected ? "text-white" : "text-slate-300")}>
                                {format(date, "d")}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
