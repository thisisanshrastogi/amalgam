import React, { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;

function clamp(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

function hash(a, b) {
    const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return s - Math.floor(s);
}

export function AbstractArtBackground({ className = '', style = {}, variant = 'wave' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let rafId = null;
        let resizeTimeout = null;
        let width = 0;
        let height = 0;

        let dotsX = [];
        let dotsY = [];
        let dotsR = [];
        let dotsV = [];
        let drawOrder = [];
        let drawnCount = 0;

        let sceneDotColor = '#7E9E88';
        let sceneHiColor = '#F0EAD6';
        let sceneHiThreshold = 0.75;

        function getScene(W, H) {
            const lx = W * 0.85;
            const ly = H * 0.15;
            const S = Math.min(W, H) || 1;

            return {
                cell: 6,
                dot: '#4A5C52',
                hi: '#F0EAD6',
                hiT: 0.85,
                light: { x: lx, y: ly },
                value: function (x, y) {
                    const nx = x / S;
                    const ny = y / S;

                    let flow = 0;
                    if (variant === 'vortex') {
                        const dx = nx - 0.5;
                        const dy = ny - 0.5;
                        const angle = Math.atan2(dy, dx);
                        const radius = Math.sqrt(dx * dx + dy * dy);
                        flow = Math.sin(radius * 25.0 - angle * 4.0);
                    } else {
                        const w1 = Math.sin(nx * 4.0 + ny * 2.5);
                        const w2 = Math.cos(nx * 3.0 - ny * 3.5 + w1 * 1.2);
                        const w3 = Math.sin(nx * 5.0 + ny * 4.0 - w2 * 1.1);
                        flow = (w1 + w2 + w3) / 3.0;
                    }

                    // Topographic contour lines
                    const contours = Math.exp(-Math.pow(Math.sin(flow * Math.PI * 6), 2) * 6);

                    // Soft lighting gradient from top right
                    const gx = (x - lx) / (W * 0.9);
                    const gy = (y - ly) / (H * 0.9);
                    const dist = Math.sqrt(gx * gx + gy * gy);
                    const glow = Math.exp(-dist * 2.0);

                    const grain = (hash(Math.round(x / 5), Math.round(y / 5)) - 0.5) * 0.08;

                    // Combine base lighting, terrain elevation, and contour highlights
                    const elevation = (flow + 1) * 0.5;

                    const baseLight = 0.03 + 0.25 * glow;
                    const contourHighlight = 0.15 * contours * glow;
                    const elevationLight = 0.05 * elevation * glow;

                    return clamp(baseLight + contourHighlight + elevationLight + grain);
                }
            };
        }

        function buildPlate() {
            const sc = getScene(width, height);
            const CELL = sc.cell || 6.0;
            const ANGLE = 0.38;
            sceneDotColor = sc.dot;
            sceneHiColor = sc.hi;
            sceneHiThreshold = sc.hiT;

            const cos = Math.cos(ANGLE);
            const sin = Math.sin(ANGLE);
            const n = Math.ceil(Math.sqrt(width * width + height * height) / CELL) + 2;
            const maxR = CELL * 0.72;

            const ds = [];
            dotsX = []; dotsY = []; dotsR = []; dotsV = [];

            for (let j = -n; j <= n; j++) {
                for (let i = -n; i <= n; i++) {
                    const X = i * CELL * cos - j * CELL * sin;
                    const Y = i * CELL * sin + j * CELL * cos;

                    if (X < -CELL || X > width + CELL || Y < -CELL || Y > height + CELL) continue;

                    const v = clamp(sc.value(X, Y) + (hash(i, j) - 0.5) * 0.05);
                    const r = maxR * Math.sqrt(v);
                    if (r < 0.25) continue;

                    dotsX.push(X);
                    dotsY.push(Y);
                    dotsR.push(r);
                    dotsV.push(v);
                    ds.push(Math.sqrt((X - sc.light.x) ** 2 + (Y - sc.light.y) ** 2));
                }
            }

            drawOrder = new Array(dotsX.length);
            for (let k = 0; k < dotsX.length; k++) drawOrder[k] = k;
            drawOrder.sort((a, b) => ds[a] - ds[b]);
            drawnCount = 0;
        }

        function paintDots(count) {
            const end = Math.min(drawnCount + count, drawOrder.length);
            ctx.fillStyle = sceneDotColor;
            ctx.beginPath();
            for (let k = drawnCount; k < end; k++) {
                const i = drawOrder[k];
                ctx.moveTo(dotsX[i] + dotsR[i], dotsY[i]);
                ctx.arc(dotsX[i], dotsY[i], dotsR[i], 0, TAU);
            }
            ctx.fill();
            drawnCount = end;
        }

        function paintHighlights() {
            ctx.fillStyle = sceneHiColor;
            ctx.beginPath();
            for (let i = 0; i < dotsX.length; i++) {
                if (dotsV[i] < sceneHiThreshold) continue;
                ctx.moveTo(dotsX[i] + dotsR[i] * 0.92, dotsY[i]);
                ctx.arc(dotsX[i], dotsY[i], dotsR[i] * 0.92, 0, TAU);
            }
            ctx.fill();
        }

        function resetAndBuild() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.parentNode.getBoundingClientRect();
            width = Math.max(1, Math.round(rect.width));
            height = Math.max(1, Math.round(rect.height));

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            buildPlate();
        }

        function startAnimation(animate) {
            if (rafId) cancelAnimationFrame(rafId);
            if (!animate) {
                paintDots(drawOrder.length);
                paintHighlights();
                return;
            }
            function step() {
                paintDots(Math.ceil(drawOrder.length / 24));
                if (drawnCount < drawOrder.length) {
                    rafId = requestAnimationFrame(step);
                } else {
                    paintHighlights();
                }
            }
            step();
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        resetAndBuild();
        startAnimation(!reduceMotion);

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resetAndBuild();
                startAnimation(false);
            }, 200);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`absolute inset-0 bg-transparent overflow-hidden opacity-25 mix-blend-screen ${className}`} style={style}>
            <canvas ref={canvasRef} className="block w-full h-full" role="presentation" />
        </div>
    );
}
