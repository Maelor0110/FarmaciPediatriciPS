import { DrugItem, CalculatedDose } from '../types';

export const DRUGS_GROUP_1: DrugItem[] = [
  // 2. ANALGESICI E ANTIPIRETICI
  {
    id: 'paracetamolo',
    name: 'Paracetamolo',
    commercialNames: ['Tachipirina', 'Perfalgan', 'Efferalgan'],
    category: 'analgesici',
    sectionNum: 2,
    sectionTitle: 'Analgesici e Antipiretici',
    summaryDose: '15 mg/kg/dose ogni 6h (max 1 g/dose, max 60 mg/kg/die o 4 g/die)',
    routes: ['OS', 'PR', 'EV'],
    indications: ['Dolore lieve-moderato', 'Febbre (T > 38°C con malessere)'],
    contraindications: ['Insufficienza epatica grave', 'Ipersensibilità nota al paracetamolo'],
    adverseEffectsAndNotes: [
      'Antipiretico/analgesico di prima scelta in età pediatrica.',
      'Epatotossico in sovradosaggio: rispettare scrupolosamente la dose massima/die.',
      'In caso di tossicità acuta: Antidoto N-Acetilcisteina.'
    ],
    calculateDoses: (w: number) => {
      const doseOral = Math.min(Math.round(w * 15), 1000);
      const isMax = w * 15 >= 1000;
      const maxDaily = Math.min(Math.round(w * 60), 4000);
      const syrVol = (doseOral / 24).toFixed(1); // sciroppo 120mg/5mL = 24 mg/mL
      const drops = Math.round(doseOral / 3.6); // gocce 100mg/mL ~ 2.8 mg/goccia

      const evDose = w < 10 
        ? `${Math.round(w * 7.5)}-${Math.round(w * 10)} mg`
        : `${doseOral} mg`;

      return [
        {
          label: 'Orale / Rettale',
          route: 'OS / PR',
          rawFormula: '15 mg/kg/dose ogni 6h (max 1 g singola; max 60 mg/kg/die o 4 g/die)',
          calculatedValue: `${doseOral} mg`,
          unit: 'mg',
          numericDose: doseOral,
          volumeInfo: `Sciroppo 120 mg/5 mL (24 mg/mL): ~${syrVol} mL | Gocce 100 mg/mL: ~${drops} gtt`,
          maxDoseCap: 'Max 1.000 mg (1 g) singola dose | Max die: ' + maxDaily + ' mg',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 6 ore (max 4 somministrazioni/24h)'
        },
        {
          label: 'Endovenoso (EV lenta in 15 min)',
          route: 'EV',
          rawFormula: 'Neonato/lattante <10 kg: 7,5-10 mg/kg ogni 6h; ≥10 kg: 15 mg/kg ogni 6h (max 1 g)',
          calculatedValue: evDose,
          unit: 'mg',
          volumeInfo: w < 10 
            ? `Soluzione 10 mg/mL: ${(w * 0.75).toFixed(1)} - ${(w * 1.0).toFixed(1)} mL`
            : `Soluzione 10 mg/mL (Perfalgan 100 mL): ${(doseOral / 10).toFixed(1)} mL`,
          maxDoseCap: 'Max 1.000 mg per dose',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 6 ore'
        }
      ];
    }
  },
  {
    id: 'ibuprofene',
    name: 'Ibuprofene',
    commercialNames: ['Nurofen Febbre e Dolore', 'Moment', 'Cibalgina'],
    category: 'analgesici',
    sectionNum: 2,
    sectionTitle: 'Analgesici e Antipiretici',
    summaryDose: '5-10 mg/kg/dose ogni 6-8h OS (max 40 mg/kg/die o 2,4 g/die)',
    routes: ['OS'],
    indications: [
      'Dolore lieve-moderato',
      'Febbre',
      'Componente flogistica evidente (es. otite media, faringite acuta)'
    ],
    contraindications: [
      'Età < 3-6 mesi (usare estrema cautela)',
      'Disidratazione attiva o ipovolemia (rischio insufficienza renale acuta)',
      'Insufficienza renale nota',
      'Varicella in atto (rischio aumentato di infezioni cutanee invasive da streptococco / fascite)',
      'Ulcera peptica / emorragia gastrointestinale attiva',
      'Asma sensibile a FANS (broncospasmo da aspirina/FANS)'
    ],
    adverseEffectsAndNotes: [
      'Gastrolesivo: somministrare preferibilmente a stomaco pieno o con latte.',
      'Evitare assolutamente nel bambino disidratato per rischio nefrotossicità acuta.'
    ],
    calculateDoses: (w: number) => {
      const minDose = Math.min(Math.round(w * 5), 800);
      const maxDose = Math.min(Math.round(w * 10), 800);
      const isMax = w * 10 >= 800;
      const maxDie = Math.min(Math.round(w * 40), 2400);
      // Sciroppo 100 mg/5 mL (20 mg/mL) o 200 mg/5 mL (40 mg/mL)
      const vol100 = (maxDose / 20).toFixed(1);
      const vol200 = (maxDose / 40).toFixed(1);

      return [
        {
          label: 'Orale (Sospensione / Compresse)',
          route: 'OS',
          rawFormula: '5-10 mg/kg/dose ogni 6-8h (max 40 mg/kg/die o 2,4 g/die; max 800 mg/dose)',
          calculatedValue: `${minDose} - ${maxDose} mg`,
          unit: 'mg',
          numericDose: maxDose,
          volumeInfo: `A 10 mg/kg -> Sosp. 100 mg/5 mL: ${vol100} mL | Sosp. 200 mg/5 mL: ${vol200} mL`,
          maxDoseCap: `Max singola: 800 mg | Max giornaliera: ${maxDie} mg/die`,
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 6-8 ore al bisogno (a stomaco pieno)'
        }
      ];
    }
  },
  {
    id: 'ketorolac',
    name: 'Ketorolac',
    commercialNames: ['Toradol', 'Lixidol'],
    category: 'analgesici',
    sectionNum: 2,
    sectionTitle: 'Analgesici e Antipiretici',
    summaryDose: '0,5 mg/kg/dose ogni 6-8h EV/IM (max 30 mg/dose)',
    routes: ['EV', 'IM'],
    indications: ['Dolore acuto moderato-severo (es. colica renale, post-operatorio, trauma)'],
    contraindications: [
      'Età < 6 mesi',
      'Insufficienza renale acuta o cronica',
      'Sanguinamento attivo o sospetto rischio emorragico (piastrinopenia, coagulopatia)',
      'Disidratazione / ipovolemia marcata',
      'Asma da FANS'
    ],
    adverseEffectsAndNotes: [
      'Uso di breve durata: max 5 giorni (non oltre 48-72h raccomandato in pediatria).',
      'Monitorare la diuresi e la funzione renale.'
    ],
    calculateDoses: (w: number) => {
      const dose = Math.min(Number((w * 0.5).toFixed(1)), 30);
      const isMax = w * 0.5 >= 30;
      // Fiala 30 mg/mL
      const vol = (dose / 30).toFixed(2);

      return [
        {
          label: 'Endovenoso / Intramuscolare',
          route: 'EV / IM',
          rawFormula: '0,5 mg/kg/dose ogni 6-8h (max 30 mg/dose; durata max 48-72h)',
          calculatedValue: `${dose} mg`,
          unit: 'mg',
          numericDose: dose,
          volumeInfo: `Fiala 30 mg/1 mL: aspirare ~${vol} mL (diluire in SF per infusione EV in 15 min)`,
          maxDoseCap: 'Max 30 mg per singola dose',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 6-8 ore (massimo 48-72 ore)'
        }
      ];
    }
  },
  {
    id: 'morfina-solfato',
    name: 'Morfina Solfato',
    commercialNames: ['Morfina Cloridrato/Solfato fiale'],
    category: 'analgesici',
    sectionNum: 2,
    sectionTitle: 'Analgesici e Antipiretici',
    summaryDose: '0,05-0,1 mg/kg/dose EV lenta ogni 2-4h | Infusione: 0,01-0,04 mg/kg/h',
    routes: ['EV', 'SC', 'IM'],
    indications: ['Dolore severo (trauma grave, ustioni estese, dolore oncologico, post-chirurgico)'],
    contraindications: [
      'Depressione respiratoria in atto senza supporto ventilatorio',
      'Ipotensione grave / shock non controllato',
      'Trauma cranico con alterazione dello stato di coscienza (estrema cautela)',
      'Ileo paralitico o occlusione intestinale acuta'
    ],
    adverseEffectsAndNotes: [
      'Rischio depressione respiratoria e ipotensione: monitoraggio continuo SpO2, FR, FC, PA.',
      'Antidoto specifico: NALOXONE (tenere sempre disponibile al letto del paziente).',
      'Titolare lentamente in bolo in almeno 5-10 minuti diluito in SF.'
    ],
    antidote: 'Naloxone (0,01-0,1 mg/kg)',
    highRisk: true,
    calculateDoses: (w: number) => {
      const minDose = Number((w * 0.05).toFixed(2));
      const maxDose = Math.min(Number((w * 0.1).toFixed(2)), 10);
      const isMax = w * 0.1 >= 10;
      // Fiala 10 mg/mL -> diluita 1:10 con SF a 1 mg/mL per facilità di aspirazione
      const volDilutedMin = (minDose * 1).toFixed(1);
      const volDilutedMax = (maxDose * 1).toFixed(1);
      const infMin = (w * 0.01).toFixed(2);
      const infMax = (w * 0.04).toFixed(2);

      return [
        {
          label: 'Bolo EV lento (5-10 min)',
          route: 'EV lenta / SC / IM',
          rawFormula: '0,05-0,1 mg/kg/dose lenta, ripetibile ogni 2-4h (max singola 10 mg)',
          calculatedValue: `${minDose} - ${maxDose} mg`,
          unit: 'mg',
          numericDose: maxDose,
          volumeInfo: `Con diluizione standard a 1 mg/mL (1 fiala 10 mg portata a 10 mL con SF): somministrare ${volDilutedMin} - ${volDilutedMax} mL`,
          maxDoseCap: 'Max 10 mg per dose iniziale',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ripetibile ogni 2-4 ore se necessario sotto monitoraggio'
        },
        {
          label: 'Infusione continua EV',
          route: 'EV continua',
          rawFormula: '0,01-0,04 mg/kg/ora',
          calculatedValue: `${infMin} - ${infMax} mg/h`,
          unit: 'mg/h',
          preparationAdvice: 'Preparare siringa con pompa siringa graduata sotto monitoraggio continuo.',
          frequencyOrDuration: 'Titolare sul controllo algico e parametri respiratori'
        }
      ];
    }
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    commercialNames: ['Fentanest', 'Sublimaze'],
    category: 'analgesici',
    sectionNum: 2,
    sectionTitle: 'Analgesici e Antipiretici',
    summaryDose: 'EV: 1-2 mcg/kg/dose (max 50-100 mcg) | IN: 1,5-2 mcg/kg/dose',
    routes: ['EV', 'IN'],
    indications: [
      'Dolore severo acuto (fratture, ustioni, dolore traumatico)',
      'Analgesia procedurale rapida',
      'Ottimo per via intranasale (IN) quando l\'accesso venoso è difficoltoso o assente'
    ],
    contraindications: [
      'Depressione respiratoria grave',
      'Ipersensibilità nota agli oppioidi sintetici'
    ],
    adverseEffectsAndNotes: [
      'Rigidità toracica (chest wall rigidity) possibile se bolo EV troppo rapido (somministrare in 2-3 min).',
      'Emivita breve (30-60 min): ideale per procedure acute e brevi in PS.',
      'Antidoto: NALOXONE.',
      'Per via IN usare il dispositivo MAD (Mucosal Atomization Device) con fiala non diluita da 50 mcg/mL.'
    ],
    antidote: 'Naloxone',
    highRisk: true,
    calculateDoses: (w: number) => {
      const evMin = Math.min(Math.round(w * 1), 100);
      const evMax = Math.min(Math.round(w * 2), 100);
      const isMaxEv = w * 2 >= 100;
      const inMin = Math.min(Math.round(w * 1.5), 100);
      const inMax = Math.min(Math.round(w * 2.0), 100);

      // Fiala standard 50 mcg/mL (0,05 mg/mL)
      const evVolMin = (evMin / 50).toFixed(2);
      const evVolMax = (evMax / 50).toFixed(2);
      const inVol = (inMin / 50).toFixed(2);

      return [
        {
          label: 'Via Intranasale (IN con dispositivo MAD)',
          route: 'IN',
          rawFormula: '1,5-2 mcg/kg/dose (usare fiala pura 50 mcg/mL; max 100 mcg)',
          calculatedValue: `${inMin} - ${inMax} mcg`,
          unit: 'mcg',
          numericDose: inMin,
          volumeInfo: `Fiala da 50 mcg/mL pura: aspirare ~${inVol} mL (dividere metà volume per narice, max 0,5 mL/narice)`,
          maxDoseCap: 'Max 100 mcg per singola dose',
          isMaxDoseReached: w * 2 >= 100,
          frequencyOrDuration: 'Ripetibile dopo 10-15 min se analgesia incompleta'
        },
        {
          label: 'Via Endovenosa (EV bolo lento in 2-3 min)',
          route: 'EV',
          rawFormula: '1-2 mcg/kg/dose lenta (max 50-100 mcg)',
          calculatedValue: `${evMin} - ${evMax} mcg`,
          unit: 'mcg',
          numericDose: evMax,
          volumeInfo: `Fiala da 50 mcg/mL: aspirare ${evVolMin} - ${evVolMax} mL (infondere lentamente)`,
          maxDoseCap: 'Max singola dose 50-100 mcg',
          isMaxDoseReached: isMaxEv,
          frequencyOrDuration: 'Ripetibile ogni 30-60 min sotto monitoraggio'
        }
      ];
    }
  },

  // 3. SEDAZIONE E ANALGESIA PROCEDURALE
  {
    id: 'midazolam-sedazione',
    name: 'Midazolam (Sedazione Procedurale)',
    commercialNames: ['Ipnovel', 'Buccolam'],
    category: 'sedazione',
    sectionNum: 3,
    sectionTitle: 'Sedazione e Analgesia Procedurale',
    summaryDose: 'EV: 0,05-0,1 mg/kg (max 2-4 mg) | IN/Buccale: 0,3-0,5 mg/kg (max 10 mg) | OS: 0,5 mg/kg | IM: 0,1-0,2 mg/kg',
    routes: ['EV', 'IN', 'Buccale', 'OS', 'IM', 'PR'],
    indications: [
      'Sedazione procedurale per manovre dolorose o ansiogene (riduzione fratture, suture complesse)',
      'Ansiolisi pre-procedura o pre-operatoria',
      'Stato di male epilettico (seconda/prima linea alternativa)'
    ],
    contraindications: [
      'Glaucoma ad angolo acuto',
      'Insufficienza respiratoria grave non assistita',
      'Miastenia gravis'
    ],
    adverseEffectsAndNotes: [
      'Depressione respiratoria specie se associato a oppioidi: monitoraggio continuo SpO2 e FC.',
      'Antidoto: FLUMAZENIL.',
      'Da riservare a personale formato in gestione delle vie aeree.'
    ],
    antidote: 'Flumazenil (0,01 mg/kg)',
    highRisk: true,
    calculateDoses: (w: number) => {
      const evMin = Number(Math.min(w * 0.05, 2.5).toFixed(2));
      const evMax = Number(Math.min(w * 0.1, 4.0).toFixed(2));
      const inMin = Number(Math.min(w * 0.3, 10).toFixed(2));
      const inMax = Number(Math.min(w * 0.5, 10).toFixed(2));
      const oralDose = Number(Math.min(w * 0.5, 20).toFixed(1));

      return [
        {
          label: 'Intranasale / Buccale (MAD o Buccolam)',
          route: 'IN / Buccale',
          rawFormula: '0,3-0,5 mg/kg (max 10 mg)',
          calculatedValue: `${inMin} - ${inMax} mg`,
          unit: 'mg',
          numericDose: inMin,
          volumeInfo: `Con fiala 5 mg/mL: ${(inMin / 5).toFixed(2)} - ${(inMax / 5).toFixed(2)} mL (metà per narice)`,
          maxDoseCap: 'Max 10 mg',
          isMaxDoseReached: w * 0.5 >= 10,
          frequencyOrDuration: 'Insorgenza in 5-10 min'
        },
        {
          label: 'Endovenoso lento (2-3 min)',
          route: 'EV',
          rawFormula: '0,05-0,1 mg/kg/dose (max 2-4 mg)',
          calculatedValue: `${evMin} - ${evMax} mg`,
          unit: 'mg',
          numericDose: evMax,
          volumeInfo: `Con fiala 1 mg/mL: ${evMin} - ${evMax} mL | Con fiala 5 mg/mL: ${(evMin/5).toFixed(2)} - ${(evMax/5).toFixed(2)} mL`,
          maxDoseCap: 'Max 2-4 mg singola dose',
          isMaxDoseReached: w * 0.1 >= 4,
          frequencyOrDuration: 'Titolare a piccoli incrementi'
        },
        {
          label: 'Orale (pre-medicazione)',
          route: 'OS',
          rawFormula: '0,5 mg/kg (max 15-20 mg)',
          calculatedValue: `${oralDose} mg`,
          unit: 'mg',
          numericDose: oralDose,
          maxDoseCap: 'Max 15-20 mg',
          isMaxDoseReached: w * 0.5 >= 20,
          frequencyOrDuration: 'Somministrare 20-30 min prima della procedura'
        }
      ];
    }
  },
  {
    id: 'ketamina',
    name: 'Ketamina',
    commercialNames: ['Ketalar', 'Ketavet'],
    category: 'sedazione',
    sectionNum: 3,
    sectionTitle: 'Sedazione e Analgesia Procedurale',
    summaryDose: 'EV: 1-1,5 mg/kg bolo lento (2 min), rip. 0,5 mg/kg | IM: 4-5 mg/kg',
    routes: ['EV', 'IM'],
    indications: [
      'Sedoanalgesia procedurale (riduzione fratture/lussazioni, suture complesse, drenaggi)',
      'Paziente emodinamicamente instabile (preserva la pressione arteriosa)',
      'Asma grave refrattario (potente effetto broncodilatatore)'
    ],
    contraindications: [
      'Età < 3 mesi (cautela per rischio laringospasmo)',
      'Trauma cranico con ipertensione endocranica grave (uso controverso, oggi meno assoluto)',
      'Psicosi nota',
      'Patologia oftalmica con aumento della pressione intraoculare',
      'Ipertensione arteriosa grave non controllata'
    ],
    adverseEffectsAndNotes: [
      'Scialorrea frequente: premedicare con Atropina se necessario.',
      'Reazioni di emergenza (allucinazioni, agitazione al risveglio): utile premedicare con Midazolam.',
      'Mantiene i riflessi delle vie aeree e il respiro spontaneo, ma preparare sempre presidi vie aeree.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const evMin = Number((w * 1.0).toFixed(1));
      const evMax = Number((w * 1.5).toFixed(1));
      const imMin = Number((w * 4.0).toFixed(1));
      const imMax = Number((w * 5.0).toFixed(1));
      // Fiala 50 mg/mL (10 mg/mL dopo diluizione)
      const evVolConc = (evMin / 50).toFixed(2);
      const evVolDil10 = (evMin / 10).toFixed(1);

      return [
        {
          label: 'EV bolo lento (in 2 minuti)',
          route: 'EV',
          rawFormula: '1-1,5 mg/kg in bolo lento (2 min), ripetibile 0,5 mg/kg al bisogno',
          calculatedValue: `${evMin} - ${evMax} mg`,
          unit: 'mg',
          numericDose: evMin,
          volumeInfo: `Se diluito a 10 mg/mL con SF: somministrare ${(evMin/10).toFixed(1)} - ${(evMax/10).toFixed(1)} mL (da fiala 50 mg/mL: ${evVolConc} mL)`,
          frequencyOrDuration: 'Inizio azione in 1 min, durata 10-15 min; ripetibile a 0,5 mg/kg'
        },
        {
          label: 'IM (se accesso venoso assente)',
          route: 'IM',
          rawFormula: '4-5 mg/kg/dose',
          calculatedValue: `${imMin} - ${imMax} mg`,
          unit: 'mg',
          numericDose: imMin,
          volumeInfo: `Fiala da 50 mg/mL pura: ${(imMin / 50).toFixed(1)} - ${(imMax / 50).toFixed(1)} mL IM`,
          frequencyOrDuration: 'Inizio azione in 3-5 min, durata 20-30 min'
        }
      ];
    }
  },
  {
    id: 'propofol',
    name: 'Propofol',
    commercialNames: ['Diprivan'],
    category: 'sedazione',
    sectionNum: 3,
    sectionTitle: 'Sedazione e Analgesia Procedurale',
    summaryDose: 'EV: 1-2 mg/kg bolo lento, mantenimento 1-2 mg/kg ripetibile',
    routes: ['EV'],
    indications: ['Sedazione procedurale profonda (solo personale esperto in gestione avanzata vie aeree)'],
    contraindications: [
      'Allergia a uovo / soia (formulazione lipidica)',
      'Instabilità emodinamica o shock ipovolemico',
      'Età neonatale (uso con estrema cautela)'
    ],
    adverseEffectsAndNotes: [
      'Elevato rischio di apnea transitoria e ipotensione arteriosa.',
      'Necessita di monitoraggio avanzato continuo e disponibilità immediata di presidi per intubazione.',
      'Riservato ad anestesisti / rianimatori o medici d\'urgenza specificamente accreditati.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const minDose = Number((w * 1.0).toFixed(1));
      const maxDose = Number((w * 2.0).toFixed(1));
      // Formulazione 1% = 10 mg/mL
      const volMin = (minDose / 10).toFixed(1);
      const volMax = (maxDose / 10).toFixed(1);

      return [
        {
          label: 'Bolo EV lento',
          route: 'EV',
          rawFormula: '1-2 mg/kg bolo lento, mantenimento 1-2 mg/kg ripetibile a risposta',
          calculatedValue: `${minDose} - ${maxDose} mg`,
          unit: 'mg',
          numericDose: minDose,
          volumeInfo: `Emulsione 10 mg/mL (1%): ${volMin} - ${volMax} mL EV lento`,
          frequencyOrDuration: 'Titolare lentamente sotto controllo continuo vie aeree'
        }
      ];
    }
  },

  // 4. EMERGENZE RESPIRATORIE
  {
    id: 'salbutamolo',
    name: 'Salbutamolo',
    commercialNames: ['Ventolin', 'Broncovaleas'],
    category: 'respiratorie',
    sectionNum: 4,
    sectionTitle: 'Emergenze Respiratorie (Asma, Croup)',
    summaryDose: 'Nebulizzato: <20kg 2,5 mg, >20kg 5 mg ogni 20 min (3 dosi) | Puff: 2-10 puff | EV: bolo 15 mcg/kg poi 1-5 mcg/kg/min',
    routes: ['Inalatoria', 'EV'],
    indications: [
      'Crisi asmatica acuta / broncospasmo',
      'Bronchiolite (risposta clinica variabile, non raccomandato di routine)',
      'Iperkaliemia acuta (effetto adiuvante per shift intracellulare di K+)'
    ],
    contraindications: [
      'Tachiaritmie note gravi (usare cautela in EV)',
      'Cardiopatia severa'
    ],
    adverseEffectsAndNotes: [
      'Tachicardia, tremori muscolari, ipokaliemia transitoria.',
      'Se somministrato per via EV prolungata: monitorare K+ plasmatico ed ECG continuo.'
    ],
    calculateDoses: (w: number) => {
      const nebDose = w < 20 ? '2,5 mg (1 fiala monodose o 0,5 mL sol. 0,5%)' : '5 mg (2 fiale monodose o 1 mL sol. 0,5%)';
      const evBolo = Number((w * 15).toFixed(0)); // mcg
      const evInfMin = (w * 1).toFixed(1);
      const evInfMax = (w * 5).toFixed(1);

      return [
        {
          label: 'Nebulizzato (aerosol con O2)',
          route: 'Inalatoria',
          rawFormula: '<20 kg: 2,5 mg; ≥20 kg: 5 mg ogni 20 min per 3 dosi, poi orario',
          calculatedValue: nebDose,
          unit: 'mg',
          volumeInfo: w < 20 ? 'Diluire con SF fino a 3-4 mL nel nebulizzatore' : 'Diluire con SF fino a 4 mL',
          frequencyOrDuration: 'Ripetibile ogni 20 minuti per 3 dosi nell\'ora iniziale, poi ogni 1-4h'
        },
        {
          label: 'Spray predosato (MDI) con distanziatore + maschera',
          route: 'Inalatoria',
          rawFormula: '2-10 puff ogni 20 minuti (1 puff = 100 mcg, attendere 4-6 respiri per puff)',
          calculatedValue: w < 20 ? '2 - 6 puff' : '4 - 10 puff',
          unit: 'puff',
          preparationAdvice: 'Agitare bene la bomboletta, erogare 1 puff alla volta nel distanziatore.',
          frequencyOrDuration: 'Ripetibile ogni 20 minuti nella prima ora'
        },
        {
          label: 'EV bolo (crisi grave refrattaria)',
          route: 'EV',
          rawFormula: 'Bolo 15 mcg/kg in 10 min, poi infusione 1-5 mcg/kg/min',
          calculatedValue: `${evBolo} mcg in bolo`,
          unit: 'mcg',
          volumeInfo: `Infusione continua di mantenimento successiva: ${evInfMin} - ${evInfMax} mcg/min`,
          frequencyOrDuration: 'Bolo infuso in 10 minuti sotto monitoraggio ECG'
        }
      ];
    }
  },
  {
    id: 'ipratropio-bromuro',
    name: 'Ipratropio Bromuro',
    commercialNames: ['Atrovent', 'Atem'],
    category: 'respiratorie',
    sectionNum: 4,
    sectionTitle: 'Emergenze Respiratorie (Asma, Croup)',
    summaryDose: 'Nebulizzato: <20kg 250 mcg, >20kg 500 mcg ogni 20 min per 3 dosi (associato a salbutamolo)',
    routes: ['Inalatoria'],
    indications: ['Crisi asmatica moderata-severa (in associazione a beta-2 agonisti nella prima ora)'],
    contraindications: [
      'Ipersensibilità nota agli atropinici',
      'Cautela in glaucoma o ipertrofia prostatica (molto rara in pediatria)'
    ],
    adverseEffectsAndNotes: [
      'Effetto sinergico con salbutamolo nelle prime ore di trattamento.',
      'Possibile secchezza delle fauci, sapore amaro, midriasi da contatto oculare accidentale.'
    ],
    calculateDoses: (w: number) => {
      const doseMcg = w < 20 ? 250 : 500;
      return [
        {
          label: 'Nebulizzato (insieme al Salbutamolo)',
          route: 'Inalatoria',
          rawFormula: '<20 kg: 250 mcg (0,25 mg); ≥20 kg: 500 mcg (0,5 mg)',
          calculatedValue: `${doseMcg} mcg`,
          unit: 'mcg',
          volumeInfo: w < 20 ? '1 fiala monodose da 250 mcg (1 mL)' : '1 fiala monodose da 500 mcg (2 mL)',
          frequencyOrDuration: 'Ogni 20 min per le prime 3 dosi nella prima ora di terapia'
        }
      ];
    }
  },
  {
    id: 'adrenalina-nebulizzata',
    name: 'Adrenalina Nebulizzata (L-adrenalina)',
    commercialNames: ['Adrenalina fiale 1:1000 (1 mg/mL)'],
    category: 'respiratorie',
    sectionNum: 4,
    sectionTitle: 'Emergenze Respiratorie (Asma, Croup)',
    summaryDose: '0,4-0,5 mL/kg di soluzione 1:1000 (max 5 mL / 5 mg) nebulizzata',
    routes: ['Inalatoria'],
    indications: [
      'Croup (laringotracheite) moderato-severo con stridore inspiratorio a riposo e/o distress respiratorio',
      'Croup grave con pericolo di vita (associare O2 ad alti flussi e Desametasone)'
    ],
    contraindications: [
      'Tachiaritmie gravi note',
      'Cardiopatia ostruttiva severa (usare con cautela)'
    ],
    adverseEffectsAndNotes: [
      'Effetto rapido (10-30 min) ma transitorio (1-2 ore): osservare il paziente ALMENO 2 ore post-somministrazione per rischio di rebound prima di valutare la dimissione.',
      'Associare SEMPRE steroide sistemico (es. Desametasone orale/EV o Budesonide).'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const volMin = Math.min(Number((w * 0.4).toFixed(1)), 5.0);
      const volMax = Math.min(Number((w * 0.5).toFixed(1)), 5.0);
      const isMax = w * 0.5 >= 5.0;

      return [
        {
          label: 'Nebulizzazione con O2 (flusso 6-8 L/min)',
          route: 'Inalatoria',
          rawFormula: '0,4-0,5 mL/kg di sol. 1:1000 (1 mg/mL), max 5 mL (5 mg)',
          calculatedValue: `${volMin} - ${volMax} mL (= ${volMin} - ${volMax} mg)`,
          unit: 'mL',
          numericDose: volMax,
          volumeInfo: `Utilizzare fiale di Adrenalina 1:1000 (1 mg/1 mL). Se il volume è < 2 mL, aggiungere SF fino a 3-4 mL per nebulizzare.`,
          maxDoseCap: 'Max 5 mL (5 mg) per nebulizzazione',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ripetibile dopo 30 minuti se sintomi severi persistono'
        }
      ];
    }
  },
  {
    id: 'desametasone',
    name: 'Desametasone',
    commercialNames: ['Decadron', 'Soldesam'],
    category: 'respiratorie',
    sectionNum: 4,
    sectionTitle: 'Emergenze Respiratorie (Asma, Croup)',
    summaryDose: 'Croup: 0,15 mg/kg dose singola (max 10 mg) | Asma: 0,15-0,3 mg/kg/die per 1-2 gg (max 10-16 mg)',
    routes: ['OS', 'EV', 'IM'],
    indications: [
      'Croup di ogni gravità (terapia cardine insieme all\'adrenalina nelle forme severe)',
      'Crisi asmatica acuta (valida alternativa al prednisone/prednisolone, minor frequenza di vomito e migliore compliance)'
    ],
    contraindications: [
      'Infezioni sistemiche non trattate (es. varicella attiva, TBC attiva)',
      'Ipersensibilità nota'
    ],
    adverseEffectsAndNotes: [
      'Emivita biologica lunga (36-72h): una singola dose è spesso sufficiente nel Croup.',
      'Dose Croup: 0,15 mg/kg è oggi preferita per parità di efficacia rispetto a 0,6 mg/kg (Cochrane 2023); 0,6 mg/kg resta opzione accettata in quadri severi o refrattari.',
      'Se via orale non praticabile: alternativa Budesonide nebulizzata 2 mg dose singola.'
    ],
    calculateDoses: (w: number) => {
      const croupDose = Math.min(Number((w * 0.15).toFixed(2)), 10);
      const croupSevero = Math.min(Number((w * 0.6).toFixed(2)), 16);
      const asmaMin = Math.min(Number((w * 0.15).toFixed(2)), 16);
      const asmaMax = Math.min(Number((w * 0.3).toFixed(2)), 16);
      const isMaxCroup = w * 0.15 >= 10;

      return [
        {
          label: 'Croup (Dose raccomandata standard Cochrane 2023)',
          route: 'OS / EV / IM',
          rawFormula: '0,15 mg/kg dose singola (max 10 mg)',
          calculatedValue: `${croupDose} mg`,
          unit: 'mg',
          numericDose: croupDose,
          volumeInfo: `Gocce Soldesam 2 mg/mL: ${(croupDose / 2).toFixed(1)} mL | Fiale 4 mg/mL: ${(croupDose / 4).toFixed(2)} mL`,
          maxDoseCap: 'Max 10 mg singola dose',
          isMaxDoseReached: isMaxCroup,
          frequencyOrDuration: 'Dose singola (spesso sufficiente)'
        },
        {
          label: 'Croup quadro severo / refrattario (opzione 0,6 mg/kg)',
          route: 'OS / EV / IM',
          rawFormula: '0,6 mg/kg dose singola (max 16 mg)',
          calculatedValue: `${croupSevero} mg`,
          unit: 'mg',
          numericDose: croupSevero,
          maxDoseCap: 'Max 16 mg',
          frequencyOrDuration: 'Dose singola'
        },
        {
          label: 'Crisi asmatica (alternativa a prednisone)',
          route: 'OS / EV',
          rawFormula: '0,15-0,3 mg/kg/die (max 10-16 mg/die) per 1-2 giorni',
          calculatedValue: `${asmaMin} - ${asmaMax} mg/die`,
          unit: 'mg',
          numericDose: asmaMax,
          frequencyOrDuration: 'Per 1-2 giorni in monosomministrazione'
        }
      ];
    }
  },
  {
    id: 'prednisone',
    name: 'Prednisone / Prednisolone',
    commercialNames: ['Deltacortene', 'Solu-Medrol', 'Deltastene'],
    category: 'respiratorie',
    sectionNum: 4,
    sectionTitle: 'Emergenze Respiratorie (Asma, Croup)',
    summaryDose: '1-2 mg/kg/die (max 40-60 mg/die) per 3-5 giorni OS',
    routes: ['OS'],
    indications: ['Crisi asmatica moderata-severa', 'Wheezing ricorrente'],
    contraindications: [
      'Infezioni micotiche sistemiche',
      'Vaccinazioni con virus vivi attenuati recenti'
    ],
    adverseEffectsAndNotes: [
      'Possibile iperglicemia transitoria, irritabilità, aumento appetito.',
      'Non necessita di decalage (scalaggio) se il ciclo terapeutico è breve (≤ 5 giorni).'
    ],
    calculateDoses: (w: number) => {
      const minDose = Math.min(Math.round(w * 1), 60);
      const maxDose = Math.min(Math.round(w * 2), 60);
      const isMax = w * 2 >= 60;

      return [
        {
          label: 'Orale (Compresse o gocce)',
          route: 'OS',
          rawFormula: '1-2 mg/kg/die in singola dose o diviso in 2 somministrazioni (max 40-60 mg/die)',
          calculatedValue: `${minDose} - ${maxDose} mg/die`,
          unit: 'mg',
          numericDose: maxDose,
          maxDoseCap: 'Max 40-60 mg/die',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Durata ciclo: 3-5 giorni (senza necessità di scalaggio)'
        }
      ];
    }
  },
  {
    id: 'magnesio-solfato-asma',
    name: 'Magnesio Solfato (Asma grave)',
    commercialNames: ['Magnesio Solfato fiale 50% o 10%'],
    category: 'respiratorie',
    sectionNum: 4,
    sectionTitle: 'Emergenze Respiratorie (Asma, Croup)',
    summaryDose: 'EV: 25-50 mg/kg (max 2 g) in infusione lenta 20 minuti',
    routes: ['EV'],
    indications: ['Asma grave acuto refrattario alla terapia massimale con broncodilatatori inalatori e steroidi'],
    contraindications: [
      'Insufficienza renale severa',
      'Blocco atrioventricolare'
    ],
    adverseEffectsAndNotes: [
      'Monitorare la pressione arteriosa (rischio ipotensione) e i riflessi osteotendinei.',
      'Infusione rigorosamente lenta in 20-30 min per prevenire nausea, sensazione di calore (flushing) e ipotensione.'
    ],
    calculateDoses: (w: number) => {
      const minMg = Math.min(Math.round(w * 25), 2000);
      const maxMg = Math.min(Math.round(w * 50), 2000);
      const isMax = w * 50 >= 2000;
      // Fiala 10% = 100 mg/mL; Fiala 50% = 500 mg/mL
      const vol10Min = (minMg / 100).toFixed(1);
      const vol10Max = (maxMg / 100).toFixed(1);

      return [
        {
          label: 'Infusione EV lenta (in 20-30 minuti)',
          route: 'EV lenta',
          rawFormula: '25-50 mg/kg (max 2 g = 2.000 mg) diluito in SF/Glucosata al 5% in 20 min',
          calculatedValue: `${minMg} - ${maxMg} mg`,
          unit: 'mg',
          numericDose: maxMg,
          volumeInfo: `Con fiala al 10% (100 mg/mL): ${vol10Min} - ${vol10Max} mL (diluire in 50-100 mL di fisiologica)`,
          maxDoseCap: 'Max 2.000 mg (2 g)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Singola infusione in 20 minuti con monitoraggio parametri vitali'
        }
      ];
    }
  },

  // 5. ANAFILASSI E REAZIONI ALLERGICHE
  {
    id: 'adrenalina-anafilassi',
    name: 'Adrenalina (Anafilassi IM)',
    commercialNames: ['Fastjekt', 'Chenpen', 'Jext', 'Adrenalina 1:1000 fiale'],
    category: 'anafilassi',
    sectionNum: 5,
    sectionTitle: 'Anafilassi e Reazioni Allergiche Severe',
    summaryDose: 'IM (vasto laterale): 0,01 mg/kg (max 0,3 mg <30kg; max 0,5 mg >30kg/adolescente). Rip. ogni 5-15 min.',
    routes: ['IM'],
    indications: [
      'Anafilassi: farmaco salvavita di PRIMA LINEA assoluta.',
      'Non ritardare mai la somministrazione in caso di sospetto clinico, anche senza tutti i criteri diagnostici completi.'
    ],
    contraindications: [
      'NESSUNA CONTROINDICAZIONE ASSOLUTA in anafilassi conclamata.'
    ],
    adverseEffectsAndNotes: [
      'Somministrazione precoce (<60 min) riduce drasticamente la mortalità e il rischio di reazione bifasica (AAAAI/WAO 2023).',
      'Sito d\'elezione: terzo medio-superiore della coscia antero-laterale (muscolo vasto laterale). ASSORBIMENTO PIÙ RAPIDO RISPETTO AL DELTOIDE O GLUTEI.',
      'La via EV è RISERVATA SOLO all\'arresto cardiocircolatorio o allo shock profondo refrattario sotto monitoraggio rianimatorio.',
      'Né la decisione di somministrare adrenalina né la risposta ad essa escludono la diagnosi.'
    ],
    highRisk: true,
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const maxCap = w < 30 ? 0.3 : 0.5;
      const calcMg = Math.min(Number((w * 0.01).toFixed(3)), maxCap);
      const isMax = (w * 0.01) >= maxCap;
      const mlSolution = (calcMg * 1).toFixed(2); // fiala 1:1000 = 1 mg/mL

      let autoInjector = '';
      if (w < 10) {
        autoInjector = 'Autoiniettore: 0,1 mg (uso off-label nei <7,5-10 kg) o preferire siringa da 1 mL graduata';
      } else if (w >= 10 && w <= 25) {
        autoInjector = 'Autoiniettore: 0,15 mg (es. Fastjekt Jr, Jext 150 mcg)';
      } else {
        autoInjector = 'Autoiniettore: 0,3 mg (es. Fastjekt Adulti, Jext 300 mcg)';
      }

      return [
        {
          label: 'Iniezione Intramuscolare (IM) - Vasto Laterale della Coscia',
          route: 'IM',
          rawFormula: '0,01 mg/kg di soluzione 1:1000 (1 mg/mL) = 0,01 mL/kg (max 0,3 mg se <30 kg; max 0,5 mg se ≥30 kg)',
          calculatedValue: `${calcMg} mg`,
          unit: 'mg',
          numericDose: calcMg,
          volumeInfo: `Volume esatto da aspirare con siringa da 1 mL (tubercolina): ${mlSolution} mL di Adrenalina 1:1000 pura (non diluita)`,
          preparationAdvice: autoInjector,
          maxDoseCap: `Max ${maxCap} mg per singola somministrazione`,
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ripetibile ogni 5-15 minuti se persistenza o peggioramento dei sintomi'
        }
      ];
    }
  },
  {
    id: 'clorfenamina',
    name: 'Clorfenamina (Antistaminico H1)',
    commercialNames: ['Trimeton fiale'],
    category: 'anafilassi',
    sectionNum: 5,
    sectionTitle: 'Anafilassi e Reazioni Allergiche Severe',
    summaryDose: '0,25 mg/kg/dose EV/IM (max 10 mg)',
    routes: ['EV', 'IM', 'OS'],
    indications: [
      'Anafilassi (terapia adiuvante di seconda linea, MAI sostitutiva dell\'adrenalina)',
      'Orticaria acuta ed angioedema'
    ],
    contraindications: [
      'Neonati',
      'Asma acuto severo (effetto di essiccamento delle secrezioni mucose, cautela)'
    ],
    adverseEffectsAndNotes: [
      'Sedazione marcata, sonnolenza, secchezza fauci.',
      'Non deve mai ritardare la somministrazione immediata di adrenalina!'
    ],
    calculateDoses: (w: number) => {
      const dose = Math.min(Number((w * 0.25).toFixed(1)), 10);
      const isMax = w * 0.25 >= 10;
      // Fiala 10 mg/mL
      const vol = (dose / 10).toFixed(2);

      return [
        {
          label: 'EV lenta o IM',
          route: 'EV lenta / IM / OS',
          rawFormula: '0,25 mg/kg/dose (max 10 mg)',
          calculatedValue: `${dose} mg`,
          unit: 'mg',
          numericDose: dose,
          volumeInfo: `Fiala da 10 mg/1 mL: aspirare ${vol} mL (diluire per EV)`,
          maxDoseCap: 'Max 10 mg per dose',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Somministrare lentamente'
        }
      ];
    }
  },
  {
    id: 'idrocortisone',
    name: 'Idrocortisone',
    commercialNames: ['Flebocortid', 'Solu-Cortef'],
    category: 'anafilassi',
    sectionNum: 5,
    sectionTitle: 'Anafilassi e Reazioni Allergiche Severe',
    summaryDose: '4 mg/kg/dose EV/IM (max 200 mg)',
    routes: ['EV', 'IM'],
    indications: [
      'Anafilassi (prevenzione della reazione bifasica)',
      'Crisi surrenalica acuta',
      'Asma grave'
    ],
    contraindications: ['Infezioni sistemiche non trattate'],
    adverseEffectsAndNotes: [
      'Effetto ritardato (richiede alcune ore per agire a livello genico): NON è un farmaco salvavita di prima linea per l\'acuzie!',
      'Prima linea resta indiscutibilmente l\'Adrenalina IM.'
    ],
    calculateDoses: (w: number) => {
      const dose = Math.min(Math.round(w * 4), 200);
      const isMax = w * 4 >= 200;

      return [
        {
          label: 'Endovenoso / Intramuscolare',
          route: 'EV / IM',
          rawFormula: '4 mg/kg/dose (max 200 mg)',
          calculatedValue: `${dose} mg`,
          unit: 'mg',
          numericDose: dose,
          volumeInfo: `Flacone 100 mg o 500 mg ricostituito`,
          maxDoseCap: 'Max 200 mg per dose',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ripetibile ogni 6 ore se necessario'
        }
      ];
    }
  },
  {
    id: 'metilprednisolone',
    name: 'Metilprednisolone',
    commercialNames: ['Solu-Medrol', 'Urbason'],
    category: 'anafilassi',
    sectionNum: 5,
    sectionTitle: 'Anafilassi e Reazioni Allergiche Severe',
    summaryDose: '1-2 mg/kg/dose EV (max 60-80 mg)',
    routes: ['EV'],
    indications: ['Anafilassi (alternativa a idrocortisone)', 'Asma grave acuto', 'Edema laringeo'],
    contraindications: ['Infezioni fungine sistemiche'],
    adverseEffectsAndNotes: ['Alternativa rapida all\'idrocortisone nella gestione post-acuta.'],
    calculateDoses: (w: number) => {
      const minDose = Math.min(Math.round(w * 1), 80);
      const maxDose = Math.min(Math.round(w * 2), 80);
      const isMax = w * 2 >= 80;

      return [
        {
          label: 'Endovenoso bolo lento',
          route: 'EV',
          rawFormula: '1-2 mg/kg/dose (max 60-80 mg)',
          calculatedValue: `${minDose} - ${maxDose} mg`,
          unit: 'mg',
          numericDose: maxDose,
          maxDoseCap: 'Max 60-80 mg per dose',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ogni 6-12 ore'
        }
      ];
    }
  },

  // 6. CRISI CONVULSIVE E STATO DI MALE EPILETTICO
  {
    id: 'diazepam',
    name: 'Diazepam',
    commercialNames: ['Valium', 'Micronoan (microclismi)', 'Diazepam Desitin'],
    category: 'convulsioni',
    sectionNum: 6,
    sectionTitle: 'Crisi Convulsive e Stato di Male Epilettico',
    summaryDose: 'Rettale: 0,5 mg/kg (max 10 mg, <10 kg: 5 mg) | EV: 0,2-0,3 mg/kg lento (max 10 mg)',
    routes: ['PR', 'EV'],
    indications: [
      'Stato di male epilettico (1ª linea)',
      'Convulsione febbrile prolungata (> 5 minuti)'
    ],
    contraindications: [
      'Depressione respiratoria grave senza ventilatore',
      'Miastenia gravis',
      'Glaucoma ad angolo acuto'
    ],
    adverseEffectsAndNotes: [
      'Rischio apnea e ipotensione, specie con somministrazione rapida o dosi ripetute.',
      'Formulazione rettale (microclismi da 5 mg e 10 mg) ideale in ambito extraospedaliero o pre-accesso venoso.',
      'Se accesso venoso disponibile o non reperibile rapidamente: Midazolam IN/buccale/IM è oggi preferito.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const maxPr = w < 10 ? 5 : 10;
      const dosePr = Math.min(Number((w * 0.5).toFixed(1)), maxPr);
      const doseEvMin = Number((w * 0.2).toFixed(1));
      const doseEvMax = Math.min(Number((w * 0.3).toFixed(1)), 10);

      return [
        {
          label: 'Via Rettale (Microclisma)',
          route: 'PR',
          rawFormula: '0,5 mg/kg rettale (max 5 mg se <10 kg; max 10 mg se ≥10 kg)',
          calculatedValue: `${dosePr} mg`,
          unit: 'mg',
          numericDose: dosePr,
          volumeInfo: w < 10 ? 'Microclisma rettale da 5 mg' : 'Microclisma rettale da 10 mg (o 5 mg per 10-15 kg)',
          maxDoseCap: `Max ${maxPr} mg`,
          frequencyOrDuration: 'Ripetibile 1 volta sola dopo 5-10 minuti se la crisi persiste'
        },
        {
          label: 'Via Endovenosa (lenta in 2-3 min)',
          route: 'EV',
          rawFormula: '0,2-0,3 mg/kg lento (max 10 mg)',
          calculatedValue: `${doseEvMin} - ${doseEvMax} mg`,
          unit: 'mg',
          numericDose: doseEvMax,
          volumeInfo: `Fiala 10 mg/2 mL (5 mg/mL): ${(doseEvMin/5).toFixed(2)} - ${(doseEvMax/5).toFixed(2)} mL`,
          maxDoseCap: 'Max 10 mg',
          frequencyOrDuration: 'Ripetibile 1 volta sola dopo 5-10 min'
        }
      ];
    }
  },
  {
    id: 'midazolam-crisi',
    name: 'Midazolam (Crisi Convulsiva)',
    commercialNames: ['Buccolam (oromucosale)', 'Ipnovel fiale'],
    category: 'convulsioni',
    sectionNum: 6,
    sectionTitle: 'Crisi Convulsive e Stato di Male Epilettico',
    summaryDose: 'Buccale/IN: 0,3 mg/kg (max 10 mg) | EV: 0,1-0,2 mg/kg (max 5-10 mg) | IM: 0,2 mg/kg (max 10 mg)',
    routes: ['Buccale', 'IN', 'EV', 'IM'],
    indications: [
      'Stato di male epilettico - 1ª linea.',
      'Farmaco di prima scelta assoluto se l\'accesso venoso non è immediatamente disponibile (la via IM / IN / buccale è più rapida ed efficace del diazepam rettale).'
    ],
    contraindications: ['Depressione respiratoria grave non assistita'],
    adverseEffectsAndNotes: [
      'Somministrare 1 DOSE PIENA ADEGUATA (non frazionare): evidenza scientifica di Classe A.',
      'Massimo 2 DOSI TOTALI di benzodiazepine prima di passare obbligatoriamente alla 2ª linea antiepilettica.',
      'Antidoto: FLUMAZENIL.'
    ],
    antidote: 'Flumazenil',
    highRisk: true,
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const buccaleDose = Math.min(Number((w * 0.3).toFixed(1)), 10);
      const evMin = Number((w * 0.1).toFixed(1));
      const evMax = Math.min(Number((w * 0.2).toFixed(1)), 10);
      const imDose = Math.min(Number((w * 0.2).toFixed(1)), 10);

      // Siringhe preriempite Buccolam standard: 2,5 mg (3m-1a), 5 mg (1-5a), 7,5 mg (5-10a), 10 mg (>10a)
      let buccolamForm = '';
      if (w < 10) buccolamForm = 'Buccolam 2,5 mg (giallo)';
      else if (w < 18) buccolamForm = 'Buccolam 5 mg (blu)';
      else if (w < 30) buccolamForm = 'Buccolam 7,5 mg (viola)';
      else buccolamForm = 'Buccolam 10 mg (arancione)';

      return [
        {
          label: 'Buccale (Buccolam) o Intranasale (IN con MAD)',
          route: 'Buccale / IN',
          rawFormula: '0,3 mg/kg (max 10 mg)',
          calculatedValue: `${buccaleDose} mg`,
          unit: 'mg',
          numericDose: buccaleDose,
          volumeInfo: `Con Buccolam siringa preriempite: ${buccolamForm} | Con fiala 5 mg/mL IN con MAD: ${(buccaleDose/5).toFixed(2)} mL`,
          maxDoseCap: 'Max 10 mg',
          isMaxDoseReached: w * 0.3 >= 10,
          frequencyOrDuration: 'Singola dose piena. Max 2 dosi totali di BDZ prima della 2ª linea'
        },
        {
          label: 'Endovenoso lento (se via venosa già presente)',
          route: 'EV',
          rawFormula: '0,1-0,2 mg/kg lento (max 5-10 mg)',
          calculatedValue: `${evMin} - ${evMax} mg`,
          unit: 'mg',
          numericDose: evMax,
          volumeInfo: `Con fiala 5 mg/mL: ${(evMin/5).toFixed(2)} - ${(evMax/5).toFixed(2)} mL`,
          maxDoseCap: 'Max 5-10 mg',
          isMaxDoseReached: w * 0.2 >= 10,
          frequencyOrDuration: 'Iniezione in 2 minuti'
        },
        {
          label: 'Intramuscolare (IM)',
          route: 'IM',
          rawFormula: '0,2 mg/kg (max 10 mg)',
          calculatedValue: `${imDose} mg`,
          unit: 'mg',
          numericDose: imDose,
          volumeInfo: `Fiala 5 mg/mL: ${(imDose/5).toFixed(2)} mL IM profonda`,
          maxDoseCap: 'Max 10 mg',
          frequencyOrDuration: 'Molto rapido ed efficace se mancato accesso EV'
        }
      ];
    }
  },
  {
    id: 'levetiracetam',
    name: 'Levetiracetam',
    commercialNames: ['Keppra fiale e sol. infusione'],
    category: 'convulsioni',
    sectionNum: 6,
    sectionTitle: 'Crisi Convulsive e Stato di Male Epilettico',
    summaryDose: 'EV: 40-60 mg/kg (max 4,5 g) infusi in 15 minuti',
    routes: ['EV'],
    indications: [
      'Stato di male epilettico - 2ª linea (dopo 20 minuti dall\'esordio o dopo fallimento di 2 dosi di benzodiazepina).',
      'Farmaco di scelta in caso di cardiopatia, instabilità emodinamica o sospetta allergia a fenitoina.'
    ],
    contraindications: ['Ipersensibilità nota al farmaco'],
    adverseEffectsAndNotes: [
      'OTTIMO PROFILO DI SICUREZZA CARDIOVASCOLARE: non causa aritmie né ipotensione significativa, non richiede monitoraggio ECG continuativo invasivo.',
      'Efficacia sovrapponibile a fenitoina e valproato (evidenza dai grandi trial clinici ESETT, EcLiPSE, ConSEPT).'
    ],
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const dose40 = Math.min(Math.round(w * 40), 4500);
      const dose60 = Math.min(Math.round(w * 60), 4500);
      const isMax = w * 60 >= 4500;
      // Fiala 500 mg/5 mL (100 mg/mL)
      const vol40 = (dose40 / 100).toFixed(1);
      const vol60 = (dose60 / 100).toFixed(1);

      return [
        {
          label: '2ª Linea Stato Epilettico: Infusione EV in 15 min',
          route: 'EV',
          rawFormula: '40-60 mg/kg (max 4.500 mg = 4,5 g) in 15 minuti',
          calculatedValue: `${dose40} - ${dose60} mg`,
          unit: 'mg',
          numericDose: dose60,
          volumeInfo: `Concentrato 100 mg/mL: aspirare ${vol40} - ${vol60} mL e diluire in 50-100 mL di SF per infusione in 15 minuti`,
          maxDoseCap: 'Max 4.500 mg (4,5 g)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Infusione endovenosa in 15 minuti'
        }
      ];
    }
  },
  {
    id: 'fosfenitoina-fenitoina',
    name: 'Fosfenitoina / Fenitoina',
    commercialNames: ['Pro-Epanutin (Fosfenitoina)', 'Dintoina (Fenitoina)'],
    category: 'convulsioni',
    sectionNum: 6,
    sectionTitle: 'Crisi Convulsive e Stato di Male Epilettico',
    summaryDose: 'Fosfenitoina: 20 mg PE/kg EV/IM (max 1500 mg PE, vel max 3 mg PE/kg/min o 150 mg PE/min)',
    routes: ['EV', 'IM'],
    indications: ['Stato di male epilettico - 2ª linea (dopo fallimento di 2 dosi di benzodiazepina)'],
    contraindications: [
      'Blocco atrioventricolare di II-III grado, bradicardia sinusale severa',
      'Porfiria',
      'Cardiopatia / instabilità emodinamica nota (in tal caso preferire Levetiracetam)'
    ],
    adverseEffectsAndNotes: [
      'Fosfenitoina preferita alla Fenitoina per minor rischio di aritmie e di necrosi grave da stravaso ("purple glove syndrome").',
      'Fosfenitoina può essere somministrata anche per via IM.',
      'Fenitoina (se fosfenitoina non disponibile): 20 mg/kg in SF lenta (max 1 mg/kg/min o 50 mg/min), mai con glucosata (precipita).',
      'Monitoraggio ECG e PA continui durante l\'infusione.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const dosePE = Math.min(Math.round(w * 20), 1500);
      const isMax = w * 20 >= 1500;
      const maxRate = Math.min(Number((w * 3).toFixed(1)), 150);

      return [
        {
          label: 'Fosfenitoina (dose da carico PE)',
          route: 'EV / IM',
          rawFormula: '20 mg PE/kg (max 1.500 mg PE), velocità max 3 mg PE/kg/min (non oltre 150 mg PE/min)',
          calculatedValue: `${dosePE} mg PE`,
          unit: 'mg PE',
          numericDose: dosePE,
          volumeInfo: `Fiala da 75 mg/mL PE: aspirare ${(dosePE / 75).toFixed(1)} mL (diluire in SF o Glucosata 5%)`,
          maxDoseCap: 'Max 1.500 mg PE | Velocità max: ' + maxRate + ' mg PE/min',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Infusione in circa 10-15 minuti sotto monitoraggio ECG e PA'
        }
      ];
    }
  },
  {
    id: 'acido-valproico',
    name: 'Acido Valproico',
    commercialNames: ['Depakin fiale'],
    category: 'convulsioni',
    sectionNum: 6,
    sectionTitle: 'Crisi Convulsive e Stato di Male Epilettico',
    summaryDose: 'EV: 40 mg/kg (max 3 g) infusi in 5-10 minuti',
    routes: ['EV'],
    indications: ['Stato di male epilettico - 2ª linea alternativa a Levetiracetam/Fenitoina'],
    contraindications: [
      'Epatopatia nota attiva o anamnesi di epatopatia severa familiare',
      'Sospetta malattia mitocondriale (deficit POLG)',
      'Età < 2 anni (cautela per elevato rischio di epatotossicità grave)',
      'Sospetta intossicazione o encefalopatia metabolica (iperammoniemia)',
      'Gravidanza / età fertile (teratogenicità elevata)'
    ],
    adverseEffectsAndNotes: [
      'EVITARE se la causa della crisi non è chiara nel bambino piccolo sotto i 2 anni (escludere prima errori congeniti del metabolismo).',
      'Possibile iperammoniemia, trombocitopenia.'
    ],
    calculateDoses: (w: number) => {
      const dose = Math.min(Math.round(w * 40), 3000);
      const isMax = w * 40 >= 3000;
      // Fiala 400 mg con 4 mL solvente (100 mg/mL)
      const vol = (dose / 100).toFixed(1);

      return [
        {
          label: 'Infusione EV rapida (in 5-10 minuti)',
          route: 'EV',
          rawFormula: '40 mg/kg (max 3.000 mg = 3 g) in 5-10 minuti',
          calculatedValue: `${dose} mg`,
          unit: 'mg',
          numericDose: dose,
          volumeInfo: `Soluzione 100 mg/mL: aspirare ${vol} mL (diluire in SF o Glucosata)`,
          maxDoseCap: 'Max 3.000 mg (3 g)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Bolo endovenoso in 5-10 minuti'
        }
      ];
    }
  },
  {
    id: 'fenobarbital',
    name: 'Fenobarbital',
    commercialNames: ['Luminale fiale'],
    category: 'convulsioni',
    sectionNum: 6,
    sectionTitle: 'Crisi Convulsive e Stato di Male Epilettico',
    summaryDose: 'EV: 15-20 mg/kg dose da carico (max 1 g), infusione lenta (max 100 mg/min o 1 mg/kg/min nel neonato)',
    routes: ['EV', 'IM'],
    indications: [
      'CONVULSIONI NEONATALI: FARMACO DI PRIMA SCELTA IN EPOCA NEONATALE.',
      'Stato di male epilettico pediatrico: 2ª/3ª linea se altri farmaci non disponibili o inefficaci.'
    ],
    contraindications: [
      'Insufficienza respiratoria grave non intubata',
      'Porfiria acuta'
    ],
    adverseEffectsAndNotes: [
      'Depressione respiratoria e sedazione marcata e prolungata, specie se associato a benzodiazepine.',
      'Farmaco di prima scelta assoluto nelle convulsioni del neonato (0-28 giorni).'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const minDose = Math.min(Math.round(w * 15), 1000);
      const maxDose = Math.min(Math.round(w * 20), 1000);
      const isMax = w * 20 >= 1000;

      return [
        {
          label: 'Dose da carico EV lenta',
          route: 'EV / IM',
          rawFormula: '15-20 mg/kg dose carico (max 1.000 mg), velocità max 100 mg/min (1 mg/kg/min nel neonato)',
          calculatedValue: `${minDose} - ${maxDose} mg`,
          unit: 'mg',
          numericDose: maxDose,
          volumeInfo: `Fiala Luminale 100 mg/mL: aspirare ${(minDose/100).toFixed(1)} - ${(maxDose/100).toFixed(1)} mL (diluire per EV)`,
          maxDoseCap: 'Max 1.000 mg (1 g)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Infusione lenta in 15-20 minuti sotto monitoraggio cardiorespiratorio'
        }
      ];
    }
  },

  // 7. EMERGENZE CARDIOVASCOLARI E ALS PEDIATRICO
  {
    id: 'adrenalina-als',
    name: 'Adrenalina (ALS Pediatrico 1:10.000)',
    commercialNames: ['Adrenalina 1:10.000 (0,1 mg/mL)'],
    category: 'cardiovascolari',
    sectionNum: 7,
    sectionTitle: 'Emergenze Cardiovascolari e ALS Pediatrico',
    summaryDose: 'EV/IO: 10 mcg/kg = 0,01 mg/kg di soluzione 1:10.000 (0,1 mL/kg), max 1 mg, ogni 3-5 min. ET: 0,1 mg/kg.',
    routes: ['EV', 'IO', 'ET'],
    indications: [
      'Arresto cardiorespiratorio pediatrico (Asistolia, PEA, FV/TV senza polso)',
      'Bradicardia sintomatica refrattaria con severa compromissione emodinamica persistente nonostante ventilazione'
    ],
    contraindications: ['NESSUNA CONTROINDICAZIONE in arresto cardiorespiratorio.'],
    adverseEffectsAndNotes: [
      'CARDINE DELLA RIANIMAZIONE AVANZATA (ERC/ILCOR PLS 2025, AHA-PALS): 1ª dose il prima possibile, idealmente entro 3 min nei ritmi non defibrillabili.',
      'ATTENZIONE CRITICA ALLA DILUIZIONE: in ALS si usa la soluzione 1:10.000 (0,1 mg/mL = 0,1 mL/kg). È DIVERSA dall\'adrenalina 1:1000 usata nell\'anafilassi IM!',
      'Preparazione 1:10.000: 1 mL di adrenalina 1:1000 + 9 mL di Soluzione Fisiologica in siringa da 10 mL.',
      'Via endotracheale (ET): solo se nessun altro accesso è disponibile, dose 10 volte superiore (0,1 mg/kg = 1 mL/kg della 1:10.000).'
    ],
    highRisk: true,
    priorityEmergency: true,
    calculateDoses: (w: number) => {
      const doseMcg = Math.min(Math.round(w * 10), 1000);
      const doseMg = (doseMcg / 1000).toFixed(2);
      const volMl = Math.min(Number((w * 0.1).toFixed(1)), 10.0);
      const isMax = w * 10 >= 1000;

      return [
        {
          label: 'EV / IO in bolo rapido + flush di SF (Regola dello 0,1 mL/kg)',
          route: 'EV / IO',
          rawFormula: '10 mcg/kg (= 0,01 mg/kg) di soluzione 1:10.000 = ESATTAMENTE 0,1 mL/kg (max 10 mL = 1 mg)',
          calculatedValue: `${doseMcg} mcg (= ${doseMg} mg)`,
          unit: 'mcg',
          numericDose: doseMcg,
          volumeInfo: `VOLUME IMMEDIATO DA SOMMINISTRARE: ${volMl} mL di Adrenalina 1:10.000 (seguito da flush di SF 5 mL)`,
          preparationAdvice: 'Preparazione rapida: 1 fiala di Adrenalina 1:1000 (1 mL) + 9 mL SF in siringa da 10 mL = 1:10.000 (0,1 mg/mL)',
          maxDoseCap: 'Max 1.000 mcg (1 mg = 10 mL di 1:10.000)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Ripetibile ogni 3-5 minuti durante le manovre di RCP avanzata'
        },
        {
          label: 'Via Endotracheale (ET - solo se accesso EV/IO assente)',
          route: 'ET',
          rawFormula: '0,1 mg/kg (dose 10 volte superiore) seguito da 5 ventilazioni a pressione positiva',
          calculatedValue: `${Math.min(Math.round(w * 100), 10000)} mcg (= ${(Math.min(w * 0.1, 10)).toFixed(1)} mg)`,
          unit: 'mcg',
          volumeInfo: `Volume di sol. 1:10.000: ${(Math.min(w * 1.0, 10)).toFixed(1)} mL (o 1:1000 diluita in SF)`,
          frequencyOrDuration: 'Ultima risorsa estrema se IO ed EV falliscono'
        }
      ];
    }
  },
  {
    id: 'atropina',
    name: 'Atropina Solfato',
    commercialNames: ['Atropina solfato fiale 0,5 mg/mL o 1 mg/mL'],
    category: 'cardiovascolari',
    sectionNum: 7,
    sectionTitle: 'Emergenze Cardiovascolari e ALS Pediatrico',
    summaryDose: 'EV/IO: 0,02 mg/kg/dose (dose minima 0,1 mg, max singola 0,5 mg bambino / 1 mg adolescente)',
    routes: ['EV', 'IO'],
    indications: [
      'Bradicardia sintomatica su base vagale (es. stimolazione laringoscopia, riflesso vagale)',
      'Intossicazione da colinergici / organofosforici',
      'Premedicazione per intubazione in casi selezionati (es. chetamina con scialorrea o lattante)'
    ],
    contraindications: [
      'Glaucoma ad angolo acuto',
      'Tachiaritmie'
    ],
    adverseEffectsAndNotes: [
      'Le linee guida attuali NON raccomandano l\'uso routinario nella bradicardia da ipossia/ischemia: TRATTARE LA CAUSA (ventilazione/ossigenazione) e usare adrenalina se compromissione persiste.',
      'ATTENZIONE: Dose insufficiente (< 0,1 mg) può causare BRADICARDIA PARADOSSA per stimolazione vagale centrale.',
      'Rispettare rigorosamente la dose minima assoluta di 0,1 mg.'
    ],
    calculateDoses: (w: number) => {
      const calcMg = Math.max(0.1, Math.min(Number((w * 0.02).toFixed(2)), 0.5));
      const isMin = w * 0.02 < 0.1;
      const isMax = w * 0.02 >= 0.5;
      // Fiala 0,5 mg/mL o 1 mg/mL
      const vol05 = (calcMg / 0.5).toFixed(2);

      return [
        {
          label: 'EV / IO rapido',
          route: 'EV / IO',
          rawFormula: '0,02 mg/kg (minima 0,1 mg; max 0,5 mg bambino / 1 mg adolescente)',
          calculatedValue: `${calcMg} mg`,
          unit: 'mg',
          numericDose: calcMg,
          volumeInfo: `Con fiala 0,5 mg/1 mL: aspirare ${vol05} mL (fiala 1 mg/mL diluita a 10 mL: ${(calcMg * 10).toFixed(1)} mL)`,
          maxDoseCap: 'Dose minima 0,1 mg (per evitare bradicardia paradossa) | Max 0,5 mg',
          isMaxDoseReached: isMax,
          alertNote: isMin ? 'Attenzione: applicata dose minima assoluta di sicurezza di 0,1 mg' : undefined,
          frequencyOrDuration: 'Ripetibile una volta dopo 3-5 minuti'
        }
      ];
    }
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    commercialNames: ['Cordarone fiale 150 mg/3 mL'],
    category: 'cardiovascolari',
    sectionNum: 7,
    sectionTitle: 'Emergenze Cardiovascolari e ALS Pediatrico',
    summaryDose: 'ACR (FV/TV senza polso): 5 mg/kg EV/IO bolo dopo 3° shock, seconda 5 mg/kg dopo 5° shock. Aritmie con polso: 5 mg/kg lenta 20-60 min.',
    routes: ['EV', 'IO'],
    indications: [
      'FV / TV senza polso refrattaria a defibrillazione (in bolo dopo il 3° shock)',
      'Tachicardia sopraventricolare / ventricolare con polso stabile o instabile (in infusione lenta)'
    ],
    contraindications: [
      'Bradicardia sinusale severa, BAV avanzato senza pacemaker funzionante',
      'Ipersensibilità allo iodio (cautela)'
    ],
    adverseEffectsAndNotes: [
      'IPOTENSIONE GRAVE se infuso rapidamente in paziente con polso: mai in bolo rapido tranne che in arresto cardiaco conclamato!',
      'Monitoraggio ECG continuo.',
      'ERC 2025 raccomanda max 300 mg per dose iniziale e max 150 mg dopo il 5° shock. Lidocaina EV 1 mg/kg è alternativa accettata.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const doseAcr = Math.min(Math.round(w * 5), 300);
      const isMax = w * 5 >= 300;
      // Fiala 150 mg/3 mL = 50 mg/mL
      const volMl = (doseAcr / 50).toFixed(1);

      return [
        {
          label: 'Arresto Cardiaco (FV / TV refrattaria post 3° shock)',
          route: 'EV / IO in bolo rapido',
          rawFormula: '5 mg/kg bolo rapido dopo il 3° shock, seconda dose 5 mg/kg dopo il 5° shock (max 300 mg)',
          calculatedValue: `${doseAcr} mg`,
          unit: 'mg',
          numericDose: doseAcr,
          volumeInfo: `Fiala 150 mg/3 mL (50 mg/mL): ${volMl} mL in bolo rapido seguito da flush`,
          maxDoseCap: 'Max 300 mg (ERC 2025: max 150 mg per la dose post 5° shock)',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'Post 3° shock e ripetibile dopo 5° shock'
        },
        {
          label: 'Aritmie con polso (TV stabile / TSV refrattaria)',
          route: 'EV lenta in 20-60 minuti',
          rawFormula: '5 mg/kg in infusione lenta in 20-60 minuti (max 300 mg)',
          calculatedValue: `${doseAcr} mg`,
          unit: 'mg',
          numericDose: doseAcr,
          preparationAdvice: 'Diluire ESCLUSIVAMENTE in Glucosata 5% (precipita in SF!). Infondere lentamente.',
          maxDoseCap: 'Max 300 mg singola dose; max 15 mg/kg/die',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'In 20-60 minuti sotto stretto monitoraggio della pressione arteriosa'
        }
      ];
    }
  },
  {
    id: 'adenosina',
    name: 'Adenosina',
    commercialNames: ['Krenosin fiale 6 mg/2 mL'],
    category: 'cardiovascolari',
    sectionNum: 7,
    sectionTitle: 'Emergenze Cardiovascolari e ALS Pediatrico',
    summaryDose: 'EV rapido + flush: 1ª dose 0,1 mg/kg (max 6 mg); 2ª dose 0,2 mg/kg (max 12 mg)',
    routes: ['EV'],
    indications: ['Tachicardia Sopraventricolare parossistica (TSV) - farmaco di prima scelta assoluta'],
    contraindications: [
      'Blocco AV di II o III grado (in assenza di pacemaker)',
      'Malattia del nodo del seno',
      'Asma bronchiale grave (cautela, può scatenare broncospasmo acuto)'
    ],
    adverseEffectsAndNotes: [
      'EMIVITA ULTRABREVE (<10 secondi): la tecnica di somministrazione è cruciale per il successo.',
      'TECNICA A 2 VIE o RUBINETTO A 3 VIE: via venosa più prossimale possibile (cubitale preferita), spinta rapida in 1 secondo seguita IMMEDIATAMENTE da flush vigoroso di 5-10 mL di SF.',
      'Avvisare l\'équipe e il paziente: sensazione transitoria di oppressione toracica, vampata di calore e breve pausa asistolica attesa prima del ripristino del ritmo sinusale.'
    ],
    highRisk: true,
    calculateDoses: (w: number) => {
      const dose1 = Math.min(Number((w * 0.1).toFixed(2)), 6.0);
      const dose2 = Math.min(Number((w * 0.2).toFixed(2)), 12.0);
      // Fiala 6 mg/2 mL = 3 mg/mL
      const vol1 = (dose1 / 3).toFixed(2);
      const vol2 = (dose2 / 3).toFixed(2);

      return [
        {
          label: '1ª DOSE (Bolo rapidissimo + flush)',
          route: 'EV prossimale',
          rawFormula: '0,1 mg/kg in bolo ultrarapido seguito immediatamente da flush SF (max 6 mg)',
          calculatedValue: `${dose1} mg`,
          unit: 'mg',
          numericDose: dose1,
          volumeInfo: `Fiala da 3 mg/mL (6 mg/2 mL): aspirare ${vol1} mL pura + siringa da 5-10 mL SF pronta per flush`,
          maxDoseCap: 'Max 6 mg prima dose',
          isMaxDoseReached: w * 0.1 >= 6,
          frequencyOrDuration: 'Bolo rapidissimo in 1-2 secondi con registrazione ECG attiva'
        },
        {
          label: '2ª DOSE (se TSV persiste dopo 1-2 minuti)',
          route: 'EV prossimale',
          rawFormula: '0,2 mg/kg in bolo ultrarapido + flush SF (max 12 mg)',
          calculatedValue: `${dose2} mg`,
          unit: 'mg',
          numericDose: dose2,
          volumeInfo: `Fiala da 3 mg/mL: aspirare ${vol2} mL pura + immediato flush di SF`,
          maxDoseCap: 'Max 12 mg seconda dose',
          isMaxDoseReached: w * 0.2 >= 12,
          frequencyOrDuration: 'Dopo 1-2 minuti se la prima dose non ha convertito la TSV'
        }
      ];
    }
  },
  {
    id: 'sodio-bicarbonato',
    name: 'Sodio Bicarbonato 8,4%',
    commercialNames: ['Sodio Bicarbonato 8,4% (1 mEq/mL)'],
    category: 'cardiovascolari',
    sectionNum: 7,
    sectionTitle: 'Emergenze Cardiovascolari e ALS Pediatrico',
    summaryDose: 'EV/IO: 1 mEq/kg (diluito 1:1 con acqua per preparazioni iniettabili nel neonato/lattante)',
    routes: ['EV', 'IO'],
    indications: [
      'Acidosi metabolica severa documentata (pH < 7.10 con adeguata ventilazione)',
      'Iperkaliemia severa con alterazioni elettrocardiografiche',
      'Overdose da antidepressivi triciclici (allargamento QRS)'
    ],
    contraindications: [
      'Alcalosi metabolica o respiratoria',
      'Ipokaliemia non corretta'
    ],
    adverseEffectsAndNotes: [
      'NON raccomandato di routine in arresto cardiocircolatorio pediatrico salvo specifiche indicazioni.',
      'MAI MISCELARE CON CALCIO GLUCONATO o CLORURO NELLA STESSA VIA VENOSA: forma un precipitato insolubile di carbonato di calcio!',
      'Soluzione fortemente iperosmolare: diluire 1:1 con acqua per iniettabili nel neonato/lattante per ridurre osmolarità.'
    ],
    calculateDoses: (w: number) => {
      const meq = Number((w * 1.0).toFixed(1)); // 1 mEq/kg = 1 mL/kg della sol. 8.4%
      return [
        {
          label: 'EV lenta in 5-10 minuti',
          route: 'EV / IO',
          rawFormula: '1 mEq/kg (= 1 mL/kg di sol. 8,4%). Diluire 1:1 con H2O sterile nel neonato/lattante.',
          calculatedValue: `${meq} mEq (= ${meq} mL sol. 8,4%)`,
          unit: 'mEq',
          numericDose: meq,
          volumeInfo: w < 10 
            ? `Nel lattante <10 kg: aspirare ${meq} mL di sol. 8,4% + ${meq} mL di H2O sterile (totale ${(meq*2).toFixed(1)} mL al 4,2%)`
            : `Soluzione pura 8,4%: ${meq} mL infusi lentamente`,
          frequencyOrDuration: 'Infusione lenta in 5-10 minuti. Lavare la via prima e dopo'
        }
      ];
    }
  },
  {
    id: 'calcio-gluconato',
    name: 'Calcio Gluconato 10%',
    commercialNames: ['Calcio Gluconato 10% fiale'],
    category: 'cardiovascolari',
    sectionNum: 7,
    sectionTitle: 'Emergenze Cardiovascolari e ALS Pediatrico',
    summaryDose: 'EV/IO: 0,5-1 mL/kg (max 20 mL) lento in 5-10 min sotto monitoraggio ECG',
    routes: ['EV', 'IO'],
    indications: [
      'Iperkaliemia con alterazioni ECG (stabilizzatore di membrana)',
      'Ipocalcemia sintomatica acuta (tetania, convulsioni)',
      'Overdose da calcio-antagonisti o ipermagnesiemia'
    ],
    contraindications: ['NON MISCELARE CON SODIO BICARBONATO (rischio precipitazione immediata)'],
    adverseEffectsAndNotes: [
      'Somministrazione rigorosamente lenta: rischio di bradicardia grave e asistolia se somministrato rapidamente.',
      'Stravaso provoca necrosi tissutale severa (verificare pervietà accesso venoso).'
    ],
    calculateDoses: (w: number) => {
      const minMl = Math.min(Number((w * 0.5).toFixed(1)), 20);
      const maxMl = Math.min(Number((w * 1.0).toFixed(1)), 20);
      const isMax = w * 1.0 >= 20;

      return [
        {
          label: 'EV lento (5-10 min con monitoraggio ECG)',
          route: 'EV / IO lento',
          rawFormula: '0,5-1 mL/kg di sol. 10% (max 20 mL)',
          calculatedValue: `${minMl} - ${maxMl} mL`,
          unit: 'mL',
          numericDose: maxMl,
          maxDoseCap: 'Max 20 mL per somministrazione',
          isMaxDoseReached: isMax,
          frequencyOrDuration: 'In 5-10 minuti sotto stretto monitoraggio del ritmo cardiaco'
        }
      ];
    }
  },
  {
    id: 'glucosio-ipoglicemia',
    name: 'Glucosio (Destrosio) per Ipoglicemia',
    commercialNames: ['Glucosata 10% flaconi'],
    category: 'cardiovascolari',
    sectionNum: 7,
    sectionTitle: 'Emergenze Cardiovascolari e ALS Pediatrico',
    summaryDose: 'EV: 0,25-0,5 g/kg = Glucosata 10%: 2,5-5 mL/kg in bolo lento',
    routes: ['EV', 'IO'],
    indications: [
      'Ipoglicemia sintomatica acuta documentata (glicemia < 45-60 mg/dL in base all\'età e contesto clinico)',
      'Arresto cardiaco o coma ipoglicemico'
    ],
    contraindications: ['Iperglicemia nota (verificare sempre glicemia con stick prima)'],
    adverseEffectsAndNotes: [
      'USARE SEMPRE GLUCOSATA AL 10% (0,1 g/mL): è la concentrazione sicura di prima scelta per via periferica.',
      'Concentrazioni ipertoniche (> 12,5%, come la glucosata 33% o 50%) rischiano gravi flebiti e necrosi tissutale da stravaso: evitare in bolo puro nel bambino piccolo.',
      'Ricontrollare la glicemia capillare entro 15-20 minuti dopo il bolo e avviare liquidi di mantenimento con glucosio.'
    ],
    calculateDoses: (w: number) => {
      const gMin = Number((w * 0.25).toFixed(1));
      const gMax = Number((w * 0.5).toFixed(1));
      const mlMin = Number((w * 2.5).toFixed(1));
      const mlMax = Number((w * 5.0).toFixed(1));

      return [
        {
          label: 'Bolo EV lento di Glucosata 10% (concentrazione raccomandata)',
          route: 'EV / IO',
          rawFormula: '0,25-0,5 g/kg = 2,5-5 mL/kg di Glucosata 10% infusa lentamente in 3-5 minuti',
          calculatedValue: `${mlMin} - ${mlMax} mL (= ${gMin} - ${gMax} g glucosio)`,
          unit: 'mL',
          numericDose: mlMin,
          volumeInfo: `Aspirare ${mlMin} - ${mlMax} mL di Glucosata 10% pura da flacone/sacca e somministrare lentamente`,
          frequencyOrDuration: 'Bolo lento in 3-5 minuti; ricontrollare glicemia a 15-20 min'
        }
      ];
    }
  }
];
