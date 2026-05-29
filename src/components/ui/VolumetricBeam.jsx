import React, { useEffect, useRef } from 'react';

export default function VolumetricBeam({
    wispDensity = 1,
    wispSpeed = 15.0,
    flowSpeed = 0.35,
    fogIntensity = 0.45,
    dpr = 'auto',
    color = '#FF79C6',
    className = ""
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId;
        let time = 0;

        function resize() {
            canvas.width = window.innerWidth * (dpr === 'auto' ? window.devicePixelRatio : dpr);
            canvas.height = window.innerHeight * (dpr === 'auto' ? window.devicePixelRatio : dpr);
        }
        window.addEventListener('resize', resize);
        resize();

        function draw() {
            if (!canvas) return;
            const w = canvas.width;
            const h = canvas.height;
            time += 0.01 * flowSpeed;

            // Simple noise simulation for "volumetric" effect
            ctx.clearRect(0, 0, w, h);

            // Beam Gradient
            const gradient = ctx.createRadialGradient(
                w * 0.5 + Math.sin(time) * 50,
                h * 0.0 - 100,
                10,
                w * 0.5,
                h * 0.8,
                w * 1.5
            );

            gradient.addColorStop(0, color);
            gradient.addColorStop(0.4 * fogIntensity, `${color}44`); // Hex alpha roughly
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.globalCompositeOperation = 'screen';
            ctx.beginPath();
            ctx.moveTo(w * 0.2, h + 100);
            ctx.lineTo(w * 0.8, h + 100);
            ctx.lineTo(w * 0.5, -200);
            ctx.closePath();
            ctx.fill();

            // Wisps
            for (let i = 0; i < wispDensity * 10; i++) {
                const y = (time * wispSpeed * 10 + i * 50) % (h + 200) - 100;
                const x = (w * 0.5) + Math.sin(y * 0.005 + time) * (w * 0.3);

                ctx.fillStyle = `${color}22`;
                ctx.beginPath();
                ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        }
        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [color, flowSpeed, wispSpeed, fogIntensity, dpr, wispDensity]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed top-0 left-0 w-full h-full pointer-events-none -z-10 ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
