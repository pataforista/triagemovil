import React, { useState } from 'react';

export default function InteractiveOrb({
    hue = 0,
    hoverIntensity = 0.2,
    rotateOnHover = true,
    forceHoverState = false,
    className = "",
}) {
    const [hover, setHover] = useState(false);

    const isHover = hover || forceHoverState;

    return (
        <div
            className={`relative w-40 h-40 flex items-center justify-center transition-all duration-700 ${className}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                className={`absolute inset-0 rounded-full blur-2xl transition-all duration-1000 opacity-60`}
                style={{
                    background: `background: radial-gradient(circle, hsl(${hue}, 80%, 60%) 0%, transparent 70%);`,
                    transform: isHover ? `scale(1.5)` : `scale(1)`,
                }}
            ></div>

            <div
                className="relative z-10 w-24 h-24 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden"
                style={{
                    boxShadow: `0 0 ${isHover ? 60 : 30}px hsl(${hue}, 80%, ${isHover ? 60 : 40}%)`
                }}
            >
                {/** Inner content usually an icon or empty */}
                <div className={`text-4xl transition-transform duration-1000 ${rotateOnHover && isHover ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                    ⚡
                </div>
            </div>
        </div>
    );
}
