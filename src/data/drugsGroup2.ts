import { DrugItem } from '../types';

export const DRUGS_GROUP_2: DrugItem[] = [
  // 8. ANTIBIOTICI DI COMUNE IMPIEGO IN PS
  {
    id: 'amoxicillina-clavulanico',
    name: 'Amoxicillina / Ac. Clavulanico',
    commercialNames: ['Augmentin', 'Clavulin'],
    category: 'antibiotici',
    sectionNum: 8,
    sectionTitle: 'Antibiotici di Comune Impiego in Pronto Soccorso',
    summaryDose: 'Orale: 40-90 mg/kg/die (in amoxicillina) suddiviso in 2-3 dosi (max 3-4 g/die)',
    routes: ['OS'],
    indications: [
      'Otite media acuta (OMA)',
      'Sinusite batterica acuta',
      'Polmonite comunitaria lieve (CAP)',
      'Infezioni cutanee e ferite da morso (umano/animale)'
    ],
    contraindications: [
      'Allergia nota a penicilline o beta-lattamici',
      'Mononucleosi infettiva in atto (frequente rash cutaneo maculo-papuloso non allergico)'
    ],
    adverseEffectsAndNotes: [
      'Dosaggio espresso in mg di amoxicillina.',
      'Dose standard: 40-50 mg/kg/die; dose elevata per OMA da pneumococco resistente: 80-90 mg/kg/die.',
      'Somministrare ai pasti per migliorare la tollerabilità gastrica e ridurre diarrea/nausea.'
    ],
    calculateDoses: (w: number) => {
      const doseStdTotal = Math.min(Math.round(w * 50), 3000);
      const doseHighTotal = Math.min(Math.round(w * 80), 3000);
      const doseStdSingleTid = Math.round(doseStdTotal / 3);
      const doseHighSingleBid = Math.round(doseHighTotal / 2);
      const isMax = w * 80 >= 3000;

      // Sospensione pediatrica classica 400 mg + 57 mg per 5 mL (= 80 mg/mL di amoxicillina)
      const mlHighBid = (doseHighSingleBid / 80).toFixed(1);

      return [
        {
          label: 'Dose Elevata (80 mg/kg/die - OMA / Polmonite)',
          route: 'OS',
          rawFormula: '80-90 mg/kg/die suddiviso in 2 somministrazioni (ogni 12h) o 3 somministrazioni (max 3 g/die)',
          calculatedValue: `${doseHighSingleBid} mg ogni 12h (totale ${doseHighTotal} mg/die)`,
          unit: 'mg',
          numericDose: doseHighSingleBid,
          volumeInfo: `Sospensione 400 mg/5 mL (80 mg/mL): ~${mlHighBid} mL ogni 12h`,
          maxDoseCap: 'Max 3.000 mg (3 g) al giorno',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 12 ore per 8-10 giorni'
        },
        {
          label: 'Dose Standard (40-50 mg/kg/die)',
          route: 'OS',
          rawFormula: '40-50 mg/kg/die suddiviso ogni 8h (max 2 g/die)',
          calculatedValue: `${doseStdSingleTid} mg ogni 8h (totale ${doseStdTotal} mg/die)`,
          unit: 'mg',
          numericDose: doseStdSingleTid,
          volumeInfo: `Sospensione 400 mg/5 mL: ~${(doseStdSingleTid / 80).toFixed(1)} mL ogni 8h`,
          maxDoseCap: 'Max 2.000 mg/die',
          frequencyOrDuration: 'Ogni 8 ore ai pasti'
        }
      ];
    }
  },
  {
    id: 'ceftriaxone',
    name: 'Ceftriaxone',
    commercialNames: ['Rocefin fiale'],
    category: 'antibiotici',
    sectionNum: 8,
    sectionTitle: 'Antibiotici di Comune Impiego in Pronto Soccorso',
    summaryDose: 'IM/EV: 50-100 mg/kg/die in 1-2 somministrazioni (max 2-4 g/die) | Meningite: 100 mg/kg/die (max 4 g/die)',
    routes: ['EV', 'IM'],
    indications: [
      'Sepsi e sospetta infezione batterica invasiva',
      'Meningite batterica acuta (100 mg/kg/die)',
      'Polmonite comunitaria severa',
      'Pielonefrite acuta / infezione vie urinarie con compromissione sistemica'
    ],
    contraindications: [
      'Neonato < 28 giorni (rischio elevato di kernittero da spiazzamento della bilirubina - PREFERIRE CEFOTAXIME)',
      'Iperbilirubinemia neonatale di ogni entità',
      'Ipersensibilità nota alle cefalosporine o grave anafilassi da penicilline',
      'NON CO-SOMMINISTRARE CON SOLUZIONI CONTENENTI CALCIO EV (es. Ringer lattato o calcio gluconato) nel neonato per rischio di precipitazione polmonare/renale fatale'
    ],
    adverseEffectsAndNotes: [
      'Ampio spettro d\'azione, comoda monosomministrazione giornaliera.',
      'Nel neonato sotto i 28 giorni è controindicato: impiegare Cefotaxime.'
    ],
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const doseStd = Math.min(Math.round(w * 50), 2000);
      const doseMeningite = Math.min(Math.round(w * 100), 4000);
      const isMaxMeningite = w * 100 >= 4000;

      return [
        {
          label: 'Infezioni severe / Sepsi (50-80 mg/kg/die)',
          route: 'EV / IM',
          rawFormula: '50-80 mg/kg/die in singola somministrazione (max 2-4 g/die)',
          calculatedValue: `${doseStd} - ${Math.min(Math.round(w * 80), 4000)} mg/die`,
          unit: 'mg',
          numericDose: doseStd,
          volumeInfo: `Flaconi da 1 g o 2 g ricostituiti in SF per infusione EV in 30 min (per IM ricostituire con lidocaina 1%)`,
          maxDoseCap: 'Max 2.000 - 4.000 mg al giorno',
          frequencyOrDuration: 'In monosomministrazione giornaliera (ogni 24h)'
        },
        {
          label: 'Meningite batterica sospetta / documentata (100 mg/kg/die)',
          route: 'EV in 30 minuti',
          rawFormula: '100 mg/kg/die in singola dose o diviso ogni 12h (max 4 g/die)',
          calculatedValue: `${doseMeningite} mg/die`,
          unit: 'mg',
          numericDose: doseMeningite,
          maxDoseCap: 'Max 4.000 mg (4 g) al giorno',
          isMaxDoseReached: isMaxMeningite,
          frequencyOrDuration: 'Ogni 24h o suddiviso ogni 12h in infusione lenta'
        }
      ];
    }
  },
  {
    id: 'cefotaxime',
    name: 'Cefotaxime',
    commercialNames: ['Zariviz', 'Cefotaxima fiale'],
    category: 'antibiotici',
    sectionNum: 8,
    sectionTitle: 'Antibiotici di Comune Impiego in Pronto Soccorso',
    summaryDose: 'EV/IM: 100-200 mg/kg/die suddiviso ogni 6-8h (max 8-12 g/die)',
    routes: ['EV', 'IM'],
    indications: [
      'Sepsi e meningite nel NEONATO e nel piccolo lattante (< 28 giorni o iperbilirubinemia)',
      'Infezioni gravi in alternativa a ceftriaxone'
    ],
    contraindications: ['Ipersensibilità nota alle cefalosporine'],
    adverseEffectsAndNotes: [
      'CEFALOSPORINA DI SCELTA NEL NEONATO: a differenza del ceftriaxone, non spiazza la bilirubina dall\'albumina e non presenta rischio di precipitati con il calcio.',
      'Suddividere ogni 6-8 ore (emivita più breve rispetto a ceftriaxone).'
    ],
    calculateDoses: (w: number) => {
      const totalDie = Math.min(Math.round(w * 150), 8000);
      const singleTid = Math.round(totalDie / 3);
      const isMax = w * 150 >= 8000;

      return [
        {
          label: 'Sepsi / Meningite neonato e lattante',
          route: 'EV / IM',
          rawFormula: '100-200 mg/kg/die suddiviso ogni 6-8 ore (max 8-12 g/die)',
          calculatedValue: `${singleTid} mg ogni 8h (totale ${totalDie} mg/die)`,
          unit: 'mg',
          numericDose: singleTid,
          volumeInfo: 'Flacone 1 g ricostituito',
          maxDoseCap: 'Max 8-12 g/die',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 6-8 ore in infusione EV lenta (20-30 min)'
        }
      ];
    }
  },
  {
    id: 'ampicillina',
    name: 'Ampicillina',
    commercialNames: ['Amplital fiale'],
    category: 'antibiotici',
    sectionNum: 8,
    sectionTitle: 'Antibiotici di Comune Impiego in Pronto Soccorso',
    summaryDose: 'EV: 100-200 mg/kg/die suddiviso ogni 6h (meningite: fino a 300-400 mg/kg/die, max 12 g/die)',
    routes: ['EV', 'IM'],
    indications: [
      'Sepsi neonatale precoce (associata a Gentamicina: copertura empirica di Listeria monocytogenes, Enterococco e Streptococco Agalactiae B)',
      'Meningite neonatale'
    ],
    contraindications: ['Allergia accertata alle penicilline'],
    adverseEffectsAndNotes: [
      'Associazione standard di prima linea con Gentamicina per la sepsi precoce del neonato.',
      'Nel sospetto di meningite neonatale impiegare dosaggi massimali (fino a 300-400 mg/kg/die).'
    ],
    calculateDoses: (w: number) => {
      const stdTotal = Math.min(Math.round(w * 150), 8000);
      const meningiteTotal = Math.min(Math.round(w * 300), 12000);
      const stdSingle = Math.round(stdTotal / 4);
      const menSingle = Math.round(meningiteTotal / 4);
      const isMaxStd = w * 150 >= 8000;
      const isMaxMen = w * 300 >= 12000;

      return [
        {
          label: 'Sepsi neonatale (con Gentamicina)',
          route: 'EV',
          rawFormula: '100-200 mg/kg/die suddiviso ogni 6 ore (max 8 g/die)',
          calculatedValue: `${stdSingle} mg ogni 6h (totale ${stdTotal} mg/die)`,
          unit: 'mg',
          numericDose: stdSingle,
          maxDoseCap: 'Max 8.000 mg (8 g) al giorno',
          isMaxDoseReached: isMaxStd,
          frequencyOrDuration: 'Ogni 6 ore EV lenta (15-30 min)'
        },
        {
          label: 'Meningite batterica neonatale',
          route: 'EV',
          rawFormula: '300-400 mg/kg/die suddiviso ogni 6 ore (max 12 g/die)',
          calculatedValue: `${menSingle} mg ogni 6h (totale ${meningiteTotal} mg/die)`,
          unit: 'mg',
          numericDose: menSingle,
          maxDoseCap: 'Max 12.000 mg (12 g) al giorno',
          isMaxDoseReached: isMaxMen,
          frequencyOrDuration: 'Ogni 6 ore'
        }
      ];
    }
  },
  {
    id: 'gentamicina',
    name: 'Gentamicina',
    commercialNames: ['Gentalyn fiale', 'Gentamicina solfato'],
    category: 'antibiotici',
    sectionNum: 8,
    sectionTitle: 'Antibiotici di Comune Impiego in Pronto Soccorso',
    summaryDose: 'EV/IM: 5-7,5 mg/kg/die in singola dose (neonato: dose e intervallo variabili per età gestazionale)',
    routes: ['EV', 'IM'],
    indications: [
      'Sepsi neonatale (in associazione ad Ampicillina)',
      'Infezioni gravi da batteri Gram-negativi',
      'Infezioni complicate urinarie o addominali'
    ],
    contraindications: [
      'Insufficienza renale severa (richiede aggiustamento e monitoraggio dei livelli di picco e valle)',
      'Miastenia gravis'
    ],
    adverseEffectsAndNotes: [
      'Nefrotossicità e ototossicità potenziale: monitorare la funzionalità renale e la diuresi.',
      'Nel neonato l\'intervallo di somministrazione dipende dall\'età gestazionale (es. ogni 24h, 36h o 48h nel pretermine).',
      'Preferita la monosomministrazione giornaliera ad alto dosaggio (once-daily).'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const doseMin = Number((w * 5.0).toFixed(1));
      const doseMax = Math.min(Number((w * 7.5).toFixed(1)), 400);
      const isMax = w * 7.5 >= 400;
      // Fiala 80 mg/2 mL (40 mg/mL) o 40 mg/mL
      const volMax = (doseMax / 40).toFixed(2);

      return [
        {
          label: 'Monosomministrazione giornaliera (Once-daily)',
          route: 'EV lenta in 30 min / IM',
          rawFormula: '5-7,5 mg/kg/die in singola dose giornaliera (max 400 mg/die)',
          calculatedValue: `${doseMin} - ${doseMax} mg in singola dose`,
          unit: 'mg',
          numericDose: doseMax,
          volumeInfo: `Fiala da 40 mg/mL: aspirare ${(doseMin/40).toFixed(2)} - ${volMax} mL (diluire in SF per infusione in 30-60 min)`,
          maxDoseCap: 'Max 400 mg/die',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 24 ore (nel neonato pretermine ogni 36-48h secondo protocollo)'
        }
      ];
    }
  },
  {
    id: 'azitromicina',
    name: 'Azitromicina',
    commercialNames: ['Zitromax', 'Azitrocin'],
    category: 'antibiotici',
    sectionNum: 8,
    sectionTitle: 'Antibiotici di Comune Impiego in Pronto Soccorso',
    summaryDose: 'Orale: 10 mg/kg die 1 (max 500 mg), poi 5 mg/kg/die per 4 giorni (max 250 mg/die)',
    routes: ['OS', 'EV'],
    indications: [
      'Polmonite atipica (Mycoplasma pneumoniae, Chlamydia pneumoniae)',
      'Pertosse (trattamento e chemioprofilassi dei contatti)',
      'Infezioni da germi intracellulari'
    ],
    contraindications: [
      'Epatopatia severa',
      'Prolungamento dell\'intervallo QT noto, aritmie ventricolari'
    ],
    adverseEffectsAndNotes: [
      'Buona tollerabilità gastrointestinale rispetto ad altri macrolidi.',
      'Schema breve a 5 giorni favorito dalla lunga emivita intracellulare tissutale.'
    ],
    calculateDoses: (w: number) => {
      const day1 = Math.min(Math.round(w * 10), 500);
      const day2to5 = Math.min(Math.round(w * 5), 250);
      const isMaxDay1 = w * 10 >= 500;
      // Sospensione 200 mg/5 mL (40 mg/mL)
      const mlDay1 = (day1 / 40).toFixed(1);
      const mlDay2 = (day2to5 / 40).toFixed(1);

      return [
        {
          label: 'Giorno 1 (Dose di attacco)',
          route: 'OS',
          rawFormula: '10 mg/kg il 1° giorno (max 500 mg)',
          calculatedValue: `${day1} mg`,
          unit: 'mg',
          numericDose: day1,
          volumeInfo: `Sospensione 200 mg/5 mL (40 mg/mL): ~${mlDay1} mL`,
          maxDoseCap: 'Max 500 mg il 1° giorno',
          isMaxDoseReached: isMaxDay1,
          frequencyOrDuration: 'Singola dose giornaliera lontano dai pasti'
        },
        {
          label: 'Giorni 2, 3, 4, 5 (Mantenimento)',
          route: 'OS',
          rawFormula: '5 mg/kg/die per i successivi 4 giorni (max 250 mg/die)',
          calculatedValue: `${day2to5} mg/die`,
          unit: 'mg',
          numericDose: day2to5,
          volumeInfo: `Sospensione 200 mg/5 mL (40 mg/mL): ~${mlDay2} mL`,
          maxDoseCap: 'Max 250 mg al giorno',
          frequencyOrDuration: 'Singola dose per altri 4 giorni consecutivi'
        }
      ];
    }
  },

  // 9. ANTIEMETICI
  {
    id: 'ondansetron',
    name: 'Ondansetron',
    commercialNames: ['Zofran', 'Zofran Zydis (liofilizzato orale)'],
    category: 'antiemetici',
    sectionNum: 9,
    sectionTitle: 'Antiemetici',
    summaryDose: '0,15 mg/kg/dose OS/EV (max 4-8 mg) | Per fasce: 8-15 kg: 2 mg; 15-30 kg: 4 mg; >30 kg: 6-8 mg',
    routes: ['OS', 'EV'],
    indications: [
      'Vomito acuto persistente in corso di gastroenterite acuta per facilitare la reidratazione orale',
      'Prevenzione e trattamento del vomito post-operatorio o associato a chemioterapia'
    ],
    contraindications: [
      'Sindrome del QT lungo congenito',
      'Uso concomitante di altri farmaci che prolungano marcatamente il QT'
    ],
    adverseEffectsAndNotes: [
      'EVIDENZA SOLIDA: somministrato in dose singola nella gastroenterite riduce la necessità di ricovero ospedaliero e il ricorso alla reidratazione venosa.',
      'Possibile cefalea, stipsi transitoria; molto raro prolungamento del QT in dose singola.',
      'Formulazione orosolubile (Zydis) ideale nel bambino che non trattiene liquidi per bocca.'
    ],
    calculateDoses: (w: number) => {
      const calcExact = Math.min(Number((w * 0.15).toFixed(2)), 8.0);
      let fasciaDose = 2;
      let fasciaNote = 'Fascia 8-15 kg';
      if (w < 8) {
        fasciaDose = Math.min(Number((w * 0.15).toFixed(2)), 2);
        fasciaNote = 'Calcolato su mg/kg esatto (<8 kg)';
      } else if (w >= 8 && w < 15) {
        fasciaDose = 2;
        fasciaNote = 'Fascia 8-15 kg: 2 mg';
      } else if (w >= 15 && w <= 30) {
        fasciaDose = 4;
        fasciaNote = 'Fascia 15-30 kg: 4 mg';
      } else {
        fasciaDose = 8;
        fasciaNote = 'Fascia >30 kg: 6-8 mg';
      }

      // Fiala 2 mg/mL (4 mg/2 mL o 8 mg/4 mL) o sciroppo 4 mg/5 mL (0,8 mg/mL)
      const evVol = (fasciaDose / 2).toFixed(1);
      const syrVol = (fasciaDose / 0.8).toFixed(1);

      return [
        {
          label: 'Dosaggio Semplificato per Fasce di Peso (Pratica Clinica PS)',
          route: 'OS / EV',
          rawFormula: '8-15 kg: 2 mg | 15-30 kg: 4 mg | >30 kg: 6-8 mg (o 0,15 mg/kg, max 8 mg)',
          calculatedValue: `${fasciaDose} mg`,
          unit: 'mg',
          numericDose: fasciaDose,
          volumeInfo: `Compressa orosolubile: ${fasciaDose} mg | Fiala EV (2 mg/mL): ${evVol} mL | Sciroppo (4 mg/5 mL): ${syrVol} mL`,
          preparationAdvice: fasciaNote,
          maxDoseCap: 'Max 8 mg per singola dose',
          isMaxDoseReached: fasciaDose >= 8,
          frequencyOrDuration: 'Singola dose; ripetibile solo dopo 6-8h se necessario'
        },
        {
          label: 'Dosaggio esatto su kg corporeo (0,15 mg/kg)',
          route: 'OS / EV',
          rawFormula: '0,15 mg/kg/dose (max 4-8 mg)',
          calculatedValue: `${calcExact} mg`,
          unit: 'mg',
          numericDose: calcExact,
          frequencyOrDuration: 'Ripetibile dopo 6-8 ore'
        }
      ];
    }
  },

  // 10. ANTISPASTICI E SINTOMATICI
  {
    id: 'butilscopolamina',
    name: 'Butilscopolamina (N-butilbromuro di joscina)',
    commercialNames: ['Buscopan fiale 20 mg/mL'],
    category: 'antispastici',
    sectionNum: 10,
    sectionTitle: 'Antispastici e Altri Farmaci Sintomatici',
    summaryDose: 'EV/IM: 0,3-0,5 mg/kg/dose (max 20 mg), ogni 6-8h',
    routes: ['EV', 'IM', 'OS'],
    indications: [
      'Dolore addominale acuto di tipo colico (colica biliare, spasmo intestinale, colica renale in età scolare/adolescenziale)'
    ],
    contraindications: [
      'Glaucoma ad angolo acuto',
      'Megacolon tossico o dilatazione gastrica',
      'Ostruzione meccanica del tratto gastroenterico o urinario',
      'Miastenia gravis',
      'Tachiaritmie'
    ],
    adverseEffectsAndNotes: [
      'Effetti anticolinergici noti: secchezza delle fauci, transitoria tachicardia, stipsi, ritenzione urinaria.',
      'Non utilizzare nel dolore addominale indifferenziato prima di aver escluso un quadro chirurgico acuto (appendicite, invaginazione).'
    ],
    calculateDoses: (w: number) => {
      const minDose = Number((w * 0.3).toFixed(1));
      const maxDose = Math.min(Number((w * 0.5).toFixed(1)), 20);
      const isMax = w * 0.5 >= 20;
      // Fiala 20 mg/1 mL
      const vol = (maxDose / 20).toFixed(2);

      return [
        {
          label: 'Endovenoso lento o Intramuscolare',
          route: 'EV lenta / IM / OS',
          rawFormula: '0,3-0,5 mg/kg/dose (max 20 mg)',
          calculatedValue: `${minDose} - ${maxDose} mg`,
          unit: 'mg',
          numericDose: maxDose,
          volumeInfo: `Fiala da 20 mg/1 mL: aspirare ~${vol} mL (diluire per infusione EV lenta in 5-10 min)`,
          maxDoseCap: 'Max 20 mg per dose',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ripetibile ogni 6-8 ore al bisogno'
        }
      ];
    }
  },

  // 11. ANTIDOTI E INTOSSICAZIONI
  {
    id: 'naloxone',
    name: 'Naloxone',
    commercialNames: ['Narcan fiale 0,4 mg/mL'],
    category: 'antidoti',
    sectionNum: 11,
    sectionTitle: 'Antidoti e Trattamento delle Intossicazioni',
    summaryDose: '0,01-0,1 mg/kg/dose EV/IM/IO/IN (max 2 mg), ogni 2-3 min al bisogno',
    routes: ['EV', 'IM', 'IO', 'IN'],
    indications: [
      'Antidoto specifico per overdose/intossicazione da oppioidi (morfina, fentanyl, codeina, metadone, ossicodone) con depressione respiratoria e/o alterazione della coscienza'
    ],
    contraindications: ['NESSUNA CONTROINDICAZIONE ASSOLUTA in sospetta overdose con compromissione respiratoria.'],
    adverseEffectsAndNotes: [
      'EMIVITA PIÙ BREVE RISPETTO ALLA MAGGIOR PARTE DEGLI OPPIOIDI: elevato rischio di ri-sedazione tardiva!',
      'È obbligatorio un monitoraggio clinico prolungato (almeno 2-4h o più).',
      'Può scatenare sindrome da astinenza acuta violenta nel paziente con dipendenza cronica da oppioidi (titolare con dosi minime di 0,01 mg/kg se si vuole solo ripristinare il respiro).'
    ],
    highRisk: true,
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const minDose = Number((w * 0.01).toFixed(3));
      const maxDose = Math.min(Number((w * 0.1).toFixed(2)), 2.0);
      const isMax = w * 0.1 >= 2.0;
      // Fiala 0,4 mg/mL
      const volMax = (maxDose / 0.4).toFixed(2);

      return [
        {
          label: 'Dose di risveglio respiratorio',
          route: 'EV / IM / IO / IN',
          rawFormula: '0,01-0,1 mg/kg/dose (max 2 mg per bolo)',
          calculatedValue: `${minDose} - ${maxDose} mg`,
          unit: 'mg',
          numericDose: maxDose,
          volumeInfo: `Fiala da 0,4 mg/mL: aspirare ${(minDose/0.4).toFixed(2)} - ${volMax} mL`,
          maxDoseCap: 'Max 2 mg per bolo singolo (può essere ripetuto fino a 10 mg totali se non risposta)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ripetibile ogni 2-3 minuti fino al ripristino di ventilazione spontanea efficace'
        }
      ];
    }
  },
  {
    id: 'flumazenil',
    name: 'Flumazenil',
    commercialNames: ['Anexate fiale 0,5 mg/5 mL (0,1 mg/mL)'],
    category: 'antidoti',
    sectionNum: 11,
    sectionTitle: 'Antidoti e Trattamento delle Intossicazioni',
    summaryDose: 'EV: 0,01 mg/kg/dose (max 0,2 mg), ogni minuto fino a max 1 mg totale',
    routes: ['EV'],
    indications: [
      'Overdose o sovradosaggio iatrogeno accidentale da benzodiazepine con depressione respiratoria clinicamente significativa'
    ],
    contraindications: [
      'Sospetta o confermata co-ingestione di sostanze proconvulsivanti (es. antidepressivi triciclici, cocaina)',
      'Paziente con epilessia nota in trattamento cronico con benzodiazepine',
      'Paziente con dipendenza cronica nota da benzodiazepine (rischio gravissimo di stato epilettico refrattario da astinenza precipitata)'
    ],
    adverseEffectsAndNotes: [
      'USO ESTREMAMENTE CAUTO: può scatenare convulsioni incoercibili in soggetti dipendenti o intossicati da triciclici.',
      'Emivita breve (~45 min): rischio frequente di risedazione da rebound.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const doseBolo = Math.min(Number((w * 0.01).toFixed(2)), 0.2);
      // Fiala 0,1 mg/mL (0,5 mg/5 mL)
      const volMl = (doseBolo / 0.1).toFixed(1);

      return [
        {
          label: 'Bolo EV lento',
          route: 'EV in 15 secondi',
          rawFormula: '0,01 mg/kg (max 0,2 mg per bolo), ripetibile ogni 60 sec fino a max 1 mg totale',
          calculatedValue: `${doseBolo} mg per bolo`,
          unit: 'mg',
          numericDose: doseBolo,
          volumeInfo: `Fiala da 0,1 mg/mL: aspirare ${volMl} mL (somministrare in 15 sec)`,
          maxDoseCap: 'Max 0,2 mg per singolo bolo; max totale cumulativo: 1,0 mg',
          isMaxDoseReached: w * 0.01 >= 0.2,
          frequencyOrDuration: 'Ripetibile ogni minuto per un massimo di 5 boli (1 mg)'
        }
      ];
    }
  },
  {
    id: 'n-acetilcisteina',
    name: 'N-Acetilcisteina (NAC)',
    commercialNames: ['Fluimucil Antidoto fiale 20% (300 mg/mL o flaconi 20g/100mL)'],
    category: 'antidoti',
    sectionNum: 11,
    sectionTitle: 'Antidoti e Trattamento delle Intossicazioni',
    summaryDose: 'Protocollo EV trifasico (Rumack-Matthew): 150 mg/kg in 60m, poi 50 mg/kg in 4h, poi 100 mg/kg in 16h',
    routes: ['EV', 'OS'],
    indications: [
      'Intossicazione da Paracetamolo (in base a livelli ematici e nomogramma di Rumack-Matthew o storia certa di assunzione tossica acuta > 150-200 mg/kg)'
    ],
    contraindications: ['Nessuna assoluta se l\'indicazione clinica all\'antidoto è presente.'],
    adverseEffectsAndNotes: [
      'Efficacia epatoprotettiva massima se iniziata entro 8 ore dall\'ingestione acuta.',
      'Reazioni anafilattoidi (flushing, rash, broncospasmo) frequenti durante la 1ª infusione rapida di carico: non sospendere il trattamento, rallentare l\'infusione e trattare con antistaminico.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const dose1 = Math.round(w * 150);
      const dose2 = Math.round(w * 50);
      const dose3 = Math.round(w * 100);

      return [
        {
          label: 'Fase 1: Dose da Carico (in 60 minuti)',
          route: 'EV in 60 min',
          rawFormula: '150 mg/kg in 60 minuti diluiti in Glucosata 5% o SF (volume adeguato per età)',
          calculatedValue: `${dose1} mg (= ${(dose1/1000).toFixed(1)} g)`,
          unit: 'mg',
          numericDose: dose1,
          frequencyOrDuration: 'Infusione in 60 minuti'
        },
        {
          label: 'Fase 2: Seconda Infusione (in 4 ore)',
          route: 'EV in 4 ore',
          rawFormula: '50 mg/kg nelle successive 4 ore',
          calculatedValue: `${dose2} mg (= ${(dose2/1000).toFixed(2)} g)`,
          unit: 'mg',
          numericDose: dose2,
          frequencyOrDuration: 'Infusione in 4 ore consecutive'
        },
        {
          label: 'Fase 3: Terza Infusione (in 16 ore)',
          route: 'EV in 16 ore',
          rawFormula: '100 mg/kg nelle successive 16 ore',
          calculatedValue: `${dose3} mg (= ${(dose3/1000).toFixed(2)} g)`,
          unit: 'mg',
          numericDose: dose3,
          frequencyOrDuration: 'Infusione continua in 16 ore'
        }
      ];
    }
  },
  {
    id: 'glucagone',
    name: 'Glucagone',
    commercialNames: ['GlucaGen HypoKit 1 mg polvere e solvente'],
    category: 'antidoti',
    sectionNum: 11,
    sectionTitle: 'Antidoti e Trattamento delle Intossicazioni',
    summaryDose: 'IM/SC: 0,5 mg se <25 kg; 1 mg se ≥25 kg (o 0,03 mg/kg)',
    routes: ['IM', 'SC', 'EV'],
    indications: [
      'Ipoglicemia severa con perdita di coscienza quando l\'accesso venoso NON è immediatamente disponibile',
      'Overdose da beta-bloccanti o calcio-antagonisti (a dosaggi più elevati per via EV)'
    ],
    contraindications: [
      'Feocromocitoma',
      'Insulinoma'
    ],
    adverseEffectsAndNotes: [
      'INEFFICACE SE LE SCORTE DI GLICOGENO EPATICO SONO ESAURITE (es. digiuno prolungato, malnutrizione severa, chetoacidosi diabetica prolungata): in tal caso è indispensabile il glucosio EV o intraosseo!',
      'Nausea e vomito frequenti al risveglio.'
    ],
    calculateDoses: (w: number) => {
      const doseMg = w < 25 ? 0.5 : 1.0;
      return [
        {
          label: 'Ipoglicemia severa (senza accesso EV)',
          route: 'IM / SC',
          rawFormula: '<25 kg: 0,5 mg (mezza siringa HypoKit) | ≥25 kg: 1 mg (intera siringa HypoKit)',
          calculatedValue: `${doseMg} mg`,
          unit: 'mg',
          numericDose: doseMg,
          volumeInfo: w < 25 ? '0,5 mL della siringa ricostituita (mezza dose)' : '1,0 mL intera siringa ricostituita',
          preparationAdvice: w < 25 ? 'Bambino <25 kg: iniettare metà volume' : 'Paziente ≥25 kg: iniettare intera siringa',
          maxDoseCap: 'Max 1 mg',
          frequencyOrDuration: 'Iniezione IM immediata in coscia o deltoide'
        }
      ];
    }
  },

  // 12. LIQUIDI ENDOVENOSI E GESTIONE IPOGLICEMIA
  {
    id: 'soluzione-fisiologica',
    name: 'Soluzione Fisiologica (NaCl 0,9%)',
    commercialNames: ['Sodio Cloruro 0,9% sacche'],
    category: 'liquidi',
    sectionNum: 12,
    sectionTitle: 'Liquidi Endovenosi e Gestione dell\'Ipoglicemia',
    summaryDose: 'Bolo di riempimento: 10-20 mL/kg in 5-20 min, rivalutare e ripetere al bisogno (fino a 40-60 mL/kg nello shock settico)',
    routes: ['EV', 'IO'],
    indications: [
      'Shock ipovolemico ed emorragico',
      'Disidratazione acuta moderata-severa',
      'Mantenimento idroelettrolitico (secondo Holliday-Segar)'
    ],
    contraindications: [
      'Segni di sovraccarico di volume o scompenso cardiaco acuto (cautela: usare boli ridotti da 5-10 mL/kg e rivalutazione continua)'
    ],
    adverseEffectsAndNotes: [
      'Rivalutare clinicamente dopo ogni singolo bolo: FC, PA, tempo di refill capillare, qualità dei polsi, FR, rantoli polmonari e dimensioni del fegato.',
      'Grandi volumi possono causare acidosi metabolica ipercloremica: preferire cristalloidi bilanciati (Ringer lattato) se disponibili.'
    ],
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const vol10 = Math.round(w * 10);
      const vol20 = Math.round(w * 20);
      const volHolliday = w <= 10 
        ? Math.round(w * 100)
        : w <= 20 
          ? Math.round(1000 + (w - 10) * 50)
          : Math.round(1500 + (w - 20) * 20);

      return [
        {
          label: 'Bolo di Espansione Volemica in emergenza (10-20 mL/kg)',
          route: 'EV / IO rapido (push-pull o infusore a pressione)',
          rawFormula: '10-20 mL/kg in 5-20 minuti, rivalutare e ripetere al bisogno',
          calculatedValue: `${vol10} - ${vol20} mL in bolo`,
          unit: 'mL',
          numericDose: vol20,
          volumeInfo: `Bolo da 10 mL/kg: ${vol10} mL | Bolo da 20 mL/kg: ${vol20} mL`,
          frequencyOrDuration: 'In 5-20 minuti; rivalutare parametri vitali dopo ogni bolo'
        },
        {
          label: 'Fabbisogno idrico di mantenimento (Regola Holliday-Segar 24h)',
          route: 'EV lenta continua',
          rawFormula: '100 mL/kg per i primi 10 kg + 50 mL/kg da 10 a 20 kg + 20 mL/kg per i kg > 20',
          calculatedValue: `${volHolliday} mL / 24 ore (= ${(volHolliday / 24).toFixed(1)} mL/ora)`,
          unit: 'mL/24h',
          numericDose: volHolliday,
          frequencyOrDuration: 'Velocità di infusione in pompa: ' + (volHolliday / 24).toFixed(1) + ' mL/h'
        }
      ];
    }
  },
  {
    id: 'ringer-lattato',
    name: 'Ringer Lattato / Acetato (Cristalloidi Bilanciati)',
    commercialNames: ['Ringer Lattato sacche'],
    category: 'liquidi',
    sectionNum: 12,
    sectionTitle: 'Liquidi Endovenosi e Gestione dell\'Ipoglicemia',
    summaryDose: 'Bolo: 10-20 mL/kg in 5-20 min EV/IO',
    routes: ['EV', 'IO'],
    indications: [
      'CRISTALLOIDE BILANCIATO DI 1ª SCELTA NELLO SHOCK SETTICO (Surviving Sepsis Campaign 2020)',
      'Shock ipovolemico',
      'Ustioni estese e politrauma grave'
    ],
    contraindications: [
      'Iperkaliemia severa nota (contiene potassio ~4 mEq/L)',
      'Epatopatia severa avanzata (compromissione della conversione metabolica del lattato)'
    ],
    adverseEffectsAndNotes: [
      'Composizione elettrolitica più fisiologica rispetto alla soluzione fisiologica 0,9%: minor rischio di acidosi ipercloremica e di insufficienza renale acuta nei carichi idrici importanti.'
    ],
    calculateDoses: (w: number) => {
      const vol10 = Math.round(w * 10);
      const vol20 = Math.round(w * 20);

      return [
        {
          label: 'Bolo di espansione (10-20 mL/kg)',
          route: 'EV / IO rapido',
          rawFormula: '10-20 mL/kg in 10-20 minuti',
          calculatedValue: `${vol10} - ${vol20} mL`,
          unit: 'mL',
          numericDose: vol20,
          frequencyOrDuration: 'In 10-20 minuti; rivalutazione immediata al termine'
        }
      ];
    }
  },

  // 13. SEPSI E SHOCK SETTICO PEDIATRICO
  {
    id: 'sepsi-cristalloidi',
    name: 'Cristalloidi Bilanciati in Sepsi (1ª Scelta SSC 2020)',
    commercialNames: ['Ringer Lattato o Ringer Acetato'],
    category: 'sepsi',
    sectionNum: 13,
    sectionTitle: 'Sepsi e Shock Settico Pediatrico',
    summaryDose: 'Bolo: 10-20 mL/kg in 10-20 min (fino a 40-60 mL/kg nella 1ª ora se disponibilità di TI)',
    routes: ['EV', 'IO'],
    indications: [
      'Sepsi e Shock settico con segni clinici di ipoperfusione tissutale (tachicardia, alterazione dello stato di coscienza, refill capillare prolungato >3s o flash <1s, oliguria, polsi deboli)'
    ],
    contraindications: [
      'Segni di sovraccarico di volume (epatomegalia in peggioramento, rantoli polmonari crepitanti, comparsa di ritmo di galoppo, distress respiratorio ingravescente): sospendere immediatamente ulteriori boli!'
    ],
    adverseEffectsAndNotes: [
      'Linee Guida Surviving Sepsis Campaign Pediatrica 2020: preferire cristalloidi bilanciati a NaCl 0,9%.',
      'Attuare tecnica rapida: push-pull con rubinetto a 3 vie, o sacca pressurizzata (pressure bag).',
      'Rivalutazione clinica sistematica dopo OGNI BOLO: proseguire i boli solo se persistono segni di shock senza segni di sovraccarico.',
      'Se non disponibile terapia intensiva e paziente è normoteso: non somministrare boli liberi aggressivi, iniziare fluidi di mantenimento.'
    ],
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const b10 = Math.round(w * 10);
      const b20 = Math.round(w * 20);
      const maxTot = Math.round(w * 60);

      return [
        {
          label: 'Bolo iniziale in Push-Pull (10-20 mL/kg in 10-20 min)',
          route: 'EV / IO rapido',
          rawFormula: '10-20 mL/kg in 10-20 minuti. Rivalutare fegato, polmoni, refill e FC dopo ogni bolo.',
          calculatedValue: `${b10} - ${b20} mL`,
          unit: 'mL',
          numericDose: b20,
          volumeInfo: `Bolo singolo: ${b10} - ${b20} mL | Totale cumulativo max nella prima ora: fino a ${maxTot} mL (se TI disponibile)`,
          frequencyOrDuration: 'In 10-20 minuti; rivalutazione continua'
        }
      ];
    }
  },
  {
    id: 'ceftriaxone-sepsi',
    name: 'Ceftriaxone (Antibiotico Empirico Sepsi Comunitaria)',
    commercialNames: ['Rocefin'],
    category: 'sepsi',
    sectionNum: 13,
    sectionTitle: 'Sepsi e Shock Settico Pediatrico',
    summaryDose: 'EV/IO: 50-100 mg/kg (max 2-4 g) ENTRO 1 ORA dal riconoscimento',
    routes: ['EV', 'IO'],
    indications: [
      'Sepsi e shock settico di sospetta origine comunitaria: somministrare OBBLIGATORIAMENTE ENTRO 1 ORA dal riconoscimento clinico, in parallelo o subito dopo l\'avvio dell\'espansione volemica.'
    ],
    contraindications: [
      'Neonato < 28 giorni o con iperbilirubinemia (usare Cefotaxime)',
      'Allergia nota alle cefalosporine'
    ],
    adverseEffectsAndNotes: [
      'OGNI ORA DI RITARDO nella somministrazione dell\'antibiotico nella sepsi è associata a un aumento statisticamente significativo della mortalità.',
      'Eseguire rapidamente emocolture se possibile, MA NON ATTENDERE i risultati o ritardare l\'antibiotico se l\'emocoltura è difficoltosa.'
    ],
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const dose = Math.min(Math.round(w * 100), 4000);
      const isMax = w * 100 >= 4000;
      return [
        {
          label: 'Bolo EV / IO da somministrare ENTRO 1 ORA',
          route: 'EV / IO rapido in 20-30 min',
          rawFormula: '50-100 mg/kg (max 2-4 g) il prima possibile',
          calculatedValue: `${dose} mg`,
          unit: 'mg',
          numericDose: dose,
          maxDoseCap: 'Max 4.000 mg (4 g)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Immediatamente entro la prima ora ("Golden Hour")'
        }
      ];
    }
  },
  {
    id: 'noradrenalina',
    name: 'Noradrenalina (Vasopressore Shock Settico)',
    commercialNames: ['Noradrenalina tartrato fiale 2 mg/mL'],
    category: 'sepsi',
    sectionNum: 13,
    sectionTitle: 'Sepsi e Shock Settico Pediatrico',
    summaryDose: 'Infusione continua EV/IO: 0,05-2 mcg/kg/min titolando su pressione arteriosa e perfusione',
    routes: ['EV continua', 'IO continua'],
    indications: [
      'Shock settico refrattario ai fluidi (persistenza di segni di ipoperfusione o ipotensione dopo 40-60 mL/kg di cristalloidi)',
      'Vasopressore di prima scelta nello shock settico pediatrico secondo le linee guida SSC 2020'
    ],
    contraindications: [
      'Ipovolemia non corretta: prima ottimizzare il riempimento volemico!'
    ],
    adverseEffectsAndNotes: [
      'Da avviare precocemente se lo shock è fluido-refrattario.',
      'Preferibile via venosa centrale, ma in emergenza vitale somministrabile tramite accesso periferico o intraosseo in attesa del CVC.',
      'Titolare con pompa siringa graduata sotto monitoraggio emodinamico continuo in ambiente sub-intensivo o intensivo.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const rateMin = Number((w * 0.05).toFixed(2));
      const rateMax = Number((w * 0.3).toFixed(2));
      const rateCeil = Number((w * 2.0).toFixed(2));

      return [
        {
          label: 'Infusione continua (mcg/min)',
          route: 'EV continua / IO (pompa siringa)',
          rawFormula: '0,05-2 mcg/kg/min (inizio tipico a 0,05-0,1 mcg/kg/min, titolare ogni 5-10 min)',
          calculatedValue: `Inizio: ${rateMin} - ${rateMax} mcg/min (fino a max ${rateCeil} mcg/min)`,
          unit: 'mcg/min',
          numericDose: rateMin,
          preparationAdvice: `Esempio diluizione standard: diluire Noradrenalina in Glucosata 5% a concentrazione nota (es. 20 mcg/mL o 40 mcg/mL). Ad es. a 20 mcg/mL, velocità pompa iniziale = ${(rateMin * 60 / 20).toFixed(1)} mL/h`,
          frequencyOrDuration: 'Titolare continuamente per normalizzare PAM e ripristinare refill capillare < 2 sec'
        }
      ];
    }
  },

  // 14. CHETOACIDOSI DIABETICA (DKA) IN ETÀ PEDIATRICA
  {
    id: 'dka-espansione',
    name: 'Soluzione Fisiologica 0,9% (DKA Espansione Iniziale)',
    commercialNames: ['NaCl 0,9%'],
    category: 'dka',
    sectionNum: 14,
    sectionTitle: 'Chetoacidosi Diabetica (DKA) in Età Pediatrica',
    summaryDose: '10-20 mL/kg EV in 20-30 minuti, SOLO se segni di shock/ipoperfusione significativa',
    routes: ['EV'],
    indications: [
      'Chetoacidosi diabetica (DKA) con compromissione conclamata della perfusione tissutale / ipotensione'
    ],
    contraindications: [
      'NON ESEGUIRE BOLI AGGRESSIVI RIPETUTI SENZA INDICAZIONE: ELEVATISSIMO RISCHIO DI PRECIPITARE EDEMA CEREBRALE!'
    ],
    adverseEffectsAndNotes: [
      'Linee guida ISPAD 2022: se il paziente non è in shock, evitare boli rapidi; calcolare la reidratazione complessiva (deficit stimato 5-10% + mantenimento) e distribuirla gradualmente e lentamente nelle 24-48 ore.',
      'Il tasso di infusione NON deve essere ridotto bruscamente per correggere la sodiemia.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const vol10 = Math.round(w * 10);
      const vol20 = Math.round(w * 20);

      return [
        {
          label: 'Bolo iniziale prudente solo se ipoperfusione (10-20 mL/kg)',
          route: 'EV in 20-30 min',
          rawFormula: '10-20 mL/kg in 20-30 minuti (solo se shock / ipoperfusione)',
          calculatedValue: `${vol10} - ${vol20} mL`,
          unit: 'mL',
          numericDose: vol10,
          frequencyOrDuration: 'In 20-30 minuti; poi passare a reidratazione lenta calcolata sulle 24-48h'
        }
      ];
    }
  },
  {
    id: 'insulina-dka',
    name: 'Insulina Regolare (Infusione Continua DKA)',
    commercialNames: ['Actrapid', 'Humulin R'],
    category: 'dka',
    sectionNum: 14,
    sectionTitle: 'Chetoacidosi Diabetica (DKA) in Età Pediatrica',
    summaryDose: 'EV continua: 0,05-0,1 UI/kg/ora, iniziata ALMENO 1 ORA DOPO l\'avvio della reidratazione (MAI IN BOLO!)',
    routes: ['EV infusione continua'],
    indications: [
      'Chetoacidosi diabetica confermata (iperglicemia > 200 mg/dL, acidosi metabolica con pH < 7.30 o HCO3 < 15, chetonemia > 3 mmol/L)'
    ],
    contraindications: [
      'NON SOMMINISTRARE MAI IN BOLO EV (aumenta enormemente il rischio di edema cerebrale e ipokaliemia fatale).',
      'Ipopotassiemia non corretta (se K+ < 3,3 mEq/L: correggere PRIMA il potassio prima di avviare l\'insulina).'
    ],
    adverseEffectsAndNotes: [
      'NON SOSPENDERE L\'INFUSIONE DI INSULINA alla normalizzazione della glicemia: quando la glicemia scende sotto 250-300 mg/dL, AGGIUNGERE GLUCOSIO (5-10%) AI LIQUIDI INFUSI e continuare l\'insulina fino a completa risoluzione dell\'acidosi e della chetonemia!',
      'Dose bassa (0,05 UI/kg/h) è associata a minor rischio di ipoglicemia e ipopotassiemia rispetto a 0,1 UI/kg/h con pari efficacia terapeutica (ISPAD 2022).'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const ui005 = Number((w * 0.05).toFixed(2));
      const ui01 = Number((w * 0.1).toFixed(2));

      return [
        {
          label: 'Infusione Continua EV in Pompa (Iniziare ≥ 1h dopo i fluidi)',
          route: 'EV continua (MAI in bolo!)',
          rawFormula: '0,05-0,1 UI/kg/h in infusione continua',
          calculatedValue: `${ui005} - ${ui01} UI/ora`,
          unit: 'UI/h',
          numericDose: ui005,
          preparationAdvice: 'Preparazione standard: 50 UI di insulina regolare in 50 mL di SF (1 UI/mL). Velocità pompa siringa: ' + ui005 + ' - ' + ui01 + ' mL/h',
          frequencyOrDuration: 'Continua fino a risoluzione di acidosi e chetoacidosi'
        }
      ];
    }
  },
  {
    id: 'potassio-dka',
    name: 'Potassio Cloruro (KCl nella DKA)',
    commercialNames: ['KCl concentrato fiale'],
    category: 'dka',
    sectionNum: 14,
    sectionTitle: 'Chetoacidosi Diabetica (DKA) in Età Pediatrica',
    summaryDose: '20-40 mEq/L nei liquidi di infusione (dopo documentata diuresi e K+ < 5,5 mEq/L). MAI in bolo rapido!',
    routes: ['EV in infusione diluita'],
    indications: [
      'Prevenzione e correzione tempestiva dell\'ipopotassiemia durante il trattamento della DKA (l\'insulina causa un massivo shift intracellulare di K+)'
    ],
    contraindications: [
      'Iperpotassiemia documentata (K+ > 5,5 mEq/L)',
      'Anuria persistente (attendere la prima minzione prima di aggiungere KCl ai liquidi)'
    ],
    adverseEffectsAndNotes: [
      'MAI SOMMINISTRARE IN BOLO EV RAPIDO (arresto cardiaco letale).',
      'Monitoraggio elettrocardiografico continuo ed emogas/elettroliti seriati ogni 2-4 ore durante tutta la terapia insulinica.'
    ],
    highRisk: true,
    calculateDoses: () => {
      return [
        {
          label: 'Supplementazione nei liquidi di infusione',
          route: 'EV in sacca ben miscelata',
          rawFormula: '20-40 mEq/L nei liquidi EV una volta verificata la diuresi e K+ < 5,5 mEq/L',
          calculatedValue: '20 - 40 mEq per ogni Litro di liquidi',
          unit: 'mEq/L',
          preparationAdvice: 'Miscelare accuratamente nella sacca dei liquidi. Velocità max di somministrazione: non superare 0,5 mEq/kg/h.',
          frequencyOrDuration: 'In infusione continua con i liquidi di reidratazione'
        }
      ];
    }
  },
  {
    id: 'mannitolo-dka',
    name: 'Mannitolo 20% (Emergenza Edema Cerebrale in DKA)',
    commercialNames: ['Mannitolo 20% flaconi'],
    category: 'dka',
    sectionNum: 14,
    sectionTitle: 'Chetoacidosi Diabetica (DKA) in Età Pediatrica',
    summaryDose: '0,5-1 g/kg EV in 10-15 min ai primi segni di allarme per edema cerebrale',
    routes: ['EV in 10-15 min'],
    indications: [
      'SEGNI DI ALLARME EDEMA CEREBRALE IN DKA (cefalea intensa ingravescente, bradicardia relativa o ipertensione - riflesso di Cushing, sopore o irritabilità marcata, incontinenza urinaria/fecale improvvisa, anomalie pupillari)'
    ],
    contraindications: ['Nessuna in caso di sospetto edema cerebrale imminente.'],
    adverseEffectsAndNotes: [
      'TRATTARE IMMEDIATAMENTE AL SOSPETTO CLINICO: NON ATTENDERE LA TC CEREBRALE!',
      'Sospendere o dimezzare la velocità dei liquidi EV di infusione, sollevare la testiera a 30°, allertare la Rianimazione/Terapia Intensiva.',
      'Alternativa equivalente al Mannitolo: Soluzione Salina Ipertonica al 3% (5-10 mL/kg in 10-15 min).'
    ],
    highRisk: true,
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const gMin = Math.min(Number((w * 0.5).toFixed(1)), 50);
      const gMax = Math.min(Number((w * 1.0).toFixed(1)), 100);
      const isMax = w * 1.0 >= 100;
      // Mannitolo 20% = 20 g / 100 mL = 0,2 g/mL -> mL = g * 5
      const mlMin = (gMin * 5).toFixed(0);
      const mlMax = (gMax * 5).toFixed(0);
      const hypertonicSalineMin = Math.min(Math.round(w * 5), 250);
      const hypertonicSalineMax = Math.min(Math.round(w * 10), 500);

      return [
        {
          label: 'Mannitolo 20% EV immediato (in 10-15 min)',
          route: 'EV rapido in 10-15 min',
          rawFormula: '0,5-1 g/kg di Mannitolo 20% (= 2,5-5 mL/kg, max 100 g / 500 mL) in 10-15 minuti',
          calculatedValue: `${gMin} - ${gMax} g (${mlMin} - ${mlMax} mL di Mannitolo 20%)`,
          unit: 'g',
          numericDose: gMin,
          volumeInfo: `Aspirare ${mlMin} - ${mlMax} mL di Mannitolo 20% e infondere in 10-15 minuti con filtro`,
          maxDoseCap: 'Max 100 g (500 mL di sol. 20%) per singola somministrazione',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Immediatamente al minimo sospetto. Ripetibile dopo 30 min se non miglioramento'
        },
        {
          label: 'Alternativa: Soluzione Salina Ipertonica NaCl 3%',
          route: 'EV in 10-15 min',
          rawFormula: '5-10 mL/kg di NaCl 3% in 10-15 minuti (max 250-500 mL)',
          calculatedValue: `${hypertonicSalineMin} - ${hypertonicSalineMax} mL`,
          unit: 'mL',
          numericDose: hypertonicSalineMin,
          maxDoseCap: 'Max 250-500 mL per bolo',
          frequencyOrDuration: 'In 10-15 minuti in alternativa al mannitolo'
        }
      ];
    }
  }
];
