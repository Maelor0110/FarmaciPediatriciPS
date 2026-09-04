import { DrugItem } from '../types';

export const DRUGS_GROUP_3: DrugItem[] = [
  // ==========================================
  // SEZIONE 14: OCULISTICA PEDIATRICA (COLLIRI E POMATE OFTALMICHE)
  // ==========================================
  {
    id: 'tobramicina-collirio',
    name: 'Tobramicina 0,3% Collirio / Unguento Oftalmico',
    commercialNames: ['Tobral 0,3%', 'Obrex', 'Tobramicina generico collirio 3 mg/mL'],
    category: 'oftalmici',
    sectionNum: 14,
    sectionTitle: 'Oculistica Pediatrica: Colliri e Pomate Oftalmiche',
    summaryDose: '1-2 gocce per occhio ogni 4-6 ore (ogni 2h nelle forme iperacute)',
    routes: ['Oftalmica (Collirio)', 'Oftalmica (Unguento)'],
    indications: [
      'Congiuntivite batterica acuta mucopurulenta (Streptococcus pneumoniae, Haemophilus influenzae, Moraxella catarrhalis, Staphylococcus aureus)',
      'Blefarite, blefarocongiuntivite batterica',
      'Dacriocistite del neonato e del lattante con secrezione purulenta persistente',
      'Profilassi o trattamento di sovrainfezioni batteriche in abrasioni corneali o corpi estranei rimossi'
    ],
    contraindications: [
      'Ipersensibilità nota ad aminoglicosidi o ad uno qualsiasi degli eccipienti',
      'Infezioni virali dell\'occhio (cheratocongiuntivite erpetica, adenovirus) in assenza di sovrainfezione batterica',
      'Micosi oculari'
    ],
    adverseEffectsAndNotes: [
      'PRIMA SCELTA nella congiuntivite batterica in età pediatrica in Italia (efficacia elevata e minima tossicità epiteliale rispetto ad altri aminoglicosidi).',
      'ISTRUZIONI DI DETERSIONE E SOMMINISTRAZIONE:',
      '• Prima dell\'instillazione, detergere accuratamente le secrezioni e le crosticine dalle palpebre con una garza sterile imbevuta di soluzione fisiologica tiepida (utilizzare garze SEPARATE per ciascun occhio per evitare contaminazioni crociate).',
      '• Instillare 1-2 gocce nel fornice congiuntivale inferiore tenendo delicatamente abbassata la palpebra.',
      '• Evitare il contatto tra il beccuccio del contagocce e l\'occhio, le dita o le ciglia per preservare la sterilità del flacone.',
      'UNGUENTO OFTALMICO: applicare circa 1 cm di unguento nel fornice congiuntivale inferiore la sera prima di dormire (riduce l\'incollamento delle palpebre al risveglio e garantisce copertura notturna prolungata).',
      'DURATA: generalmente 5-7 giorni; proseguire per almeno 48 ore dopo la scomparsa dei sintomi. Non superare i 10 giorni.'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Forma Acuta Standard (Collirio 0,3%)',
          route: 'Oftalmica',
          rawFormula: '1 - 2 gocce per occhio affetto ogni 4-6 ore',
          calculatedValue: '1 - 2 gocce per occhio',
          unit: 'gocce',
          numericDose: 2,
          volumeInfo: 'Flacone da 5 mL (~100 gocce): instillare 1-2 gtt ogni 4-6h dopo accurata pulizia palpebrale',
          preparationAdvice: 'Detergere l\'occhio prima di instillare. Proseguire per 5-7 giorni complessivi.',
          maxDoseCap: 'Max 7-10 giorni continuativi',
          frequencyOrDuration: 'Ogni 4-6 ore per 5-7 giorni'
        },
        {
          label: 'Forme Gravi / Iperacute Purulente (Prime 24-48 ore)',
          route: 'Oftalmica',
          rawFormula: '1 - 2 gocce per occhio ogni 2 ore fino a miglioramento, poi scalare a ogni 4-6h',
          calculatedValue: '1 - 2 gocce per occhio',
          unit: 'gocce',
          numericDose: 2,
          volumeInfo: 'Nelle prime 24-48 ore somministrazione ravvicinata, poi ridurre la frequenza',
          preparationAdvice: 'Se secrezione purulenta abbondante, rimuovere il pus con impacchi sterili prima di ogni applicazione',
          frequencyOrDuration: 'Ogni 2 ore nelle prime 24-48h, poi ogni 4-6h'
        },
        {
          label: 'Unguento Oftalmico 0,3% (Applicazione Notturna)',
          route: 'Oftalmica',
          rawFormula: '1 cm di unguento nel sacco congiuntivale la sera prima di coricarsi (o 2-3 volte/die)',
          calculatedValue: '1 cm di unguento',
          unit: 'cm',
          numericDose: 1,
          volumeInfo: 'Tubetto da 3,5 g: applicare nel fornice congiuntivale inferiore',
          preparationAdvice: 'Ideale la sera per prevenire l\'adesione palpebrale notturna causata dalle secrezioni',
          frequencyOrDuration: '1 applicazione la sera prima di dormire'
        }
      ];
    }
  },

  {
    id: 'tobramicina-desametasone-collirio',
    name: 'Tobramicina + Desametasone Collirio / Unguento (Tobradex)',
    commercialNames: ['Tobradex (tobramicina 3 mg/mL + desametasone 1 mg/mL)', 'Tobrastill gocce', 'Desametasone + Tobramicina'],
    category: 'oftalmici',
    sectionNum: 14,
    sectionTitle: 'Oculistica Pediatrica: Colliri e Pomate Oftalmiche',
    summaryDose: '1-2 gocce 3-4 volte al giorno per cicli brevissimi (massimo 5-7 giorni)',
    routes: ['Oftalmica (Collirio)', 'Oftalmica (Unguento)'],
    indications: [
      'Congiuntivite batterica o blefarocongiuntivite con marcata componente edematosa, iperemica e flogistica',
      'Calazio infiammato o orzaiolo in fase flogistica acuta (in associazione a impacchi caldo-umidi)',
      'Infiammazione della congiuntiva palpebrale o bulbare reattiva con sospetta o accertata infezione batterica sensibile'
    ],
    contraindications: [
      'CONTROINDICAZIONE ASSOLUTA: Cheratite da Herpes simplex (dendritica/virale) - rischio gravissimo di perforazione corneale e cecità!',
      'Infezioni micotiche dell\'occhio o parassitarie',
      'Ulcera corneale o abrasione epiteliale attiva (test fluoresceina positivo) prima di visita specialistica oculistica',
      'Glaucoma o ipertensione oculare nota'
    ],
    adverseEffectsAndNotes: [
      'ATTENZIONE: L\'associazione con corticosteroide deve essere prescritta con ESTREMA PRUDENZA e per periodi brevissimi (massimo 5-7 giorni).',
      'Nei bambini l\'assorbimento e la sensibilità agli steroidi oftalmici sono maggiori: l\'uso prolungato può causare ipertensione endoculare (glaucoma da steroidi), cataratta subcapsulare e ritardo di cicatrizzazione corneale.',
      'Non utilizzare mai come "collirio generico" o per arrossamento oculare aspecifico senza prima aver escluso una lesione corneale o un\'infezione da Herpes.',
      'AGITARE BENE IL FLACONE prima dell\'uso (è una sospensione oftalmica).',
      'Se non si osserva un netto miglioramento clinico entro 48-72 ore, sospendere il trattamento e inviare il piccolo paziente a visita oculistica specialistica con lampada a fessura.'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Flogosi Oculare Severa con Sovrainfezione (Collirio)',
          route: 'Oftalmica',
          rawFormula: '1 - 2 gocce ogni 6-8 ore (3-4 volte/die) per massimo 5-7 giorni',
          calculatedValue: '1 - 2 gocce per occhio',
          unit: 'gocce',
          numericDose: 2,
          volumeInfo: 'Sospensione oftalmica 5 mL (agitare prima dell\'uso): 1 goccia 3-4 volte al dì',
          preparationAdvice: 'Limitare il trattamento a 3-5 giorni (max 7). Non prescrivere ripetizioni continuative senza controllo oculistico.',
          maxDoseCap: 'Massimo 5 - 7 giorni consecutivi',
          frequencyOrDuration: 'Ogni 6-8 ore per max 5-7 giorni'
        },
        {
          label: 'Calazio Infiammato / Blefarite Edematosa (Unguento)',
          route: 'Oftalmica',
          rawFormula: 'Applicare 1 cm nel sacco congiuntivale o sul margine palpebrale 2 volte al dì per 5 giorni',
          calculatedValue: '1 cm di unguento',
          unit: 'cm',
          numericDose: 1,
          volumeInfo: 'Tubetto 3,5 g: stendere delicatamente sul margine palpebrale o nel fornice',
          preparationAdvice: 'Associare impacchi caldo-umidi per 10 minuti 2-3 volte al giorno',
          maxDoseCap: 'Massimo 5-7 giorni',
          frequencyOrDuration: '2 volte al giorno per 5 giorni'
        }
      ];
    }
  },

  {
    id: 'ketotifene-collirio',
    name: 'Ketotifene 0,025% Collirio Antiallergico (Zaditen Oftabak)',
    commercialNames: ['Zaditen Oftabak 0,25 mg/mL (senza conservanti)', 'Brunistill', 'Ketocin', 'Opatanol (Olopatadina 1 mg/mL)'],
    category: 'oftalmici',
    sectionNum: 14,
    sectionTitle: 'Oculistica Pediatrica: Colliri e Pomate Oftalmiche',
    summaryDose: '1 goccia nell\'occhio affetto 2 volte al giorno (mattino e sera)',
    routes: ['Oftalmica (Collirio)'],
    indications: [
      'Congiuntivite allergica stagionale (pollinosi da graminacee, parietaria, betulla, olivo)',
      'Congiuntivite allergica perenne (acari della polvere, forfora di animali domestici)',
      'Prurito oculare intenso bilaterale, iperemia congiuntivale, chemosi e lacrimazione acquosa non purulenta'
    ],
    contraindications: [
      'Ipersensibilità nota a ketotifene o agli eccipienti',
      'Bambini di età inferiore a 3 anni (limitata esperienza sotto i 36 mesi)'
    ],
    adverseEffectsAndNotes: [
      'DOPPIA AZIONE FARMACOLOGICA: potente antagonista selettivo dei recettori istaminici H1 (effetto rapido antalgico/antipruriginoso) associato a stabilizzazione di membrana dei mastociti (prevenzione a lungo termine).',
      'FORMULAZIONE SENZA CONSERVANTI (Zaditen Oftabak flacone con filtro ABAK): eccellente tollerabilità locale nei bambini, priva di benzalconio cloruro (non danneggia l\'epitelio corneale e non causa sensibilizzazione da conservante).',
      'Inizio d\'azione molto rapido (entro pochi minuti dall\'instillazione) e durata d\'azione fino a 8-12 ore.',
      'Nei periodi di picco pollinico può essere somministrato in modo continuativo per alcune settimane/mesi secondo prescrizione pediatrica.',
      'Non provoca midriasi né annebbiamento visivo significativo.'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Congiuntivite Allergica (Bambini ≥ 3 anni)',
          route: 'Oftalmica',
          rawFormula: '1 goccia in ciascun occhio 2 volte al giorno (ogni 12 ore: mattino e sera)',
          calculatedValue: '1 goccia per occhio',
          unit: 'goccia',
          numericDose: 1,
          volumeInfo: 'Flacone ABAK multidose senza conservanti 5 mL: 1 goccia per occhio ore 8 e ore 20',
          preparationAdvice: 'Nei bambini < 3 anni consultare lo specialista (usare eventualmente impacchi freddi e lacrime artificiali)',
          frequencyOrDuration: '2 volte al giorno (mattino e sera) durante l\'esposizione allergenica'
        }
      ];
    }
  },

  // ==========================================
  // SEZIONE 15: OTORINOLARINGOIATRIA PEDIATRICA (GOCCE AURICOLARI)
  // ==========================================
  {
    id: 'ciprofloxacina-desametasone-auricolari',
    name: 'Ciprofloxacina + Desametasone Gocce Auricolari (Cetraxal Plus)',
    commercialNames: ['Cetraxal Plus (ciprofloxacina 3 mg/mL + desametasone 1 mg/mL)', 'Otomize', 'Ciproxin gocce otologiche 0,2%'],
    category: 'otologici',
    sectionNum: 15,
    sectionTitle: 'Otorinolaringoiatria Pediatrica: Gocce Auricolari',
    summaryDose: '4 gocce (o 1 monodose) nell\'orecchio affetto 2 volte/die per 7 giorni',
    routes: ['Auricolare'],
    indications: [
      'Otite esterna acuta diffusa batterica ("otite del nuotatore") sostenuta da Pseudomonas aeruginosa o Staphylococcus aureus',
      'Otite media acuta con MEMBRANA TIMPANICA PERFORATA e otorrea purulenta attiva',
      'Infezione otologica in portatori di tubi di ventilazione transtimpanica (grommet)'
    ],
    contraindications: [
      'Infezioni virali del condotto uditivo (herpes simplex, herpes zoster oticus / sindrome di Ramsay-Hunt)',
      'Otomicosi da Candida o Aspergillus',
      'Ipersensibilità nota ai fluorochinoloni o corticosteroidi'
    ],
    adverseEffectsAndNotes: [
      'FARMACO OTOLOGICO CARDINE DI SICUREZZA IN PEDIATRIA: È NON OTOTOSSICO!',
      'A differenza dei vecchi preparati otologici contenenti aminoglicosidi (gentamicina, neomicina, tobramicina, polimixina B), la CIPROFLOXACINA NON presenta tossicità cocleare o vestibolare e PUÒ ESSERE IMPIEGATA IN PIENA SICUREZZA ANCHE A TIMPANO PERFORATO o con drenaggi transtimpanici.',
      'ISTRUZIONI FONDAMENTALI DI SOMMINISTRAZIONE:',
      '1. SCALDARE IL FLACONE o il contenitore monodose TRA LE MANI per 2-3 minuti prima dell\'instillazione. L\'instillazione di gocce fredde stimola violentemente il canale semicircolare orizzontale, provocando vertigini caloriche acute, nistagmo, nausea e vomito nel bambino!',
      '2. Posizionare il bambino sdraiato con l\'orecchio affetto rivolto verso l\'alto.',
      '3. Trazionare delicatamente il padiglione all\'indietro e verso il basso (nel lattante/bambino piccolo <3 anni) o all\'indietro e verso l\'alto (nel bambino più grande) per rettificare il condotto uditivo.',
      '4. Instillare le 4 gocce (o l\'intero flaconcino monodose da 0,25 mL) senza che il contagocce tocchi l\'orecchio.',
      '5. Mantenere il bambino in decubito laterale per 3-5 minuti premendo delicatamente sul trago con movimento a pompa per favorire la penetrazione delle gocce nel fondo del condotto.',
      'DURATA TERAPIA: 7 giorni consecutivi (evitare sospensioni precoci).'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Otite Esterna Acuta / Otite con Otorrea a Timpano Perforato',
          route: 'Auricolare',
          rawFormula: '4 gocce (o 1 contenitore monodose) nell\'orecchio affetto ogni 12 ore (2 volte/die)',
          calculatedValue: '4 gocce (o 1 monodose)',
          unit: 'gocce',
          numericDose: 4,
          volumeInfo: 'Monodose 0,25 mL o flacone con contagocce: scaldare tra le mani prima dell\'instillazione',
          preparationAdvice: 'Mantenere il bambino sul fianco per 3-5 minuti dopo l\'instillazione. Sicuro anche con timpano perforato.',
          maxDoseCap: 'Durata standard: 7 giorni consecutivi',
          frequencyOrDuration: 'Ogni 12 ore (mattino e sera) per 7 giorni'
        }
      ];
    }
  },

  {
    id: 'procaina-fenazone-auricolari',
    name: 'Procaina + Fenazone Gocce Auricolari (Otalgan)',
    commercialNames: ['Otalgan gocce auricolari (fenazone 5% + procaina cloridrato 1%)', 'Oto-Chibro gocce'],
    category: 'otologici',
    sectionNum: 15,
    sectionTitle: 'Otorinolaringoiatria Pediatrica: Gocce Auricolari',
    summaryDose: '3-5 gocce nel condotto uditivo 2-4 volte/die (SOLO A TIMPANO INTEGRO!)',
    routes: ['Auricolare'],
    indications: [
      'Terapia antalgica sintomatica e decongestionante delle flogosi dolorose dell\'orecchio medio ed esterno (otite catarrale acuta, barotrauma, otalgia)',
      'Sollievo rapido dal dolore auricolare acuto in attesa dell\'effetto dei farmaci sistemici (paracetamolo / ibuprofene)'
    ],
    contraindications: [
      'CONTROINDICAZIONE ASSOLUTA: PERFORAZIONE DELLA MEMBRANA TIMPANICA o presenza di tubi di drenaggio transtimpanico!',
      'Otorrea purulenta, mucosa o siero-ematica (qualsiasi fuoriuscita di liquido dall\'orecchio controindica formalmente il prodotto)',
      'Ipersensibilità nota a procaina (anestetici locali di tipo estere) o al fenazone/pirazoloni'
    ],
    adverseEffectsAndNotes: [
      'AVVERTENZA CRITICA DI SICUREZZA PEDIATRICA:',
      '• È OBBLIGATORIO accertare l\'INTEGRITÀ della membrana timpanica mediante otoscopia prima di instillare le gocce.',
      '• Se la membrana timpanica è perforata, il passaggio di procaina e fenazone nella cavità timpanica può provocare gravissima irritazione della mucosa della cassa, tossicità labirintica e sordità!',
      '• Se il bambino presenta secrezione dal condotto uditivo (otorrea), SOSPENDERE immediatamente e non applicare.',
      'L\'effetto analgesico locale della procaina inizia in circa 15-30 minuti.',
      'Scaldare leggermente il flaconcino tra le mani per evitare vertigini caloriche da liquido freddo.',
      'Dopo l\'instillazione, mantenere la testa reclinata per 5 minuti; si può inserire un piccolo batuffolo di cotone idrofilo all\'ingresso del meato acustico per evitare la fuoriuscita.',
      'Non superare i 5-7 giorni di impiego continuativo.'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Otalgia Acuta Semplice (SOLO CON MEMBRANA TIMPANICA INTEGRA)',
          route: 'Auricolare',
          rawFormula: '3 - 5 gocce nel condotto uditivo dell\'orecchio dolorante 2-4 volte al giorno',
          calculatedValue: '3 - 5 gocce',
          unit: 'gocce',
          numericDose: 4,
          volumeInfo: 'Flacone con contagocce: scaldare prima tra le mani, instillare e mantenere la testa reclinata 5 min',
          preparationAdvice: 'VERIFICARE ALL\'OTOSCOPIA CHE IL TIMPANO SIA INTEGRO! Non instillare se secrezione o sospetta perforazione.',
          maxDoseCap: 'Max 4 volte/die per 5-7 giorni',
          frequencyOrDuration: '2 - 4 volte al giorno al bisogno'
        }
      ];
    }
  },

  // ==========================================
  // SEZIONE 16: DERMATOLOGIA PEDIATRICA (POMATE CORTISONICHE, ANTISTAMINICHE, ANTIBATTERICHE)
  // ==========================================
  {
    id: 'idrocortisone-butirrato-locoidon',
    name: 'Idrocortisone Butirrato 0,1% (Locoidon)',
    commercialNames: ['Locoidon 0,1% crema', 'Locoidon 0,1% emulsione cutanea (latte)', 'Locoidon 0,1% soluzione', 'Locoidon Crelo'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Cortisonici, Antistaminici)',
    summaryDose: 'Applicare un sottile strato sulle lesioni 1 volta/die (regola della FTU)',
    routes: ['Topica / Cutanea'],
    indications: [
      'Corticosteroide topico di media potenza (Classe II/III) DI PRIMA SCELTA nella dermatite atopica del bambino (fase di riacutizzazione / flare)',
      'Eczema da contatto allergico o irritativo',
      'Punture di insetto con reazione infiammatoria locale esuberante (ampio alone eritematoso, edema e intenso prurito)',
      'Dermatite seborroica infantile, disidrosi, prurigo'
    ],
    contraindications: [
      'Infezioni cutanee primitive virali (Herpes simplex, varicella, mollusco contagioso), micotiche o batteriche (impetigine non trattata)',
      'Ulcere cutanee o ferite aperte',
      'Zona perioculare (rischio aumento pressione intraoculare o glaucoma da steroidi)',
      'Dermatite periorale, acne volgare'
    ],
    adverseEffectsAndNotes: [
      'REGOLA FONDAMENTALE DELLA FINGERTIP UNIT (FTU):',
      '• 1 FTU corrisponde alla quantità di crema spremuta da un tubetto con bocchello standard (5 mm) che ricopre la falange distale del dito indice di un adulto (~0,5 g di crema).',
      '• 1 FTU è sufficiente per trattare una superficie cutanea pari a DUE VOLTE IL PALMO DELLA MANO DEL BAMBINO (con dita incluse).',
      '• Guida pratica FTU per età:',
      '  - 3-12 mesi: Viso/collo 1 FTU | Braccio+mano 1 FTU | Gamba+piede 1,5 FTU | Tronco ant. 1 FTU | Tronco post. 1,5 FTU',
      '  - 1-5 anni: Viso/collo 1,5 FTU | Braccio+mano 1,5 FTU | Gamba+piede 2 FTU | Tronco ant. 2 FTU | Tronco post. 3 FTU',
      '  - 6-10 anni: Viso/collo 2 FTU | Braccio+mano 2 FTU | Gamba+piede 3,5 FTU | Tronco ant. 3 FTU | Tronco post. 4 FTU',
      'MODALITÀ DI SOMMINISTRAZIONE NEI BAMBINI:',
      '• È raccomandata UNA SOLA APPLICAZIONE AL GIORNO (preferibilmente la sera): studi clinici pediatrici dimostrano che 1 applicazione/die ha la stessa efficacia di 2 applicazioni ma con dimezzamento dell\'assorbimento sistemico.',
      '• NON UTILIZZARE sotto bendaggio occlusivo o sotto il pannolino (il pannolino quadruplica l\'assorbimento sistemico con rischio di soppressione dell\'asse ipotalamo-ipofisi-surrene).',
      '• Durata: trattare per 3-7 giorni fino al controllo del flare acuto, poi scalare a giorni alterni o due volte a settimana per prevenire le recidive (terapia proattiva a lungo termine).'
    ],
    calculateDoses: (w: number) => {
      let ftuGuideline = '1 - 1,5 FTU per area corporea';
      if (w < 10) ftuGuideline = '1 FTU (~0,5 g) per area pari a 2 manine del lattante';
      else if (w < 25) ftuGuideline = '1,5 - 2 FTU per area corporea interessata';
      else ftuGuideline = '2 - 3 FTU per arto / area interessata';

      return [
        {
          label: 'Dermatite Atopica in Fase Acuta / Eczema / Reazione da Puntura',
          route: 'Topica / Cutanea',
          rawFormula: `Applicare strato sottile 1 volta/die la sera (${ftuGuideline})`,
          calculatedValue: '1 applicazione/die (la sera)',
          unit: 'applicazione',
          numericDose: 1,
          volumeInfo: `Regola FTU: ${ftuGuideline}. Stendere con lieve massaggio fino a scomparsa`,
          preparationAdvice: 'Applicare preferibilmente la sera. Nei giorni seguenti associare emollienti idratanti neutri a distanza di 30 minuti.',
          maxDoseCap: 'Trattamento acuto: 3-7 giorni consecutivi; poi scalare a giorni alterni',
          frequencyOrDuration: '1 volta al giorno la sera per 3-7 giorni'
        },
        {
          label: 'Emulsione Cutanea (Formulazione Latte / Cuoio Capelluto o Pieghe)',
          route: 'Topica / Cutanea',
          rawFormula: 'Poche gocce distribuite uniformemente sulle lesioni 1 volta al giorno',
          calculatedValue: 'Poche gocce',
          unit: 'gocce',
          numericDose: 1,
          volumeInfo: 'Locoidon emulsione (flacone 30 mL): ideale per aree coperte da peli, pieghe ascellari e inguinali',
          preparationAdvice: 'Non usare su lesioni macerate o con sospetta sovrainfezione da Candida',
          frequencyOrDuration: '1 volta al giorno per 3-5 giorni'
        }
      ];
    }
  },

  {
    id: 'metilprednisolone-aceponato-advantan',
    name: 'Metilprednisolone Aceponato 0,1% (Advantan)',
    commercialNames: ['Advantan 0,1% crema', 'Advantan 0,1% unguento', 'Advantan 0,1% emulsione cutanea'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Cortisonici, Antistaminici)',
    summaryDose: '1 sola applicazione al giorno in strato sottile (max 4 settimane nel bambino)',
    routes: ['Topica / Cutanea'],
    indications: [
      'Dermatite atopica severa con intenso eritema, lichenificazione e lesioni desquamanti',
      'Eczema da contatto grave (allergico o irritativo), eczema nummulare, eczema disidrosico',
      'Neurodermite infantile con circolo vizioso prurito-grattamento'
    ],
    contraindications: [
      'Lesioni tubercolari o luetiche della cute, affezioni virali (varicella, herpes zoster, herpes simplex)',
      'Rosacea, dermatite periorale, reazioni cutanee post-vaccinali nella sede di applicazione',
      'Cute lesa o ulcerata, micosi cutanee'
    ],
    adverseEffectsAndNotes: [
      'CORTICOSTEROIDE TOPICO DI ULTIMA GENERAZIONE AD ALTO INDICE TERAPEUTICO (Classe III):',
      '• Meccanismo biochimico "Soft Drug": profarmaco lipofilo che penetra rapidamente nell\'epidermide dove viene attivato dalle esterasi cutanee in 6-alfa-metilprednisolone 17-propionato. Una volta raggiunto il circolo ematico, viene idrolizzato a metaboliti inattivi, riducendo drasticamente il rischio di soppressione dell\'asse surrenalico e di atrofia cutanea rispetto ai vecchi fluorurati.',
      '• POSOLOGIA: 1 SOLA APPLICAZIONE AL GIORNO in strato molto sottile.',
      '• GUIDA ALLA SCELTA DELLA FORMULAZIONE:',
      '  - Crema (base idrofila, alto contenuto d\'acqua): ideale per la fase acuta, lesioni essudanti, pieghe flessorie (gomiti, ginocchia).',
      '  - Unguento (base anidra molto grassa): ideale per lesioni croniche, secche, desquamanti e lichenificate.',
      '  - Emulsione: ideale per eritemi solari acuti o zone pilifere.',
      'DURATA MASSIMA NEL BAMBINO: non oltre 4 settimane consecutive (di norma 1-2 settimane sono sufficienti per ottenere la remissione completa).'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Eczema Atopico / Flogosi Cutanea Severa (Crema o Unguento)',
          route: 'Topica / Cutanea',
          rawFormula: '1 sola applicazione al giorno (strato sottile con regola FTU) per 1-2 settimane',
          calculatedValue: '1 applicazione al giorno',
          unit: 'applicazione',
          numericDose: 1,
          volumeInfo: 'Crema per fasi acute ed essudative; unguento per fasi croniche secche e lichenificate',
          preparationAdvice: 'Massaggiare leggermente fino a completo assorbimento. Non applicare sotto bendaggio occlusivo.',
          maxDoseCap: 'Max 4 settimane nel bambino (in genere 7-14 giorni)',
          frequencyOrDuration: '1 volta al giorno (preferibilmente sera)'
        }
      ];
    }
  },

  {
    id: 'idrocortisone-crema-bassa-potenza',
    name: 'Idrocortisone 0,5% - 1% Crema (Dermocortico, Cortidro)',
    commercialNames: ['Dermocortico 0,5% crema', 'Cortidro 0,5% crema', 'Idrocortisone Zeta 0,5%', 'Lanacort 1%'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Cortisonici, Antistaminici)',
    summaryDose: 'Applicare un sottile strato 1-2 volte/die per 3-5 giorni',
    routes: ['Topica / Cutanea'],
    indications: [
      'Punture di zanzare, api, vespe e meduse con reazione eritematosa e pruriginosa localizzata',
      'Dermatiti irritative superficiali di lieve entità',
      'Eritemi solari circoscritti e lievi scottature superficiali di I grado',
      'Eritema da pannolino non infetto da Candida refrattario agli emollienti (solo per 2-3 giorni in strato minimo)'
    ],
    contraindications: [
      'Infezioni cutanee batteriche primitive o sovrainfezioni micotiche (specie candidosi da pannolino)',
      'Lesioni ulcerative o ferite aperte sanguinanti'
    ],
    adverseEffectsAndNotes: [
      'CORTICOSTEROIDE A BASSA POTENZA (Classe I): farmaco da banco (OTC/SOP) di largo impiego domestico in Italia.',
      'Profilo di sicurezza molto elevato: minimo assorbimento sistemico e quasi nullo effetto atrofogeno cutaneo a breve termine.',
      'Non applicare su aree cutanee molto vaste.',
      'Se dopo 3-5 giorni di trattamento il disturbo non migliora, sospendere e richiedere parere pediatrico per escludere sovrainfezione o diagnosi differente.'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Punture d\'Insetto / Eritema Lieve Circoscritto',
          route: 'Topica / Cutanea',
          rawFormula: 'Applicare un sottile strato sull\'area interessata 1-2 volte al giorno per 3-5 giorni',
          calculatedValue: '1 - 2 applicazioni/die',
          unit: 'applicazioni',
          numericDose: 1,
          volumeInfo: 'Tubo da 20-30 g: stendere una noce di crema con leggero massaggio circoscritto',
          preparationAdvice: 'Evitare il contatto con occhi e mucose. Non protrarre oltre 5 giorni se non prescritto dal medico.',
          maxDoseCap: 'Massimo 3 - 5 giorni di trattamento continuo',
          frequencyOrDuration: '1 - 2 volte al giorno per 3-5 giorni'
        }
      ];
    }
  },

  {
    id: 'dimetindene-fenistil-gel',
    name: 'Dimetindene Maleato 0,1% Gel (Fenistil)',
    commercialNames: ['Fenistil 0,1% Gel (dimetindene maleato 1 mg/g)', 'Dimetindene generico gel'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Cortisonici, Antistaminici)',
    summaryDose: 'Applicare una piccola quantità 2-3 volte/die (NON esporre al sole!)',
    routes: ['Topica / Cutanea (Gel)'],
    indications: [
      'Trattamento locale sintomatico del prurito in dermatiti pruriginose, eritemi solari circoscritti, punture di zanzare, vespe e altri insetti',
      'Lievi ustioni ed abrasioni termiche superficiali senza perdita di sostanza epidermica'
    ],
    contraindications: [
      'CONTROINDICATO nei neonati e nei lattanti sotto 1 anno d\'età (rischio di assorbimento sistemico)',
      'Cute lesa, escoriazioni, ferite aperte, lesioni vescicolari o bollose essudanti',
      'Applicazione su estese aree corporee (superiori al 10% della superficie corporea) nei bambini piccoli'
    ],
    adverseEffectsAndNotes: [
      'L\'ANTISTAMINICO TOPICO PIÙ NOTO E USATO IN ITALIA PER LE PUNTURE D\'INSETTO.',
      'AVVERTENZA CRITICA: RISCHIO DI FOTOSENSIBILIZZAZIONE CUTANEA:',
      '• NON ESPORRE L\'AREA TRATTATA AL SOLE DIRETTO o a lampade UV durante il trattamento e per almeno 48 ORE DOPO la sospensione.',
      '• L\'esposizione solare di aree trattate con antistaminici topici può innescare severe dermatiti fototossiche o fotoallergiche con eritema marcato, bolle e iperpigmentazione persistente.',
      'AVVERTENZE DI ASSORBIMENTO SISTEMICO NEL BAMBINO PICCOLO (1-2 ANNI):',
      '• La barriera cutanea del bambino piccolo è più sottile: se applicato su ampie superfici può essere assorbito provocando effetti sistemici da antistaminico (sedazione e sonnolenza oppure, paradossalmente, agitazione psicomotoria, tremori e tachicardia).',
      '• Applicare ESCLUSIVAMENTE su lesioni puntiformi circoscritte (la singola puntura d\'insetto).',
      'Base gel idrofila non grassa con effetto rinfrescante ed evanescente immediato.'
    ],
    calculateDoses: (w: number) => {
      const isUnderTwo = w < 12;
      return [
        {
          label: 'Prurito da Puntura di Insetto / Eritema Circoscritto',
          route: 'Topica (Gel)',
          rawFormula: 'Piccola quantità localizzata 2-3 volte al giorno (NON ESPORRE AL SOLE)',
          calculatedValue: 'Piccola quantità localizzata',
          unit: 'applicazione',
          numericDose: 1,
          volumeInfo: 'Tubo 30 g: applicare solo sul pomfo della puntura con leggero massaggio',
          preparationAdvice: isUnderTwo 
            ? 'ATTENZIONE: Bambino piccolo (<2 anni): applicare solo minime quantità puntiformi. NON applicare su superfici estese.' 
            : 'NON esporre al sole la zona trattata durante e per 48h dopo l\'applicazione!',
          maxDoseCap: 'Max 2-3 applicazioni al giorno per 3-5 giorni',
          alertNote: 'Rischio fotosensibilizzazione: proteggere rigorosamente dal sole',
          frequencyOrDuration: '2 - 3 volte al giorno al bisogno'
        }
      ];
    }
  },

  {
    id: 'difenidramina-crema',
    name: 'Difenidramina Cloridrato 2% Crema (Allergan Crema)',
    commercialNames: ['Allergan 2% crema (difenidramina cloridrato 2 g/100 g)', 'Caladryl (difenidramina + calamina)'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Cortisonici, Antistaminici)',
    summaryDose: 'Applicare uno strato sottile 2-3 volte al giorno (controindicato sotto i 2 anni)',
    routes: ['Topica / Cutanea (Crema)'],
    indications: [
      'Trattamento sintomatico locale di prurito, punture d\'insetto, eritemi solari circoscritti, orticaria cutanea localizzata'
    ],
    contraindications: [
      'CONTROINDICATO nei bambini di età inferiore a 2 anni',
      'Cute abrasa, lesioni infette, eczemi essudativi, ferite aperte',
      'Ipersensibilità nota a difenidramina o ad altri antistaminici'
    ],
    adverseEffectsAndNotes: [
      'ANTISTAMINICO TOPICO H1 DI PRIMA GENERAZIONE:',
      '• Non applicare su superfici cutanee estese per evitare l\'assorbimento sistemico (possibile sedazione, sonnolenza o eccitabilità paradossa nei bambini).',
      '• FOTOSENSIBILIZZAZIONE: evitare l\'esposizione diretta ai raggi solari e UV delle parti trattate.',
      '• Non bendare con medicazioni occlusive.',
      '• Non protrarre l\'uso oltre i 5-7 giorni consecutivi: se il prurito non regredisce, rivalutare la terapia e considerare un antistaminico orale di 2ª generazione (cetirizina).'
    ],
    calculateDoses: (w: number) => {
      const isUnderTwo = w < 12;
      return [
        {
          label: 'Prurito Locale e Punture d\'Insetti (Bambini ≥ 2 anni)',
          route: 'Topica (Crema)',
          rawFormula: 'Applicare uno strato sottile sull\'area lesa 2-3 volte al giorno',
          calculatedValue: isUnderTwo ? 'CONTROINDICATO < 2 ANNI' : 'Strato sottile localizzato',
          unit: 'applicazione',
          numericDose: isUnderTwo ? 0 : 1,
          volumeInfo: 'Tubo da 30 g: stendere con cura solo sull\'area limitata del prurito',
          preparationAdvice: isUnderTwo ? 'Sotto i 2 anni preferire rimedi fisici freddi o consultare il pediatra' : 'Evitare l\'esposizione al sole dell\'area trattata',
          maxDoseCap: isUnderTwo ? 'Non somministrare sotto i 2 anni' : 'Max 2-3 volte/die per 5-7 giorni',
          alertNote: isUnderTwo ? 'Controindicato sotto i 2 anni di età' : undefined,
          frequencyOrDuration: '2 - 3 volte al giorno'
        }
      ];
    }
  },

  {
    id: 'prometazina-fargan-crema',
    name: 'Prometazina 2% Crema (Fargan)',
    commercialNames: ['Fargan 2% crema (prometazina 2 g/100 g)', 'Prometazina generico 2% crema'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Cortisonici, Antistaminici)',
    summaryDose: 'Applicare 2-3 volte al giorno (CONTROINDICATO SOTTO I 2 ANNI!)',
    routes: ['Topica / Cutanea (Crema)'],
    indications: [
      'Trattamento locale del prurito da punture di zanzare e altri insetti, eritemi solari circoscritti, dermatite da contatto'
    ],
    contraindications: [
      'CONTROINDICAZIONE ASSOLUTA: Bambini di età inferiore a 2 anni (rischio di depressione respiratoria fatale e neurotossicità da fenotiazine)!',
      'Dermatiti essudative, eczema umido, cute lesa o abrasa',
      'Esposizione al sole o a raggi UV'
    ],
    adverseEffectsAndNotes: [
      'IMPORTANTE AVVISO DI FARMACOVIGILANZA AIFA / EMA:',
      '• FORTE AZIONE FOTOSENSIBILIZZANTE: la prometazina è una fenotiazina con elevatissimo potenziale fototossico e fotoallergico. NON ESPORRE MAI AL SOLE le zone trattate sia durante il trattamento sia per almeno 48-72 ore dopo!',
      '• L\'esposizione solare anche fugace può provocare dermatite bollosa severa e ipercromia cutanea duratura.',
      '• CONTROINDICATA SOTTO I 2 ANNI D\'ETÀ in modo assoluto.',
      '• Nei bambini sopra i 2 anni, le linee guida pediatriche preferiscono l\'uso di creme cortisoniche a bassa potenza (idrocortisone) o antistaminici sistemici di seconda generazione (cetirizina in gocce), che presentano un profilo di sicurezza enormemente superiore.',
      '• Lavare accuratamente le mani dopo l\'applicazione.'
    ],
    calculateDoses: (w: number) => {
      const isUnderTwo = w < 12;
      return [
        {
          label: 'Prurito Locale (SOLO Bambini > 2 anni)',
          route: 'Topica (Crema)',
          rawFormula: 'Strato sottile 2-3 volte al dì (NON USARE SOTTO I 2 ANNI)',
          calculatedValue: isUnderTwo ? 'CONTROINDICATO < 2 ANNI' : 'Strato sottile localizzato',
          unit: 'applicazione',
          numericDose: isUnderTwo ? 0 : 1,
          volumeInfo: 'Tubo 20-30 g: stendere pochissima crema. Evitare sole in modo categorico',
          preparationAdvice: isUnderTwo ? 'Non somministrare sotto i 2 anni (rischio fenotiazine)' : 'Lavarsi le mani e coprire la zona per evitare esposizione solare',
          maxDoseCap: isUnderTwo ? 'Controindicato sotto i 2 anni' : 'Max 2-3 volte/die per 3-5 giorni',
          alertNote: isUnderTwo ? 'CONTROINDICATO SOTTO I 2 ANNI' : 'Attenzione: alto potenziale fotosensibilizzante',
          frequencyOrDuration: '2 - 3 volte al giorno'
        }
      ];
    }
  },

  {
    id: 'acido-fusidico-fucidin',
    name: 'Acido Fusidico 2% Crema / Unguento (Fucidin)',
    commercialNames: ['Fucidin 2% crema', 'Fucidin 2% unguento', 'Acido Fusidico generico 2%'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Antibatteriche)',
    summaryDose: 'Applicare sulle lesioni 2-3 volte al giorno per 7-10 giorni',
    routes: ['Topica / Cutanea'],
    indications: [
      'ANTIBATTERICO TOPICO DI PRIMA SCELTA nell\'Impetigine contagiosa bollosa e crostosa (Staphylococcus aureus compreso MRSA, Streptococcus pyogenes)',
      'Follicolite, foruncolosi, perionichia (giradito)',
      'Sovrainfezioni batteriche di lesioni da grattamento (eczema atopico sovrainfetto, punture di zanzara escoriate con pus)'
    ],
    contraindications: [
      'Ipersensibilità nota ad acido fusidico o sali di fusidato',
      'Infezioni causate da microrganismi non sensibili (in particolare Pseudomonas aeruginosa ed enterobatteri)'
    ],
    adverseEffectsAndNotes: [
      'PRIMA SCELTA NELLE INFEZIONI CUTANEE PEDIATRICHE SUPERFICIALI IN ITALIA:',
      '• Elevatissima attività battericida mirata contro stafilococchi e streptococchi, con ottima penetrazione negli strati epidermici profondi e nelle croste.',
      'ISTRUZIONI FONDAMENTALI PER IL TRATTAMENTO DELL\'IMPETIGINE:',
      '• Prima dell\'applicazione, ammorbidire e rimuovere DELICATAMENTE le caratteristiche croste "meliceriche" (giallo-miele) applicando impacchi tiepidi di soluzione fisiologica o acqua e sapone antibatterico: le croste formano uno scudo impermeabile che impedisce alla crema di raggiungere i batteri sottostanti.',
      '• Applicare un velo sottile di crema o unguento direttamente sulle lesioni 2-3 volte al giorno.',
      '• Può essere lasciato scoperto o protetto con una garza sterile per evitare che il bambino si tocchi e diffonda l\'infezione ad altre sedi del corpo (autoinoculazione) o ai fratellini.',
      '• SCELTA FORMULAZIONE: crema idrofila per lesioni umide essudanti; unguento per lesioni secche o crostose.',
      '• Durata: 7-10 giorni consecutivi. Evitare trattamenti troppo brevi per prevenire selezioni di ceppi resistenti.'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Impetigine Contagiosa / Sovrainfezione Batterica Superficiale',
          route: 'Topica / Cutanea',
          rawFormula: 'Applicare 2-3 volte al giorno per 7-10 giorni previa rimozione delicata delle croste',
          calculatedValue: '2 - 3 applicazioni al giorno',
          unit: 'applicazioni',
          numericDose: 3,
          volumeInfo: 'Tubo da 15-30 g: applicare strato sottile sulle lesioni. Rimuovere prima le croste con impacchi tiepidi.',
          preparationAdvice: 'Rimuovere prima le croste con garza e fisiologica. Proseguire per 7-10 giorni consecutivi.',
          maxDoseCap: 'Durata standard: 7 - 10 giorni consecutivi',
          frequencyOrDuration: '2 - 3 volte al giorno per 7-10 giorni'
        }
      ];
    }
  },

  {
    id: 'mupirocina-bactroban',
    name: 'Mupirocina 2% Pomata (Bactroban)',
    commercialNames: ['Bactroban 2% pomata', 'Bactroban nasale 2%', 'Mupirocina generico 2% pomata'],
    category: 'dermatologici',
    sectionNum: 16,
    sectionTitle: 'Dermatologia Pediatrica: Pomate e Creme (Antibatteriche)',
    summaryDose: 'Applicare una piccola quantità 2-3 volte al giorno per 7-10 giorni',
    routes: ['Topica / Cutanea'],
    indications: [
      'Infezioni cutanee primitive e secondarie: impetigine contagiosa, follicolite, foruncoli, ectima',
      'Piccole ferite lacero-contuse o escoriazioni traumatiche secondariamente infette',
      'Eradicazione dei portatori nasali sani o sintomatici di Staphylococcus aureus compresi ceppi MRSA (formulazione unguento nasale)'
    ],
    contraindications: [
      'Ipersensibilità al principio attivo o al polietilenglicole (macrogol)',
      'La formulazione pomata contiene macrogol: non applicare su estese superfici con cute lesa o ustioni gravi in caso di insufficienza renale severa'
    ],
    adverseEffectsAndNotes: [
      'ANTIBATTERICO TOPICO SPECIALE AD AMPIO SPETTRO GRAM-POSITIVO:',
      '• Meccanismo d\'azione unico: inibisce selettivamente la sintesi proteica batterica legandosi all\'isoleucil-tRNA sintetasi. Grazie a questa struttura non condivide resistenze crociate con altri antibiotici (penicilline, cefalosporine, aminoglicosidi, macrolidi).',
      '• Efficacia eccezionale contro ceppi resistenti di Staphylococcus aureus (MRSA).',
      '• Applicare una piccola quantità sull\'area affetta con garza sterile o polpastrello pulito 2-3 volte al giorno per massimo 10 giorni.',
      '• L\'area trattata può essere coperta con un bendaggio protettivo se necessario.',
      '• Se non si riscontra miglioramento entro 3-5 giorni, rivalutare il quadro clinico per sospetta infezione micotica o virale.'
    ],
    calculateDoses: (w: number) => {
      return [
        {
          label: 'Infezioni Batteriche Cutanee / Impetigine / Ferite Infette',
          route: 'Topica / Cutanea',
          rawFormula: 'Piccola quantità sull\'area lesa 2-3 volte al giorno per massimo 10 giorni',
          calculatedValue: '2 - 3 applicazioni al giorno',
          unit: 'applicazioni',
          numericDose: 3,
          volumeInfo: 'Tubo pomata 15 g: stendere velo sottile. Coprire con garza se necessario per evitare autoinoculazione',
          preparationAdvice: 'Lavare le mani prima e dopo l\'applicazione. Rivalutare se non migliorato entro 3-5 giorni.',
          maxDoseCap: 'Massimo 10 giorni continuativi',
          frequencyOrDuration: '2 - 3 volte al giorno per 7-10 giorni'
        },
        {
          label: 'Eradicazione Portatore Nasale di Stafilococco (Unguento Nasale)',
          route: 'Nasale Topica',
          rawFormula: 'Applicare una piccola quantità di unguento nasale in ciascuna narice 2 volte/die per 5 giorni',
          calculatedValue: '1 applicazione in ciascuna narice',
          unit: 'applicazione',
          numericDose: 2,
          volumeInfo: 'Formulazione specifica Bactroban Nasale: dopo l\'applicazione massaggiare le ali del naso',
          preparationAdvice: 'Utilizzare esclusivamente la formulazione ad uso nasale registrata',
          maxDoseCap: 'Ciclo di 5 giorni',
          frequencyOrDuration: '2 volte al giorno per 5 giorni'
        }
      ];
    }
  }
];
