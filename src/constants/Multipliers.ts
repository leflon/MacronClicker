import type { Multiplier } from '@/types/Multplier';

export const campaignPromise: Multiplier = {
  id: 'campaignPromise',
  name: 'Promesse Électorale',
  description:
    'Les promesses non tenues doublent la dette générée par les élus locaux',
  impacts: ['local'],
  rate: 2,
  price: 250,
  unlockCondition: (score: number) => score > 200,
};

export const corruptionScandal: Multiplier = {
  id: 'corruptionScandal',
  name: 'Scandale de Corruption',
  description: 'Les affaires douteuses multiplient la dette locale par 2.5',
  impacts: ['local'],
  rate: 2.5,
  price: 800,
  unlockCondition: (score: number) => score > 600,
};

export const destructiveReform: Multiplier = {
  id: 'destructiveReform',
  name: 'Réforme Destructrice',
  description: 'Une réforme mal pensée qui triple la dette sénatoriale',
  impacts: ['senator'],
  rate: 3,
  price: 1200,
  unlockCondition: (score: number) => score > 800,
};

export const senatePrivileges: Multiplier = {
  id: 'senatePrivileges',
  name: 'Privilèges du Sénat',
  description: 'Les avantages cachés des sénateurs quadruplent leur dette',
  impacts: ['senator'],
  rate: 4,
  price: 3500,
  unlockCondition: (score: number) => score > 2000,
};

export const politicalScandal: Multiplier = {
  id: 'politicalScandal',
  name: 'Scandale Politique',
  description:
    "Un scandale qui détourne l'attention et booste la dette des députés",
  impacts: ['deputy'],
  rate: 2.5,
  price: 2000,
  unlockCondition: (score: number) => score > 1500,
};

export const parliamentaryImmunity: Multiplier = {
  id: 'parliamentaryImmunity',
  name: 'Immunité Parlementaire',
  description: "L'impunité permet aux députés de générer 3x plus de dette",
  impacts: ['deputy'],
  rate: 3,
  price: 4500,
  unlockCondition: (score: number) => score > 3000,
};

export const lobbyingNetwork: Multiplier = {
  id: 'lobbyingNetwork',
  name: 'Réseau de Lobbying',
  description: 'Les influences occultes multiplient la dette députée par 5',
  impacts: ['deputy'],
  rate: 5,
  price: 12000,
  unlockCondition: (score: number) => score > 8000,
};

export const consultingCabinet: Multiplier = {
  id: 'consultingCabinet',
  name: 'Cabinet de Conseil McKinsey',
  description:
    'Des consultants hors de prix qui quadruplent la dette ministérielle',
  impacts: ['minister'],
  rate: 4,
  price: 15000,
  unlockCondition: (score: number) => score > 10000,
};

export const ministerialCar: Multiplier = {
  id: 'ministerialCar',
  name: 'Voiture de Fonction',
  description: 'Les véhicules officiels doublent la dette des ministres',
  impacts: ['minister'],
  rate: 2,
  price: 8000,
  unlockCondition: (score: number) => score > 6000,
};

export const bureaucracy: Multiplier = {
  id: 'bureaucracy',
  name: 'Bureaucratie Kafkaïenne',
  description:
    "L'administration pléthorique multiplie par 6 la dette ministérielle",
  impacts: ['minister'],
  rate: 6,
  price: 35000,
  unlockCondition: (score: number) => score > 20000,
};

export const failedCensure: Multiplier = {
  id: 'failedCensure',
  name: 'Motion de Censure Ratée',
  description: 'Une motion échouée qui triple la dette du Premier Ministre',
  impacts: ['primeMinister'],
  rate: 3,
  price: 50000,
  unlockCondition: (score: number) => score > 25000,
};

export const cabinetReshuffle: Multiplier = {
  id: 'cabinetReshuffle',
  name: 'Remaniement Ministériel',
  description:
    'Le chaos gouvernemental multiplie par 4 la dette du Premier Ministre',
  impacts: ['primeMinister'],
  rate: 4,
  price: 80000,
  unlockCondition: (score: number) => score > 40000,
};

export const jupiterianism: Multiplier = {
  id: 'jupiterianism',
  name: 'Jupitérianisme',
  description:
    'Le complexe divin présidentiel multiplie par 5 la dette suprême',
  impacts: ['president'],
  rate: 5,
  price: 300000,
  unlockCondition: (score: number) => score > 150000,
};

export const presidentialPalace: Multiplier = {
  id: 'presidentialPalace',
  name: "Fastes de l'Élysée",
  description: "Le luxe présidentiel double la dette du chef de l'État",
  impacts: ['president'],
  rate: 2,
  price: 180000,
  unlockCondition: (score: number) => score > 100000,
};

export const yellowVests: Multiplier = {
  id: 'yellowVests',
  name: 'Crise des Gilets Jaunes',
  description:
    'La contestation sociale booste étrangement la dette locale et sénatoriale',
  impacts: ['local', 'senator'],
  rate: 2.2,
  price: 5000,
  unlockCondition: (score: number) => score > 3000,
};

export const enMarche: Multiplier = {
  id: 'enMarche',
  name: 'En Marche vers la Banqueroute',
  description:
    "L'idéologie macronienne amplifie la dette de tous les niveaux politiques",
  impacts: ['local', 'senator', 'deputy', 'minister'],
  rate: 2.5,
  price: 100000,
  unlockCondition: (score: number) => score > 75000,
};

