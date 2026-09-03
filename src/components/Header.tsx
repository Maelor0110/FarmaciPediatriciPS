import React from 'react';
import { Activity, AlertTriangle, FileText, Bookmark, Droplet, Calculator } from 'lucide-react';

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
    <header className="bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800/80 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-22">
          {/* Logo & Title Bento Block */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 shadow-lg shadow-blue-500/25 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-900/40 rounded-[14px] flex items-center justify-center backdrop-blur-xs">
                <Activity className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-teal-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <span className="font-black text-base sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-white">
                  Pediatria PS
                </span>
                <span className="text-[10px] md:text-xs lg:text-sm font-black uppercase tracking-wider bg-rose-500/25 text-rose-300 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-rose-500/40 shadow-xs">
                  Urgenza
                </span>
              </div>
              <p className="text-xs md:text-sm lg:text-base text-slate-300 font-medium tracking-tight mt-0.5">
                Prontuario Rapido • <span className="text-teal-400 font-bold">created by Dott. Maestri Lorenzo</span>
              </p>
            </div>
          </div>

          {/* Segmented Bento Navigation Pill */}
          <nav className="hidden md:flex items-center bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 shadow-inner">
            <button
              onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
              className={`px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-xl text-xs md:text-sm lg:text-base font-bold transition-all ${
                activeTab === 'farmaci' && !showOnlyFavorites
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              Farmaci & Dosi
            </button>
            <button
              onClick={() => setActiveTab('calcolatore')}
              className={`px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-xl text-xs md:text-sm lg:text-base font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'calcolatore'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Calculator className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              <span>Calcolatore Dosi</span>
            </button>
            <button
              onClick={() => setActiveTab('emergenze')}
              className={`px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-xl text-xs md:text-sm lg:text-base font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'emergenze'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
              <span>Codici Emergenza</span>
            </button>
            <button
              onClick={() => setActiveTab('infusioni')}
              className={`px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-xl text-xs md:text-sm lg:text-base font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'infusioni'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Droplet className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
              <span>Infusioni Pompa</span>
            </button>
            <button
              onClick={() => setActiveTab('lineeguida')}
              className={`px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-xl text-xs md:text-sm lg:text-base font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'lineeguida'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
              <span>Formule & Fonti</span>
            </button>
          </nav>

          {/* Right Action Bento Tiles */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Favorites filter tile */}
            <button
              onClick={() => {
                setActiveTab('farmaci');
                setShowOnlyFavorites(!showOnlyFavorites);
              }}
              title="Mostra solo preferiti"
              className={`h-9 md:h-12 px-3 md:px-4 rounded-xl md:rounded-2xl text-xs md:text-sm lg:text-base font-bold flex items-center space-x-2 transition-all border ${
                showOnlyFavorites
                  ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/70'
              }`}
            >
              <Bookmark className={`w-4 h-4 md:w-5 md:h-5 ${showOnlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Preferiti</span>
              {favoritesCount > 0 && (
                <span className="bg-amber-400/20 text-amber-300 text-xs md:text-sm font-black px-2 py-0.5 rounded-lg border border-amber-400/40">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Patient weight indicator bento tile */}
            <div className="h-9 md:h-12 bg-slate-800/90 border border-slate-700 rounded-xl md:rounded-2xl px-3 md:px-4 flex items-center space-x-2 shadow-inner">
              <span className="text-[10px] md:text-xs lg:text-sm text-slate-400 uppercase font-black tracking-wider">Peso:</span>
              <span className="text-xs sm:text-base md:text-lg lg:text-xl font-black text-blue-400 font-mono tracking-tight">{patientWeight} kg</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation sub-bar */}
        <div className="flex md:hidden space-x-1 py-2 border-t border-slate-800/80 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
            className={`px-3 py-1.5 rounded-xl shrink-0 font-semibold transition-all ${
              activeTab === 'farmaci' && !showOnlyFavorites ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Farmaci
          </button>
          <button
            onClick={() => setActiveTab('calcolatore')}
            className={`px-3 py-1.5 rounded-xl shrink-0 font-semibold flex items-center space-x-1 transition-all ${
              activeTab === 'calcolatore' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            <Calculator className="w-3 h-3 text-blue-400" />
            <span>Calcolatore</span>
          </button>
          <button
            onClick={() => setActiveTab('emergenze')}
            className={`px-3 py-1.5 rounded-xl shrink-0 font-semibold flex items-center space-x-1 transition-all ${
              activeTab === 'emergenze' ? 'bg-rose-600 text-white font-bold' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Emergenze</span>
          </button>
          <button
            onClick={() => setActiveTab('infusioni')}
            className={`px-3 py-1.5 rounded-xl shrink-0 font-semibold flex items-center space-x-1 transition-all ${
              activeTab === 'infusioni' ? 'bg-teal-600 text-white font-bold' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            <Droplet className="w-3 h-3 text-teal-400" />
            <span>Infusioni</span>
          </button>
          <button
            onClick={() => setActiveTab('lineeguida')}
            className={`px-3 py-1.5 rounded-xl shrink-0 font-semibold transition-all ${
              activeTab === 'lineeguida' ? 'bg-slate-700 text-white font-bold' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Formule & Fonti
          </button>
        </div>
      </div>
    </header>
  );
};
