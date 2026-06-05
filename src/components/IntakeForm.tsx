import React, { useState } from 'react';
import { PatientIntake } from '../types';
import { ClipboardList, Printer, ShieldCheck, Mail, Activity, ArrowRight, UserCheck, Barcode } from 'lucide-react';

export default function IntakeForm() {
  const [form, setForm] = useState<PatientIntake>({
    fullName: '',
    email: '',
    role: 'physician',
    severity: 'moderate',
    symptoms: ['sensory_loss'],
    consent: false,
  });

  const [report, setReport] = useState<any | null>(null);
  const [generating, setGenerating] = useState<boolean>(false);

  // Handle symptom multi-checks
  const toggleSymptom = (symptom: string) => {
    setForm(prev => {
      const exists = prev.symptoms.includes(symptom);
      const newSymptoms = exists
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom];
      return { ...prev, symptoms: newSymptoms };
    });
  };

  // Submit and generate the report
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.consent) return;

    setGenerating(true);
    setTimeout(() => {
      // Calculate realistic medical projection models based on clinical inputs
      let ulcerRiskReduction = '74%';
      let microCirculationRate = '+82%';
      let nerveSpeedAcc = '+8.4 m/s';
      let classificationGroup = 'Class IIa Wearable Device Configuration';
      let pathwayClearest = '510(k) De Novo Pathway';

      if (form.severity === 'severe') {
        ulcerRiskReduction = '88% (Critical Prevention)';
        microCirculationRate = '+94%';
        nerveSpeedAcc = '+12.6 m/s (Restorative)';
        classificationGroup = 'Class IIb Bioelectronic Assist Assembly';
      } else if (form.severity === 'mild') {
        ulcerRiskReduction = '62%';
        microCirculationRate = '+68%';
        nerveSpeedAcc = '+4.8 m/s';
      }

      setReport({
        id: `NG-INT-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC',
        patientProfile: {
          name: form.fullName,
          email: form.email,
          role: form.role.toUpperCase().replace('_', ' '),
          severity: form.severity.toUpperCase(),
          symptomsCount: form.symptoms.length,
        },
        projections: {
          ulcerRisk: ulcerRiskReduction,
          circulationBoost: microCirculationRate,
          nerveAcceleration: nerveSpeedAcc,
        },
        regulatory: {
          systemClass: classificationGroup,
          fdaTrack: pathwayClearest,
          trialGroup: 'Cohort C-3 Neuropathic Sensory Regeneration',
        }
      });
      setGenerating(false);
    }, 1200);
  };

  const resetForm = () => {
    setReport(null);
    setForm({
      fullName: '',
      email: '',
      role: 'physician',
      severity: 'moderate',
      symptoms: ['sensory_loss'],
      consent: false,
    });
  };

  return (
    <div id="clinical-intake" className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10 relative">
      
      {/* Questionnaire Form Side (7 cols on large) */}
      <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border-t-2 border-t-[#00d2ff]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#0072ff]/10 border border-blue-500/20 text-[#00d2ff]">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              Clinical Intake & Feasibility Portal
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Generate a personalized bioelectronic therapeutic integration report.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name / Clinician Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                placeholder="Dr. Sarah Jenkins, MD"
                value={form.fullName}
                onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                className="w-full bg-slate-950/90 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00d2ff] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Corporate / Clinical Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="jenkins@cardiacbiotech.org"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-slate-950/90 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00d2ff] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Medical Professional / Profile
              </label>
              <select
                id="role"
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value as any }))}
                className="w-full bg-slate-950/90 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff] cursor-pointer"
              >
                <option value="physician">Attending Physician / Endocrinologist</option>
                <option value="patient">DPN Patient / Care Advocate</option>
                <option value="trial_investigator">Clinical Trial Investigator</option>
                <option value="distributor">Healthcare Systems Distributor</option>
              </select>
            </div>

            <div>
              <label htmlFor="severity" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Target DPN Neuropathy Profile
              </label>
              <select
                id="severity"
                value={form.severity}
                onChange={e => setForm(p => ({ ...p, severity: e.target.value as any }))}
                className="w-full bg-slate-950/90 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d2ff] cursor-pointer"
              >
                <option value="mild">Mild - Occasional Paresthesia / Cold Feet</option>
                <option value="moderate">Moderate - Habitual Numbness & Balance Loss</option>
                <option value="severe">Severe - Pronounced Tactile Insensitivity & Ulcer Prone</option>
              </select>
            </div>
          </div>

          <div>
            <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Reported Neuropathic Symptoms
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => toggleSymptom('sensory_loss')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-colors ${
                  form.symptoms.includes('sensory_loss')
                    ? 'bg-blue-600/10 border-blue-500/50 text-white font-medium'
                    : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-slate-800'
                }`}
              >
                <div className={`w-3 h-3 rounded-sm border ${form.symptoms.includes('sensory_loss') ? 'bg-[#00d2ff] border-[#00d2ff]' : 'border-slate-600'}`} />
                Plantar Sensory Loss
              </button>

              <button
                type="button"
                onClick={() => toggleSymptom('burning')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-colors ${
                  form.symptoms.includes('burning')
                    ? 'bg-blue-600/10 border-blue-500/50 text-white font-medium'
                    : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-slate-800'
                }`}
              >
                <div className={`w-3 h-3 rounded-sm border ${form.symptoms.includes('burning') ? 'bg-[#00d2ff] border-[#00d2ff]' : 'border-slate-600'}`} />
                Chronic Burning Pain
              </button>

              <button
                type="button"
                onClick={() => toggleSymptom('balance')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-colors ${
                  form.symptoms.includes('balance')
                    ? 'bg-blue-600/10 border-blue-500/50 text-white font-medium'
                    : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-slate-800'
                }`}
              >
                <div className={`w-3 h-3 rounded-sm border ${form.symptoms.includes('balance') ? 'bg-[#00d2ff] border-[#00d2ff]' : 'border-slate-600'}`} />
                Postural Instability
              </button>

              <button
                type="button"
                onClick={() => toggleSymptom('paresthesia')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-colors ${
                  form.symptoms.includes('paresthesia')
                    ? 'bg-blue-600/10 border-blue-500/50 text-white font-medium'
                    : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-slate-800'
                }`}
              >
                <div className={`w-3 h-3 rounded-sm border ${form.symptoms.includes('paresthesia') ? 'bg-[#00d2ff] border-[#00d2ff]' : 'border-slate-600'}`} />
                Frictional Paresthesia
              </button>
            </div>
          </div>

          {/* Legal and compliance check */}
          <div className="bg-slate-950/60 border border-white/5 p-3.5 rounded-lg flex gap-3 mt-1">
            <input
              id="consent"
              type="checkbox"
              required
              checked={form.consent}
              onChange={e => setForm(p => ({ ...p, consent: e.target.checked }))}
              className="mt-1 h-4 w-4 bg-slate-900 border-white/10 rounded cursor-pointer accent-blue-600 flex-shrink-0"
            />
            <label htmlFor="consent" className="text-xs text-slate-400 cursor-pointer select-none leading-normal">
              I authorize NeuroGuardian AI to evaluate these mock parameters and consent to receive investigational feasibility dossiers in compliance with HIPAA guidelines.
            </label>
          </div>

          <button
            type="submit"
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-[#00d2ff] hover:opacity-90 text-white font-bold font-display rounded-lg shadow-lg shadow-blue-500/20 transition-all text-sm uppercase tracking-wide disabled:opacity-50"
          >
            {generating ? (
              <>
                <Activity className="w-4 h-4 animate-spin text-white" />
                SIMULATING CELLULAR METRIC MODEL...
              </>
            ) : (
              <>
                COMPILE BIOTECH INTEGRATION REPORT
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Structured Feasibility Report Render Output Side (5 cols on large) */}
      <div className="lg:col-span-5 h-full">
        {report ? (
          <div className="glass-panel text-slate-950 rounded-2xl p-6 border-b-2 border-b-[#00d2ff]/40 flex flex-col justify-between h-full bg-slate-50/95 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all animate-in fade-in slide-in-from-right-8 duration-500">
            
            {/* Absolute watermark medical stamp */}
            <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] stroke-blue-900 fill-none stroke-[2]">
                <circle cx="50" cy="50" r="45" />
                <path d="M 25 50 L 35 50 L 42 30 L 52 75 L 58 45 L 68 50 L 75 50" />
              </svg>
            </div>

            <div className="z-10 relative">
              {/* Report Header */}
              <div className="border-b border-slate-300 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-blue-900 text-lg leading-tight uppercase tracking-tight">
                    NEUROGUARDIAN AI
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 tracking-wider">
                    BIOACTIVE PATHWAY REPORT
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded font-mono uppercase">
                    PROVISIONAL
                  </span>
                </div>
              </div>

              {/* Patient and Dossier parameters */}
              <div className="pt-4 pb-3 border-b border-slate-200/60 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block tracking-wide">
                    STAMP SERIAL
                  </span>
                  <span className="font-mono text-slate-700 font-black">{report.id}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block tracking-wide">
                    GENERATED UTC
                  </span>
                  <span className="font-mono text-slate-600 text-[10px]">{report.timestamp}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block tracking-wide">
                    PATIENT/REGISTRANT
                  </span>
                  <span className="font-sans font-bold text-slate-800">{report.patientProfile.name}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block tracking-wide">
                    TARGET LEVEL
                  </span>
                  <span className="font-mono font-bold text-slate-700">{report.patientProfile.severity}</span>
                </div>
              </div>

              {/* Projections Segment */}
              <div className="py-4 border-b border-slate-200/60">
                <span className="text-[10px] font-mono text-slate-400 block tracking-widest uppercase mb-2">
                  ESTIMATED BIO-PHYSIOLOGICAL GAINS
                </span>
                
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Pedal Ulcerization Risk
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {report.projections.ulcerRisk} DECREASE
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Plantar Blood Circulation
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {report.projections.circulationBoost} RECOVERY
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Nerve Signal Velocity
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {report.projections.nerveAcceleration} SPEEDUP
                    </span>
                  </div>
                </div>
              </div>

              {/* Regulatory classification */}
              <div className="pt-3 pb-4">
                <span className="text-[10px] font-mono text-slate-400 block tracking-widest uppercase mb-2">
                  DEVICE SYSTEM PARITY (MOCK ESTIMATES)
                </span>
                <p className="text-xs font-medium text-slate-700">
                  {report.regulatory.systemClass}
                </p>
                <div className="flex justify-between items-center mt-2.5 text-[10px] text-slate-500">
                  <span className="bg-slate-200/60 p-1 rounded font-mono">TRACK: {report.regulatory.fdaTrack}</span>
                  <span className="bg-slate-200/60 p-1 rounded font-mono">GROUP: {report.regulatory.trialGroup}</span>
                </div>
              </div>
            </div>

            {/* Receipt Footer with visual barcodes */}
            <div className="border-t border-slate-300 pt-3 z-10 relative mt-auto flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>PRE-CLINICAL VALIDATION OK</span>
                </div>
                <button
                  onClick={resetForm}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold font-display cursor-pointer hover:underline"
                >
                  Clear & Re-input
                </button>
              </div>

              {/* Graphic Barcode mimicking a biological registry system */}
              <div className="flex items-center justify-between gap-4 mt-1">
                <div className="flex-grow h-7 opacity-80 select-none flex items-center gap-0.5 mt-0.5">
                  <Barcode className="w-full h-full text-slate-700" />
                </div>
                <p className="text-[8px] font-mono text-slate-400 text-right w-1/3 leading-tight uppercase">
                  CLASSIFIED INVESTIGATIONAL BIOCODE 890X-Q
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 h-full min-h-[380px] flex flex-col justify-center items-center text-center border-t border-t-white/10 select-none">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mb-4 shadow-inner text-[#00d2ff]/30 animate-pulse">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-lg text-slate-300">
              No Report Compiled
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
              Complete the Clinical Intake & Feasibility Portal form to synthesize a real-time patient therapeutic report displaying estimated bioelectronic acceleration values.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
