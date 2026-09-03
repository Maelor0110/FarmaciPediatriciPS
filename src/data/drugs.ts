import { DRUGS_GROUP_1 } from './drugsGroup1';
import { DRUGS_GROUP_2 } from './drugsGroup2';
import { DrugItem } from '../types';

export const ALL_DRUGS: DrugItem[] = [
  ...DRUGS_GROUP_1,
  ...DRUGS_GROUP_2
];

export function getDrugById(id: string): DrugItem | undefined {
  return ALL_DRUGS.find(d => d.id === id);
}

export function searchDrugs(query: string, category?: string): DrugItem[] {
  let filtered = ALL_DRUGS;
  if (category && category !== 'all') {
    filtered = filtered.filter(d => d.category === category);
  }
  if (!query.trim()) return filtered;

  const q = query.toLowerCase().trim();
  return filtered.filter(d => {
    const matchName = d.name.toLowerCase().includes(q);
    const matchComm = d.commercialNames?.some(c => c.toLowerCase().includes(q));
    const matchInd = d.indications.some(i => i.toLowerCase().includes(q));
    const matchCat = d.category.toLowerCase().includes(q);
    const matchNotes = d.adverseEffectsAndNotes.some(n => n.toLowerCase().includes(q));
    return matchName || matchComm || matchInd || matchCat || matchNotes;
  });
}
