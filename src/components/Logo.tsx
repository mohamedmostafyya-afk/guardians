import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  inverseText?: boolean;
}

export default function Logo({ className = "h-12", showText = true, inverseText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Dynamic SVG Clone of the original Logo 3.pdf design */}
      <svg
        className={`${className} transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="NeuroGuardian AI Circular Pulse Neuron Logo"
      >
        <defs>
          {/* Main medical blue to cyan gradient */}
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" /> {/* Deep Blue */}
            <stop offset="50%" stopColor="#0072ff" /> {/* Medical Blue */}
            <stop offset="100%" stopColor="#00d2ff" /> {/* Medical Cyan */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Ring with Gradient */}
        <circle
          cx="240"
          cy="120"
          r="64"
          stroke="url(#logoGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]"
        />

        {/* Inner thin offset ring */}
        <circle
          cx="240"
          cy="120"
          r="54"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          opacity="0.6"
        />

        {/* The Action Potential / Nerve Fiber Line */}
        {/* Left Nerve Pathway (Dendrite fibers merging) */}
        <path
          d="M 60 110 L 90 120 M 60 120 L 90 120 M 60 130 L 90 120"
          stroke="url(#logoGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 90 120 Q 120 120 135 110 T 160 125 T 184 120"
          stroke="url(#logoGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Core heartbeat spike within circular boundary */}
        <path
          d="M 184 120 Q 192 120 198 120 L 210 120 L 220 90 L 230 152 L 246 64 L 258 135 L 268 120 L 280 120"
          stroke="url(#logoGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Synaptic Terminal / Circuit nodes */}
        <path
          d="M 280 120 L 305 120"
          stroke="url(#logoGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Branching outputs */}
        <path
          d="M 305 120 Q 320 120 330 100 M 305 120 L 338 120 M 305 120 Q 320 120 330 140"
          stroke="url(#logoGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Connected Circuit Node Circles */}
        <circle cx="334" cy="100" r="7" fill="url(#logoGrad)" />
        <circle cx="344" cy="120" r="7" fill="url(#logoGrad)" />
        <circle cx="334" cy="140" r="7" fill="url(#logoGrad)" />

        {/* Little nerve electrical pulse beads floating */}
        <circle cx="246" cy="64" r="3.5" fill="#ffffff" filter="url(#glow)" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-black tracking-wider text-lg ${inverseText ? "text-white" : "text-slate-900"}`}>
            NEUROGUARDIAN
          </span>
          <span className="font-mono text-xs font-bold tracking-[0.38em] text-[#00d2ff]">
            AI SYSTEMS
          </span>
        </div>
      )}
    </div>
  );
}
