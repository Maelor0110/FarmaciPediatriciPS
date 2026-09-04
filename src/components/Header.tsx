import React from 'react';
import { Activity, AlertTriangle, FileText, Bookmark, Droplet, Calculator, Pill } from 'lucide-react';

export type ActiveTab = 'farmaci' | 'calcolatore' | 'emergenze' | 'infusioni' | 'lineeguida';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (val: boolean) => void;
  patientWeight: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  showOnlyFavorites,
  setShowOnlyFavorites,
  patientWeight
}) => {
  return (
    <header className="bg-slate-950 text-white border-b border-slate-800 transition-colors shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Bar: Brand + Navigation + Action Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 md:py-4 gap-3 md:gap-6">
          
          {/* Brand Identity & Title */}
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Activity className="w-6 h-6 md:w-7 md:h-7 text-teal-400" />
              </div>
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight text-white leading-tight truncate">
                  Prontuario Rapido Pediatrico PS
                </h1>
                <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30 shrink-0">
                  PS / Urgenza
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-x-2 text-xs sm:text-sm mt-0.5">
                <span className="text-teal-400 font-bold tracking-tight">
                  created by Dott. Maestri Lorenzo
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="hidden md:inline text-slate-400 font-medium text-xs">
                  Pronto Soccorso ed Emergenza Pediatrica
                </span>
              </div>
            </div>
          </div>

          {/* Desktop & Tablet Navigation: Integrated, High-contrast, Professional */}
          <nav className="hidden md:flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner space-x-1 shrink-0">
            <button
              onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
              className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-black flex items-center space-x-1.5 transition-all ${
                activeTab === 'farmaci' && !showOnlyFavorites
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Pill className="w-4 h-4 text-blue-300" />
              <span>Farmaci</span>
            </button>
            <button
              onClick={() => setActiveTab('calcolatore')}
              className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-black flex items-center space-x-1.5 transition-all ${
                activeTab === 'calcolatore'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-300" />
              <span>Calcolatore</span>
            </button>
            <button
              onClick={() => setActiveTab('emergenze')}
              className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-black flex items-center space-x-1.5 transition-all ${
                activeTab === 'emergenze'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                  : 'text-rose-300 hover:text-white hover:bg-rose-950/40'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Emergenze</span>
            </button>
            <button
              onClick={() => setActiveTab('infusioni')}
              className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-black flex items-center space-x-1.5 transition-all ${
                activeTab === 'infusioni'
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Droplet className="w-4 h-4 text-teal-300" />
              <span>Infusioni</span>
            </button>
            <button
              onClick={() => setActiveTab('lineeguida')}
              className={`px-3.5 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-black flex items-center space-x-1.5 transition-all ${
                activeTab === 'lineeguida'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Linee Guida</span>
            </button>
          </nav>

          {/* Right Utility Actions: Preferiti & Indicatore Peso */}
          <div className="flex items-center justify-between md:justify-end space-x-2 sm:space-x-3 shrink-0">
            {/* Quick Favorites Filter Button */}
            <button
              onClick={() => {
                setActiveTab('farmaci');
                setShowOnlyFavorites(!showOnlyFavorites);
              }}
              title={showOnlyFavorites ? "Mostra tutti i farmaci" : "Mostra solo preferiti"}
              aria-label="Filtra preferiti"
              className={`h-10 px-3.5 rounded-xl text-xs lg:text-sm font-black flex items-center space-x-2 transition-all border ${
                showOnlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                  : 'bg-slate-900/90 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showOnlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span>Preferiti</span>
              {favoritesCount > 0 && (
                <span className="bg-amber-400/20 text-amber-300 text-xs font-black px-1.5 py-0.5 rounded-md border border-amber-400/40">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Current Patient Weight Display Pill */}
            <div 
              className="h-10 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 flex items-center space-x-2 shadow-inner"
              title="Peso paziente impostato"
            >
              <span className="text-[11px] text-slate-400 uppercase font-black tracking-wider">Peso:</span>
              <span className="text-sm md:text-base font-black text-blue-400 font-mono tracking-tight">{patientWeight} kg</span>
            </div>
          </div>

        </div>

        {/* Mobile & Small Screen Segmented Navigation Sub-Bar */}
        <div className="flex md:hidden space-x-1.5 py-2.5 border-t border-slate-800/80 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'farmaci' && !showOnlyFavorites ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Farmaci</span>
          </button>
          <button
            onClick={() => setActiveTab('calcolatore')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'calcolatore' ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Calcolatore</span>
          </button>
          <button
            onClick={() => setActiveTab('emergenze')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'emergenze' ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30' : 'text-rose-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergenze</span>
          </button>
          <button
            onClick={() => setActiveTab('infusioni')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'infusioni' ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <Droplet className="w-3.5 h-3.5 text-teal-400" />
            <span>Infusioni</span>
          </button>
          <button
            onClick={() => setActiveTab('lineeguida')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'lineeguida' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Linee Guida</span>
          </button>
        </div>

      </div>
    </header>
  );
};

