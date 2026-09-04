import { DrugCategory, CategoryInfo, BroselowZone } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'analgesici', name: 'Analgesici e Antipiretici', shortName: 'Analgesici', icon: 'Pill', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200', sectionNum: 2 },
  { id: 'sedazione', name: 'Sedazione e Analgesia Procedurale', shortName: 'Sedazione', icon: 'Moon', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', sectionNum: 3 },
  { id: 'respiratorie', name: 'Emergenze Respiratorie (Asma, Croup)', shortName: 'Respiratorie', icon: 'Wind', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200', sectionNum: 4 },
  { id: 'anafilassi', name: 'Anafilassi e Reazioni Allergiche', shortName: 'Anafilassi', icon: 'AlertTriangle', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200', sectionNum: 5 },
  { id: 'convulsioni', name: 'Crisi Convulsive e Stato di Male', shortName: 'Convulsioni', icon: 'Zap', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200', sectionNum: 6 },
  { id: 'cardiovascolari', name: 'Cardiovascolari e ALS Pediatrico', shortName: 'ALS / Cardio', icon: 'HeartPulse', badgeColor: 'bg-red-50 text-red-700 border-red-200', sectionNum: 7 },
  { id: 'antibiotici', name: 'Antibiotici di Comune Impiego', shortName: 'Antibiotici', icon: 'ShieldAlert', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', sectionNum: 8 },
  { id: 'antiemetici', name: 'Antiemetici', shortName: 'Antiemetici', icon: 'Activity', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200', sectionNum: 9 },
  { id: 'antidoti', name: 'Antidoti e Intossicazioni', shortName: 'Antidoti', icon: 'LifeBuoy', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200', sectionNum: 10 },
  { id: 'liquidi', name: 'Liquidi EV e Ipoglicemia', shortName: 'Liquidi / Glicemia', icon: 'Droplets', badgeColor: 'bg-sky-50 text-sky-700 border-sky-200', sectionNum: 11 },
  { id: 'sepsi', name: 'Sepsi e Shock Settico', shortName: 'Sepsi / Shock', icon: 'Flame', badgeColor: 'bg-orange-50 text-orange-700 border-orange-200', sectionNum: 12 },
  { id: 'dka', name: 'Chetoacidosi Diabetica (DKA)', shortName: 'DKA Diabete', icon: 'Crosshair', badgeColor: 'bg-pink-50 text-pink-700 border-pink-200', sectionNum: 13 },
  { id: 'oftalmici', name: 'Oculistica: Colliri e Pomate Oftalmiche', shortName: 'Colliri / Occhi', icon: 'Eye', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', sectionNum: 14 },
  { id: 'otologici', name: 'Otorino: Gocce Auricolari per Otite', shortName: 'Gocce Orecchio', icon: 'Ear', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', sectionNum: 15 },
  { id: 'dermatologici', name: 'Dermatologia: Pomate e Creme (Cortisonici, Antistaminici)', shortName: 'Pomate e Creme', icon: 'Sparkles', badgeColor: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', sectionNum: 16 }
];

export const DRUG_CATEGORIES = CATEGORIES;

export const BROSELOW_ZONES: BroselowZone[] = [
  { color: 'Grigio', colorHex: '#9ca3af', textColor: 'text-gray-800', weightRange: '3 - 5 kg', minWeight: 3, maxWeight: 5, typicalAge: '0 - 2 mesi', lengthCm: '46 - 59 cm' },
  { color: 'Rosa', colorHex: '#f472b6', textColor: 'text-pink-900', weightRange: '6 - 7 kg', minWeight: 6, maxWeight: 7, typicalAge: '3 - 6 mesi', lengthCm: '60 - 66 cm' },
  { color: 'Rosso', colorHex: '#ef4444', textColor: 'text-red-900', weightRange: '8 - 9 kg', minWeight: 8, maxWeight: 9, typicalAge: '7 - 10 mesi', lengthCm: '67 - 74 cm' },
  { color: 'Viola', colorHex: '#a855f7', textColor: 'text-purple-900', weightRange: '10 - 11 kg', minWeight: 10, maxWeight: 11, typicalAge: '11 - 18 mesi', lengthCm: '75 - 84 cm' },
  { color: 'Giallo', colorHex: '#eab308', textColor: 'text-yellow-900', weightRange: '12 - 14 kg', minWeight: 12, maxWeight: 14, typicalAge: '19 - 35 mesi (2-3a)', lengthCm: '85 - 95 cm' },
  { color: 'Bianco', colorHex: '#e2e8f0', textColor: 'text-slate-800', weightRange: '15 - 18 kg', minWeight: 15, maxWeight: 18, typicalAge: '3 - 4 anni', lengthCm: '96 - 108 cm' },
  { color: 'Blu', colorHex: '#3b82f6', textColor: 'text-blue-900', weightRange: '19 - 23 kg', minWeight: 19, maxWeight: 23, typicalAge: '5 - 6 anni', lengthCm: '109 - 120 cm' },
  { color: 'Arancione', colorHex: '#f97316', textColor: 'text-orange-900', weightRange: '24 - 29 kg', minWeight: 24, maxWeight: 29, typicalAge: '7 - 8 anni', lengthCm: '121 - 130 cm' },
  { color: 'Verde', colorHex: '#22c55e', textColor: 'text-green-900', weightRange: '30 - 36 kg', minWeight: 30, maxWeight: 36, typicalAge: '9 - 10 anni', lengthCm: '131 - 142 cm' }
];
