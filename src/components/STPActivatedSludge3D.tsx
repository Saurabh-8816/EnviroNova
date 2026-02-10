import React from 'react';
import './STPActivatedSludge3D.css';

const STPActivatedSludge3D: React.FC = () => {
    return (
        <div className="stp-asp-container">
            <svg
                viewBox="0 20 1050 580"
                className="stp-asp-svg"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {/* ======= GRADIENTS ======= */}

                    {/* Concrete tank gradients */}
                    <linearGradient id="aspConcreteTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d1d5db" />
                        <stop offset="100%" stopColor="#9ca3af" />
                    </linearGradient>
                    <linearGradient id="aspConcreteFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#9ca3af" />
                        <stop offset="100%" stopColor="#6b7280" />
                    </linearGradient>
                    <linearGradient id="aspConcreteSide" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c8290" />
                        <stop offset="100%" stopColor="#4b5563" />
                    </linearGradient>

                    {/* Blue-gray metal (Screening) */}
                    <linearGradient id="aspMetalTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <linearGradient id="aspMetalFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="aspMetalSide" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#5a687a" />
                        <stop offset="100%" stopColor="#334155" />
                    </linearGradient>

                    {/* Aeration water (blue-green) */}
                    <linearGradient id="aspAerationWater" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>

                    {/* Primary clarifier water */}
                    <linearGradient id="aspPrimaryWater" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#7A9E7E" />
                        <stop offset="100%" stopColor="#5A7E5E" />
                    </linearGradient>

                    {/* Secondary clarifier water */}
                    <linearGradient id="aspSecondaryWater" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>

                    {/* Sludge thickener green water */}
                    <linearGradient id="aspThickenerWater" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#86efac" />
                        <stop offset="50%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>

                    {/* Sludge brown */}
                    <linearGradient id="aspSludge" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#92400e" />
                        <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>

                    {/* Dark structure (sludge holding) */}
                    <linearGradient id="aspDarkTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#52525b" />
                        <stop offset="100%" stopColor="#3f3f46" />
                    </linearGradient>
                    <linearGradient id="aspDarkFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3f3f46" />
                        <stop offset="100%" stopColor="#27272a" />
                    </linearGradient>
                    <linearGradient id="aspDarkSide" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3a3a40" />
                        <stop offset="100%" stopColor="#18181b" />
                    </linearGradient>

                    {/* Earth tones (drying bed) */}
                    <linearGradient id="aspEarthTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4a76a" />
                        <stop offset="100%" stopColor="#b8944a" />
                    </linearGradient>
                    <linearGradient id="aspEarthFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a3803e" />
                        <stop offset="100%" stopColor="#7c5e2e" />
                    </linearGradient>
                    <linearGradient id="aspEarthSide" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8d6d30" />
                        <stop offset="100%" stopColor="#6b5020" />
                    </linearGradient>

                    {/* Disinfection (dark-purple) */}
                    <linearGradient id="aspDisinfTop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="aspDisinfFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#5b21b6" />
                        <stop offset="100%" stopColor="#4c1d95" />
                    </linearGradient>
                    <linearGradient id="aspDisinfSide" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#5420a0" />
                        <stop offset="100%" stopColor="#3b0f80" />
                    </linearGradient>

                    {/* Clean/outlet water */}
                    <linearGradient id="aspCleanWater" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="50%" stopColor="#0099CC" />
                        <stop offset="100%" stopColor="#006699" />
                    </linearGradient>

                    {/* Pipe */}
                    <linearGradient id="aspPipe" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a1a1aa" />
                        <stop offset="50%" stopColor="#71717a" />
                        <stop offset="100%" stopColor="#52525b" />
                    </linearGradient>

                    {/* Platform */}
                    <linearGradient id="aspPlatform" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#334155" />
                    </linearGradient>

                    {/* Nallah water */}
                    <linearGradient id="aspNallahWater" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>

                    {/* ======= FILTERS ======= */}
                    <filter id="aspShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.3" />
                    </filter>
                    <filter id="aspGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* ======= BACKGROUND PLATFORM ======= */}
                <g className="stp-platform">
                    <polygon
                        points="50,400 525,180 1000,400 525,560"
                        fill="url(#aspPlatform)"
                        opacity="0.25"
                    />
                    <polygon
                        points="50,400 50,420 525,580 525,560"
                        fill="#1e293b"
                        opacity="0.35"
                    />
                    <polygon
                        points="525,560 525,580 1000,420 1000,400"
                        fill="#0f172a"
                        opacity="0.35"
                    />
                </g>

                {/* ======================================================
            1) SCREENING & GRIT CHAMBER  (top-left)
            ====================================================== */}
                <g className="stp-unit stp-screening" filter="url(#aspShadow)">
                    {/* Elevated box with legs */}
                    {/* Legs */}
                    <line x1="95" y1="265" x2="95" y2="300" stroke="#475569" strokeWidth="4" />
                    <line x1="175" y1="265" x2="175" y2="300" stroke="#475569" strokeWidth="4" />
                    <line x1="135" y1="285" x2="135" y2="320" stroke="#475569" strokeWidth="4" />
                    <line x1="215" y1="285" x2="215" y2="320" stroke="#475569" strokeWidth="4" />

                    {/* Top face */}
                    <polygon points="80,210 155,180 230,210 155,240" fill="url(#aspMetalTop)" />
                    {/* Front face */}
                    <polygon points="80,210 80,265 155,295 155,240" fill="url(#aspMetalFront)" />
                    {/* Side face */}
                    <polygon points="155,240 155,295 230,265 230,210" fill="url(#aspMetalSide)" />

                    {/* Conveyor grating lines */}
                    <line x1="100" y1="218" x2="100" y2="270" stroke="#334155" strokeWidth="1.5" opacity="0.6" />
                    <line x1="120" y1="212" x2="120" y2="275" stroke="#334155" strokeWidth="1.5" opacity="0.6" />
                    <line x1="140" y1="218" x2="140" y2="285" stroke="#334155" strokeWidth="1.5" opacity="0.6" />
                    <line x1="160" y1="225" x2="160" y2="280" stroke="#334155" strokeWidth="1.5" opacity="0.6" />
                    <line x1="180" y1="218" x2="180" y2="272" stroke="#334155" strokeWidth="1.5" opacity="0.6" />
                    <line x1="200" y1="212" x2="200" y2="265" stroke="#334155" strokeWidth="1.5" opacity="0.6" />

                    {/* Water inside */}
                    <polygon
                        points="95,230 145,210 195,230 145,250"
                        fill="url(#aspPrimaryWater)"
                        opacity="0.6"
                        className="stp-water-level"
                    />

                    <text x="155" y="340" textAnchor="middle" className="stp-label-text">Screening &amp;</text>
                    <text x="155" y="354" textAnchor="middle" className="stp-label-text">Grit Chamber</text>
                </g>

                {/* Pipe: Screening → Primary Clarifier */}
                <g className="stp-flow">
                    <path
                        d="M230,240 Q270,240 310,230"
                        stroke="url(#aspPipe)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="stp-pipe-segment"
                    />
                    <circle r="3" fill="#7A9E7E" className="stp-water-particle">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M230,240 Q270,240 310,230" />
                    </circle>
                    <circle r="2.5" fill="#5A7E5E" className="stp-water-particle">
                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.8s" path="M230,240 Q270,240 310,230" />
                    </circle>
                    <circle r="3" fill="#7A9E7E" className="stp-water-particle">
                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.6s" path="M230,240 Q270,240 310,230" />
                    </circle>
                </g>

                {/* ======================================================
            2) PRIMARY CLARIFIER  (two cylinders, center-top area)
            ====================================================== */}
                <g className="stp-unit stp-primary-clarifier" filter="url(#aspShadow)">
                    {/* Tank 1 */}
                    <ellipse cx="340" cy="195" rx="40" ry="20" fill="url(#aspConcreteTop)" />
                    <path d="M300,195 L300,270 Q300,290 340,290 Q380,290 380,270 L380,195"
                        fill="url(#aspConcreteFront)" />
                    {/* Water surface */}
                    <ellipse cx="340" cy="210" rx="34" ry="17"
                        fill="url(#aspPrimaryWater)" opacity="0.75" className="stp-water-level">
                        <animate attributeName="ry" values="17;18;17" dur="4s" repeatCount="indefinite" />
                    </ellipse>
                    {/* Center mechanism */}
                    <line x1="340" y1="185" x2="340" y2="260" stroke="#52525b" strokeWidth="3" />
                    <circle cx="340" cy="185" r="5" fill="#71717a" />
                    {/* Rotating scraper arm */}
                    <g className="stp-rotating-arm-primary">
                        <line x1="340" y1="230" x2="370" y2="240" stroke="#52525b" strokeWidth="2.5" />
                    </g>

                    {/* Tank 2 (slightly offset) */}
                    <ellipse cx="400" cy="215" rx="35" ry="17" fill="url(#aspConcreteTop)" />
                    <path d="M365,215 L365,280 Q365,298 400,298 Q435,298 435,280 L435,215"
                        fill="url(#aspConcreteSide)" />
                    <ellipse cx="400" cy="228" rx="30" ry="14"
                        fill="url(#aspPrimaryWater)" opacity="0.7" className="stp-water-level">
                        <animate attributeName="ry" values="14;15;14" dur="4.5s" repeatCount="indefinite" />
                    </ellipse>
                    <line x1="400" y1="206" x2="400" y2="270" stroke="#52525b" strokeWidth="2.5" />
                    <circle cx="400" cy="206" r="4" fill="#71717a" />

                    <text x="370" y="318" textAnchor="middle" className="stp-label-text">Primary Clarifier</text>
                </g>

                {/* Pumping System P1 (after primary) */}
                <circle cx="280" cy="265" r="10" fill="#dc2626" />
                <text x="280" y="269" textAnchor="middle" className="stp-pump-text">P</text>

                {/* Pipe: Primary Clarifier → Aeration Tank */}
                <g className="stp-flow">
                    <path
                        d="M435,260 Q470,270 490,280"
                        stroke="url(#aspPipe)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="stp-pipe-segment"
                    />
                    <circle r="3" fill="#22d3ee" className="stp-water-particle">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M435,260 Q470,270 490,280" />
                    </circle>
                    <circle r="2.5" fill="#0ea5e9" className="stp-water-particle">
                        <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s" path="M435,260 Q470,270 490,280" />
                    </circle>
                    <circle r="3" fill="#22d3ee" className="stp-water-particle">
                        <animateMotion dur="2s" repeatCount="indefinite" begin="1.3s" path="M435,260 Q470,270 490,280" />
                    </circle>
                </g>

                {/* ======================================================
            3) AERATION TANK  (large rectangular elevated basin)
            ====================================================== */}
                <g className="stp-unit stp-aeration-tank" filter="url(#aspShadow)">
                    {/* Support pillars */}
                    <line x1="510" y1="340" x2="510" y2="385" stroke="#475569" strokeWidth="5" />
                    <line x1="570" y1="340" x2="570" y2="385" stroke="#475569" strokeWidth="5" />
                    <line x1="630" y1="340" x2="630" y2="385" stroke="#475569" strokeWidth="5" />
                    <line x1="550" y1="355" x2="550" y2="400" stroke="#475569" strokeWidth="5" />
                    <line x1="610" y1="355" x2="610" y2="400" stroke="#475569" strokeWidth="5" />
                    <line x1="660" y1="340" x2="660" y2="380" stroke="#475569" strokeWidth="5" />

                    {/* Top face */}
                    <polygon points="490,260 580,225 670,260 580,295" fill="url(#aspConcreteTop)" />
                    {/* Front face */}
                    <polygon points="490,260 490,340 580,375 580,295" fill="url(#aspConcreteFront)" />
                    {/* Side face */}
                    <polygon points="580,295 580,375 670,340 670,260" fill="url(#aspConcreteSide)" />

                    {/* Water surface (blue-green) */}
                    <polygon
                        points="500,268 572,238 660,268 572,298"
                        fill="url(#aspAerationWater)"
                        opacity="0.8"
                        className="stp-water-level"
                    />

                    {/* Surface Aerators (brown circles) */}
                    <g className="stp-aerator stp-aerator-1">
                        <circle cx="520" cy="270" r="7" fill="#92400e" opacity="0.85" />
                        <circle cx="520" cy="270" r="3" fill="#78350f" />
                    </g>
                    <g className="stp-aerator stp-aerator-2">
                        <circle cx="555" cy="280" r="7" fill="#92400e" opacity="0.85" />
                        <circle cx="555" cy="280" r="3" fill="#78350f" />
                    </g>
                    <g className="stp-aerator stp-aerator-3">
                        <circle cx="595" cy="270" r="7" fill="#92400e" opacity="0.85" />
                        <circle cx="595" cy="270" r="3" fill="#78350f" />
                    </g>
                    <g className="stp-aerator stp-aerator-4">
                        <circle cx="635" cy="280" r="7" fill="#92400e" opacity="0.85" />
                        <circle cx="635" cy="280" r="3" fill="#78350f" />
                    </g>

                    {/* Aeration bubbles */}
                    <g className="stp-aeration-bubbles">
                        <circle cx="515" cy="310" r="2.5" fill="#60a5fa" opacity="0.6">
                            <animate attributeName="cy" values="330;270;330" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="540" cy="320" r="2" fill="#93c5fd" opacity="0.5">
                            <animate attributeName="cy" values="340;275;340" dur="2.3s" repeatCount="indefinite" begin="0.3s" />
                            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.3s" repeatCount="indefinite" begin="0.3s" />
                        </circle>
                        <circle cx="565" cy="315" r="2.5" fill="#60a5fa" opacity="0.6">
                            <animate attributeName="cy" values="335;272;335" dur="2.1s" repeatCount="indefinite" begin="0.6s" />
                            <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.1s" repeatCount="indefinite" begin="0.6s" />
                        </circle>
                        <circle cx="590" cy="310" r="2" fill="#93c5fd" opacity="0.5">
                            <animate attributeName="cy" values="330;268;330" dur="1.9s" repeatCount="indefinite" begin="0.4s" />
                            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.9s" repeatCount="indefinite" begin="0.4s" />
                        </circle>
                        <circle cx="615" cy="318" r="2.5" fill="#60a5fa" opacity="0.6">
                            <animate attributeName="cy" values="338;275;338" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
                            <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
                        </circle>
                        <circle cx="640" cy="312" r="2" fill="#93c5fd" opacity="0.5">
                            <animate attributeName="cy" values="332;270;332" dur="2.2s" repeatCount="indefinite" begin="1s" />
                            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.2s" repeatCount="indefinite" begin="1s" />
                        </circle>
                    </g>

                    <text x="580" y="420" textAnchor="middle" className="stp-label-text">Aeration Tank</text>
                </g>

                {/* Pipe: Aeration Tank → Secondary Clarifier */}
                <g className="stp-flow">
                    <path
                        d="M670,310 Q710,330 740,350"
                        stroke="url(#aspPipe)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="stp-pipe-segment"
                    />
                    <circle r="3" fill="#6ee7b7" className="stp-water-particle">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M670,310 Q710,330 740,350" />
                    </circle>
                    <circle r="2.5" fill="#34d399" className="stp-water-particle">
                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.8s" path="M670,310 Q710,330 740,350" />
                    </circle>
                    <circle r="3" fill="#6ee7b7" className="stp-water-particle">
                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.6s" path="M670,310 Q710,330 740,350" />
                    </circle>
                </g>

                {/* ======================================================
            4) SECONDARY CLARIFIER  (large circle, bottom-right)
            ====================================================== */}
                <g className="stp-unit stp-secondary-clarifier" filter="url(#aspShadow)">
                    {/* Cylinder body */}
                    <ellipse cx="790" cy="340" rx="55" ry="28" fill="url(#aspConcreteTop)" />
                    <path d="M735,340 L735,420 Q735,448 790,448 Q845,448 845,420 L845,340"
                        fill="url(#aspConcreteFront)" />
                    {/* Water surface */}
                    <ellipse cx="790" cy="358" rx="48" ry="22"
                        fill="url(#aspSecondaryWater)" opacity="0.8" className="stp-water-level">
                        <animate attributeName="ry" values="22;24;22" dur="5s" repeatCount="indefinite" />
                    </ellipse>
                    {/* Center mechanism */}
                    <line x1="790" y1="328" x2="790" y2="420" stroke="#52525b" strokeWidth="4" />
                    <circle cx="790" cy="328" r="6" fill="#71717a" />
                    {/* Rotating arm */}
                    <g className="stp-rotating-arm-secondary">
                        <line x1="790" y1="370" x2="830" y2="380" stroke="#52525b" strokeWidth="3" />
                        <line x1="790" y1="370" x2="750" y2="360" stroke="#52525b" strokeWidth="3" />
                    </g>

                    <text x="790" y="470" textAnchor="middle" className="stp-label-text">Secondary Clarifier</text>
                </g>

                {/* Pumping System P2 (return activated sludge) */}
                <circle cx="730" cy="420" r="10" fill="#dc2626" />
                <text x="730" y="424" textAnchor="middle" className="stp-pump-text">P</text>

                {/* Return Activated Sludge (RAS) pipe back to Aeration */}
                <g className="stp-flow">
                    <path
                        d="M730,430 Q700,460 650,440 Q600,420 580,375"
                        stroke="#a78bfa"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="8,4"
                        opacity="0.6"
                        className="stp-pipe-segment"
                    />
                    <circle r="2.5" fill="#a78bfa" className="stp-water-particle">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M730,430 Q700,460 650,440 Q600,420 580,375" />
                    </circle>
                    <circle r="2" fill="#c4b5fd" className="stp-water-particle">
                        <animateMotion dur="4s" repeatCount="indefinite" begin="1.3s" path="M730,430 Q700,460 650,440 Q600,420 580,375" />
                    </circle>
                    <text x="650" y="465" textAnchor="middle" className="stp-label-sub">Return Sludge</text>
                </g>

                {/* Sludge Flow Control Valve V */}
                <circle cx="700" cy="440" r="8" fill="#9333ea" />
                <text x="700" y="444" textAnchor="middle" className="stp-pump-text" style={{ fontSize: '7px' }}>V</text>

                {/* Pipe: Secondary Clarifier → Disinfection */}
                <g className="stp-flow">
                    <path
                        d="M845,380 Q880,370 910,320"
                        stroke="url(#aspPipe)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="stp-pipe-segment"
                    />
                    <circle r="3" fill="#00D4FF" filter="url(#aspGlow)" className="stp-water-particle">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M845,380 Q880,370 910,320" />
                    </circle>
                    <circle r="2.5" fill="#0099CC" className="stp-water-particle">
                        <animateMotion dur="2s" repeatCount="indefinite" begin="0.6s" path="M845,380 Q880,370 910,320" />
                    </circle>
                    <circle r="3" fill="#00D4FF" filter="url(#aspGlow)" className="stp-water-particle">
                        <animateMotion dur="2s" repeatCount="indefinite" begin="1.3s" path="M845,380 Q880,370 910,320" />
                    </circle>
                </g>

                {/* ======================================================
            5) SLUDGE THICKENER  (center-bottom cylinder)
            ====================================================== */}
                <g className="stp-unit stp-sludge-thickener" filter="url(#aspShadow)">
                    <ellipse cx="600" cy="440" rx="40" ry="20" fill="url(#aspConcreteTop)" />
                    <path d="M560,440 L560,500 Q560,520 600,520 Q640,520 640,500 L640,440"
                        fill="url(#aspConcreteFront)" />
                    {/* Green-tinted water */}
                    <ellipse cx="600" cy="455" rx="34" ry="16"
                        fill="url(#aspThickenerWater)" opacity="0.75" className="stp-water-level">
                        <animate attributeName="ry" values="16;17;16" dur="5s" repeatCount="indefinite" />
                    </ellipse>
                    {/* Center mechanism */}
                    <line x1="600" y1="432" x2="600" y2="500" stroke="#52525b" strokeWidth="3" />
                    <circle cx="600" cy="432" r="5" fill="#71717a" />
                    {/* Rotating scraper */}
                    <g className="stp-rotating-arm-thickener">
                        <line x1="600" y1="460" x2="630" y2="468" stroke="#52525b" strokeWidth="2" />
                    </g>

                    <text x="600" y="542" textAnchor="middle" className="stp-label-text">Sludge Thickener</text>
                </g>

                {/* Pipe: Secondary → Sludge Thickener (WAS/Overflow) */}
                <g className="stp-flow">
                    <path
                        d="M760,445 Q700,470 640,450"
                        stroke="#92400e"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.7"
                        className="stp-pipe-segment"
                    />
                    <circle r="2.5" fill="#92400e" className="stp-water-particle">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M760,445 Q700,470 640,450" />
                    </circle>
                    <circle r="2" fill="#78350f" className="stp-water-particle">
                        <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M760,445 Q700,470 640,450" />
                    </circle>
                </g>

                {/* ======================================================
            6) SLUDGE HOLDING TANK  (elevated rectangular on legs)
            ====================================================== */}
                <g className="stp-unit stp-sludge-holding" filter="url(#aspShadow)">
                    {/* Legs */}
                    <line x1="318" y1="425" x2="318" y2="470" stroke="#3f3f46" strokeWidth="4" />
                    <line x1="388" y1="425" x2="388" y2="470" stroke="#3f3f46" strokeWidth="4" />
                    <line x1="353" y1="440" x2="353" y2="485" stroke="#3f3f46" strokeWidth="4" />
                    <line x1="423" y1="440" x2="423" y2="485" stroke="#3f3f46" strokeWidth="4" />

                    {/* Top face */}
                    <polygon points="305,380 370,355 435,380 370,405" fill="url(#aspDarkTop)" />
                    {/* Front face */}
                    <polygon points="305,380 305,425 370,450 370,405" fill="url(#aspDarkFront)" />
                    {/* Side face */}
                    <polygon points="370,405 370,450 435,425 435,380" fill="url(#aspDarkSide)" />

                    {/* Sludge level (brown) */}
                    <polygon
                        points="315,390 365,368 415,390 365,412"
                        fill="url(#aspSludge)"
                        opacity="0.7"
                        className="stp-water-level"
                    />

                    <text x="370" y="502" textAnchor="middle" className="stp-label-text">Sludge Holding</text>
                    <text x="370" y="516" textAnchor="middle" className="stp-label-text">Tank</text>
                </g>

                {/* Pumping System P3 (sludge) */}
                <circle cx="465" cy="430" r="10" fill="#dc2626" />
                <text x="465" y="434" textAnchor="middle" className="stp-pump-text">P</text>

                {/* Pipe: Primary Clarifier → Sludge Holding (primary sludge) */}
                <g className="stp-flow">
                    <path
                        d="M340,290 Q340,330 350,360"
                        stroke="#92400e"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.6"
                        className="stp-pipe-segment"
                    />
                    <circle r="2" fill="#92400e" className="stp-water-particle">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M340,290 Q340,330 350,360" />
                    </circle>
                    <text x="310" y="340" className="stp-label-sub">Primary Sludge</text>
                </g>

                {/* Pipe: Sludge Thickener → Sludge Holding */}
                <g className="stp-flow">
                    <path
                        d="M560,470 Q480,460 435,420"
                        stroke="#92400e"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.6"
                        className="stp-pipe-segment"
                    />
                    <circle r="2.5" fill="#92400e" className="stp-water-particle">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M560,470 Q480,460 435,420" />
                    </circle>
                </g>

                {/* ======================================================
            7) PLANTED DRYING BED  (bottom-left, open area)
            ====================================================== */}
                <g className="stp-unit stp-drying-bed" filter="url(#aspShadow)">
                    {/* Top face */}
                    <polygon points="100,450 180,420 260,450 180,480" fill="url(#aspEarthTop)" />
                    {/* Front face */}
                    <polygon points="100,450 100,480 180,510 180,480" fill="url(#aspEarthFront)" />
                    {/* Side face */}
                    <polygon points="180,480 180,510 260,480 260,450" fill="url(#aspEarthSide)" />

                    {/* Vegetation dots */}
                    <circle cx="135" cy="445" r="3" fill="#22c55e" opacity="0.8" />
                    <circle cx="155" cy="438" r="2.5" fill="#16a34a" opacity="0.7" />
                    <circle cx="175" cy="445" r="3" fill="#22c55e" opacity="0.8" />
                    <circle cx="195" cy="440" r="2.5" fill="#16a34a" opacity="0.7" />
                    <circle cx="150" cy="455" r="2.5" fill="#4ade80" opacity="0.75" />
                    <circle cx="170" cy="460" r="3" fill="#22c55e" opacity="0.8" />
                    <circle cx="190" cy="455" r="2.5" fill="#16a34a" opacity="0.7" />
                    <circle cx="210" cy="448" r="2.5" fill="#4ade80" opacity="0.7" />
                    <circle cx="220" cy="456" r="3" fill="#22c55e" opacity="0.8" />
                    <circle cx="140" cy="462" r="2" fill="#4ade80" opacity="0.6" />

                    <text x="180" y="530" textAnchor="middle" className="stp-label-text">Planted Drying Bed</text>
                </g>

                {/* Pipe: Sludge Thickener → Drying Bed */}
                <g className="stp-flow">
                    <path
                        d="M560,485 Q400,510 260,470"
                        stroke="#92400e"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.5"
                        className="stp-pipe-segment"
                    />
                    <circle r="2" fill="#92400e" className="stp-water-particle">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M560,485 Q400,510 260,470" />
                    </circle>
                </g>

                {/* ======================================================
            8) DISINFECTION UNIT  (top-right, small dark unit)
            ====================================================== */}
                <g className="stp-unit stp-disinfection" filter="url(#aspShadow)">
                    {/* Top face */}
                    <polygon points="890,260 930,245 970,260 930,275" fill="url(#aspDisinfTop)" />
                    {/* Front face */}
                    <polygon points="890,260 890,310 930,325 930,275" fill="url(#aspDisinfFront)" />
                    {/* Side face */}
                    <polygon points="930,275 930,325 970,310 970,260" fill="url(#aspDisinfSide)" />

                    {/* UV/Chlorine glow inside */}
                    <polygon
                        points="900,268 925,256 950,268 925,280"
                        fill="#e9d5ff"
                        opacity="0.4"
                    >
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                    </polygon>

                    {/* Blue outlet pipe hint */}
                    <line x1="970" y1="285" x2="990" y2="285" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />

                    <text x="930" y="345" textAnchor="middle" className="stp-label-text">Disinfection</text>
                </g>

                {/* Pipe: Disinfection → Nallah */}
                <g className="stp-flow">
                    <path
                        d="M990,285 Q1005,285 1010,290"
                        stroke="url(#aspPipe)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        className="stp-pipe-segment"
                    />
                    <circle r="3" fill="#00D4FF" filter="url(#aspGlow)" className="stp-water-particle">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M990,285 Q1005,285 1010,290" />
                    </circle>
                </g>

                {/* ======================================================
            9) NALLAH (OUTLET)  (far right, water channel)
            ====================================================== */}
                <g className="stp-unit stp-nallah" filter="url(#aspShadow)">
                    {/* Channel top */}
                    <polygon points="1000,275 1040,262 1050,280 1010,293" fill="url(#aspNallahWater)" opacity="0.8">
                        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
                    </polygon>
                    {/* Channel front */}
                    <polygon points="1000,275 1000,320 1010,333 1010,293" fill="#0284c7" opacity="0.7" />
                    {/* Channel side */}
                    <polygon points="1010,293 1010,333 1050,320 1050,280" fill="#0369a1" opacity="0.6" />

                    {/* Flowing water animation */}
                    <g className="stp-sparkles">
                        <circle cx="1015" cy="280" r="2" fill="white" opacity="0">
                            <animate attributeName="opacity" values="0;0.9;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="1030" cy="275" r="1.5" fill="white" opacity="0">
                            <animate attributeName="opacity" values="0;0.9;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                        </circle>
                        <circle cx="1022" cy="285" r="2" fill="white" opacity="0">
                            <animate attributeName="opacity" values="0;0.9;0" dur="2s" repeatCount="indefinite" begin="1s" />
                        </circle>
                    </g>

                    <text x="1025" y="350" textAnchor="middle" className="stp-label-text">Nallah</text>
                    <text x="1025" y="363" textAnchor="middle" className="stp-label-sub">(Outlet)</text>
                </g>

                {/* ======================================================
            FLOW DIRECTION ARROWS (pulsing)
            ====================================================== */}
                <g className="stp-flow-arrows">
                    {/* Screening → Primary */}
                    <polygon points="270,233 282,237 270,241" fill="#22c55e" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </polygon>
                    {/* Primary → Aeration */}
                    <polygon points="462,272 474,276 462,280" fill="#38bdf8" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.3s" />
                    </polygon>
                    {/* Aeration → Secondary */}
                    <polygon points="700,335 712,340 700,345" fill="#34d399" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.6s" />
                    </polygon>
                    {/* Secondary → Disinfection */}
                    <polygon points="876,365 882,354 888,365" fill="#00D4FF" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.9s" />
                    </polygon>
                    {/* Disinfection → Nallah */}
                    <polygon points="998,282 1006,278 1006,288" fill="#00D4FF" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1.2s" />
                    </polygon>
                </g>

                {/* ======================================================
            LEGEND  (bottom-right corner)
            ====================================================== */}
                <g className="stp-legend" transform="translate(870,480)">
                    <rect x="0" y="0" width="150" height="75" rx="6" fill="#1e293b" opacity="0.85"
                        stroke="#334155" strokeWidth="1" />
                    {/* P = Pumping System */}
                    <circle cx="18" cy="18" r="7" fill="#dc2626" />
                    <text x="17" y="22" textAnchor="middle" className="stp-pump-text">P</text>
                    <text x="34" y="22" className="stp-legend-text">Pumping System</text>

                    {/* V = Flow Control Valve */}
                    <circle cx="18" cy="40" r="7" fill="#9333ea" />
                    <text x="17" y="44" textAnchor="middle" className="stp-pump-text" style={{ fontSize: '7px' }}>V</text>
                    <text x="34" y="44" className="stp-legend-text">Sludge Flow Control</text>

                    {/* Brown = Surface Aerators */}
                    <circle cx="18" cy="60" r="7" fill="#92400e" />
                    <circle cx="18" cy="60" r="3" fill="#78350f" />
                    <text x="34" y="64" className="stp-legend-text">Surface Aerators</text>
                </g>

            </svg>
        </div>
    );
};

export default STPActivatedSludge3D;
