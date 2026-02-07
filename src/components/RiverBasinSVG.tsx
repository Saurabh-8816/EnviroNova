import React from 'react';
import './RiverBasinSVG.css';

const RiverBasinSVG: React.FC = () => {
  return (
    <div className="river-basin-svg-container">
      <svg 
        viewBox="-40 -20 1280 540" 
        className="river-basin-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          
          {/* Mountain gradients */}
          <linearGradient id="mountainDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>
          <linearGradient id="mountainLight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#6B7280" />
          </linearGradient>
          <linearGradient id="snowCap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          
          {/* Forest gradients */}
          <linearGradient id="forestDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>
          <linearGradient id="forestMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
          <linearGradient id="forestLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          
          {/* River gradient - upstream murky to downstream clean */}
          <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D9488" /> {/* Teal/murky at source */}
            <stop offset="35%" stopColor="#14B8A6" /> {/* Transitioning */}
            <stop offset="65%" stopColor="#0EA5E9" /> {/* After treatment - cleaner */}
            <stop offset="100%" stopColor="#38BDF8" /> {/* Clean downstream */}
          </linearGradient>
          <linearGradient id="riverShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.9" />
          </linearGradient>
          
          {/* Flow arrow marker */}
          <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#7DD3FC" opacity="0.6" />
          </marker>
          
          {/* Farm gradients */}
          <linearGradient id="farmField" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#65A30D" />
          </linearGradient>
          <linearGradient id="cropRows" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
          
          {/* Treatment plant gradients */}
          <linearGradient id="tankTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="tankFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="tankSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="greenTank" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
          
          {/* Building gradients */}
          <linearGradient id="buildingFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78716C" />
            <stop offset="100%" stopColor="#57534E" />
          </linearGradient>
          <linearGradient id="buildingSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#57534E" />
            <stop offset="100%" stopColor="#44403C" />
          </linearGradient>
          <linearGradient id="buildingTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8A29E" />
            <stop offset="100%" stopColor="#78716C" />
          </linearGradient>
          
          {/* Ground/terrain */}
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D6D3D1" />
            <stop offset="100%" stopColor="#A8A29E" />
          </linearGradient>
          
          {/* Buffer zone */}
          <linearGradient id="bufferZone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          
          {/* Water flow animation filter */}
          <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Background sky */}
        <rect x="0" y="0" width="1200" height="500" fill="url(#skyGradient)" />
        
        {/* Main ground/platform */}
        <polygon 
          points="0,450 600,350 1200,450 600,480" 
          fill="url(#groundGradient)" 
          className="main-ground"
        />
        
        {/* === MOUNTAINS (Left side - River Origin) === */}
        <g className="mountains">
          {/* Back mountain */}
          <polygon points="30,350 100,180 170,350" fill="url(#mountainDark)" />
          <polygon points="100,180 170,350 100,350" fill="url(#mountainLight)" />
          <polygon points="85,220 100,180 115,220" fill="url(#snowCap)" />
          
          {/* Main peak */}
          <polygon points="80,350 180,120 280,350" fill="url(#mountainDark)" />
          <polygon points="180,120 280,350 180,350" fill="url(#mountainLight)" />
          <polygon points="155,180 180,120 205,180" fill="url(#snowCap)" />
          
          {/* Front mountain */}
          <polygon points="150,350 230,200 310,350" fill="url(#mountainDark)" />
          <polygon points="230,200 310,350 230,350" fill="url(#mountainLight)" />
          <polygon points="215,240 230,200 245,240" fill="url(#snowCap)" />
          
          {/* Small hill */}
          <polygon points="250,350 300,280 350,350" fill="#78716C" />
        </g>
        
        {/* === FOREST AREA === */}
        <g className="forest-area">
          {/* Forest ground */}
          <polygon points="280,380 450,320 550,380 380,420" fill="#16A34A" />
          
          {/* Pine trees - back row */}
          <g className="tree tree-1">
            <polygon points="300,340 315,280 330,340" fill="url(#forestDark)" />
            <polygon points="305,320 315,270 325,320" fill="url(#forestMid)" />
            <polygon points="308,300 315,260 322,300" fill="url(#forestLight)" />
            <rect x="312" y="340" width="6" height="12" fill="#78350F" />
          </g>
          <g className="tree tree-2">
            <polygon points="340,335 358,265 376,335" fill="url(#forestDark)" />
            <polygon points="346,310 358,255 370,310" fill="url(#forestMid)" />
            <polygon points="350,290 358,245 366,290" fill="url(#forestLight)" />
            <rect x="355" y="335" width="6" height="12" fill="#78350F" />
          </g>
          <g className="tree tree-3">
            <polygon points="380,340 395,285 410,340" fill="url(#forestDark)" />
            <polygon points="384,320 395,275 406,320" fill="url(#forestMid)" />
            <polygon points="388,300 395,265 402,300" fill="url(#forestLight)" />
            <rect x="392" y="340" width="6" height="12" fill="#78350F" />
          </g>
          
          {/* === RIVER THROUGH FOREST === */}
          <g className="river-through-forest">
            <path 
              d="M280,355 
                 C320,350 360,355 400,352 
                 C440,350 480,355 520,358" 
              fill="none" 
              stroke="url(#riverGradient)" 
              strokeWidth="18" 
              strokeLinecap="round"
              className="river-path"
            />
            <path 
              d="M280,353 
                 C320,348 360,353 400,350 
                 C440,348 480,353 520,356" 
              fill="none" 
              stroke="url(#riverShine)" 
              strokeWidth="8" 
              strokeLinecap="round"
              className="river-shine"
            />
            {/* Small rocks in river */}
            <ellipse cx="340" cy="354" rx="4" ry="2" fill="#78716C" opacity="0.6" />
            <ellipse cx="420" cy="351" rx="3" ry="2" fill="#78716C" opacity="0.5" />
            <ellipse cx="480" cy="356" rx="4" ry="2" fill="#78716C" opacity="0.6" />
          </g>
          
          {/* Pine trees - front row (in front of river) */}
          <g className="tree tree-4">
            <polygon points="320,370 340,300 360,370" fill="url(#forestDark)" />
            <polygon points="327,345 340,290 353,345" fill="url(#forestMid)" />
            <polygon points="332,325 340,280 348,325" fill="url(#forestLight)" />
            <rect x="337" y="370" width="6" height="12" fill="#78350F" />
          </g>
          <g className="tree tree-5">
            <polygon points="370,375 392,295 414,375" fill="url(#forestDark)" />
            <polygon points="378,345 392,285 406,345" fill="url(#forestMid)" />
            <polygon points="384,320 392,275 400,320" fill="url(#forestLight)" />
            <rect x="389" y="375" width="6" height="12" fill="#78350F" />
          </g>
          <g className="tree tree-6">
            <polygon points="420,365 438,305 456,365" fill="url(#forestDark)" />
            <polygon points="426,345 438,295 450,345" fill="url(#forestMid)" />
            <polygon points="432,325 438,285 444,325" fill="url(#forestLight)" />
            <rect x="435" y="365" width="6" height="12" fill="#78350F" />
          </g>
          
          {/* Deciduous trees */}
          <g className="tree tree-7">
            <circle cx="470" cy="335" r="18" fill="url(#forestMid)" />
            <circle cx="465" cy="340" r="14" fill="url(#forestLight)" />
            <rect x="467" y="350" width="5" height="20" fill="#78350F" />
          </g>
          <g className="tree tree-8">
            <circle cx="500" cy="345" r="15" fill="url(#forestMid)" />
            <circle cx="496" cy="348" r="12" fill="url(#forestLight)" />
            <rect x="497" y="358" width="5" height="18" fill="#78350F" />
          </g>
        </g>
        
        {/* === AGRICULTURAL LAND === */}
        <g className="farm-area">
          {/* Farm field - upper */}
          <polygon points="480,340 580,300 680,340 580,370" fill="url(#farmField)" />
          {/* Crop rows */}
          <line x1="510" y1="320" x2="550" y2="355" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          <line x1="530" y1="315" x2="570" y2="350" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          <line x1="550" y1="310" x2="590" y2="345" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          <line x1="570" y1="305" x2="610" y2="340" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          <line x1="590" y1="300" x2="630" y2="335" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          
          {/* Farm field - lower */}
          <polygon points="520,390 620,350 720,390 620,420" fill="url(#farmField)" />
          {/* Crop rows */}
          <line x1="555" y1="370" x2="595" y2="405" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          <line x1="575" y1="365" x2="615" y2="400" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          <line x1="595" y1="360" x2="635" y2="395" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          <line x1="615" y1="355" x2="655" y2="390" stroke="#A3E635" strokeWidth="4" className="crop-row" />
          
          {/* Barn */}
          <polygon points="650,350 670,330 690,350 670,360" fill="url(#buildingTop)" />
          <polygon points="650,350 650,380 670,390 670,360" fill="#B45309" />
          <polygon points="670,360 670,390 690,380 690,350" fill="#92400E" />
        </g>
        
        {/* === BUFFER ZONE 1 (Before Treatment) === */}
        <g className="buffer-zone-1">
          <polygon points="680,360 750,330 820,360 750,385" fill="url(#bufferZone)" />
          {/* Small trees */}
          <circle cx="700" cy="350" r="10" fill="#22C55E" className="buffer-tree" />
          <circle cx="720" cy="355" r="8" fill="#4ADE80" className="buffer-tree" />
          <circle cx="740" cy="345" r="11" fill="#22C55E" className="buffer-tree" />
          <circle cx="760" cy="360" r="9" fill="#4ADE80" className="buffer-tree" />
          <circle cx="780" cy="350" r="10" fill="#22C55E" className="buffer-tree" />
          <circle cx="800" cy="358" r="8" fill="#4ADE80" className="buffer-tree" />
        </g>
        
        {/* === RIVER SEGMENT 1: Mountains to Forest Entry === */}
        <g className="river-segment-1">
          <path 
            d="M180,350 
               C210,352 240,354 280,355" 
            fill="none" 
            stroke="url(#riverGradient)" 
            strokeWidth="22" 
            strokeLinecap="round"
            className="river-path"
          />
          <path 
            d="M180,348 
               C210,350 240,352 280,353" 
            fill="none" 
            stroke="url(#riverShine)" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="river-shine"
          />
          {/* Flow arrow */}
          <g className="flow-arrows" opacity="0.4">
            <polygon points="230,352 245,354 230,356" fill="#5EEAD4" className="river-arrow arrow-1" />
          </g>
        </g>
        
        {/* === RIVER SEGMENT 2: Forest Exit to Agriculture to Treatment === */}
        <g className="river-segment-2">
          <path 
            d="M520,358 
               C560,362 600,370 650,375 
               C700,380 740,378 770,385" 
            fill="none" 
            stroke="url(#riverGradient)" 
            strokeWidth="20" 
            strokeLinecap="round"
            className="river-path"
          />
          <path 
            d="M520,356 
               C560,360 600,368 650,373 
               C700,378 740,376 770,383" 
            fill="none" 
            stroke="url(#riverShine)" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="river-shine"
          />
          {/* Flow arrows */}
          <g className="flow-arrows" opacity="0.4">
            <polygon points="400,352 415,354 400,356" fill="#14B8A6" className="river-arrow arrow-2" />
            <polygon points="580,368 595,371 580,374" fill="#0EA5E9" className="river-arrow arrow-3" />
          </g>
        </g>
        
        {/* === WATER TREATMENT PLANT === */}
        <g className="treatment-plant">
          {/* Platform */}
          <polygon points="770,385 880,340 990,385 880,420" fill="#64748B" />
          <polygon points="770,385 770,395 880,430 880,420" fill="#475569" />
          <polygon points="880,420 880,430 990,395 990,385" fill="#334155" />
          
          {/* === INLET TANK (Murky/polluted water color) === */}
          <g className="inlet-tank">
            {/* Segmented tank base */}
            <polygon points="785,370 815,355 845,370 815,385" fill="url(#tankTop)" />
            <polygon points="785,370 785,395 815,410 815,385" fill="url(#tankFront)" />
            <polygon points="815,385 815,410 845,395 845,370" fill="url(#tankSide)" />
            {/* Segment divider lines */}
            <line x1="795" y1="372" x2="795" y2="400" stroke="#475569" strokeWidth="1" opacity="0.5" />
            <line x1="815" y1="360" x2="815" y2="407" stroke="#475569" strokeWidth="1.5" opacity="0.6" />
            <line x1="835" y1="372" x2="835" y2="393" stroke="#475569" strokeWidth="1" opacity="0.5" />
            {/* Murky water inside (teal/greenish - polluted) */}
            <polygon points="790,374 812,363 834,374 812,383" fill="#0D9488" opacity="0.75" />
            {/* Inlet pipe from river */}
            <line x1="770" y1="385" x2="785" y2="378" stroke="#64748B" strokeWidth="10" strokeLinecap="round" />
            <line x1="772" y1="383" x2="786" y2="377" stroke="#0D9488" strokeWidth="6" strokeLinecap="round" />
            <line x1="773" y1="382" x2="787" y2="376" stroke="#5EEAD4" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          </g>
          
          {/* === VERTICAL CYLINDER CLARIFIER (Main engineering cue) === */}
          <g className="vertical-clarifier">
            {/* Tall vertical cylinder */}
            <ellipse cx="880" cy="330" rx="28" ry="12" fill="url(#tankTop)" />
            <rect x="852" y="330" width="56" height="60" fill="url(#tankFront)" />
            <ellipse cx="880" cy="390" rx="28" ry="12" fill="url(#tankSide)" />
            {/* Cylinder highlight */}
            <ellipse cx="868" cy="360" rx="4" ry="25" fill="white" opacity="0.15" />
            {/* Water level indicator lines */}
            <line x1="856" y1="345" x2="904" y2="345" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
            <line x1="856" y1="360" x2="904" y2="360" stroke="#38BDF8" strokeWidth="2" opacity="0.4" />
            <line x1="856" y1="375" x2="904" y2="375" stroke="#38BDF8" strokeWidth="2" opacity="0.3" />
            {/* Top water surface */}
            <ellipse cx="880" cy="335" rx="22" ry="9" fill="#38BDF8" opacity="0.7" className="clarifier-water" />
            {/* Central rotating mechanism */}
            <g className="clarifier-arm">
              <circle cx="880" cy="335" r="5" fill="#334155" />
              <line x1="880" y1="335" x2="898" y2="340" stroke="#475569" strokeWidth="3" />
              <circle cx="898" cy="340" r="3" fill="#64748B" />
            </g>
            {/* Small outlet indicator */}
            <circle cx="905" cy="380" r="4" fill="#0EA5E9" className="outlet-bubble" />
          </g>
          
          {/* === OUTLET TANK (Clean water - bright blue) === */}
          <g className="outlet-tank">
            {/* Segmented tank */}
            <polygon points="920,365 950,350 980,365 950,380" fill="#4ADE80" />
            <polygon points="920,365 920,395 950,410 950,380" fill="url(#greenTank)" />
            <polygon points="950,380 950,410 980,395 980,365" fill="#15803D" />
            {/* Segment divider */}
            <line x1="935" y1="360" x2="935" y2="402" stroke="#166534" strokeWidth="1" opacity="0.5" />
            <line x1="965" y1="367" x2="965" y2="392" stroke="#166534" strokeWidth="1" opacity="0.5" />
            {/* Clean water inside (bright blue) */}
            <polygon points="925,369 948,358 972,369 948,378" fill="#38BDF8" opacity="0.8" />
            {/* Outlet pipe to river */}
            <line x1="980" y1="378" x2="1000" y2="385" stroke="#64748B" strokeWidth="10" strokeLinecap="round" />
            <line x1="982" y1="377" x2="998" y2="383" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
            <line x1="983" y1="376" x2="997" y2="382" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </g>
          
          {/* Connecting pipes between tanks */}
          <line x1="845" y1="380" x2="852" y2="370" stroke="#71717A" strokeWidth="5" strokeLinecap="round" />
          <line x1="908" y1="375" x2="920" y2="370" stroke="#71717A" strokeWidth="5" strokeLinecap="round" />
          
          {/* Small flow arrows on pipes */}
          <polygon points="848,372 853,375 848,378" fill="#0EA5E9" opacity="0.7" className="flow-arrow" />
          <polygon points="914,369 919,372 914,375" fill="#38BDF8" opacity="0.7" className="flow-arrow" />
          
          {/* Label */}
          <text x="880" y="440" textAnchor="middle" className="label-text">Treatment Plant</text>
        </g>
        
        {/* === BUFFER ZONE 2 (After Treatment) === */}
        <g className="buffer-zone-2">
          <polygon points="960,365 1010,340 1060,365 1010,385" fill="url(#bufferZone)" />
          <circle cx="975" cy="358" r="9" fill="#22C55E" className="buffer-tree" />
          <circle cx="995" cy="350" r="10" fill="#4ADE80" className="buffer-tree" />
          <circle cx="1015" cy="362" r="8" fill="#22C55E" className="buffer-tree" />
          <circle cx="1035" cy="355" r="9" fill="#4ADE80" className="buffer-tree" />
          <circle cx="1050" cy="360" r="7" fill="#22C55E" className="buffer-tree" />
        </g>
        
        {/* === RIVER SEGMENT 3: Treatment outlet to City (between plant and city) === */}
        <g className="river-segment-3">
          <path 
            d="M1000,385 
               C1020,388 1040,400 1060,405" 
            fill="none" 
            stroke="url(#riverGradient)" 
            strokeWidth="22" 
            strokeLinecap="round"
            className="river-path"
          />
          <path 
            d="M1000,383 
               C1020,386 1040,398 1060,403" 
            fill="none" 
            stroke="url(#riverShine)" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="river-shine"
          />
        </g>
        
        {/* === URBAN CITY === */}
        <g className="city-area">
          {/* City ground */}
          <polygon points="1020,380 1120,340 1200,380 1120,420" fill="#78716C" />
          
          {/* Roads */}
          <polygon points="1060,370 1080,360 1100,370 1080,378" fill="#44403C" />
          <polygon points="1080,378 1120,398 1140,388 1100,370" fill="#3F3F46" />
          
          {/* Buildings - back row */}
          <g className="building building-1">
            {/* Tall building */}
            <polygon points="1040,340 1060,330 1080,340 1060,348" fill="url(#buildingTop)" />
            <polygon points="1040,340 1040,390 1060,400 1060,348" fill="url(#buildingFront)" />
            <polygon points="1060,348 1060,400 1080,390 1080,340" fill="url(#buildingSide)" />
            {/* Windows */}
            <rect x="1045" y="350" width="4" height="6" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1045" y="362" width="4" height="6" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1045" y="374" width="4" height="6" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1053" y="355" width="4" height="6" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1053" y="367" width="4" height="6" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1053" y="379" width="4" height="6" fill="#FCD34D" opacity="0.8" className="window" />
          </g>
          
          <g className="building building-2">
            {/* Medium building */}
            <polygon points="1085,355 1100,345 1115,355 1100,362" fill="url(#buildingTop)" />
            <polygon points="1085,355 1085,395 1100,405 1100,362" fill="url(#buildingFront)" />
            <polygon points="1100,362 1100,405 1115,395 1115,355" fill="url(#buildingSide)" />
            {/* Windows */}
            <rect x="1090" y="365" width="4" height="5" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1090" y="378" width="4" height="5" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1096" y="370" width="4" height="5" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1096" y="383" width="4" height="5" fill="#FCD34D" opacity="0.8" className="window" />
          </g>
          
          <g className="building building-3">
            {/* Tallest building */}
            <polygon points="1120,335 1145,320 1170,335 1145,346" fill="url(#buildingTop)" />
            <polygon points="1120,335 1120,400 1145,415 1145,346" fill="url(#buildingFront)" />
            <polygon points="1145,346 1145,415 1170,400 1170,335" fill="url(#buildingSide)" />
            {/* Windows */}
            <rect x="1127" y="348" width="5" height="7" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1127" y="363" width="5" height="7" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1127" y="378" width="5" height="7" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1127" y="393" width="5" height="7" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1137" y="355" width="5" height="7" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1137" y="370" width="5" height="7" fill="#FCD34D" opacity="0.8" className="window" />
            <rect x="1137" y="385" width="5" height="7" fill="#FCD34D" opacity="0.8" className="window" />
          </g>
          
          {/* City park */}
          <ellipse cx="1160" cy="395" rx="20" ry="12" fill="#4ADE80" />
          <circle cx="1155" cy="388" r="8" fill="#22C55E" className="city-tree" />
          <circle cx="1168" cy="392" r="6" fill="#16A34A" className="city-tree" />
        </g>
        
        {/* === RIVER SEGMENT 4: Through the City (flows along the lower edge) === */}
        <g className="river-segment-4">
          {/* Main river channel through city - lower position */}
          <path 
            d="M1060,405 
               C1090,410 1120,415 1150,418
               C1175,420 1200,418 1220,415" 
            fill="none" 
            stroke="url(#riverGradient)" 
            strokeWidth="20" 
            strokeLinecap="round"
            className="river-path"
          />
          <path 
            d="M1060,403 
               C1090,408 1120,413 1150,416
               C1175,418 1200,416 1220,413" 
            fill="none" 
            stroke="url(#riverShine)" 
            strokeWidth="10" 
            strokeLinecap="round"
            className="river-shine"
          />
          {/* River embankment/wall to show it's channeled */}
          <path 
            d="M1055,395 L1055,412 M1220,405 L1220,420" 
            stroke="#64748B" 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* Flow arrow */}
          <g className="flow-arrows" opacity="0.4">
            <polygon points="1130,413 1145,416 1130,419" fill="#38BDF8" className="river-arrow arrow-5" />
          </g>
        </g>
        
        {/* === WATER PARTICLES (animated across full river) === */}
        <g className="water-particles">
          <circle r="4" fill="#7DD3FC" className="water-particle p1">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
          <circle r="3" fill="#BAE6FD" className="water-particle p2">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              begin="2s"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
          <circle r="4" fill="#7DD3FC" className="water-particle p3">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              begin="4s"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
          <circle r="3" fill="#BAE6FD" className="water-particle p4">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              begin="6s"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
          <circle r="4" fill="#7DD3FC" className="water-particle p5">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              begin="8s"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
          <circle r="3" fill="#BAE6FD" className="water-particle p6">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              begin="10s"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
          <circle r="4" fill="#7DD3FC" className="water-particle p7">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              begin="12s"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
          <circle r="3" fill="#BAE6FD" className="water-particle p8">
            <animateMotion 
              dur="16s" 
              repeatCount="indefinite"
              begin="14s"
              path="M180,350 C210,352 240,354 280,355 C320,350 360,355 400,352 C440,350 480,355 520,358 C560,362 600,370 650,375 C700,380 740,378 770,385 L785,378 L845,380 L880,360 L920,370 L980,378 L1000,385 C1020,388 1040,400 1060,405 C1090,410 1120,415 1150,418 C1175,420 1200,418 1220,415"
            />
          </circle>
        </g>
        
        {/* === VEGETATION ALONG RIVER BANKS === */}
        <g className="riverbank-vegetation">
          <circle cx="250" cy="370" r="8" fill="#22C55E" className="bank-shrub" />
          <circle cx="400" cy="380" r="7" fill="#4ADE80" className="bank-shrub" />
          <circle cx="550" cy="372" r="9" fill="#22C55E" className="bank-shrub" />
          <circle cx="650" cy="385" r="6" fill="#4ADE80" className="bank-shrub" />
          <circle cx="820" cy="370" r="8" fill="#22C55E" className="bank-shrub" />
          <circle cx="950" cy="380" r="7" fill="#4ADE80" className="bank-shrub" />
        </g>
        
        {/* === CLOUDS === */}
        <g className="clouds">
          <g className="cloud cloud-1">
            <ellipse cx="150" cy="80" rx="40" ry="20" fill="white" opacity="0.8" />
            <ellipse cx="180" cy="75" rx="30" ry="18" fill="white" opacity="0.9" />
            <ellipse cx="130" cy="85" rx="25" ry="15" fill="white" opacity="0.7" />
          </g>
          <g className="cloud cloud-2">
            <ellipse cx="500" cy="60" rx="45" ry="22" fill="white" opacity="0.7" />
            <ellipse cx="535" cy="55" rx="35" ry="20" fill="white" opacity="0.8" />
            <ellipse cx="475" cy="65" rx="28" ry="16" fill="white" opacity="0.6" />
          </g>
          <g className="cloud cloud-3">
            <ellipse cx="900" cy="90" rx="35" ry="18" fill="white" opacity="0.8" />
            <ellipse cx="925" cy="85" rx="28" ry="15" fill="white" opacity="0.9" />
            <ellipse cx="880" cy="95" rx="22" ry="12" fill="white" opacity="0.7" />
          </g>
        </g>
        
        {/* === ZONE LABELS === */}
        <g className="zone-labels">
          <text x="180" y="140" textAnchor="middle" className="zone-label">Mountains</text>
          <text x="400" y="290" textAnchor="middle" className="zone-label">Forest</text>
          <text x="600" y="290" textAnchor="middle" className="zone-label">Agriculture</text>
          <text x="1100" y="310" textAnchor="middle" className="zone-label">Urban Area</text>
        </g>
      </svg>
    </div>
  );
};

export default RiverBasinSVG;
