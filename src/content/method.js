// Interview method guide. Text fields are { fr, en }.
// Draws on common consulting-interview practice, including the advice in
// A.T. Kearney's candidate guide (2006), rewritten and extended.

export const SECTIONS = [
  {
    id: 'format',
    title: { fr: 'À quoi s’attendre', en: 'What to expect' },
    intro: {
      fr: 'L’intervieweur joue le rôle du client : il vous présente un problème d’entreprise, souvent inspiré d’une vraie mission, et attend vos premières recommandations. Il évalue autant votre raisonnement que votre façon de communiquer.',
      en: 'The interviewer plays the client: they present a business problem, often drawn from a real engagement, and expect your initial recommendations. They assess your reasoning as much as how you communicate.',
    },
    items: [
      { fr: 'Cas en dialogue (30 à 40 min) : le format le plus courant. Vous posez des questions, l’intervieweur vous donne les données au fil de l’eau.', en: 'Interactive case (30–40 min): the most common format. You ask questions; the interviewer hands out data as you go.' },
      { fr: 'Cas écrit avec présentation : certains cabinets, souvent au dernier tour, remettent un dossier (environ 60 min de préparation), puis vous présentez vos slides (20 min) avant une séance de questions.', en: 'Written case with presentation: some firms, often in final rounds, hand out a pack (about 60 min of prep), then you present your slides (20 min) followed by Q&A.' },
      { fr: 'Thèmes fréquents : croissance, rentabilité, investissement et acquisitions, entrée sur un marché, pricing, opérations, menace concurrentielle.', en: 'Common themes: growth, profitability, investments and acquisitions, market entry, pricing, operations, competitive threats.' },
    ],
  },
  {
    id: 'steps',
    title: { fr: 'La méthode en six temps', en: 'The method in six steps' },
    items: [
      { fr: 'Écouter et reformuler : résumez l’énoncé en une phrase pour vérifier que vous avez bien compris.', en: 'Listen and restate: summarise the prompt in one sentence to check your understanding.' },
      { fr: 'Clarifier l’objectif : quel résultat le client attend-il, avec quel chiffre et quel horizon ? Un objectif flou donne une recommandation floue.', en: 'Clarify the objective: what outcome does the client want, with what number and timeframe? A vague goal leads to a vague recommendation.' },
      { fr: 'Structurer du général au particulier : partez des grands enjeux, puis descendez dans le détail. Annoncez votre structure avant de la dérouler.', en: 'Structure top-down: start with the big issues, then drill down. Announce your structure before walking through it.' },
      { fr: 'Formuler une hypothèse : dites tôt ce que vous pensez être la cause ou la solution, puis cherchez les données qui la confirment ou l’infirment.', en: 'Form a hypothesis: say early what you think the cause or solution is, then seek data that confirms or refutes it.' },
      { fr: 'Analyser et ajuster : faites les calculs à voix haute, interprétez chaque chiffre (« ce qui veut dire que… ») et révisez votre hypothèse si besoin.', en: 'Analyse and adjust: calculate out loud, interpret every number ("which means that…") and revise your hypothesis if needed.' },
      { fr: 'Recommander : commencez par la réponse, puis deux ou trois raisons, les risques et les prochaines étapes.', en: 'Recommend: lead with the answer, then two or three reasons, the risks and next steps.' },
    ],
  },
  {
    id: 'creativity',
    title: { fr: 'Aller au-delà de la logique', en: 'Going beyond logic' },
    items: [
      { fr: 'Aborder le problème sous plusieurs angles : les chiffres, mais aussi les produits, les processus, les personnes et les jeux de pouvoir.', en: 'Look at the problem from several angles: the numbers, but also products, processes, people and politics.' },
      { fr: 'Raisonner comme le dirigeant et l’actionnaire : une bonne recommandation crée de la valeur, pas seulement une solution technique.', en: 'Think like the CEO and the shareholder: a good recommendation creates value, not just a technical fix.' },
      { fr: 'Penser à l’organisation et à la culture : qui sera affecté par votre solution, et comment réagira-t-il ?', en: 'Consider organisation and culture: who will your solution affect, and how will they react?' },
      { fr: 'Oser une idée originale, à condition de la justifier.', en: 'Dare an original idea, as long as you justify it.' },
    ],
  },
  {
    id: 'donts',
    title: { fr: 'À éviter', en: 'Pitfalls to avoid' },
    items: [
      { fr: 'Plaquer un cadre standard : la structure doit coller au problème, au secteur et à l’objectif du client, pas à un manuel.', en: 'Forcing a standard framework: the structure must fit the problem, the industry and the client’s goal, not a textbook.' },
      { fr: 'Parler avant d’avoir réfléchi : demandez 30 secondes, c’est normal et apprécié.', en: 'Speaking before thinking: ask for 30 seconds; it is normal and appreciated.' },
      { fr: 'Chercher la solution miracle : les problèmes complexes ont rarement une seule cause.', en: 'Hunting for a silver bullet: complex problems rarely have a single cause.' },
      { fr: 'Le jargon : soyez simple et direct.', en: 'Jargon: be simple and direct.' },
      { fr: 'S’entêter quand on est bloqué : dites-le, demandez une information ou changez d’angle.', en: 'Pushing on when stuck: say so, ask for information or change angle.' },
    ],
  },
  {
    id: 'maths',
    title: { fr: 'Pièges de calcul', en: 'Maths traps' },
    intro: {
      fr: 'Même les corrigés officiels contiennent parfois des erreurs : vérifiez toujours vos ordres de grandeur, et ne recopiez jamais un résultat sans le refaire.',
      en: 'Even official answer keys sometimes contain errors: always sanity-check orders of magnitude and never copy a result without redoing it.',
    },
    items: [
      { fr: 'Volume ou valeur : +20 % de clients ne veut pas dire +20 % de chiffre d’affaires si le nouveau client rapporte moins.', en: 'Volume vs value: +20% customers does not mean +20% revenue if new customers bring in less.' },
      { fr: 'Part d’une part : 24 % de 11 % du marché font 2,6 % du marché, pas 24 %.', en: 'Share of a share: 24% of 11% of the market is 2.6% of the market, not 24%.' },
      { fr: 'Gagner des parts et perdre des ventes : c’est possible si votre segment rétrécit plus vite que vous ne progressez.', en: 'Gaining share while losing sales: possible if your segment shrinks faster than you grow.' },
      { fr: 'Unités et périodes : jours, mois, années, milliers ou millions. Écrivez-les à chaque ligne.', en: 'Units and periods: days, months, years, thousands or millions. Write them on every line.' },
      { fr: 'Annoncer ses hypothèses : arrondissez franchement (20 plutôt que 19,3) et dites-le.', en: 'State your assumptions: round boldly (20 rather than 19.3) and say so.' },
    ],
  },
  {
    id: 'signals',
    title: { fr: 'L’attitude qui fait la différence', en: 'The attitude that makes the difference' },
    items: [
      { fr: 'Un dialogue, pas un monologue : regardez l’intervieweur, vérifiez qu’il vous suit.', en: 'A dialogue, not a monologue: look at the interviewer and check they are following.' },
      { fr: 'Accepter d’être guidé : intégrez vite les indices, sans renoncer à ce dont vous êtes convaincu.', en: 'Be coachable: take hints quickly without giving up what you firmly believe.' },
      { fr: 'Rester calme sous la pression : une erreur corrigée calmement vaut mieux qu’une erreur cachée.', en: 'Stay calm under pressure: a calmly corrected mistake beats a hidden one.' },
      { fr: 'Montrer de la curiosité et le goût du résultat, avec assurance mais sans arrogance.', en: 'Show curiosity and drive for results, confidently but without arrogance.' },
    ],
  },
]

