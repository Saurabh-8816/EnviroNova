import React from 'react';
import './WaterTreatment3D.css';

const WaterTreatment3D: React.FC = () => {
  return (
    <div className="water-treatment-container">
      <svg 
        viewBox="50 200 950 380"  /* x y width height : 0 0 1k 6hun for h & l*/ 
        className="water-treatment-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients for 3D effect */}
          <linearGradient id="pollutedWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="50%" stopColor="#6B5344" />
            <stop offset="100%" stopColor="#4A3728" />
          </linearGradient>
          
          <linearGradient id="cleanWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="50%" stopColor="#0099CC" />
            <stop offset="100%" stopColor="#006699" />
          </linearGradient>
          
          <linearGradient id="processingWater1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7A9E7E" />
            <stop offset="100%" stopColor="#5A7E5E" />
          </linearGradient>
          
          <linearGradient id="processingWater2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5DB3D1" />
            <stop offset="100%" stopColor="#3D93B1" />
          </linearGradient>
          
          {/* Tank gradients */}
          <linearGradient id="tankTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8EDF2" />
            <stop offset="100%" stopColor="#B8C5D0" />
          </linearGradient>
          
          <linearGradient id="tankFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9AABB8" />
            <stop offset="100%" stopColor="#6B7D8A" />
          </linearGradient>
          
          <linearGradient id="tankSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A8B98" />
            <stop offset="100%" stopColor="#5A6B78" />
          </linearGradient>
          
          {/* Green equipment gradients */}
          <linearGradient id="greenTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          
          <linearGradient id="greenFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          
          <linearGradient id="greenSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
          
          {/* Blue equipment gradients */}
          <linearGradient id="blueTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          
          <linearGradient id="blueFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          
          <linearGradient id="blueSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          
          {/* Pipe gradient */}
          <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A1A1AA" />
            <stop offset="50%" stopColor="#71717A" />
            <stop offset="100%" stopColor="#52525B" />
          </linearGradient>
          
          {/* Platform gradient */}
          <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          
          {/* Water particle filters */}
          <filter id="waterGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Background platform */}
        <g className="platform">
          {/* Main platform - isometric */}
          <polygon 
            points="100,450 500,250 900,450 500,550" 
            fill="url(#platformGradient)" 
            opacity="0.3"
          />
          {/* Platform edge */}
          <polygon 
            points="100,450 100,470 500,570 500,550" 
            fill="#334155" 
            opacity="0.4"
          />
          <polygon 
            points="500,550 500,570 900,470 900,450" 
            fill="#1E293B" 
            opacity="0.4"
          />
        </g>
        
        {/* === INLET SECTION === */}
        <g className="inlet-section" filter="url(#shadow)">
          {/* Inlet tank - Isometric cube */}
          {/* Top face */}
          <polygon points="80,340 140,310 200,340 140,370" fill="url(#tankTop)" />
          {/* Front face */}
          <polygon points="80,340 80,420 140,450 140,370" fill="url(#tankFront)" />
          {/* Side face */}
          <polygon points="140,370 140,450 200,420 200,340" fill="url(#tankSide)" />
          
          {/* Polluted water level indicator */}
          <polygon points="90,355 130,330 170,355 130,380" fill="url(#pollutedWater)" opacity="0.8" className="water-level" />
          
          {/* Inlet label */}
          <text x="140" y="480" textAnchor="middle" className="label-text">Inlet</text>
        </g>
        
        {/* Water flow animation - Inlet to Screening */}
        <g className="water-flow flow-1">
          <path 
            d="M200,380 Q240,380 280,360" 
            stroke="url(#pollutedWater)" 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round"
            className="pipe-segment"
          />
          {/* Animated water particles */}
          <circle r="4" fill="#8B7355" className="water-particle particle-1">
            <animateMotion dur="3s" repeatCount="indefinite" path="M200,380 Q240,380 280,360" />
          </circle>
          <circle r="3" fill="#6B5344" className="water-particle particle-2">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.5s" path="M200,380 Q240,380 280,360" />
          </circle>
          <circle r="4" fill="#8B7355" className="water-particle particle-3">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M200,380 Q240,380 280,360" />
          </circle>
        </g>
        
        {/* === SCREENING/GRIT REMOVAL === */}
        <g className="screening-unit" filter="url(#shadow)">
          {/* Main body - taller isometric box */}
          {/* Top face */}
          <polygon points="280,280 360,240 440,280 360,320" fill="url(#greenTop)" />
          {/* Front face */}
          <polygon points="280,280 280,400 360,440 360,320" fill="url(#greenFront)" />
          {/* Side face */}
          <polygon points="360,320 360,440 440,400 440,280" fill="url(#greenSide)" />
          
          {/* Internal screen lines */}
          <line x1="300" y1="310" x2="300" y2="410" stroke="#166534" strokeWidth="2" opacity="0.6" />
          <line x1="320" y1="300" x2="320" y2="420" stroke="#166534" strokeWidth="2" opacity="0.6" />
          <line x1="340" y1="310" x2="340" y2="430" stroke="#166534" strokeWidth="2" opacity="0.6" />
          
          {/* Water inside - processing */}
          <polygon points="295,320 345,290 395,320 345,350" fill="url(#processingWater1)" opacity="0.7" className="water-level" />
          
          {/* Label */}
          <text x="360" y="470" textAnchor="middle" className="label-text">Screening</text>
        </g>
        
        {/* Water flow - Screening to Primary */}
        <g className="water-flow flow-2">
          <path 
            d="M440,360 Q480,360 520,340" 
            stroke="url(#processingWater1)" 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round"
            className="pipe-segment"
          />
          <circle r="4" fill="#7A9E7E" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.3s" path="M440,360 Q480,360 520,340" />
          </circle>
          <circle r="3" fill="#5A7E5E" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.8s" path="M440,360 Q480,360 520,340" />
          </circle>
          <circle r="4" fill="#7A9E7E" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.3s" path="M440,360 Q480,360 520,340" />
          </circle>
        </g>
        
        {/* === PRIMARY TREATMENT (Sedimentation) === */}
        <g className="primary-treatment" filter="url(#shadow)">
          {/* Circular tank representation - isometric cylinder */}
          {/* Top ellipse */}
          <ellipse cx="580" cy="280" rx="60" ry="30" fill="url(#tankTop)" />
          {/* Cylinder body */}
          <path d="M520,280 L520,380 Q520,410 580,410 Q640,410 640,380 L640,280" fill="url(#tankFront)" />
          {/* Water surface */}
          <ellipse cx="580" cy="300" rx="50" ry="25" fill="url(#processingWater1)" opacity="0.8" className="water-level">
            <animate attributeName="ry" values="25;27;25" dur="4s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Center mechanism */}
          <line x1="580" y1="260" x2="580" y2="340" stroke="#52525B" strokeWidth="4" />
          <circle cx="580" cy="260" r="8" fill="#71717A" />
          
          {/* Rotating arm */}
          <g className="rotating-arm">
            <line x1="580" y1="320" x2="620" y2="330" stroke="#52525B" strokeWidth="3" />
          </g>
          
          {/* Label */}
          <text x="580" y="440" textAnchor="middle" className="label-text">Sedimentation</text>
        </g>
        
        {/* Water flow - Primary to Secondary */}
        <g className="water-flow flow-3">
          <path 
            d="M640,340 Q680,340 720,320" 
            stroke="url(#processingWater2)" 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round"
            className="pipe-segment"
          />
          <circle r="4" fill="#5DB3D1" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.2s" path="M640,340 Q680,340 720,320" />
          </circle>
          <circle r="3" fill="#3D93B1" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.7s" path="M640,340 Q680,340 720,320" />
          </circle>
          <circle r="4" fill="#5DB3D1" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.2s" path="M640,340 Q680,340 720,320" />
          </circle>
        </g>
        
        {/* === SECONDARY TREATMENT (Biological/Filtration) === */}
        <g className="secondary-treatment" filter="url(#shadow)">
          {/* Main treatment unit - isometric box */}
          {/* Top face */}
          <polygon points="720,260 800,220 880,260 800,300" fill="url(#blueTop)" />
          {/* Front face */}
          <polygon points="720,260 720,370 800,410 800,300" fill="url(#blueFront)" />
          {/* Side face */}
          <polygon points="800,300 800,410 880,370 880,260" fill="url(#blueSide)" />
          
          {/* Bubbles for aeration effect */}
          <g className="aeration-bubbles">
            <circle cx="750" cy="340" r="3" fill="#60A5FA" opacity="0.6">
              <animate attributeName="cy" values="380;300;380" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="770" cy="360" r="2" fill="#60A5FA" opacity="0.6">
              <animate attributeName="cy" values="390;310;390" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle cx="790" cy="350" r="3" fill="#60A5FA" opacity="0.6">
              <animate attributeName="cy" values="385;305;385" dur="2.2s" repeatCount="indefinite" begin="0.6s" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.2s" repeatCount="indefinite" begin="0.6s" />
            </circle>
            <circle cx="810" cy="345" r="2" fill="#93C5FD" opacity="0.6">
              <animate attributeName="cy" values="380;300;380" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
            </circle>
            <circle cx="830" cy="355" r="3" fill="#60A5FA" opacity="0.6">
              <animate attributeName="cy" values="388;308;388" dur="2.3s" repeatCount="indefinite" begin="0.4s" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.3s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle cx="850" cy="340" r="2" fill="#93C5FD" opacity="0.6">
              <animate attributeName="cy" values="375;295;375" dur="2.1s" repeatCount="indefinite" begin="0.7s" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.1s" repeatCount="indefinite" begin="0.7s" />
            </circle>
          </g>
          
          {/* Water inside - getting cleaner */}
          <polygon points="735,290 785,260 835,290 785,320" fill="url(#processingWater2)" opacity="0.7" className="water-level" />
          
          {/* Label */}
          <text x="800" y="440" textAnchor="middle" className="label-text">Filtration</text>
        </g>
        
        {/* Water flow - Secondary to Outlet */}
        <g className="water-flow flow-4">
          <path 
            d="M880,330 Q900,330 920,350" 
            stroke="url(#cleanWater)" 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round"
            className="pipe-segment"
          />
          <circle r="4" fill="#00D4FF" filter="url(#waterGlow)" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.1s" path="M880,330 Q900,330 920,350" />
          </circle>
          <circle r="3" fill="#0099CC" filter="url(#waterGlow)" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="0.6s" path="M880,330 Q900,330 920,350" />
          </circle>
          <circle r="4" fill="#00D4FF" filter="url(#waterGlow)" className="water-particle">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.1s" path="M880,330 Q900,330 920,350" />
          </circle>
        </g>
        
        {/* === OUTLET SECTION === */}
        <g className="outlet-section" filter="url(#shadow)">
          {/* Clean water outlet tank */}
          {/* Top face */}
          <polygon points="880,360 940,330 1000,360 940,390" fill="url(#blueTop)" />
          {/* Front face */}
          <polygon points="880,360 880,440 940,470 940,390" fill="url(#blueFront)" />
          {/* Side face */}
          <polygon points="940,390 940,470 1000,440 1000,360" fill="url(#blueSide)" />
          
          {/* Clean water level */}
          <polygon points="895,375 930,355 965,375 930,395" fill="url(#cleanWater)" opacity="0.9" className="water-level clean-water">
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
          </polygon>
          
          {/* Sparkle effects for clean water */}
          <g className="sparkles">
            <circle cx="915" cy="370" r="2" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="945" cy="365" r="1.5" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="930" cy="380" r="2" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>
          
          {/* Label */}
          <text x="940" y="500" textAnchor="middle" className="label-text">Clean Water</text>
        </g>
        
        {/* Connecting pipes (static background) */}
        <g className="pipe-system">
          <path 
            d="M200,385 L280,355" 
            stroke="url(#pipeGradient)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.5"
          />
          <path 
            d="M440,365 L520,335" 
            stroke="url(#pipeGradient)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.5"
          />
          <path 
            d="M640,345 L720,315" 
            stroke="url(#pipeGradient)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.5"
          />
          <path 
            d="M880,335 L920,355" 
            stroke="url(#pipeGradient)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>
        
        {/* Flow direction arrows */}
        <g className="flow-arrows">
          <polygon points="240,365 260,370 240,375" fill="#22C55E" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </polygon>
          <polygon points="480,350 500,355 480,360" fill="#22C55E" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </polygon>
          <polygon points="680,325 700,330 680,335" fill="#3B82F6" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
          </polygon>
          <polygon points="900,345 910,355 895,355" fill="#00D4FF" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </polygon>
        </g>
        
        {/*Title and process indicators */}
        {/*<g className="header-info">
          <text x="500" y="50" textAnchor="middle" className="title-text">Water Treatment Process</text>
          

          <g className="stage-indicators">
            <rect x="100" y="80" width="15" height="15" fill="url(#pollutedWater)" rx="2" />
            <text x="125" y="92" className="indicator-text">Polluted Water</text>
            
            <rect x="280" y="80" width="15" height="15" fill="url(#processingWater1)" rx="2" />
            <text x="305" y="92" className="indicator-text">Primary Treatment</text>
            
            <rect x="480" y="80" width="15" height="15" fill="url(#processingWater2)" rx="2" />
            <text x="505" y="92" className="indicator-text">Secondary Treatment</text>
            
            <rect x="700" y="80" width="15" height="15" fill="url(#cleanWater)" rx="2" />
            <text x="725" y="92" className="indicator-text">Clean Water</text>
          </g>
        </g>
        */}
      </svg>
    </div>
  );
};

export default WaterTreatment3D;
