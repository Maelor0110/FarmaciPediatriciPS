import React, { useState } from 'react';
import { Droplet, Info, AlertTriangle, Play, RefreshCw } from 'lucide-react';

interface InfusionCalculatorViewProps {
  patientWeight: number;
}

interface InfusionDrug {
  id: string;
  name: string;
  category: string;
  defaultDoseRate: number;
  unit: string;
  minDose: number;
  maxDose: number;
  step: number;
  standardPrepDescription: string;
  calculateMlPerHour: (doseRate: number, weight: number) => {
    mlPerHour: number;
    syringeInfo: string;
    warning?: string;
  };
}

const INFUSION_DRUGS: InfusionDrug[] = [
  {
    id: 'noradrenalina',
    name: 'Noradrenalina Infusione Continua',
    category: 'Vasopressore per Shock Settico / Distributivo',
    defaultDoseRate: 0.1,
    unit: 'mcg/kg/min',
    minDose: 0.05,
    maxDose: 1.5,
    step: 0.05,
    standardPrepDescription: 'Diluizione Standard Siringa 50 mL: 1 mg (1 fiala) in 50 mL Glucosata 5% (conc: 20 mcg/mL) oppure "Regola Aurea del Peso": (0,3 × Peso kg) in mg in 50 mL (1 mL/h = 0,1 mcg/kg/min).',
    calculateMlPerHour: (doseRate, weight) => {
      // Using standard 20 mcg/mL (1 mg in 50 mL G5%)
      const mcgPerMin = doseRate * weight;
      const mcgPerHour = mcgPerMin * 60;
      const mlPerHour = Number((mcgPerHour / 20).toFixed(2));
      return {
        mlPerHour,
        syringeInfo: `Con siringa da 1 mg in 50 mL G5% (20 mcg/mL): impostare pompa a ${mlPerHour} mL/ora. (Dose totale erogata: ${mcgPerMin.toFixed(2)} mcg/min)`,
        warning: 'Somministrare preferibilmente in CVC (accesso venoso centrale). In estrema emergenza in vena periferica di grosso calibro monitorando stravaso.'
      };
    }
  },
  {
    id: 'insulina-dka',
    name: 'Insulina Regolare (DKA Protocol)',
    category: 'Chetoacidosi Diabetica (ISPAD 2022)',
    defaultDoseRate: 0.05,
    unit: 'UI/kg/ora',
    minDose: 0.03,
    maxDose: 0.1,
    step: 0.01,
    standardPrepDescription: 'Diluizione Standard 1 UI/mL: Aspirare 50 UI di Insulina Rapida (Actrapid o Humulin R) e portare a 50 mL con SF 0,9% in siringa da 50 mL.',
    calculateMlPerHour: (doseRate, weight) => {
      const uiPerHour = Number((doseRate * weight).toFixed(2));
      // Since concentration is 1 UI/mL, mL/h = UI/h!
      const mlPerHour = uiPerHour;
      return {
        mlPerHour,
        syringeInfo: `Con siringa 50 UI in 50 mL SF (1 UI/mL): ${uiPerHour} UI/h = impostare ${mlPerHour} mL/ora.`,
        warning: 'MAI FARE BOLO INIZIALE! Avviare ALMENO 1 ora dopo l\'inizio dell\'idratazione EV. Se glicemia scende < 250 mg/dL, aggiungere glucosata ai liquidi ma NON fermare l\'insulina.'
      };
    }
  },
  {
    id: 'salbutamolo-ev',
    name: 'Salbutamolo Infusione EV Continua',
    category: 'Broncodilatatore per Crisi Asmatica Severa Refrattaria',
    defaultDoseRate: 1.0,
    unit: 'mcg/kg/min',
    minDose: 0.5,
    maxDose: 5.0,
    step: 0.5,
    standardPrepDescription: 'Diluizione: 5 mg (1 fiala EV da 5 mg o 10 fiale da 0,5 mg) in 50 mL Glucosata 5% o SF (concentrazione = 100 mcg/mL).',
    calculateMlPerHour: (doseRate, weight) => {
      const mcgPerMin = doseRate * weight;
      const mcgPerHour = mcgPerMin * 60;
      const mlPerHour = Number((mcgPerHour / 100).toFixed(2));
      return {
        mlPerHour,
        syringeInfo: `Con siringa a 100 mcg/mL (5 mg in 50 mL): impostare pompa a ${mlPerHour} mL/ora. (Dose totale erogata: ${mcgPerMin.toFixed(1)} mcg/min)`,
        warning: 'Monitoraggio continuo ECG e PA. Rischio tachicardia marcata, ipokaliemia e acidosi lattica transitoria.'
      };
    }
  },
  {
    id: 'morfina-continua',
    name: 'Morfina Solfato Infusione Continua',
    category: 'Analgesia e Sedazione Avanzata',
    defaultDoseRate: 20,
    unit: 'mcg/kg/ora',
    minDose: 10,
    maxDose: 40,
    step: 5,
    standardPrepDescription: 'Diluizione: 10 mg (1 fiala) in 50 mL SF 0,9% (concentrazione = 0,2 mg/mL = 200 mcg/mL).',
    calculateMlPerHour: (doseRate, weight) => {
      const mcgPerHour = doseRate * weight;
      const mlPerHour = Number((mcgPerHour / 200).toFixed(2));
      return {
        mlPerHour,
        syringeInfo: `Con siringa da 10 mg in 50 mL SF (200 mcg/mL): impostare pompa a ${mlPerHour} mL/ora.`,
        warning: 'Disporre sempre al letto del paziente dell\'antidoto NALOXONE. Monitoraggio continuo SpO2 e frequenza respiratoria.'
      };
    }
  },
  {
    id: 'magnesio-solfato-ev',
    name: 'Magnesio Solfato EV in 20 Minuti',
    category: 'Broncodilatatore Crisi Asmatica / Ipomagnesemia',
    defaultDoseRate: 40,
    unit: 'mg/kg in 20 min',
    minDose: 25,
    maxDose: 50,
    step: 5,
    standardPrepDescription: 'Bolo controllato in pompa siringa o infusore in 20 minuti. Max 2000 mg (2 g). Soluzione al 10% (1 fiala 10 mL = 1000 mg = 1 g, cioè 100 mg/mL).',
    calculateMlPerHour: (doseRate, weight) => {
      const totalMg = Math.min(Math.round(doseRate * weight), 2000);
      const pureMlOf10Pct = Number((totalMg / 100).toFixed(1));
      // Infundere in 20 minuti significa velocità oraria x 3
      const mlPerHour = Number((pureMlOf10Pct * 3).toFixed(1));
      return {
        mlPerHour,
        syringeInfo: `Dose calcolata: ${totalMg} mg (= ${pureMlOf10Pct} mL di sol. 10%). Se aspirati puri in siringa da 20 mL: impostare ${mlPerHour} mL/h per 20 min (volume totale infuso: ${pureMlOf10Pct} mL). Oppure diluire in 50 mL SF e infondere in 20 min (velocità 150 mL/h).`,
        warning: 'Monitoraggio PA e riflessi osteotendinei. Se ipotensione: rallentare la velocità di infusione.'
      };
    }
  }
];

