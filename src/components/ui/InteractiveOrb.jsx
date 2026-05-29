import React, { useState } from 'react';

export default function InteractiveOrb({
    hue = 190,
    hoverIntensity = 0.6,
    forceHoverState = false,
    className = "",
}) {
    const [hover, setHover] = useState(false);

    const isHover = hover || forceHoverState;

    return (
        <div
            className={`relative w-44 h-44 flex items-center justify-center transition-all duration-700 ${className}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Glowing Aura backdrop */}
            <div
                className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 opacity-60`}
                style={{
                    background: `radial-gradient(circle, hsl(${hue}, 85%, 55%) 0%, transparent 70%)`,
                    transform: isHover ? `scale(1.35)` : `scale(1)`,
                }}
            ></div>

            {/* Glowing Orb container */}
            <div
                className="relative z-10 w-28 h-28 rounded-full bg-slate-950/90 border border-cyan-500/30 flex items-center justify-center shadow-2xl overflow-hidden group/orb"
                style={{
                    boxShadow: `0 0 ${isHover ? Math.round(20 + 40 * hoverIntensity) : 20}px hsl(${hue}, 80%, ${isHover ? 60 : 40}%)`
                }}
            >
                {/* Scanner swipe effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-400/10 to-cyan-500/0 translate-y-[-100%] group-hover/orb:animate-[scanline_1.5s_ease-in-out_infinite]" />

                {/* Heartbeat ECG telemetry line SVG */}
                <svg
                    className={`w-16 h-16 transition-all duration-500 ${isHover ? 'text-cyan-300 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-400'}`}
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* ECG path */}
                    <path
                        d="M 10 50 L 35 50 L 42 30 L 50 75 L 58 20 L 65 58 L 70 50 L 90 50"
                        className={isHover ? "animate-[ecg-pulse-anim_1.2s_infinite]" : "animate-[ecg-pulse-anim_2.5s_infinite]"}
                        style={{
                            strokeDasharray: "200",
                            strokeDashoffset: "0",
                        }}
                    />
                </svg>

                {/* Subtle digital grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
            </div>
        </div>
    );
}
