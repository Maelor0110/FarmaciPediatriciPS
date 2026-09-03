import React, { useState } from 'react';
import { X, Check, Calculator, Info } from 'lucide-react';
import { BROSELOW_ZONES } from '../data/categories';

interface WeightEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyWeight: (w: number) => void;
}

export const WeightEstimatorModal: React.FC<WeightEstimatorModalProps> = ({
  isOpen,
  onClose,
  onApplyWeight
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'infant' | 'child'>('child');
  const [months, setMonths] = useState<number>(6);
  const [years, setYears] = useState<number>(4);

  // Infant formula (0-12 mesi): (mesi / 2) + 4
  const infantWeight = Number(((months / 2) + 4).toFixed(1));

  // APLS formula (1-10 anni): (anni + 4) * 2
  const childWeight = Number(((years + 4) * 2).toFixed(1));

  const currentResult = mode === 'infant' ? infantWeight : childWeight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        
        {/* Header Bento */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">
              <Calculator className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-black text-base text-white tracking-tight">Stima Rapida Peso Corporeo</h3>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">APLS & Broselow</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Mode Switcher Bento Segment */}
          <div className="flex rounded-2xl bg-slate-100/90 p-1 border border-slate-200/80">
            <button
              onClick={() => setMode('child')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${
                mode === 'child'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Formula APLS (1 - 10 anni)
            </button>
            <button
              onClick={() => setMode('infant')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${
                mode === 'infant'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lattante (0 - 12 mesi)
            </button>
          </div>

          {/* Child APLS Selector */}
          {mode === 'child' ? (
            <div className="space-y-3.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-black text-slate-800 uppercase tracking-wider">
                <span>Età del bambino:</span>
                <span className="text-base font-black text-blue-700 font-mono">{years} {years === 1 ? 'anno' : 'anni'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={years}
                onChange={e => setYears(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1 anno</span>
                <span>5 anni</span>
                <span>10 anni</span>
              </div>
              <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-blue-100 font-medium">
                <strong className="text-blue-950 font-black">Formula APLS:</strong> Peso (kg) = (Età + 4) × 2 = ({years} + 4) × 2 = <strong className="text-blue-700 font-black">{childWeight} kg</strong>
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-black text-slate-800 uppercase tracking-wider">
                <span>Età del lattante:</span>
                <span className="text-base font-black text-teal-700 font-mono">{months} mesi</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={months}
                onChange={e => setMonths(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>Neonato (0 m)</span>
                <span>6 mesi</span>
                <span>12 mesi</span>
              </div>
              <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-teal-100 font-medium">
                <strong className="text-teal-950 font-black">Formula Lattante:</strong> Peso (kg) ≈ (Mesi ÷ 2) + 4 = ({months} ÷ 2) + 4 = <strong className="text-teal-700 font-black">{infantWeight} kg</strong>
                {months === 0 && ' (Neonato a termine circa 3,5 kg)'}
              </p>
            </div>
          )}

          {/* Quick Result & Apply Bento Pod */}
          <div className="bg-slate-900 text-white rounded-2xl p-4.5 flex items-center justify-between shadow-xs border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block font-extrabold uppercase tracking-wider">Peso Stimato:</span>
              <span className="text-3xl font-black text-blue-400 font-mono tracking-tight">{currentResult} kg</span>
            </div>
            <button
              onClick={() => {
                onApplyWeight(currentResult);
                onClose();
              }}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl flex items-center space-x-2 shadow-xs active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Applica Questo Peso</span>
            </button>
          </div>

          {/* Broselow Tape zones selection Bento Sub-grid */}
          <div className="pt-2 border-t border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600">
                Oppure seleziona da Fascia Broselow:
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
              {BROSELOW_ZONES.map(z => (
                <button
                  key={z.color}
                  onClick={() => {
                    const avg = Number(((z.minWeight + z.maxWeight) / 2).toFixed(1));
                    onApplyWeight(avg);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl border text-left text-xs transition-all hover:scale-102 shadow-2xs"
                  style={{
                    backgroundColor: z.colorHex + '20',
                    borderColor: z.colorHex
                  }}
                >
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs" style={{ backgroundColor: z.colorHex }} />
                    <span className="font-black text-[11px] truncate" style={{ color: z.colorHex === '#e2e8f0' ? '#334155' : z.colorHex }}>{z.color}</span>
                  </div>
                  <span className="text-[10px] text-slate-600 block font-extrabold">{z.weightRange}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center space-x-2.5 font-medium">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Usare il peso reale non appena il paziente è pesabile o se riferito con precisione dai genitori.</span>
        </div>

      </div>
    </div>
  );
};