export const InfusionCalculatorModal: React.FC<InfusionCalculatorViewProps> = ({
  patientWeight
}) => {
  const [selectedDrugId, setSelectedDrugId] = useState<string>('noradrenalina');
  const [customDoseRate, setCustomDoseRate] = useState<number | null>(null);

  const selectedDrug = INFUSION_DRUGS.find(d => d.id === selectedDrugId) || INFUSION_DRUGS[0];
  const activeRate = customDoseRate !== null ? customDoseRate : selectedDrug.defaultDoseRate;

  const result = selectedDrug.calculateMlPerHour(activeRate, patientWeight);

  const handleSelectDrug = (id: string) => {
    setSelectedDrugId(id);
    const drug = INFUSION_DRUGS.find(d => d.id === id);
    if (drug) setCustomDoseRate(drug.defaultDoseRate);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Bento */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-teal-500/20 border border-teal-500/30 rounded-2xl shrink-0">
            <Droplet className="w-7 h-7 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black tracking-tight">Calcolatore Infusioni Continue in Pompa Siringa</h2>
              <span className="text-[11px] bg-teal-500 text-slate-950 font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                50 mL Syringe
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Calcolo esatto della velocità in mL/ora (pompa siringa standard da 50 mL) per farmaci vasoattivi, insulina DKA e sedativi per paziente di <strong>{patientWeight} kg</strong>.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl px-5 py-3 text-right shrink-0 shadow-inner">
          <span className="text-[10px] text-slate-400 block uppercase font-extrabold tracking-wider">Peso Paziente</span>
          <span className="text-2xl font-black text-teal-400 font-mono tracking-tight">{patientWeight} kg</span>
        </div>
      </div>

      {/* Drug Picker Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {INFUSION_DRUGS.map(d => (
          <button
            key={d.id}
            onClick={() => handleSelectDrug(d.id)}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              d.id === selectedDrugId
                ? 'bg-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700 hover:border-slate-300 shadow-xs'
            }`}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 block mb-1.5">
              {d.category.split(' ')[0]}
            </span>
            <h4 className="text-xs font-black text-slate-900 leading-snug">
              {d.name}
            </h4>
          </button>
        ))}
      </div>

      {/* Calculator Bento Body */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        
        {/* Drug Title & Details */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600">
              {selectedDrug.category}
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedDrug.name}</h3>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 font-medium">
            Range raccomandato: <strong className="font-extrabold text-slate-900">{selectedDrug.minDose} - {selectedDrug.maxDose} {selectedDrug.unit}</strong>
          </div>
        </div>

        {/* Dilution Protocol Bento Pod */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs text-slate-800 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-blue-900 font-extrabold uppercase tracking-wider text-[11px]">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Istruzioni di Diluizione Standard:</span>
          </div>
          <p className="leading-relaxed text-slate-700 font-medium">
            {selectedDrug.standardPrepDescription}
          </p>
        </div>

        {/* Dose Slider & Manual Input Bento Pod */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Dose Desiderata ({selectedDrug.unit}):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step={selectedDrug.step}
                min={selectedDrug.minDose}
                max={selectedDrug.maxDose}
                value={activeRate}
                onChange={e => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) setCustomDoseRate(val);
                }}
                className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-center font-black text-teal-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono shadow-xs"
              />
              <span className="text-xs font-extrabold text-slate-600">{selectedDrug.unit}</span>
            </div>
          </div>

          <input
            type="range"
            min={selectedDrug.minDose}
            max={selectedDrug.maxDose}
            step={selectedDrug.step}
            value={activeRate}
            onChange={e => setCustomDoseRate(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>Min: {selectedDrug.minDose} {selectedDrug.unit}</span>
            <span>Default: {selectedDrug.defaultDoseRate} {selectedDrug.unit}</span>
            <span>Max: {selectedDrug.maxDose} {selectedDrug.unit}</span>
          </div>
        </div>

        {/* Calculation Result Display (Bento Hero Box) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xs text-teal-400 uppercase font-extrabold tracking-wider block">
                Velocità di Infusione Pompa Siringa (mL/ora):
              </span>
              <div className="text-4xl sm:text-5xl font-black text-teal-300 tracking-tight mt-1 font-mono">
                {result.mlPerHour} <span className="text-xl font-extrabold text-teal-100 font-sans">mL/h</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block font-medium">Paziente</span>
              <span className="text-lg font-black text-white font-mono">{patientWeight} kg</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed font-medium">
            {result.syringeInfo}
          </div>
        </div>

        {/* Warning / Precautions */}
        {result.warning && (
          <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-950 flex items-start space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <strong className="block font-extrabold uppercase tracking-wider text-[11px] text-amber-900 mb-0.5">Avvertenza Clinica & Monitoraggio:</strong>
              <span className="leading-relaxed font-medium">{result.warning}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
