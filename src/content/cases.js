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
  {
    id: 'ev-chargers',
    minutes: 15,
    difficulty: 1,
    type: { fr: 'Estimation de marché', en: 'Market sizing' },
    sector: { fr: 'Énergie', en: 'Energy' },
    title: { fr: 'Métropole Lumière : combien de bornes de recharge ?', en: 'Métropole Lumière: how many charging points?' },
    brief: {
      fr: 'La métropole Lumière (2 millions d’habitants) prépare son plan d’infrastructures pour 2030. Elle vous demande d’estimer le nombre de points de recharge publics nécessaires pour les voitures électriques de ses habitants.',
      en: 'Métropole Lumière (2 million inhabitants) is preparing its 2030 infrastructure plan. It asks you to estimate how many public charging points its residents’ electric cars will need.',
    },
    clarifications: [
      { q: { fr: 'Faut-il inclure les visiteurs et le transit ?', en: 'Should visitors and through traffic be included?' }, a: { fr: 'Non, seulement les véhicules des habitants.', en: 'No, residents’ vehicles only.' } },
      { q: { fr: 'Parle-t-on de recharge rapide ou normale ?', en: 'Fast or standard charging?' }, a: { fr: 'Raisonnez en points de recharge standard ; la répartition viendra ensuite.', en: 'Reason in standard charging points; the split will come later.' } },
      { q: { fr: 'Quelle part des habitants peut recharger à domicile ?', en: 'What share of residents can charge at home?' }, a: { fr: 'Environ 60 % disposent d’une place privée équipable.', en: 'About 60% have a private parking space that can be equipped.' } },
    ],
    structure: {
      fr: ['Parc de voitures des habitants (ménages × taux d’équipement)', 'Part électrique en 2030', 'Part dépendante de la recharge publique (sans place privée)', 'Nombre de véhicules par point de recharge public'],
      en: ['Residents’ car fleet (households × car ownership)', 'Electric share in 2030', 'Share relying on public charging (no private space)', 'Number of vehicles per public charging point'],
    },
    math: {
      question: { fr: 'Combien de points de recharge publics faut-il en 2030 ?', en: 'How many public charging points are needed in 2030?' },
      table: {
        headers: { fr: ['Hypothèse', 'Valeur'], en: ['Assumption', 'Value'] },
        rows: [
          [{ fr: 'Ménages', en: 'Households' }, 900000],
          [{ fr: 'Voitures par ménage', en: 'Cars per household' }, 0.8],
          [{ fr: 'Part électrique en 2030', en: 'Electric share in 2030' }, '25 %'],
          [{ fr: 'Part sans place privée', en: 'Share without private parking' }, '40 %'],
          [{ fr: 'Véhicules par point public', en: 'Vehicles per public point' }, 10],
        ],
      },
      answer: 7200,
      unit: '',
      tolerance: 0.02,
      explanation: {
        fr: '900 000 × 0,8 = 720 000 voitures ; × 25 % = 180 000 électriques ; × 40 % = 72 000 dépendantes du public ; / 10 = 7 200 points.',
        en: '900,000 × 0.8 = 720,000 cars; × 25% = 180,000 EVs; × 40% = 72,000 relying on public charging; / 10 = 7,200 points.',
      },
    },
    brainstorm: {
      prompt: { fr: 'Quels facteurs pourraient faire fortement varier cette estimation ?', en: 'Which factors could change this estimate significantly?' },
      ideas: [
        { label: { fr: 'Rythme d’adoption des véhicules électriques', en: 'Pace of EV adoption' }, keywords: ['adoption', 'part électrique', 'electric share', 'rythme', 'pace', 'vente', 'sales'] },
        { label: { fr: 'Part de recharge rapide (plus de véhicules par borne)', en: 'Share of fast charging (more vehicles per point)' }, keywords: ['rapide', 'fast', 'puissance', 'power', 'kw'] },
        { label: { fr: 'Équipement des parkings de copropriété', en: 'Equipping shared residential car parks' }, keywords: ['copropri', 'domicile', 'home', 'résiden', 'residential', 'parking privé', 'private'] },
        { label: { fr: 'Kilométrage et usage des voitures', en: 'Mileage and car usage' }, keywords: ['kilom', 'mileage', 'usage', 'distance', 'trajet', 'commute'] },
        { label: { fr: 'Politique de mobilité (ZFE, transports en commun)', en: 'Mobility policy (low-emission zones, public transport)' }, keywords: ['zfe', 'low-emission', 'transport', 'politique', 'policy', 'réglement', 'regulat'] },
        { label: { fr: 'Recharge sur le lieu de travail', en: 'Workplace charging' }, keywords: ['travail', 'work', 'bureau', 'office', 'entreprise', 'employer'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le vice-président chargé des mobilités vous demande une réponse.', en: 'The deputy mayor for mobility asks for your answer.' },
      model: {
        fr: 'Il faut environ 7 200 points de recharge publics d’ici 2030, pour les 72 000 véhicules électriques d’habitants sans place privée. Le chiffre est très sensible au rythme d’adoption et à l’équipement des copropriétés : je recommande un déploiement par tranches annuelles, en commençant par les quartiers denses sans stationnement privé, et une révision du plan chaque année selon les immatriculations.',
        en: 'About 7,200 public charging points are needed by 2030, for the 72,000 residents’ EVs without private parking. The figure is highly sensitive to adoption pace and to equipping shared car parks, so I recommend rolling out in annual tranches, starting with dense districts without private parking, and revisiting the plan each year based on registrations.',
      },
    },
  },
  {
    id: 'ferry-profit',
    minutes: 25,
    difficulty: 2,
    type: { fr: 'Rentabilité', en: 'Profitability' },
    sector: { fr: 'Transport maritime', en: 'Shipping' },
    title: { fr: 'Ferrimar : le trafic tient, pas les marges', en: 'Ferrimar: traffic holds, margins don’t' },
    brief: {
      fr: 'Ferrimar opère trois ferries entre la France et les îles Anglo-Normandes. Le trafic est stable à 1,2 million de passagers par an, mais le résultat opérationnel a été divisé par deux en trois ans, de 18 M€ à 9,2 M€. La direction vous demande d’identifier les causes et de proposer des solutions.',
      en: 'Ferrimar operates three ferries between France and the Channel Islands. Traffic is stable at 1.2 million passengers a year, but operating profit halved in three years, from €18M to €9.2M. Management asks you to identify the causes and propose solutions.',
    },
    clarifications: [
      { q: { fr: 'La flotte ou les rotations ont-elles changé ?', en: 'Have the fleet or sailings changed?' }, a: { fr: 'Non, trois navires et le même nombre de traversées.', en: 'No, three ships and the same number of crossings.' } },
      { q: { fr: 'La concurrence a-t-elle évolué ?', en: 'Has competition changed?' }, a: { fr: 'Un concurrent à bas prix est arrivé en 2023 sur la même ligne.', en: 'A low-cost competitor entered the same route in 2023.' } },
      { q: { fr: 'Que vend-on à bord ?', en: 'What is sold on board?' }, a: { fr: 'Restauration et boutique. La fréquentation de la boutique baisse depuis deux ans.', en: 'Food and a shop. Shop footfall has been falling for two years.' } },
    ],
    structure: {
      fr: ['Revenus billetterie : passagers × prix moyen', 'Revenus à bord : passagers × dépense moyenne', 'Coûts : carburant, équipages, frais portuaires, autres', 'Marché : concurrent low-cost, comportement des passagers'],
      en: ['Ticket revenue: passengers × average fare', 'On-board revenue: passengers × average spend', 'Costs: fuel, crew, port fees, other', 'Market: low-cost competitor, passenger behaviour'],
    },
    math: {
      question: { fr: 'Quelle part (en %) de la baisse du résultat s’explique par la baisse des revenus ?', en: 'What share (in %) of the profit decline is explained by lower revenue?' },
      table: {
        headers: { fr: ['M€', '2022', '2025'], en: ['€M', '2022', '2025'] },
        rows: [
          [{ fr: 'Billetterie', en: 'Tickets' }, 60, 57.6],
          [{ fr: 'Ventes à bord', en: 'On-board sales' }, 18, 14.4],
          [{ fr: 'Carburant', en: 'Fuel' }, 22, 24],
          [{ fr: 'Équipages', en: 'Crew' }, 20, 20.8],
          [{ fr: 'Frais portuaires', en: 'Port fees' }, 8, 8],
          [{ fr: 'Autres coûts', en: 'Other costs' }, 10, 10],
        ],
      },
      chart: {
        type: 'bar',
        title: { fr: 'Revenu par passager', en: 'Revenue per passenger' },
        unit: '€',
        labels: ['2022', '2023', '2024', '2025'],
        series: [
          { name: { fr: 'Billet moyen', en: 'Average fare' }, values: [50, 49.5, 49, 48] },
          { name: { fr: 'Dépense à bord', en: 'On-board spend' }, values: [15, 14, 13, 12] },
        ],
      },
      answer: 68.2,
      unit: '%',
      tolerance: 0.02,
      explanation: {
        fr: 'Revenus : 78 → 72 M€, soit −6 M€. Coûts : 60 → 62,8 M€, soit +2,8 M€. Baisse du résultat : 8,8 M€. 6 / 8,8 ≈ 68 %. Le graphique montre que la dépense à bord recule cinq fois plus vite (−20 %) que le billet moyen (−4 %).',
        en: 'Revenue: 78 → 72 €M, i.e. −6 €M. Costs: 60 → 62.8 €M, i.e. +2.8 €M. Profit decline: 8.8 €M. 6 / 8.8 ≈ 68%. The chart shows on-board spend falling five times faster (−20%) than the average fare (−4%).',
      },
    },
    brainstorm: {
      prompt: { fr: 'Comment Ferrimar peut-elle redresser son résultat ?', en: 'How can Ferrimar restore its profit?' },
      ideas: [
        { label: { fr: 'Relancer les ventes à bord (offre, aménagement, prix)', en: 'Revive on-board sales (offer, layout, prices)' }, keywords: ['à bord', 'on-board', 'onboard', 'boutique', 'shop', 'restaura', 'food'] },
        { label: { fr: 'Prévente en ligne de repas et services', en: 'Online pre-sale of meals and services' }, keywords: ['en ligne', 'online', 'prévente', 'pre-sale', 'pre-book', 'upsell', 'réserv'] },
        { label: { fr: 'Tarification dynamique face au low-cost', en: 'Dynamic pricing against the low-cost rival' }, keywords: ['dynamique', 'dynamic', 'yield', 'tarif', 'pricing', 'prix'] },
        { label: { fr: 'Réduire la consommation de carburant', en: 'Cut fuel consumption' }, keywords: ['carburant', 'fuel', 'vitesse', 'speed', 'consommation', 'consumption', 'couverture', 'hedg'] },
        { label: { fr: 'Développer le fret (camions, marchandises)', en: 'Grow freight (trucks, goods)' }, keywords: ['fret', 'freight', 'camion', 'truck', 'marchandise', 'cargo'] },
        { label: { fr: 'Programme de fidélité pour les habitués', en: 'Loyalty programme for regulars' }, keywords: ['fidél', 'loyal', 'abonn', 'subscri', 'habitu', 'regular'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le directeur général vous demande votre recommandation.', en: 'The CEO asks for your recommendation.' },
      model: {
        fr: 'Deux tiers de la baisse viennent des revenus, et surtout des ventes à bord (−20 % par passager), bien plus que du prix des billets. Je recommande de repenser l’offre à bord et de la prévendre en ligne avec le billet, d’adopter une tarification dynamique pour contenir le concurrent low-cost sans baisse générale des prix, et de lancer un plan carburant (vitesse optimisée, couverture). Objectif : récupérer 5 à 6 M€ en deux ans.',
        en: 'Two thirds of the decline comes from revenue, mainly on-board sales (−20% per passenger), far more than ticket prices. I recommend redesigning the on-board offer and pre-selling it online with the ticket, adopting dynamic pricing to contain the low-cost rival without a general price cut, and launching a fuel plan (optimised speed, hedging). Target: recover €5–6M within two years.',
      },
    },
  },
  {
    id: 'lab-acquisition',
    minutes: 30,
    difficulty: 3,
    type: { fr: 'Fusion-acquisition', en: 'M&A' },
    sector: { fr: 'Santé', en: 'Healthcare' },
    title: { fr: 'BioAnalys : faut-il racheter LaboSud ?', en: 'BioAnalys: should it buy LaboSud?' },
    brief: {
      fr: 'BioAnalys, groupe national de laboratoires d’analyses médicales, étudie le rachat de LaboSud, un réseau régional de 40 laboratoires dans le Sud-Est. Le vendeur demande 120 M€. BioAnalys vous demande si l’opération crée de la valeur et quel prix maximal elle peut accepter.',
      en: 'BioAnalys, a national group of medical testing laboratories, is considering buying LaboSud, a regional network of 40 labs in south-eastern France. The seller is asking €120M. BioAnalys asks whether the deal creates value and what maximum price it can accept.',
    },
    clarifications: [
      { q: { fr: 'Quelle est la logique stratégique ?', en: 'What is the strategic rationale?' }, a: { fr: 'Densifier la présence dans le Sud-Est et mutualiser les plateaux techniques et les achats de réactifs.', en: 'Densify presence in the south-east and pool technical platforms and reagent purchasing.' } },
      { q: { fr: 'Y a-t-il un risque réglementaire ?', en: 'Is there a regulatory risk?' }, a: { fr: 'Oui : la part de marché combinée dans la région atteindrait 35 %, ce qui pourrait déclencher un examen de l’Autorité de la concurrence.', en: 'Yes: the combined regional market share would reach 35%, which could trigger a competition authority review.' } },
      { q: { fr: 'Comment l’opération serait-elle financée ?', en: 'How would the deal be financed?' }, a: { fr: 'Par dette, dans la limite de 4 fois l’EBITDA combiné.', en: 'With debt, up to 4 times combined EBITDA.' } },
      { q: { fr: 'Les biologistes de LaboSud resteraient-ils ?', en: 'Would LaboSud’s biologists stay?' }, a: { fr: 'C’est un point d’attention : plusieurs sont associés et pourraient partir après la vente.', en: 'That is a concern: several are partners and could leave after the sale.' } },
    ],
    structure: {
      fr: ['Attractivité du marché régional (démographie, volumes, tarifs réglementés)', 'Valeur de LaboSud seule (EBITDA × multiple)', 'Synergies : coûts (plateaux, achats) et revenus', 'Risques : concurrence, départ des biologistes, intégration', 'Prix maximal et financement'],
      en: ['Regional market attractiveness (demographics, volumes, regulated tariffs)', 'LaboSud standalone value (EBITDA × multiple)', 'Synergies: costs (platforms, purchasing) and revenue', 'Risks: antitrust, biologist departures, integration', 'Maximum price and financing'],
    },
    math: {
      question: { fr: 'Quel prix maximal (valeur d’entreprise, en M€) BioAnalys peut-elle payer sans détruire de valeur ?', en: 'What maximum price (enterprise value, €M) can BioAnalys pay without destroying value?' },
      table: {
        headers: { fr: ['Donnée', 'Valeur'], en: ['Data', 'Value'] },
        rows: [
          [{ fr: 'EBITDA de LaboSud', en: 'LaboSud EBITDA' }, '12 M€'],
          [{ fr: 'Multiple d’EBITDA du secteur', en: 'Sector EBITDA multiple' }, '9x'],
          [{ fr: 'Synergies de coûts annuelles (pleine année)', en: 'Annual cost synergies (full run-rate)' }, '3 M€'],
          [{ fr: 'Coûts d’intégration (une fois)', en: 'Integration costs (one-off)' }, '6 M€'],
        ],
      },
      answer: 129,
      unit: 'M€',
      tolerance: 0.02,
      explanation: {
        fr: 'Valeur seule : 12 × 9 = 108 M€. Synergies valorisées au même multiple : 3 × 9 = 27 M€. Moins les coûts d’intégration : 108 + 27 − 6 = 129 M€. À 120 M€, BioAnalys cède déjà au vendeur les deux tiers des synergies nettes (12 M€ sur 21).',
        en: 'Standalone value: 12 × 9 = €108M. Synergies at the same multiple: 3 × 9 = €27M. Less integration costs: 108 + 27 − 6 = €129M. At €120M, BioAnalys already hands the seller two thirds of net synergies (12 of 21 €M).',
      },
    },
    brainstorm: {
      prompt: { fr: 'Quels risques d’intégration faut-il anticiper ?', en: 'Which integration risks should be anticipated?' },
      ideas: [
        { label: { fr: 'Départ des biologistes associés', en: 'Departure of partner biologists' }, keywords: ['biologiste', 'biologist', 'départ', 'leave', 'associé', 'partner', 'rétention', 'retention', 'talent'] },
        { label: { fr: 'Examen de l’Autorité de la concurrence / cessions imposées', en: 'Antitrust review / forced divestments' }, keywords: ['concurrence', 'antitrust', 'competition', 'autorité', 'authority', 'cession', 'divest', 'réglement', 'regulat'] },
        { label: { fr: 'Synergies surestimées ou plus lentes', en: 'Overestimated or slower synergies' }, keywords: ['synergie', 'synerg', 'surestim', 'overestim', 'retard', 'delay'] },
        { label: { fr: 'Systèmes informatiques incompatibles', en: 'Incompatible IT systems' }, keywords: ['informatique', 'système', 'system', 'logiciel', 'software'] },
        { label: { fr: 'Perte de médecins prescripteurs ou de patients', en: 'Loss of referring doctors or patients' }, keywords: ['médecin', 'doctor', 'prescri', 'referr', 'patient', 'client'] },
        { label: { fr: 'Choc de cultures et démotivation des équipes', en: 'Culture clash and staff demotivation' }, keywords: ['culture', 'équipe', 'team', 'motivation', 'social', 'staff'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le comité d’investissement vous demande de conclure.', en: 'The investment committee asks for your conclusion.' },
      model: {
        fr: 'L’opération crée de la valeur jusqu’à 129 M€ ; le prix demandé de 120 M€ est acceptable mais laisse peu de marge si les synergies tardent. Je recommande de faire une offre autour de 112 M€, avec un complément de prix conditionné à la rétention des biologistes, et une clause protectrice en cas de cessions imposées par l’Autorité de la concurrence. Le financement par dette reste dans la limite de 4 fois l’EBITDA.',
        en: 'The deal creates value up to €129M; the €120M asking price is acceptable but leaves little room if synergies slip. I recommend bidding around €112M, with an earn-out tied to retaining the biologists and a protective clause in case the competition authority requires divestments. Debt financing stays within the 4× EBITDA limit.',
      },
    },
  },
  {
    id: 'saas-pricing',
    minutes: 20,
    difficulty: 2,
    type: { fr: 'Pricing', en: 'Pricing' },
    sector: { fr: 'Logiciel', en: 'Software' },
    title: { fr: 'Planito : à quel prix vendre le logiciel ?', en: 'Planito: how to price the software?' },
    brief: {
      fr: 'Planito lance un logiciel de gestion des plannings pour les restaurants et commerces de 5 à 50 salariés. Le produit est prêt, mais l’équipe hésite sur le prix de l’abonnement mensuel par établissement. Elle vous demande une recommandation.',
      en: 'Planito is launching staff scheduling software for restaurants and shops with 5 to 50 employees. The product is ready, but the team is unsure about the monthly subscription price per site. They ask for your recommendation.',
    },
    clarifications: [
      { q: { fr: 'Combien coûte un client à servir ?', en: 'What does it cost to serve a customer?' }, a: { fr: 'Environ 3 € par établissement et par mois (hébergement et support).', en: 'About €3 per site per month (hosting and support).' } },
      { q: { fr: 'Quels sont les prix des concurrents ?', en: 'What do competitors charge?' }, a: { fr: 'Deux concurrents principaux : 35 € et 55 € par établissement et par mois.', en: 'Two main competitors: €35 and €55 per site per month.' } },
      { q: { fr: 'Quel bénéfice pour le client ?', en: 'What is the customer benefit?' }, a: { fr: 'Des tests montrent un gain de 4 heures par mois pour le gérant.', en: 'Pilots show the manager saves 4 hours a month.' } },
    ],
    structure: {
      fr: ['Plancher : coût de service', 'Référence marché : prix des concurrents et positionnement', 'Plafond : valeur créée pour le client', 'Modèle : par établissement ou par salarié, paliers, engagement'],
      en: ['Floor: cost to serve', 'Market reference: competitor prices and positioning', 'Ceiling: value created for the customer', 'Model: per site or per employee, tiers, commitment'],
    },
    math: {
      question: { fr: 'Avec une approche par la valeur, quel prix mensuel (en €) si Planito capte 25 % de la valeur créée ?', en: 'With value-based pricing, what monthly price (in €) if Planito captures 25% of the value created?' },
      table: {
        headers: { fr: ['Donnée', 'Valeur'], en: ['Data', 'Value'] },
        rows: [
          [{ fr: 'Heures gagnées par mois (gérant)', en: 'Hours saved per month (manager)' }, 4],
          [{ fr: 'Coût horaire chargé d’un gérant', en: 'Manager’s loaded hourly cost' }, '40 €'],
          [{ fr: 'Part de la valeur captée', en: 'Share of value captured' }, '25 %'],
        ],
      },
      answer: 40,
      unit: '€',
      tolerance: 0.02,
      explanation: {
        fr: 'Valeur créée : 4 h × 40 € = 160 € par mois. 25 % × 160 = 40 € par mois, entre les deux concurrents et très au-dessus du coût de service (3 €).',
        en: 'Value created: 4 h × €40 = €160 a month. 25% × 160 = €40 a month, between the two competitors and well above cost to serve (€3).',
      },
    },
    brainstorm: {
      prompt: { fr: 'Quelles options de modèle tarifaire faut-il envisager ?', en: 'Which pricing model options should be considered?' },
      ideas: [
        { label: { fr: 'Paliers (essentiel, pro, multi-sites)', en: 'Tiers (basic, pro, multi-site)' }, keywords: ['palier', 'tier', 'formule', 'gamme', 'premium', 'basic'] },
        { label: { fr: 'Prix par salarié plutôt que par établissement', en: 'Per-employee rather than per-site pricing' }, keywords: ['par salarié', 'per employee', 'per user', 'par utilisateur', 'siège', 'seat'] },
        { label: { fr: 'Remise pour engagement annuel', en: 'Annual commitment discount' }, keywords: ['annuel', 'annual', 'engagement', 'commitment', 'remise', 'discount'] },
        { label: { fr: 'Essai gratuit ou freemium', en: 'Free trial or freemium' }, keywords: ['essai', 'trial', 'gratuit', 'free', 'freemium'] },
        { label: { fr: 'Options payantes (paie, pointage)', en: 'Paid add-ons (payroll, time clock)' }, keywords: ['option', 'add-on', 'module', 'paie', 'payroll', 'pointage', 'clock'] },
        { label: { fr: 'Tarifs réseaux et franchises', en: 'Pricing for chains and franchises' }, keywords: ['réseau', 'chain', 'franchise', 'volume', 'multi-site', 'groupe'] },
      ],
    },
    reco: {
      prompt: { fr: 'L’équipe fondatrice attend votre prix.', en: 'The founding team wants your price.' },
      model: {
        fr: 'Je recommande 39 € par établissement et par mois : c’est 25 % de la valeur créée, un prix inférieur au concurrent premium et à peine au-dessus de l’entrée de gamme, justifié par le gain de temps démontré. Ajouter un palier multi-sites dégressif, deux mois offerts pour un engagement annuel et un essai gratuit de 30 jours. Prochaine étape : tester 39 € contre 45 € sur les 200 premiers prospects.',
        en: 'I recommend €39 per site per month: 25% of the value created, below the premium competitor and just above the entry-level one, justified by the proven time savings. Add a discounted multi-site tier, two free months for annual commitment and a 30-day free trial. Next step: test €39 against €45 on the first 200 prospects.',
      },
    },
  },
  {
    id: 'hospital-or',
    minutes: 25,
    difficulty: 2,
    type: { fr: 'Réduction de coûts', en: 'Cost reduction' },
    sector: { fr: 'Santé', en: 'Healthcare' },
    title: { fr: 'Clinique des Tilleuls : des blocs sous-utilisés', en: 'Clinique des Tilleuls: underused operating rooms' },
    brief: {
      fr: 'La Clinique des Tilleuls dispose de 8 salles d’opération ouvertes 10 heures par jour, 250 jours par an. Ses coûts par intervention sont 12 % au-dessus de la moyenne des cliniques comparables. La direction veut les réduire de 10 % sans supprimer de postes.',
      en: 'Clinique des Tilleuls has 8 operating rooms open 10 hours a day, 250 days a year. Its cost per procedure is 12% above comparable clinics. Management wants to cut it by 10% without job cuts.',
    },
    clarifications: [
      { q: { fr: 'Pourquoi les salles sont-elles sous-utilisées ?', en: 'Why are the rooms underused?' }, a: { fr: 'Premières interventions en retard de 40 minutes en moyenne, 45 minutes entre deux patients (30 chez les meilleurs), 8 % d’annulations de dernière minute.', en: 'First cases start 40 minutes late on average, 45 minutes between patients (30 at the best clinics), 8% last-minute cancellations.' } },
      { q: { fr: 'Les chirurgiens sont-ils salariés ?', en: 'Are surgeons employees?' }, a: { fr: 'Non, ils sont libéraux et réservent des créneaux.', en: 'No, they are independent and book time slots.' } },
      { q: { fr: 'La demande permettrait-elle plus d’interventions ?', en: 'Is there demand for more procedures?' }, a: { fr: 'Oui, les délais d’attente dépassent deux mois en orthopédie.', en: 'Yes, waiting times exceed two months in orthopaedics.' } },
    ],
    structure: {
      fr: ['Coût par intervention = coûts fixes / volume + coûts variables', 'Volume : taux d’occupation des salles (retards, rotations, annulations)', 'Coûts variables : consommables, implants, achats', 'Organisation : planification des créneaux, relation avec les chirurgiens'],
      en: ['Cost per procedure = fixed costs / volume + variable costs', 'Volume: room utilisation (delays, turnover, cancellations)', 'Variable costs: consumables, implants, purchasing', 'Organisation: slot scheduling, relationship with surgeons'],
    },
    math: {
      question: { fr: 'Combien d’heures opératoires supplémentaires par an si le taux d’occupation moyen passe de 60 % à 80 % ?', en: 'How many extra operating hours per year if average utilisation rises from 60% to 80%?' },
      chart: {
        type: 'bar',
        title: { fr: 'Taux d’occupation par salle', en: 'Utilisation by room' },
        unit: '%',
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        series: [{ name: { fr: 'Occupation', en: 'Utilisation' }, values: [72, 68, 65, 62, 58, 55, 52, 48] }],
        reference: { value: 80, label: { fr: 'Objectif 80 %', en: 'Target 80%' } },
      },
      answer: 4000,
      unit: 'h',
      tolerance: 0.02,
      explanation: {
        fr: 'Capacité : 8 salles × 10 h × 250 jours = 20 000 h. +20 points d’occupation = 4 000 h par an. Le graphique montre que l’écart vient surtout des salles 5 à 8 (moins de 60 %).',
        en: 'Capacity: 8 rooms × 10 h × 250 days = 20,000 h. +20 utilisation points = 4,000 h a year. The chart shows the gap comes mostly from rooms 5 to 8 (below 60%).',
      },
    },
    brainstorm: {
      prompt: { fr: 'Quels leviers pour augmenter l’occupation et baisser le coût par intervention ?', en: 'Which levers can raise utilisation and lower cost per procedure?' },
      ideas: [
        { label: { fr: 'Démarrer la première intervention à l’heure', en: 'Start the first case on time' }, keywords: ['première', 'first', 'heure', 'on time', 'retard', 'late', 'ponctu'] },
        { label: { fr: 'Réduire le temps entre deux patients', en: 'Cut turnover time between patients' }, keywords: ['rotation', 'turnover', 'entre deux', 'between', 'nettoyage', 'cleaning', 'préparation'] },
        { label: { fr: 'Réduire les annulations (appel la veille, pré-admission)', en: 'Reduce cancellations (call the day before, pre-admission)' }, keywords: ['annulation', 'cancel', 'appel', 'call', 'rappel', 'reminder', 'pré-admission'] },
        { label: { fr: 'Réallouer les créneaux peu utilisés', en: 'Reallocate underused slots' }, keywords: ['créneau', 'slot', 'planning', 'schedul', 'réallou', 'realloc', 'block'] },
        { label: { fr: 'Renégocier implants et consommables', en: 'Renegotiate implants and consumables' }, keywords: ['implant', 'consommable', 'consumable', 'achat', 'purchas', 'fournisseur', 'supplier'] },
        { label: { fr: 'Kits standardisés par type d’intervention', en: 'Standardised kits per procedure type' }, keywords: ['kit', 'standard', 'protocole', 'protocol'] },
      ],
    },
    reco: {
      prompt: { fr: 'La directrice de la clinique vous reçoit.', en: 'The clinic director sees you.' },
      model: {
        fr: 'Le surcoût vient d’abord du volume : les salles ne sont occupées qu’à 60 %. Passer à 80 % libère 4 000 heures par an, sur une demande déjà en attente, et dilue les coûts fixes. Je recommande trois actions : démarrage à l’heure contrôlé chaque matin, une équipe dédiée aux rotations pour viser 30 minutes, et la réattribution des créneaux sous-utilisés aux chirurgiens ayant des listes d’attente. En parallèle, un appel d’offres sur les implants.',
        en: 'The extra cost comes first from volume: rooms are only 60% utilised. Reaching 80% frees 4,000 hours a year for demand that is already waiting and dilutes fixed costs. I recommend three actions: on-time starts checked every morning, a dedicated turnover team targeting 30 minutes, and reallocating underused slots to surgeons with waiting lists. In parallel, a tender on implants.',
      },
    },
  },
  {
    id: 'cosmetics-growth',
    minutes: 30,
    difficulty: 3,
    type: { fr: 'Croissance', en: 'Growth' },
    sector: { fr: 'Cosmétiques', en: 'Cosmetics' },
    title: { fr: 'Maison Liora : doubler en cinq ans', en: 'Maison Liora: double in five years' },
    brief: {
      fr: 'Maison Liora, marque familiale de cosmétiques naturels fabriqués en France, réalise 80 M€ de chiffre d’affaires. Les actionnaires veulent atteindre 160 M€ dans cinq ans. Ils vous demandent si c’est réaliste et comment y parvenir.',
      en: 'Maison Liora, a family-owned brand of natural cosmetics made in France, has €80M in revenue. Shareholders want to reach €160M within five years. They ask whether this is realistic and how to get there.',
    },
    clarifications: [
      { q: { fr: 'Quels canaux sont les plus rentables ?', en: 'Which channels are most profitable?' }, a: { fr: 'Le e-commerce en propre a la meilleure marge ; la pharmacie reste le premier canal en volume.', en: 'Own e-commerce has the best margin; pharmacies remain the largest channel by volume.' } },
      { q: { fr: 'Quels moyens financiers ?', en: 'What financial resources?' }, a: { fr: 'Jusqu’à 15 M€ d’investissement, sans ouvrir le capital.', en: 'Up to €15M of investment, without opening the capital.' } },
      { q: { fr: 'Quelle est la gamme actuelle ?', en: 'What is the current range?' }, a: { fr: 'Soins du visage et du corps pour femmes, pas de maquillage ni de soins capillaires.', en: 'Face and body care for women; no make-up or hair care.' } },
    ],
    structure: {
      fr: ['Trajectoire actuelle par canal (sans action nouvelle)', 'Écart à combler par rapport à l’objectif', 'Leviers organiques : canaux, géographies, gammes', 'Leviers externes : acquisitions, partenariats', 'Faisabilité : investissement, capacité de production, marque'],
      en: ['Current trajectory by channel (no new action)', 'Gap to the target', 'Organic levers: channels, geographies, ranges', 'External levers: acquisitions, partnerships', 'Feasibility: investment, production capacity, brand'],
    },
    math: {
      question: { fr: 'Quel taux de croissance annuel moyen (en %) faut-il pour passer de 80 à 160 M€ en cinq ans ?', en: 'What compound annual growth rate (in %) is needed to go from €80M to €160M in five years?' },
      table: {
        headers: { fr: ['Canal', 'CA actuel (M€)', 'Croissance annuelle attendue'], en: ['Channel', 'Current revenue (€M)', 'Expected annual growth'] },
        rows: [
          [{ fr: 'Pharmacies', en: 'Pharmacies' }, 44, '+3 %'],
          [{ fr: 'E-commerce en propre', en: 'Own e-commerce' }, 16, '+20 %'],
          [{ fr: 'Grands magasins', en: 'Department stores' }, 12, '−2 %'],
          [{ fr: 'Export', en: 'Export' }, 8, '+15 %'],
        ],
      },
      answer: 14.9,
      unit: '%',
      tolerance: 0.02,
      explanation: {
        fr: '2^(1/5) − 1 ≈ 14,9 % par an. À tendances inchangées, les canaux atteindraient environ 118 M€ en cinq ans (51 + 40 + 11 + 16) : il manque donc environ 42 M€, qui doivent venir de nouveaux leviers.',
        en: '2^(1/5) − 1 ≈ 14.9% a year. On current trends, channels would reach about €118M in five years (51 + 40 + 11 + 16), leaving a gap of about €42M that must come from new levers.',
      },
    },
    brainstorm: {
      prompt: { fr: 'Quels leviers pour combler l’écart de 42 M€ ?', en: 'Which levers could close the €42M gap?' },
      ideas: [
        { label: { fr: 'Nouvelles gammes (homme, capillaire, solaire)', en: 'New ranges (men, hair care, sun care)' }, keywords: ['gamme', 'range', 'homme', 'men', 'capillaire', 'hair', 'solaire', 'sun', 'catégorie', 'categor'] },
        { label: { fr: 'Accélérer l’export sur des pays cibles', en: 'Accelerate export in target countries' }, keywords: ['export', 'international', 'pays', 'countr', 'géograph', 'geograph', 'asie', 'asia'] },
        { label: { fr: 'Acquisition d’une marque complémentaire', en: 'Acquire a complementary brand' }, keywords: ['acqui', 'rachat', 'buy', 'marque', 'brand', 'm&a'] },
        { label: { fr: 'Accélérer le digital (CRM, abonnements, réseaux sociaux)', en: 'Accelerate digital (CRM, subscriptions, social media)' }, keywords: ['crm', 'abonnement', 'subscription', 'réseaux', 'social', 'influen', 'digital', 'numérique'] },
        { label: { fr: 'Boutiques en propre ou corners', en: 'Own stores or corners' }, keywords: ['boutique', 'store', 'magasin', 'corner', 'retail'] },
        { label: { fr: 'Élargir la distribution (parapharmacie, marketplaces)', en: 'Broaden distribution (drugstores, marketplaces)' }, keywords: ['distribution', 'parapharm', 'marketplace', 'amazon', 'sephora', 'canal', 'channel'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le conseil de famille attend votre verdict.', en: 'The family board awaits your verdict.' },
      model: {
        fr: 'Doubler en cinq ans suppose près de 15 % de croissance par an ; les tendances actuelles mènent à environ 118 M€, soit 42 M€ de moins que l’objectif. L’objectif est atteignable, mais pas sans nouveaux leviers. Je recommande de concentrer les 15 M€ sur deux paris : une gamme capillaire lancée d’abord en e-commerce, et deux pays d’export prioritaires, soit environ 30 M€ de potentiel. Le reste doit venir d’une petite acquisition, à préparer dès maintenant.',
        en: 'Doubling in five years requires nearly 15% growth a year; current trends lead to about €118M, €42M short of the target. The goal is achievable, but not without new levers. I recommend focusing the €15M on two bets: a hair-care range launched first online, and two priority export countries, worth about €30M together. The rest should come from a small acquisition, to be prepared now.',
      },
    },
  },
  {
    id: 'warehouse-delays',
    minutes: 20,
    difficulty: 2,
    type: { fr: 'Opérations', en: 'Operations' },
    sector: { fr: 'Logistique', en: 'Logistics' },
    title: { fr: 'LogiNord : les retards s’accumulent', en: 'LogiNord: delays are piling up' },
    brief: {
      fr: 'LogiNord exploite un entrepôt qui prépare les commandes de plusieurs sites de e-commerce. Son taux de livraison à l’heure est passé de 96 % à 88 % en six mois, et deux clients menacent de partir. Le directeur des opérations vous demande de comprendre pourquoi et d’agir vite.',
      en: 'LogiNord runs a warehouse that fulfils orders for several e-commerce sites. Its on-time delivery rate fell from 96% to 88% in six months, and two clients are threatening to leave. The operations director asks you to understand why and act fast.',
    },
    clarifications: [
      { q: { fr: 'Les transporteurs sont-ils en cause ?', en: 'Are carriers to blame?' }, a: { fr: 'Non, leur ponctualité est stable à 98 % une fois les colis remis.', en: 'No, their punctuality is stable at 98% once parcels are handed over.' } },
      { q: { fr: 'Qu’est-ce qui a changé ?', en: 'What has changed?' }, a: { fr: 'Un nouveau client de mode a été signé au printemps.', en: 'A new fashion client was signed in the spring.' } },
      { q: { fr: 'Peut-on recruter facilement ?', en: 'Is hiring easy?' }, a: { fr: 'Les intérimaires sont difficiles à trouver dans la région.', en: 'Temporary workers are hard to find in the region.' } },
    ],
    structure: {
      fr: ['Demande : volume de commandes et pics', 'Capacité : effectifs, productivité, horaires', 'Processus : réception, préparation, expédition, heure limite', 'Parties externes : clients, transporteurs'],
      en: ['Demand: order volume and peaks', 'Capacity: staffing, productivity, hours', 'Process: receiving, picking, shipping, cut-off time', 'External parties: clients, carriers'],
    },
    math: {
      question: { fr: 'De combien (en %) la demande du dernier mois dépasse-t-elle la capacité de l’entrepôt ?', en: 'By how much (in %) does last month’s demand exceed warehouse capacity?' },
      chart: {
        type: 'line',
        title: { fr: 'Commandes par jour (moyenne mensuelle)', en: 'Orders per day (monthly average)' },
        unit: '',
        labels: [{ fr: 'Jan', en: 'Jan' }, { fr: 'Fév', en: 'Feb' }, { fr: 'Mar', en: 'Mar' }, { fr: 'Avr', en: 'Apr' }, { fr: 'Mai', en: 'May' }, { fr: 'Juin', en: 'Jun' }],
        series: [{ name: { fr: 'Commandes', en: 'Orders' }, values: [34000, 36000, 39000, 41000, 44000, 46000] }],
        reference: { value: 40000, label: { fr: 'Capacité : 40 000 / jour', en: 'Capacity: 40,000 / day' } },
      },
      answer: 15,
      unit: '%',
      tolerance: 0.02,
      explanation: {
        fr: '(46 000 − 40 000) / 40 000 = 15 %. La demande dépasse la capacité depuis avril, ce qui coïncide avec l’arrivée du nouveau client et la chute de la ponctualité.',
        en: '(46,000 − 40,000) / 40,000 = 15%. Demand has exceeded capacity since April, matching the new client’s arrival and the drop in punctuality.',
      },
    },
    brainstorm: {
      prompt: { fr: 'Quels leviers à court terme pour revenir à 96 % ?', en: 'Which short-term levers could bring the rate back to 96%?' },
      ideas: [
        { label: { fr: 'Ajouter une équipe (soir ou week-end)', en: 'Add a shift (evening or weekend)' }, keywords: ['équipe', 'shift', 'soir', 'evening', 'nuit', 'night', 'week-end', 'weekend', 'horaire'] },
        { label: { fr: 'Déborder vers un entrepôt partenaire', en: 'Overflow to a partner warehouse' }, keywords: ['partenaire', 'partner', 'débord', 'overflow', 'sous-trait', 'outsourc', 'autre entrepôt'] },
        { label: { fr: 'Améliorer la productivité (implantation, préparation par vagues)', en: 'Improve productivity (layout, wave picking)' }, keywords: ['productiv', 'implantation', 'layout', 'vague', 'wave', 'picking', 'process'] },
        { label: { fr: 'Renégocier l’heure limite de commande avec les clients', en: 'Renegotiate order cut-off time with clients' }, keywords: ['heure limite', 'cut-off', 'cutoff', 'délai', 'sla', 'négoci', 'negotia'] },
        { label: { fr: 'Prioriser les commandes selon les engagements', en: 'Prioritise orders by commitment' }, keywords: ['priori', 'urgent', 'segment', 'engagement'] },
        { label: { fr: 'Fidéliser et former les intérimaires', en: 'Retain and train temporary staff' }, keywords: ['intérim', 'temp', 'recrut', 'hiring', 'formation', 'training', 'fidél', 'retain'] },
      ],
    },
    reco: {
      prompt: { fr: 'Le directeur des opérations veut un plan pour lundi.', en: 'The operations director wants a plan by Monday.' },
      model: {
        fr: 'Les retards viennent d’un manque de capacité : depuis avril, la demande dépasse de jusqu’à 15 % ce que l’entrepôt peut traiter. Je recommande, sous deux semaines, une équipe du soir sur les jours de pic et un débordement des commandes du nouveau client vers un entrepôt partenaire. Sous deux mois, un projet de productivité (préparation par vagues, réimplantation des références les plus vendues) pour gagner 10 % de capacité durablement.',
        en: 'The delays come from a capacity shortfall: since April, demand has exceeded what the warehouse can handle by up to 15%. I recommend, within two weeks, an evening shift on peak days and overflowing the new client’s orders to a partner warehouse. Within two months, a productivity project (wave picking, re-slotting best-selling items) to gain 10% capacity for good.',
      },
    },
  },
]
