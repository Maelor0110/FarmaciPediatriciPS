import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  Trash2, 
  Copy, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { DrugItem, CalculatedDose } from '../types';

export interface DoubleCheckItem {
  id: string;
  drug: DrugItem;
  dose: CalculatedDose;
  patientWeight: number;
  addedAt: Date;
}

interface DoubleCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: DoubleCheckItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  patientWeight: number;
}

const CHECKLIST_ITEMS = [
  'Identità del paziente e peso corporeo verificati',
  'Fiala/confezione, integrità e data di scadenza controllate',
  'Concentrazione principio attivo e calcolo volume verificati',
  'Via di somministrazione e tempo di infusione corretti',
  'Dose massima non superata',
  'Assenza di allergie note o controindicazioni'
];

export const DoubleCheckModal: React.FC<DoubleCheckModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  patientWeight
}) => {
  const [checkedRules, setCheckedRules] = useState<{ [key: number]: boolean }>({});
  const [copiedRecord, setCopiedRecord] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleCheck = (index: number) => {
    setCheckedRules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCopyRecord = () => {
    const dateStr = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    let text = `=== SCHEDA DOPPIO CONTROLLO SOMMINISTRAZIONE PEDIATRICA (PS) ===\n`;
    text += `Data/Ora: ${new Date().toLocaleDateString('it-IT')} ${dateStr}\n`;
    text += `Peso Paziente verificato: ${patientWeight} kg\n\n`;
    text += `FARMACI IN PREPARAZIONE / SOMMINISTRAZIONE:\n`;

    items.forEach((item, i) => {
      text += `${i + 1}. ${item.drug.name}\n`;
      text += `   - Indicazione/Dose: ${item.dose.label}\n`;
      text += `   - Dose calcolata: ${item.dose.calculatedValue} (${item.dose.route})\n`;
      if (item.dose.volumeInfo) text += `   - Volume/Preparazione: ${item.dose.volumeInfo}\n`;
      text += `   - Formula applicata: ${item.dose.rawFormula}\n\n`;
    });

    text += `VERIFICHE DI SICUREZZA ESEGUITE (DOPPIO CONTROLLO INFERMIERE - MEDICO):\n`;
    CHECKLIST_ITEMS.forEach((c, idx) => {
      text += `[${checkedRules[idx] ? 'X' : ' '}] ${c}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedRecord(true);
    setTimeout(() => setCopiedRecord(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header Bento */}
        <div className="flex items-center justify-between px-6 py-4.5 bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-black text-base text-white tracking-tight">Doppio Controllo Medico-Infermieristico</h3>
              <p className="text-[11px] text-slate-400 font-medium">Verifica di sicurezza indipendente prima della somministrazione in PS</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Patient Weight Bento Pod */}
          <div className="flex items-center justify-between p-3.5 bg-slate-100/90 rounded-2xl border border-slate-200/70">
            <div className="text-xs text-slate-700 font-medium flex items-center space-x-2">
              <span className="text-[10px] bg-slate-200 text-slate-700 font-black uppercase tracking-wider px-2 py-0.5 rounded-md">Paziente Attivo</span>
              <strong className="font-mono font-black text-blue-700">{patientWeight} kg</strong>
            </div>
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-800 font-extrabold flex items-center space-x-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Svuota lista</span>
              </button>
            )}
          </div>

          {/* Selected Drugs List */}
          {items.length === 0 ? (
            <div className="text-center py-10 text-slate-400 space-y-2 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-6">
              <AlertCircle className="w-9 h-9 mx-auto text-slate-300" />
              <p className="text-sm font-black text-slate-700">Nessun farmaco ancora aggiunto al doppio controllo.</p>
              <p className="text-xs text-slate-500 font-medium">
                Clicca su "+ Doppio Controllo" nelle schede dei farmaci per verificare dosaggi e volumi prima dell'infusione.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                Farmaci in Preparazione ({items.length}):
              </span>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/70 flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-900">{item.drug.name}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200/70">
                        {item.dose.route}
                      </span>
                    </div>

                    <div className="text-base font-black text-blue-700 font-mono tracking-tight">
                      {item.dose.calculatedValue}
                    </div>

                    {item.dose.volumeInfo && (
                      <p className="text-xs text-slate-700 font-medium">
                        {item.dose.volumeInfo}
                      </p>
                    )}

                    <div className="text-[11px] text-slate-500 font-mono bg-white p-1.5 rounded-lg border border-slate-200/70 inline-block">
                      Formula: {item.dose.rawFormula}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="Rimuovi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Safety Checklist Bento Pod */}
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-5 space-y-3.5">
            <div className="flex items-center space-x-2 text-emerald-950 font-black text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Checklist di Sicurezza Obbligatoria (Doppia Firma):</span>
            </div>

            <div className="space-y-2.5">
              {CHECKLIST_ITEMS.map((rule, idx) => {
                const isChecked = !!checkedRules[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className="w-full flex items-start space-x-2.5 text-left text-xs text-slate-800 hover:text-slate-950 transition-all cursor-pointer bg-white/70 hover:bg-white p-2.5 rounded-xl border border-emerald-100"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    )}
                    <span className={isChecked ? 'line-through text-slate-400 font-medium' : 'font-semibold'}>
                      {rule}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer actions Bento */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-100 transition-all"
          >
            Chiudi
          </button>

          {items.length > 0 && (
            <button
              onClick={handleCopyRecord}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center space-x-2 shadow-xs active:scale-95 transition-all"
            >
              {copiedRecord ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiato negli Appunti!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copia Verbale per Cartella Clinica</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
