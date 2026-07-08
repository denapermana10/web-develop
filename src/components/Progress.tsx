import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`w-full bg-slate-150 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