export const FIRST_QUESTIONS = [
  { type: { fr: 'Croissance', en: 'Growth' }, q: { fr: 'Quelle croissance, sur quel horizon ? Organique ou par acquisitions ?', en: 'How much growth, over what horizon? Organic or through acquisitions?' } },
  { type: { fr: 'Rentabilité', en: 'Profitability' }, q: { fr: 'La baisse vient-elle des revenus, des coûts, ou des deux ? Depuis quand ?', en: 'Is the decline driven by revenue, costs, or both? Since when?' } },
  { type: { fr: 'Entrée sur un marché', en: 'Market entry' }, q: { fr: 'Pourquoi ce marché, pourquoi maintenant ? Quel seuil de succès ?', en: 'Why this market, why now? What does success look like?' } },
  { type: { fr: 'Fusion-acquisition', en: 'M&A' }, q: { fr: 'Quelle logique stratégique ? Quel prix demandé et quel financement ?', en: 'What strategic rationale? What asking price and financing?' } },
  { type: { fr: 'Pricing', en: 'Pricing' }, q: { fr: 'Quel coût de revient, quels prix concurrents, quelle valeur pour le client ?', en: 'What is the cost, what do competitors charge, what value does the customer get?' } },
  { type: { fr: 'Opérations', en: 'Operations' }, q: { fr: 'Quel indicateur se dégrade, et qu’est-ce qui a changé juste avant ?', en: 'Which metric is deteriorating, and what changed just before?' } },
  { type: { fr: 'Menace concurrentielle', en: 'Competitive threat' }, q: { fr: 'Quel impact déjà mesurable sur nos ventes ? Qu’est-ce qui alimente la menace ?', en: 'What measurable impact on our sales so far? What is fuelling the threat?' } },
  { type: { fr: 'Réduction de coûts', en: 'Cost reduction' }, q: { fr: 'Quel objectif chiffré, sur quel périmètre ? Qu’est-ce qui est exclu ?', en: 'What numeric target, on what scope? What is off limits?' } },
]

export const SELF_CHECK = [
  { fr: 'J’ai reformulé l’énoncé et fait préciser l’objectif chiffré.', en: 'I restated the prompt and clarified the numeric goal.' },
  { fr: 'Ma structure était annoncée, exhaustive et adaptée au cas.', en: 'My structure was announced, exhaustive and tailored to the case.' },
  { fr: 'J’ai formulé une hypothèse tôt et je l’ai testée.', en: 'I stated a hypothesis early and tested it.' },
  { fr: 'Mes calculs étaient justes, posés à voix haute et interprétés.', en: 'My maths was right, done out loud and interpreted.' },
  { fr: 'Mon brainstorming couvrait plusieurs angles (clients, opérations, organisation).', en: 'My brainstorm covered several angles (customers, operations, organisation).' },
  { fr: 'Ma recommandation commençait par la réponse, avec risques et prochaines étapes.', en: 'My recommendation led with the answer, with risks and next steps.' },
]
