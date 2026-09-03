import React from 'react';
import { Calculator, Minus, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { BROSELOW_ZONES } from '../data/categories';

interface PatientWeightBarProps {
  weight: number;
  setWeight: (w: number) => void;
  onOpenEstimator: () => void;
}

const PRESETS = [
  { label: 'Neonato', weight: 3.5, sub: '0 gg' },
  { label: '6 m', weight: 7.0, sub: '6 mesi' },
  { label: '1 a', weight: 10.0, sub: '1 anno' },
  { label: '2 a', weight: 12.0, sub: '2 anni' },
  { label: '3 a', weight: 14.0, sub: '3 anni' },
  { label: '5 a', weight: 18.0, sub: '5 anni' },
  { label: '7 a', weight: 24.0, sub: '7 anni' },
  { label: '10 a', weight: 30.0, sub: '10 anni' },
  { label: '12 a', weight: 40.0, sub: '12 anni' },
  { label: 'Adolesc.', weight: 50.0, sub: '>14 anni' }
];

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
    <div className="bg-slate-900/95 border-b border-slate-800 text-white py-3 px-4 shadow-lg backdrop-blur-md sticky top-16 z-30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        
        {/* Left: Weight Input & Increment Controls Pod */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-1.5 shadow-inner">
            <button
              onClick={() => handleAdjust(-5)}
              title="-5 kg"
              className="px-2.5 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl active:scale-95 transition-all"
            >
              -5
            </button>
            <button
              onClick={() => handleAdjust(-1)}
              title="-1 kg"
              className="p-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-xl active:scale-95 transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleAdjust(-0.5)}
              title="-0.5 kg"
              className="px-2 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl active:scale-95 transition-all"
            >
              -0.5
            </button>

            {/* Editable numeric weight display bento pod */}
            <div className="flex items-center px-2.5 py-0.5 bg-slate-900/60 rounded-xl border border-slate-700/50">
              <input
                type="number"
                step="0.1"
                min="1"
                max="80"
                value={weight}
                onChange={handleInputChange}
                className="w-16 text-center text-xl font-black text-blue-400 bg-transparent border-none outline-none focus:ring-0 tracking-tight"
              />
              <span className="text-xs font-extrabold text-slate-400 ml-0.5">kg</span>
            </div>

            <button
              onClick={() => handleAdjust(+0.5)}
              title="+0.5 kg"
              className="px-2 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl active:scale-95 transition-all"
            >
              +0.5
            </button>
            <button
              onClick={() => handleAdjust(+1)}
              title="+1 kg"
              className="p-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-xl active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleAdjust(+5)}
              title="+5 kg"
              className="px-2.5 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl active:scale-95 transition-all"
            >
              +5
            </button>
          </div>

          {/* Broselow color indicator bento tile if within 3-36 kg */}
          {currentBroselow ? (
            <div
              className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl text-xs font-bold border shadow-xs"
              style={{
                backgroundColor: currentBroselow.colorHex + '25',
                borderColor: currentBroselow.colorHex,
                color: currentBroselow.colorHex === '#e2e8f0' ? '#ffffff' : currentBroselow.colorHex
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/60 shadow-xs shrink-0"
                style={{ backgroundColor: currentBroselow.colorHex }}
              />
              <span className="tracking-tight">Broselow: {currentBroselow.color} ({currentBroselow.weightRange})</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/70">
              <span>{weight > 36 ? 'Peso > 36 kg (Fascia Adolescente)' : 'Neonato piccolo'}</span>
            </div>
          )}

          {/* Stima Peso button bento tile */}
          <button
            onClick={onOpenEstimator}
            className="flex items-center space-x-1.5 px-3 py-2 bg-blue-600/25 text-blue-300 hover:bg-blue-600/35 border border-blue-500/40 rounded-2xl text-xs font-bold active:scale-95 transition-all shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Stima da Età (APLS)</span>
          </button>
        </div>

        {/* Right: Quick Age / Weight Presets Bento Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider mr-1 shrink-0">
            Fasce:
          </span>
          {PRESETS.map(p => {
            const isSelected = Math.abs(weight - p.weight) < 0.1;
            return (
              <button
                key={p.label}
                onClick={() => setWeight(p.weight)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/70'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
