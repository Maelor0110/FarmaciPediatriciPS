import React, { useState } from 'react';
import { 
  AlertTriangle, 
  HeartPulse, 
  Zap, 
  Wind, 
  Flame, 
  Crosshair, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { EMERGENCY_PROTOCOLS, EmergencyProtocol } from '../data/protocols';

interface EmergencyProtocolsViewProps {
  patientWeight: number;
}

export const EmergencyProtocolsView: React.FC<EmergencyProtocolsViewProps> = ({
  patientWeight
}) => {
  const [selectedProtocolId, setSelectedProtocolId] = useState<string>('anafilassi');

  const selectedProtocol = EMERGENCY_PROTOCOLS.find(p => p.id === selectedProtocolId) || EMERGENCY_PROTOCOLS[0];

  const getProtocolIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-red-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Crosshair': return <Crosshair className="w-5 h-5 text-pink-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert Bento */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-rose-500/20 border border-rose-500/30 rounded-2xl shrink-0">
            <ShieldAlert className="w-7 h-7 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black tracking-tight text-white">Codici Emergenza Pediatrica PS</h2>
              <span className="text-[11px] bg-rose-600 text-white font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                Live Algorithm
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Algoritmi step-by-step con calcolo istantaneo di dosaggi, volumi di siringa ed energie di defibrillazione per <strong>{patientWeight} kg</strong>.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl px-5 py-3 text-right shrink-0 shadow-inner">
          <span className="text-[10px] text-slate-400 block uppercase font-extrabold tracking-wider">Paziente Attivo</span>
          <span className="text-2xl font-black text-blue-400 font-mono tracking-tight">{patientWeight} kg</span>
        </div>
      </div>

      {/* Protocol Selection Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {EMERGENCY_PROTOCOLS.map(proto => {
          const isSelected = proto.id === selectedProtocolId;
          return (
            <button
              key={proto.id}
              onClick={() => setSelectedProtocolId(proto.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 shadow-2xs">
                  {getProtocolIcon(proto.iconName)}
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  isSelected ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200/70'
                }`}>
                  {proto.badge.split(' ')[0]}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 leading-snug">
                  {proto.shortTitle}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Protocol Bento Body */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Protocol Header */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-extrabold uppercase tracking-wider bg-rose-600 text-white px-3 py-1 rounded-full">
                {selectedProtocol.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Paziente di {patientWeight} kg
              </span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white">{selectedProtocol.title}</h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {selectedProtocol.description}
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3.5 text-xs text-slate-300 shrink-0 flex items-start space-x-2.5 shadow-inner">
            <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-white block">Fonte & Linee Guida:</span>
              <span className="text-[11px] text-slate-400">{selectedProtocol.guidelineReference}</span>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="p-6 sm:p-8 space-y-6 divide-y divide-slate-100">
          {selectedProtocol.steps.map((step, sIdx) => (
            <div key={sIdx} className={`pt-6 first:pt-0 space-y-4`}>
              
              {/* Step Title and Timing */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-black shadow-xs ${
                    step.priority === 'critica'
                      ? 'bg-rose-100 text-rose-700 border border-rose-300'
                      : 'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}>
                    {sIdx + 1}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{step.title}</h4>
                </div>

                {step.timing && (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{step.timing}</span>
                  </span>
                )}
              </div>

              {/* Action checklist bento pod */}
              <div className="space-y-2 p-3 bg-slate-50/70 rounded-2xl border border-slate-200/60">
                {step.actions.map((act, aIdx) => (
                  <div key={aIdx} className="flex items-start space-x-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

              {/* Calculated Drugs for this step */}
              {step.drugDoseCalculations && (
                <div className="mt-3 space-y-2.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Dosaggi e Preparazioni Calcolati ({patientWeight} kg):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.drugDoseCalculations(patientWeight).map((calc, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-4 rounded-2xl border border-blue-200/80 bg-blue-50/40 shadow-xs space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-extrabold text-slate-900">{calc.name}</h5>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-white border border-blue-200 text-blue-800 shrink-0">
                            {calc.route}
                          </span>
                        </div>

                        <div className="text-lg font-black text-blue-800 tracking-tight font-mono">
                          {calc.calculatedDose}
                        </div>

                        <p className="text-xs text-slate-700 leading-normal font-medium">
                          {calc.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Notes for this step */}
              {step.clinicalNotes && (
                <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-3.5 text-xs text-amber-950 space-y-1">
                  {step.clinicalNotes.map((note, nIdx) => (
                    <div key={nIdx} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <span className="font-medium">{note}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
