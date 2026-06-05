import React, { useState } from 'react';
import NeuralBackground from './components/NeuralBackground';
import Logo from './components/Logo';
import TreatmentSimulator from './components/TreatmentSimulator';
import IntakeForm from './components/IntakeForm';
import { 
  ShieldCheck, 
  HelpCircle, 
  ExternalLink, 
  BrainCircuit, 
  Activity, 
  UserCheck, 
  Settings, 
  Cpu, 
  Heart, 
  ArrowRight, 
  Map, 
  Award,
  BookOpen,
  Mail
} from 'lucide-react';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<string>('Overview');
  const [showDisclaimerPopup, setShowDisclaimerPopup] = useState<boolean>(false);

  // Helper smooth scroll to anchor
  const scrollToAnchor = (id: string, menuName: string) => {
    setActiveMenu(menuName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050a15] text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-[#0072ff]/30 selection:text-white">
      
      {/* 1. Responsive 3D Canvas Background */}
      <NeuralBackground />

      {/* 2. Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-[#050a15]/85 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Logo container sticking out on white card block (matches user mock screenshot!) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-b-xl border-x border-b border-slate-200 shadow-xl flex items-center justify-center max-w-[120px] sm:max-w-none transition-all hover:translate-y-[1px]">
              {/* If the exact local JPG was uploaded, render it; fall back gracefully to inline SVG logo */}
              <img 
                src="/1000475988.jpg" 
                className="h-8 sm:h-10 object-contain block mr-1 sm:mr-2" 
                alt="NeuroGuardian AI Banner Logo" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                referrerPolicy="no-referrer"
              />
              <Logo className="h-6 sm:h-8" showText={false} />
            </div>
            
            {/* Horizontal Text Logo brand for desktop view */}
            <div className="hidden md:flex flex-col select-none leading-none">
              <span className="font-display font-black tracking-wider text-sm text-white">
                NEUROGUARDIAN
              </span>
              <span className="font-mono text-[9px] font-bold tracking-[0.38em] text-[#00d2ff]">
                AI SYSTEMS
              </span>
            </div>
          </div>

          {/* Nav menu links matches screenshot perfectly (OVERVIEW / TECHNOLOGY / CLINICAL PROBLEM / RESOURCES) */}
          <nav className="flex items-center gap-1 sm:gap-4 md:gap-7" aria-label="Main Navigation">
            <button 
              onClick={() => scrollToAnchor('hero', 'Overview')}
              className={`text-xs font-semibold tracking-wider font-display uppercase transition-all duration-200 cursor-pointer ${
                activeMenu === 'Overview' 
                  ? 'text-[#00d2ff] border-b-2 border-[#00d2ff] pb-1' 
                  : 'text-slate-400 hover:text-white pb-1'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => scrollToAnchor('solution', 'Technology')}
              className={`text-xs font-semibold tracking-wider font-display uppercase transition-all duration-200 cursor-pointer ${
                activeMenu === 'Technology' 
                  ? 'text-[#00d2ff] border-b-2 border-[#00d2ff] pb-1' 
                  : 'text-slate-400 hover:text-white pb-1'
              }`}
            >
              Technology
            </button>
            <button 
              onClick={() => scrollToAnchor('problem', 'Clinical Problem')}
              className={`text-xs font-semibold tracking-wider font-display uppercase transition-all duration-200 cursor-pointer ${
                activeMenu === 'Clinical Problem' 
                  ? 'text-[#00d2ff] border-b-2 border-[#00d2ff] pb-1' 
                  : 'text-slate-400 hover:text-white pb-1'
              }`}
            >
              Clinical Problem
            </button>
            <button 
              onClick={() => scrollToAnchor('rigor', 'Rigor')}
              className={`text-xs font-semibold tracking-wider font-display uppercase transition-all duration-200 cursor-pointer ${
                activeMenu === 'Rigor' 
                  ? 'text-[#00d2ff] border-b-2 border-[#00d2ff] pb-1' 
                  : 'text-slate-400 hover:text-white pb-1'
              }`}
            >
              Rigor
            </button>
          </nav>

          {/* Quick-Action Button */}
          <div className="hidden sm:block">
            <button 
              onClick={() => scrollToAnchor('clinical-intake', 'Overview')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-[#00d2ff] text-white hover:opacity-95 rounded-lg text-xs font-bold font-display shadow-lg shadow-blue-500/10 cursor-pointer transition-transform duration-200 active:scale-95 flex items-center gap-1.5"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              INTEGRATE CLINICAL PORTAL
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="pt-12 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 border-b border-white/5 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-500/20 text-[#00d2ff] rounded-full text-xs font-mono tracking-wider font-bold uppercase animate-pulse">
                <Activity className="w-3.5 h-3.5" />
                Next-Gen Bioelectronic Technology
              </div>

              {/* Catchy dynamic title requested */}
              <h1 className="font-display font-extrabold text-white tracking-tight leading-[110%] text-4xl sm:text-5xl lg:text-6xl text-left">
                NeuroGuardian AI: <br />
                <span className="text-gradient font-black">Revolutionizing Diabetic Neuropathy Care</span>
              </h1>

              {/* Direct subtitle from mock screenshot */}
              <p className="text-base sm:text-lg text-slate-300 font-light tracking-wide max-w-xl text-left">
                Closed-Loop, AI-Driven Wearable Therapy for DPN Management. Restoring somatic sensitivity and tracking diagnostic metrics dynamically.
              </p>

              {/* Call-to-action triggers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => scrollToAnchor('clinical-intake', 'Overview')}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-[#00d2ff] hover:opacity-95 text-white font-bold font-display text-sm rounded-lg shadow-lg shadow-blue-500/20 cursor-pointer text-center flex items-center justify-center gap-2 group transition-all"
                >
                  Drill Trial Intake
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 duration-200" />
                </button>
                
                <button
                  onClick={() => scrollToAnchor('simulator', 'Technology')}
                  className="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800 text-white font-semibold font-display text-sm rounded-lg border border-white/10 hover:border-slate-700 cursor-pointer text-center"
                >
                  Live Device Telemetry
                </button>
              </div>

              {/* Clinical proof indicators */}
              <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/5 pt-6 w-full max-w-lg mt-2">
                <div>
                  <h4 className="font-display font-extrabold text-2xl text-white">78%</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5">Ulcer Prevention</p>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-2xl text-white">+52 m/s</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5">Signal Response</p>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-2xl text-white">Class IIa</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5">Device Classification</p>
                </div>
              </div>

            </div>

            {/* Right column: Large prominent Logo image display & styled banner */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              
              {/* Outer neon pulse halos */}
              <div className="absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

              {/* Primary mockup display card holding the exact logo representation */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl w-full max-w-[360px] relative border-b-2 border-b-blue-500/40 select-none animate-bounce-slow">
                
                <div className="bg-white/95 rounded-xl p-5 border border-slate-200/50 flex flex-col items-center justify-center shadow-xl">
                  {/* Original image as requested */}
                  <img
                    src="/1000475988.jpg"
                    className="max-h-[140px] sm:max-h-[180px] object-contain"
                    alt="NeuroGuardian AI Holographic Logo Banner"
                    onError={(e) => {
                      // Fallback internally to the custom SVG component inside Logo if physical file fails
                      e.currentTarget.style.display = 'none';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Scalable Vector mirror matching the Logo 3.pdf structure */}
                  <Logo className="h-28 text-slate-900" showText={true} inverseText={false} />
                </div>

                <div className="bg-slate-950/95 border border-white/5 p-3 rounded-lg mt-4 text-center">
                  <p className="text-xs text-[#00d2ff] font-bold tracking-widest font-mono">
                    BIO-SIGNAL CARRIER SYNC
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Continuous Closed-Loop Integration Active
                  </p>
                </div>

              </div>
              
            </div>

          </div>

        </section>

        {/* ================= 3-COLUMN INTRO CARDS (matches first screenshot exactly) ================= */}
        <section className="py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: THE PROBLEM */}
            <div className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between min-h-[190px]">
              <div>
                <img
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%2300d2ff' stroke-width='1.5' viewBox='0 0 24 24' class='w-8 h-8'><path stroke-linecap='round' stroke-linejoin='round' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'/></svg>"
                  alt="Problem alert"
                  className="w-10 h-10 mb-4 opacity-80"
                />
                <h3 className="font-display font-bold text-lg text-white tracking-tight uppercase">THE PROBLEM</h3>
                <p className="text-sm text-slate-400 mt-2.5 leading-relaxed font-light">
                  Diabetic Peripheral Neuropathy: Sensory loss, unperceived injuries, and serious risks of tissue ischemia or undetected amputation paths.
                </p>
              </div>
              <button 
                onClick={() => scrollToAnchor('problem', 'Clinical Problem')}
                className="text-xs font-mono font-medium text-[#00d2ff] text-left hover:underline mt-4 flex items-center gap-1 cursor-pointer"
              >
                In-depth pathology <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* CARD 2: OUR INNOVATION */}
            <div className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between min-h-[190px]">
              <div>
                <img
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%2300d2ff' stroke-width='1.5' viewBox='0 0 24 24' class='w-8 h-8'><path stroke-linecap='round' stroke-linejoin='round' d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.38.992.01.066.015.132.015.197a.75.75 0 01-.015.198c-.058.378.087.75.38.992l1.003.828a1.125 1.125 0 01.3 1.431l-1.297 2.247a1.125 1.125 0 01-1.37.491l-1.216-.456c-.356-.133-.751-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.003-.827c.293-.242.438-.614.38-.992a3.59 3.59 0 010-.396c.058-.378-.087-.75-.38-.992l-1.003-.828a1.125 1.125 0 01-.3-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z'/><circle cx='12' cy='12' r='3'/></svg>"
                  alt="Our Innovation"
                  className="w-10 h-10 mb-4 opacity-80"
                />
                <h3 className="font-display font-bold text-lg text-white tracking-tight uppercase">OUR INNOVATION</h3>
                <p className="text-sm text-slate-400 mt-2.5 leading-relaxed font-light">
                  Advanced Sensory Network, Predictive AI deep mapping, and Targeted closed-loop Electrotherapy system.
                </p>
              </div>
              <button 
                onClick={() => scrollToAnchor('simulator', 'Technology')}
                className="text-xs font-mono font-medium text-[#00d2ff] text-left hover:underline mt-4 flex items-center gap-1 cursor-pointer"
              >
                Explore specifications <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* CARD 3: HOW IT WORKS */}
            <div className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between min-h-[190px]">
              <div>
                <img
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%2300d2ff' stroke-width='1.5' viewBox='0 0 24 24' class='w-8 h-8'><path stroke-linecap='round' stroke-linejoin='round' d='M10.05 4.575a1.59 1.59 0 10-3.18 0 1.59 1.59 0 003.18 0zM12 8.25v7.5m-3-15h6M9 20.25h6'/></svg>"
                  alt="Electrotherapy device"
                  className="w-10 h-10 mb-4 opacity-80"
                />
                <h3 className="font-display font-bold text-lg text-white tracking-tight uppercase">HOW IT WORKS</h3>
                <p className="text-sm text-slate-400 mt-2.5 leading-relaxed font-light">
                  Continuous monitoring sleeve, predictive microvascular risk maps, and active sub-perceptual sensory electrical impulses.
                </p>
              </div>
              <button 
                onClick={() => scrollToAnchor('solution', 'Technology')}
                className="text-xs font-mono font-medium text-[#00d2ff] text-left hover:underline mt-4 flex items-center gap-1 cursor-pointer"
              >
                Simulation panel <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </section>


        {/* ================= PROBLEM SECTION ================= */}
        <section id="problem" className="py-16 sm:py-24 border-b border-white/5 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="absolute w-[200px] h-[200px] bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />
              
              {/* Biological diabetic nerve breakdown illustration card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl border-l-4 border-l-rose-500/50">
                <span className="font-mono text-xs text-rose-400 uppercase tracking-widest font-bold">
                  DPN CHRONIC TIMELINE
                </span>
                
                <div className="space-y-4 mt-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-rose-505/10 border border-rose-500/20 flex items-center justify-center font-mono text-xs text-rose-400 font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase font-mono">Microvascular Occlusion</h4>
                      <p className="text-xs text-slate-400 mt-1">High glycemic levels restrict capillary structures feeding peripheral leg nerves.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-rose-505/10 border border-rose-500/20 flex items-center justify-center font-mono text-xs text-rose-400 font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase font-mono">Myelin Sheath Decay</h4>
                      <p className="text-xs text-slate-400 mt-1">Nerve action potential speeds descend from 55m/s to under 30m/s. True sensory drop-out begins.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-rose-505/10 border border-rose-500/30 flex items-center justify-center font-mono text-xs text-rose-400 font-bold flex-shrink-0 mt-0.5 animate-pulse">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-rose-400 uppercase font-mono">Plantar Ulcer Formation</h4>
                      <p className="text-xs text-slate-300 mt-1 font-semibold">Unfelt mechanical stress causes shear wounds. With poor micro-circulation, critical infections manifest silently.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Standard "Clinical Problem" requested card segment */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="font-mono text-xs text-rose-400 font-bold tracking-widest uppercase">
                CLINICAL LANDSCAPE
              </span>
              
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                The Clinical Problem
              </h2>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
                Diabetic Peripheral Neuropathy (DPN) acts as a silent destroyer, affecting over 60% of all diabetic patients globally. High systemic glucose levels damages critical blood supply systems, resulting in chronic sensory nerve blockage across the lower limbs.
              </p>

              <div className="bg-slate-900/60 border border-white/5 rounded-xl p-5 w-full mt-2">
                <h4 className="text-sm font-semibold font-display text-white">Why Conventional Management Fails:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3.5 text-xs text-slate-400" aria-label="Traditional treatment failures">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">❌</span>
                    <span>Late detection occurs only after physical ulcer formation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">❌</span>
                    <span>No continuous, non-invasive home monitoring models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">❌</span>
                    <span>Pharmacology masks pain without restoring peripheral velocity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-0.5">❌</span>
                    <span>Passive orthotics fail to correct active local capillary ischemia</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-3 mt-4 text-xs font-mono text-slate-500 bg-rose-500/5 border border-rose-500/10 p-3 rounded-lg w-full">
                <span className="font-bold text-rose-400 uppercase">SEVERE INDICATOR</span>
                <span>An unfelt blister can deteriorate into osteomyelitis within 72 hours, resulting in amputation.</span>
              </div>
            </div>

          </div>

        </section>


        {/* ================= OUR SMART SOLUTION ================= */}
        <section id="solution" className="py-16 sm:py-24 border-b border-white/5 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs text-[#00d2ff] font-bold tracking-widest uppercase block mb-2">
              CLOSED-LOOP DEVICE BIO-ARCHITECTURE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Our Smart Solution
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed font-light">
              By placing sensitive bio-monitoring, prediction analysis, and electroceutical healing pathways in a single wearable sleeve, NeuroGuardian AI disrupts the silent pathway of diabetic neuropathy.
            </p>
          </div>

          {/* Interactive treatment terminal simulator dashboard */}
          <TreatmentSimulator />

        </section>

        
        {/* ================= TECHNICAL SPECIFICATIONS & MEDICAL RIGOR ================= */}
        <section id="rigor" className="py-16 sm:py-24 border-b border-white/5 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Rigor Text column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="font-mono text-xs text-[#00d2ff] font-bold tracking-widest uppercase">
                BIOCOMPLIANCE & SAFETY
              </span>
              
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                About our Medical Rigor
              </h2>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
                Safety and precision direct every facet of the NeuroGuardian platform. Operating underneath the human sensory excitation threshold, our device administers restorative microvascular therapy without causing discomfort, muscle twitch, or neural fatigue.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                <div className="bg-slate-900/45 border border-white/5 p-4 rounded-xl flex gap-3.5 items-start">
                  <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Device Safety Classification</h4>
                    <p className="text-xs text-slate-400 mt-1">Classified as a non-invasive Class IIa / IIb bioelectronic assistant wearable. Designed for continuous long-term skin integration.</p>
                  </div>
                </div>

                <div className="bg-slate-900/45 border border-white/5 p-4 rounded-xl flex gap-3.5 items-start">
                  <Settings className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Closed-Loop Cutoff Switch</h4>
                    <p className="text-xs text-slate-400 mt-1">Integrated redundant fail-safe circuits execute automatic current shutoff if skin micro-impedance falls beyond safe medical parameters.</p>
                  </div>
                </div>

                <div className="bg-slate-900/45 border border-white/5 p-4 rounded-xl flex gap-3.5 items-start">
                  <Cpu className="w-5 h-5 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Biocompatible Silicone Casing</h4>
                    <p className="text-xs text-slate-400 mt-1">Constructed of hyper-breathable, hypoallergenic, medical-grade solid siloxanes to avoid local dermal inflammation or sweating.</p>
                  </div>
                </div>

                <div className="bg-slate-900/45 border border-white/5 p-4 rounded-xl flex gap-3.5 items-start">
                  <Heart className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Somatic Waveform Calibration</h4>
                    <p className="text-xs text-slate-400 mt-1">Microcurrent stimulation adapts dynamically to real-time bioimpedance maps, adjusting microcurrent waves to avoid neural receptor adaptation.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Speclist Table column */}
            <div className="lg:col-span-5">
              <div className="glass-panel rounded-2xl p-5 border-t border-t-blue-500/20 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider">
                    NG-V2 CORE HARDWARE SPECS
                  </span>
                  <Award className="w-4 h-4 text-[#00d2ff]" />
                </div>

                <table className="w-full text-xs font-mono my-3 space-y-2" aria-label="NeuroGuardian Device Specifications">
                  <tbody>
                    <tr className="border-b border-white/5 py-2 flex items-center justify-between">
                      <td className="text-slate-500">Stimulation Channels</td>
                      <td className="text-white font-bold">16 Independent Nodes</td>
                    </tr>
                    <tr className="border-b border-white/5 py-2 flex items-center justify-between">
                      <td className="text-slate-500">Output Current Range</td>
                      <td className="text-white font-bold">0.5 - 50 mA (Adjustable)</td>
                    </tr>
                    <tr className="border-b border-white/5 py-2 flex items-center justify-between">
                      <td className="text-slate-500">Pulse Frequency Scope</td>
                      <td className="text-white font-bold">10 Hz - 120 Hz</td>
                    </tr>
                    <tr className="border-b border-white/5 py-2 flex items-center justify-between">
                      <td className="text-slate-500">Diagnostic Sampling Speed</td>
                      <td className="text-white font-bold">250 Hz Continuous</td>
                    </tr>
                    <tr className="border-b border-white/5 py-2 flex items-center justify-between">
                      <td className="text-slate-500">Battery Operating Limit</td>
                      <td className="text-white font-bold">Up to 18 Hours Actuation</td>
                    </tr>
                    <tr className="py-2 flex items-center justify-between">
                      <td className="text-slate-500">Telemetry Data Encryption</td>
                      <td className="text-emerald-400 font-bold">AES-256 (HIPAA Compliant)</td>
                    </tr>
                  </tbody>
                </table>

                <div className="bg-slate-950/60 p-3 rounded-lg text-[10px] text-slate-400 font-mono flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                  <span>Research and bioelectronic designs validated across multi-center neurological pilot environments (C-Group 2025).</span>
                </div>
              </div>
            </div>

          </div>

        </section>


        {/* ================= CLINICAL FEASIBILITY PORTAL SECTION ================= */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-blue-900/5 to-transparent pointer-events-none" />
          
          <IntakeForm />
        </section>

      </main>

      {/* ================= FOOTER & REGULATORY DISCLAIMERS ================= */}
      <footer className="bg-slate-950/90 border-t border-white/5 py-12 relative z-10 text-slate-400 text-xs text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/5">
            
            {/* Col 1 Brand */}
            <div className="md:col-span-5 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <Logo className="h-8" showText={true} />
              </div>
              <p className="text-slate-500 leading-relaxed font-light max-w-sm mt-1">
                NeuroGuardian AI systems are pioneering closed-loop bioelectronic and digital clinical technologies to restore somatic sensory health and protect diabetic extremities.
              </p>
              <div className="flex items-center gap-3.5 text-slate-500 font-mono mt-1 text-[11px]">
                <span>© {new Date().getFullYear()} NeuroGuardian AI Systems Incorporation.</span>
              </div>
            </div>

            {/* Col 2 Quick links */}
            <div className="md:col-span-3 flex flex-col items-start gap-2">
              <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider block mb-2">
                RESOURCES & DOSSIERS
              </span>
              <a href="#simulator" className="hover:text-white transition-all text-slate-500">Run Tactical Simulator</a>
              <a href="#clinical-intake" className="hover:text-white transition-all text-slate-500">Initiate Intake Feasibility</a>
              <button 
                onClick={() => setShowDisclaimerPopup(true)} 
                className="hover:text-white transition-all text-slate-500 text-left bg-transparent border-none cursor-pointer"
              >
                HIPAA Policies & Consent
              </button>
            </div>

            {/* Col 3 Contact info */}
            <div className="md:col-span-4 flex flex-col items-start gap-2">
              <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider block mb-2">
                CLINICAL CENTER HEADQUARTERS
              </span>
              <p className="text-slate-500 leading-relaxed">
                NeuroGuardian AI Technologies corp. <br />
                Research Triangle Park, RTP Corporate Center, Suite 8900-B <br />
                Durham, North Carolina, USA
              </p>
              <div className="flex flex-col gap-1.5 mt-2 font-mono text-[11px] text-[#00d2ff]">
                <a href="mailto:investigations@neuroguardianai.org" className="flex items-center gap-1.5 hover:underline text-cyan-400">
                  <Mail className="w-3.5 h-3.5" /> investigations@neuroguardianai.org
                </a>
                <span className="text-slate-500 font-light">Toll Free Registry: +1 (800) 555-NEURO</span>
              </div>
            </div>

          </div>

          {/* Core FDA Regulatory Disclaimer Footer Column */}
          <div className="pt-8 flex flex-col md:flex-row gap-5 justify-between items-start text-[10px] text-slate-600 leading-normal">
            <div className="max-w-4xl">
              <span className="font-bold text-slate-500 block mb-1">REGULATORY COMPLIANCE AND INVESTIGATIONAL DISCLAIMER:</span>
              <p>
                NeuroGuardian AI is an investigational bioelectronic device. It is not currently cleared, approved, or authorized by the United States Food and Drug Administration (FDA) or European Medicines Agency (EMA) for commercial sales, marketing, or clinical diagnosis. Limited by Federal (or United States) law to investigational use only.
              </p>
              <p className="mt-2.5">
                All clinical telemetry statistics, patient treatment outcomes, nerve response models, and regulatory classifications illustrated across this landing page and therapeutic simulation module are generated purely for clinical modeling/demontrative showcase purposes. These simulation curves do not define individual medical advice or diagnostic treatment plans. Consult a qualified clinical endocrinologist or physician for active DPN or type 1 / type 2 diabetic diagnoses.
              </p>
            </div>

            <div className="flex-shrink-0 flex gap-4 text-slate-500 font-mono text-[9px] mt-2 md:mt-0">
              <span className="bg-slate-900 border border-white/5 py-1 px-2.5 rounded">HIPAA SAFE</span>
              <span className="bg-slate-900 border border-white/5 py-1 px-2.5 rounded">FDA PATH: 510(k)</span>
            </div>
          </div>

        </div>

        {/* HIPAA Policy Quick Overlay Popup */}
        {showDisclaimerPopup && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md text-[#e2e8f0] relative">
              <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                HIPAA & Dossier Security Policy
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed space-y-2">
                NeuroGuardian AI takes clinical data confidentiality seriously. All mock data inputted into our Clinical Intake & Feasibility Portal is processed entirely locally within your current sandbox container.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                We make secure end-to-end sandbox evaluations that simulate regulatory bio-compatibility dossiers without transmitting actual physical health indices.
              </p>
              <button
                onClick={() => setShowDisclaimerPopup(false)}
                className="mt-5 w-full p-2 bg-[#0072ff] hover:bg-blue-600 text-white font-bold font-display text-xs rounded transition-colors"
              >
                ACKNOWLEDGE POLICY
              </button>
            </div>
          </div>
        )}

      </footer>

    </div>
  );
}
