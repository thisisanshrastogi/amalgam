
export default function AmalgamicExpressDark() {
    // We extract the recurring stroke and fill combinations into constants 
    // to keep our JSX clean while utilizing Tailwind's arbitrary values.

    // Grayscale Palette mapped to Tailwind
    const fBg = "fill-[#E8E8E8]";
    const fBrand = "fill-[#111111]";
    const fAccent = "fill-[#2B2B2B]";
    const fHighlight = "fill-[#9E9E9E]";
    const fMuted = "fill-[#666666]";
    const fSurface = "fill-[#FFFFFF]";

    // Stroke Utilities
    const sThick = "stroke-[#111111] stroke-[4px] fill-none";
    const sMed = "stroke-[#111111] stroke-[2.5px] fill-none";
    const sThin = "stroke-[#111111] stroke-[1.5px] fill-none";

    return (
        <div className="w-full max-w-[400px] drop-shadow-[0_25px_35px_rgba(23,22,19,0.25)]">

            {/* SVG Wrapper - Note the strokeLinecap and Linejoin applied at the group level to cascade to all paths */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" className="w-full h-auto block">

                <defs>
                    {/* A wave pattern element for dense corner ornamentation */}
                    <g id="corner-wave">
                        <path className={`${fHighlight} ${sMed}`} d="M 0,0 C 40,0 60,30 80,60 C 100,90 130,100 160,100 C 140,70 150,30 180,0 C 120,20 80,-10 40,-30 C 20,-10 10,-5 0,0 Z" />
                        <path className={`${fBg} ${sMed}`} d="M 20,10 C 50,20 60,40 70,70 C 90,80 110,80 130,90 C 110,60 120,30 140,10 C 90,20 60,0 20,10 Z" />
                        {/* Swirls */}
                        <path className={`${fAccent} ${sMed}`} d="M 80,60 C 50,70 30,90 20,120 C 50,110 70,100 80,80 Z" />
                        <path className={`${fMuted} ${sMed}`} d="M 160,100 C 150,130 130,150 100,160 C 120,150 140,140 150,120 Z" />
                        <circle cx="90" cy="40" r="4" className={fBrand} />
                        <circle cx="130" cy="60" r="4" className={fBrand} />
                    </g>

                    <g id="side-flourish">
                        <path className={`${fBg} ${sMed}`} d="M 0,0 C 30,-20 60,-10 80,10 C 60,30 30,20 0,0 Z" />
                        <path className={`${fHighlight} ${sMed}`} d="M 10,5 C 30,-10 50,-5 70,10 C 50,20 30,15 10,5 Z" />
                    </g>
                </defs>

                { }
                <g strokeLinecap="round" strokeLinejoin="round">
                    {/* Outermost dark edge */}
                    <rect x="5" y="5" width="830" height="510" rx="30" className={fBrand} />
                    {/* Light frame */}
                    <rect x="12" y="12" width="816" height="496" rx="24" className={fBg} />
                    {/* Inner dark frame */}
                    <rect x="22" y="22" width="796" height="476" rx="18" className={fBrand} />

                    {/* Main Card Surface - Accent Grayscale */}
                    <rect x="28" y="28" width="784" height="464" rx="14" className={fAccent} />

                    {/* Double geometric border lines inside the accent background */}
                    <rect x="40" y="40" width="760" height="440" rx="10" className={sThick} />
                    <rect x="48" y="48" width="744" height="424" rx="6" className={sThin} />

                    {/* Scalloped inner edge detailing (top and bottom) */}
                    <path className={sMed} d="M 50,56 Q 60,48 70,56 T 90,56 T 110,56 T 130,56 T 150,56 T 170,56 T 190,56 T 210,56 T 230,56 T 250,56 T 270,56 T 290,56 T 310,56 T 330,56 T 350,56" />
                    <path className={sMed} d="M 790,56 Q 780,48 770,56 T 750,56 T 730,56 T 710,56 T 690,56 T 670,56 T 650,56 T 630,56 T 610,56 T 590,56 T 570,56 T 550,56 T 530,56 T 510,56 T 490,56" />

                    <path className={sMed} d="M 50,464 Q 60,472 70,464 T 90,464 T 110,464 T 130,464 T 150,464 T 170,464 T 190,464 T 210,464 T 230,464 T 250,464 T 270,464 T 290,464 T 310,464 T 330,464 T 350,464" />
                    <path className={sMed} d="M 790,464 Q 780,472 770,464 T 750,464 T 730,464 T 710,464 T 690,464 T 670,464 T 650,464 T 630,464 T 610,464 T 590,464 T 570,464 T 550,464 T 530,464 T 510,464 T 490,464" />

                    { }
                    {/* Corner Flourishes using the predefined complex wave */}
                    <use href="#corner-wave" x="50" y="50" />
                    {/* Top Right (Mirrored horizontally) */}
                    <use href="#corner-wave" x="-790" y="50" transform="scale(-1, 1)" />
                    {/* Bottom Left (Mirrored vertically) */}
                    <use href="#corner-wave" x="50" y="-470" transform="scale(1, -1)" />
                    {/* Bottom Right (Mirrored both) */}
                    <use href="#corner-wave" x="-790" y="-470" transform="scale(-1, -1)" />

                    {/* Intermediate Side Flourishes */}
                    <use href="#side-flourish" x="50" y="260" />
                    <use href="#side-flourish" x="-790" y="260" transform="scale(-1, 1)" />

                    { }
                    {/* Large internal sweeping waves matching the original bank-note style */}
                    <g id="large-waves">
                        {/* Left large wave */}
                        <path className={`${fHighlight} ${sMed}`} d="M 50,150 C 150,150 120,250 250,230 C 200,280 150,220 50,280 C 100,250 150,280 150,200 C 100,220 70,180 50,150 Z" />
                        <path className={`${fBg} ${sMed}`} d="M 120,190 C 180,180 170,240 230,230 C 190,260 160,220 100,260 C 150,240 130,220 120,190 Z" />

                        {/* Additional left side ornamental loops */}
                        <path className={`${fMuted} ${sMed}`} d="M 230,300 C 150,280 200,380 100,350 C 150,330 150,370 200,340 Z" />
                        <path className={`${fBg} ${sMed}`} d="M 270,120 C 220,100 250,160 180,150 C 210,140 230,170 240,140 Z" />

                        {/* Right large wave (Symmetrical approx) */}
                        <path className={`${fHighlight} ${sMed}`} d="M 790,150 C 690,150 720,250 590,230 C 640,280 690,220 790,280 C 740,250 690,280 690,200 C 740,220 770,180 790,150 Z" />
                        <path className={`${fBg} ${sMed}`} d="M 720,190 C 660,180 670,240 610,230 C 650,260 680,220 740,260 C 690,240 710,220 720,190 Z" />

                        {/* Additional right side ornamental loops */}
                        <path className={`${fMuted} ${sMed}`} d="M 610,300 C 690,280 640,380 740,350 C 690,330 690,370 640,340 Z" />
                        <path className={`${fBg} ${sMed}`} d="M 570,120 C 620,100 590,160 660,150 C 630,140 610,170 600,140 Z" />
                    </g>

                    { }
                    {/* Center Medallion Area */}
                    <g id="medallion">
                        {/* Outer rings */}
                        <circle cx="420" cy="260" r="145" className={`${fAccent} ${sThick}`} />
                        <circle cx="420" cy="260" r="135" className={`${fBg} ${sThick}`} />

                        {/* Scalloped rim illusion (using dashes) */}
                        <circle cx="420" cy="260" r="125" className={sThick} strokeDasharray="6 8" />

                        <circle cx="420" cy="260" r="115" className={`${fHighlight} ${sThick}`} />
                        <circle cx="420" cy="260" r="105" className={`${fBg} ${sThick}`} />

                        {/* Medallion background radial lines */}
                        <g className={sThin} strokeWidth="2" opacity={0.6}>
                            <circle cx="420" cy="260" r="100" fill="none" strokeDasharray="2 12" strokeWidth="20" />
                        </g>

                        {/* The Centurion Profile */}
                        {/* Bust/Shoulders */}
                        <path className={`${fAccent} ${sMed}`} d="M 330,345 C 360,300 450,280 500,345 Z" />
                        <path className={`${fBg} ${sThin}`} d="M 350,345 C 380,310 440,300 480,345 Z" />

                        {/* Face & Neck Base (Eggshell background) */}
                        <path className={`${fBg} ${sMed}`} d="M 400,210 L 410,210 L 415,225 L 430,225 L 440,240 L 440,250 L 435,260 L 445,265 L 440,280 L 420,290 L 410,320 L 380,320 L 390,260 Z" />

                        {/* Helmet structure (Highlight & Accent colors) */}
                        <path className={`${fHighlight} ${sMed}`} d="M 370,190 C 400,150 470,160 480,210 C 460,200 420,180 390,190 Z" />
                        <path className={`${fAccent} ${sMed}`} d="M 380,185 C 410,165 445,180 445,210 L 400,210 Z" />
                        <path className={`${fHighlight} ${sMed}`} d="M 390,210 L 400,210 L 405,250 L 395,260 C 370,240 380,220 390,210 Z" />
                        <path className={`${fBrand} ${sThin}`} d="M 400,210 L 445,210" strokeWidth="4" />

                        {/* Face features (Dark brand color lines) */}
                        <path className={sMed} d="M 425,230 L 432,230" />
                        <path className={sThin} d="M 440,240 L 433,240" />
                        <path className={sThin} d="M 437,263 L 427,263" />

                        {/* Inner trim of the bust */}
                        <path className={sMed} d="M 410,320 C 420,300 450,290 470,330" />
                        <path className={sMed} d="M 380,320 C 370,280 360,280 350,345" />
                    </g>

                    {/* Center Bottom Shell Motif */}
                    <g id="bottom-shell" transform="translate(420, 440)">
                        <path className={`${fBg} ${sMed}`} d="M -40,-20 C -20,-50 20,-50 40,-20 C 50,0 20,20 0,20 C -20,20 -50,0 -40,-20 Z" />
                        <path className={`${fAccent} ${sMed}`} d="M 0,20 C 10,-10 20,-30 40,-20 C 15,-15 5,0 0,20 Z" />
                        <path className={`${fAccent} ${sMed}`} d="M 0,20 C -10,-10 -20,-30 -40,-20 C -15,-15 -5,0 0,20 Z" />
                        <path className={`${fAccent} ${sMed}`} d="M 0,20 C 5,-5 5,-25 0,-35 C -5,-25 -5,-5 0,20 Z" />
                        <circle cx="-50" cy="0" r="4" className={fBrand} />
                        <circle cx="50" cy="0" r="4" className={fBrand} />
                    </g>

                    {/* TITLE: AMALGAMIC EXPRESS */}
                    {/* Drop shadow effect */}
                    <text x="420" y="112" textAnchor="middle" className="font-sans text-[26px] font-black tracking-[12px] fill-[#111111]" style={{ transform: 'translateY(2px)' }}>AMALGAMIC EXPRESS</text>
                    <text x="420" y="110" textAnchor="middle" className="font-sans text-[26px] font-black tracking-[12px] fill-[#FFFFFF]">ZINC SAPHIRE</text>

                    {/* CARD NUMBER */}
                    {/* Using highlight color, stroke applied for contrast */}
                    <text x="120" y="280" className="font-mono text-[42px] font-extrabold tracking-[8px] fill-[#111111] stroke-[#111111] stroke-[6px]">3759 876543 21001</text>
                    <text x="120" y="280" className="font-mono text-[42px] font-extrabold tracking-[8px] fill-[#9E9E9E] stroke-[#111111] stroke-[2px]">3759 876543 21001</text>

                    {/* CARDHOLDER NAME */}
                    <text x="120" y="390" className="font-sans text-[20px] tracking-[4px] fill-[#111111]" style={{ transform: 'translate(1px, 1px)' }}>C F FROST</text>
                    <text x="120" y="390" className="font-sans text-[20px] tracking-[4px] fill-[#FFFFFF]">C F FROST</text>

                    {/* MEMBER SINCE */}
                    <text x="590" y="360" className="font-sans text-[10px] font-bold tracking-[1px] fill-[#FFFFFF]">MEMBER SINCE</text>
                    <text x="615" y="392" className="font-sans text-[32px] font-black tracking-[2px] fill-[#FFFFFF]">98</text>

                    {/* Tiny background oval for '95' */}
                    <path className={`${fHighlight} ${sMed}`} d="M 605,370 C 605,360 655,360 655,370 C 655,400 605,400 605,370 Z" style={{ zIndex: -1, opacity: 0.2 }} />

                    {/* Tiny details (AMEX logo box equivalent) */}
                    <g transform="translate(680, 420)">
                        <rect x="0" y="0" width="55" height="14" rx="3" className={`${fBg} ${sThin}`} />
                        <text x="5" y="10" className="font-sans text-[7px] font-bold fill-[#111111]">© AMALGAMIC</text>
                        <circle cx="-10" cy="7" r="3" className={fBrand} />
                    </g>

                    {/* Additional ornamental dots filling empty space */}
                    <circle cx="80" cy="420" r="5" className={`${fBg} ${sThin}`} />
                    <circle cx="760" cy="100" r="5" className={`${fBg} ${sThin}`} />
                    <circle cx="300" cy="95" r="3" className={fHighlight} />
                    <circle cx="540" cy="95" r="3" className={fHighlight} />
                    <circle cx="280" cy="410" r="4" className={fHighlight} />
                    <circle cx="560" cy="410" r="4" className={fHighlight} />

                </g>
            </svg>
        </div>
    );
}