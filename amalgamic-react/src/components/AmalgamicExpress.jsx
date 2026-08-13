export default function AmalgamicExpressCard() {
    return (
        <div className="w-full max-w-[500px] drop-shadow-[0_25px_35px_rgba(23,22,19,0.25)]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 840 520"
                className="block h-auto w-full"
            >
                <defs>
                    {/* Corner ornament */}
                    <g id="corner-wave">
                        <path
                            className="fill-[#8DC4AC] stroke-[#171613] stroke-2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M 0,0 C 40,0 60,30 80,60 C 100,90 130,100 160,100 C 140,70 150,30 180,0 C 120,20 80,-10 40,-30 C 20,-10 10,-5 0,0 Z"
                        />

                        <path
                            className="fill-[#F5F2EA] stroke-[#171613] stroke-2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M 20,10 C 50,20 60,40 70,70 C 90,80 110,80 130,90 C 110,60 120,30 140,10 C 90,20 60,0 20,10 Z"
                        />

                        <path
                            className="fill-[#2C4035] stroke-[#171613] stroke-2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M 80,60 C 50,70 30,90 20,120 C 50,110 70,100 80,80 Z"
                        />

                        <path
                            className="fill-[#6B6658] stroke-[#171613] stroke-2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M 160,100 C 150,130 130,150 100,160 C 120,150 140,140 150,120 Z"
                        />

                        <circle cx="90" cy="40" r="4" className="fill-[#171613]" />
                        <circle cx="130" cy="60" r="4" className="fill-[#171613]" />
                    </g>

                    {/* Side flourish */}
                    <g id="side-flourish">
                        <path
                            className="fill-[#F5F2EA] stroke-[#171613] stroke-2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M 0,0 C 30,-20 60,-10 80,10 C 60,30 30,20 0,0 Z"
                        />

                        <path
                            className="fill-[#8DC4AC] stroke-[#171613] stroke-2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M 10,5 C 30,-10 50,-5 70,10 C 50,20 30,15 10,5 Z"
                        />
                    </g>
                </defs>

                {/* =========================================
              CARD FRAME
          ========================================= */}

                <rect
                    x="5"
                    y="5"
                    width="830"
                    height="510"
                    rx="30"
                    className="fill-[#171613]"
                />

                <rect
                    x="12"
                    y="12"
                    width="816"
                    height="496"
                    rx="24"
                    className="fill-[#F5F2EA]"
                />

                <rect
                    x="22"
                    y="22"
                    width="796"
                    height="476"
                    rx="18"
                    className="fill-[#171613]"
                />

                {/* Main forest-green surface */}
                <rect
                    x="28"
                    y="28"
                    width="784"
                    height="464"
                    rx="14"
                    className="fill-[#2C4035]"
                />

                {/* Geometric borders */}
                <rect
                    x="40"
                    y="40"
                    width="760"
                    height="440"
                    rx="10"
                    fill="none"
                    className="stroke-[#171613] stroke-[4]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <rect
                    x="48"
                    y="48"
                    width="744"
                    height="424"
                    rx="6"
                    fill="none"
                    className="stroke-[#171613] stroke-[1.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* =========================================
              SCALLOPED EDGES
          ========================================= */}

                <path
                    d="M 50,56 Q 60,48 70,56 T 90,56 T 110,56 T 130,56 T 150,56 T 170,56 T 190,56 T 210,56 T 230,56 T 250,56 T 270,56 T 290,56 T 310,56 T 330,56 T 350,56"
                    fill="none"
                    className="stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 790,56 Q 780,48 770,56 T 750,56 T 730,56 T 710,56 T 690,56 T 670,56 T 650,56 T 630,56 T 610,56 T 590,56 T 570,56 T 550,56 T 530,56 T 510,56 T 490,56"
                    fill="none"
                    className="stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 50,464 Q 60,472 70,464 T 90,464 T 110,464 T 130,464 T 150,464 T 170,464 T 190,464 T 210,464 T 230,464 T 250,464 T 270,464 T 290,464 T 310,464 T 330,464 T 350,464"
                    fill="none"
                    className="stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 790,464 Q 780,472 770,464 T 750,464 T 730,464 T 710,464 T 690,464 T 670,464 T 650,464 T 630,464 T 610,464 T 590,464 T 570,464 T 550,464 T 530,464 T 510,464 T 490,464"
                    fill="none"
                    className="stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* =========================================
              CORNER ORNAMENTS
          ========================================= */}

                <use href="#corner-wave" x="50" y="50" />

                <use
                    href="#corner-wave"
                    x="-790"
                    y="50"
                    transform="scale(-1, 1)"
                />

                <use
                    href="#corner-wave"
                    x="50"
                    y="-470"
                    transform="scale(1, -1)"
                />

                <use
                    href="#corner-wave"
                    x="-790"
                    y="-470"
                    transform="scale(-1, -1)"
                />

                {/* Side flourishes */}
                <use href="#side-flourish" x="50" y="260" />

                <use
                    href="#side-flourish"
                    x="-790"
                    y="260"
                    transform="scale(-1, 1)"
                />

                {/* =========================================
              LARGE INTERNAL WAVES
          ========================================= */}

                <path
                    d="M 50,150 C 150,150 120,250 250,230 C 200,280 150,220 50,280 C 100,250 150,280 150,200 C 100,220 70,180 50,150 Z"
                    className="fill-[#8DC4AC] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 120,190 C 180,180 170,240 230,230 C 190,260 160,220 100,260 C 150,240 130,220 120,190 Z"
                    className="fill-[#F5F2EA] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 230,300 C 150,280 200,380 100,350 C 150,330 150,370 200,340 Z"
                    className="fill-[#6B6658] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 270,120 C 220,100 250,160 180,150 C 210,140 230,170 240,140 Z"
                    className="fill-[#F5F2EA] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Right */}
                <path
                    d="M 790,150 C 690,150 720,250 590,230 C 640,280 690,220 790,280 C 740,250 690,280 690,200 C 740,220 770,180 790,150 Z"
                    className="fill-[#8DC4AC] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 720,190 C 660,180 670,240 610,230 C 650,260 680,220 740,260 C 690,240 710,220 720,190 Z"
                    className="fill-[#F5F2EA] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 610,300 C 690,280 640,380 740,350 C 690,330 690,370 640,340 Z"
                    className="fill-[#6B6658] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 570,120 C 620,100 590,160 660,150 C 630,140 610,170 600,140 Z"
                    className="fill-[#F5F2EA] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* =========================================
              CENTER MEDALLION
          ========================================= */}

                <circle
                    cx="420"
                    cy="260"
                    r="145"
                    className="fill-[#2C4035] stroke-[#171613] stroke-[4]"
                />

                <circle
                    cx="420"
                    cy="260"
                    r="135"
                    className="fill-[#F5F2EA] stroke-[#171613] stroke-[4]"
                />

                <circle
                    cx="420"
                    cy="260"
                    r="125"
                    fill="none"
                    className="stroke-[#171613] stroke-[4]"
                    strokeDasharray="6 8"
                />

                <circle
                    cx="420"
                    cy="260"
                    r="115"
                    className="fill-[#8DC4AC] stroke-[#171613] stroke-[4]"
                />

                <circle
                    cx="420"
                    cy="260"
                    r="105"
                    className="fill-[#F5F2EA] stroke-[#171613] stroke-[4]"
                />

                {/* Radial medallion pattern */}
                <circle
                    cx="420"
                    cy="260"
                    r="100"
                    fill="none"
                    className="stroke-[#171613]"
                    strokeDasharray="2 12"
                    strokeWidth="20"
                    opacity="0.6"
                />

                {/* =========================================
              CENTURION
          ========================================= */}

                {/* Bust */}
                <path
                    d="M 330,345 C 360,300 450,280 500,345 Z"
                    className="fill-[#2C4035] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 350,345 C 380,310 440,300 480,345 Z"
                    className="fill-[#F5F2EA] stroke-[#171613]"
                    strokeWidth="1.5"
                />

                {/* Face */}
                <path
                    d="M 400,210 L 410,210 L 415,225 L 430,225 L 440,240 L 440,250 L 435,260 L 445,265 L 440,280 L 420,290 L 410,320 L 380,320 L 390,260 Z"
                    className="fill-[#F5F2EA] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Helmet crest */}
                <path
                    d="M 370,190 C 400,150 470,160 480,210 C 460,200 420,180 390,190 Z"
                    className="fill-[#8DC4AC] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Helmet cap */}
                <path
                    d="M 380,185 C 410,165 445,180 445,210 L 400,210 Z"
                    className="fill-[#2C4035] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Ear guard */}
                <path
                    d="M 390,210 L 400,210 L 405,250 L 395,260 C 370,240 380,220 390,210 Z"
                    className="fill-[#8DC4AC] stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Visor */}
                <path
                    d="M 400,210 L 445,210"
                    fill="none"
                    className="stroke-[#171613]"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Face details */}
                <path
                    d="M 425,230 L 432,230"
                    fill="none"
                    className="stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 440,240 L 433,240"
                    fill="none"
                    className="stroke-[#171613]"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 437,263 L 427,263"
                    fill="none"
                    className="stroke-[#171613]"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Bust trim */}
                <path
                    d="M 410,320 C 420,300 450,290 470,330"
                    fill="none"
                    className="stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M 380,320 C 370,280 360,280 350,345"
                    fill="none"
                    className="stroke-[#171613] stroke-[2.5]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* =========================================
              BOTTOM SHELL
          ========================================= */}

                <g transform="translate(420, 440)">
                    <path
                        d="M -40,-20 C -20,-50 20,-50 40,-20 C 50,0 20,20 0,20 C -20,20 -50,0 -40,-20 Z"
                        className="fill-[#F5F2EA] stroke-[#171613] stroke-[2.5]"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M 0,20 C 10,-10 20,-30 40,-20 C 15,-15 5,0 0,20 Z"
                        className="fill-[#2C4035] stroke-[#171613] stroke-[2.5]"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M 0,20 C -10,-10 -20,-30 -40,-20 C -15,-15 -5,0 0,20 Z"
                        className="fill-[#2C4035] stroke-[#171613] stroke-[2.5]"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M 0,20 C 5,-5 5,-25 0,-35 C -5,-25 -5,-5 0,20 Z"
                        className="fill-[#2C4035] stroke-[#171613] stroke-[2.5]"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <circle cx="-50" cy="0" r="4" className="fill-[#171613]" />
                    <circle cx="50" cy="0" r="4" className="fill-[#171613]" />
                </g>

                {/* =========================================
              CARD TEXT
          ========================================= */}

                {/* Title shadow */}
                <text
                    x="420"
                    y="112"
                    className="fill-[#171613] font-black text-[26px] tracking-[12px] [text-anchor:middle]"
                    style={{ transform: "translateY(2px)" }}
                >
                    AMALGAMIC EXPRESS
                </text>

                {/* Title */}
                <text
                    x="420"
                    y="110"
                    className="fill-white font-black text-[26px] tracking-[12px] [text-anchor:middle]"
                >
                    AMALGAMIC EXPRESS
                </text>

                {/* Card number shadow */}
                <text
                    x="120"
                    y="280"
                    className="fill-[#171613]  font-extrabold text-[42px] tracking-[8px]"
                    stroke="#171613"
                    strokeWidth="6"
                    strokeLinejoin="round"
                >
                    3759 876543 21001
                </text>

                {/* Card number */}
                <text
                    x="120"
                    y="280"
                    className="fill-[#8DC4AC] font-extrabold text-[42px] tracking-[8px]"
                    stroke="#171613"
                    strokeWidth="2"
                    strokeLinejoin="round"
                >
                    3759 876543 21001
                </text>

                {/* Cardholder shadow */}
                <text
                    x="120"
                    y="390"
                    className="fill-[#171613] text-[20px] tracking-[4px]"
                    style={{ transform: "translate(1px, 1px)" }}
                >
                    C F FROST
                </text>

                {/* Cardholder */}
                <text
                    x="120"
                    y="390"
                    className="fill-white text-[20px] tracking-[4px]"
                >
                    C F FROST
                </text>

                {/* Member since */}
                <text
                    x="590"
                    y="360"
                    className="fill-white font-bold text-[10px] tracking-[1px]"
                >
                    MEMBER SINCE
                </text>

                {/* 95 background */}
                <path
                    d="M 605,370 C 605,360 655,360 655,370 C 655,400 605,400 605,370 Z"
                    fill="#8DC4AC"
                    stroke="#171613"
                    strokeWidth="2.5"
                    opacity="0.2"
                />

                <text
                    x="615"
                    y="392"
                    className="fill-white font-black text-[32px] tracking-[2px]"
                >
                    95
                </text>

                {/* Logo */}
                <g transform="translate(680, 420)">
                    <rect
                        x="0"
                        y="0"
                        width="55"
                        height="14"
                        rx="3"
                        className="fill-[#F5F2EA] stroke-[#171613]"
                        strokeWidth="1.5"
                    />

                    <text
                        x="5"
                        y="10"
                        className="fill-[#171613] font-bold text-[7px]"
                    >
                        © AMALGAMIC
                    </text>

                    <circle cx="-10" cy="7" r="3" className="fill-[#171613]" />
                </g>

                {/* =========================================
              DECORATIVE DOTS
          ========================================= */}

                <circle
                    cx="80"
                    cy="420"
                    r="5"
                    className="fill-[#F5F2EA] stroke-[#171613]"
                    strokeWidth="1.5"
                />

                <circle
                    cx="760"
                    cy="100"
                    r="5"
                    className="fill-[#F5F2EA] stroke-[#171613]"
                    strokeWidth="1.5"
                />

                <circle
                    cx="300"
                    cy="95"
                    r="3"
                    className="fill-[#8DC4AC]"
                />

                <circle
                    cx="540"
                    cy="95"
                    r="3"
                    className="fill-[#8DC4AC]"
                />

                <circle
                    cx="280"
                    cy="410"
                    r="4"
                    className="fill-[#8DC4AC]"
                />

                <circle
                    cx="560"
                    cy="410"
                    r="4"
                    className="fill-[#8DC4AC]"
                />
            </svg>
        </div>

    );
}