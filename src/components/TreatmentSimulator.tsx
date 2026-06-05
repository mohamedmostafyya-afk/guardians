import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, Activity, RotateCcw, Zap, Play, CheckCircle } from 'lucide-react';

type SimulatedTab = 'sensors' | 'analysis' | 'electrotherapy';

export default function TreatmentSimulator() {
  const [activeTab, setActiveTab] = useState<SimulatedTab>('sensors');
  
  // Real-time sensor state variables
  const [sensorValues, setSensorValues] = useState<number[]>(new Array(14).fill(40).map(() => Math.floor(Math.random() * 45) + 30));
  const [highSensorsIdx, setHighSensorsIdx] = useState<number[]>([3, 8]);
  const [calibrating, setCalibrating] = useState<boolean>(false);

  // Real-time AI Waveform state/simulation coordinates
  const [neuralWave, setNeuralWave] = useState<number[]>([]);
  const [baselineAnomalies, setBaselineAnomalies] = useState<number>(0);
  const [aiMaturityScore, setAiMaturityScore] = useState<number>(98.2);
  const [mappingState, setMappingState] = useState<'idle' | 'mapping' | 'success'>('idle');

  // Electrotherapy states
  const [frequency, setFrequency] = useState<number>(60); // 60 Hz default
  const [amplitude, setAmplitude] = useState<number>(25); // 25 mA default
  const [stimulating, setStimulating] = useState<boolean>(false);
  const [totalPulsesDelivered, setTotalPulsesDelivered] = useState<number>(1420);

  // Interval timers
  useEffect(() => {
    // 1. Simulate sensor fluctuations
    const sensorTimer = setInterval(() => {
      if (calibrating) return;
      setSensorValues(prev =>
        prev.map((val, idx) => {
          const isHigh = highSensorsIdx.includes(idx);
          const base = isHigh ? 82 : 44;
          const fluctuation = Math.floor(Math.random() * 12) - 6;
          return Math.min(Math.max(base + fluctuation, 10), 100);
        })
      );
    }, 1200);

    // 2. Generate initial neural wave coordinate points
    const points: number[] = [];
    for (let i = 0; i < 40; i++) {
      points.push(Math.sin((i / 40) * Math.PI * 4) * 20 + 50);
    }
    setNeuralWave(points);

    // 3. Keep updating neural waveform with noise/synaptic signal spikes
    const waveTimer = setInterval(() => {
      setNeuralWave(prev => {
        const next = [...prev.slice(1)];
        const step = Date.now() / 150;
        const baseSin = Math.sin(step) * 18 + 50;
        const noise = (Math.random() - 0.5) * 6;
        // Occasional synaptic anomaly spike representing sensory drop-out or neuropathy
        const spike = Math.random() > 0.88 ? (Math.random() > 0.5 ? 25 : -25) : 0;
        if (spike !== 0) {
          setBaselineAnomalies(prevCount => prevCount + 1);
        }
        next.push(baseSin + noise + spike);
        return next;
      });
    }, 150);

    return () => {
      clearInterval(sensorTimer);
      clearInterval(waveTimer);
    };
  }, [calibrating, highSensorsIdx]);

  // Recalibrate sensor arrays
  const handleRecalibrate = () => {
    setCalibrating(true);
    let count = 0;
    const interval = setInterval(() => {
      setSensorValues(prev => prev.map(() => Math.floor(Math.random() * 10) + 12)); // Low diagnostic state values
      count++;
      if (count > 8) {
        clearInterval(interval);
        // Clean out high-sensitivity ulcer potential zones
        setHighSensorsIdx([]);
        setSensorValues(new Array(14).fill(38).map(() => Math.floor(Math.random() * 12) + 28));
        setCalibrating(false);
      }
    }, 180);
  };

  // Trigger patient machine learning neural map training
  const handleTrainMap = () => {
    setMappingState('mapping');
    let timer = 0;
    const interval = setInterval(() => {
      timer += 10;
      setAiMaturityScore(prev => Math.min(+(prev + 0.12).toFixed(1), 99.9));
      if (timer >= 100) {
        clearInterval(interval);
        setMappingState('success');
        setBaselineAnomalies(0);
        setTimeout(() => setMappingState('idle'), 2500);
      }
    }, 120);
  };

  // Pulse electrotherapy stimulation
  const handleStimulate = () => {
    if (stimulating) return;
    setStimulating(true);
    setTimeout(() => {
      setStimulating(false);
      setTotalPulsesDelivered(p => p + 16);
    }, 1600);
  };

  return (
    <div id="simulator" className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-stretch w-full max-w-5xl mx-auto border-t-2 border-t-blue-500/30 overflow-hidden relative">
      
      {/* Absolute faint diagnostic matrix background */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-950/20 to-transparent pointer-events-none" />

      {/* Control Navigation (Left side) */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 min-w-[240px] z-10 relative">
        <div className="mb-2">
          <span className="font-mono text-xs text-[#00d2ff] font-bold uppercase tracking-widest block mb-1">
            INTEGRATED CLOSED-LOOP
          </span>
          <h3 className="font-display font-bold text-2xl text-white tracking-tight">
            Nerve Companion
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Real-time sensory diagnostics and active electroceutical micro-therapies in a single dashboard.
          </p>
        </div>

        <nav className="flex flex-col gap-2 mt-4" aria-label="Simulator Modules">
          {/* SENSORS BUTTON */}
          <button
            onClick={() => setActiveTab('sensors')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 ${
              activeTab === 'sensors'
                ? 'bg-blue-600/20 border-blue-500 text-white font-medium shadow-[0_0_15px_rgba(0,114,255,0.2)]'
                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-slate-800 hover:text-white'
            }`}
          >
            <Activity className={`w-5 h-5 flex-shrink-0 ${activeTab === 'sensors' ? 'text-[#00d2ff]' : 'text-slate-500'}`} />
            <div>
              <p className="text-sm font-semibold leading-tight">1. Smart Sensors</p>
              <p className="text-xs text-slate-500 mt-0.5">Continuous tactile pressure</p>
            </div>
          </button>

          {/* AI ANALYSIS BUTTON */}
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 ${
              activeTab === 'analysis'
                ? 'bg-blue-600/20 border-blue-500 text-white font-medium shadow-[0_0_15px_rgba(0,114,255,0.2)]'
                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-slate-800 hover:text-white'
            }`}
          >
            <Cpu className={`w-5 h-5 flex-shrink-0 ${activeTab === 'analysis' ? 'text-[#00d2ff]' : 'text-slate-500'}`} />
            <div>
              <p className="text-sm font-semibold leading-tight">2. Neural Analytics</p>
              <p className="text-xs text-slate-500 mt-0.5">Real-time axon modeling</p>
            </div>
          </button>

          {/* ELECTROTHERAPY BUTTON */}
          <button
            onClick={() => setActiveTab('electrotherapy')}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 ${
              activeTab === 'electrotherapy'
                ? 'bg-blue-600/20 border-blue-500 text-white font-medium shadow-[0_0_15px_rgba(0,114,255,0.2)]'
                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-slate-800 hover:text-white'
            }`}
          >
            <Zap className={`w-5 h-5 flex-shrink-0 ${activeTab === 'electrotherapy' ? 'text-[#00d2ff]' : 'text-slate-500'}`} />
            <div>
              <p className="text-sm font-semibold leading-tight">3. Electrotherapy</p>
              <p className="text-xs text-slate-500 mt-0.5">Closed-loop sub-perceptual pulses</p>
            </div>
          </button>
        </nav>

        {/* Quick status bar */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Hardware Model</span>
            <span className="text-slate-300">NG-SLEEVE-V2</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 mt-1.5">
            <span>FDA Regulatory</span>
            <span className="text-[#00d2ff] font-semibold">Class IIa Pending</span>
          </div>
        </div>
      </div>

      {/* Simulator Interface Display Screen (Right side) */}
      <div className="bg-slate-950/80 border border-white/5 rounded-xl flex-grow p-5 sm:p-6 flex flex-col justify-between min-h-[340px] z-10 relative">
        
        {/* Dynamic header of the simulated screen */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${stimulating ? 'bg-amber-400 animate-ping' : 'bg-[#00d2ff] animate-pulse'}`} />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              {activeTab === 'sensors' && 'Tactile Neuropathy Sensor Array [ONLINE]'}
              {activeTab === 'analysis' && 'AI Nerve Propagation Diagnostics [ACTIVE]'}
              {activeTab === 'electrotherapy' && 'Closed-Loop Electrocution Engine [READY]'}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-slate-900 text-[#00d2ff] px-2 py-0.5 rounded border border-blue-500/10">
            99.9% Up
          </span>
        </div>

        {/* SCREEN CONTENT: SENSORS */}
        {activeTab === 'sensors' && (
          <div className="flex-grow flex flex-col justify-center py-4">
            <p className="text-xs text-slate-400 mb-4 font-normal">
              The smart sleeve maps 14 tactile micro-zones across the plantar area. Red zones indicate chronic sensory loss blocks and peak pressure shear spots (high ulcer risk).
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Plantar Foot Pressure Mock Graphic */}
              <div className="w-[110px] h-[190px] relative border border-white/10 rounded-full py-4 px-2 flex flex-col justify-between items-center transition-all bg-gradient-to-b from-slate-900 to-slate-950">
                
                {/* 14 Multi-channel touch points distributed like a biological foot map */}
                <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                  <svg viewBox="0 0 100 200" className="w-full h-full fill-none stroke-blue-500 stroke-[0.8] stroke-dasharray-[4]">
                    <ellipse cx="50" cy="100" rx="36" ry="80" />
                    <ellipse cx="40" cy="45" rx="15" ry="25" />
                  </svg>
                </div>

                {/* Draw randomized active sensors mapped specifically across anatomical areas */}
                {sensorValues.map((val, idx) => {
                  const isHigh = highSensorsIdx.includes(idx);
                  let colorClass = 'bg-blue-500/40 text-blue-300 shadow-blue-500/30';
                  if (val > 75) colorClass = 'bg-rose-500 text-rose-100 shadow-[0_0_10px_#ef4444] animate-pulse';
                  else if (val > 55) colorClass = 'bg-amber-500 text-amber-100 shadow-[0_0_8px_#f59e0b]';

                  return (
                    <div
                      key={idx}
                      className={`text-[9px] font-mono w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm cursor-help transition-all duration-500 hover:scale-125 absolute`}
                      style={{
                        // Distribute points structurally in a foot outline (toe, meta, arch, heel)
                        // Plantar coordinates:
                        left: idx === 0 ? '42%' : idx === 1 ? '16%' : idx === 2 ? '68%' : idx === 3 ? '14%' : idx === 4 ? '70%' : idx === 5 ? '44%' : idx === 6 ? '20%' : idx === 7 ? '64%' : idx === 8 ? '26%' : idx === 9 ? '56%' : idx === 10 ? '42%' : idx === 11 ? '38%' : idx === 12 ? '24%' : '58%',
                        top: idx === 0 ? '9%' : idx === 1 ? '16%' : idx === 2 ? '18%' : idx === 3 ? '32%' : idx === 4 ? '34%' : idx === 5 ? '42%' : idx === 6 ? '48%' : idx === 7 ? '52%' : idx === 8 ? '64%' : idx === 9 ? '68%' : idx === 10 ? '78%' : idx === 11 ? '86%' : idx === 12 ? '25%' : '44%'
                      }}
                      title={`Tactile channel ${idx + 1}: ${val}% loss`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>

              {/* Data legends and action triggers */}
              <div className="flex-grow flex flex-col justify-center gap-3">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 border border-white/5 p-2 rounded">
                    <p className="text-slate-500 text-[10px]">MAX LOSS PRESSURE</p>
                    <p className="text-rose-500 font-bold text-base mt-0.5">
                      {highSensorsIdx.length > 0 ? `${Math.max(...sensorValues)}%` : '42%'}
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-white/5 p-2 rounded">
                    <p className="text-slate-500 text-[10px]">CRITICAL ZONES</p>
                    <p className="text-amber-500 font-bold text-base mt-0.5">
                      {highSensorsIdx.length}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRecalibrate}
                  disabled={calibrating}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold font-display shadow-md transition-colors disabled:opacity-50"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${calibrating ? 'animate-spin' : ''}`} />
                  {calibrating ? 'DIAGNOSING SYSTEM SYNC...' : 'RUN BIOSENSOR RE-ALIGNMENT'}
                </button>
                <p className="text-[10px] text-slate-500 font-mono text-center">
                  *Last local system self-test accomplished 1 minute ago.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN CONTENT: AI ANALYSIS */}
        {activeTab === 'analysis' && (
          <div className="flex-grow flex flex-col justify-center py-3">
            <p className="text-xs text-slate-400 mb-4 font-normal">
              Continuous neural pathway analysis processes velocity signals and filters DPN waveform feedback loops to predict active tissue risks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-900 border border-white/5 p-2 rounded text-center">
                <p className="text-slate-500 text-[9px] font-mono">NERVE SENSE ACCURACY</p>
                <p className="text-lg text-[#00d2ff] font-bold mt-0.5">{aiMaturityScore}%</p>
              </div>
              <div className="bg-slate-900 border border-white/5 p-2 rounded text-center">
                <p className="text-slate-500 text-[9px] font-mono">DIAGNOSTIC VELOCITY</p>
                <p className="text-lg text-white font-bold mt-0.5">52 m/s</p>
              </div>
              <div className="bg-slate-900 border border-white/5 p-2 rounded text-center">
                <p className="text-slate-500 text-[9px] font-mono">UNHEALTHY DEVIATIONS</p>
                <p className="text-lg text-amber-400 font-bold mt-0.5">{baselineAnomalies}</p>
              </div>
            </div>

            {/* Simulated Canvas Sparkline or path line */}
            <div className="h-24 bg-slate-900/60 border border-white/5 rounded-lg overflow-hidden flex items-end px-1 py-1.5 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0072ff]/5" />
              
              {/* Plot points of neural wave */}
              <div className="w-full h-full flex items-end justify-between gap-0.5">
                {neuralWave.map((h, i) => {
                  const isSpike = Math.abs(h - 50) > 19;
                  return (
                    <div
                      key={i}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        isSpike 
                          ? 'bg-rose-500 shadow-[0_0_4px_#ef4444]' 
                          : 'bg-[#00d2ff]/40 hover:bg-[#00d2ff]'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>

              {/* Holographic grid scan lines over the sparkline */}
              <div className="absolute left-2 top-2 select-none pointer-events-none">
                <p className="text-[9px] font-mono text-slate-500 leading-none">SIGNAL WAVEFORM: SYMPATHETIC RESPONSE</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleTrainMap}
                disabled={mappingState !== 'idle'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 hover:text-white disabled:opacity-40 transition-colors"
              >
                {mappingState === 'mapping' ? (
                  <>
                    <Cpu className="w-3.5 h-3.5 animate-spin" /> MAPPING PATIENT PATHS...
                  </>
                ) : mappingState === 'success' ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" /> CALIBRATION SYNCED
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#00d2ff]" /> OPTIMIZE AI NEUROMAP
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* SCREEN CONTENT: ELECTROTHERAPY */}
        {activeTab === 'electrotherapy' && (
          <div className="flex-grow flex flex-col justify-center py-2">
            <p className="text-xs text-slate-400 mb-4 font-normal">
              Sub-perceptual (TENS/NMES) electrical neuromodulation applies low-level currents to revive diabetic microvascular fields and increase blood flow.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-stretch">
              
              {/* Pulsing signal waveform settings */}
              <div className="flex-grow flex flex-col gap-3.5">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400 font-mono">STIMULATION FREQUENCY</span>
                    <span className="text-xs text-white font-mono font-bold">{frequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={frequency}
                    onChange={(e) => setFrequency(+e.target.value)}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                    <span>10Hz (Heel focus)</span>
                    <span>120Hz (Somatic sensory)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400 font-mono">CURRENT AMPLITUDE</span>
                    <span className="text-xs text-rose-400 font-mono font-medium">{amplitude} mA (Safe Limit)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={amplitude}
                    onChange={(e) => setAmplitude(+e.target.value)}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                    <span>5mA (Mild)</span>
                    <span>50mA (Max medical threshold)</span>
                  </div>
                </div>
              </div>

              {/* Graphical emulator screen */}
              <div className="w-full sm:w-1/3 bg-slate-950 border border-white/5 p-4 rounded-lg flex flex-col justify-center items-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-blue-500/5 duration-300 ${stimulating ? 'bg-cyan-500/15' : ''}`} />
                
                {stimulating ? (
                  <div className="text-center z-10 animate-pulse">
                    <Zap className="w-8 h-8 text-amber-400 mx-auto animate-bounce mb-2" />
                    <p className="text-[11px] font-mono text-cyan-400 font-bold">EMULATING CURRENT FLOW</p>
                    <p className="text-[9px] text-[#00d2ff] font-mono mt-1">Applying {frequency}Hz @ {amplitude}mA...</p>
                  </div>
                ) : (
                  <div className="text-center z-10">
                    <Zap className="w-7 h-7 text-slate-600 mx-auto mb-2" />
                    <button
                      onClick={handleStimulate}
                      className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold font-display text-xs rounded shadow-md hover:bg-amber-400 transition-colors"
                    >
                      TRIGGER IMPULSE
                    </button>
                    <p className="text-[9px] text-slate-500 font-mono mt-2">Closed-loop safety auto-cutoff: ACTIVE</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>ACTIVE ELECTRODES: 4 PIN-NODE MATRIX</span>
              <span>TOTAL THERAPY BLOCK DELIVERED: <b className="text-white bg-slate-900 px-2 py-0.5 rounded">{totalPulsesDelivered}</b></span>
            </div>

          </div>
        )}

        {/* Device safeguards status banner */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 z-10 relative">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span>Closed-Loop Fail-Safe: Active (<span className="text-green-400 font-bold">OK</span>)</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            *Device operates underneath sensory thresholds to prevent motor contraction.
          </p>
        </div>
      </div>
    </div>
  );
}
