import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;

function clamp(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

function hash(a, b) {
    const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return s - Math.floor(s);
}

export function ArtBackground({ className = '', style = {} }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let rafId = null;
        let resizeTimeout = null;
        let width = 0;
        let height = 0;

        // Halftone rendering state
        let dotsX = [];
        let dotsY = [];
        let dotsR = [];
        let dotsV = [];
        let drawOrder = [];
        let drawnCount = 0;

        let sceneDotColor = '#7E9E88';
        let sceneHiColor = '#F0EAD6';
        let sceneHiThreshold = 0.72;

        function getVanitasScene(W, H) {
            const S = Math.min(W, H);
            const cx = W * 0.65;
            const cy = H * 0.55;

            // Hourglass Dimensions
            const hHalf = S * 0.32;
            const hTop = cy - hHalf;
            const hBot = cy + hHalf;
            const maxHW = hHalf * 0.65;
            const neck = maxHW * 0.12;
            const cap = S * 0.015;
            const rim = Math.max(1.5, S * 0.006);

            const horizon = cy + hHalf + cap;
            const lx = W * 0.90;
            const ly = -H * 0.10;

            const coins = [
                [0.86, 0.90, 0.085],
                [0.94, 0.82, 0.055],
                [0.62, 0.93, 0.070],
                [0.52, 0.86, 0.048],
                [0.74, 0.97, 0.062]
            ].map(c => ({ x: c[0] * W, y: c[1] * H, r: c[2] * S }));

            function getHourglassWidth(y) {
                const t = Math.abs(y - cy) / hHalf;
                return neck + (maxHW - neck) * Math.pow(t, 0.88);
            }

            const sandTop = cy - hHalf * 0.75;
            const pileH = hHalf * 0.45;

            return {
                cell: 6,
                dot: '#4A5C52',
                hi: '#F0EAD6',
                hiT: 0.85,
                light: { x: lx, y: ly },
                value: function (x, y) {
                    const gx = (x - lx) / (W * 0.62);
                    const gy = (y - ly) / H;
                    const glow = Math.exp(-Math.sqrt(gx * gx + gy * gy) * 1.9);

                    // 1. Hourglass
                    if (y >= hTop - cap && y <= hBot + cap) {
                        // Caps
                        if ((Math.abs(y - hTop) <= cap || Math.abs(y - hBot) <= cap) && Math.abs(x - cx) <= maxHW * 1.08) {
                            const nx = (x - cx) / (maxHW * 1.08);
                            const capLight = 0.4 + 0.6 * (nx * 0.6 + 0.4);
                            return clamp(capLight * (0.4 + 0.6 * glow) + 0.1);
                        }
                        // Glass body
                        if (y > hTop && y < hBot) {
                            const w = getHourglassWidth(y);
                            const d = w - Math.abs(x - cx);
                            if (d >= 0) {
                                if (d < rim) {
                                    if (x > cx) return clamp(0.7 + 0.3 * glow); // Right edge highlight
                                    return clamp(0.2 + 0.2 * glow);             // Left edge shadow
                                }

                                const grain = 0.52 + 0.46 * hash(Math.round(x / 5), Math.round(y / 5));
                                const nx = (x - cx) / w;
                                const nz = Math.sqrt(Math.max(0, 1 - nx * nx));

                                if (y < cy) {
                                    // Top half
                                    if (y > sandTop) return clamp(grain + 0.15); // High contrast grain
                                    return clamp(0.02 + 0.1 * glow + 0.05 * (1 - nz)); // Empty glass
                                } else {
                                    // Bottom half
                                    const pileTop = hBot - pileH * (1 - Math.pow(Math.abs(x - cx) / Math.max(1, w), 1.7));
                                    if (y > pileTop) return clamp(grain + 0.15); // High contrast grain
                                    if (Math.abs(x - cx) < Math.max(2, W * 0.005)) return clamp(grain + 0.1); // Falling stream
                                    return clamp(0.02 + 0.1 * glow + 0.05 * (1 - nz)); // Empty glass
                                }
                            }
                        }
                    }

                    // 2. No Table, Shadow & Coins (removed per request)
                    return clamp(0.02 + 0.15 * glow);
                }
            };
        }

        let delays = [];

        function buildPlate() {
            const sc = getVanitasScene(width, height);
            const CELL = sc.cell || 5.2;
            const ANGLE = sc.angle == null ? 0.38 : sc.angle;
            sceneDotColor = sc.dot;
            sceneHiColor = sc.hi;
            sceneHiThreshold = sc.hiT;

            const cos = Math.cos(ANGLE);
            const sin = Math.sin(ANGLE);
            const n = Math.ceil(Math.sqrt(width * width + height * height) / CELL) + 2;
            const maxR = CELL * 0.72;

            const ds = [];
            dotsX = []; dotsY = []; dotsR = []; dotsV = []; delays = [];

            let maxDist = 0;

            for (let j = -n; j <= n; j++) {
                for (let i = -n; i <= n; i++) {
                    const X = i * CELL * cos - j * CELL * sin;
                    const Y = i * CELL * sin + j * CELL * cos;

                    if (X < -CELL || X > width + CELL || Y < -CELL || Y > height + CELL) continue;

                    const v = clamp(sc.value(X, Y) + (hash(i, j) - 0.5) * 0.06);
                    const r = maxR * Math.sqrt(v);
                    if (r < 0.30) continue;

                    dotsX.push(X);
                    dotsY.push(Y);
                    dotsR.push(r);
                    dotsV.push(v);

                    const dist = Math.sqrt((X - sc.light.x) ** 2 + (Y - sc.light.y) ** 2);
                    ds.push(dist);
                    if (dist > maxDist) maxDist = dist;
                }
            }

            for (let i = 0; i < dotsX.length; i++) {
                // Delay based on distance from light source (0 to 1200ms) + random jitter
                delays.push((ds[i] / maxDist) * 1200 + hash(i, ds[i]) * 200);
            }
        }

        function paintFull() {
            // Draw all dots immediately (used for resize / reduced motion)
            ctx.fillStyle = sceneDotColor;
            ctx.beginPath();
            for (let i = 0; i < dotsX.length; i++) {
                ctx.moveTo(dotsX[i] + dotsR[i], dotsY[i]);
                ctx.arc(dotsX[i], dotsY[i], dotsR[i], 0, TAU);
            }
            ctx.fill();

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
                paintFull();
                return;
            }

            let startTime = 0;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;

                ctx.clearRect(0, 0, width, height);

                let animating = false;

                // 1. Draw base dots
                ctx.fillStyle = sceneDotColor;
                ctx.beginPath();
                for (let i = 0; i < dotsX.length; i++) {
                    const t = Math.max(0, Math.min(1, (elapsed - delays[i]) / 1000)); // 1s duration per dot
                    if (t > 0) {
                        if (t < 1) animating = true;
                        // easeOutCubic
                        const ease = 1 - Math.pow(1 - t, 3);
                        const currentR = dotsR[i] * ease;
                        if (currentR > 0.2) {
                            ctx.moveTo(dotsX[i] + currentR, dotsY[i]);
                            ctx.arc(dotsX[i], dotsY[i], currentR, 0, TAU);
                        }
                    } else {
                        animating = true;
                    }
                }
                ctx.fill();

                // 2. Draw highlights
                ctx.fillStyle = sceneHiColor;
                ctx.beginPath();
                for (let i = 0; i < dotsX.length; i++) {
                    if (dotsV[i] < sceneHiThreshold) continue;
                    // Highlights appear slightly after the base dot
                    const t = Math.max(0, Math.min(1, (elapsed - delays[i] - 300) / 800));
                    if (t > 0) {
                        if (t < 1) animating = true;
                        const ease = 1 - Math.pow(1 - t, 3);
                        const currentR = dotsR[i] * 0.92 * ease;
                        if (currentR > 0.2) {
                            ctx.moveTo(dotsX[i] + currentR, dotsY[i]);
                            ctx.arc(dotsX[i], dotsY[i], currentR, 0, TAU);
                        }
                    } else {
                        animating = true;
                    }
                }
                ctx.fill();

                if (animating) {
                    rafId = requestAnimationFrame(step);
                }
            }
            rafId = requestAnimationFrame(step);
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initial build
        resetAndBuild();
        startAnimation(!reduceMotion);

        // Handle Resize
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resetAndBuild();
                startAnimation(false); // Snap to complete state on resize
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
        <div
            className={`absolute inset-0 bg-[#0F1D17] overflow-hidden ${className}`}
            style={style}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                role="img"
                aria-label="Halftone still life: an hourglass on a dark table with coins in shadow."
            />
            {/* 
        The "veil" overlay is crucial. It creates the directional fading vignette 
        that allows text to be legible on the left side while the art pops on the right.
      */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(100deg, rgba(9,18,14,.92) 0%, rgba(9,18,14,.72) 40%, rgba(9,18,14,0) 80%)'
                }}
            />

            {/* Money Recovered Statistics */}
            <div className="absolute inset-y-0 md:right-4 lg:right-8 hidden md:flex flex-col justify-center items-end text-brand pointer-events-none z-10 pt-32">
                <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-2xl backdrop-blur-md text-right">
                    <div className="mb-8">
                        <div className="text-4xl md:text-5xl font-serif mb-2 drop-shadow-md">$40.00</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 font-semibold">Late fee waived</div>
                    </div>
                    <div className="mb-8">
                        <div className="text-4xl md:text-5xl font-serif mb-2 drop-shadow-md">$15.99</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 font-semibold">Monthly savings</div>
                    </div>
                    <div>
                        <div className="text-4xl md:text-5xl font-serif mb-2 drop-shadow-md">$120.00</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 font-semibold">Unused credits</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div className="relative w-full h-screen font-sans bg-[#F2EEE3]">

            {/* 1. Place the reusable background component anywhere, ideally in a relative container */}
            <HeroBackground />

            {/* 2. Place your UI content on top of it using standard z-index and positioning */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl text-[#F2EEE3]">
                <div className="uppercase tracking-widest text-xs mb-6 opacity-60 font-mono">
                    The Forensic Financial Engine
                </div>
                <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8 max-w-lg">
                    Some of it never came <em className="italic font-normal">back</em>.
                </h1>
                <p className="text-lg md:text-xl opacity-80 max-w-md leading-relaxed mb-10">
                    Credits that expired unused, refunds nobody chased, subscriptions still billing quietly. The money you forgot about hasn't forgotten you.
                </p>

                <div>
                    <button className="bg-[#F2EEE3] text-[#16211C] px-8 py-4 rounded-full font-medium transition-transform hover:-translate-y-0.5 shadow-lg">
                        Deploy the engine
                    </button>
                </div>
            </div>

        </div>
    );
}