// Original case bank. Add a case by appending an object with the same shape.
// Text fields are { fr, en }. Brainstorm keywords are matched in both languages.

export default [
  {
    id: 'bakery-profit',
    minutes: 25,
    difficulty: 2,
    sector: { fr: 'Distribution alimentaire', en: 'Food retail' },
    type: { fr: 'Rentabilité', en: 'Profitability' },
    title: { fr: 'Maison Ferrand : des marges qui fondent', en: 'Maison Ferrand: shrinking margins' },
    brief: {
      fr: 'Maison Ferrand exploite 40 boulangeries dans l’Ouest de la France. Son chiffre d’affaires est stable à 48 M€ depuis deux ans, mais son résultat opérationnel est passé de 4,0 M€ à 2,2 M€. Le dirigeant vous demande de comprendre pourquoi et de proposer un plan pour retrouver le niveau de marge initial.',
      en: 'Maison Ferrand runs 40 bakeries in western France. Revenue has been flat at €48M for two years, but operating profit fell from €4.0M to €2.2M. The CEO asks you to explain why and propose a plan to restore the original margin.',
    },
    clarifications: [
      { q: { fr: 'Le nombre de boutiques a-t-il changé ?', en: 'Has the number of shops changed?' }, a: { fr: 'Non, 40 boutiques sur toute la période.', en: 'No, 40 shops throughout the period.' } },
      { q: { fr: 'Les prix de vente ont-ils évolué ?', en: 'Have selling prices changed?' }, a: { fr: 'Ils sont restés quasiment identiques, par peur de perdre des clients.', en: 'They stayed almost flat, for fear of losing customers.' } },
      { q: { fr: 'Le mix produits a-t-il changé ?', en: 'Has the product mix changed?' }, a: { fr: 'Pas significativement : environ 55 % pain, 45 % viennoiserie et snacking.', en: 'Not significantly: about 55% bread, 45% pastries and snacks.' } },
      { q: { fr: 'Quel est l’objectif chiffré ?', en: 'What is the numeric goal?' }, a: { fr: 'Revenir à 4,0 M€ de résultat d’ici 18 mois.', en: 'Get back to €4.0M operating profit within 18 months.' } },
    ],
    structure: {
      fr: ['Revenus : volumes (fréquentation, panier moyen) × prix', 'Coûts variables : matières premières, emballages', 'Coûts fixes : personnel, loyers, énergie', 'Facteurs externes : prix du blé et du beurre, concurrence'],
      en: ['Revenue: volume (traffic, basket size) × price', 'Variable costs: raw materials, packaging', 'Fixed costs: staff, rent, energy', 'External factors: wheat and butter prices, competition'],
    },
    math: {
      question: {
        fr: 'Quelle part (en %) de la baisse du résultat s’explique par la hausse des matières premières ?',
        en: 'What share (in %) of the profit decline is explained by the increase in raw materials?',
      },
      table: {
        headers: { fr: ['Poste (M€)', 'Il y a 2 ans', 'Cette année'], en: ['Line item (€M)', 'Two years ago', 'This year'] },
        rows: [
          [{ fr: 'Matières premières', en: 'Raw materials' }, 14.4, 15.9],
          [{ fr: 'Personnel', en: 'Staff' }, 19.2, 19.4],
          [{ fr: 'Loyers', en: 'Rent' }, 6.0, 6.1],
          [{ fr: 'Énergie', en: 'Energy' }, 2.4, 2.4],
          [{ fr: 'Autres', en: 'Other' }, 2.0, 2.0],
        ],
      },
      answer: 83.3,
      unit: '%',
      tolerance: 0.02,
      explanation: {
        fr: 'Hausse des matières : 15,9 − 14,4 = 1,5 M€. Baisse du résultat : 4,0 − 2,2 = 1,8 M€. 1,5 / 1,8 ≈ 83 %.',
        en: 'Raw material increase: 15.9 − 14.4 = €1.5M. Profit decline: 4.0 − 2.2 = €1.8M. 1.5 / 1.8 ≈ 83%.',
      },
    },
    brainstorm: {
      prompt: { fr: 'Comment Maison Ferrand peut-elle compenser la hausse des matières premières ?', en: 'How can Maison Ferrand offset the raw material increase?' },
      ideas: [
        { label: { fr: 'Augmenter les prix de façon ciblée', en: 'Targeted price increases' }, keywords: ['prix', 'price', 'tarif', 'pricing', 'augment'] },
        { label: { fr: 'Renégocier avec les fournisseurs / achats groupés', en: 'Renegotiate with suppliers / group purchasing' }, keywords: ['fournisseur', 'supplier', 'négoci', 'negotia', 'achat', 'purchas', 'procure'] },
        { label: { fr: 'Couverture sur le prix du blé et du beurre', en: 'Hedging wheat and butter prices' }, keywords: ['couverture', 'hedg', 'contrat', 'contract', 'long terme', 'long-term'] },
        { label: { fr: 'Réduire le gaspillage et les invendus', en: 'Cut waste and unsold products' }, keywords: ['gaspi', 'waste', 'invendu', 'unsold', 'perte', 'loss'] },
        { label: { fr: 'Pousser les produits à forte marge', en: 'Push high-margin products' }, keywords: ['marge', 'margin', 'mix', 'snack', 'boisson', 'drink', 'café', 'coffee'] },
        { label: { fr: 'Revoir les recettes / grammages', en: 'Revisit recipes / portion sizes' }, keywords: ['recette', 'recipe', 'grammage', 'portion', 'formul'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le dirigeant entre dans la salle. Quelle est votre recommandation ?', en: 'The CEO walks in. What is your recommendation?' },
      model: {
        fr: 'La baisse de résultat vient à plus de 80 % de la hausse des matières premières, non répercutée sur les prix. Je recommande trois leviers : une hausse ciblée de 3 à 4 % sur la viennoiserie, moins sensible au prix ; des contrats d’achat à 12 mois pour le beurre et la farine ; et un plan anti-gaspillage visant 1 point de marge. Prochaines étapes : tester la hausse de prix sur 5 boutiques et lancer l’appel d’offres fournisseurs.',
        en: 'Over 80% of the profit decline comes from higher raw material costs that were not passed on to prices. I recommend three levers: a targeted 3–4% price increase on pastries, which are less price-sensitive; 12-month purchase contracts for butter and flour; and a waste-reduction plan targeting one margin point. Next steps: pilot the price increase in 5 shops and launch a supplier tender.',
      },
    },
  },
  {
    id: 'ebike-market',
    minutes: 20,
    difficulty: 1,
    sector: { fr: 'Mobilité', en: 'Mobility' },
    type: { fr: 'Entrée sur un marché', en: 'Market entry' },
    title: { fr: 'VéloVille : faut-il se lancer ?', en: 'VéloVille: should we launch?' },
    brief: {
      fr: 'VéloVille propose des abonnements mensuels de vélos électriques (entretien inclus) dans deux grandes villes. L’entreprise envisage d’ouvrir dans une ville moyenne de 300 000 habitants. Elle vous demande d’estimer la taille du marché et de dire si l’ouverture est pertinente.',
      en: 'VéloVille offers monthly e-bike subscriptions (maintenance included) in two large cities. The company is considering launching in a mid-sized city of 300,000 inhabitants. It asks you to size the market and say whether the launch makes sense.',
    },
    clarifications: [
      { q: { fr: 'Quel est le prix de l’abonnement ?', en: 'What is the subscription price?' }, a: { fr: '50 € par mois.', en: '€50 per month.' } },
      { q: { fr: 'Qui sont les clients cibles ?', en: 'Who are the target customers?' }, a: { fr: 'Les actifs de 18 à 65 ans qui font des trajets domicile-travail courts.', en: 'Working adults aged 18 to 65 with short commutes.' } },
      { q: { fr: 'Y a-t-il des concurrents sur place ?', en: 'Are there local competitors?' }, a: { fr: 'Un service public de vélos en libre-service, pas d’offre d’abonnement longue durée.', en: 'A public bike-sharing scheme, but no long-term subscription offer.' } },
      { q: { fr: 'Quel seuil de rentabilité vise VéloVille ?', en: 'What break-even threshold does VéloVille target?' }, a: { fr: 'Environ 1 500 abonnés par ville.', en: 'About 1,500 subscribers per city.' } },
    ],
    structure: {
      fr: ['Taille et croissance du marché', 'Concurrence et alternatives (libre-service, achat, transports)', 'Capacités de VéloVille : flotte, maintenance, marque', 'Économie du projet : investissement, point mort, risques'],
      en: ['Market size and growth', 'Competition and alternatives (bike sharing, purchase, transit)', 'VéloVille’s capabilities: fleet, maintenance, brand', 'Project economics: investment, break-even, risks'],
    },
    math: {
      question: {
        fr: 'À partir des hypothèses ci-dessous, quel est le marché annuel en M€ ?',
        en: 'Based on the assumptions below, what is the annual market in €M?',
      },
      table: {
        headers: { fr: ['Hypothèse', 'Valeur'], en: ['Assumption', 'Value'] },
        rows: [
          [{ fr: 'Population', en: 'Population' }, '300 000'],
          [{ fr: 'Part des 18–65 ans', en: 'Share aged 18–65' }, '60 %'],
          [{ fr: 'Part avec un trajet < 8 km', en: 'Share with a commute < 8 km' }, '50 %'],
          [{ fr: 'Part intéressée par un abonnement', en: 'Share interested in a subscription' }, '10 %'],
          [{ fr: 'Prix mensuel', en: 'Monthly price' }, '50 €'],
        ],
      },
      answer: 5.4,
      unit: 'M€',
      tolerance: 0.02,
      explanation: {
        fr: '300 000 × 60 % × 50 % × 10 % = 9 000 abonnés potentiels. 9 000 × 50 € × 12 = 5,4 M€.',
        en: '300,000 × 60% × 50% × 10% = 9,000 potential subscribers. 9,000 × €50 × 12 = €5.4M.',
      },
    },
    brainstorm: {
      prompt: { fr: 'Quels risques faut-il examiner avant de décider ?', en: 'What risks should be examined before deciding?' },
      ideas: [
        { label: { fr: 'Taux de conversion réel inférieur à l’intérêt déclaré', en: 'Actual conversion below stated interest' }, keywords: ['conversion', 'intérêt', 'interest', 'adoption', 'demande', 'demand'] },
        { label: { fr: 'Réaction du service public / concurrents', en: 'Response from public scheme / competitors' }, keywords: ['concurren', 'compet', 'public', 'libre-service', 'sharing'] },
        { label: { fr: 'Saisonnalité et météo', en: 'Seasonality and weather' }, keywords: ['saison', 'season', 'météo', 'weather', 'hiver', 'winter', 'pluie', 'rain'] },
        { label: { fr: 'Coûts de maintenance et vols', en: 'Maintenance costs and theft' }, keywords: ['maintenance', 'entretien', 'vol', 'theft', 'répar', 'repair'] },
        { label: { fr: 'Infrastructures cyclables', en: 'Cycling infrastructure' }, keywords: ['piste', 'lane', 'infra', 'sécurité', 'safety'] },
        { label: { fr: 'Taux de résiliation (churn)', en: 'Cancellation rate (churn)' }, keywords: ['churn', 'résili', 'cancel', 'fidél', 'retention', 'rétention'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le comité de direction attend votre avis. Que recommandez-vous ?', en: 'The executive committee wants your view. What do you recommend?' },
      model: {
        fr: 'Le marché est estimé à 5,4 M€, soit environ 9 000 abonnés potentiels. Il suffit d’en capter 17 % pour atteindre le point mort de 1 500 abonnés, ce qui paraît atteignable en l’absence d’offre concurrente directe. Je recommande de lancer, mais par étapes : un pilote de 300 vélos sur 6 mois pour mesurer la conversion réelle et le churn, avec un seuil de décision clair avant d’investir dans la flotte complète.',
        en: 'The market is estimated at €5.4M, about 9,000 potential subscribers. Capturing 17% of them reaches the 1,500-subscriber break-even, which seems achievable with no direct competing offer. I recommend launching in stages: a 6-month pilot with 300 bikes to measure real conversion and churn, with a clear go/no-go threshold before investing in the full fleet.',
      },
    },
  },
  {
    id: 'gym-premium',
    minutes: 20,
    difficulty: 2,
    sector: { fr: 'Loisirs', en: 'Leisure' },
    type: { fr: 'Lancement d’offre', en: 'Product launch' },
    title: { fr: 'FitCité : une offre premium rentable ?', en: 'FitCité: a profitable premium tier?' },
    brief: {
      fr: 'FitCité, chaîne de 20 salles de sport, compte environ 2 000 adhérents par salle. Elle envisage une offre premium à +15 € par mois incluant du coaching en petit groupe, ce qui suppose de recruter un coach à temps plein par salle. Faut-il lancer cette offre ?',
      en: 'FitCité, a chain of 20 gyms, has about 2,000 members per gym. It is considering a premium tier at +€15 per month including small-group coaching, which requires hiring one full-time coach per gym. Should it launch the offer?',
    },
    clarifications: [
      { q: { fr: 'Combien coûte un coach ?', en: 'How much does a coach cost?' }, a: { fr: '4 000 € par mois, charges comprises.', en: '€4,000 per month, fully loaded.' } },
      { q: { fr: 'Y a-t-il d’autres coûts ?', en: 'Are there other costs?' }, a: { fr: 'Négligeables : les salles ont déjà l’espace nécessaire.', en: 'Negligible: gyms already have the space.' } },
      { q: { fr: 'Les concurrents proposent-ils une offre similaire ?', en: 'Do competitors offer something similar?' }, a: { fr: 'Deux concurrents locaux, entre +20 et +25 € par mois.', en: 'Two local competitors, at +€20 to +€25 per month.' } },
    ],
    structure: {
      fr: ['Demande : combien d’adhérents passeraient au premium ?', 'Économie : revenu additionnel vs coût des coachs', 'Risques : cannibalisation, qualité, capacité des cours', 'Positionnement face aux concurrents'],
      en: ['Demand: how many members would upgrade?', 'Economics: extra revenue vs coach costs', 'Risks: cannibalisation, quality, class capacity', 'Positioning against competitors'],
    },
    math: {
      question: {
        fr: 'Combien d’abonnés premium faut-il, au total sur la chaîne, pour atteindre le point mort ?',
        en: 'How many premium subscribers are needed across the chain to break even?',
      },
      table: {
        headers: { fr: ['Donnée', 'Valeur'], en: ['Data', 'Value'] },
        rows: [
          [{ fr: 'Nombre de salles', en: 'Number of gyms' }, '20'],
          [{ fr: 'Coût d’un coach / mois', en: 'Coach cost / month' }, '4 000 €'],
          [{ fr: 'Supplément premium / mois', en: 'Premium add-on / month' }, '15 €'],
        ],
      },
      answer: 5333.33,
      unit: '',
      tolerance: 0.02,
      explanation: {
        fr: 'Coûts fixes : 20 × 4 000 € = 80 000 € par mois. 80 000 / 15 ≈ 5 334 abonnés, soit environ 13 % des 40 000 adhérents.',
        en: 'Fixed costs: 20 × €4,000 = €80,000 per month. 80,000 / 15 ≈ 5,334 subscribers, about 13% of the 40,000 members.',
      },
    },
    brainstorm: {
      prompt: { fr: 'Comment maximiser l’adoption de l’offre premium ?', en: 'How can premium adoption be maximised?' },
      ideas: [
        { label: { fr: 'Essai gratuit / premier mois offert', en: 'Free trial / first month free' }, keywords: ['essai', 'trial', 'gratuit', 'free', 'offert'] },
        { label: { fr: 'Communication ciblée sur les adhérents assidus', en: 'Targeted communication to frequent members' }, keywords: ['cibl', 'target', 'assidu', 'frequent', 'communic', 'marketing'] },
        { label: { fr: 'Engagement annuel avec remise', en: 'Annual commitment with discount' }, keywords: ['annuel', 'annual', 'engagement', 'commitment', 'remise', 'discount'] },
        { label: { fr: 'Parrainage et effet de groupe', en: 'Referrals and group effect' }, keywords: ['parrain', 'referr', 'groupe', 'group', 'ami', 'friend'] },
        { label: { fr: 'Suivi de progression visible (application)', en: 'Visible progress tracking (app)' }, keywords: ['appli', 'app', 'suivi', 'track', 'progress'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le directeur général vous demande votre recommandation.', en: 'The CEO asks for your recommendation.' },
      model: {
        fr: 'Le point mort est à environ 5 300 abonnés premium, soit 13 % des adhérents. C’est ambitieux mais crédible, puisque l’offre reste moins chère que la concurrence. Je recommande un pilote dans 4 salles pendant 3 mois, avec un mois d’essai offert : si l’adoption dépasse 15 %, on déploie sur tout le réseau, sinon on revoit le prix ou le format.',
        en: 'Break-even is about 5,300 premium subscribers, or 13% of members. That is ambitious but credible, since the offer is cheaper than competitors. I recommend a 3-month pilot in 4 gyms with a free first month: if adoption exceeds 15%, roll out chain-wide; otherwise revisit price or format.',
      },
    },
  },
]