export const technocracy: Multiplier = {
  id: 'technocracy',
  name: 'Technocratie Absurde',
  description:
    'Des algorithmes gèrent la politique et multiplient la dette gouvernementale',
  impacts: ['president', 'primeMinister'],
  rate: 4.5,
  price: 500000,
  unlockCondition: (score: number) => score > 250000,
};

export const grenelle: Multiplier = {
  id: 'grenelle',
  name: 'Énième Grenelle Inutile',
  description:
    'Une concertation bidonnée qui booste mystérieusement la dette sénatoriale',
  impacts: ['senator', 'deputy'],
  rate: 3.2,
  price: 25000,
  unlockCondition: (score: number) => score > 15000,
};

export const covidDebt: Multiplier = {
  id: 'covidDebt',
  name: 'Dette COVID "Temporaire"',
  description:
    'Une dette exceptionnelle qui devient permanente et booste toute la dette',
  impacts: ['local', 'senator', 'deputy', 'minister', 'primeMinister'],
  rate: 3,
  price: 200000,
  unlockCondition: (score: number) => score > 100000,
};

export const recoveryPlan: Multiplier = {
  id: 'recoveryPlan',
  name: 'Plan de Relance Absurde',
  description:
    'Des milliards jetés par les fenêtres qui dopent la dette ministérielle',
  impacts: ['minister'],
  rate: 6,
  price: 150000,
  unlockCondition: (score: number) => score > 80000,
};

export const taxHaven: Multiplier = {
  id: 'taxHaven',
  name: 'Paradis Fiscal Domestique',
  description:
    "L'optimisation fiscale des riches multiplie par 7 la dette présidentielle",
  impacts: ['president'],
  rate: 7,
  price: 1000000,
  unlockCondition: (score: number) => score > 500000,
};

export const digitalFailure: Multiplier = {
  id: 'digitalFailure',
  name: 'Révolution Numérique Ratée',
  description:
    "La digitalisation foireuse de l'État amplifie les paradoxes temporels",
  impacts: ['timeParadox'],
  rate: 10,
  price: 5000000,
  unlockCondition: (score: number) => score > 2000000,
};

export const dysfunctionalAI: Multiplier = {
  id: 'dysfunctionalAI',
  name: 'IA Politique Dysfonctionnelle',
  description: 'Une IA qui gère mal la dette politique multiverselle',
  impacts: ['multiverse'],
  rate: 15,
  price: 25000000,
  unlockCondition: (score: number) => score > 10000000,
};

export const quantumEconomics: Multiplier = {
  id: 'quantumEconomics',
  name: 'Économie Quantique',
  description:
    "L'économie entre dans une dimension supérieure et amplifie la singularité",
  impacts: ['economicSingularity'],
  rate: 100,
  price: 500000000,
  unlockCondition: (score: number) => score > 100000000,
};

export const globalConspiracy: Multiplier = {
  id: 'globalConspiracy',
  name: 'Complot Mondialiste',
  description:
    'Les théories du complot se réalisent et boostent toute la dette politique',
  impacts: [
    'local',
    'senator',
    'deputy',
    'minister',
    'primeMinister',
    'president',
  ],
  rate: 5,
  price: 750000,
  unlockCondition: (score: number) => score > 400000,
};

export const megalomania: Multiplier = {
  id: 'megalomania',
  name: 'Mégalomanie Présidentielle',
  description:
    "L'ego démesuré du chef de l'État dépasse les dimensions physiques",
  impacts: ['president', 'timeParadox', 'multiverse'],
  rate: 8,
  price: 2000000,
  unlockCondition: (score: number) => score > 1500000,
};

export const mediaManipulation: Multiplier = {
  id: 'mediaManipulation',
  name: 'Manipulation Médiatique',
  description: "Le contrôle de l'information triple la dette des élus locaux",
  impacts: ['local'],
  rate: 3,
  price: 1500,
  unlockCondition: (score: number) => score > 1000,
};

export const publicSpending: Multiplier = {
  id: 'publicSpending',
  name: 'Dépenses Publiques Insensées',
  description:
    'Les projets pharaoniques multiplient par 4 la dette sénatoriale',
  impacts: ['senator'],
  rate: 4,
  price: 6000,
  unlockCondition: (score: number) => score > 4000,
};

export const parliamentaryExpenses: Multiplier = {
  id: 'parliamentaryExpenses',
  name: 'Frais Parlementaires Abusifs',
  description: 'Les notes de frais astronomiques doublent la dette des députés',
  impacts: ['deputy'],
  rate: 2,
  price: 3000,
  unlockCondition: (score: number) => score > 2500,
};

export const ministerialStaff: Multiplier = {
  id: 'ministerialStaff',
  name: 'Cabinet Ministériel Pléthorique',
  description: 'Une armée de conseillers qui triple la dette ministérielle',
  impacts: ['minister'],
  rate: 3,
  price: 20000,
  unlockCondition: (score: number) => score > 12000,
};

export const presidentialTrips: Multiplier = {
  id: 'presidentialTrips',
  name: 'Voyages Présidentiels',
  description:
    'Les déplacements de luxe multiplient par 3 la dette présidentielle',
  impacts: ['president'],
  rate: 3,
  price: 250000,
  unlockCondition: (score: number) => score > 200000,
};

export const socialMovements: Multiplier = {
  id: 'socialMovements',
  name: 'Mouvements Sociaux Permanents',
  description: 'Les grèves incessantes amplifient la dette locale et députée',
  impacts: ['local', 'deputy'],
  rate: 2.3,
  price: 7500,
  unlockCondition: (score: number) => score > 5000,
};
