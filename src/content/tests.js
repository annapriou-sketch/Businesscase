// Original reasoning tests. Numerical answers are option indexes.

const regions = {
  headers: { fr: ['Région', 'CA 2024 (k€)', 'CA 2025 (k€)', 'Magasins'], en: ['Region', '2024 revenue (€k)', '2025 revenue (€k)', 'Stores'] },
  rows: [
    [{ fr: 'Nord', en: 'North' }, 1200, 1320, 12],
    [{ fr: 'Sud', en: 'South' }, 950, 912, 10],
    [{ fr: 'Est', en: 'East' }, 780, 858, 6],
    [{ fr: 'Ouest', en: 'West' }, 1070, 1177, 9],
  ],
}
const regionsTitle = { fr: 'Chaîne de librairies Pagine : chiffre d’affaires par région', en: 'Pagine bookshop chain: revenue by region' }

const subscribers = {
  headers: { fr: ['Mois', 'Abonnés'], en: ['Month', 'Subscribers'] },
  rows: [
    [{ fr: 'Janvier', en: 'January' }, 20000],
    [{ fr: 'Février', en: 'February' }, 23000],
    [{ fr: 'Mars', en: 'March' }, 26450],
  ],
}
const subscribersTitle = { fr: 'Application Trakko : abonnés payants', en: 'Trakko app: paying subscribers' }

