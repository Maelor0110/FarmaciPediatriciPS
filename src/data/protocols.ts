export interface ProtocolStep {
  title: string;
  timing?: string;
  priority: 'critica' | 'alta' | 'media';
  actions: string[];
  drugDoseCalculations?: (w: number) => {
    name: string;
    route: string;
    calculatedDose: string;
    instructions: string;
  }[];
  clinicalNotes?: string[];
}

export interface EmergencyProtocol {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  iconName: string;
  description: string;
  guidelineReference: string;
  steps: ProtocolStep[];
}

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'anafilassi',
    title: 'Protocollo Anafilassi Pediatrica Acuta',
    shortTitle: 'Anafilassi',
    badge: 'EMERGENZA 1ª LINEA',
    iconName: 'AlertTriangle',
    description: 'Trattamento d\'emergenza secondo linee guida WAO 2020 e AAAAI/ACAAI 2023. L\'adrenalina IM è il farmaco salvavita di prima scelta immediata.',
    guidelineReference: 'WAO 2020 / AAAAI-ACAAI Practice Parameter Update 2023',
    steps: [
      {
        title: '1. Adrenalina IM Immediata (PRIMA LINEA ASSOLUTA)',
        timing: 'Minuto 0 (Immediatamente)',
        priority: 'critica',
        actions: [
          'Somministrare ADRENALINA 1:1000 per via INTRAMUSCOLARE profonda nel terzo medio della coscia antero-laterale (muscolo vasto laterale).',
          'Posizionare il paziente supino con arti inferiori sollevati (se vomito o dispnea severa: posizione semiseduta confortevole o laterale di sicurezza).',
          'NON ritardare mai l\'adrenalina in attesa di steroide o antistaminico!'
        ],
        drugDoseCalculations: (w: number) => {
          const maxDose = w < 30 ? 0.3 : 0.5;
          const mg = Math.min(Number((w * 0.01).toFixed(3)), maxDose);
          const ml = mg.toFixed(2);
          let auto = '';
          if (w < 10) auto = 'Autoiniettore: 0,1 mg (off-label) oppure siringa da 1 mL graduata';
          else if (w <= 25) auto = 'Autoiniettore: 0,15 mg (Fastjekt Jr / Jext 150)';
          else auto = 'Autoiniettore: 0,3 mg (Fastjekt Adulti / Jext 300)';

          return [
            {
              name: 'Adrenalina 1:1000 (1 mg/mL) IM',
              route: 'IM Vasto Laterale (coscia)',
              calculatedDose: `${mg} mg (= ${ml} mL)`,
              instructions: `Aspirare con siringa da 1 mL (tubercolina). ${auto}. Ripetibile ogni 5-15 min se persistono sintomi.`
            }
          ];
        },
        clinicalNotes: [
          'La via EV per l\'adrenalina è vietata in questa fase: riservata unicamente all\'arresto o shock estremo in ambiente rianimatorio.',
          'Assorbimento nel vasto laterale è fino a 3 volte più rapido rispetto al deltoide.'
        ]
      },
      {
        title: '2. Terapia Adiuvante di 2ª Linea e Fluidi (post-adrenalina)',
        timing: 'Minuti 5 - 15',
        priority: 'alta',
        actions: [
          'Ossigenoterapia ad alti flussi se distress respiratorio o ipossiemia (SpO2 < 94%).',
          'Se ipotensione arteriosa persistente: reperire accesso venoso ed espansione con cristalloidi bilanciati 10-20 mL/kg in 10 minuti (max 1000 mL/bolo).',
          'RIVALUTAZIONE STEROIDI (Linee Guida EAACI 2021 / AAAAI 2023): L\'uso routinario di corticosteroidi sistemici per prevenire la reazione bifasica NON è raccomandato dall\'evidenza scientifica (non riducono le reazioni bifasiche ed agiscono dopo 4-6 ore). Sono opzionali come terapia di 2ª linea solo in presenza di asma/broncospasmo concomitante o edema refrattario.',
          'Antistaminico anti-H1 (Clorfenamina): farmaco di 2ª linea esclusivamente sintomatico per orticaria e prurito (non tratta ipotensione, shock o distress respiratorio).'
        ],
        drugDoseCalculations: (w: number) => {
          const idroMg = Math.min(Math.round(w * 4), 200);
          const metilMg = Math.min(Math.round(w * 1.5), 60);
          const trimetonMg = Math.min(Number((w * 0.2).toFixed(1)), 10);
          const isTrimetonMax = w * 0.2 >= 10;
          const isIdroMax = w * 4 >= 200;

          return [
            {
              name: 'Clorfenamina (Trimeton) EV lenta o IM',
              route: 'EV lenta / IM',
              calculatedDose: `${trimetonMg} mg (0,1-0,2 mg/kg, max 10 mg)`,
              instructions: `Solo terapia sintomatica per prurito/orticaria (non salva la vita). ${isTrimetonMax ? 'Dose massima per singola somministrazione raggiunta (10 mg).' : ''}`
            },
            {
              name: 'Idrocortisone EV lenta / IM (Opzione 2ª linea se asma associato)',
              route: 'EV lenta / IM',
              calculatedDose: `${idroMg} mg (4 mg/kg, max 200 mg)`,
              instructions: `Indicazione limitata a broncospasmo/asma persistente (EAACI 2021: NON previene la reazione bifasica). ${isIdroMax ? 'Raggiunta dose massima pediatrica (200 mg).' : ''}`
            },
            {
              name: 'Metilprednisolone EV (Alternativa steroidea)',
              route: 'EV lenta in 5 min',
              calculatedDose: `${metilMg} mg (1-2 mg/kg, max 60 mg)`,
              instructions: 'Opzionale in caso di broncospasmo severo associato. Non sostituisce l\'adrenalina né l\'osservazione clinica.'
            }
          ];
        }
      },
      {
        title: '3. Periodo di Osservazione Clinica e Dimissione',
        timing: 'Da 1 a 6+ ore post-risoluzione',
        priority: 'media',
        actions: [
          'OSSERVAZIONE MINIMA 1 ORA: se reazione lieve, risposta completa e pronta a 1 singola dose di adrenalina, nessun fattore di rischio.',
          'OSSERVAZIONE 4-6 ORE (o ricovero): se anafilassi severa, necessità di >1 dose di adrenalina, ipotensione, trigger da farmaco/sconosciuto o asma pregresso.',
          'ALLA DIMISSIONE: prescrivere 2 autoiniettori di adrenalina, rilasciare Piano d\'Azione scritto per Anafilassi ed inviare a visita allergologica.'
        ]
      }
    ]
  },
  {
    id: 'arresto-cardiaco',
    title: 'Arresto Cardiorespiratorio Pediatrico (PALS / ERC 2025)',
    shortTitle: 'Arresto ALS',
    badge: 'CODICE BLU - ALS',
    iconName: 'HeartPulse',
    description: 'Algoritmo avanzato di Rianimazione Cardiopolmonare Pediatrica basato sulle ultimissime linee guida ERC/ILCOR 2025 e AHA-PALS.',
    guidelineReference: 'ERC/ILCOR Paediatric Life Support (PLS) Guidelines 2025',
    steps: [
      {
        title: '1. RCP di Alta Qualità & Ventilazione',
        timing: 'Immediato',
        priority: 'critica',
        actions: [
          '15 compressioni toraciche alternate a 2 ventilazioni (15:2) con O2 100%.',
          'Profondità compressione: almeno 1/3 del diametro toracico (4 cm nel lattante, 5 cm nel bambino). Frequenza: 100-120/min con riespansione completa.',
          'Collegare defibrillatore/monitor e valutare il ritmo (Defibrillabile: FV/TV senza polso vs Non Defibrillabile: Asistolia/PEA).'
        ]
      },
      {
        title: '2. Farmaci e Defibrillazione (Dosi Esatte per il Paziente)',
        timing: 'Durante i cicli RCP (analisi ogni 2 min)',
        priority: 'critica',
        actions: [
          'Accesso vascolare immediato: EV o Intraosseo (IO entro 90 sec se EV fallisce).',
          'Ritmi NON defibrillabili (Asistolia / PEA): Adrenalina IL PRIMA POSSIBILE (entro 3 min).',
          'Ritmi DEFIBRILLABILI (FV / TV senza polso): Defibrillare subito 4 J/kg -> RCP 2 min -> se persiste shock -> post 3° shock Adrenalina e Amiodarone.'
        ],
        drugDoseCalculations: (w: number) => {
          const joules1 = Math.min(Math.round(w * 4), 200);
          const joulesSub = Math.min(Math.round(w * 8), 360);
          const adrMcg = Math.min(Math.round(w * 10), 1000);
          const adrMl = Math.min(Number((w * 0.1).toFixed(1)), 10.0);
          const amiodaroneMg = Math.min(Math.round(w * 5), 300);

          return [
            {
              name: 'Scarica di Defibrillazione (Joule calcolati)',
              route: 'Piatte / Piastre pediatriche o adulto con gel',
              calculatedDose: `1° Shock: ${joules1} J (4 J/kg) | Shock successivi: fino a ${joulesSub} J (4-8 J/kg, max 360 J)`,
              instructions: 'Eseguire shock in sicurezza, riprendere IMMEDIATAMENTE le compressioni toraciche senza interruzione per 2 minuti.'
            },
            {
              name: 'Adrenalina 1:10.000 EV/IO (Regola 0,1 mL/kg)',
              route: 'EV rapido / IO + flush SF',
              calculatedDose: `${adrMcg} mcg (= ${adrMl} mL di sol. 1:10.000)`,
              instructions: 'Preparazione rapida: 1 mL adrenalina 1:1000 + 9 mL SF. Ripetibile ogni 3-5 minuti (a cicli alterni).'
            },
            {
              name: 'Amiodarone (post 3° shock in FV/TV refrattaria)',
              route: 'EV rapido / IO',
              calculatedDose: `${amiodaroneMg} mg in bolo rapido`,
              instructions: 'Ripetibile seconda dose da 5 mg/kg dopo il 5° shock (max 150 mg secondo ERC 2025).'
            },
            {
              name: 'Glucosata 10% (se ipoglicemia documentata)',
              route: 'EV / IO lento',
              calculatedDose: `${Number((w * 2.5).toFixed(1))} - ${Number((w * 5.0).toFixed(1))} mL`,
              instructions: '2,5-5 mL/kg di Glucosata al 10%.'
            }
          ];
        }
      },
      {
        title: '3. Ricerca Cause Reversibili (4T e 4I)',
        timing: 'Continuo durante la rianimazione',
        priority: 'alta',
        actions: [
          '4 I: Ipossia (ventilare con O2 100%), Ipovolemia (bolo liquidi 10-20 mL/kg), Ipo/Iperkaliemia o ipoglicemia, Ipotermia.',
          '4 T: Pneumotorace iperteso (decompressivo), Tamponamento cardiaco, Tossici/farmaci (antidoti), Tromboembolismo (raro).'
        ]
      }
    ]
  },
  {
    id: 'stato-epilettico',
    title: 'Stato di Male Epilettico Pediatrico (Schema ILAE / APLS)',
    shortTitle: 'Stato Epilettico',
    badge: 'NEURO EMERGENZA A STEP',
    iconName: 'Zap',
    description: 'Gestione progressiva per step temporali delle crisi convulsive prolungate e dello stato di male secondo protocollo ILAE / AES / APLS.',
    guidelineReference: 'ILAE / AES Guidelines & Trial ESETT, EcLiPSE, ConSEPT',
    steps: [
      {
        title: 'STEP 1 (0 - 10 min): 1ª Linea Benzodiazepine',
        timing: '0 - 10 minuti dall\'inizio crisi',
        priority: 'critica',
        actions: [
          'Garantire sicurezza, decubito laterale, proteggere il capo, somministrare O2 ad alti flussi.',
          'Somministrare UNA DOSE PIENA ADEGUATA di benzodiazepina (non frazionare).',
          'Se non c\'è accesso venoso: MIDAZOLAM BUCCALE o INTRANASALE è la prima scelta!',
          'Se crisi non cessa dopo 5-10 min: consentita 1 sola seconda dose di benzodiazepina (MAX 2 DOSI TOTALI).'
        ],
        drugDoseCalculations: (w: number) => {
          const midazBuc = Math.min(Number((w * 0.3).toFixed(1)), 10);
          const midazEv = Math.min(Number((w * 0.15).toFixed(1)), 5);
          const diazPr = Math.min(Number((w * 0.5).toFixed(1)), w < 10 ? 5 : 10);

          return [
            {
              name: 'Midazolam Buccale / Intranasale (PRIMA SCELTA NO-EV)',
              route: 'Buccale (Buccolam) o IN (con MAD)',
              calculatedDose: `${midazBuc} mg`,
              instructions: `Somministrare dose piena. Più rapido ed efficace del diazepam rettale.`
            },
            {
              name: 'Midazolam EV (se accesso già presente)',
              route: 'EV lenta in 2 min',
              calculatedDose: `${midazEv} mg (0,1-0,2 mg/kg)`,
              instructions: 'Max 5 mg per dose.'
            },
            {
              name: 'Diazepam Rettale (Microclisma)',
              route: 'PR (Rettale)',
              calculatedDose: `${diazPr} mg`,
              instructions: 'Alternativa in ambiente extraospedaliero (max 5 mg se <10 kg, max 10 mg se ≥10 kg).'
            }
          ];
        }
      },
      {
        title: 'STEP 2 (10 - 20 min): 2ª Linea Antiepilettici EV',
        timing: '10 - 20 minuti (crisi persistente)',
        priority: 'critica',
        actions: [
          'Se la crisi persiste dopo 2 dosi di BDZ (o dopo 15-20 min totali): avviare SUBITO il farmaco di 2ª linea.',
          'LE VETIRACETAM (Keppra) è preferito per rapidità di infusione e assenza di cardiotossicità.',
          'Alternative di pari efficacia: Fosfenitoina (20 mg PE/kg) o Acido Valproico (40 mg/kg).'
        ],
        drugDoseCalculations: (w: number) => {
          const kepDose = Math.min(Math.round(w * 50), 4500);
          const foshDose = Math.min(Math.round(w * 20), 1500);
          const valpDose = Math.min(Math.round(w * 40), 3000);

          return [
            {
              name: 'Levetiracetam (Keppra) EV - 1ª Scelta di 2ª Linea',
              route: 'EV in 15 minuti',
              calculatedDose: `${kepDose} mg (40-60 mg/kg, max 4,5 g)`,
              instructions: 'Diluire in 50-100 mL di SF e infondere in 15 minuti. Eccellente stabilità emodinamica.'
            },
            {
              name: 'Fosfenitoina EV/IM (Pro-Epanutin)',
              route: 'EV lenta / IM',
              calculatedDose: `${foshDose} mg PE (20 mg PE/kg, max 1500 mg PE)`,
              instructions: 'Infondere a max 3 mg PE/kg/min (max 150 mg PE/min) sotto monitoraggio ECG e PA continui.'
            },
            {
              name: 'Acido Valproico EV (Depakin)',
              route: 'EV in 5-10 min',
              calculatedDose: `${valpDose} mg (40 mg/kg, max 3 g)`,
              instructions: 'Evitare se <2 anni o sospetta patologia mitocondriale/metabolica.'
            }
          ];
        }
      },
      {
        title: 'STEP 3 (> 30 - 40 min): Stato di Male Refrattario',
        timing: '> 30 - 40 minuti',
        priority: 'critica',
        actions: [
          'Stato di male epilettico refrattario: allertare Rianimazione per intubazione tracheale.',
          'Induzione anestesia generale con Propofol, Midazolam ad alte dosi in continuo o Tiopentale sodico.',
          'Monitoraggio EEG continuo se disponibile.'
        ]
      }
    ]
  },
  {
    id: 'respiratorio-croup-asma',
    title: 'Emergenze Respiratorie: Croup & Asma Grave',
    shortTitle: 'Croup & Asma',
    badge: 'DISTRESS RESPIRATORIO',
    iconName: 'Wind',
    description: 'Protocollo combinato per Croup moderato-severo (laringospasmo e stridore) e Crisi Asmatica Acuta secondo GINA, Cochrane 2023 e NICE.',
    guidelineReference: 'GINA 2024 / Cochrane Croup Review 2023 / NICE',
    steps: [
      {
        title: 'A. Croup Moderato-Severo (Stridore a riposo + Tirage)',
        timing: 'Immediato all\'arrivo in PS',
        priority: 'critica',
        actions: [
          'Tranquillizzare il bambino tra le braccia del genitore (il pianto peggiora l\'edema laringeo).',
          'DESAMETASONE: dose singola 0,15 mg/kg (standard Cochrane 2023, pari efficacia a 0,6 mg/kg).',
          'ADRENALINA NEBULIZZATA con O2 ad alti flussi per effetto vasocostrittore decongestionante immediato.',
          'RIVALUTAZIONE OBBLIGATORIA DOPO 2 ORE: rischio rebound quando svanisce l\'effetto dell\'adrenalina inalatoria.'
        ],
        drugDoseCalculations: (w: number) => {
          const desam = Math.min(Number((w * 0.15).toFixed(2)), 10);
          const adrVol = Math.min(Number((w * 0.45).toFixed(1)), 5.0);

          return [
            {
              name: 'Desametasone OS / EV / IM',
              route: 'OS preferita (altrimenti EV o IM)',
              calculatedDose: `${desam} mg (0,15 mg/kg, max 10 mg)`,
              instructions: 'Dose singola spesso risolutiva. Se vomito ostinato: Budesonide 2 mg aerosol.'
            },
            {
              name: 'Adrenalina 1:1000 Nebulizzata (L-Adrenalina)',
              route: 'Aerosol con maschera e O2 (6-8 L/min)',
              calculatedDose: `${adrVol} mL di Adrenalina 1:1000 pura (max 5 mL = 5 mg)`,
              instructions: 'Nebulizzare subito. Se volume <2 mL aggiungere SF. Osservare almeno 2h post-aerosol!'
            }
          ];
        }
      },
      {
        title: 'B. Crisi Asmatica Acuta Grave',
        timing: 'Entro la prima ora',
        priority: 'critica',
        actions: [
          'O2 per mantenere SpO2 tra 94-98%.',
          'SALBUTAMOLO inalatorio ad alte dosi (nebulizzato o 4-10 puff con distanziatore ogni 20 min per 3 volte).',
          'IPRATROPIO BROMURO associato a salbutamolo per le prime 3 dosi.',
          'STEROIDE SISTEMICO immediato: Desametasone o Prednisone/Prednisolone.',
          'Se crisi severa refrattaria: SOLFATO DI MAGNESIO EV in 20 minuti.'
        ],
        drugDoseCalculations: (w: number) => [
          {
            name: 'Salbutamolo inalatorio',
            route: 'Nebulizzazione o Spray + distanziatore',
            calculatedDose: w < 20 ? '2,5 mg nebulizzato (o 4-6 puff)' : '5 mg nebulizzato (o 6-10 puff)',
            instructions: 'Ogni 20 minuti per 3 dosi nella prima ora, poi ogni 1-4 ore al bisogno.'
          },
          {
            name: 'Ipratropio Bromuro aerosol',
            route: 'Inalatoria (miscelato con salbutamolo)',
            calculatedDose: w < 20 ? '250 mcg (1 fiala 0,25 mg)' : '500 mcg (1 fiala 0,5 mg)',
            instructions: 'Ogni 20 minuti per le prime 3 dosi nell\'ora iniziale.'
          },
          {
            name: 'Magnesio Solfato EV (se crisi severa refrattaria)',
            route: 'EV lenta in 20-30 minuti',
            calculatedDose: `${Math.min(Math.round(w * 40), 2000)} mg (40 mg/kg, max 2 g)`,
            instructions: 'Diluire in 50-100 mL di SF e infondere in 20 minuti sotto monitoraggio PA.'
          }
        ]
      }
    ]
  },
  {
    id: 'sepsi-pediatrica',
    title: 'Sepsi e Shock Settico Pediatrico (Surviving Sepsis 2020)',
    shortTitle: 'Sepsi & Shock',
    badge: 'EMERGENZA INFETTIVOLOGICA',
    iconName: 'Flame',
    description: 'Riconoscimento tempestivo e rianimazione della sepsi e dello shock settico. "Golden Hour": fluidi giudiziosi, antibiotico entro 1 ora e supporto vasoattivo.',
    guidelineReference: 'Surviving Sepsis Campaign International Guidelines for Children 2020',
    steps: [
      {
        title: '1. Riconoscimento & Golden Hour',
        timing: 'Entro 60 minuti dal sospetto',
        priority: 'critica',
        actions: [
          'Riconoscere segni di shock: tachicardia sproporzionata alla febbre, tempo di refill > 3s o flash < 1s, polsi deboli, oliguria, cute marezzata, sopore.',
          'Ossigenoterapia e reperimento tempestivo accesso venoso o intraosseo (IO).',
          'Prelievi per emocoltura (se rapida), lattati, emogas ed emocromo.'
        ]
      },
      {
        title: '2. Espansione Volemica Giudiziosa',
        timing: 'Boli da 10-20 min',
        priority: 'critica',
        actions: [
          'CRISTALLOIDI BILANCIATI (Ringer lattato o acetato): 1ª scelta raccomandata rispetto alla fisiologica.',
          'Bolo da 10-20 mL/kg in push-pull rapido.',
          'RIVALUTARE SISTEMATICAMENTE dopo ogni bolo: se compaiono rantoli, epatomegalia o ritmo di galoppo, STOP BOLI!'
        ],
        drugDoseCalculations: (w: number) => [
          {
            name: 'Ringer Lattato / Cristalloidi bilanciati',
            route: 'EV / IO rapido (push-pull)',
            calculatedDose: `Bolo singolo: ${Math.round(w * 10)} - ${Math.round(w * 20)} mL (10-20 mL/kg)`,
            instructions: 'In 10-20 minuti. Rivalutare dopo ogni bolo. Totale cumulativo fino a 40-60 mL/kg nella 1ª ora.'
          }
        ]
      },
      {
        title: '3. Antibiotico Tassativo Entro 1 Ora',
        timing: 'Tassativo: < 60 minuti',
        priority: 'critica',
        actions: [
          'Somministrare l\'antibiotico ad ampio spettro ENTRO 1 ORA dal riconoscimento clinico (la mortalità aumenta per ogni ora di ritardo).',
          'Non attendere l\'esito degli esami colturali per avviare la terapia antibiotica.'
        ],
        drugDoseCalculations: (w: number) => [
          {
            name: 'Ceftriaxone EV/IO (sepsi comunitaria > 28 giorni)',
            route: 'EV / IO',
            calculatedDose: `${Math.min(Math.round(w * 100), 4000)} mg (100 mg/kg, max 4 g)`,
            instructions: 'Nel neonato < 28 giorni usare Cefotaxime (50 mg/kg/dose) + Ampicillina.'
          }
        ]
      },
      {
        title: '4. Shock Fluido-Refrattario -> Supporto Vasoattivo',
        timing: 'Dopo 40-60 mL/kg se ipotensione/ipoperfusione persiste',
        priority: 'alta',
        actions: [
          'Se persistono segni di shock dopo 40-60 mL/kg di fluidi: iniziare precocemente NORADRENALINA infusione continua.',
          'Allertare immediatamente la Terapia Intensiva Pediatrica.'
        ],
        drugDoseCalculations: (w: number) => [
          {
            name: 'Noradrenalina EV/IO continua',
            route: 'EV continua in pompa siringa',
            calculatedDose: `Partenza a 0,05-0,1 mcg/kg/min = ${(w * 0.05).toFixed(2)} - ${(w * 0.1).toFixed(2)} mcg/min`,
            instructions: 'Titolare fino a max 2 mcg/kg/min per normalizzare la pressione arteriosa media (PAM).'
          }
        ]
      }
    ]
  },
  {
    id: 'dka-protocol',
    title: 'Chetoacidosi Diabetica (DKA - ISPAD 2022)',
    shortTitle: 'DKA Diabetica',
    badge: 'METABOLICA AD ALTO RISCHIO',
    iconName: 'Crosshair',
    description: 'Gestione graduale e prudente della DKA secondo il Consensus ISPAD 2022. Prevenzione e gestione dell\'edema cerebrale.',
    guidelineReference: 'ISPAD Clinical Practice Consensus Guidelines 2022',
    steps: [
      {
        title: '1. Reidratazione Prudente (MAI fluidi eccessivi o bruschi)',
        timing: 'Prime 24-48 ore',
        priority: 'critica',
        actions: [
          'Se shock o ipoperfusione marcata: bolo prudente di SF 0,9% 10-20 mL/kg in 20-30 min.',
          'In assenza di shock: evitare boli rapidi; calcolare il deficit stimato (5-10%) + mantenimento e distribuirlo uniformemente in 24-48 ore.',
          'Non variare repentinamente la velocità dei liquidi: il rapido calo dell\'osmolarità plasmatica è il principale trigger dell\'edema cerebrale!'
        ],
        drugDoseCalculations: (w: number) => [
          {
            name: 'Soluzione Fisiologica 0,9% (Espansione iniziale)',
            route: 'EV in 20-30 min',
            calculatedDose: `${Math.round(w * 10)} - ${Math.round(w * 20)} mL (10-20 mL/kg)`,
            instructions: 'Solo se shock clinico evidente. Rivalutare attentamente.'
          }
        ]
      },
      {
        title: '2. Terapia Insulinica Continua (MAI IN BOLO!)',
        timing: 'Iniziare ALMENO 1 ORA DOPO i liquidi',
        priority: 'critica',
        actions: [
          'NON somministrare MAI bolo di insulina: aumenta drasticamente il rischio di edema cerebrale.',
          'Avviare infusione continua di insulina regolare a 0,05-0,1 UI/kg/h dopo almeno 1 ora dall\'avvio della reidratazione.',
          'Verificare K+ prima dell\'insulina: se K+ < 3,3 mEq/L, correggere il potassio prima di iniziare.',
          'NON interrompere l\'insulina quando la glicemia scende sotto 250 mg/dL: AGGIUNGERE GLUCOSIO 5-10% AI LIQUIDI e mantenere l\'insulina continua fino a risoluzione dell\'acidosi!'
        ],
        drugDoseCalculations: (w: number) => [
          {
            name: 'Insulina Regolare (Actrapid/Humulin R) continua',
            route: 'EV pompa siringa',
            calculatedDose: `${Number((w * 0.05).toFixed(2))} - ${Number((w * 0.1).toFixed(2))} UI/ora`,
            instructions: 'Preparazione: 50 UI in 50 mL SF (1 UI/mL). Velocità: ' + (w * 0.05).toFixed(2) + ' - ' + (w * 0.1).toFixed(2) + ' mL/h.'
          },
          {
            name: 'Potassio Cloruro (KCl) supplementazione',
            route: 'EV diluito nei liquidi',
            calculatedDose: '20 - 40 mEq/L nei liquidi infusionali',
            instructions: 'Iniziare non appena documentata la prima diuresi e K+ < 5,5 mEq/L.'
          }
        ]
      },
      {
        title: '3. ALLERTA EDEMA CEREBRALE (Trattamento d\'Urgenza Immediato)',
        timing: 'Ai minimi segni neurologici di allarme',
        priority: 'critica',
        actions: [
          'SEGNI D\'ALLARME: cefalea intensa improvvisa, bradicardia relativa o ipertensione, sopore, incontinenza improvvisa, anomalie pupillari.',
          'TRATTARE SUBITO CLINICAMENTE: non attendere la TC cranio!',
          'Dimezzare la velocità dei liquidi infusionali.',
          'Somministrare MANNITOLO 20% (0,5-1 g/kg) oppure SALINA IPERTONICA 3% (5-10 mL/kg) in 10-15 min, sollevare la testa a 30°.'
        ],
        drugDoseCalculations: (w: number) => [
          {
            name: 'Mannitolo 20% EV immediato',
            route: 'EV in 10-15 min con filtro',
            calculatedDose: `${Number((w * 0.5).toFixed(1))} - ${Number((w * 1.0).toFixed(1))} g (= ${(w * 2.5).toFixed(0)} - ${(w * 5.0).toFixed(0)} mL di sol. 20%)`,
            instructions: 'Infondere in 10-15 minuti. Ripetibile dopo 30 min se necessario.'
          },
          {
            name: 'Alternativa: NaCl 3% Ipertonica',
            route: 'EV in 10-15 min',
            calculatedDose: `${Math.round(w * 5)} - ${Math.round(w * 10)} mL (5-10 mL/kg)`,
            instructions: 'Infondere in 10-15 minuti in alternativa al mannitolo.'
          }
        ]
      }
    ]
  }
];
