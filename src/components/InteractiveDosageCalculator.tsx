import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Search,
  Check,
  Copy,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Info,
  Scale,
  Syringe,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Printer,
  CheckCircle2,
  Droplet,
  Flame,
  Bookmark
} from 'lucide-react';
import { ALL_DRUGS, getDrugById } from '../data/drugs';
import { DRUG_CATEGORIES, BROSELOW_ZONES } from '../data/categories';
import { DrugItem, CalculatedDose } from '../types';

interface InteractiveDosageCalculatorProps {
  patientWeight: number;
  setPatientWeight: (w: number) => void;
  selectedDrugId?: string;
  onSelectDrugId?: (id: string) => void;
  onAddToDoubleCheck: (drug: DrugItem, dose: CalculatedDose) => void;
  onOpenEstimator: () => void;
  onViewDrugCatalog?: (drugId: string) => void;
}

// Common emergency & frequent drugs for quick access chips
const QUICK_DRUGS = [
  { id: 'paracetamolo', name: 'Paracetamolo' },
  { id: 'ibuprofene', name: 'Ibuprofene' },
  { id: 'adrenalina', name: 'Adrenalina' },
  { id: 'midazolam', name: 'Midazolam' },
  { id: 'amoxicillina-clavulanico', name: 'Amoxicillina / Clav.' },
  { id: 'ceftriaxone', name: 'Ceftriaxone' },
  { id: 'salbutamolo-inalatorio', name: 'Salbutamolo Inal.' },
  { id: 'desametasone', name: 'Desametasone' },
  { id: 'morfina', name: 'Morfina' },
  { id: 'diazepam', name: 'Diazepam' },
  { id: 'ondansetron', name: 'Ondansetron' },
  { id: 'glucosio-10', name: 'Glucosio 10%' }
];

