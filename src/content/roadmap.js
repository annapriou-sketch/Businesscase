// 8-week preparation plan. Each task may link to a module (hash route).

export default [
  { week: 1, title: { fr: 'Poser les bases', en: 'Lay the foundations' },
    goal: { fr: 'Comprendre le format des entretiens et établir votre niveau de départ.', en: 'Understand the interview format and set your baseline.' },
    tasks: [
      { id: 'w1-drill', label: { fr: 'Faire un premier calcul mental (mode mixte)', en: 'Do a first mental maths run (mixed mode)' }, href: '#/drill' },
      { id: 'w1-case', label: { fr: 'Terminer le cas VéloVille', en: 'Complete the VéloVille case' }, href: '#/cases/ebike-market' },
      { id: 'w1-why', label: { fr: 'Rédiger « Pourquoi le conseil ? »', en: 'Write "Why consulting?"' }, href: '#/fit' },
    ] },
  { week: 2, title: { fr: 'Structurer', en: 'Structure' },
    goal: { fr: 'Construire des structures claires et exhaustives, sans cadre plaqué.', en: 'Build clear, exhaustive structures without forcing a framework.' },
    tasks: [
      { id: 'w2-case', label: { fr: 'Terminer le cas Maison Ferrand', en: 'Complete the Maison Ferrand case' }, href: '#/cases/bakery-profit' },
      { id: 'w2-struct', label: { fr: 'Structurer 3 problèmes du quotidien à l’oral (5 min chacun)', en: 'Structure 3 everyday problems out loud (5 min each)' } },
      { id: 'w2-drill', label: { fr: '3 sessions de pourcentages', en: '3 percentage sessions' }, href: '#/drill' },
    ] },
  { week: 3, title: { fr: 'Chiffres et tableaux', en: 'Numbers and exhibits' },
    goal: { fr: 'Gagner en vitesse et en fiabilité sur les calculs et la lecture de données.', en: 'Gain speed and accuracy on calculations and data reading.' },
    tasks: [
      { id: 'w3-num', label: { fr: 'Passer le test de raisonnement numérique', en: 'Take the numerical reasoning test' }, href: '#/tests/numerical' },
      { id: 'w3-drill', label: { fr: 'Atteindre 15 bonnes réponses en calcul mental', en: 'Reach 15 correct answers in mental maths' }, href: '#/drill' },
      { id: 'w3-case', label: { fr: 'Terminer le cas FitCité', en: 'Complete the FitCité case' }, href: '#/cases/gym-premium' },
    ] },
  { week: 4, title: { fr: 'Le fit', en: 'Fit' },
    goal: { fr: 'Préparer 5 histoires solides et réutilisables.', en: 'Prepare 5 solid, reusable stories.' },
    tasks: [
      { id: 'w4-stories', label: { fr: 'Rédiger les réponses leadership et échec', en: 'Write the leadership and failure answers' }, href: '#/fit' },
      { id: 'w4-verbal', label: { fr: 'Passer le test de raisonnement verbal', en: 'Take the verbal reasoning test' }, href: '#/tests/verbal' },
      { id: 'w4-mock', label: { fr: 'Répéter vos histoires à voix haute avec un proche', en: 'Rehearse your stories out loud with someone' } },
    ] },
  { week: 5, title: { fr: 'Cas en binôme', en: 'Partner cases' },
    goal: { fr: 'S’entraîner en conditions réelles, avec un intervieweur.', en: 'Practise in real conditions, with an interviewer.' },
    tasks: [
      { id: 'w5-peer1', label: { fr: '2 cas en binôme (un comme candidat, un comme intervieweur)', en: '2 partner cases (one as candidate, one as interviewer)' } },
      { id: 'w5-redo', label: { fr: 'Refaire le cas où votre score était le plus faible', en: 'Redo the case with your lowest score' }, href: '#/cases' },
      { id: 'w5-drill', label: { fr: '3 sessions de calcul mental (mode croissance)', en: '3 mental maths sessions (growth mode)' }, href: '#/drill' },
    ] },
  { week: 6, title: { fr: 'Synthèse', en: 'Synthesis' },
    goal: { fr: 'Formuler des recommandations nettes, en une minute.', en: 'Deliver crisp recommendations in one minute.' },
    tasks: [
      { id: 'w6-reco', label: { fr: 'Enregistrer 3 recommandations d’une minute et les réécouter', en: 'Record 3 one-minute recommendations and listen back' } },
      { id: 'w6-peer', label: { fr: '2 nouveaux cas en binôme', en: '2 more partner cases' } },
      { id: 'w6-firm', label: { fr: 'Rédiger « Pourquoi notre cabinet ? » pour chaque cabinet visé', en: 'Write "Why our firm?" for each target firm' }, href: '#/fit' },
    ] },
  { week: 7, title: { fr: 'Conditions réelles', en: 'Real conditions' },
    goal: { fr: 'Simuler des entretiens complets, fit et cas enchaînés.', en: 'Simulate full interviews, fit and case back to back.' },
    tasks: [
      { id: 'w7-mock', label: { fr: '2 simulations complètes de 45 minutes', en: '2 full 45-minute mock interviews' } },
      { id: 'w7-tests', label: { fr: 'Repasser les deux tests de raisonnement', en: 'Retake both reasoning tests' }, href: '#/tests' },
      { id: 'w7-gaps', label: { fr: 'Lister vos 3 points faibles et un plan pour chacun', en: 'List your 3 weak spots and a plan for each' } },
    ] },
  { week: 8, title: { fr: 'Derniers réglages', en: 'Final tuning' },
    goal: { fr: 'Consolider, se reposer, arriver en confiance.', en: 'Consolidate, rest, arrive confident.' },
    tasks: [
      { id: 'w8-review', label: { fr: 'Relire toutes vos réponses fit', en: 'Review all your fit answers' }, href: '#/fit' },
      { id: 'w8-light', label: { fr: 'Un cas léger par jour, pas plus', en: 'One light case a day, no more' }, href: '#/cases' },
      { id: 'w8-logistics', label: { fr: 'Préparer la logistique : tenue, trajet, questions à poser', en: 'Prepare logistics: outfit, travel, questions to ask' } },
    ] },
]

/** Week number (1–8) for a plan started on startISO, clamped to the plan length. */
export function currentWeek(startISO, now = new Date(), weeks = 8) {
  if (!startISO) return 1
  const days = Math.floor((now - new Date(startISO)) / 86400000)
  return Math.min(weeks, Math.max(1, Math.floor(days / 7) + 1))
}
