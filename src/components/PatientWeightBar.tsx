import React, { useState, useEffect } from 'react';
import { Calculator, Minus, Plus, Scale } from 'lucide-react';
import { BROSELOW_ZONES } from '../data/categories';

interface PatientWeightBarProps {
  weight: number;
  setWeight: (w: number) => void;
  onOpenEstimator: () => void;
}

export const PatientWeightBar: React.FC<PatientWeightBarProps> = ({
  weight,
  setWeight,
  onOpenEstimator
}) => {
  const [inputVal, setInputVal] = useState(String(weight));

  useEffect(() => {
    setInputVal(String(weight));
  }, [weight]);

  const currentBroselow = BROSELOW_ZONES.find(
    z => weight >= z.minWeight && weight <= z.maxWeight
  );

  const handleAdjust = (delta: number) => {
    const next = Math.max(1, Math.min(100, Number((weight + delta).toFixed(1))));
    setWeight(next);
    setInputVal(String(next));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(',', '.');
    setInputVal(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 120) {
      setWeight(Number(parsed.toFixed(1)));
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(inputVal.replace(',', '.'));
    if (isNaN(parsed) || parsed <= 0) {
      setInputVal(String(weight));
    } else {
      const clamped = Math.max(1, Math.min(100, Number(parsed.toFixed(1))));
      setWeight(clamped);
      setInputVal(String(clamped));
    }
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white py-3 md:py-4 lg:py-5 px-4 md:px-6 lg:px-8 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-5">
        
        {/* Simple & Clean Weight Input */}
        <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-2 text-slate-300 shrink-0">
            <Scale className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            <span className="text-xs md:text-sm lg:text-base font-black uppercase tracking-wider">
              Peso Paziente:
            </span>
          </div>
          
          <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-2xl p-1 md:p-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => handleAdjust(-1)}
              title="-1 kg"
              aria-label="Diminuisci peso di 1 kg"
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-200 rounded-xl transition-all active:scale-95"
            >
              <Minus className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="flex items-center px-3 md:px-4">
              <input
                type="text"
                inputMode="decimal"
                value={inputVal}
                onFocus={e => e.target.select()}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-label="Peso in chilogrammi"
                className="w-16 md:w-20 lg:w-24 text-center text-2xl md:text-3xl lg:text-4xl font-black text-blue-400 bg-transparent border-none outline-none focus:ring-0 tracking-tight font-mono"
              />
              <span className="text-sm md:text-base lg:text-lg font-bold text-slate-400 ml-1">kg</span>
            </div>

            <button
              type="button"
              onClick={() => handleAdjust(+1)}
              title="+1 kg"
              aria-label="Aumenta peso di 1 kg"
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-200 rounded-xl transition-all active:scale-95"
            >
              <Plus className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Status & Estimator Trigger */}
        <div className="flex items-center space-x-2.5 md:space-x-3.5 w-full sm:w-auto justify-between sm:justify-end">
          {currentBroselow ? (
            <div
              className="flex items-center space-x-2 md:space-x-3 px-3.5 py-2 md:px-5 md:py-2.5 rounded-2xl text-xs md:text-sm lg:text-base font-black border shadow-xs"
              style={{
                backgroundColor: currentBroselow.colorHex + '25',
                borderColor: currentBroselow.colorHex,
                color: currentBroselow.colorHex === '#e2e8f0' ? '#ffffff' : currentBroselow.colorHex
              }}
            >
              <span
                className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full ring-2 ring-white/70 shadow-xs shrink-0"
                style={{ backgroundColor: currentBroselow.colorHex }}
              />
              <span className="tracking-tight">Broselow {currentBroselow.color} ({currentBroselow.typicalAge})</span>
            </div>
          ) : (
            <div className="text-xs md:text-sm lg:text-base font-bold text-slate-300 bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 md:px-5 md:py-2.5 rounded-2xl">
              {weight > 36 ? 'Paziente Adolescente (>36 kg)' : 'Neonato (<3 kg)'}
            </div>
          )}

          <button
            type="button"
            onClick={onOpenEstimator}
            className="flex items-center space-x-1.5 md:space-x-2 px-3.5 py-2 md:px-5 md:py-2.5 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/40 rounded-2xl text-xs md:text-sm lg:text-base font-black active:scale-95 transition-all shadow-xs shrink-0"
          >
            <Calculator className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            <span>Stima Peso (APLS)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
