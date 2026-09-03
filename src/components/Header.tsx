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
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title Bento Block */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900/40 rounded-[14px] flex items-center justify-center backdrop-blur-xs">
                <Activity className="w-5 h-5 text-teal-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">Pediatria PS</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                  Urgenza
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Prontuario Rapido • <span className="text-teal-400/90 font-semibold">created by Dott. Maestri Lorenzo</span>
              </p>
            </div>
          </div>

          {/* Segmented Bento Navigation Pill */}
          <nav className="hidden md:flex items-center bg-slate-800/70 p-1 rounded-2xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => { setActiveTab('farmaci'); setShowOnlyFavorites(false); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'farmaci' && !showOnlyFavorites
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Farmaci & Dosi
            </button>
            <button
              onClick={() => setActiveTab('calcolatore')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'calcolatore'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span>Calcolatore Dosi</span>
            </button>
            <button
              onClick={() => setActiveTab('emergenze')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'emergenze'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Codici Emergenza</span>
            </button>
            <button
              onClick={() => setActiveTab('infusioni')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'infusioni'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Droplet className="w-3.5 h-3.5 text-teal-400" />
              <span>Infusioni Pompa</span>
            </button>
            <button
              onClick={() => setActiveTab('lineeguida')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'lineeguida'
                  ? 'bg-slate-700 text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Formule & Fonti</span>
            </button>
          </nav>

          {/* Right Action Bento Tiles */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Quick Favorites filter tile */}
            <button
              onClick={() => {
                setActiveTab('farmaci');
                setShowOnlyFavorites(!showOnlyFavorites);
              }}
              title="Mostra solo preferiti"
              className={`h-9 px-2.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                showOnlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Preferiti</span>
              {favoritesCount > 0 && (
                <span className="bg-amber-400/20 text-amber-300 text-[11px] font-bold px-1.5 py-0.5 rounded-md border border-amber-400/30">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Patient weight indicator bento tile */}
            <div className="h-9 bg-slate-800/90 border border-slate-700 rounded-xl px-3 flex items-center space-x-1.5 shadow-inner">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Peso:</span>
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">{patientWeight} kg</span>
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
