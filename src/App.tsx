import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  Bookmark, 
  RotateCcw,
  Sparkles,
  Layers,
  Activity,
  Droplet,
  Zap,
  Scale,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { Header, ActiveTab } from './components/Header';
import { PatientWeightBar } from './components/PatientWeightBar';
import { DrugCard } from './components/DrugCard';
import { InteractiveDosageCalculator } from './components/InteractiveDosageCalculator';
import { WeightEstimatorModal } from './components/WeightEstimatorModal';
import { EmergencyProtocolsView } from './components/EmergencyProtocolsView';
import { InfusionCalculatorModal } from './components/InfusionCalculatorModal';
import { FormulasAndGuidelinesView } from './components/FormulasAndGuidelinesView';
import { ALL_DRUGS, searchDrugs } from './data/drugs';
import { DRUG_CATEGORIES, BROSELOW_ZONES } from './data/categories';
import { DrugItem, CalculatedDose } from './types';

export default function App() {
  // Active State
  const [patientWeight, setPatientWeight] = useState<number>(() => {
    const saved = localStorage.getItem('ped_ps_weight');
    return saved ? parseFloat(saved) : 14.0;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('farmaci');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [calculatorDrugId, setCalculatorDrugId] = useState<string>('paracetamolo');

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ped_ps_favorites');
      return saved ? JSON.parse(saved) : ['adrenalina', 'paracetamolo', 'ibuprofene', 'midazolam', 'salbutamolo-inalatorio'];
    } catch {
      return ['adrenalina', 'paracetamolo', 'ibuprofene', 'midazolam', 'salbutamolo-inalatorio'];
    }
  });

  // Modals
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);

  // Current Broselow Zone
  const currentBroselow = useMemo(() => {
    return BROSELOW_ZONES.find(z => patientWeight >= z.minWeight && patientWeight <= z.maxWeight);
  }, [patientWeight]);

  // Count of emergency priority drugs
  const emergencyCount = useMemo(() => {
    return ALL_DRUGS.filter(d => d.priorityEmergency).length;
  }, []);

  // Save weight & favorites to localStorage
  useEffect(() => {
    localStorage.setItem('ped_ps_weight', patientWeight.toString());
  }, [patientWeight]);

  useEffect(() => {
    localStorage.setItem('ped_ps_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Filtered drugs
  const filteredDrugs = useMemo(() => {
    let result = searchDrugs(searchQuery, selectedCategory);

    if (emergencyOnly) {
      result = result.filter(d => d.priorityEmergency);
    }

    if (showOnlyFavorites) {
      result = result.filter(d => favorites.includes(d.id));
    }

    return result;
  }, [searchQuery, selectedCategory, emergencyOnly, showOnlyFavorites, favorites]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        patientWeight={patientWeight}
      />

      {/* Interactive Sticky Patient Weight Bar */}
      <PatientWeightBar
        weight={patientWeight}
        setWeight={setPatientWeight}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: Farmaci & Dosaggi */}
        {activeTab === 'farmaci' && (
          <div className="space-y-6">
            
            {/* Signature Bento Dashboard Summary Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
              
              {/* Bento Tile 1: Active Patient & Broselow Zone */}
              <div className="md:col-span-4 bg-white rounded-3xl p-5 md:p-7 lg:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs md:text-sm lg:text-base font-extrabold uppercase tracking-wider text-slate-400">Paziente Attivo</span>
                    <div className="flex items-baseline space-x-2 mt-1.5 md:mt-2.5">
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-mono">{patientWeight}</span>
                      <span className="text-base md:text-2xl font-extrabold text-slate-500">kg</span>
                    </div>
                  </div>
                  {currentBroselow ? (
                    <div
                      className="px-3.5 md:px-5 py-2 md:py-2.5 rounded-2xl text-xs md:text-sm lg:text-base font-black border flex items-center space-x-2.5 shadow-xs"
                      style={{
                        backgroundColor: currentBroselow.colorHex + '20',
                        borderColor: currentBroselow.colorHex,
                        color: currentBroselow.colorHex === '#e2e8f0' ? '#334155' : currentBroselow.colorHex
                      }}
                    >
                      <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full ring-2 ring-white shadow-xs" style={{ backgroundColor: currentBroselow.colorHex }} />
                      <span>{currentBroselow.color}</span>
                    </div>
                  ) : (
                    <span className="text-xs md:text-sm lg:text-base font-bold text-slate-500 bg-slate-100 px-3.5 py-2 rounded-xl">
                      {patientWeight > 36 ? 'Adolescente' : 'Neonato'}
                    </span>
                  )}
                </div>

                <div className="pt-4 md:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between text-xs md:text-sm lg:text-base">
                  <span className="text-slate-500 font-semibold">
                    {currentBroselow ? `Età tipica: ${currentBroselow.typicalAge}` : 'Calcoli adattati'}
                  </span>
                  <button
                    onClick={() => setIsEstimatorOpen(true)}
                    className="text-blue-600 font-black hover:text-blue-800 flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Stima Età</span>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              {/* Bento Tile 2: Emergency Alert Shortcut */}
              <div 
                onClick={() => setEmergencyOnly(!emergencyOnly)}
                className={`md:col-span-4 rounded-3xl p-5 md:p-7 lg:p-8 border transition-all cursor-pointer flex flex-col justify-between shadow-xs ${
                  emergencyOnly
                    ? 'bg-rose-50/90 border-rose-400 shadow-rose-100 ring-2 ring-rose-300/40'
                    : 'bg-white border-slate-200/90 hover:border-rose-200 hover:bg-rose-50/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 md:space-y-2">
                    <span className="text-xs md:text-sm lg:text-base font-extrabold uppercase tracking-wider text-rose-600 flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-rose-500 animate-pulse" />
                      <span>Filtro Emergenza</span>
                    </span>
                    <h4 className="text-lg md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Farmaci Salvavita</h4>
                    <p className="text-xs md:text-sm lg:text-base text-slate-500">Adrenalina, Midazolam, Glucosio 10%, Morfina...</p>
                  </div>
                  <div className={`p-3 md:p-4 lg:p-5 rounded-2xl border ${emergencyOnly ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                    <Flame className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                </div>

                <div className="pt-4 md:pt-6 mt-3 border-t border-slate-100/80 flex items-center justify-between text-xs md:text-sm lg:text-base">
                  <span className={`font-black ${emergencyOnly ? 'text-rose-700' : 'text-slate-600'}`}>
                    {emergencyOnly ? 'Filtro ATTIVO' : `${emergencyCount} farmaci prioritari`}
                  </span>
                  <span className={`text-xs md:text-sm font-black px-3 py-1 md:py-1.5 rounded-xl border ${emergencyOnly ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {emergencyOnly ? 'Disattiva' : 'Attiva Filtro'}
                  </span>
                </div>
              </div>

              {/* Bento Tile 3: Calcolatore Dosi Interattivo */}
              <div className="md:col-span-4 bg-white rounded-3xl p-5 md:p-7 lg:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 md:space-y-2">
                    <span className="text-xs md:text-sm lg:text-base font-extrabold uppercase tracking-wider text-blue-600 flex items-center space-x-2">
                      <Calculator className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Calcolo Interattivo</span>
                    </span>
                    <h4 className="text-lg md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Calcolatore Dosi</h4>
                    <p className="text-xs md:text-sm lg:text-base text-slate-500">Dose mg/kg, limiti massimi e volumi siringa</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('calcolatore')}
                    className="p-3 md:p-4 lg:p-5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                    title="Apri Calcolatore Dosi"
                  >
                    <Calculator className="w-5 h-5 md:w-7 md:h-7" />
                  </button>
                </div>

                <div className="pt-4 md:pt-6 mt-3 border-t border-slate-100 flex items-center justify-between text-xs md:text-sm lg:text-base">
                  <span className="text-slate-500 font-semibold">Calcolo personalizzato</span>
                  <button
                    onClick={() => setActiveTab('calcolatore')}
                    className="text-blue-600 font-black hover:text-blue-800 flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Apri Calcolatore</span>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

            </div>
            
            {/* Search and Filter Bento Console */}
            <div className="bg-white rounded-3xl p-5 md:p-7 lg:p-8 border border-slate-200/90 shadow-xs space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-5 h-5 md:w-7 md:h-7 text-slate-400 absolute left-4 md:left-5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cerca farmaco, nome commerciale (es. Tachipirina, Keppra, Bentelan) o indicazione..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 md:pl-16 pr-10 md:pr-14 py-3.5 md:py-4.5 lg:py-5 bg-slate-50/80 border border-slate-200/90 rounded-2xl md:rounded-3xl text-sm md:text-lg lg:text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 md:right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 md:p-2.5 rounded-xl hover:bg-slate-200/60 transition-all"
                    >
                      <X className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  )}
                </div>

                {/* Quick Toggle Filters Bento Group */}
                <div className="flex items-center space-x-2 md:space-x-3.5 shrink-0">
                  <button
                    onClick={() => setEmergencyOnly(!emergencyOnly)}
                    className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl text-xs md:text-base lg:text-lg font-black flex items-center space-x-2.5 transition-all border ${
                      emergencyOnly
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30'
                        : 'bg-rose-50/80 text-rose-700 hover:bg-rose-100 border-rose-200/80'
                    }`}
                  >
                    <Flame className="w-4 h-4 md:w-6 md:h-6" />
                    <span>Solo Emergenza</span>
                  </button>

                  <button
                    onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                    className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl text-xs md:text-base lg:text-lg font-black flex items-center space-x-2.5 transition-all border ${
                      showOnlyFavorites
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/30'
                        : 'bg-amber-50/80 text-amber-700 hover:bg-amber-100 border-amber-200/80'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 md:w-6 md:h-6 ${showOnlyFavorites ? 'fill-white' : ''}`} />
                    <span>Preferiti ({favorites.length})</span>
                  </button>

                  {(searchQuery || selectedCategory !== 'all' || emergencyOnly || showOnlyFavorites) && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setEmergencyOnly(false);
                        setShowOnlyFavorites(false);
                      }}
                      className="p-3 md:p-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl md:rounded-3xl border border-slate-200/60 transition-all"
                      title="Resetta filtri"
                    >
                      <RotateCcw className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Bento Chips Slider */}
              <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto pb-1 scrollbar-none text-xs md:text-base lg:text-lg">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black shrink-0 transition-all border ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-100/90 text-slate-700 border-slate-200/70 hover:bg-slate-200'
                  }`}
                >
                  Tutte le categorie ({ALL_DRUGS.length})
                </button>

                {DRUG_CATEGORIES.map(cat => {
                  const count = ALL_DRUGS.filter(d => d.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black shrink-0 transition-all flex items-center space-x-2 border ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                          : 'bg-slate-100/90 text-slate-700 border-slate-200/70 hover:bg-slate-200'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs md:text-sm opacity-80 font-black">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count & Current Active Context Banner */}
            <div className="flex items-center justify-between text-xs text-slate-600 px-2 font-medium">
              <span>
                Visualizzati <strong className="text-slate-900">{filteredDrugs.length}</strong> farmaci calcolati per paziente di <strong className="text-blue-700">{patientWeight} kg</strong>
                {showOnlyFavorites && ' • Filtro Preferiti attivo'}
                {emergencyOnly && ' • Filtro Emergenza Vitale attivo'}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline font-semibold">
                Ordina per sezione clinica PS
              </span>
            </div>

            {/* Drug Cards Bento Grid */}
            {filteredDrugs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredDrugs.map(drug => (
                  <DrugCard
                    key={drug.id}
                    drug={drug}
                    patientWeight={patientWeight}
                    isFavorite={favorites.includes(drug.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenCalculator={(drugId) => {
                      setCalculatorDrugId(drugId);
                      setActiveTab('calcolatore');
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3 shadow-xs">
                <AlertTriangle className="w-12 h-12 mx-auto text-slate-300" />
                <h4 className="text-lg font-bold text-slate-800">Nessun farmaco trovato</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Nessun principio attivo corrisponde ai criteri di ricerca impostati. Prova a reimpostare i filtri o inserire un altro termine.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setEmergencyOnly(false);
                    setShowOnlyFavorites(false);
                  }}
                  className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-2xl hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
                >
                  Mostra Tutti i Farmaci
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB: Calcolatore Interattivo Dosi */}
        {activeTab === 'calcolatore' && (
          <InteractiveDosageCalculator
            patientWeight={patientWeight}
            setPatientWeight={setPatientWeight}
            selectedDrugId={calculatorDrugId}
            onSelectDrugId={setCalculatorDrugId}
            onOpenEstimator={() => setIsEstimatorOpen(true)}
            onViewDrugCatalog={(drugId) => {
              setSelectedCategory('all');
              setSearchQuery(drugId);
              setActiveTab('farmaci');
            }}
          />
        )}

        {/* TAB 2: Codici Emergenza (Protocolli ALS, Anafilassi, Sepsi, ecc.) */}
        {activeTab === 'emergenze' && (
          <EmergencyProtocolsView patientWeight={patientWeight} />
        )}

        {/* TAB 3: Calcolatore Infusioni Continue in Pompa Siringa */}
        {activeTab === 'infusioni' && (
          <InfusionCalculatorModal patientWeight={patientWeight} />
        )}

        {/* TAB 4: Formule & Linee Guida */}
        {activeTab === 'lineeguida' && (
          <FormulasAndGuidelinesView />
        )}

      </main>

      {/* Weight Estimator Modal (APLS / Broselow) */}
      <WeightEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplyWeight={setPatientWeight}
      />

      {/* Bento Footer */}
      <footer className="bg-white border-t border-slate-200/90 py-6 text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-slate-800">Prontuario Rapido Pediatrico PS © 2026</span>
              <span className="text-slate-400">• created by Dott. Maestri Lorenzo</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Supporto informativo per personale sanitario abilitato
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[10.5px] sm:text-[11px] text-slate-400 leading-relaxed space-y-1">
            <p>
              <strong className="text-slate-600 font-semibold uppercase tracking-wider text-[10px]">Disclaimer Medico-Legale & Esonero di Responsabilità:</strong>{' '}
              Questo applicativo ha finalità esclusivamente informative e di supporto rapido per medici e personale sanitario abilitato; non costituisce parere medico, né sostituisce in alcun modo l'esame obiettivo, la diagnosi, la perizia o il giudizio clinico insindacabile del sanitario curante. Il Dott. Maestri Lorenzo declina espressamente ogni responsabilità civile, penale e professionale per danni diretti, indiretti, accidentali o consequenziali derivanti dall'utilizzo dell'applicazione, da malfunzionamenti o da eventuali refusi, imprecisioni, omissioni o calcoli generati.
            </p>
            <p>
              Prima della prescrizione o della somministrazione di qualsiasi farmaco, principio attivo o infusione, è obbligo inderogabile del medico e dell'operatore sanitario verificare personalmente e con la massima diligenza l'appropriatezza terapeutica, le dosi ponderali, i dosaggi limite (cap massimo), le vie di somministrazione, le compatibilità, le allergie e le controindicazioni consultando le schede tecniche ufficiali ministeriali (RCP AIFA / EMA) e le linee guida scientifiche aggiornate.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
