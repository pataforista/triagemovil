import React from 'react';

export default function ElectricBorder({
    color = "#5227FF",            // Stroke/glow color.
    speed = 1,                    // Animation speed multiplier.
    chaos = 0.12,                 // Distortion intensity (0 ~ 1).
    borderRadius = 24,            // Border radius in px (match main rect).
    className = "",
    style = {},
    children
}) {
    return (
        <div
            className={`relative flex items-center justify-center p-[2px] overflow-hidden rounded-[24px] ${className}`}
            style={style}
        >
            {/* 1) Animated SVG Border */}
            <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" className="absolute top-0 left-0 w-full h-full">
                    <defs>
                        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* The animated path */}
                    <rect
                        x="2" y="2"
                        width="calc(100% - 4px)"
                        height="calc(100% - 4px)"
                        rx={borderRadius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="50 400"
                        strokeDashoffset="0"
                        filter="url(#glow-filter)"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="450"
                            to="0"
                            dur={`${2 / speed}s`}
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="1;0.5;1"
                            dur={`${0.5 / chaos}s`}
                            repeatCount="indefinite"
                        />
                    </rect>
                </svg>
            </div>

            {/* Content Container */}
            <div className="relative w-full h-full z-10 rounded-[inherit] bg-inherit">
                {children}
            </div>
        </div>
    );
}