export const InteractiveDosageCalculator: React.FC<InteractiveDosageCalculatorProps> = ({
  patientWeight,
  setPatientWeight,
  selectedDrugId: propSelectedDrugId,
  onSelectDrugId,
  onAddToDoubleCheck,
  onOpenEstimator,
  onViewDrugCatalog
}) => {
  // Active selected drug
  const [selectedDrugId, setSelectedDrugId] = useState<string>(
    propSelectedDrugId || 'paracetamolo'
  );

  // Sync prop changes
  useEffect(() => {
    if (propSelectedDrugId && propSelectedDrugId !== selectedDrugId) {
      setSelectedDrugId(propSelectedDrugId);
    }
  }, [propSelectedDrugId]);

  // Search query & category filter for drug selection
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Interactive custom preparation volume calculator state
  const [customConcMg, setCustomConcMg] = useState<string>('');
  const [customConcMl, setCustomConcMl] = useState<string>('1');

  // Selected drug object
  const selectedDrug = useMemo(() => {
    return getDrugById(selectedDrugId) || ALL_DRUGS[0];
  }, [selectedDrugId]);

  // Calculated doses for current weight
  const calculatedDoses = useMemo(() => {
    return selectedDrug.calculateDoses(patientWeight);
  }, [selectedDrug, patientWeight]);

  // Broselow zone
  const currentBroselow = useMemo(() => {
    return BROSELOW_ZONES.find(
      z => patientWeight >= z.minWeight && patientWeight <= z.maxWeight
    );
  }, [patientWeight]);

  // Filtered drugs for dropdown / search
  const filteredDrugsList = useMemo(() => {
    let list = ALL_DRUGS;
    if (selectedCategory !== 'all') {
      list = list.filter(d => d.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(d => {
        const matchName = d.name.toLowerCase().includes(q);
        const matchComm = d.commercialNames?.some(c => c.toLowerCase().includes(q));
        const matchInd = d.indications.some(i => i.toLowerCase().includes(q));
        return matchName || matchComm || matchInd;
      });
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const handleSelectDrug = (id: string) => {
    setSelectedDrugId(id);
    if (onSelectDrugId) onSelectDrugId(id);
  };

  const handleWeightChange = (newW: number) => {
    const clamped = Math.max(1, Math.min(100, Math.round(newW * 10) / 10));
    setPatientWeight(clamped);
  };

  const handleCopyDose = (dose: CalculatedDose, index: number) => {
    const text = `PRESCRIZIONE PEDIATRICA (PS)
Farmaco: ${selectedDrug.name} (${selectedDrug.commercialNames?.join(', ') || 'Generico'})
Paziente: ${patientWeight} kg
Indicazione / Via: ${dose.label} [${dose.route}]
Dose Calcolata: ${dose.calculatedValue}
Formula di Linea Guida: ${dose.rawFormula}
Dose Massima per Somministrazione: ${dose.maxDoseCap || 'Non specificata'}
Preparazione & Concentrazione: ${dose.volumeInfo || 'Standard'}
Frequenza: ${dose.frequencyOrDuration || 'Come prescritto'}
Note: ${dose.alertNote || selectedDrug.adverseEffectsAndNotes[0] || 'N/A'}`;

    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
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
    <div className="space-y-6">
      
      {/* Top Bento Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-md border border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex items-start space-x-3.5">
          <div className="p-3.5 bg-blue-500/20 border border-blue-500/30 rounded-2xl shrink-0 text-blue-400">
            <Calculator className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Calcolatore Interattivo di Dosaggio Pediatrico
              </h2>
              <span className="text-[11px] bg-blue-600 text-white font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                Linee Guida PS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-medium">
              Inserisci il peso corporeo in kg e seleziona un principio attivo per calcolare istantaneamente 
              il dosaggio esatto (mg/kg o mcg/kg), la <strong>dose massima per somministrazione</strong>, 
              le unità di preparazione (mg/mL) e i volumi in siringa.
            </p>
          </div>
        </div>

        {/* Active Patient Bento Capsule */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl px-5 py-3.5 shrink-0 flex items-center justify-between lg:flex-col lg:items-end gap-2 shadow-inner">
          <span className="text-[11px] text-slate-400 uppercase font-black tracking-wider">
            Peso Attivo Paziente
          </span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-black text-blue-400 font-mono tracking-tight">
              {patientWeight}
            </span>
            <span className="text-sm font-extrabold text-slate-300">kg</span>
          </div>
          {currentBroselow && (
            <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-300">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentBroselow.colorHex }}
              />
              <span>Fascia {currentBroselow.color} ({currentBroselow.typicalAge})</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Interactive Controls Grid (2 Columns: Left Weight & Selector, Right Result Display) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: Weight Input & Drug Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Bento Card 1: Patient Weight Input */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                  <Scale className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  1. Inserisci Peso Paziente (kg)
                </h3>
              </div>
              <button
                onClick={onOpenEstimator}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
              >
                <span>Stima APLS</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Direct Number Input + Steppers */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWeightChange(patientWeight - 1)}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-lg transition-all active:scale-95 flex items-center justify-center shrink-0 border border-slate-200"
                  title="-1 kg"
                >
                  -1
                </button>
                <button
                  onClick={() => handleWeightChange(patientWeight - 0.5)}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-all active:scale-95 flex items-center justify-center shrink-0 border border-slate-200"
                  title="-0.5 kg"
                >
                  -0.5
                </button>

                <div className="relative flex-1">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="0.1"
                    value={patientWeight}
                    onChange={e => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) handleWeightChange(val);
                    }}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-2xl text-center font-mono text-2xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-inner transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 pointer-events-none">
                    kg
                  </span>
                </div>

                <button
                  onClick={() => handleWeightChange(patientWeight + 0.5)}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-all active:scale-95 flex items-center justify-center shrink-0 border border-slate-200"
                  title="+0.5 kg"
                >
                  +0.5
                </button>
                <button
                  onClick={() => handleWeightChange(patientWeight + 1)}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-lg transition-all active:scale-95 flex items-center justify-center shrink-0 border border-slate-200"
                  title="+1 kg"
                >
                  +1
                </button>
              </div>

              {/* Slider for smooth weight scrolling */}
              <div className="space-y-1 pt-1">
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="0.5"
                  value={patientWeight}
                  onChange={e => handleWeightChange(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1">
                  <span>2 kg (Neonato)</span>
                  <span>14 kg (Toddler)</span>
                  <span>30 kg (Bambino)</span>
                  <span>60 kg (Adolescente)</span>
                </div>
              </div>

              {/* Fast Age/Weight Preset Pills */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-1.5">
                  Pesi di Riferimento Rapidi:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Neonato', w: 3.5 },
                    { label: '6 m', w: 7 },
                    { label: '1 anno', w: 10 },
                    { label: '2 anni', w: 12 },
                    { label: '4 anni', w: 16 },
                    { label: '6 anni', w: 20 },
                    { label: '8 anni', w: 25 },
                    { label: '10 anni', w: 30 },
                    { label: '12 anni', w: 40 },
                    { label: '14 anni', w: 50 }
                  ].map(item => (
                    <button
                      key={item.w}
                      onClick={() => handleWeightChange(item.w)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border transition-all ${
                        patientWeight === item.w
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      {item.label} ({item.w} kg)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Drug Selection (Search & List) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
                  <Syringe className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  2. Seleziona Farmaco dall'Elenco
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {filteredDrugsList.length} disponibili
              </span>
            </div>

            {/* Quick Emergency Drug Chips */}
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-1.5">
                Farmaci più Frequenti in PS:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {QUICK_DRUGS.map(d => {
                  const isCurrent = selectedDrugId === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleSelectDrug(d.id)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all ${
                        isCurrent
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-blue-500/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input for All Drugs */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cerca per principio attivo o brand..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-lg font-bold shrink-0 border transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                Tutti
              </button>
              {DRUG_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {cat.shortName}
                </button>
              ))}
            </div>

            {/* Scrollable List of Drugs */}
            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100">
              {filteredDrugsList.map(drug => {
                const isSelected = drug.id === selectedDrugId;
                return (
                  <button
                    key={drug.id}
                    onClick={() => handleSelectDrug(drug.id)}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50/90 border border-blue-300/80 shadow-xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-xs font-black ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                          {drug.name}
                        </span>
                        {drug.priorityEmergency && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" title="Emergenza Vitale" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate max-w-[240px]">
                        {drug.commercialNames?.join(', ') || drug.indications[0]}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {drug.routes.join('/')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Calculation Results, Max Dose & Preparation Units (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Selected Drug Hero Banner */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                    Sez. {selectedDrug.sectionNum} • {selectedDrug.sectionTitle}
                  </span>
                  {selectedDrug.priorityEmergency && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-md shadow-2xs">
                      Salvavita PS
                    </span>
                  )}
                  {selectedDrug.highRisk && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-md border border-red-200">
                      Alto Rischio
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {selectedDrug.name}
                </h3>
                {selectedDrug.commercialNames && selectedDrug.commercialNames.length > 0 && (
                  <p className="text-xs text-slate-500 font-medium">
                    Nomi commerciali / formulazioni: <strong className="text-slate-800 font-bold">{selectedDrug.commercialNames.join(', ')}</strong>
                  </p>
                )}
              </div>

              {/* View full drug card link */}
              {onViewDrugCatalog && (
                <button
                  onClick={() => onViewDrugCatalog(selectedDrug.id)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200/70 shrink-0 self-start transition-all"
                >
                  Vedi Scheda Completa ↗
                </button>
              )}
            </div>

            {/* Quick Indications & Summary Dose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Indicazioni Principali in PS:
                </span>
                <p className="font-semibold text-slate-800 leading-snug">
                  {selectedDrug.indications.join(', ')}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Vie di Somministrazione:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedDrug.routes.map(r => (
                    <span key={r} className={`px-2 py-0.5 rounded-md font-black text-[10px] border ${getRouteBadgeColor(r)}`}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* CALCULATED DOSES LIST FOR THIS DRUG */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Dosaggi Appropriati per {patientWeight} kg ({calculatedDoses.length} indicazioni/vie):</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-semibold">
                Formule ufficiali da manuale
              </span>
            </div>

            {calculatedDoses.map((dose, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all space-y-4"
              >
                {/* Header of Dose Card */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black border ${getRouteBadgeColor(dose.route)}`}>
                      {dose.route}
                    </span>
                    <h5 className="text-base font-extrabold text-slate-900 tracking-tight">
                      {dose.label}
                    </h5>
                  </div>

                  {dose.frequencyOrDuration && (
                    <span className="inline-flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{dose.frequencyOrDuration}</span>
                    </span>
                  )}
                </div>

                {/* THE DOSAGE DISPLAY - BENTO METRIC HERO */}
                <div className="bg-gradient-to-br from-blue-50/70 via-slate-50/50 to-teal-50/30 rounded-2xl p-5 border border-blue-200/80 space-y-3 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 block">
                        Dose Calcolata da Somministrare:
                      </span>
                      <div className="text-3xl sm:text-4xl font-black text-blue-700 tracking-tight font-mono mt-0.5">
                        {dose.calculatedValue}
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Formula Standard (Linee Guida):
                      </span>
                      <div className="text-xs font-mono font-extrabold text-slate-800 bg-white/90 px-2.5 py-1 rounded-lg border border-slate-200/80 inline-block mt-0.5 shadow-2xs">
                        {dose.rawFormula}
                      </div>
                    </div>
                  </div>

                  {/* DOSE MASSIMA PER SOMMINISTRAZIONE (CAP) BENTO NOTIFICATION */}
                  <div className={`p-3.5 rounded-xl border flex items-start space-x-2.5 ${
                    dose.isMaxDoseReached
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-amber-50/90 border-amber-200/80 text-amber-950'
                  }`}>
                    {dose.isMaxDoseReached ? (
                      <ShieldAlert className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    )}
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <strong className="text-xs font-black uppercase tracking-wider">
                          Dose Massima per Somministrazione:
                        </strong>
                        {dose.isMaxDoseReached && (
                          <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Massimale Applicato
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold leading-relaxed">
                        {dose.maxDoseCap || 'Verificare dosaggio cumulativo giornaliero e parametri d’organo.'}
                      </p>
                      {dose.isMaxDoseReached && (
                        <p className="text-[11px] font-bold text-rose-700 pt-0.5">
                          ⚠️ Il calcolo teorico basato sui mg/kg supererebbe la dose limite raccomandata per singola somministrazione pediatrica: è stato applicato il tetto massimo consentito.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* UNITÀ DI MISURA PER LA PREPARAZIONE & VOLUMI IN SIRINGA */}
                  {dose.volumeInfo && (
                    <div className="p-3.5 bg-white/95 rounded-xl border border-blue-200/90 space-y-1.5 shadow-2xs">
                      <div className="flex items-center space-x-1.5 text-blue-900 font-black text-xs uppercase tracking-wider">
                        <Droplet className="w-4 h-4 text-blue-600" />
                        <span>Unità di Misura per la Preparazione & Concentrazioni:</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed font-mono">
                        {dose.volumeInfo}
                      </p>
                      {dose.preparationAdvice && (
                        <p className="text-[11px] text-slate-600 italic leading-snug">
                          {dose.preparationAdvice}
                        </p>
                      )}
                    </div>
                  )}

                </div>

                {/* CLINICAL ALERT OR ADVICE (IF PRESENT) */}
                {dose.alertNote && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start space-x-2 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{dose.alertNote}</span>
                  </div>
                )}

                {/* BOTTOM ACTION BUTTONS BAR */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="text-[11px] text-slate-500 font-medium">
                    Paziente: <strong className="text-slate-800">{patientWeight} kg</strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyDose(dose, idx)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl flex items-center space-x-1.5 transition-all shadow-2xs"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copiato</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copia Dati</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onAddToDoubleCheck(selectedDrug, dose)}
                      className="px-3.5 py-1.5 text-xs font-black text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300/80 rounded-xl flex items-center space-x-1.5 transition-all shadow-2xs active:scale-95"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>+ Doppio Controllo</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* INTERACTIVE CONCENTRATION & VOLUME CONVERTER (CUSTOM WARD FORMULATIONS) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                  <Droplet className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Calcolatore di Volume per Concentrazione Personalizzata
                </h4>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-800 font-extrabold px-2 py-0.5 rounded-md border border-indigo-200">
                Formula: V = D / C
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Se nel tuo reparto è presente una fiala, flacone o sciroppo con concentrazione differente da quella standard (es. diversa marca o diluizione ospedaliera), inserisci qui la concentrazione per ricavare i mL esatti da somministrare.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block">
                  Dose Desiderata:
                </label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-sm text-blue-700">
                  {calculatedDoses[0]?.numericDose 
                    ? `${calculatedDoses[0].numericDose} ${calculatedDoses[0].unit}`
                    : calculatedDoses[0]?.calculatedValue || 'Seleziona dose'}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block">
                  Concentrazione Flacone:
                </label>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="number"
                    placeholder="es. 50"
                    value={customConcMg}
                    onChange={e => setCustomConcMg(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-bold text-slate-500 shrink-0">mg/mL</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block">
                  Volume da Aspirare:
                </label>
                <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl font-mono font-black text-sm text-indigo-900">
                  {customConcMg && parseFloat(customConcMg) > 0 && calculatedDoses[0]?.numericDose
                    ? `${((calculatedDoses[0].numericDose) / parseFloat(customConcMg)).toFixed(2)} mL`
                    : 'Inserisci mg/mL'}
                </div>
              </div>
            </div>
          </div>

          {/* ADVERSE EFFECTS, SAFETY PEARLS & ANTIDOTE */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Avvertenze di Sicurezza & Perle Cliniche ({selectedDrug.name})
              </h4>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed pl-1">
              {selectedDrug.adverseEffectsAndNotes.map((note, nIdx) => (
                <li key={nIdx} className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
              {selectedDrug.antidote && (
                <li className="flex items-start space-x-2 pt-1 text-emerald-400 font-bold">
                  <span>★</span>
                  <span>Antidoto Specifico in Caso di Tossicità: <strong>{selectedDrug.antidote}</strong></span>
                </li>
              )}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
