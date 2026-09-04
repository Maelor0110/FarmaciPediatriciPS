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
    <header className="bg-slate-950 text-white border-b border-slate-800/80 transition-colors shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section (Responsive Stack on Mobile, Flex Row on Tablet & Desktop) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 py-3 sm:py-4 lg:py-5">
          
          {/* Brand Identity & Title */}
          <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
            <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 md:p-1 shadow-xl shadow-blue-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[13px] sm:rounded-[14px] md:rounded-[22px] flex items-center justify-center">
                <Activity className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 text-teal-400" />
              </div>
            </div>
            
            <div className="min-w-0 flex-1">
              <h1 className="font-black text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight text-white leading-snug">
                Prontuario Rapido Pediatrico PS
              </h1>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base">
                <span className="text-teal-400 font-bold tracking-tight">
                  created by Dott. Maestri Lorenzo
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="hidden sm:inline text-slate-400 font-medium text-xs md:text-sm">
                  Pronto Soccorso ed Emergenza
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Large, Clean, Modern */}
          <nav className="hidden lg:flex items-center bg-slate-900/90 p-2 rounded-2xl xl:rounded-3xl border border-slate-800 shadow-inner space-x-1">
            <button
              onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
              className={`px-4 xl:px-5 py-2.5 xl:py-3 rounded-xl xl:rounded-2xl text-sm xl:text-base font-black flex items-center space-x-2 transition-all ${
                activeTab === 'farmaci' && !showOnlyFavorites
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Pill className="w-4 h-4 xl:w-5 xl:h-5 text-blue-300" />
              <span>Farmaci</span>
            </button>
            <button
              onClick={() => setActiveTab('calcolatore')}
              className={`px-4 xl:px-5 py-2.5 xl:py-3 rounded-xl xl:rounded-2xl text-sm xl:text-base font-black flex items-center space-x-2 transition-all ${
                activeTab === 'calcolatore'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4 xl:w-5 xl:h-5 text-blue-300" />
              <span>Calcolatore</span>
            </button>
            <button
              onClick={() => setActiveTab('emergenze')}
              className={`px-4 xl:px-5 py-2.5 xl:py-3 rounded-xl xl:rounded-2xl text-sm xl:text-base font-black flex items-center space-x-2 transition-all ${
                activeTab === 'emergenze'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <AlertTriangle className="w-4 h-4 xl:w-5 xl:h-5 text-rose-300" />
              <span>Emergenze</span>
            </button>
            <button
              onClick={() => setActiveTab('infusioni')}
              className={`px-4 xl:px-5 py-2.5 xl:py-3 rounded-xl xl:rounded-2xl text-sm xl:text-base font-black flex items-center space-x-2 transition-all ${
                activeTab === 'infusioni'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Droplet className="w-4 h-4 xl:w-5 xl:h-5 text-teal-300" />
              <span>Infusioni</span>
            </button>
            <button
              onClick={() => setActiveTab('lineeguida')}
              className={`px-4 xl:px-5 py-2.5 xl:py-3 rounded-xl xl:rounded-2xl text-sm xl:text-base font-black flex items-center space-x-2 transition-all ${
                activeTab === 'lineeguida'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 xl:w-5 xl:h-5 text-slate-400" />
              <span>Linee Guida</span>
            </button>
          </nav>

          {/* Action Tiles: Preferiti & Peso (Neatly aligned on mobile and desktop) */}
          <div className="flex items-center justify-between sm:justify-end space-x-2.5 md:space-x-3 shrink-0">
            {/* Quick Favorites Filter Tile */}
            <button
              onClick={() => {
                setActiveTab('farmaci');
                setShowOnlyFavorites(!showOnlyFavorites);
              }}
              title="Mostra solo preferiti"
              className={`h-10 sm:h-12 lg:h-14 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm lg:text-base font-black flex items-center space-x-2 transition-all border ${
                showOnlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/90 hover:bg-slate-850 text-slate-300 border-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${showOnlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span>Preferiti</span>
              {favoritesCount > 0 && (
                <span className="bg-amber-400/20 text-amber-300 text-xs sm:text-sm font-black px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg border border-amber-400/40">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Current Patient Weight Indicator */}
            <div className="h-10 sm:h-12 lg:h-14 bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl px-3 sm:px-4 flex items-center space-x-2 shadow-inner">
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase font-black tracking-wider">Peso:</span>
              <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-black text-blue-400 font-mono tracking-tight">{patientWeight} kg</span>
            </div>
          </div>

        </div>

        {/* Medium and Mobile Navigation Bar - Large, simple, finger-friendly */}
        <div className="flex lg:hidden space-x-2 py-2.5 border-t border-slate-800/80 overflow-x-auto text-xs md:text-sm scrollbar-none">
          <button
            onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
            className={`min-h-[44px] px-4 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'farmaci' && !showOnlyFavorites ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-300 bg-slate-900/80 border border-slate-800'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Farmaci</span>
          </button>
          <button
            onClick={() => setActiveTab('calcolatore')}
            className={`min-h-[44px] px-4 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'calcolatore' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-300 bg-slate-900/80 border border-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Calcolatore</span>
          </button>
          <button
            onClick={() => setActiveTab('emergenze')}
            className={`min-h-[44px] px-4 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'emergenze' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-300 bg-slate-900/80 border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergenze</span>
          </button>
          <button
            onClick={() => setActiveTab('infusioni')}
            className={`min-h-[44px] px-4 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'infusioni' ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' : 'text-slate-300 bg-slate-900/80 border border-slate-800'
            }`}
          >
            <Droplet className="w-3.5 h-3.5 text-teal-400" />
            <span>Infusioni</span>
          </button>
          <button
            onClick={() => setActiveTab('lineeguida')}
            className={`min-h-[44px] px-4 py-2 rounded-xl shrink-0 font-black flex items-center space-x-1.5 transition-all ${
              activeTab === 'lineeguida' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-300 bg-slate-900/80 border border-slate-800'
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
