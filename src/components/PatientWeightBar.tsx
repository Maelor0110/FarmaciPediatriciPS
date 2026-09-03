import React from 'react';
import { Calculator, Minus, Plus } from 'lucide-react';
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
  const currentBroselow = BROSELOW_ZONES.find(
    z => weight >= z.minWeight && weight <= z.maxWeight
  );

  const handleAdjust = (delta: number) => {
    const next = Math.max(1, Math.min(80, Number((weight + delta).toFixed(1))));
    setWeight(next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 100) {
      setWeight(Number(val.toFixed(1)));
    }
  };

  return (
    <div className="bg-slate-900/95 border-b border-slate-800 text-white py-3 md:py-4.5 lg:py-5 px-4 md:px-6 lg:px-8 shadow-md backdrop-blur-md sticky top-16 md:top-20 lg:top-22 z-30 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-5">
        
        {/* Weight Input Pod */}
        <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs md:text-sm lg:text-base font-black uppercase tracking-wider text-slate-300 shrink-0">
            Peso Paziente:
          </span>
          
          <div className="flex items-center space-x-2 md:space-x-2.5 bg-slate-800/90 border border-slate-700/90 rounded-2xl p-1 md:p-1.5 shadow-inner">
            <button
              onClick={() => handleAdjust(-1)}
              title="-1 kg"
              className="w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-xl md:rounded-2xl active:scale-95 transition-all"
            >
              <Minus className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex items-center px-3 md:px-4 py-1 md:py-1.5 bg-slate-900/80 rounded-xl md:rounded-2xl border border-slate-700/70 shadow-inner">
              <input
                type="number"
                step="0.1"
                min="1"
                max="80"
                value={weight}
                onChange={handleInputChange}
                className="w-16 md:w-24 lg:w-28 text-center text-xl md:text-3xl lg:text-4xl font-black text-blue-400 bg-transparent border-none outline-none focus:ring-0 tracking-tight font-mono"
              />
              <span className="text-xs md:text-base lg:text-lg font-black text-slate-400 ml-1 md:ml-1.5">kg</span>
            </div>

            <button
              onClick={() => handleAdjust(+1)}
              title="+1 kg"
              className="w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-xl md:rounded-2xl active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Status & Estimator Trigger */}
        <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          {currentBroselow ? (
            <div
              className="flex items-center space-x-2 md:space-x-3 px-3 py-1.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-2xl text-xs md:text-sm lg:text-base font-black border shadow-xs"
              style={{
                backgroundColor: currentBroselow.colorHex + '25',
                borderColor: currentBroselow.colorHex,
                color: currentBroselow.colorHex === '#e2e8f0' ? '#ffffff' : currentBroselow.colorHex
              }}
            >
              <span
                className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full ring-2 ring-white/70 shadow-xs shrink-0"
                style={{ backgroundColor: currentBroselow.colorHex }}
              />
              <span className="tracking-tight">Broselow {currentBroselow.color} ({currentBroselow.typicalAge})</span>
            </div>
          ) : (
            <div className="text-xs md:text-sm lg:text-base font-bold text-slate-300 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-2xl">
              {weight > 36 ? 'Adolescente (>36 kg)' : 'Neonato (<3 kg)'}
            </div>
          )}

          <button
            onClick={onOpenEstimator}
            className="flex items-center space-x-1.5 md:space-x-2 px-3 py-1.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-blue-600/25 text-blue-300 hover:bg-blue-600/35 border border-blue-500/40 rounded-2xl text-xs md:text-sm lg:text-base font-black active:scale-95 transition-all shadow-xs"
          >
            <Calculator className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            <span>Stima Peso</span>
          </button>
        </div>

      </div>
    </div>
  );
};
