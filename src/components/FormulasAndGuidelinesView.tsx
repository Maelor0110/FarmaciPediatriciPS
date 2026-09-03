import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Scale, 
  Syringe, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { GUIDELINES_CONTENT } from '../data/guidelines';
import { BROSELOW_ZONES } from '../data/categories';

export const FormulasAndGuidelinesView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Premessa & Avvertenza Clinica Bento Card */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-3xl p-6 shadow-xs">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-amber-100/80 rounded-2xl shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-900">
              Premessa Clinica & Avvertenze di Responsabilità Medica
            </h3>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              {GUIDELINES_CONTENT.warningText}
            </p>
          </div>
        </div>
      </div>

      {/* Formule Stima Peso Bento Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-3 text-slate-900 font-black text-lg border-b border-slate-100 pb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Scale className="w-5 h-5" />
          </div>
          <span>Formule Rapide di Stima del Peso Corporeo in Emergenza</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDELINES_CONTENT.weightFormulas.map((wf, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">{wf.name}</h4>
              <div className="text-sm font-mono font-black text-blue-700 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                {wf.formula}
              </div>
              <p className="text-xs text-slate-600 font-medium">{wf.notes}</p>
            </div>
          ))}
        </div>

        {/* Broselow tape details Bento sub-grid */}
        <div className="pt-3 border-t border-slate-100">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3">
            Zone Colore Nastro Pediatrico di Broselow:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {BROSELOW_ZONES.map(z => (
              <div
                key={z.color}
                className="p-3 rounded-2xl border text-center text-xs space-y-1 shadow-2xs"
                style={{
                  backgroundColor: z.colorHex + '20',
                  borderColor: z.colorHex
                }}
              >
                <div className="font-black text-xs" style={{ color: z.colorHex === '#e2e8f0' ? '#334155' : z.colorHex }}>{z.color}</div>
                <div className="text-[10px] text-slate-600 font-extrabold">{z.weightRange}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vie di Somministrazione in Emergenza Bento Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-3 text-slate-900 font-black text-lg border-b border-slate-100 pb-4">
          <div className="p-2 bg-teal-50 text-teal-600 rounded-xl border border-teal-100">
            <Syringe className="w-5 h-5" />
          </div>
          <span>Vie di Somministrazione in Emergenza-Urgenza</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDELINES_CONTENT.routesNotes.map((rn, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 space-y-1.5">
              <h4 className="text-xs font-black text-teal-900 uppercase tracking-wide">{rn.route}</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{rn.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Principi di Sicurezza & Regola del Cap Bento Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-3 text-slate-900 font-black text-lg border-b border-slate-100 pb-4">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span>Principi di Sicurezza e Prevenzione degli Errori Terapeutici</span>
        </div>

        <div className="space-y-2.5">
          {GUIDELINES_CONTENT.safetyPrinciples.map((sp, idx) => (
            <div key={idx} className="flex items-start space-x-3 text-xs text-slate-800 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100/90">
              <div className="w-6 h-6 rounded-xl bg-emerald-200/80 text-emerald-800 flex items-center justify-center font-black text-[11px] shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="leading-relaxed font-semibold">{sp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fonti Scientifiche & Linee Guida Bento Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-3 text-slate-900 font-black text-lg border-b border-slate-100 pb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>Linee Guida di Riferimento & Fonti Ufficiali</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDELINES_CONTENT.scientificSources.map((source, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 space-y-1.5">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">{source.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{source.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
