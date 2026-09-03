export const GUIDELINES_CONTENT = {
  warningText: `Questo prontuario rapido è uno strumento clinico di consultazione e calcolo dosaggi ad uso del medico in Pronto Soccorso ed Emergenza-Urgenza Pediatrica. Tutti i dosaggi devono essere sempre verificati clinicamente (peso reale/stimato del paziente, funzionalità d'organo, allergie note, interazioni farmacologiche, dose massima) prima della somministrazione. In caso di discrepanza, fare sempre riferimento alle più recenti linee guida nazionali/internazionali (AIFA, SIP, ILCOR/ERC-EPALS, WHO) e al protocollo aziendale vigente.`,

  weightFormulas: [
    {
      name: 'Formula APLS (1 - 10 anni)',
      formula: 'Peso (kg) = (Età in anni + 4) × 2',
      notes: 'Valida per stima rapida in emergenza nei bambini da 1 a 10 anni quando non pesabili.'
    },
    {
      name: 'Lattante (0 - 12 mesi)',
      formula: 'Peso (kg) ≈ (Età in mesi ÷ 2) + 4',
      notes: 'Stima del peso corporeo nel primo anno di vita.'
    },
    {
      name: 'Neonato a termine (0 - 28 giorni)',
      formula: 'Peso stimato: circa 3,5 kg (range fisiologico 2,5 - 4,5 kg)',
      notes: 'Fare sempre riferimento al peso alla nascita se noto.'
    },
    {
      name: 'Nastro di Broselow (Pediatric Tape)',
      formula: 'Basato sulla lunghezza vertice-tallone del bambino',
      notes: 'Metodo d\'elezione internazionale in emergenza vitale in assenza di bilancia o peso noto.'
    }
  ],

  routesNotes: [
    {
      route: 'Accesso Endovenoso (EV)',
      description: 'Via preferenziale di scelta quando reperibile rapidamente senza ritardare le manovre salvavita.'
    },
    {
      route: 'Accesso Intraosseo (IO)',
      description: 'Da considerare precocemente (entro 90 secondi o dopo 2 tentativi EV falliti) in emergenza vitale e arresto cardiaco. Stessi dosaggi e tempi della via EV.'
    },
    {
      route: 'Via Intranasale (IN)',
      description: 'Utilissima per farmaci lipofili (Midazolam, Fentanyl, Naloxone) con dispositivo atomizzatore MAD quando l\'accesso venoso è difficoltoso o assente.'
    },
    {
      route: 'Via Endotracheale (ET)',
      description: 'Riservata a farmaci selezionati (Adrenalina, Atropina, Naloxone, Lidocaina) quando nessun altro accesso è reperibile. Richiede dosi maggiorate (es. adrenalina x10).'
    }
  ],

  safetyPrinciples: [
    'Verificare sempre: peso reale (o stimato con APLS/Broselow), allergie note, funzione renale ed epatica, farmaci concomitanti.',
    'Applicare sistematicamente il DOPPIO CONTROLLO (double-check) infermiere-medico per tutti i farmaci ad alto rischio (Adrenalina, oppioidi, insulina, elettroliti concentrati, sedativi).',
    'Etichettare con precisione siringhe, concentrazioni e diluizioni al letto del paziente in emergenza.',
    'REGOLA AUREA DEL CAP MASSIMO: in nessun caso la dose calcolata per kg corporeo deve superare la dose massima dell\'adulto raccomandata.'
  ],

  scientificSources: [
    {
      name: 'European Resuscitation Council (ERC) / ILCOR Guidelines 2025',
      desc: 'Paediatric Life Support (Resuscitation, ottobre 2025) e linee guida ERC 2021 PLS'
    },
    {
      name: 'American Heart Association (AHA)',
      desc: 'Pediatric Advanced Life Support (PALS) Guidelines'
    },
    {
      name: 'Surviving Sepsis Campaign (SSC) 2020',
      desc: 'International Guidelines for Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children'
    },
    {
      name: 'World Allergy Organization (WAO) & AAAAI/ACAAI 2023',
      desc: 'Anaphylaxis Practice Parameter Update 2023 e WAO Anaphylaxis Guidance'
    },
    {
      name: 'American Academy of Neurology / American Epilepsy Society (AES / ILAE)',
      desc: 'Evidence-based Guideline: Treatment of Convulsive Status Epilepticus e trial ESETT, EcLiPSE, ConSEPT'
    },
    {
      name: 'ISPAD Consensus Guidelines 2022',
      desc: 'Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State in Children and Adolescents'
    },
    {
      name: 'Cochrane Systematic Reviews 2023 & Canadian Paediatric Society',
      desc: 'Glucocorticoids for croup in children (parità di efficacia 0,15 mg/kg vs 0,6 mg/kg)'
    },
    {
      name: 'Global Initiative for Asthma (GINA 2024)',
      desc: 'Global Strategy for Asthma Management and Prevention (sezione pediatrica)'
    },
    {
      name: 'NICE Guidelines (UK)',
      desc: 'Linee guida su febbre nel bambino <5 anni, croup, bronchiolite e sepsi'
    },
    {
      name: 'AIFA (Agenzia Italiana del Farmaco)',
      desc: 'Riassunti delle Caratteristiche del Prodotto (RCP) aggiornati dei singoli principi attivi'
    },
    {
      name: 'SIP & SIMEUP',
      desc: 'Società Italiana di Pediatria e Società Italiana di Medicina di Emergenza-Urgenza Pediatrica'
    },
    {
      name: 'OMS / WHO',
      desc: 'Pocket Book of Hospital Care for Children'
    }
  ]
};
