// Fit interview question bank. Text fields are { fr, en }.

export const CATEGORIES = [
  { id: 'motivation', label: { fr: 'Motivation', en: 'Motivation' } },
  { id: 'leadership', label: { fr: 'Leadership', en: 'Leadership' } },
  { id: 'teamwork', label: { fr: 'Travail en équipe', en: 'Teamwork' } },
  { id: 'resilience', label: { fr: 'Échec et résilience', en: 'Failure and resilience' } },
  { id: 'impact', label: { fr: 'Impact', en: 'Impact' } },
]

export const QUESTIONS = [
  { id: 'why-consulting', category: 'motivation',
    q: { fr: 'Pourquoi le conseil ?', en: 'Why consulting?' },
    tips: { fr: 'Une motivation personnelle et précise, reliée à votre parcours. Évitez les généralités (« apprendre vite », « prestige »).', en: 'A specific, personal motivation linked to your background. Avoid clichés ("learn fast", "prestige").' } },
  { id: 'why-firm', category: 'motivation',
    q: { fr: 'Pourquoi notre cabinet plutôt qu’un autre ?', en: 'Why our firm rather than another?' },
    tips: { fr: 'Des éléments concrets : échanges avec des consultants, practices, culture. Montrez que vous avez fait vos recherches.', en: 'Concrete elements: conversations with consultants, practices, culture. Show you did your homework.' } },
  { id: 'lead-team', category: 'leadership',
    q: { fr: 'Racontez une situation où vous avez mené une équipe vers un objectif difficile.', en: 'Tell me about a time you led a team towards a difficult goal.' },
    tips: { fr: 'Votre rôle personnel, les décisions que vous avez prises, un résultat chiffré si possible.', en: 'Your personal role, the decisions you made, a quantified result if possible.' } },
  { id: 'influence', category: 'leadership',
    q: { fr: 'Décrivez une fois où vous avez convaincu quelqu’un qui n’était pas d’accord avec vous.', en: 'Describe a time you persuaded someone who disagreed with you.' },
    tips: { fr: 'Comment vous avez compris la position de l’autre et adapté votre argumentation.', en: 'How you understood the other person’s position and adapted your argument.' } },
  { id: 'conflict', category: 'teamwork',
    q: { fr: 'Parlez-moi d’un conflit dans une équipe et de la façon dont vous l’avez géré.', en: 'Tell me about a team conflict and how you handled it.' },
    tips: { fr: 'Restez factuel, ne blâmez personne, insistez sur la résolution et ce que vous en avez tiré.', en: 'Stay factual, don’t blame anyone, focus on the resolution and what you learned.' } },
  { id: 'failure', category: 'resilience',
    q: { fr: 'Racontez un échec et ce que vous en avez appris.', en: 'Tell me about a failure and what you learned.' },
    tips: { fr: 'Un vrai échec, assumé. La moitié de la réponse doit porter sur l’apprentissage et ce que vous faites différemment depuis.', en: 'A real failure you own. Half the answer should cover the learning and what you now do differently.' } },
  { id: 'pressure', category: 'resilience',
    q: { fr: 'Décrivez une période où vous avez travaillé sous forte pression.', en: 'Describe a period when you worked under heavy pressure.' },
    tips: { fr: 'Priorisation, organisation, communication avec les parties prenantes.', en: 'Prioritisation, organisation, communication with stakeholders.' } },
  { id: 'impact', category: 'impact',
    q: { fr: 'De quelle réalisation êtes-vous le plus fier ?', en: 'What achievement are you most proud of?' },
    tips: { fr: 'Un impact mesurable et votre contribution personnelle, pas seulement celle du groupe.', en: 'A measurable impact and your personal contribution, not just the group’s.' } },
]