export const TESTS = {
  numerical: {
    id: 'numerical',
    minutes: 12,
    title: { fr: 'Raisonnement numérique', en: 'Numerical reasoning' },
    intro: { fr: '8 questions sur des tableaux de données. Calculatrice autorisée, 12 minutes.', en: '8 questions on data tables. Calculator allowed, 12 minutes.' },
    questions: [
      { data: regions, dataTitle: regionsTitle,
        q: { fr: 'Quelle est la croissance du CA de la région Nord entre 2024 et 2025 ?', en: 'What was the North region’s revenue growth between 2024 and 2025?' },
        options: ['8 %', '9 %', '10 %', '11 %', '12 %'], answer: 2,
        why: { fr: '(1 320 − 1 200) / 1 200 = 10 %.', en: '(1,320 − 1,200) / 1,200 = 10%.' } },
      { data: regions, dataTitle: regionsTitle,
        q: { fr: 'Quelle région a vu son CA baisser ?', en: 'Which region saw its revenue fall?' },
        options: [{ fr: 'Nord', en: 'North' }, { fr: 'Sud', en: 'South' }, { fr: 'Est', en: 'East' }, { fr: 'Ouest', en: 'West' }, { fr: 'Aucune', en: 'None' }], answer: 1,
        why: { fr: 'Sud : 950 → 912 k€, soit −4 %.', en: 'South: 950 → 912 €k, i.e. −4%.' } },
      { data: regions, dataTitle: regionsTitle,
        q: { fr: 'Quel est le CA moyen par magasin dans la région Est en 2025 ?', en: 'What was the average revenue per store in the East region in 2025?' },
        options: ['130 k€', '137 k€', '143 k€', '148 k€', '156 k€'], answer: 2,
        why: { fr: '858 / 6 = 143 k€.', en: '858 / 6 = €143k.' } },
      { data: regions, dataTitle: regionsTitle,
        q: { fr: 'Quel est le CA total de la chaîne en 2025 ?', en: 'What was the chain’s total revenue in 2025?' },
        options: ['4 000 k€', '4 150 k€', '4 267 k€', '4 310 k€', '4 420 k€'], answer: 2,
        why: { fr: '1 320 + 912 + 858 + 1 177 = 4 267 k€.', en: '1,320 + 912 + 858 + 1,177 = €4,267k.' } },
      { data: regions, dataTitle: regionsTitle,
        q: { fr: 'Quelle part du CA total 2025 la région Ouest représente-t-elle (arrondi) ?', en: 'What share of total 2025 revenue does the West region represent (rounded)?' },
        options: ['25,2 %', '26,4 %', '27,6 %', '28,9 %', '30,1 %'], answer: 2,
        why: { fr: '1 177 / 4 267 ≈ 27,6 %.', en: '1,177 / 4,267 ≈ 27.6%.' } },
      { data: regions, dataTitle: regionsTitle,
        q: { fr: 'En 2026, le Sud revient à son niveau de 2024 et les autres régions croissent de 10 %. Quel CA total obtient-on (arrondi) ?', en: 'In 2026, the South returns to its 2024 level and the other regions grow by 10%. What total revenue results (rounded)?' },
        options: ['4 520 k€', '4 594 k€', '4 641 k€', '4 694 k€', '4 750 k€'], answer: 2,
        why: { fr: '950 + 1,1 × (1 320 + 858 + 1 177) = 950 + 3 690,5 ≈ 4 641 k€.', en: '950 + 1.1 × (1,320 + 858 + 1,177) = 950 + 3,690.5 ≈ €4,641k.' } },
      { data: subscribers, dataTitle: subscribersTitle,
        q: { fr: 'Quel est le taux de croissance mensuel des abonnés ?', en: 'What is the monthly subscriber growth rate?' },
        options: ['12 %', '13 %', '14 %', '15 %', '16 %'], answer: 3,
        why: { fr: '23 000 / 20 000 = 1,15 et 26 450 / 23 000 = 1,15.', en: '23,000 / 20,000 = 1.15 and 26,450 / 23,000 = 1.15.' } },
      { data: subscribers, dataTitle: subscribersTitle,
        q: { fr: 'Si la croissance se maintient, combien d’abonnés en avril (arrondi) ?', en: 'If growth continues, how many subscribers in April (rounded)?' },
        options: ['29 000', '29 750', '30 418', '31 200', '32 000'], answer: 2,
        why: { fr: '26 450 × 1,15 = 30 417,5.', en: '26,450 × 1.15 = 30,417.5.' } },
    ],
  },
  verbal: {
    id: 'verbal',
    minutes: 6,
    title: { fr: 'Raisonnement verbal', en: 'Verbal reasoning' },
    intro: {
      fr: '6 affirmations à juger à partir du texte seul : Vrai, Faux ou Impossible à dire. 6 minutes.',
      en: '6 statements to judge from the passage alone: True, False or Cannot say. 6 minutes.',
    },
    passage: {
      fr: 'Depuis 2023, l’entreprise Norvane autorise ses salariés à télétravailler deux jours par semaine. Une enquête interne menée auprès de 400 salariés indique que 70 % d’entre eux se déclarent plus productifs à domicile. Les managers constatent cependant une baisse des échanges informels entre équipes. La direction envisage d’imposer un jour de présence commun à tous les services, mais n’a encore pris aucune décision. Le télétravail n’est pas accessible aux équipes de production, dont la présence sur site reste obligatoire.',
      en: 'Since 2023, the company Norvane has allowed its employees to work from home two days a week. An internal survey of 400 employees shows that 70% of them say they are more productive at home. Managers, however, report fewer informal exchanges between teams. Management is considering requiring one common office day for all departments but has not yet made any decision. Remote work is not available to production teams, who must remain on site.',
    },
    questions: [
      { q: { fr: 'Tous les salariés de Norvane peuvent télétravailler.', en: 'All Norvane employees can work from home.' }, answer: 1,
        why: { fr: 'Les équipes de production en sont exclues.', en: 'Production teams are excluded.' } },
      { q: { fr: 'Plus de la moitié des salariés interrogés se disent plus productifs à domicile.', en: 'More than half of the surveyed employees say they are more productive at home.' }, answer: 0,
        why: { fr: '70 % des répondants.', en: '70% of respondents.' } },
      { q: { fr: 'La direction a décidé d’imposer un jour de présence commun.', en: 'Management has decided to require a common office day.' }, answer: 1,
        why: { fr: 'Aucune décision n’a encore été prise.', en: 'No decision has been made yet.' } },
      { q: { fr: 'Le télétravail a amélioré le chiffre d’affaires de Norvane.', en: 'Remote work has improved Norvane’s revenue.' }, answer: 2,
        why: { fr: 'Le texte ne parle pas du chiffre d’affaires.', en: 'The passage says nothing about revenue.' } },
      { q: { fr: 'Les managers observent moins d’échanges informels entre équipes.', en: 'Managers observe fewer informal exchanges between teams.' }, answer: 0,
        why: { fr: 'C’est indiqué explicitement.', en: 'This is stated explicitly.' } },
      { q: { fr: 'L’enquête a été menée auprès de l’ensemble des salariés.', en: 'The survey covered all employees.' }, answer: 2,
        why: { fr: '400 salariés ont été interrogés, mais l’effectif total n’est pas donné.', en: '400 employees were surveyed, but the total headcount is not given.' } },
    ],
  },
}

export const VERBAL_OPTIONS = [
  { fr: 'Vrai', en: 'True' },
  { fr: 'Faux', en: 'False' },
  { fr: 'Impossible à dire', en: 'Cannot say' },
]

export function scoreTest(test, answers) {
  return test.questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0)
}
