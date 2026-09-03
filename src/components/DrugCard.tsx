import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  AlertTriangle, 
  Copy, 
  Check, 
  Bookmark, 
  PlusCircle, 
  LifeBuoy, 
  Info,
  Clock,
  Calculator
} from 'lucide-react';
import { DrugItem, CalculatedDose } from '../types';

interface DrugCardProps {
  drug: DrugItem;
  patientWeight: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToDoubleCheck: (drug: DrugItem, dose: CalculatedDose) => void;
  isAddedToDoubleCheck: boolean;
  onOpenCalculator?: (drugId: string) => void;
}

export const DrugCard: React.FC<DrugCardProps> = ({
  drug,
  patientWeight,
  isFavorite,
  onToggleFavorite,
  onAddToDoubleCheck,
  isAddedToDoubleCheck,
  onOpenCalculator
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const calculatedDoses = drug.calculateDoses(patientWeight);

  const handleCopy = (dose: CalculatedDose, index: number) => {
    const textToCopy = `${drug.name} [Paziente ${patientWeight} kg]: ${dose.label} -> ${dose.calculatedValue} (${dose.route}). Formula: ${dose.rawFormula}. ${dose.volumeInfo || ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getRouteBadgeColor = (route: string) => {
    const r = route.toUpperCase();
    if (r.includes('EV') || r.includes('IO')) return 'bg-red-50 text-red-700 border-red-200';
    if (r.includes('IM')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (r.includes('IN') || r.includes('BUCCALE')) return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    if (r.includes('INALATORIA')) return 'bg-teal-50 text-teal-700 border-teal-200';
    if (r.includes('OS') || r.includes('PR')) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div 
      id={`drug-${drug.id}`}
      className={`rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        drug.priorityEmergency 
          ? 'border-rose-300 shadow-sm shadow-rose-100/50 bg-white ring-1 ring-rose-200/50' 
          : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Top Bento Header: Name, Section, Badges */}
      <div className="p-5 border-b border-slate-100 bg-white">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200/60">
                Sez. {drug.sectionNum}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {drug.name}
              </h3>
              {drug.highRisk && (
                <span className="flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider bg-red-100/80 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                  <ShieldAlert className="w-3 h-3 text-red-600" />
                  <span>Alto Rischio</span>
                </span>
              )}
              {drug.priorityEmergency && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-rose-600 to-red-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                  Emergenza Vitale
                </span>
              )}
            </div>

            {/* Commercial brand names if any */}
            {drug.commercialNames && drug.commercialNames.length > 0 && (
              <p className="text-xs text-slate-600 font-medium truncate">
                Brand / Form.: <span className="text-slate-800 font-semibold">{drug.commercialNames.join(', ')}</span>
              </p>
            )}
          </div>

          {/* Action buttons: Calculator & Favorite */}
          <div className="flex items-center space-x-1.5 shrink-0">
            {onOpenCalculator && (
              <button
                onClick={() => onOpenCalculator(drug.id)}
                className="px-2.5 py-2 rounded-2xl transition-all border text-blue-600 bg-blue-50 border-blue-200/80 hover:bg-blue-100 flex items-center space-x-1 text-xs font-black shadow-2xs"
                title="Apri nel Calcolatore di Dosaggio"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Calcola</span>
              </button>
            )}

            <button
              onClick={() => onToggleFavorite(drug.id)}
              className={`p-2.5 rounded-2xl transition-all border ${
                isFavorite
                  ? 'text-amber-500 bg-amber-50 border-amber-200 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-slate-600 bg-slate-50 border-slate-200/70 hover:bg-slate-100'
              }`}
              title={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Calculated Doses Bento Box */}
      <div className="p-5 bg-gradient-to-b from-slate-50/50 via-white to-white space-y-3.5 flex-1">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
            <span>Dose Calcolata per Paziente {patientWeight} kg:</span>
          </span>
          <span className="text-[11px] font-normal text-slate-400 lowercase hidden sm:inline">verifica sempre dose max</span>
        </div>

        <div className="space-y-3">
          {calculatedDoses.map((dose, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:border-blue-300 transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black tracking-wide border ${getRouteBadgeColor(dose.route)}`}>
                      {dose.route}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">{dose.label}</h4>
                  </div>
                </div>

                {/* Dose Value in Big Display */}
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black text-blue-700 tracking-tight font-mono">
                    {dose.calculatedValue}
                  </div>
                  {dose.isMaxDoseReached && (
                    <span className="inline-block text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                      Dose Massima Applicata
                    </span>
                  )}
                </div>
              </div>

              {/* Volume and preparation details bento cell */}
              {dose.volumeInfo && (
                <div className="text-xs text-slate-800 font-semibold bg-blue-50/70 p-2.5 rounded-xl border border-blue-100/90 flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>{dose.volumeInfo}</span>
                </div>
              )}

              {/* Preparation Advice */}
              {dose.preparationAdvice && (
                <div className="text-xs text-slate-600 italic bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                  {dose.preparationAdvice}
                </div>
              )}

              {/* Formula & Frequency row */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100 gap-1 font-medium">
                <span className="font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">{dose.rawFormula}</span>
                {dose.frequencyOrDuration && (
                  <span className="flex items-center space-x-1 text-slate-600 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dose.frequencyOrDuration}</span>
                  </span>
                )}
              </div>

              {/* Action Bar for this specific dose */}
              <div className="flex items-center justify-end space-x-2 pt-1">
                <button
                  onClick={() => handleCopy(dose, idx)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 rounded-xl flex items-center space-x-1.5 transition-all"
                  title="Copia negli appunti"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copiato</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copia</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onAddToDoubleCheck(drug, dose)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-all border ${
                    isAddedToDoubleCheck
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-xs'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{isAddedToDoubleCheck ? 'Nel Controllo' : '+ Doppio Controllo'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expand / Collapse Clinical Details Bento Compartment */}
      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900 transition-all py-1"
        >
          <span>
            {expanded ? 'Nascondi Dettagli Clinici & Controindicazioni' : 'Mostra Indicazioni, Controindicazioni & Note'}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expanded && (
          <div className="pt-3 pb-2 space-y-3 border-t border-slate-200/80 text-xs mt-2">
            {/* Indicazioni */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/70">
              <h5 className="font-extrabold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                Indicazioni Principali:
              </h5>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                {drug.indications.map((ind, i) => (
                  <li key={i}>{ind}</li>
                ))}
              </ul>
            </div>

            {/* Controindicazioni & Cautele (Highlighted warning box) */}
            <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-3.5">
              <div className="flex items-center space-x-1.5 text-amber-900 font-extrabold text-[11px] uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Controindicazioni & Cautele di Sicurezza:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-amber-950 font-medium">
                {drug.contraindications.map((ci, i) => (
                  <li key={i}>{ci}</li>
                ))}
              </ul>
            </div>

            {/* Effetti avversi & Note Pratiche */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/70">
              <h5 className="font-extrabold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                Note di Somministrazione & Effetti Avversi:
              </h5>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                {drug.adverseEffectsAndNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Antidote Badge if exists */}
            {drug.antidote && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-center space-x-2 text-purple-900">
                <LifeBuoy className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="font-bold">
                  Antidoto specifico disponibile: <strong className="font-black text-purple-950">{drug.antidote}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
