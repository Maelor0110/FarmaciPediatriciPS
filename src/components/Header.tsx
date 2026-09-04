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
    <header className="bg-slate-950 text-white border-b border-slate-800 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand & Author on the Left, Quick Utilities on the Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 border-b border-slate-800/80 gap-3 sm:gap-4">
          
          {/* Brand Identity & Medical Reference */}
          <div className="flex items-center space-x-3.5 sm:space-x-4 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 shadow-xl shadow-blue-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Activity className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-teal-400" />
              </div>
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center space-x-2.5 flex-wrap">
                <h1 className="font-black text-lg sm:text-2xl md:text-3xl tracking-tight text-white leading-tight">
                  Prontuario Rapido Pediatrico PS
                </h1>
                <span className="inline-flex items-center text-[10px] sm:text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/35 shrink-0">
                  Urgenza PS
                </span>
              </div>
              
              <div className="flex items-center flex-wrap gap-x-2.5 text-xs sm:text-sm md:text-base mt-1">
                <span className="text-teal-300 font-bold tracking-tight">
                  created by Dott. Maestri Lorenzo
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-medium">
                  Pronto Soccorso ed Emergenza Pediatrica
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 self-end sm:self-center shrink-0">
            {/* Quick Favorites Filter Button */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('farmaci');
                setShowOnlyFavorites(!showOnlyFavorites);
              }}
              title={showOnlyFavorites ? "Mostra tutti i farmaci" : "Mostra solo i farmaci salvati nei preferiti"}
              aria-label="Filtra preferiti"
              className={`h-10 sm:h-12 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black flex items-center space-x-2 transition-all border shadow-xs ${
                showOnlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-amber-500/20 ring-1 ring-amber-400/30'
                  : 'bg-slate-900/90 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${showOnlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span className="font-bold">Preferiti</span>
              {favoritesCount > 0 && (
                <span className="bg-amber-400/25 text-amber-300 text-xs font-black px-2 py-0.5 rounded-md border border-amber-400/40">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Quick Patient Weight Pill Indicator */}
            <div 
              className="h-10 sm:h-12 bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 flex items-center space-x-2 shadow-inner"
              title="Peso attualmente impostato"
            >
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase font-black tracking-wider">Peso:</span>
              <span className="text-sm sm:text-base md:text-lg font-black text-blue-400 font-mono tracking-tight">{patientWeight} kg</span>
            </div>
          </div>

        </div>

        {/* Bottom Row: Symmetrical, Linear Navigation Bar (5 Equal Tabs) */}
        <div className="py-2.5 sm:py-3">
          <nav className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 md:gap-3" aria-label="Sezioni del prontuario">
            
            {/* Tab 1: Farmaci */}
            <button
              type="button"
              onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
              className={`col-span-1 min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-black flex items-center justify-center space-x-2 transition-all border ${
                activeTab === 'farmaci' && !showOnlyFavorites
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <Pill className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'farmaci' && !showOnlyFavorites ? 'text-white' : 'text-blue-400'}`} />
              <span className="tracking-tight whitespace-nowrap">Farmaci & Dosi</span>
            </button>

            {/* Tab 2: Calcolatore */}
            <button
              type="button"
              onClick={() => setActiveTab('calcolatore')}
              className={`col-span-1 min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-black flex items-center justify-center space-x-2 transition-all border ${
                activeTab === 'calcolatore'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <Calculator className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'calcolatore' ? 'text-white' : 'text-blue-400'}`} />
              <span className="tracking-tight whitespace-nowrap">Calcolatore</span>
            </button>

            {/* Tab 3: Codici Emergenza */}
            <button
              type="button"
              onClick={() => setActiveTab('emergenze')}
              className={`col-span-1 min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-black flex items-center justify-center space-x-2 transition-all border ${
                activeTab === 'emergenze'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                  : 'bg-slate-900/80 hover:bg-rose-950/40 text-slate-300 border-slate-800 hover:text-rose-200'
              }`}
            >
              <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'emergenze' ? 'text-white' : 'text-rose-400'}`} />
              <span className="tracking-tight whitespace-nowrap">Emergenze</span>
            </button>

            {/* Tab 4: Infusioni */}
            <button
              type="button"
              onClick={() => setActiveTab('infusioni')}
              className={`col-span-1 min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-black flex items-center justify-center space-x-2 transition-all border ${
                activeTab === 'infusioni'
                  ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <Droplet className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'infusioni' ? 'text-white' : 'text-teal-400'}`} />
              <span className="tracking-tight whitespace-nowrap">Infusioni</span>
            </button>

            {/* Tab 5: Linee Guida */}
            <button
              type="button"
              onClick={() => setActiveTab('lineeguida')}
              className={`col-span-2 sm:col-span-1 min-h-[44px] sm:min-h-[48px] px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-black flex items-center justify-center space-x-2 transition-all border ${
                activeTab === 'lineeguida'
                  ? 'bg-slate-700 text-white border-slate-600 shadow-md'
                  : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <FileText className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'lineeguida' ? 'text-white' : 'text-slate-400'}`} />
              <span className="tracking-tight whitespace-nowrap">Linee Guida</span>
            </button>

          </nav>
        </div>

      </div>
    </header>
  );
};

